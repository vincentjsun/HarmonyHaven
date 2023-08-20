import React, { Component } from 'react';

class Pitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detectedNotes: [],
    };
    this.audioContext = null;
    this.analyser = null;
  }

  componentDidMount() {
    if (this.props.shouldUpdate) {
      this.startAudio();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldUpdate !== prevProps.shouldUpdate) {
      if (this.props.shouldUpdate) {
        this.startAudio();
      } else {
        this.stopAudio();
      }
    }
  }

  componentWillUnmount() {
    this.stopAudio();
  }

  startAudio = () => {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.minDecibels = -55;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;

    if (!navigator?.mediaDevices?.getUserMedia) {
      alert('Sorry, getUserMedia is required for the app.');
    } else {
      const constraints = { audio: true };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const source = this.audioContext.createMediaStreamSource(stream);
          source.connect(this.analyser);
          this.visualize();
        })
        .catch(err => {
          alert('Sorry, microphone permissions are required for the app. You can continue reading without audio.');
        });
    }
  };

  stopAudio = () => {
    if (this.audioContext) {
      this.audioContext.close().then(() => {
        this.audioContext = null;
        this.analyser = null;
        // this.setState({ detectedNotes: [] });
      });
    }
  };

//   visualize = () => {
//     if (!this.props.shouldUpdate) {
//       return;
//     }

//     const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
//     this.analyser.getByteFrequencyData(dataArray);

//     const maxFrequencyIndex = dataArray.indexOf(Math.max(...dataArray));
//     const maxFrequency = maxFrequencyIndex * this.audioContext.sampleRate / this.analyser.fftSize;

//     // const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//     // const closestNote = noteStrings[this.frequencyToNote(maxFrequency) % 12] || 'no sound';
//     const closestNote = maxFrequency || 'no sound';

//     this.setState(prevState => ({
//       detectedNotes: [...prevState.detectedNotes, closestNote]
//     }));

//     requestAnimationFrame(this.visualize);
//   };

// //  frequencyToNote = frequency => {
// //     const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
// //     return Math.round(noteNum) + 69;
// //   }; 

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Pitch;