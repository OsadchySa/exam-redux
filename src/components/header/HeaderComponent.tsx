import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul className={'headerUl'}>
                <Link className={'headLink'} to={'/pokemons'}>TO POKEMONS PAGE</Link>
                <Link className={'headLink'} to={'/favorites'}>TO FAVORITE POKEMON PAGE</Link>
                <form>
                    <input/>
                    <button>Search Pokemon</button>
                </form>
                <form>
                    <input/>
                    <button>Search by type</button>
                </form>
                <form>
                    <input/>
                    <button>Search by ability</button>
                </form>
                <hr/>
            </ul>
        </div>
    );
};

export default Header;