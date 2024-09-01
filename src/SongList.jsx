import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SongList = ({ songs, selectSong }) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const fetchDurations = async () => {
      const durationPromises = songs.map(song => {
        return new Promise((resolve) => {
          const audio = new Audio(song.url);
          audio.addEventListener('loadedmetadata', () => {
            const duration = Math.floor(audio.duration);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            resolve({ id: song.id, duration: formattedDuration });
          });
        });
      });

      const durationsArray = await Promise.all(durationPromises);
      const durationsObject = durationsArray.reduce((acc, curr) => {
        acc[curr.id] = curr.duration;
        return acc;
      }, {});
      
      setDurations(durationsObject);
    };

    fetchDurations();
  }, [songs]);

  return (
    <div className="song-list">
      {songs.map(song => (
        <motion.div 
          key={song.id} 
          onClick={() => selectSong(song)}
          whileHover={{ scale: 1.02, backgroundColor: '#282828' }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
          <div>
            <h3>{song.name}</h3>
            <p>{song.artist}</p>
          </div>
          <span>{durations[song.id] || 'Loading...'}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default SongList;
