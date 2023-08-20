import './App.css';
import React, { useState } from 'react';
import Pitch from './Pitch';

function App() {
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [detectedNotes, setDetectedNotes] = useState([]);

  const startAudio = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.minDecibels = -55;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    if (!navigator?.mediaDevices?.getUserMedia) {
      alert('Sorry, getUserMedia is required for the app.');
    } else {
      const constraints = { audio: true };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          visualize(audioContext, analyser); // Call the visualize function with audioContext and analyser
        })
        .catch(err => {
          alert('Sorry, microphone permissions are required for the app. You can continue reading without audio.');
        });
    }
  };

  const toggleUpdate = () => {
    setShouldUpdate(prevState => !prevState);
    console.log(detectedNotes);
  };

  const updateDetectedNotes = newDetectedNote => {
    if (shouldUpdate) {
      setDetectedNotes(prevNotes => [...prevNotes, newDetectedNote]);
    }
  };

  const visualize = (audioContext, analyser) => {
    if (!shouldUpdate) {
      return;
    }

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const maxFrequencyIndex = dataArray.indexOf(Math.max(...dataArray));
    const maxFrequency = maxFrequencyIndex * audioContext.sampleRate / analyser.fftSize;

    // const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    // const closestNote = noteStrings[frequencyToNote(maxFrequency) % 12] || 'no sound';
    const closestNote = maxFrequency || 'no sound';

    updateDetectedNotes(closestNote);

    setTimeout(() => {
      requestAnimationFrame(() => visualize(audioContext, analyser));
    }, 100);
  };

  // const frequencyToNote = frequency => {
  //   const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  //   return Math.round(noteNum) + 69;
  // };

  return (
    <div className="App">
      <header className="App-header">
        <button id="startButton" onClick={startAudio}>Start Audio</button>
        <button id="stopButton" onClick={toggleUpdate}>Stop Audio</button>

        <canvas id="visualizer" width="400" height="200"></canvas>

        {shouldUpdate && (
          <ul id="detectedNotes">
            {detectedNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
      </header>
      <Pitch visualize={visualize} />
    </div>
  );
}

export default App;