import React from 'react';

import '../css/NavBar.css';



export const NavBar = ({ setPage }) => {
    return (
      <div className="FullRow">
          <h2>PlaylistGenie</h2>
          <div className="NavLinks">
            <button className="clickLinks" onClick={() => setPage('home')}>Home</button>
            <button className="clickLinks" onClick={() => setPage('playlists')}>Playlists</button>
          </div>
          <button className="NavLinks" onClick={() => setPage('playlists')}>Login</button>
      </div>
    );
  };
  