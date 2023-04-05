import React, { useEffect, useState } from 'react';
import profile from '../img/profile-picture.png';
import happy from '../img/happy-icon.png';
import sad from '../img/sad-icon.png';
import angry from '../img/angry-icon.png';
import surprise from '../img/suprise-icon.png';
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
        <div className = 'emotions'>
          <h2 className='checkout-emotions'>Wanna check out a different playlist? Click on an emotion below!</h2>
          <div className = 'emotions-row'>
            <div className='emotion-plus-caption'>
              <img src = {happy} className='icon-size'/>
              <p className = 'emotion-caption'>Happy</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {sad} className='icon-size' />
              <p className='emotion-caption'>Sad</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {angry} className='icon-size' />
              <p className='emotion-caption'>Angry</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {surprise} className='icon-size' /> 
              <p className='emotion-caption'>Surprised</p>
            </div>
          </div>
        </div>

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