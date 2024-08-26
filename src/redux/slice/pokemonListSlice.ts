import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPokemon } from '../../models/IPokemon';
import { getPokemonsWithImages } from '../../services/api.service';

interface PokemonListState {
    pokemons: IPokemon[];
    isLoaded: boolean;
    error: string | null;
    offset: number
}

const initialState: PokemonListState = {
    pokemons: [],
    isLoaded: false,
    error: null,
    offset: 0
}

export const loadPokemons = createAsyncThunk<
    IPokemon[],
    number,
    { rejectValue: string }
>(
    'pokemonList/loadPokemons',
    async (offset, thunkAPI) => {
        try {
            const data = await getPokemonsWithImages(offset)
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch Pokémon list')
        }
    }
)

const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {
        incrementOffset: (state) => {
            state.offset += 20
        },
        decrementOffset: (state) => {
            if (state.offset > 0) {
                state.offset -= 20
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPokemons.pending, (state) => {
                state.isLoaded = false;
                state.error = null;
            })
            .addCase(loadPokemons.fulfilled, (state, action: PayloadAction<IPokemon[]>) => {
                state.pokemons = action.payload;
                state.isLoaded = true;
            })
            .addCase(loadPokemons.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoaded = true;
            })
    }
})

export const { incrementOffset, decrementOffset } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;