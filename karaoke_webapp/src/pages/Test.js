import './App.css';
import aud from '../assets/audio.mp3';
import { useEffect, useState } from 'react';
import React from 'react';
import a_rank from '../assets/a_rank.png';
import b_rank from '../assets/b_rank.png';
import c_rank from '../assets/c_rank.png';
import d_rank from '../assets/d_rank.png';
import s_rank from '../assets/s_rank.png';
// import { lyrics } from './assets/TestLyrics';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate } from 'react-router-dom';
import { image, title } from '../Title';
import { getLyrics } from '../ParseLyrics';
import data from '../assets/lyrics.vtt';
import data2 from '../assets/lyrics2.txt';
import ProgressBar from './ProgressBar';

function Test() {
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

        console.log(replaced);

        const lines = replaced.split("},");

        console.log(lines);
        const parsedLines = lines.map(line => {
            const trimmedLine = line.trim(); // Trim leading and trailing whitespace
            // console.log(trimmedLine);
            const match = trimmedLine.match(/'timeTag': '([^']*)', 'words': (.*)/);
            if (match) {
              return {
                time: toSeconds(match[1]),
                words: handleWords(match[2]),
              };
            }
            return null; // Return null for lines that don't match the pattern
          }).filter(line => line !== null);

        console.log(parsedLines);
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

  const renderGrade = React.useCallback(() => {
    switch(true) {
      case acc < 0:
        return null;
      case acc < 25: 
        return <img src={d_rank} className='rank'/>
      case acc < 50: 
        return <img src={c_rank} className='rank'/>
      case acc < 75:
        return <img src={b_rank} className='rank'/>
      case acc < 90:
        return <img src={a_rank} className='rank'/>
      default: 
        return <img src={s_rank} className='srank'/>;
    }
  }, [acc]);

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
    startup();
  }

  const cancelPlay = () => {
    setIndex(0);
    setPlaying(false);
  }

  const navigate = useNavigate();
  const checkout = () => {
    navigate('/search');
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
          <div>
            {renderGrade()}
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Test;