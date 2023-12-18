'use server';

import { MAX_LIMIT } from './constants';

export async function fetchPokemon(set: string, page: number) {
  // https://api.pokemontcg.io/v2/cards?q=types:water%20subtypes:mega
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:${set}&pageSize=${MAX_LIMIT}&page=${page}`,
    {
      headers: {
        'X-Api-Key': process.env.API_KEY!,
      },
    }
  );

  const { data } = await response.json();

  return data;
}

export async function fetchSets() {
  const response = await fetch(`https://api.pokemontcg.io/v2/sets`, {
    headers: {
      'X-Api-Key': process.env.API_KEY!,
    },
  });

  const { data } = await response.json();

  return data;
}

export async function fetchSingle(id: string) {
  const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
    headers: {
      'X-Api-Key': process.env.API_KEY!,
    },
  });

  const { data } = await response.json();

  return data;
}
