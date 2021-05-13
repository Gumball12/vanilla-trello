import mvvm from './share/MvvmHtmlElement';

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
