import React, { useEffect, useState } from 'react';
import '../scss/PlaylistResults.scss';
import playListData from '../mockJSONData/testPlaylists.json';
import profile from '../img/testAlbumCoverArt.jpg';
import axios from "axios";




export const PlaylistResults = ({playlistResults, onPlaylistIDUpdate}) => {

  const handleChildPlayListIDUpdate = (index) => {
    onPlaylistIDUpdate(index); // Call the parent callback function
  };

  return (
    <div>
      <div className='playlist-container'>
      {
        playlistResults.map((playlist, index) => {
          if(playlist.images.length !== 0){ //check and make sure the playlist in spotify has content/ If there is an image then we can load it up
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
          }
          else{ //playlist has no content, do not display it as an option to listen to since it is empty.
            return(null);
          }
        })}
      </div>
    </div>
  );
};