import React from 'react'
import { useState,useEffect } from 'react';

const Home = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  // const [isPlaying, setIsPlaying] = useState(false);
// const audioPlayerRef = useRef(null);
useEffect(() => {
  // Load saved playlist and current song index from local storage on component mount
  const savedAudioFiles = JSON.parse(localStorage.getItem('audioFiles'));
  if (savedAudioFiles && savedAudioFiles.length > 0) {
    setAudioFiles(savedAudioFiles);
  }
  
  setAudioFiles(savedAudioFiles);
}, [audioFiles]);

const handleFileChange = (event) => {

  const selectedFiles = event.target.files;
  const newAudioFiles = Array.from(selectedFiles).map(file => ({
    name: file.name,
    url: URL.createObjectURL(file)
  }));
  setAudioFiles([...audioFiles, ...newAudioFiles]);
  // if (audioFiles.length === 0) {
  //   setCurrentSongIndex(0); // If playlist was empty, set current index to 0

  localStorage.setItem('audioFiles', JSON.stringify([...audioFiles, ...newAudioFiles]));
  }

  
 
  return (
    <div>
      <input type='file' accept='audio/*'  onChange={handleFileChange} multiple/>
      <ul>
            {audioFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
      </ul>

      <audio controls/>
          
    </div>
  )
}

export default Home