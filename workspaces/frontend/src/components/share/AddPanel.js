import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<p class="button"><slot></slot></p>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

p.button {
  padding: 8px 0;
  color: var(--gray);
  font-weight: normal;
  cursor: pointer;
  text-align: left;
}
</style>
`;

window.customElements.define(
  'add-panel',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
