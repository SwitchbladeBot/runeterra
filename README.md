<h1 align="center">runeterra</h1>

JavaScript port of the [**RiotGames/LoRDeckCodes**](https://github.com/RiotGames/LoRDeckCodes/) library, made for encoding and decoding [**Legends of Runeterra**](http://playruneterra.com) card decks. Below is an example code for the [Warmother Control](https://lor.mobalytics.gg/decks/bmibq02t9lr96dua7ta0) deck by **prohibit_hb** on Mobalytics.

```
CEBAIAIFAEHSQNQIAEAQGDAUDAQSOKJUAIAQCBI5AEAQCFYA
```

## Install
```
npm install runeterra
```

## Cards, decks and how to encode them
If you want to understand the process of the encoding and decoding decks, please refer to the [original library](https://github.com/RiotGames/LoRDeckCodes/#cards--decks), as Riot has done a great job explaining it there.

## Usage
```js
const { DeckEncoder } = require('runeterra')

const deck = DeckEncoder.decode('CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL')
/*
[ Card { code: '01PZ019', count: 2 },
  Card { code: '01PZ027', count: 2 },
  Card { code: '01PZ028', count: 2 },
  Card { code: '01PZ040', count: 2 },
  Card { code: '01PZ045', count: 2 },
  Card { code: '01PZ052', count: 2 },
  Card { code: '01PZ055', count: 2 },
  Card { code: '01PZ059', count: 2 },
  Card { code: '01IO006', count: 2 },
  Card { code: '01IO009', count: 2 },
  Card { code: '01IO012', count: 2 },
  Card { code: '01IO018', count: 2 },
  Card { code: '01IO026', count: 2 },
  Card { code: '01IO036', count: 2 },
  Card { code: '01IO045', count: 2 },
  Card { code: '01IO057', count: 2 },
  Card { code: '01PZ013', count: 1 },
  Card { code: '01PZ039', count: 1 },
  Card { code: '01PZ042', count: 1 },
  Card { code: '01PZ044', count: 1 },
  Card { code: '01IO023', count: 1 },
  Card { code: '01IO029', count: 1 },
  Card { code: '01IO030', count: 1 },
  Card { code: '01IO043', count: 1 } ]
*/

// Card
deck[0].code    // "01PZ019"
deck[0].count   // 2
deck[0].set     // 1
deck[0].id      // 19
deck[0].faction // Faction { id: 4, shortCode: "PZ" }

const code = DeckEncoder.encode(deck)
// CEAAECABAQJRWHBIFU2DOOYIAEBAMCIMCINCILJZAICACBANE4VCYBABAILR2HRL
```
