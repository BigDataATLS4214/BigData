import React, { useEffect, useState } from 'react';
import profile from '../img/profile-picture.png';
import happy from '../img/happy-icon.png';
import sad from '../img/sad-icon.png';
import angry from '../img/angry-icon.png';
import surprise from '../img/suprise-icon.png';
import microphone from '../img/microphone-icon.png'
import face from "../img/face-id-icon.png";
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
      <div className='home-container'>
        <div className='half-page-left'>
          <h2 className='songs-that-match'>SONGS THAT MATCH YOUR MOOD</h2>
        </div>
        <div className='half-page-right'>
          <img src = {profile} id="profileImage" alt="ProfilePicture" />
        </div>
        <div className='half-page-left'>
        <button onClick = {() => renderOnlyCam()} className='scan-mood-button'>Scan Mood <img src = {face} className='button-icon-size' alt="Happy Icon"/></button>
        </div>
        <div className='half-page-right'>
        <button className='scan-mood-button'>Say Mood <img src = {microphone} className='button-icon-size' alt="Microphone Icon"/></button>
        </div>
        <div className = 'emotions'>
          <h2 className='checkout-emotions'>Wanna check out a different playlist? Click on an emotion below!</h2>
          <div className = 'emotions-row'>
            <div className='emotion-plus-caption'>
              <img src = {happy} className='icon-size' alt="Happy Icon"/>
              <p className = 'emotion-caption'>Happy</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {sad} className='icon-size' alt="Sad Icon"/>
              <p className='emotion-caption'>Sad</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {angry} className='icon-size' alt="Angry Icon"/>
              <p className='emotion-caption'>Angry</p>
            </div>
            <div className='emotion-plus-caption'>
              <img src = {surprise} className='icon-size' alt="Surprised Icon" /> 
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