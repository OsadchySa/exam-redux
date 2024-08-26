import {IPokemon} from "../models/IPokemon";

const baseUrl = 'https://pokeapi.co/api/v2'

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
    const response = await fetch(`${baseUrl}/pokemon/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch pokemon details')
    }
    const data = await response.json()
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        abilities: data.abilities,
        stats: data.stats,
        types: data.types,
        forms: data.forms
    }
}



export const getSearchedPokemonsByName = async (name: string): Promise<IPokemon> => {
    const response = await fetch(`${baseUrl}/pokemon/${name}`)
    const data =  await response.json()
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    console.log(data)
    return {
        ...data,
        image: imageUrl
    }
}

export const getPokemonsByType = async (type: string) => {
    const response = await fetch(`${baseUrl}/type/${type}`)
    const data = await response.json()
    console.log(data)
    const pokemons = data.pokemon.map((pokeInfo: any) => ({
        name: pokeInfo.pokemon.name,
        url: pokeInfo.pokemon.url
    }
    ))
    console.log(pokemons)
    return pokemons
}

export const getPokemonsByAbility = async (ability: string) => {
    const response = await fetch(`${baseUrl}/ability/${ability}`)
    const data = await response.json();
    const pokemons = data.pokemon.map((pokeInfo: any) => ({
        name: pokeInfo.pokemon.name,
        url: pokeInfo.pokemon.url
    }))
    return pokemons
}


export const getPokemonForm = async (formId: string) => {
    try {
        const response = await fetch(`${baseUrl}/pokemon-form/${formId}/`)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()


        const abilities = data.abilities ? data.abilities.map((ability: any) => ability.ability.name) : []
        const types = data.types ? data.types.map((type: any) => type.type.name) : []

        return {
            name: data.name,
            imageUrl: data.sprites.front_default,
            abilities: abilities,
            types: types
        }
    } catch (error) {
        console.error('Failed to fetch form data:', error)
        throw new Error('Failed to fetch form data')
    }
}


