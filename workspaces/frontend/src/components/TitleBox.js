import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<p class="headline">mini-trello</p>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

p {
  color: var(--white);
}
</style>
`;

window.customElements.define(
  'title-box',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
