import React, { useEffect, useState } from 'react';
import profile from '../img/profile-pic2.png';
import happy from '../img/happy-icon.png';
import sad from '../img/sad-icon.png';
import angry from '../img/angry-icon.png';
import surprise from '../img/suprise-icon.png';
import neutral from '../img/neutral.png';
import microphone from '../img/microphone-icon.png'
import face from "../img/face-id-icon.png";
import { PlaylistResults } from "../components/PlaylistResults";
import {SpotifyConnect} from "../components/SpotifyConnect";
import { withRouter } from "react-router";

import axios from "axios";

import '../scss/Home.scss';

export const Home = ({setPage, setPreviousPage, setEmotion}) => {

  const goToPlaylists = event =>{
    setEmotion(event.currentTarget.id)
    setPreviousPage('emotionPicked')
    setPage('playlists')
  }


  const renderOnlyCam = () => {
    setPage('scanMood');
  }
  const renderOnlyMic = () => {
    setPage('sayMood');
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
        <button onClick = {() => renderOnlyMic()} className='scan-mood-button'>Say Mood <img src = {microphone} className='button-icon-size' alt="Microphone Icon"/></button>
        </div>
        <div className = 'emotions'>
          <h2 className='checkout-emotions'>Wanna check out a different playlist? Click on an emotion below!</h2>
          <div className = 'emotions-row'>
            <div className='emotion-plus-caption'>
              <button id = 'happy' className = 'emotion-button' onClick = {goToPlaylists}>
                <img src = {happy} className='icon-size' alt="Happy Icon"/>
              </button>
              <p className = 'emotion-caption'>Happy</p>
            </div>
            <div className='emotion-plus-caption'>
              <button id = 'sad' className = 'emotion-button' onClick = {goToPlaylists}>
                <img src = {sad} className='icon-size' alt="Sad Icon"/>
              </button>
              <p className='emotion-caption'>Sad</p>
            </div>
            <div className = 'emotion-plus-caption'>
              <button id = 'neutral' className='emotion-button' onClick = {goToPlaylists}>
                <img src = {neutral} className='icon-size' alt = "Netural Icon"/>
              </button>
              <p className='emotion-caption'>Neutral</p>
            </div>
            <div className='emotion-plus-caption'>
              <button id = 'angry' className = 'emotion-button' onClick = {goToPlaylists}>
                <img src = {angry} className='icon-size' alt="Angry Icon"/>
              </button>
              <p className='emotion-caption'>Angry</p>
            </div>
            <div className='emotion-plus-caption'>
              <button id = 'surprise' className = 'emotion-button' onClick = {goToPlaylists}>
                <img src = {surprise} className='icon-size' alt="Surprised Icon" /> 
              </button>
              <p className='emotion-caption'>Surprised</p>
            </div>
          </div>
        </div>
      </div>
    );
  };