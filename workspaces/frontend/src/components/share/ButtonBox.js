import mvvm from '/src/share/MvvmHtmlElement/index.js';

const html = `
<button class="button"><slot></slot></button>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

:host {
  display: inline-block;
}

button {
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: var(--white);
  transition: filter 0.1s ease;
  cursor: pointer;
}

button:hover {
  filter: brightness(0.9);
}

:host(.error) button {
  background-color: var(--red);
  color: var(--white);
}

:host(.success) button {
  background-color: var(--green);
  color: var(--white);
}
</style>
`;

window.customElements.define(
  'button-box',
  class extends mvvm {
    constructor() {
      super({
        html,
      });
    }
  },
);
