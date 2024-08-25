import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useParams } from "react-router-dom";
import { pokemonActions } from "../redux/slice/pokemonSlice";

const SearchByTypeOrAbilityPage = () => {
    const { searchResults, isLoaded, error } = useAppSelector((state) => state.pokemon);
    const { searchType, query } = useParams();
    const dispatch = useAppDispatch();
    console.log(query)
    console.log(searchType)
    console.log(searchResults)
    useEffect(() => {
        if (searchType && query) {
            if (searchType === 'type') {
                dispatch(pokemonActions.loadPokemonsByType(query))
            } else if (searchType === 'ability') {
                dispatch(pokemonActions.loadPokemonsByAbility(query))
            }
        }
    }, [searchType, query, dispatch]);

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (searchResults.length === 0) return <div>No results found</div>

    return (
        <div className="searchResults">
            {searchResults.map((pokemon, index) => (
                <div className="pokemonCard" key={index}>
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.image} alt={pokemon.name}/>
                </div>
            ))}
        </div>
    )
}

export default SearchByTypeOrAbilityPage