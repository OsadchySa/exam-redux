export interface IPokemon {
    id: number;
    name: string;
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number, stat: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: { front_default: string };
    forms: { name: string }[];
    image: string
}