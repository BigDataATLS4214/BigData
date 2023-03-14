import React from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playListData from '../mockJSONData/testPlaylists.json';

import playButton from '../img/player-play.png';


function durationCalculator(currentPlaylist){
    let totalMinutes = 0;
    let totalHours = 0;
    let totalSeconds = 0;
    playListData.results[currentPlaylist].tracks.forEach(element => {
        const tmp = element.song.duration.toString().split(":")
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


export const SongListener = () => {
    //Currently just pulling from json will need to pull from API every time a new playlist is clicked
    let songsAndArtists = playListData.results[0].tracks.length;
    let playlistDuration = durationCalculator(0);

    //need to add all of the songs durations... We may have this done in back end and already stored.
    //May be something in spotify api we can hit to get the duration
    

    return(
        <div className='song-container'>
            <div className='music-player'>
                <img className = 'music-player-album'src = {albumCover} alt = "placeholder-album-cover" />
                <div className='music-player-controls'>
                    <h2 className='music-player-detail-header'>Good Vibes Only</h2>
                    <p className='music-player-details-text'>{songsAndArtists} Artists</p>
                    <p className='music-player-details-text'>{songsAndArtists} Songs</p>
                    <p className='music-player-details-text'> Duration: {playlistDuration}</p>
                    <button className = 'music-player-button'>Play<img className = 'img-inside-button' alt = "play-button" src = {playButton}/></button>
                </div>
            </div>
        </div>
    )
}