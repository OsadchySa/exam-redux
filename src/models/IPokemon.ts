export interface IPokemon {
    id: number;
    name: string;
    image: string;
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string }, base_stat: number }[];
    types: { type: { name: string } }[];
    forms: { name: string }[]
}