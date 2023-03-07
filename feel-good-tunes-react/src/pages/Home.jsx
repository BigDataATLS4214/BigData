import React from 'react';
import profile from '../img/profile-picture.png';
import { PlaylistResults } from "../components/PlaylistResults";

export const Home = () => {
  let resize = {
    float: 'right',
    width: '80%',
    paddingTop: '6vw',
  }
    return(
      <div className='container'>
        <div className='half-page-left'>
          <h2 className='songs-that-match'>SONGS THAT <br></br>MATCH YOUR MOOD</h2>
        </div>
        <div className='half-page-right'>
          <img src = {profile} style = {resize} alt="ProfilePicture" />
        </div>

        {/* PLAYLIST RESULTS COMPONENT */}
        <div className='container'>
           <PlaylistResults />
        </div>
        {/* END PLAYLIST RESULTS COMPONENT END */}
      </div>
    );
  };