import mvvm from '/src/share/MvvmHtmlElement/index.js';
import randomString from '/src/share/randomString.js';
import { onmessage, send } from '/src/share/sock.js';

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
          isUpdated: false, // render update state
        },

        // actions
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

            // push to server
            this.$methods.fetchPush();

            console.log('push');
          },
          /**
           * push {@code lists} data to server
           */
          fetchPush: () =>
            send(
              JSON.stringify({
                syncId: this.$data.syncId,
                lists: this.$data.lists,
              }),
            ),
          /**
           * get {@code lists} data from server
           */
          fetchPull: () =>
            onmessage(({ data }) => {
              // get params
              const { syncId, lists } = JSON.parse(data);

              // 1. check sync-id
              if (syncId === this.$data.syncId) {
                this.$data.isUpdated = false;
                return;
              }

              // 2. update lists data
              this.$data.syncId = syncId;
              this.$data.lists = lists;

              // 3. notify updated
              this.$data.isUpdated = true;
            }),
          /**
           * when pull when completed
           */
          endPullUpdate: () => {
            this.$data.isUpdated = false;
          },
          /**
           * enable drag style
           */
          enableDrag: () => {
            document.body.classList.add('drag');
          },
          /**
           * disable drag style
           */
          disableDrag: () => {
            document.body.classList.remove('drag');
          },
        },
        mounted() {
          // init
          this.$methods.fetchPull();
        },
      });
    }
  },
);

const state = document.createElement('mini-state');
document.body.appendChild(state);

export default state;
