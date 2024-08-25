import React from 'react';
import { useAppSelector } from "../redux/store";
import { IPokemon } from "../models/IPokemon";

const SearchPage = () => {
    const { searchResults, isLoaded, error } =
        useAppSelector((state) => state.pokemon);

    if (!isLoaded) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!searchResults || searchResults.length === 0) return <div>No results found</div>;


    return (
        <div className={'searchDiv'}>
            {searchResults.map((pokemon: IPokemon) => (
                <div className={'miniPokDiv'} key={pokemon.id}>
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <p>
                        <strong>Abilities:</strong> {pokemon.abilities?.map((ability: { ability: { name: string } }) => ability.ability.name).join(', ')}
                    </p>
                    <p>
                        <strong>Stats:</strong> {pokemon.stats?.map((stat: { stat: { name: string }; base_stat: number }) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}
                    </p>
                    <p>
                        <strong>Types:</strong> {pokemon.types?.map((type: { type: { name: string } }) => type.type.name).join(', ')}
                    </p>
                    <p>
                        <strong>Forms:</strong> {pokemon.forms?.map((form: { name: string }) => form.name).join(', ')}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default SearchPage;