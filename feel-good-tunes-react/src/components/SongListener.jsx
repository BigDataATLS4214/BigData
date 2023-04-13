import React, { useEffect, useState } from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playListData from '../mockJSONData/testPlaylists.json';

import SpotifyPlayer from 'react-spotify-web-playback';

import axios from "axios";

import { PlaylistResults } from "../components/PlaylistResults";

//listOfPlaylistIDs come from mongoDB 
//Will most likely pull through the songs on the home page for all of the emotions so that it doesn't take a few seconds
const listOfPlaylistIDs = ["27Zm1P410dPfedsdoO9fqm", "0QfHAFhb6iF0kbUKwDmKOn", "6oadp9n7mPc1zH8O0jUT2s", "37i9dQZF1DX0AMssoUKCz7", "37i9dQZF1DZ06evO1YkSM1", "37i9dQZF1DZ06evO3D3LJJ"]

const calculateDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return `${hours}h ${minutes}m ${seconds}s`;
  };

export const SongListener = ({sessionToken}) => {
    const [playlist, setPlaylist] = useState("");
    const [playlistID, setPlaylistID] = useState("");

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


    //GET PLAYLISTS BASED ON A LIST OF PLAYLIST ID'S
    const searchPlaylistsID = async () =>{
        const promises = listOfPlaylistIDs.map(id =>
            axios.get("https://api.spotify.com/v1/playlists/" + id, {
              headers: {
                Authorization: `Bearer ${sessionToken}`,
              },
            })
          );
        const results = await Promise.all(promises);
        console.log(results[0].data);
        
        setPlaylistID(0);
        const playlistsWithDurations = [];
        //Get the track information such as duration of the playlists
        for (let playlist of results) {
            const tracks = playlist.data.tracks.items;
        
            const totalDurationMs = tracks.reduce((total, track) => {
              return total + track.track.duration_ms;
            }, 0);

            const duration = calculateDuration(totalDurationMs);

            const playlistWithDuration = {
              ...playlist.data,
              duration: duration,
            };
        
            playlistsWithDurations.push(playlistWithDuration);
          }
          //Get the track information such as duration of the playlists END
          console.log(playlistsWithDurations);
          setPlaylist(playlistsWithDurations);
    }
    //GET PLAYLISTS BASED ON A LIST OF PLAYLIST ID'S END

    return(
        <div className='song-container'>
            <div className='music-player' >
                <h1 onClick={() => {searchPlaylistsID()}}>CLICK TO LOAD PLAYLISTS</h1>
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

            {/* PLAYLIST RESULTS COMPONENT */}
            {playlist !== "" && <div className='container'>
                <PlaylistResults onPlaylistIDUpdate={handlePlayingPlaylistChange} playlistResults={playlist}/>
            </div>}
            {/* END PLAYLIST RESULTS COMPONENT END */}
        </div>
    )
}