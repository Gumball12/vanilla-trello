import mvvm from './share/MvvmHtmlElement/index.js';

import './components/TitleBox.js';
import './components/MainComponent.js';

const html = `
<title-box></title-box>
<main-component></main-component>

<style scoped>
@import url('/src/styles/components.css');

:host {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

title-box {
  margin-bottom: 24px;
}
</style>
`;

window.customElements.define(
  'mini-trello',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
