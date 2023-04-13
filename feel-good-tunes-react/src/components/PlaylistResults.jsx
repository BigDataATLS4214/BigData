import React, { useEffect, useState } from 'react';
import '../scss/PlaylistResults.scss';
import playListData from '../mockJSONData/testPlaylists.json';
import profile from '../img/testAlbumCoverArt.jpg';
import axios from "axios";




export const PlaylistResults = ({playlistResults, onPlaylistIDUpdate}) => {
  const PORT_NUM = 8000 //change this to your port number!
  const [emotions, setEmotions] = useState([])

  useEffect(() => {
    axios.get('http://localhost:'+PORT_NUM+'/emotions/')
      .then(response => {
        if(response.data.length > 0){
          setEmotions(response.data.map(emotion => emotion))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, emotions)


  const handleChildPlayListIDUpdate = (index) => {
    console.log(index);
    onPlaylistIDUpdate(index); // Call the parent callback function
  };
  

  return (
    <div>
      <div className='playlist-container'>
      {
        playlistResults.map((playlist, index) => {
          return (
            <div className='playlist-item' key={playlist.name}>
              <div className='albumIMGContainer' onClick={() => handleChildPlayListIDUpdate(index)}>
                <img src={playlist.images[0].url} className="albumIMG" alt="ProfilePicture" />
              </div>
              <div className='playlistName'>
                  {playlist.name}
              </div>
              <div className='songTitleAndAuthor'>
              {playlist.tracks.total} Total Songs
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};