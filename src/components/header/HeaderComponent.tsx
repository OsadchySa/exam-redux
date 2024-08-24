import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {pokemonActions} from "../../redux/slice/pokemonSlice";

const Header = () => {
    const [searchName, setSearchName] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleSearch = (el: React.FormEvent) => {el.preventDefault();
    dispatch(pokemonActions.loadSearchedPokemonsByName(searchName));
    navigate('/found')}
    return (
        <div>
            <ul className={'headerUl'}>
                <Link className={'headLink'} to={'/pokemons'}>TO POKEMONS PAGE</Link>
                <Link className={'headLink'} to={'/favorites'}>TO FAVORITE POKEMON PAGE</Link>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(ev) => setSearchName(ev.target.value)}
                        placeholder="search Pokemon by name"
                    />
                    <button type={"submit"}>Search Pokemon</button>
                </form>
                <form>
                    <input placeholder="search by type"/>
                    <button type={"submit"}>Search by type</button>
                </form>
                <form>
                    <input placeholder="search by ability"/>
                    <button type={"submit"}>Search by ability</button>
                </form>
                <hr/>
            </ul>
        </div>
    );
};

export default Header;