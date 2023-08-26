import './App.css';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setImage, setTitle } from '../Title';

function Test() {
  const [updated, setUpdated] = useState("");
  const [song, setSong] = useState("");
  const [videos, setVideos] = useState([]);
  const API_KEY = "AIzaSyC8-pSY0vSxaTGLecELMpWc7XRVxHO3tGs";
  const navigate = useNavigate();

  const search = async () => {
    console.log(song);
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          q: song,
          part: 'snippet',
          maxResults: 3,
          type: 'video',
        },
      });

      setVideos(response.data.items);
      console.log(videos);
    } catch (error) {
      console.error("error searching ", error);
    }
  }

  const handleClick = () => {
    // setSong(updated);
    search();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // setSong(event.target.value);
      search();
    }
  }

  const handleChange = (event) => {
    // setUpdated(event.target.value);
    setSong(event.target.value);
  }

  const checkout = (title) => {
    const parts = title.split("~!%%c2")
    setTitle(parts[0]);
    setImage(parts[1]);
    navigate('/song');
  }
  
  return (
    <div className="App">
      <h3 className='text2'>Search for a song to get started:</h3>
      <input className='searchbar' type='text' placeholder='Find Song' onChange={handleChange} onKeyDown={handleKeyDown}/>
      <button className='searchbutton' onClick={handleClick}>Search</button>
      <div className="App-header">
        {videos.map((video) => (
          <div className='search' key={video.id.videoId}>
            <p>{video.snippet.title.replaceAll("&#39;", "'").replaceAll("&amp;", "&")}</p>
            <img src={video.snippet.thumbnails.high.url}/>
            <a className='link' href={"https://youtube.com/watch?v=" + video.id.videoId}><p>{"https://youtube.com/watch?v=" + video.id.videoId}</p></a>
            <button className='button' onClick={() => {checkout(video.snippet.title.replaceAll("&#39;", "'").replaceAll("&amp;", "&") + "~!%%c2" + video.snippet.thumbnails.high.url)}}>Select</button>
          </div>
        ))}
      </div>
    </div>
    );
  }
  
  export default Test;