/* import './Pokemons.css';
import React from 'react';

export const Pokemons = () => {
const pokeContainer = document.getElementById('poke_container');
    const pokemonsNumber = 150;
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
    const mainTypes = Object.keys(colors);

    const fetchPokemons = async() => {
        for (let i = 1; i <= pokemonsNumber; i++) {
            await getPokemon(i);
        }
    };

    const getPokemon = async id => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        createPokemonCard(pokemon);
    };

    function createPokemonCard(pokemon) {
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');

        const type = pokemon.types[0].type.name;
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
        const color = colors[type];

        pokemonEl.style.backgroundColor = color;

        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>`;

        pokemonEl.innerHTML = pokeInnerHTML;

        if (pokeContainer) {
            pokeContainer.appendChild(pokemonEl);
        }
    }
    fetchPokemons();
    
    return (
        <div></div>
    )
}    
*/

import './Pokemons.css';
import React, { Component } from 'react';
import PokeCard from './PokeCard.js'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";


const ForwardButton = styled('button')`
    background-color: rgba(0,0,0,0.6);  
    position: absolute;
    right: 0;
    top: 00;
    height: 100%;
    &:hover {
        background-color: rgba(0,0,0,0.9); 
    }
    &:focus {
        box-shadow: none;
    }
`;
const PreviousButton = styled('button')`
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    &:hover {
        background-color: rgba(0,0,0,0.9); 
    }
    &:focus {
        box-shadow: none;
    }
`;

export class Pokemon extends Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            pokemonDetails: [],
            loadNumber: '9',
            offset: 0,
            next: null,
            previous: null,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getMorePokemon();
    }

    getMorePokemon() {
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${this.state.loadNumber}&offset=${this.state.offset}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    this.setState({ pokemons: data.results, next: data.next, previous: data.previous }, () => {
                        this.state.pokemons.map(pokemon => {
                            fetch(pokemon.url)
                                .then(response => response.json())
                                .then(data => {
                                    if (data) {
                                        var temp = this.state.pokemonDetails
                                        temp.push(data)
                                        this.setState({ pokemonDetails: temp })
                                    }
                                })
                                .catch(console.log)
                        })
                    })
                }
            })
            .catch(console.log)
    }


    handleClick(pag) {
        const newOffset = pag === 'forward' ? this.state.offset + 10 : this.state.offset - 10;
        this.setState({ offset: newOffset, pokemons: [], pokemonDetails: [] }, () => {
            console.log("Offset: " + this.state.offset)
            this.getMorePokemon();
        });

    }

    render() {
        const { pokemonDetails, next, previous } = this.state;

        const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
            return (<PokeCard pokemon={pokemon} key={index} />);
        });

        return (
            <div className='wrapper'>
                {pokemonDetails && (
                    <div className="container">
                        <div className="card-columns">
                            {renderedPokemonList}
                        </div>
                        <PreviousButton type="button" className="btn col-md-1 mx-auto" key="backwards-button" id="backwards-button" disabled={previous ? false : true} onClick={() => this.handleClick('backward')}>
                            <FontAwesomeIcon icon={faLongArrowAltLeft} size="6x" color="grey" />
                        </PreviousButton>
                        <ForwardButton type="button" className="btn col-md-1 mx-auto" key="forwards-button" id="forwards-button" disabled={next ? false : true} onClick={() => this.handleClick('forward')}>
                            <FontAwesomeIcon icon={faLongArrowAltRight} size="6x" color="grey" />
                        </ForwardButton>
                    </div>
                )}
            </div>
        );
    }
}

