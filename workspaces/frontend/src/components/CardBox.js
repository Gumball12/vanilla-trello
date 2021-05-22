import mvvm from '/src/share/MvvmHtmlElement/index.js';
import randomString from '/src/share/randomString.js';

import './share/SwapFieldBox.js';
import './share/TextareaBox.js';

const html = `
<swap-field-box m-ref="field" @update="updateContents" @iconclick="emitRemoveCard">
  <textarea-box
    slot="field"
    m-data-placeholder="쉬프트 키와 엔터를 눌러 줄을 바꿀 수 있어요">
  </textarea-box>

  delete
</swap-field-box>

<style scoped>
@import url('/src/styles/components.css');
</style>
`;

window.customElements.define(
  'card-box',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          id: '',
          contents: '',
        },
        methods: {
          /**
           * update contents data
           *
           * @param {CustomEvent} evt
           * @param {String} detail contents
           */
          updateContents: ({ detail: contents }) =>
            (this.$data.contents = contents),
          /**
           * emit remove-card custom event
           */
          emitRemoveCard: () => this.$emit('removecard'),
        },
        watch: {
          contents: [
            // update contents
            (oldValue, contents) => (this.$ref.field.$data.contents = contents),
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
