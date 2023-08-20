import React, { useState, useEffect } from 'react';
import ResultScreen from './ResultScreen';
import { callMeMaybe, perc } from './SongPitches'; 
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
)

let stop = false;
let notes = [];
function Pitch() {
    const [shouldUpdate, setShouldUpdate] = useState(1);
  const [detectedNotes, setDetectedNotes] = useState([]);
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
      newDetectedNote = Math.round(newDetectedNote);
      console.log(stop);
      setDetectedNotes(prevNotes => [...prevNotes, newDetectedNote]);
      notes.push(newDetectedNote);
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
      var closestNote = autoCorrelate(buffer, audioContext.sampleRate)

      // const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      // const closestNote = noteStrings[frequencyToNote(maxFrequency) % 12] || 'no sound';
      //const closestNote = maxFrequency || -1;
      // const closestNote = noteStrings[frequencyToNote(autoCorrelateValue) % 12] || 'no sound';
      if (Math.abs(closestNote - previousValueToDisplay) > 400 && closestNote !== -1) {
        closestNote = previousValueToDisplay;
      }
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
      //console.log(detectedNotes);
      updateDetectedNotes(closestNote);

      setTimeout(() => {
        requestAnimationFrame(() => visualize(audioContext, analyser));
      }, 150);
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
    for (i=1; i<SIZE/ 2; i++)
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
    console.log("hi");
    setShouldUpdate(0);
    stop = true;
    //setStop(true);
  }


  const [time, setTime] = useState(new Date());
    const minval = 50;
    const maxval = 550;
    const original = callMeMaybe;
    const cover = detectedNotes;
    const snipindex = Math.max(cover.length-20,0);
    const coversnippet = cover.slice(snipindex);
    const originalsnippet = original.slice(snipindex, Math.min(snipindex+70, original.length));
    const data = {
      labels: callMeMaybe,
      datasets: [{
        label:'Original Pitch',
        data: originalsnippet,
        backgroundColor: 'black',
        borderColor: 'black',
        pointBorderColor: 'black',
        fill: true,
        tension: 0.3,
      },
      {
        label:'Your Pitch',
        data: coversnippet,
        backgroundColor: 'red',
        borderColor: 'red',
        pointBorderColor: 'red',
        fill: true,
        tension: 0.3,
      }]
    };
    const options = {
      animation:{
        duration:0
      },
      elements: {
        point:{
            radius: 0
        }
     },
      plugins: {
        legend:true
      },
      scales: {
        x: {
          display: false
      },
        y: {
          min: minval,
          max: maxval
        }
      }
    }

  return (
    <div className="pitch">
        <ResultScreen user={notes} orig={callMeMaybe} perc={perc}/>
        <button id="startButton" onClick={startAudio}>Start Audio</button>
        <button id="stopButton" onClick={stopUpdate}>Stop Audio</button>
        <div style={
        {
          width: '600px',
          height: '300px'
        }
      }>
        <Line 
        data = {data}
        options = {options}>

        </Line></div>
    </div>);
}export default Pitch;