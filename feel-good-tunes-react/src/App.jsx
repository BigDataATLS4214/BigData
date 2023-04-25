import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

import { Home } from "./pages/Home";
import { Playlists } from "./pages/Playlists";
import { NavBar } from "./components/NavBar";
import { SpotifyConnect } from './components/SpotifyConnect';
import { Cam } from './pages/Cam';
import { Mic } from './pages/Mic';

function App() {
  const [page, setPage] = useState('home');
  const [emotion, setEmotion] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [previouspage, setPreviousPage] = useState("ML");



  const PORT_NUM = 8000; //change this to your port number!
  const mongoDBURI = 'http://localhost:' + PORT_NUM;

  const [happyplaylistids, sethappyplaylistids] = useState([]);
  const [sadplaylistids, setsadplaylistids] = useState([]);
  const [angryplaylistids, setangryplaylistids] = useState([]);
  const [neutralplaylistids, setneutralplaylistids] = useState([]);
  const [surprisedplaylistids, setsurprisedplaylistids] = useState([]);


  //Hit the mongoDB for the emotion id's and the playlist Id's, we will sort them here aswell into the correct emotion category.
  useEffect(() => {
    //get the emotions and playlist ids from mongodb
    var happyID;
    var sadID;
    var angryID;
    var neutralID;
    var surprisedID;
    axios.get(mongoDBURI + '/emotions/')
      .then(response => {
        if(response.data.length > 0){
          response.data.forEach((emotion) => { //get the id's for all of the different emotions
            // console.log(emotion.name + emotion._id)
            if(emotion.name === "happy"){happyID = emotion._id}
            if(emotion.name === "sad"){sadID = emotion._id}
            if(emotion.name === "angry"){angryID = emotion._id}
            if(emotion.name === "neutral"){neutralID = emotion._id}
            if(emotion.name === "surprised"){surprisedID = emotion._id}
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      //used to prevent having to attempt to push to the state list, we can create the list then just assign the state to it.
      var happy = []; var sad = []; var angry = []; var surprised = []; var neutral = [];
      axios.get(mongoDBURI + '/playlist_ids/') //get all of the playlistsID then sort them into the correct emotion based on the emotion ids
      .then(response => {
        if(response.data.length > 0){
          response.data.forEach((playlist) => { //get the id's for all of the different emotions
            // console.log(playlist.name + "  " + playlist.emotion_id)
            if(playlist.emotion_id === happyID){console.log(playlist.spotify_id + "happyID"); happy.push(playlist.spotify_id)}
            else if(playlist.emotion_id === sadID){console.log(playlist.spotify_id + "sadID"); sad.push(playlist.spotify_id)}
            else if(playlist.emotion_id === angryID){console.log(playlist.spotify_id + "angryID"); angry.push(playlist.spotify_id)}
            else if(playlist.emotion_id === neutralID){console.log(playlist.spotify_id + "neutralID"); neutral.push(playlist.spotify_id)}
            else if(playlist.emotion_id === surprisedID){console.log(playlist.spotify_id + "surprisedID"); surprised.push(playlist.spotify_id)}
          })
        }
        sethappyplaylistids(happy);
        setsadplaylistids(sad);
        setangryplaylistids(angry);
        setneutralplaylistids(neutral);
        setsurprisedplaylistids(surprised);
      })
      .catch((error) => {
        console.log(error);
      })
    }, [])

  return (
    <div>
      {(sessionToken !== "" && page !== 'spotifyConnect') ? <NavBar page={page} setPage={setPage} /> : null}
      {sessionToken === "" ? <SpotifyConnect setSessionToken={setSessionToken}/> : null}
      {(sessionToken !== "" && page === 'home') ? <Home setPage={setPage} setPreviousPage={setPreviousPage} setEmotion={setEmotion} /> : null}
      {(sessionToken !== "" && page === 'playlists') ? <Playlists sessionToken={sessionToken} emotion = {emotion} happyPlaylistIds = {happyplaylistids} neutralPlaylistIds = {neutralplaylistids} sadPlaylistIds = {sadplaylistids} angryPlaylistIds = {angryplaylistids} surprisedPlaylistIds = {surprisedplaylistids} previousPage = {previouspage}/> : null}
      {(sessionToken !== "" && page === 'scanMood' )? <Cam setPage={setPage} setPreviousPage={setPreviousPage}/> : null}
      {(sessionToken !== "" && page === 'sayMood' )? <Mic setPage={setPage} setPreviousPage={setPreviousPage}/> : null}
    </div>
  );
}

export default App;
