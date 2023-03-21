import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import '../scss/Webcam.scss';

export const Cam = () => {

    let webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    let capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    return(
        <div className="container">
            <div className="center">
            <h1 className="header-font">The camera will now scan your mood.</h1>
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
                )}
            </div>
        </div>
    )
}