import mvvm from '/src/share/MvvmHtmlElement/index.js';
import randomString from '/src/share/randomString.js';

import '../CardBox.js';
import '../share/SwapFieldBox.js';
import '../share/InputBox.js';
import './AddCardPanel.js';

const html = `
<div class="flex-wrapper">
  <swap-field-box m-ref="title" @iconclick="emitRemoveList" @update="updateTitle">
    <input-box slot="field"
      m-data-placeholder="엔터를 눌러 입력할 수 있어요"></input-box>

    delete
  </swap-field-box>

  <section m-ref="cards" @focusout="closeCard" @removecard="removeCard">
  </section>

  <add-card-panel m-ref="add-card-panel"
    @click="addCard"></add-card-panel>
</div>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

.flex-wrapper {
  width: 382px;
  padding: 8px;
  background-color: var(--white-gray);
  border-radius: 5px;
}

.flex-wrapper > *,
section > * {
  margin-top: 8px;
}

.flex-wrapper > *:first-child {
  margin: 0;
}

swap-field-box {
  background-color: transparent;
}

.hide {
  display: none;
}
</style>
`;

window.customElements.define(
  'list-box',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          id: '',
          title: '',
          transferCards: '', // one-way cards data updator
          cards: [], // child cards
        },
        methods: {
          /**
           * close the {@code targetCard} element
           *
           * - close {@code targetCard} field
           * - update {@code cards} data
           * - assign a null value to {@code targetCard} data
           */
          closeCard: () => {
            // update card data
            this.$methods.updateCards(this.$data.cards);
          },
          /**
           * remove the card element
           *
           * - validate evt target
           * - remove card from the {@code cards} data
           * - remove card
           *
           * @param {FocusEvent} evt
           * @param {CardBox} evt.target
           */
          removeCard: ({ target }) => {
            // target validation
            if (target.tagName !== 'CARD-BOX') {
              return;
            }

            // remove from data
            const targetCardId = target.$data.id;
            this.$data.cards.splice(
              this.$data.cards.findIndex(
                ({ $data: { id } }) => id === targetCardId,
              ),
              1,
            );

            // update data
            this.$methods.updateCards(this.$data.cards);

            // remove card
            this.$ref.cards.removeChild(target);
          },
          /**
           * add a card-box element
           *
           * - create element
           * - push to the {@code cards} data
           * - append child node into the cards container
           * - update card-box datas
           *
           * @param {Object} options
           * @param {String} options.id
           * @param {String} options.contents
           */
          addCard: ({ id, contents }) => {
            // create card-box element
            const cardBox = document.createElement('card-box');

            // update data
            this.$methods.updateCards([...this.$data.cards, cardBox]);

            // append into the cards node
            this.$ref.cards.appendChild(cardBox);

            // update card-box data
            cardBox.$data.id = id ?? cardBox.$data.id;
            cardBox.$data.contents = contents ?? '';
          },
          /**
           * emit {@code removelist} evt
           */
          emitRemoveList: () => this.$emit('removelist'),
          /**
           * update list title
           *
           * @param {CustomEvent} evt
           * @param {String} evt.detail title
           */
          updateTitle: ({ detail: title }) => (this.$data.title = title),
          /**
           * update {@code cards} data
           *
           * - set value
           * - emit {@code updatecards} evt
           *
           * @param {[CardBox]} cards
           */
          updateCards: cards => {
            // set value
            this.$data.cards = cards;

            // emit evt
            this.$emit('updatelist');
          },
        },
        watch: {
          transferCards: [
            // rendering passed cards data
            (oldValue, rawCards) => {
              // validation
              if (
                rawCards === '' ||
                rawCards === null ||
                rawCards === undefined
              ) {
                return;
              }

              // parsing data
              const cards =
                typeof rawCards === 'string' ? JSON.parse(rawCards) : rawCards;

              // update exist cards
              this.$data.cards
                // 1. find same id card
                // => passing data to find and update card with the same id
                .filter(oldCard => {
                  // get param
                  const {
                    $data: { id },
                  } = oldCard;

                  // try to find the target card
                  const card = cards.find(
                    ({ $data: { id: targetCardId } }) => id === targetCardId,
                  );

                  // if it does not exists => removed card
                  if (card === undefined) {
                    // return true for the next step
                    return true;
                  }

                  // update card data
                  oldCard.$data.contents = card.$data.contents;

                  return false;
                })
                // 2. if not, the card was deleted
                .forEach(card => this.$methods.removeCard({ target: card }));

              // create cards based on the transfered card data
              cards
                .filter(
                  ({ $data: { id } }) =>
                    this.$data.cards.find(
                      ({ $data: { id: targetCardId } }) => id === targetCardId,
                    ) === undefined,
                )
                .forEach(({ $data }) => this.$methods.addCard($data));
            },
          ],
          title: [
            // update title
            (oldValue, title) => (this.$ref.title.$data.contents = title),
          ],
        },
        mounted() {
          // init state
          this.$data.id = randomString();
        },
      });
    }
  },
);
