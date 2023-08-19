import './App.css';
import React, { useState } from 'react';
import Pitch from './Pitch';
import ResultScreen from './ResultScreen';
import { callMeMaybe, perc } from './SongPitches'; 
// import FilePitch from './FilePitch';
// import SpeechToTextComponent from './SpeechToText';

function App() {
  const [shouldUpdate, setShouldUpdate] = useState(1);
  const [detectedNotes, setDetectedNotes] = useState([]);
  const [stop, setStop] = useState(false);
  var previousValueToDisplay = 0;
  var smoothingCount = 0;
  var smoothingThreshold = 20;
  var smoothingCountThreshold = 5;

  const startAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = -65;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    if (!navigator?.mediaDevices?.getUserMedia) {
      alert('getUserMedia is required for the app.');
    } else {
      const constraints = { audio: true };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          visualize(audioContext, analyser);
        })
        .catch(err => {
          alert('Microphone permissions are required for the app.');
        });
    }
  };

  const updateDetectedNotes = newDetectedNote => {
    if (shouldUpdate === 1 && !stop) {
      setDetectedNotes(prevNotes => [...prevNotes, newDetectedNote]);
    }
  };

  function noteIsSimilarEnough(note) {
      return Math.abs(note - previousValueToDisplay) < smoothingThreshold;
  }

  const visualize = (audioContext, analyser) => {
    if (shouldUpdate === 1) {
      // const dataArray = new Uint8Array(analyser.frequencyBinCount);
      // analyser.getByteFrequencyData(dataArray);

      // const maxFrequencyIndex = dataArray.indexOf(Math.max(...dataArray));
      // const maxFrequency = maxFrequencyIndex * audioContext.sampleRate / analyser.fftSize;

      var bufferLength = analyser.fftSize;
      var buffer = new Float32Array(bufferLength);
      analyser.getFloatTimeDomainData(buffer);
      var closestNote = autoCorrelate(buffer, audioContext.sampleRate);

      // const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      // const closestNote = noteStrings[frequencyToNote(maxFrequency) % 12] || 'no sound';
      // const closestNote = maxFrequency || -1;
      // const closestNote = noteStrings[frequencyToNote(autoCorrelateValue) % 12] || 'no sound';
      if (noteIsSimilarEnough(closestNote)) {
        if (smoothingCount < smoothingCountThreshold) {
          smoothingCount++;
        } else {
          previousValueToDisplay = closestNote;
          smoothingCount = 0;
        }
      } else {
        previousValueToDisplay = closestNote;
        smoothingCount = 0;
      }
      updateDetectedNotes(closestNote);

      setTimeout(() => {
        requestAnimationFrame(() => visualize(audioContext, analyser));
      }, 200);
    }
  };

  function autoCorrelate( buf, sampleRate ) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length;
    var rms = 0;
  
    for (var i=0;i<SIZE;i++) {
      var val = buf[i];
      rms += val*val;
    }
    rms = Math.sqrt(rms/SIZE);
    if (rms<0.01) // not enough signal
      return -1;
  
    var r1=0, r2=SIZE-1, thres=0.2;
    for (i=0; i<SIZE/2; i++) 
      if (Math.abs(buf[i])<thres) { r1=i; break; }
    for (i=1; i<SIZE/2; i++)
      if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }
  
    buf = buf.slice(r1,r2);
    SIZE = buf.length;
  
    var c = new Array(SIZE).fill(0);
    for (i=0; i<SIZE; i++)
      for (var j=0; j<SIZE-i; j++)
        c[i] = c[i] + buf[j]*buf[j+i];
  
    var d=0; while (c[d]>c[d+1]) d++;
    var maxval=-1, maxpos=-1;
    for (i=d; i<SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;
  
    var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
    var a = (x1 + x3 - 2*x2)/2;
    var b = (x3 - x1)/2;
    if (a) T0 = T0 - b/(2*a);
  
    return sampleRate/T0;
  }
  

  const stopUpdate = () => {
    setShouldUpdate(0);
    setStop(true);
    console.log(detectedNotes);
  };

  // const frequencyToNote = frequency => {
  //   const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  //   return Math.round(noteNum) + 69;
  // };

  return (
    <div className="App">
      <header className="App-header">
        <button id="startButton" onClick={startAudio}>Start Audio</button>
        <button id="stopButton" onClick={stopUpdate}>Stop Audio</button>

        <canvas id="visualizer" width="400" height="200"></canvas>

        {shouldUpdate === 1 && (
          <ul id="detectedNotes">
            {detectedNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}

        {shouldUpdate === 0 && (
          <ResultScreen user={detectedNotes} orig={callMeMaybe} perc={perc}/>
        )}
      </header>
      <Pitch visualize={visualize} />
      {/* <SpeechToTextComponent></SpeechToTextComponent> */}
      {/* <FilePitch/> */}
    </div>
  );
}

export default App;
