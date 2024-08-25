import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {pokemonActions} from "../../redux/slice/pokemonSlice";

const Header = () => {
    const [searchName, setSearchName] = useState('')
    const [searchType, setSearchType] = useState('')
    const [searchAbility, setSearchAbility] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleSearchByName = (el: React.FormEvent) => {
        el.preventDefault()
        dispatch(pokemonActions.loadPokemonsByName(searchName))
        navigate('/found')
    }
    const handleSearchByType = (el: React.FormEvent) => {
        el.preventDefault();
        dispatch(pokemonActions.loadPokemonsByType(searchType));
        navigate(`search/type/${searchType}`)
    }
    const handleSearchByAbility = (el: React.FormEvent) => {
        el.preventDefault();
        dispatch(pokemonActions.loadPokemonsByAbility(searchAbility))
        navigate(`search/ability/${searchAbility}`)
    }

    return (
        <div>
            <ul className={'headerUl'}>
                <Link className={'headLink'} to={'/pokemons'}>TO POKEMONS PAGE</Link>
                <Link className={'headLink'} to={'/favorites'}>TO FAVORITE POKEMON PAGE</Link>
                <form onSubmit={handleSearchByName}>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(ev) => setSearchName(ev.target.value)}
                        placeholder="search Pokemon by name"
                    />
                    <button type={"submit"}>Search Pokemon</button>
                </form>
                <form onSubmit={handleSearchByType}>
                    <input
                        type="text"
                        value={searchType}
                        onChange={(ev) => setSearchType(ev.target.value)}
                        placeholder="Search by type"
                    />
                    <button type="submit">Search by type</button>
                </form>
                <form onSubmit={handleSearchByAbility}>
                    <input
                        type="text"
                        value={searchAbility}
                        onChange={(ev) => setSearchAbility(ev.target.value)}
                        placeholder="Search by ability"
                    />
                    <button type="submit">Search by ability</button>
                </form>
                <hr/>
            </ul>
        </div>
    )
}

export default Header