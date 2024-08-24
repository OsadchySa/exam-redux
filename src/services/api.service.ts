const baseUrl = 'https://pokeapi.co/api/v2';

export const getPokemonsWithImages = async (offset = 0, limit = 20) => {
    const response = await fetch(`${baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
    const data = await response.json()
    const pokemons = data.results

    const pokemonDetailsPromises = pokemons.map(async (pokemon: { url: string }) => {
        const detailsResponse = await fetch(pokemon.url)
        const detailsData = await detailsResponse.json()
        return {
            id: detailsData.id,
            name: detailsData.name,
            image: detailsData.sprites.front_default
        }
    })

    const pokemonsWithImages = await Promise.all(pokemonDetailsPromises)
    return pokemonsWithImages
}

export const getPokemonDetails = async (id: number) => {
    const response = await fetch(`${baseUrl}/pokemon/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pokemon details');
    }
    const data = await response.json();
    console.log(data.types)
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        abilities: data.abilities,
        stats: data.stats,
        types: data.types,
        forms: data.forms,
    };
};

export const getPokemonById = async (id: number) => {
    const response = await fetch(`${baseUrl}/pokemon/${id}`);
    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        abilities: data.abilities.map((a: any) => a.ability.name),
        stats: data.stats.map((s: any) => ({
            name: s.stat.name,
            base_stat: s.base_stat
        })),
        types: data.types.map((t: any) => t.type.name),
        forms: data.forms.map((f: any) => f.name),
    };
};