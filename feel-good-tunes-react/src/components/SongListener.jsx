import React, { useEffect, useState } from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playListData from '../mockJSONData/testPlaylists.json';

import SpotifyPlayer from 'react-spotify-web-playback';

import axios from "axios";

import { PlaylistResults } from "../components/PlaylistResults";


function playlistDurationCalculator(currentPlaylist){
    let totalMinutes = 0;
    let totalHours = 0;
    let totalSeconds = 0;
    playListData.results[currentPlaylist].tracks.forEach(trackElement => {
        const tmp = trackElement.song.duration.toString().split(":")
        totalSeconds = totalSeconds + (+tmp[2]);
        if( totalSeconds >= 60)
        {
            totalMinutes++;
            totalSeconds -= 60;
        }
        totalMinutes = totalMinutes + (+tmp[1]);
        if(totalMinutes >= 60)
        {
            totalHours++
            totalMinutes -= 60;
        }
        totalHours += (+tmp[0])
    })
    return(`${totalHours}:${totalMinutes}:${totalSeconds}`)
}

//listOfPlaylistIDs come from mongoDB
const listOfPlaylistIDs = ["27Zm1P410dPfedsdoO9fqm", "0QfHAFhb6iF0kbUKwDmKOn", ]






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
        var listOfPlaylistData = [];
        for (const id of listOfPlaylistIDs) {
            const {data} = await axios.get("https://api.spotify.com/v1/playlists/" + id, {
                headers:{
                Authorization: `Bearer ${sessionToken}`
                }
            });
            listOfPlaylistData.push(data);
        }
        console.log(listOfPlaylistData);
        setPlaylist(listOfPlaylistData);
        setPlaylistID(0);
    }
    //GET PLAYLISTS BASED ON A LIST OF PLAYLIST ID'S END

    //Currently just pulling from json will need to pull from API every time a new playlist is clicked
    let songsAndArtists = playListData.results[0].tracks.length;

    //Need to add all of the songs durations... We may have this done in back end and already stored.
    //May also just be something in the api we can utilize to get the duration
    let playlistDuration = playlistDurationCalculator(0);

    return(
        <div className='song-container'>
            <div className='music-player' >
                <h1 onClick={() => {searchPlaylistsID()}}>CLICK TO LOAD PLAYLISTS</h1>
                {playlist !== "" && <img className = 'music-player-album'src = {playlist[playlistID].images[0].url} alt = "placeholder-album-cover" />}
                {playlist !== "" && <div className='music-player-controls'>
                    {<h2 className='music-player-detail-header'>{playlist[playlistID].name}</h2>}
                    <p className='music-player-details-text'>{songsAndArtists} Artists</p>
                    <p className='music-player-details-text'>{playlist[playlistID].tracks.total} Songs</p>
                    <p className='music-player-details-text'> Duration: {playlistDuration}</p>
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