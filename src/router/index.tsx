import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import PokemonsPage from "../pages/PokemonsPage";
import PokemonPage from "../pages/PokemonPage";


export let router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout/>,
        errorElement: <h1>404 Error</h1>,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'pokemons', element: <PokemonsPage/>},
            {path: 'pokemons/:pokemonId', element: <PokemonPage/>}
        ]
    }
])