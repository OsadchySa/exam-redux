import React, { FC, useEffect, useState } from 'react';
import { IPokemon } from '../models/IPokemon';
import { Link } from 'react-router-dom';
import { getPokemonsWithImages } from '../services/api.service';

const Pokemons: FC = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([])
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const fetchPokemons = async () => {
            const data = await getPokemonsWithImages(offset)
            setPokemons(data)
        };
        fetchPokemons()
    }, [offset])

    const handleNext = () => {
        setOffset(prev => prev + 20)
    }

    const handlePrev = () => {
        if (offset > 0) {
            setOffset(prev => prev - 20)
        }
    }

    return (
        <div>
            <div className="allPokDiv">
                {pokemons.map((pokemon) => (
                    <Link to={'/pokemons/' + pokemon.id} key={pokemon.id}>
                        <div className={'miniPokDiv'}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                <button className={'pagButton'} onClick={handlePrev} disabled={offset === 0}>
                    Prev
                </button>
                <button className={'pagButton'} onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pokemons;