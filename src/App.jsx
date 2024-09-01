import React, { useEffect, useState } from 'react';
import SongList from './SongList';
import Player from './Player';
import SongDetails from './SongDetails';
import './App.css';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        setSongs(response.data.data);
       
      })
      .catch(error => console.error('Error fetching the songs:', error));

      console.log(songs);
  }, []);

  const selectSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="app">
      <div className="logo">
        <img src="/public/logo.png" alt="" />
      </div>
      <div className="user">
        <img src="/public/profile.jpg" alt="" />
      </div>
     
      <div className="sidebar">
        
        <SongList songs={songs} selectSong={selectSong} />
      </div>
      <div className="main-content">
        <SongDetails currentSong={currentSong} />
        <Player currentSong={currentSong} songs={songs} setCurrentSong={setCurrentSong} />
      </div>
    </div>
  );
}

export default App;
