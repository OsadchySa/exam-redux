import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useParams } from 'react-router-dom';
import { pokemonActions } from "../redux/slice/pokemonSlice";
import { RootState } from "../redux/store";

const PokemonPage: React.FC = () => {
    const { pokemonId } = useParams<{pokemonId: string }>()
    const dispatch = useAppDispatch()
    const { pokemon, isLoaded, error } = useAppSelector((state: RootState) => state.pokemon)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (pokemonId) {
            dispatch(pokemonActions.loadPokemon(parseInt(pokemonId)))
        }
    }, [pokemonId, dispatch])

    useEffect(() => {
        if (pokemon) {
            // Check if this Pokémon is in localStorage favorites
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            setIsFavorite(favorites.some((fav: { id: number }) => fav.id === pokemon.id))
        }
    }, [pokemon])

    const handleToggleFavorite = () => {
        if (pokemon) {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            if (isFavorite) {
                const updatedFavorites = favorites.filter((fav: { id: number }) => fav.id !== pokemon.id)
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            } else {
                const updatedFavorites = [...favorites, pokemon]
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
            }
            setIsFavorite(!isFavorite)
        }
    };

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!pokemon) return <div>No Pokémon data found.</div>

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name}/>
            <p><strong>Abilities:</strong> {pokemon.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(', ')}</p>
            <p><strong>Stats:</strong> {pokemon.stats.map((stat: { stat: { name: string }; base_stat: number }) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
            <p><strong>Types:</strong> {pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(', ')}</p>
            <p><strong>Forms:</strong> {pokemon.forms.map((form: { name: string }) => form.name).join(', ')}</p>
            <button onClick={handleToggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    )
}

export default PokemonPage