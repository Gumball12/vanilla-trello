import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<input class="text" @input="updateValue" m-ref="input"
  m-attr-placeholder="placeholder">

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

input {
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--black);
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
          placeholder: '',
        },
        methods: {
          updateValue: ({ target: { value } }) => (this.$data.insert = value),
          focus: () => this.$ref.input.focus(),
        },
      });
    }
  },
);
