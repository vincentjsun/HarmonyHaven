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

function Test2() {
  const [acc, setAcc] = useState(-1);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lyrics, setLyrics] = useState([]);
  const [dur, setDur] = useState(0);

  // useEffect(() => {
  //   const fetchFile = async () => {
  //     try {
  //       const response = await fetch(data);
  //       const vtt = await response.text();
  //       // console.log(vtt);
  //       const parsedLyrics = getLyrics(vtt);
  //       setLyrics(parsedLyrics);
  //     } catch (error) {
  //       console.error('error ', error);
  //     }
  //   };

  //   fetchFile();
  // }, []);

  useEffect(() => {
    const fetchFile = async () => {
          try {
            const response = await fetch(data);
            const txt = await response.text();
            const lyrics2 = txt.lines.map(line => ({
              time: line.timeTag.split(':')[0],
              words: line.words
            }));
            setLyrics(lyrics2);
          } catch (error) {
            console.error('error ', error);
          }
        };

        fetchFile();
  }, [])

  // const startup = () => {
  //   if(lyrics[0].start !== 0) {
  //     lyrics.unshift({line: "(lyrics will appear here, get ready...)", start: 0, end: lyrics[0].start});
  //   }
  //   lyrics.push({line: "....", start: lyrics[lyrics.length-1].end, end: 10})
  // }

  const startup = () => {
    if(lyrics[0].time !== 0) {
      lyrics.unshift({line: "(lyrics will appear here, get ready...)", start: 0, end: lyrics[0].start});
    }
    lyrics.push({line: "....", start: lyrics[lyrics.length-1].end, end: 10})
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
    if(index < lyrics.length - 1) {
      if(lyrics[index].end !== lyrics[index+1].start) {
        lyrics.splice(index + 1, 0, {line: "...", start: lyrics[index].end, end: lyrics[index+1].start})
      }
    }

    let interval;
    if (playing && index < lyrics.length - 1) {
      const wait = parseFloat((lyrics[index].end - lyrics[index].start)); 
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
    console.log(lyrics);
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
            <div className='lyrics'>{lyrics[index].line}</div>
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
  
  export default Test2;