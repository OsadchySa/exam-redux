import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul className={'headerUl'}>
                <Link className={'headLink'} to={'/pokemons'}>TO POKEMONS PAGE</Link>
                <Link className={'headLink'} to={'/favpokemons'}>TO FAVORITE POKEMON PAGE</Link>
                <hr/>
            </ul>
        </div>
    );
};

export default Header;