import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { loadPokemons, setOffset } from "../redux/slice/pokemonSlice";
import { Link } from 'react-router-dom';

const PokemonsComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const { pokemons, isLoaded, error, offset } = useAppSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(loadPokemons())
    }, [dispatch, offset])

    const handleNext = () => {
        dispatch(setOffset(offset + 20))
    };

    const handlePrev = () => {
        if (offset > 0) {
            dispatch(setOffset(offset - 20))
        }
    }

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

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
                <button className="pagButton" onClick={handlePrev} disabled={offset === 0}>
                    Prev
                </button>
                <button className="pagButton" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default PokemonsComponent;