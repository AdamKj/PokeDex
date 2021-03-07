import './App.css';
import React from 'react';
import {Pokemon} from './components/Pokemons';


function App() {
  return (
    <div className = 'App'>
      
      <h1><b>PokeDex</b></h1>
      <div id = 'pokeContainer' className = "poke-container"></div>
      <Pokemon />
    </div>
  );
}

export default App;
