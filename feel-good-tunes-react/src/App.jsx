import './App.css';
import React, { useState } from 'react';

import { Home } from "./pages/Home";
import { Playlists } from "./pages/Playlists";
import { NavBar } from "./components/NavBar";
import { Cam } from './pages/Cam';

function App() {
  const [page, setPage] = useState('home');
  const [camState, setCamState] = useState(false);
  return (
    <div>
      <NavBar setPage={setPage} />
      {page === 'home' ? <Home setCamState={setCamState} setPage={setPage} /> : null}
      {page === 'playlists' ? <Playlists /> : null}
      {camState ? <Cam />: null}
    </div>
  );
}

export default App;
