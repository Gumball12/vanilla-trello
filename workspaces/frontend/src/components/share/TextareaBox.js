import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<textarea m-ref="textarea" class="text" @input="updateValue"
  m-attr-placeholder="placeholder"></textarea>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

textarea {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Nanum Gothic', sans-serif;
  color: var(--black);
}
</style>
`;

window.customElements.define(
  'textarea-box',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          insert: '',
          placeholder: '',
        },
        methods: {
          updateValue: ({ target: { value } }) => {
            this.$data.insert = value;
          },
          focus: () => {
            this.$ref.textarea.focus();
          },
        },
      });
    }
  },
);
