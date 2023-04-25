import React, { useCallback, useRef, useState } from "react";
import '../scss/Webcam.scss';
import axios from "axios";

const PORT_NUM = 8000; //change this to your port number!
const mongoDBURI = 'http://localhost:' + PORT_NUM;

export const Cam = ({setPage, setPreviousPage , setEmotion}) => {

    const goToPlaylists = event => {
        setPage('playlists');
        setPreviousPage('ML');
        axios.get(mongoDBURI + '/Output/')
          .then(response => {
            console.log("Current EMOTION: "  + response.data.name)
            if (response.data.name === "happy") { setEmotion('happy')}
            else if (response.data.name === "neutral") { setEmotion('neutral')}
            else if (response.data.name === "sad") { setEmotion('sad')}
            else if (response.data.name === "angry") { setEmotion('angry') }
            else if (response.data.name === "surprise" || response.data.name === "surprised") { setEmotion('surprise')}
          })
          .catch((error) => {
            console.log(error);
          })
      }

    return(
        <div className="container">
            <div className="center">
                <iframe title="streamlitApp" src="http://localhost:8501/" width="80%" height="800px" allow="camera; microphone" frameBorder="0">
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