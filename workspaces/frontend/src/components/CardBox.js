import mvvm from '/src/share/MvvmHtmlElement/index.js';
import randomString from '/src/share/randomString.js';

import './share/SwapFieldBox.js';
import './share/TextareaBox.js';

const html = `
<swap-field-box @update="updateContents">
  <textarea-box
    slot="field"
    m-data-placeholder="쉬프트 키와 엔터를 눌러 줄을 바꿀 수 있어요">
  </textarea-box>

  create
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
          updateContents: ({ detail: contents }) =>
            (this.$data.contents = contents),
        },
        mounted() {
          this.$data.id = randomString();
        },
      });
    }
  },
);
