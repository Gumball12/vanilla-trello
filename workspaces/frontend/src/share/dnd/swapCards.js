/**
 * swap {@code cards} elements (mutate {@code cards})
 *
 * @param {[CardBox]} cards
 * @param {CardBox} card1
 * @param {CardBox} card2
 * @returns {[CardBox]} swapped cards data
 */
export default (cards, card1, card2) => {
  // get index
  const ind1 = cards.findIndex(({ $data: { id } }) => id === card1.$data.id);
  const ind2 = cards.findIndex(({ $data: { id } }) => id === card2.$data.id);

  // swap data
  cards.splice(ind1, 1, card2);
  cards.splice(ind2, 1, card1);

  return cards;
};
