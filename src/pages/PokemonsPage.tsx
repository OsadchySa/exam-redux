import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../redux/store";
import {pokemonAction} from "../redux/slice/pokemonSlice";
import Pokemons from "../components/PokemonsComponent";


const PokemonsPage = () => {
    let dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(pokemonAction.loadPokemons())
    }, [])
    let {pokemons} = useAppSelector(state => state.pokemonStore)
    return (
        <div>
            <Pokemons/>
        </div>
    );
};

export default PokemonsPage;