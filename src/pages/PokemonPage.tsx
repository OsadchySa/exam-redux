import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/store"; // Переконайтеся, що ці хуки правильно налаштовані
import { useParams } from 'react-router-dom';
import { pokemonActions } from "../redux/slice/pokemonSlice";
import { RootState } from "../redux/store"; // Імпорт RootState з вашого store

const PokemonPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { pokemon, isLoaded, error } = useAppSelector((state: RootState) => state.pokemon); // Додали RootState

    useEffect(() => {
        if (id) {
            dispatch(pokemonActions.loadPokemon(parseInt(id)));
        }
    }, [id, dispatch]);

    if (!isLoaded) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pokemon) return <div>No Pokémon data found.</div>;

    return (
        <div>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <p><strong>Abilities:</strong> {pokemon.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(', ')}</p> {/* Вказано тип ability */}
            <p><strong>Stats:</strong> {pokemon.stats.map((stat: { stat: { name: string }; base_stat: number }) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p> {/* Вказано тип stat */}
            <p><strong>Types:</strong> {pokemon.types.map((type: { type: { name: string } }) => type.type.name).join(', ')}</p> {/* Вказано тип type */}
            <p><strong>Forms:</strong> {pokemon.forms.map((form: { name: string }) => form.name).join(', ')}</p> {/* Вказано тип form */}
        </div>
    );
};

export default PokemonPage;