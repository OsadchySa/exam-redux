import {IPokemon} from "../../models/IPokemon";
import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import {getPokemonsWithImages} from "../../services/api.service";

type postSliceType = {
    pokemons: IPokemon[];
    error: string;
    pokemon: IPokemon | null;
    isLoaded: boolean;
}

const initState: postSliceType = {
    pokemons: [],
    error: '',
    pokemon: null,
    isLoaded: false
}

export const loadPokemons = createAsyncThunk<IPokemon[], void, { rejectValue: string }>(
    'pokemonSlice/loadPokemons',
    async (_, thunkAPI) => {
        let pokemons = await getPokemonsWithImages()
        return thunkAPI.fulfillWithValue(pokemons)
    }
)

export const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState: initState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPokemons.fulfilled, (state, action) => {
                state.pokemons = action.payload || []
                state.isLoaded = true
            })
            .addCase(loadPokemons.pending, (state) => {
                state.isLoaded = false
                state.error = ''
            })
            .addMatcher(isRejected(loadPokemons), (state, action) => {
                state.error = action.payload || 'An error occurred'
                state.isLoaded = true
            })
    }
})

export const pokemonAction = {
    ...pokemonSlice.actions,
    loadPokemons
}