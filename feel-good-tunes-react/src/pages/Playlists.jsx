import React from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({accessToken}) => {
  console.log(accessToken + "IN THE PLAYLIST");
    return(
      <SongListener/>
    )
  };