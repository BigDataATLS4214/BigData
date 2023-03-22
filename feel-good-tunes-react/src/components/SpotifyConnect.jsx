import React, { useEffect, useState } from 'react';
import profile from '../img/profile-picture.png';
import { PlaylistResults } from "../components/PlaylistResults";
import { withRouter } from "react-router";

import axios from "axios";

import '../scss/Home.scss';

export const SpotifyConnect = () => {

  // Spotify API CONNECTION
  const CLIENT_ID = "299b99d63f61494e86ebc0716e207405";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState("")

  useEffect(() => {
    const hash = window.location.hash;

    if(hash){
      let token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      console.log(token);
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token);
    }
  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  const searchArtists = async (e) =>{
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers:{
        Authorization: `Bearer ${token}`
      },
      params:{
        q: searchKey,
        type: "artist"
      }
    })
    console.log(data)
    setArtists(data.artists.items)
    
  }
  // Spotify API CONNECTION END


  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="artist Photo" /> : <div> No Image </div>}
            {artist.name}
        </div>
    ))
  }

    return(
      <div className='container'>
        {/* Spotify AUTHENTICATION */}
        {!token ? 
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> Login to Spotify </a>
          : 
          <button onClick={logout}>Logout</button>}
        {/* Spotify AUTHENTICATION END*/}

        {/* SPOTIFY FORM */}
        { token?
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type={"submit"}> Search </button>
          </form>
          :

          <h2>Please login</h2>
        }
        {/* Spotify FORM END */}
        {artists ? 
            renderArtists()
            : 
            <h2>Search For an artist</h2>
        }
      </div>
    );
  };