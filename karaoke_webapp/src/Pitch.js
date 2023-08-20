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
    this.analyser.minDecibels = -65;
    this.analyser.maxDecibels = -10;
    this.analyser.smoothingTimeConstant = 0.85;

    if (!navigator?.mediaDevices?.getUserMedia) {
      alert('getUserMedia is required for the app.');
    } else {
      const constraints = { audio: true };
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const source = this.audioContext.createMediaStreamSource(stream);
          source.connect(this.analyser);
          this.visualize();
        })
        .catch(err => {
          alert('Microphone permissions are required for the app.');
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

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Pitch;
