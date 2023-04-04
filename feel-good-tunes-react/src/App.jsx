import './App.css';
import React, { useState } from 'react';

import { Home } from "./pages/Home";
import { Playlists } from "./pages/Playlists";
import { NavBar } from "./components/NavBar";
import { SpotifyConnect } from './components/SpotifyConnect';
import { Cam } from './pages/Cam';

function App() {
  const [page, setPage] = useState('home');
  const [camState, setCamState] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  return (
    <div>
      {(accessToken !== "" && page !== 'spotifyConnect') ? <NavBar setPage={setPage} /> : null}
      {accessToken === "" ? <SpotifyConnect setAccessToken={setAccessToken}/> : null}
      {(accessToken !== "" && page === 'home') ? <Home setCamState={setCamState} setPage={setPage} /> : null}
      {(accessToken !== "" && page === 'playlists') ? <Playlists accessToken={accessToken} /> : null}
      {camState ? <Cam /> : null}
    </div>
  );
}

export default App;
