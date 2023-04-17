import React, { useEffect, useState } from 'react';
import '../scss/PlaylistResults.scss';
import playListData from '../mockJSONData/testPlaylists.json';
import profile from '../img/testAlbumCoverArt.jpg';
import axios from "axios";




export const PlaylistResults = ({playlistResults, onPlaylistIDUpdate}) => {
  const PORT_NUM = 8000; //change this to your port number!
  const [emotions, setEmotions] = useState([]);
  const [playlistids, setplaylistids] = useState([]);

  useEffect(() => {
    //get the emotions and playlist ids from mongodb
    axios.get('http://localhost:'+PORT_NUM+'/emotions/')
      .then(response => {
        if(response.data.length > 0){
          setEmotions(response.data.map(emotion => emotion))
        }
      })
      .catch((error) => {
        console.log(error);
      })
      
      axios.get('http://localhost:'+PORT_NUM+'/playlist_ids/')
      .then(response => {
        if(response.data.length > 0){
          setplaylistids(response.data.map(playlist => playlist));
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  const handleChildPlayListIDUpdate = (index) => {
    console.log("List of Emotions " + emotions);
    console.log("List of Playlist " + playlistids);
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