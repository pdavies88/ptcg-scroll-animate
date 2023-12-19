export type CardData = {
  id: string;
  name: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  supertype: string;
};

export type CardWeighted = CardData & { probability: number };
