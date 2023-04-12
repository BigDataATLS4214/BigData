import React, { useEffect, useState } from 'react';
import '../scss/PlaylistResults.scss';
import playListData from '../mockJSONData/testPlaylists.json';
import profile from '../img/testAlbumCoverArt.jpg';
import axios from "axios";




export const PlaylistResults = ({playlistResults}) => {
  const PORT_NUM = 5000 //change this to your port number!
  const [emotions, setEmotions] = useState([])

  useEffect(() => {
    axios.get('http://localhost:'+PORT_NUM+'/emotions/')
      .then(response => {
        if(response.data.length > 0){
          setEmotions(response.data.map(emotion => emotion))
          console.log(emotions)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, emotions)

  return (
    <div>
    {/* <div className='playlist-container'>
      {
        playListData && playListData.results.map(playlist => {
          return (
            <div className='playlist-item' key={playlist.name}>
              <div className='albumIMGContainer'>
                <img src={profile} className="albumIMG" alt="ProfilePicture" />
              </div>

              <div className='playlistName'>
                {playlist.name}
              </div>

              {playlist.tracks.map(data => {
                return (
                  <li key={data.song.title} className='songTitleAndAuthor'>
                    {data.song.title + " (" + data.artists[0].name + ")"}
                  </li>
                )
              })}
            </div>
          )
        })}
    </div> */}

    <div className='playlist-container'>
      <h2>TESTING PULLING STRAIGHT FROM SPOTIFY</h2>
    {
      playlistResults.map(playlist => {
        return (
          <div className='playlist-item' key={playlist.name}>
            <div className='albumIMGContainer'>
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