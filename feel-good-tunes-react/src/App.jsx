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
  const [sessionToken, setSessionToken] = useState("");

  return (
    <div>
      {(sessionToken !== "" && page !== 'spotifyConnect') ? <NavBar setPage={setPage} /> : null}
      {sessionToken === "" ? <SpotifyConnect setSessionToken={setSessionToken}/> : null}
      {(sessionToken !== "" && page === 'home') ? <Home setCamState={setCamState} setPage={setPage} /> : null}
      {(sessionToken !== "" && page === 'playlists') ? <Playlists sessionToken={sessionToken} /> : null}
      {camState ? <Cam /> : null}
    </div>
  );
}

export default App;
