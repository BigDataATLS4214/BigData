import './App.css';
import React, { useState } from 'react';

import { Home } from "./pages/Home";
import { Playlists } from "./pages/Playlists";
import { NavBar } from "./components/NavBar";

function App() {
  const [page, setPage] = useState('home');

  return (
    <div>
      <NavBar setPage={setPage} />
      {page === 'home' ? <Home /> : null}
      {page === 'playlists' ? <Playlists /> : null}
    </div>
  );
}

export default App;
