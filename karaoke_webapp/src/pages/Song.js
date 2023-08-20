import './App.css';
import aud from '../assets/audio.mp3';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import a_rank from '../assets/a_rank.png';
import b_rank from '../assets/b_rank.png';
import c_rank from '../assets/c_rank.png';
import d_rank from '../assets/d_rank.png';
import s_rank from '../assets/s_rank.png';
// import { lyrics } from './assets/TestLyrics';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate } from 'react-router-dom';
import { cancelA, image, startA, title } from '../Title';
import { getLyrics } from '../ParseLyrics';
import data from '../assets/lyrics.vtt';
import data2 from '../assets/lyrics2.txt';
import ProgressBar from './ProgressBar';
import Graph from '../components/Graph';
import Pitch from '../components/Pitch';
import ResultScreen from '../components/ResultScreen';
import { callMeMaybe, perc } from '../components/SongPitches'; 
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend
} from 'chart.js';
import { cancel, start } from '../Title';
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
)

let stop = false;
let notes = [];

function Song() {
  const [acc, setAcc] = useState(-1);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lyrics, setLyrics] = useState([]);
  const [dur, setDur] = useState(0);

//   useEffect(() => {
//     const fetchFile = async () => {
//       try {
//         const response = await fetch(data);
//         const vtt = await response.text();
//         console.log(vtt);
//         const parsedLyrics = getLyrics(vtt);
//         setLyrics(parsedLyrics);
//       } catch (error) {
//         console.error('error ', error);
//       }
//     };

//     fetchFile();
//   }, []);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(data2);
        const txt = await response.text();
        // console.log(txt);
        
        const replaced = txt.replace(/"/g, "'");

        // console.log(replaced);

        const lines = replaced.split("},");

        // console.log(lines);
        const parsedLines = lines.map(line => {
            const trimmedLine = line.trim();
            // console.log(trimmedLine);
            const match = trimmedLine.match(/'timeTag': '([^']*)', 'words': (.*)/);
            if (match) {
              return {
                time: toSeconds(match[1]),
                words: handleWords(match[2]),
              };
            }
            return null; 
          }).filter(line => line !== null);

        // console.log(parsedLines);
        setLyrics(parsedLines);
      } catch (error) {
        console.error('error ', error);
      }
    };
  
    fetchFile();
  }, []);

  const toSeconds = timeTag => {
    const [minutes, secondsMs] = timeTag.split(':');
    const [seconds, milliseconds] = secondsMs.split('.');
    return parseInt(minutes) * 60 + parseInt(seconds) + parseFloat(`0.${milliseconds}`);
  };

  const handleWords = (word) => {
    const slice = word.slice(1, -1);
    if(slice.length < 1) {
        return "...";
    } else {
        return slice;
    }
  }

//   const startup = () => {
//     if(lyrics[0].start !== 0) {
//       lyrics.unshift({line: "(lyrics will appear here, get ready...)", start: 0, end: lyrics[0].start});
//     }
//     lyrics.push({line: "....", start: lyrics[lyrics.length-1].end, end: 10})
//   }

  const startup = () => {
    if(lyrics[0].time !== 0) {
      lyrics.unshift({words: "(lyrics will appear here, get ready...)", time: 0});
    }
    lyrics.push({words: "....", start: lyrics[lyrics.length-1], time: lyrics[lyrics.length-1].time + 10})
  }

  useEffect(() => {
    // if(index < lyrics.length - 1) {
    //   if(lyrics[index].end !== lyrics[index+1].start) {
    //     lyrics.splice(index + 1, 0, {line: "...", start: lyrics[index].end, end: lyrics[index+1].start})
    //   }
    // }

    let interval;
    if (playing && index < lyrics.length - 1) {
      const wait = parseFloat((lyrics[index+1].time - lyrics[index].time)); 
      console.log(index + " :: " + wait);
      interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, wait * 1000);

      setDur(wait * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [playing, index]);

  const renderLyrics = () => {
    setIndex(0);
    setPlaying(true);
    startA();
    startAudio();
    startup();
  }

  const cancelPlay = () => {
    setIndex(0);
    cancelA();
    stopUpdate();
    setPlaying(false);
  }

  const navigate = useNavigate();
  const checkout = () => {
    navigate('/search');
  }

  const [shouldUpdate, setShouldUpdate] = useState(1);
  const [detectedNotes, setDetectedNotes] = useState([]); 
  var previousValueToDisplay = 0;
  var smoothingCount = 0;
  var smoothingThreshold = 20;
  var smoothingCountThreshold = 5;

  const startAudio = () => {
    console.log(start);
    console.log("//");
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
  console.log(detectedNotes);

  const [time, setTime] = useState(new Date());
    const minval = 50;
    const maxval = 550;
    const original = callMeMaybe;
    const cover = detectedNotes;
    const snipindex = Math.max(cover.length-20,0);
    const coversnippet = cover.slice(snipindex);
    const originalsnippet = original.slice(snipindex, Math.min(snipindex+70, original.length));
    const origlen = original.slice(Math.min(snipindex, original.length-70), Math.min(snipindex+70, original.length))
    const data = {
      labels: origlen,
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
    <div className="App">
      <div className="App-header">
        <div className='playback'>
          <h3 className='text3'>Current Song: {title}</h3>
          <img className='thumb' src={image}/>
          {playing ? 
          (<div>
            <ReactAudioPlayer src={aud} autoPlay={true} controls={false} volume='.1'/>
            {/* <ReactPlayer url={vid} playing={playing} volume='0' className="react-player" width="100%"/> */}
              {index > 0 ? <div className='ghost'>{lyrics[index-1].words}</div> : null}
              <div className='lyrics'>{lyrics[index].words}</div>
              {index < lyrics.length-1 ? <div className='ghost'>{lyrics[index+1].words}</div> : null}
            <ProgressBar duration={dur}/>
            <button onClick={cancelPlay} className='button2'>stop</button>
          </div>
          ) : <button onClick={renderLyrics} className='button2'>start</button>}
          <button className='return' onClick={checkout}>Back to Search</button>
          {/* <div>
            <Pitch/>
          </div> */}
          <div className="pitch">
        <ResultScreen user={notes} orig={callMeMaybe} perc={perc}/>
        {/* <button id="startButton" onClick={startAudio}>Start Audio</button>
        <button id="stopButton" onClick={stopUpdate}>Stop Audio</button> */}
        <div style={
        {
          width: '600px',
          height: '300px'
        }
      }>
        <Line className='graph'
        data = {data}
        options = {options}>

        </Line></div>
    </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Song;