import React, { useEffect, useState } from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({sessionToken, emotion, happyPlaylistIds, sadPlaylistIds, angryPlaylistIds, surprisedPlaylistIds, previousPage}) => {
  useEffect(() => {
    console.log("Happy " + happyPlaylistIds)
    console.log("Sad " + sadPlaylistIds)
    console.log("Angry " + angryPlaylistIds)
    console.log("Surprised " + surprisedPlaylistIds)
  })
    return(
      <div>
        <SongListener sessionToken={sessionToken} happyPlaylistIds={happyPlaylistIds} sadPlaylistIds={sadPlaylistIds} angryPlaylistIds={angryPlaylistIds} surprisedPlaylistIds={surprisedPlaylistIds} emotion={emotion} previousPage={previousPage}/>
        {emotion !== "" &&(
          <h1>Emotion is: {emotion} </h1>
        )}
      </div>
    )
  };