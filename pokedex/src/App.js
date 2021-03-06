import './App.css';
import {Pokemons} from './components/Pokemons';

function App() {
  return (
    <main>
      <div className = 'main'>
        <h1>PokeDex</h1>
        <div id = 'pokeContainer' className = "poke-container"></div>
      </div>
    </main>
  );
}

export default App;
