import mvvm from '/src/share/MvvmHtmlElement/index.js';
import randomString from '/src/share/randomString.js';

window.customElements.define(
  'mini-state',
  class extends mvvm {
    constructor() {
      super({
        html: '',

        // state
        data: {
          syncId: '',
          lists: [],
        },

        methods: {
          /**
           * push {@code lists} data
           *
           * @param {[ListBox]} lists
           */
          pushListsData: lists => {
            // create a new sync-id value
            this.$data.syncId = randomString();

            // push lists data
            this.$data.lists = lists;
          },
          pullListsData: () => {
            // @todo: req lists data
          },
          fetchPush: () => {
            // @todo: fetch-push data (with throttling)
          },
          fetchPull: () => {
            // @todo: fetch-pull data
          },
        },
        mounted() {
          // @todo: fetch-pull data
        },
      });
    }
  },
);

const state = document.createElement('mini-state');
document.body.appendChild(state);

export default state;
