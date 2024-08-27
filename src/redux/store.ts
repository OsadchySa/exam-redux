import {configureStore} from '@reduxjs/toolkit';
import {pokemonReducer} from "./slice/pokemonSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector