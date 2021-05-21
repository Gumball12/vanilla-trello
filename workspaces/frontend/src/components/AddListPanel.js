import mvvm from '/src/share/MvvmHtmlElement/index.js';

import './share/AddPanel.js';

const html = `
<div class="flex-wrapper" @click="emitAddList">
  <add-panel>Add a list...</add-panel>
</div>

<style scoped>
@import url('/src/styles/components.css');

.flex-wrapper {
  width: 382px;
  background-color: rgba(158, 158, 158, 0.7);
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

add-panel {
  color: var(--white);
}
</style>
`;

window.customElements.define(
  'add-list-panel',
  class extends mvvm {
    constructor() {
      super({
        html,
        methods: {
          emitAddList: () => this.$emit('addlist'),
        },
      });
    }
  },
);
