import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import '../scss/Webcam.scss';

export const Cam = ({setPage, setPreviousPage}) => {

    const goToPlaylists = event => {
        setPage('playlists')
        setPreviousPage('ML')
      }

    return(
        <div className="container">
            <div className="center">
                <iframe title="streamlitApp" src="http://localhost:8501/" width="100%" height="800px" allow="camera; microphone" frameBorder="0">
                    <p>Your browser does not support iframes.</p>
                </iframe>
                <button onClick = {() => goToPlaylists()} className='scan-mood-button'>View Playlists!</button>
            {/* <h1 className="header-font">The camera will now scan your mood.</h1>
                <Webcam 
                mirrored = {true}
                ref = {webcamRef}
                screenshotFormat="images/jpeg"
                />
                <button className = "capture-photo-button" onClick={capture}>Capture Photo</button>
                {imgSrc && (
                    <div>
                        <img src = {imgSrc} />
                        <h1 className = "header-font">Looking good!</h1>
                    </div>
                )} */}
            </div>
        </div>
    )
}