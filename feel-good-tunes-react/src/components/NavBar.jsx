import React from 'react';

import '../scss/NavBar.scss';



export const NavBar = ({ setPage }) => {
    return (
      <div className="FullRow">
          <h2 className = 'home'>PlaylistGenie</h2>
          <div className="NavLinks">
            <button className="clickLinks" onClick={() => setPage('home')}>Home</button>
            <button className="clickLinks" onClick={() => setPage('playlists')}>Playlists</button>
          </div>
          <div className="navPlaceHolder"></div>
      </div>
    );
  };
  