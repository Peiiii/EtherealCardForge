
import { CardData } from './types';
import { STAR_CARDS } from './data/star';
import { ABYSS_CARDS } from './data/abyss';
import { NATURE_CARDS } from './data/nature';
import { MATTER_CARDS } from './data/matter';
import { SPIRIT_CARDS } from './data/spirit';
import { MACHINE_CARDS } from './data/machine';
import { ICE_CARDS } from './data/ice';

export const CARD_LIBRARY: CardData[] = [
  ...STAR_CARDS,
  ...ABYSS_CARDS,
  ...NATURE_CARDS,
  ...MATTER_CARDS,
  ...SPIRIT_CARDS,
  ...MACHINE_CARDS,
  ...ICE_CARDS
].sort((a, b) => a.createdAt - b.createdAt);
