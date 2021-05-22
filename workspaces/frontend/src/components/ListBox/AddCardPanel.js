import mvvm from '/src/share/MvvmHtmlElement/index.js';

import '../share/AddPanel.js';

const html = `
<add-panel>Add a card...</add-panel>

<style scoped>
@import url('/src/styles/components.css');

add-panel {
  color: var(--gray);
}
</style>
`;

window.customElements.define(
  'add-card-panel',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
