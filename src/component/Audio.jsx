import React, { useEffect, useState,useRef } from 'react'

const Audio = () => {

  let [audioFiles,setAudioFiles] =useState([]);
  
  const audioPlayerRef = useRef(null);
  const [currentSongIndex,setCurrentSongIndex] = useState(0);

    const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    const newAudioFiles = Array.from(selectedFiles).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setAudioFiles([...audioFiles, ...newAudioFiles]);

    // Save updated playlist to local storage
    localStorage.setItem('audioFiles', JSON.stringify([...audioFiles, ...newAudioFiles]));
  };

    useEffect(() => {
    const audioPlayer = audioPlayerRef.current; 
    if (audioPlayer && audioFiles.length > 0) {
      const currentSong = audioFiles[currentSongIndex];
      const blobUrl = currentSong?.url; // Safely access url using optional chaining
      if (blobUrl) {
        audioPlayer.src = blobUrl;
        
          audioPlayer.play();
        
      }
    }
  }, [audioFiles]);


  useEffect(()=>{
    const savedAudioFiles =JSON.parse(localStorage.getItem('audioFiles'));
     
    if(savedAudioFiles){
    setAudioFiles(savedAudioFiles)
    }else{
      console.log("Audio file is not fetched properly");
    }
  },[])
  console.log(audioFiles);

  return (
    <>
      <div><input type='file' onChange={handleFileChange} multiple/></div>
      Playlist
      {audioFiles.length > 0 && (
        <div>
          <h2>Song List:</h2>
          <ol>
            {/* {audioFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))} */}
          </ol>
        </div>
     )}

      
    </>
    
     
  )
}

export default Audio