import React, { useEffect, useState } from 'react';
import '../scss/PlaylistResults.scss';
import playListData from '../mockJSONData/testPlaylists.json';
import profile from '../img/testAlbumCoverArt.jpg';
import axios from "axios";




export const PlaylistResults = () => {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/song_titles/')
      .then(response => {
        if(response.data.length > 0){
          setSongs(response.data.map(song => song))
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, songs)

  console.log(songs)

  return (
    <div className='playlist-container'>
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
    </div>
  );
};