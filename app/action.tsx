'use server';

import { MAX_LIMIT } from './constants';
import { CardData } from './packs/types';

// https://api.pokemontcg.io/v2/cards?q=types:water%20subtypes:mega
export async function fetchPokemon(set: string, page: number) {
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

// CARD DATA FETCHING FOR PACKS
const extractKeys = (obj: CardData) => {
  const { id, name, rarity, images, supertype } = obj;
  return { id, name, rarity, images, supertype };
};

export async function fetchCardTypes(set: string, type: string) {
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:${set}%20rarity:${type}`,
    {
      headers: {
        'X-Api-Key': process.env.API_KEY!,
      },
    }
  );

  const { data } = await response.json();
  const cardData = data.map(extractKeys);

  return cardData;
}

// For sets where energy does not have a rarity
export async function fetchEnergies(set: string) {
  const response = await fetch(
    `https://api.pokemontcg.io/v2/cards?q=set.id:${set}%20supertype:energy`,
    {
      headers: {
        'X-Api-Key': process.env.API_KEY!,
      },
    }
  );

  const { data } = await response.json();
  const cardData = data.map(extractKeys);

  return cardData;
}
