import React, { useEffect, useState } from 'react';
import { SongListener } from '../components/SongListener';

export const Playlists = ({sessionToken, emotion, happyPlaylistIds, sadPlaylistIds, neutralPlaylistIds, angryPlaylistIds, surprisedPlaylistIds, previousPage}) => {
  useEffect(() => {
    console.log("Happy " + happyPlaylistIds)
    console.log("Sad " + sadPlaylistIds)
    console.log("Angry " + angryPlaylistIds)
    console.log("Surprised " + surprisedPlaylistIds)
  })
    return(
      <div>
          {/* Curated phrases based on the emotion the user is feeling */}
          {emotion === "sad" && 
          <h1 className='PlaylistHeader'>Playlists to match your emotional low</h1>
          }
          {emotion === "happy" && 
          <h1 className='PlaylistHeader'>Playlists to match your emotional high</h1>
          }
          {emotion === "angry" && 
          <h1 className='PlaylistHeader'>Playlists to match your emotional rage</h1>
          }
          {emotion === "surprise" && 
          <h1 className='PlaylistHeader'>Playlists to match your emotional astonishment</h1>
          }
          {emotion === "neutral" && 
          <h1 className='PlaylistHeader'>Playlists to match your emotional stability</h1>
          }
        <SongListener sessionToken={sessionToken} happyPlaylistIds={happyPlaylistIds} sadPlaylistIds={sadPlaylistIds} angryPlaylistIds={angryPlaylistIds} neutralPlaylistIds={neutralPlaylistIds} surprisedPlaylistIds={surprisedPlaylistIds} emotion={emotion} previousPage={previousPage}/>
      </div>
    )
  };