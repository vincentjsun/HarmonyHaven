import React, { useState } from 'react';

function FilePitch() {
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [detectedNotes, setDetectedNotes] = useState([]);

  const loadAudio = async () => {
    const response = await fetch('/callmemaybe.mp3');
    const arrayBuffer = await response.arrayBuffer();

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = await context.decodeAudioData(arrayBuffer);

    const analyserNode = context.createAnalyser();
    analyserNode.minDecibels = -65;
    analyserNode.maxDecibels = -10;
    analyserNode.smoothingTimeConstant = 0.85;

    const sourceNode = context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(analyserNode);
    sourceNode.start(0);

    setAudioContext(context);
    setAnalyser(analyserNode);

    analyzeAudio(context, analyserNode);
  };

  const updateDetectedNotes = newDetectedNote => {
    setDetectedNotes(prevNotes => [...prevNotes, newDetectedNote]);
  };

  const analyzeAudio = (context, analyserNode) => {
    if (context && analyserNode) {
      const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteFrequencyData(dataArray);

      const maxFrequencyIndex = dataArray.indexOf(Math.max(...dataArray));
      const maxFrequency = maxFrequencyIndex * audioContext.sampleRate / analyser.fftSize;

      const closestNote = maxFrequency || -1;

      updateDetectedNotes(closestNote);

      const event = new Event('analysisComplete');
      document.dispatchEvent(event);

      // Call the analyzeAudio function recursively to continuously update
      requestAnimationFrame(() => analyzeAudio(context, analyserNode));
    }
  };

  document.addEventListener('analysisComplete', () => {
    // Process the detectedNotes array here or dispatch further actions
    console.log(detectedNotes);
  });

  return (
    <div>
      <h1>Audio Analyzer</h1>
      <button onClick={loadAudio}>Load Audio</button>
    </div>
  );
}

export default FilePitch;
