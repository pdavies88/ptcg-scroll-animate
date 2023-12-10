'use server';

import PokemonCard, { PokemonProp } from './components/PokemonCard';

const MAX_LIMIT = 8;

export async function fetchPokemon(page: number) {
  // https://api.pokemontcg.io/v2/cards?q=types:water%20subtypes:mega
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:sm1&pageSize=${MAX_LIMIT}&page=${page}`,
    {
      headers: {
        'X-Api-Key': process.env.API_KEY!,
      },
    }
  );

  const { data } = await response.json();

  return data.map((pokemon: PokemonProp, index: number) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
  ));
}
