import React from 'react';

import '../scss/PlaylistResults.scss';



export const NavBar = ({ setPage }) => {
    return (
      <div className="FullRow">
          <h2 className = 'home'>PlaylistGenie</h2>
          <div className="NavLinks">
            <button className="clickLinks" onClick={() => setPage('home')}>Home</button>
            <button className="clickLinks" onClick={() => setPage('playlists')}>Playlists</button>
          </div>
          <button className="login-button" onClick={() => setPage('playlists')}>Login</button>
      </div>
    );
  };