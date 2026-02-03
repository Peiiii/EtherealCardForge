
export interface CardData {
  id: string;
  name: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine';
  type: string;
  description: string;
  stats: {
    power: number;
    spirit: number;
    lore: number;
  };
  imageUrl: string;
  createdAt: number;
}

export enum AppState {
  LOCKED = 'LOCKED',
  FORGE = 'FORGE',
  COLLECTION = 'COLLECTION'
}
