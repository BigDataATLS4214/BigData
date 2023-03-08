import React from 'react';

import '../scss/SongListener.scss';

import albumCover from '../img/testAlbumCoverArt.jpg';

import playButton from '../img/player-play.png';

export const SongListener = () => {
    return(
        <div className='song-container'>
            <div className='music-player'>
                <img className = 'music-player-album'src = {albumCover} alt = "placeholder-album-cover" />
                <div className='music-player-controls'>
                    <h2 className='music-player-detail-header'>Good Vibes Only</h2>
                    <p className='music-player-details-text'>10 Artists</p>
                    <p className='music-player-details-text'>10 Songs</p>
                    <p className='music-player-details-text'>0h 48mins</p>
                    <button className = 'music-player-button'>Play<img className = 'img-inside-button'src = {playButton}/></button>
                </div>
            </div>
        </div>
    )
}