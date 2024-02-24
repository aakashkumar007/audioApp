import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AudioPlayer() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);

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
    <div>
      <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
      {audioFiles.length > 0 && (
        <div>
          <p>Selected audio:</p>
          <ul className="song-list">
            {audioFiles.map((audio, index) => (
              <li key={audio.key} onClick={() => handleSongClick(audio.src)} className="song-item">
                <p>File name: {audio.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedAudio && (
        <div>
          <p>Now playing: {selectedAudio}</p>
          <audio key={selectedAudio} controls autoPlay>
            <source src={selectedAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;
