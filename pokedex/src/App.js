import './App.css';
import React from 'react';
import {Pokemons} from './components/Pokemons';

function App() {
  return (
    <div className = 'App'>
      <Pokemons />
      <h1>PokeDex</h1>
      <div id = 'pokeContainer' className = "poke-container"></div>
    </div>
  );
}

export default App;
