import React, { useEffect, useState } from 'react';
import profile from '../img/profile-picture.png';
import { PlaylistResults } from "../components/PlaylistResults";
import { withRouter } from "react-router";
import  spotifyLogo from '../img/spotify-logo.gif';

import axios from "axios";


import '../scss/Home.scss';

export const SpotifyConnect = ( {setSessionToken} ) => {

  // Spotify API CONNECTION
  const CLIENT_ID = "299b99d63f61494e86ebc0716e207405";
  const REDIRECT_URI = "https://playlist-genie.vercel.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState("")

  useEffect(() => {
    const hash = window.location.hash;
    console.log(hash);
    if(hash){
      let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      console.log(token);
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token);
      setSessionToken(token);
    }
    //add error handler for when the hash is not grabbed.
  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  // const searchArtists = async (e) =>{
  //   e.preventDefault()
  //   const {data} = await axios.get("https://api.spotify.com/v1/search", {
  //     headers:{
  //       Authorization: `Bearer ${token}`
  //     },
  //     params:{
  //       q: searchKey,
  //       type: "artist"
  //     }
  //   })
  //   console.log(data)
  //   setArtists(data.artists.items)
  // }
  // // Spotify API CONNECTION END


  // const renderArtists = () => {
  //   return artists.map(artist => (
  //       <div key={artist.id}>
  //           {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="artist" /> : <div> No Image </div>}
  //           {artist.name}
  //       </div>
  //   ))
  // }

  let url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state`;

    return(
      <div className='home-container'>
        {/* Spotify AUTHENTICATION */}
        {!token ? 
        <div >
          <h2 className = 'before-you-start-text'>Before you continue, please sign into spotify</h2>
          <img style = {{width: '70%'}}src ={spotifyLogo} />
          <button className = 'sign-into-spotify' onClick = {() => {window.location.href = url}}>Log in to Spotify</button>
        </div>
          : 
          <button onClick={logout}>Logout</button>}
        {/* Spotify AUTHENTICATION END*/}

        {/* SPOTIFY FORM */}
        {/* {token ?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}> Search </button>
          </form>
          :
          <h2>Please login</h2>
        } */}
        {/* Spotify FORM END */}
        {/* {artists ? 
            renderArtists()
            : 
            <h2>Search For an artist</h2>
        } */}
      </div>
    );
  };