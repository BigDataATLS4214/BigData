import React, { useEffect, useState, useCallback } from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playListData from '../mockJSONData/testPlaylists.json';

import SpotifyPlayer from 'react-spotify-web-playback';

import axios from "axios";

import { PlaylistResults } from "../components/PlaylistResults";

const PORT_NUM = 8000; //change this to your port number!
const mongoDBURI = 'http://localhost:' + PORT_NUM;

const calculateDuration = (durationMs) => {
  console.log("DURATION MS: " + durationMs);
    const totalSeconds = Math.floor(durationMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
};

export const SongListener = ({sessionToken, happyPlaylistIds, sadPlaylistIds, neutralPlaylistIds, angryPlaylistIds, surprisedPlaylistIds,  emotion, previousPage}) => {
    const [playlist, setPlaylist] = useState("");
    const [playlistID, setPlaylistID] = useState("");

    //the api call was not being completed before rendering the page causing errors so this is a quick fix to not render api dependent content until it has recieved the song info
    const [loaded, setloaded] = useState("");

    const handlePlayingPlaylistChange = (newPlaylistId) => {
        setPlaylistID(newPlaylistId);
    };

    //When the playlist page is first loaded we will want to get the correct playlists based on the current emotion and load them in
    useEffect(() => {
      setloaded(false);
      //Only want to use the output from mongo db if the user is navigating from the scan mood or say mood features
      if(previousPage === "ML")
      {
        axios.get(mongoDBURI + '/Output/')
          .then(response => {
            console.log("Current EMOTION: "  + response.data.name)
            var emotionSyncedPlaylistId;
            if (response.data.name === "happy") { emotionSyncedPlaylistId = happyPlaylistIds}
            else if (response.data.name === "neutral") { emotionSyncedPlaylistId = neutralPlaylistIds }
            else if (response.data.name === "sad") { emotionSyncedPlaylistId = sadPlaylistIds }
            else if (response.data.name === "angry") { emotionSyncedPlaylistId = angryPlaylistIds }
            else if (response.data.name === "surprise" || response.data.name === "surprised") { emotionSyncedPlaylistId = surprisedPlaylistIds}
            else{emotionSyncedPlaylistId = happyPlaylistIds}//if ended up on this page from nav bar just default emotion to happy
            searchPlaylistsID(emotionSyncedPlaylistId).then(setloaded(true))
          })
          .catch((error) => {
            console.log(error);
          })
      }
      else //navigated to playlist page via clicking a button
      {
        var emotionSyncedPlaylistId;
        if (emotion === "happy") { emotionSyncedPlaylistId = happyPlaylistIds}
        else if (emotion === "neutral") { emotionSyncedPlaylistId = neutralPlaylistIds}
        else if (emotion === "sad") { emotionSyncedPlaylistId = sadPlaylistIds }
        else if (emotion === "angry") { emotionSyncedPlaylistId = angryPlaylistIds }
        else if (emotion === "surprise") { emotionSyncedPlaylistId = surprisedPlaylistIds}
        else{emotionSyncedPlaylistId = happyPlaylistIds}//if ended up on this page from nav bar just default emotion to happy
        searchPlaylistsID(emotionSyncedPlaylistId).then(setloaded(true))
      }
      
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
      let totalDurationMs = 0;
      let earliestReleaseYear = 9999; // set to a high number to find the earliest year
      let latestReleaseYear = 0; // set to 0 to find the latest year
      //Get the track information such as duration of the playlists
      for (let playlist of results) {
        const playlistPopularity = playlist.data.tracks.items.reduce((totalPopularity, track) => {
          return totalPopularity + track.track.popularity;
        }, 0);
        
        const averagePopularity = Math.round(playlistPopularity / playlist.data.tracks.items.length);

        const tracks = playlist.data.tracks.items;
        //get the duration of every track in the playlist and add it to the total
        const authors = new Set();
        for (let track of tracks) {
          totalDurationMs += track.track.duration_ms;
          for (let author of track.track.artists) {
            authors.add(author.name);
          }
        //Figuring out when the earliest song in the playlist was made and the most recent
        const releaseYear = parseInt(track.track.album.release_date.slice(0, 4)); // extract the release year from the release date
        if (releaseYear < earliestReleaseYear) {
          earliestReleaseYear = releaseYear;
        }
        if (releaseYear > latestReleaseYear) {
          latestReleaseYear = releaseYear;
        }
    }

        const duration = calculateDuration(totalDurationMs);
        //set up new json with the added duration to the playlist information
        const playlistWithDuration = {
          ...playlist.data,
          duration: duration,
          numAuthors: authors.size,
          averagePopularity: averagePopularity,
          earliestReleaseYear: earliestReleaseYear,
          latestReleaseYear: latestReleaseYear
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
                    <p className='music-player-details-text'>{playlist[playlistID].numAuthors} Authors</p>
                    <p className='music-player-details-text'> Duration: {playlist[playlistID].duration}</p>
                    <p className='music-player-details-text'> The average popularity of tracks in the playlist is {playlist[playlistID].averagePopularity}/100.</p>
                    <p className='music-player-details-text'> This playlist features songs from as early as {playlist[playlistID].earliestReleaseYear} to as recent as {playlist[playlistID].latestReleaseYear}.</p>
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