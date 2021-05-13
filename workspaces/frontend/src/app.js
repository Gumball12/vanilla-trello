import mvvm from './share/MvvmHtmlElement/index.js';

const html = `
<p>Hello!</p>
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
