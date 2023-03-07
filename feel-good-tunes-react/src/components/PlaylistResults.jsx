import React from 'react';

import '../scss/PlaylistResults.scss';

import playListData from '../mockJSONData/testPlaylists.json';

import profile from '../img/testAlbumCoverArt.jpg';




export const PlaylistResults = () => {
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