import React, { useEffect, useState, useCallback } from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playListData from '../mockJSONData/testPlaylists.json';

import SpotifyPlayer from 'react-spotify-web-playback';

import axios from "axios";

import { PlaylistResults } from "../components/PlaylistResults";

const calculateDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours}h ${minutes}m ${seconds}s`;
  };

export const SongListener = ({sessionToken, happyPlaylistIds, sadPlaylistIds, angryPlaylistIds, surprisedPlaylistIds,  emotion}) => {
    const [playlist, setPlaylist] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    //the api call was not being completed before rendering the page causing errors so this is a quick fix to not render api dependent content until it has recieved the song info
    const [loaded, setloaded] = useState("");

    const handlePlayingPlaylistChange = (newPlaylistId) => {
        setPlaylistID(newPlaylistId);
    };


    //Search for bunch of PLAYLISTS FROM SPOTIFY
    // const searchPlaylists = async () =>{
    //   const {data} = await axios.get("https://api.spotify.com/v1/search", {
    //     headers:{
    //       Authorization: `Bearer ${sessionToken}`
    //     },
    //     params:{
    //       q: "Happy", //May break if not signed into correct spotify this will change.
    //       type: "playlist"
    //     }
    //   })
    //   console.log(data.playlists)
    //   setPlaylist(data.playlists.items)
    // }
    //Search for bunch of PLAYLISTS FROM SPOTIFY END

    //When the playlist page is first loaded we will want to get the correct playlists based on the current emotion and load them in
    useEffect(() => {
      var emotionSyncedPlaylistId;
      if (emotion === "happy") { emotionSyncedPlaylistId = happyPlaylistIds}
      else if (emotion === "sad") { emotionSyncedPlaylistId = sadPlaylistIds }
      else if (emotion === "angry") { emotionSyncedPlaylistId = angryPlaylistIds }
      else if (emotion === "surprise") { emotionSyncedPlaylistId = surprisedPlaylistIds}
      else{emotionSyncedPlaylistId = happyPlaylistIds}//if ended up on this page from nav bar just default emotion to happy
      console.log("SEARCH " + emotion + " " + emotionSyncedPlaylistId);
      searchPlaylistsID(emotionSyncedPlaylistId).then(setloaded(true))
    }, []);
    
    
    //GET PLAYLISTS BASED ON A LIST OF PLAYLIST ID'S
    const searchPlaylistsID = async (currentPlaylistEmotion) =>{
      console.log("SEARCH " + currentPlaylistEmotion)
      const promises = currentPlaylistEmotion.map(id =>
          axios.get("https://api.spotify.com/v1/playlists/" + id, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          })
        );
      const results = await Promise.all(promises);
      const playlistsWithDurations = [];
      //Get the track information such as duration of the playlists
      for (let playlist of results) {
          const tracks = playlist.data.tracks.items;
          //get the duration of every track in the playlist and store in one variable
          const totalDurationMs = tracks.reduce((total, track) => {
            return total + track.track.duration_ms;
          }, 0);

          const duration = calculateDuration(totalDurationMs);
          //set up new json with the added duration to the playlist information
          const playlistWithDuration = {
            ...playlist.data,
            duration: duration,
          };
          console.log("PLAYLIST WITH DURATION " + playlistWithDuration)
          playlistsWithDurations.push(playlistWithDuration);
        }
        
        setPlaylist(playlistsWithDurations);
        //Get the track information such as duration of the playlists END
        setPlaylistID(0); //Start off playing the first playlist
    }


    //GET PLAYLISTS BASED ON A LIST OF PLAYLIST ID'S END

    return(
        <div className='song-container'>
            {loaded && <div className='music-player' >
                {playlist !== "" && <img className = 'music-player-album'src = {playlist[playlistID].images[0].url} alt = "placeholder-album-cover" />}
                {playlist !== "" && <div className='music-player-controls'>
                    {<h2 className='music-player-detail-header'>{playlist[playlistID].name}</h2>}
                    <p className='music-player-details-text'>{playlist[playlistID].tracks.total} Songs</p>
                    <p className='music-player-details-text'> Duration: {playlist[playlistID].duration}</p>
                    <SpotifyPlayer
                        token={sessionToken}
                        uris={[`spotify:playlist:${playlist[playlistID].id}`]}
                        styles={{
                            activeColor: '#fff',
                            bgColor: '#949270',
                            color: '#000000',
                            loaderColor: '#EDD8C5',
                            sliderColor: '#EDD8C5',
                            trackArtistColor: '#000000',
                            trackNameColor: '#000000',
                          }}
                    />
                    <br></br><br></br>
                </div>}
            </div>
            }

            {/* PLAYLIST RESULTS COMPONENT */}
            {loaded && playlist !== "" && <div className='container'>
                <PlaylistResults onPlaylistIDUpdate={handlePlayingPlaylistChange} playlistResults={playlist}/>
            </div>}
            {/* END PLAYLIST RESULTS COMPONENT END */}
        </div>
    )
}