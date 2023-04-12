import React from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({sessionToken, emotion}) => {
    return(
      <div>
        <SongListener sessionToken={sessionToken}/>
        {emotion !== "" &&(
          <h1>Emotion is: {emotion} </h1>
        )}
      </div>
    )
  };