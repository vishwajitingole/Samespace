import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const Player = ({ currentSong, songs, setCurrentSong }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    useEffect(() => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Playback prevented:', error);
        });
      }
    }, [currentSong, isPlaying]);
  
    const handlePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
        audioRef.current.play().catch(error => {
          console.log('Playback prevented:', error);
        });
      }
    };
  
    const handleNext = () => {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length; // Loop to the start if at the end
      setCurrentSong(songs[nextIndex]);
      setIsPlaying(true);
    };
  
    const handlePrevious = () => {
      const currentIndex = songs.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length; // Loop to the end if at the start
      setCurrentSong(songs[prevIndex]);
      setIsPlaying(true);
    };
  
    return (
      <div className="player">
       
        
        <audio ref={audioRef} src={currentSong?.url} />
        <div className="player-controls">
          <motion.button 
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaStepBackward />
          </motion.button>
          <motion.button 
            onClick={handlePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="play-pause-btn"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>
          <motion.button 
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaStepForward />
          </motion.button>
        </div>
     
      </div>
    );
  };
  

export default Player;
