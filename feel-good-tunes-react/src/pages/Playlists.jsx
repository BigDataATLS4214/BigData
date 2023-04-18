import React, { useEffect, useState } from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({sessionToken, emotion, happyPlaylistIds}) => {
    return(
      <div>
        <SongListener sessionToken={sessionToken} happyPlaylistIds={happyPlaylistIds} emotion={emotion}/>
        {emotion !== "" &&(
          <h1>Emotion is: {emotion} </h1>

        )}
      </div>
    )
  };