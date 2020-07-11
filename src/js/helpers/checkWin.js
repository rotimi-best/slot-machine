const validators = {};

validators.threeCherryTopLine = slots => {
  const [
    slot1,
    slot2,
    slot3
  ] = slots;
  const score = 2000;

  if (slot1.length === 3
    && slot2.length === 3
    && slot3.length === 3) {
      const [topSymbolSlot1] = slot1;
      const [topSymbolSlot2] = slot2;
      const [topSymbolSlot3] = slot3;

      if (topSymbolSlot1.alt === SYMBOLS.cherry
        && topSymbolSlot2.alt === SYMBOLS.cherry
        && topSymbolSlot3.alt === SYMBOLS.cherry) {
          return score;
        }
    }

    return 0;
};

validators.threeCherryCenterLine = slots => {
  const [
    slot1,
    slot2,
    slot3
  ] = slots;
  const score = 1000;

  if (slot1.length === 3
    && slot2.length === 3
    && slot3.length === 3) {
      const [,centerSymbolSlot1] = slot1;
      const [,centerSymbolSlot2] = slot2;
      const [,centerSymbolSlot3] = slot3;

      if (centerSymbolSlot1.alt === SYMBOLS.cherry
        && centerSymbolSlot2.alt === SYMBOLS.cherry
        && centerSymbolSlot3.alt === SYMBOLS.cherry) {
          return score;
        }
    }

    return 0;
};

validators.threeCherryBottomLine = slots => {
  const [
    slot1,
    slot2,
    slot3
  ] = slots;
  const score = 4000;

  if (slot1.length === 3
    && slot2.length === 3
    && slot3.length === 3) {
      const [,,buttomSymbolSlot1] = slot1;
      const [,,buttomSymbolSlot2] = slot2;
      const [,,buttomSymbolSlot3] = slot3;

      if (buttomSymbolSlot1.alt === SYMBOLS.cherry
        && buttomSymbolSlot2.alt === SYMBOLS.cherry
        && buttomSymbolSlot3.alt === SYMBOLS.cherry) {
          return score;
        }
    }

    return 0;
};

validators.threeSevenSymbolOnAnyLine = slots => {
  const score = 150;

  const allShouldHaveSeven = slots.map(slot => slot.some(symbol =>  symbol.alt === SYMBOLS.seven))

  return allShouldHaveSeven.every(res => res === true)
    ? score
    : 0;
};

validators.cherryAndSevenSymbolOnAnyLine = slots => {
  const score = 75;
  let hasCherry = false;
  let hasSeven = false;

  for (const slot of slots) {
    for (const symbol of slot) {
      if (hasSeven && hasCherry) return score;
      if (symbol.alt === SYMBOLS.seven && !hasSeven) {
        hasSeven = true;
      } else if (symbol.alt === SYMBOLS.cherry && !hasCherry) {
        hasCherry = true;
      }
    }
  }

  return 0;
};

validators.threeThreeBarSymbolsOnAnyLine = slots => {
  const score = 50;

  return slots
    .map(slot => slot.some(symbol =>  symbol.alt === SYMBOLS.threeBar))
    .every(slot => slot === true)
      ? score
      : 0;
};

validators.threeTwoBarSymbolsOnAnyLine = slots => {
  const score = 20;

  return slots
    .map(slot => slot.some(symbol =>  symbol.alt === SYMBOLS.twoBar))
    .every(slot => slot === true)
      ? score
      : 0;
};

validators.threeBarSymbolsOnAnyLine = slots => {
  const score = 10;

  return slots
    .map(slot => slot.some(symbol =>  symbol.alt === SYMBOLS.bar))
    .every(slot => slot === true)
      ? score
      : 0;
};

validators.barSymbolCombOnAnyLine = slots => {
  const score = 5;

  const totalNoOfThreeCombinations = slots
    .map(slot => slot.some(symbol =>  symbol.alt === SYMBOLS.bar))
    .reduce((acc, curr) => curr === true ? acc + 1 : acc, 0)
  console.log('totalNoOfThreeCombinations', totalNoOfThreeCombinations);

  return totalNoOfThreeCombinations >= 2
    ? score
    : 0;
};

const totalScoresWon = slots => {
  return Object.values(validators).reduce((acc, validator) => acc + validator(slots), 0);
}
