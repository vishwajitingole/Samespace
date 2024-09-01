import  { useEffect } from 'react';
import { motion } from 'framer-motion';

const SongDetails = ({ currentSong }) => {
    

  useEffect(() => {
    if (currentSong) {
      document.body.style.backgroundImage = `linear-gradient(45deg, ${currentSong.accent}, #000)`;
    }
  }, [currentSong]);

  return (
    <motion.div 
      className="song-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
        
      
      <motion.h2 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentSong?.name}
      </motion.h2>
      
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentSong?.artist}
      </motion.p>
      <motion.img 
        src={`https://cms.samespace.com/assets/${currentSong?.cover}`} 
        alt={currentSong?.name} 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SongDetails;
