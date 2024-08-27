import React from 'react';
import {Link} from 'react-router-dom';

const FavPokemonsPage: React.FC = () => {
    const [favorites, setFavorites] = React.useState<any[]>([])

    React.useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        setFavorites(savedFavorites)
    }, [])

    return (
        <div>
            <h1>Favorite Pokemons</h1>
            <div className="allPokDiv">
                {favorites.map((pokemon: any) => (
                    <Link to={'/pokemons/' + pokemon.id} key={pokemon.id}>
                        <div className={'miniPokDiv'}>
                            <h3>{pokemon.name}</h3>
                            <img src={pokemon.image} alt={pokemon.name} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FavPokemonsPage;