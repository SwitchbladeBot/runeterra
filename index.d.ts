declare module 'runeterra' {
  export class DeckEncoder {
    static decode(code: string): Card[];

    static encode(cards: Card[]): string;

    static encodeNofs(cards: Card[]): number[];

    static encodeGroup(group: Card[]): number[];

    static isValidDeck(cards: Card[]): boolean;

    static groupByFactionAndSetSorted(cards: Card[]): Card[][];

    static MAX_KNOWN_VERSION: number;
  }

  export class Card {
    code: string;
    count: number;

    get set(): number;

    get faction(): Faction;

    get id(): number;

    static from(set: string, faction: string, number: string, count: number): Card;

    static fromCardString(cardString: number): Card;
  }

  export class Faction {
    shortCode: string;
    id: number;

    static fromCode(code: string): Faction;

    static fromID(id: number): Faction;

    static FACTIONS: string[];
  }
}
