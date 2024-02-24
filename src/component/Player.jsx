import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AudioPlayer() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedAudioFiles = JSON.parse(localStorage.getItem('audioFiles'));
    const storedSelectedAudio = localStorage.getItem('selectedAudio');

    if (storedAudioFiles) {
      setAudioFiles(storedAudioFiles);
    }

    if (storedSelectedAudio) {
      setSelectedAudio(storedSelectedAudio);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleAudioEnded);
      return () => {
        audioRef.current.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [selectedAudio]);

  const handleAudioEnded = () => {
    const currentIndex = audioFiles.findIndex(audio => audio.src === selectedAudio);
    const nextIndex = (currentIndex + 1) % audioFiles.length;
    setSelectedAudio(audioFiles[nextIndex].src);
    localStorage.setItem('selectedAudio', audioFiles[nextIndex].src);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => {
      const key = uuidv4();
      const src = URL.createObjectURL(file);
      return { name: file.name, src, key };
    });
    setAudioFiles([...audioFiles, ...newFiles]);
    localStorage.setItem('audioFiles', JSON.stringify([...audioFiles, ...newFiles]));
  };

  const handleSongClick = (audioSrc) => {
    setSelectedAudio(audioSrc);
    localStorage.setItem('selectedAudio', audioSrc);
  };

  return (
    <>
    <div className='flex flex-col items-center justify-start h-full p-20 text-white bg-purple-400'>
      <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
      {audioFiles.length > 0 && (
        <div>
          <p className='text-center font-extrabold text-3xl uppercase mt-4'>Playlist:</p>
          <ul className="p-6 text-white font-bold text-2xl  rounded-2xl">
            {audioFiles.map((audio, index) => (
              <li key={audio.key} onClick={() => handleSongClick(audio.src)} className="text-ellipsis">
                <p className='border-2 border-purple-950 p-2 text-center text-violet-700 rounded-full bg-gray-200 m-2 text-ellipsis'><button className='text-ellipsis'>{audio.name}</button></p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedAudio && (
        <div>
          <p className='text-center text-ellipsis font-semibold p-2 border-2 rounded-full mb-2 bg-blue-600 '>Now playing: {audioFiles.find(file => file.src === selectedAudio).name}</p>
          <audio ref={audioRef} key={selectedAudio} controls  autoPlay>
            <source src={selectedAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
    </>
  );
}

export default AudioPlayer;
