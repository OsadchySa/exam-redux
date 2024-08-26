import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { pokemonActions } from "../redux/slice/pokemonSlice";

const PokemonFormPage = () => {
    const { formId } = useParams()
    const dispatch = useAppDispatch()
    const {selectedForm, isLoaded, error } = useAppSelector(
        (state) => state.pokemon)

    useEffect(() => {
        if (formId) {
            dispatch(pokemonActions.loadPokemonForm(formId))
        }
    }, [formId, dispatch])

    if (!isLoaded) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!selectedForm) return <div>No form data found</div>

    return (
        <div>
            <h1>{selectedForm.name}</h1>
            <img src={selectedForm.imageUrl} alt={selectedForm.name} />
            <p>Abilities: {selectedForm.abilities.join(', ')}</p>
            <p>Types: {selectedForm.types.join(', ')}</p>
        </div>
    )
}

export default PokemonFormPage