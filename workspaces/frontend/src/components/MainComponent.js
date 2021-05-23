import mvvm from '/src/share/MvvmHtmlElement/index.js';
import state from '/src/state.js';

import './ListBox/index.js';
import './AddListPanel.js';

const html = `
<main m-ref="main"
  @removelist="removeList" @updatelist="updateCards">
  <add-list-panel @addlist="addList" m-ref="add-button"></add-list-panel>
</main>

<style scoped>
@import url('/src/styles/components.css');

main {
  display: flex;
}

main > * {
  margin: 0 8px;
}

main > *:first-child {
  margin-left: 0;
}

main > *:last-child {
  margin-right: 0;
}
</style>
`;

window.customElements.define(
  'main-component',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          lists: [], // child lists
          transferLists: '', // one-way lists data updator
        },
        methods: {
          /**
           * add a list-box element
           *
           * - create element
           * - push to the {@code lists} data
           * - append child node into the main container
           * - update list-box datas
           *
           * @param {Object} options
           * @param {String} options.id
           * @param {String} options.title
           * @param {[CardBox]} options.cards
           */
          addList: ({ id, title, cards }) => {
            // create list-box element
            const listBox = document.createElement('list-box');

            // update data
            this.$methods.updateLists([...this.$data.lists, listBox]);

            // append into the main node
            this.$ref.main.insertBefore(listBox, this.$ref['add-button']);

            // update list-box data
            listBox.$data.id = id ?? listBox.$data.id;
            listBox.$data.title = title ?? listBox.$data.title;
            listBox.$data.transferCards = cards ?? '';
          },
          /**
           * remove a list-box element
           *
           * - validate evt target
           * - remove card from the {@code lists} data
           * - remove list
           *
           * @param {CustomEvent} evt
           * @param {ListBox} evt.target
           */
          removeList: ({ target }) => {
            // target validation
            if (target.tagName !== 'LIST-BOX') {
              return;
            }

            // remove from data
            const targetListId = target.$data.id;
            this.$data.lists.splice(
              this.$data.lists.findIndex(
                ({ $data: { id } }) => id === targetListId,
              ),
              1,
            );

            // update data
            this.$methods.updateLists(this.$data.lists);

            // remove list
            this.$ref.main.removeChild(target);
          },
          /**
           * update list's {@code cards} data
           */
          updateCards: () => this.$methods.updateLists(),
          /**
           * update {@code lists} data
           */
          updateLists: lists => {
            // set value
            this.$data.lists = lists ?? this.$data.lists;

            // push to state
            if (!state.$data.isUpdated) {
              state.$methods.pushListsData(this.$data.lists);
            }
          },
        },
        watch: {
          transferLists: [
            // rendering passed lists data
            (oldValue, rawLists) => {
              // validation
              if (
                rawLists === '' ||
                rawLists === null ||
                rawLists === undefined
              ) {
                return;
              }

              // parsing data
              const lists =
                typeof rawLists === 'string' ? JSON.parse(rawLists) : rawLists;

              // update exists lists
              this.$data.lists
                // 1. find same id list
                // => passing data to find and update list with the same id
                .filter(oldList => {
                  // get param
                  const {
                    $data: { id },
                  } = oldList;

                  // try to find the target list
                  const list = lists.find(
                    ({ $data: { id: targetListId } }) => id === targetListId,
                  );

                  // if it does not exists => removed list
                  if (list === undefined) {
                    // return true for the next step
                    return true;
                  }

                  // update list data
                  oldList.$data.transferCards = list.$data.cards;

                  return false;
                })
                // 2. if not, the list was deleted
                .forEach(list => this.$methods.removeList({ target: list }));

              // create lists based on the transfered list data
              lists
                .filter(
                  ({ $data: { id } }) =>
                    this.$data.lists.find(
                      ({ $data: { id: targetListId } }) => id === targetListId,
                    ) === undefined,
                )
                .forEach(({ $data }) => this.$methods.addList($data));
            },
          ],
        },
        mounted() {
          // update observer
          new MutationObserver(() =>
            // wait for render to finish
            setTimeout(() => state.$methods.endPullUpdate()),
          ).observe(this.$ref.main, {
            subtree: true,
            childList: true,
          });

          // sync data
          state.$watcher.isUpdated.push((oldValue, isUpdated) => {
            if (isUpdated) {
              // wait for the 'isUpdated' state to be updated
              setTimeout(() => (this.$data.transferLists = state.$data.lists));
            }
          });
        },
      });
    }
  },
);
