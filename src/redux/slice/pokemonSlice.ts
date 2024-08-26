import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IPokemon} from '../../models/IPokemon';
import {
    getPokemonDetails,
    getPokemonsByAbility,
    getPokemonsByType,
    getPokemonsWithImages,
    getSearchedPokemonsByName,
    getPokemonForm
} from '../../services/api.service';
import {RootState} from "../store";
import {IPokemonForm} from "../../models/IPokemonForm";



type PokemonState = {
    pokemons: IPokemon[];
    pokemon: IPokemon | null;
    searchResults: IPokemon[];
    error: string | null;
    selectedForm: IPokemonForm | null;
    isLoaded: boolean;
    offset: number
}

const initialState: PokemonState = {
    pokemons: [],
    pokemon: null,
    searchResults: [],
    selectedForm: null,
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

export const loadPokemonsByName = createAsyncThunk('pokemon/loadSearchedPokemonsByName',
    async (name:string) => {
        const result = await getSearchedPokemonsByName(name)
        return result
})

export const loadPokemonsByType = createAsyncThunk('pokemon/loadPokemonsByType',
    async (type: string) => {
        const result = await getPokemonsByType(type)
        const detailedPokemons = await Promise.all(result.map(async (poke: {url: string}) => {
            const response = await fetch(poke.url)
            const data = await response.json()
            return{
                name: data.name,
                image: data.sprites.front_default
            }}))
        console.log(detailedPokemons)
        return detailedPokemons
    }
)

export const loadPokemonsByAbility = createAsyncThunk(
    'pokemon/loadPokemonsByAbility',
    async (ability: string) => {
        const result = await getPokemonsByAbility(ability)
        const detailedPokemons = await Promise.all(result.map(async (poke: { url: string }) => {
            const response = await fetch(poke.url)
            const data = await response.json()
            return {
                name: data.name,
                image: data.sprites.front_default
            }
        }))
        console.log(detailedPokemons)
        return detailedPokemons
    }
)

export const loadPokemonForm = createAsyncThunk(
    'pokemon/loadPokemonForm',
    async (formId: string) => {
        const formData = await getPokemonForm(formId)
        return formData
    }
)


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
            .addCase(loadPokemonsByName.fulfilled, (state, action) => {
                state.searchResults = [action.payload]
                state.isLoaded = true
            })
            .addCase(loadPokemonsByName.pending, (state) => {
                state.isLoaded = false
                state.error = null
            })
            .addCase(loadPokemonsByName.rejected, (state, action) => {
                state.error = action.error.message || 'failed to search'
                state.isLoaded = true
            })
            .addCase(loadPokemonsByType.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.isLoaded = true;
            })
            .addCase(loadPokemonsByType.pending, (state) => {
                state.isLoaded = false
                state.error = null
            })
            .addCase(loadPokemonsByType.rejected, (state, action) => {
                state.error = action.error.message || 'failed to search'
                state.isLoaded = true
            })
            .addCase(loadPokemonsByAbility.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.isLoaded = true;
            })
            .addCase(loadPokemonsByAbility.pending, (state) => {
                state.isLoaded = false
                state.error = null
            })
            .addCase(loadPokemonsByAbility.rejected, (state, action) => {
                state.error = action.error.message || 'failed to search'
                state.isLoaded = true
            })
            .addCase(loadPokemonForm.fulfilled, (state, action) => {
            state.selectedForm = action.payload; // Зберігаємо дані форми в стані
            state.isLoaded = true;
        })
            .addCase(loadPokemonForm.pending, (state) => {
                state.isLoaded = false;
                state.error = null;
            })
            .addCase(loadPokemonForm.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to load form data'
                state.isLoaded = true;
            })
    }
})

export const { setOffset } = pokemonSlice.actions
export const pokemonActions = {
    loadPokemons,
    loadPokemon,
    loadPokemonsByName,
    loadPokemonsByType,
    loadPokemonsByAbility,
    loadPokemonForm,
    setOffset
}
export const pokemonReducer = pokemonSlice.reducer