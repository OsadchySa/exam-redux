import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IPokemon} from '../../models/IPokemon';
import {getPokemonDetails, getPokemonsWithImages} from '../../services/api.service';
import {RootState} from "../store";

type PokemonState = {
    pokemons: IPokemon[];
    pokemon: IPokemon | null;
    error: string | null;
    isLoaded: boolean;
    offset: number
}

const initialState: PokemonState = {
    pokemons: [],
    pokemon: null,
    error: null,
    isLoaded: false,
    offset: 0
}

export const loadPokemons = createAsyncThunk<
    IPokemon[],
    void,
    { state: RootState; rejectValue: string }
>('pokemon/loadPokemons', async (_, thunkAPI) => {
    const { offset } = thunkAPI.getState().pokemon
    const pokemons = await getPokemonsWithImages(offset)
    return pokemons
})

export const loadPokemon = createAsyncThunk('pokemon/loadPokemon', async (id: number) => {
    const pokemon = await getPokemonDetails(id)
    return pokemon
})

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setOffset: (state, action) => {
            state.offset = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload
                state.isLoaded = true
            })
            .addCase(loadPokemons.pending, (state) => {
                state.isLoaded = false
                state.error = null
            })
            .addCase(loadPokemons.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to load pokemons'
                state.isLoaded = true
            })
            .addCase(loadPokemon.fulfilled, (state, action) => {
                state.pokemon = action.payload
                state.isLoaded = true
            })
            .addCase(loadPokemon.pending, (state) => {
                state.isLoaded = false
                state.error = null
            })
            .addCase(loadPokemon.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to load pokemon'
                state.isLoaded = true
            })
    }
})

export const { setOffset } = pokemonSlice.actions
export const pokemonActions = {
    loadPokemons,
    loadPokemon,
    setOffset
}
export const pokemonReducer = pokemonSlice.reducer