import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<span class="icon"><slot></slot></span>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/icon.css');
</style>
`;

window.customElements.define(
  'icon-box',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
