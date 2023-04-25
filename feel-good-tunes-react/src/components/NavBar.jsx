import React, { useEffect } from 'react';

import '../scss/NavBar.scss';



export const NavBar = ({page, setPage, setCamState }) => {
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
            <button className="clickLinks" style={{ textDecoration: page === 'home' ? 'underline' : 'none', color: page === 'home' ? '#534C6E' : 'black' }} onClick={handleHomeClick}>Home</button>
            <button className="clickLinks" style={{ textDecoration: page === 'playlists' ? 'underline' : 'none', color: page === 'playlists' ? '#534C6E' : 'black'}} onClick={handlePlaylistClick}>Playlists</button>
          </div>
          <div className="navPlaceHolder"></div>
      </div>
    );
  };
  