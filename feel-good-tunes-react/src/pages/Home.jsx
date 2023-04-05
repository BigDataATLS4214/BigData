import React, { useEffect, useState } from 'react';
import profile from '../img/profile-picture.png';
import { PlaylistResults } from "../components/PlaylistResults";
import {SpotifyConnect} from "../components/SpotifyConnect";
import { withRouter } from "react-router";

import axios from "axios";

import '../scss/Home.scss';

export const Home = ({ setCamState, setPage }) => {

  const renderOnlyCam = () => {
    setCamState(true);
    setPage('');
  }
    return(
      <div className='container'>
        <div className='half-page-left'>
          <h2 className='songs-that-match'>SONGS THAT <br></br>MATCH YOUR MOOD</h2>
        </div>
        <div className='half-page-right'>
          <img src = {profile} id="profileImage" alt="ProfilePicture" />
        </div>
        <button onClick = {() => renderOnlyCam()} className='scan-mood-button'>Scan Mood</button>

        {/* PLAYLIST RESULTS COMPONENT */}
        {/* <div className='container'>
           <PlaylistResults />
        </div> */}
        {/* END PLAYLIST RESULTS COMPONENT END */}

        {/* Spotify AUTHENTICATION AND TESTING */}
        {/* Spotify AUTHENTICATION AND TESTING END */}

      </div>
    );
  };