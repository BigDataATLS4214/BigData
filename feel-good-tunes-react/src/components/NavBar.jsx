import React from 'react';

import '../scss/NavBar.scss';



export const NavBar = ({ setPage, setCamState }) => {
  const handleHomeClick = () => {
    setPage('home')
    setCamState(false);
  }
  const handlePlaylistClick = () => {
    setPage('playlists')
    setCamState(false);
  }
    return (
      <div className="FullRow">
          <h2 className = 'home'>PlaylistGenie</h2>
          <div className="NavLinks">
            <button className="clickLinks" onClick={handleHomeClick}>Home</button>
            <button className="clickLinks" onClick={handlePlaylistClick}>Playlists</button>
          </div>
          <div className="navPlaceHolder"></div>
      </div>
    );
  };
  