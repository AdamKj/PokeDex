import React from 'react'

const PokeCard = ({pokemon}) => {
  
  const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  };
  
  const type = pokemon.types[0].type.name;
  const color = colors[type];

    return (
      <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}} key={pokemon.id} backgroundColor={color}>
        <div className="card-header"><b>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</b></div>
        <div className="card-body">          
          <h6 className="card-subtitle mb-2 text-muted">Id: #{pokemon.id.toString().padStart(3, '0')}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Height: {pokemon.height}</h6>  
          <h6 className="card-subtitle mb-2 text-muted">Weight: {pokemon.weight}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Type: {pokemon.type}</h6>
          <img src={pokemon.sprites['front_default']} alt = "" />
          <img src={pokemon.sprites['back_default']} alt = ""/>                       
        </div>
      </div>
    )
};

export default PokeCard