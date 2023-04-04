import React from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({sessionToken}) => {
    return(
      <SongListener sessionToken={sessionToken}/>
    )
  };