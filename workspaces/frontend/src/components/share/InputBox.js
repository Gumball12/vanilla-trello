import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<input class="text" @input="updateValue">

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

input {
  padding: 10px 8px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
}
</style>
`;

window.customElements.define(
  'input-box',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          insert: '',
        },
        methods: {
          updateValue: ({ target: { value } }) => (this.$data.insert = value),
        },
      });
    }
  },
);
