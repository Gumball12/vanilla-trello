import mvvm from '/src/share/MvvmHtmlElement/index.js';

import './IconBox.js';

const html = `
<div class="modify-button" m-ref="modify-button"
  @click="displayField">
  <pre class="text" m-prop-text-content="contents"></pre>
  <icon-box><slot></slot></icon-box>
</div>

<div class="field" m-ref="field-container"
  @focusout="closeField" @keydown="tryCloseFieldWithKeydown">
  <slot m-ref="field-slot" name="field"></slot>
</div>

<style scoped>
@import url('/src/styles/components.css');
@import url('/src/styles/typo.css');

:host {
  background-color: var(--white);
  padding: 8px;
  border-radius: 5px;
}

.modify-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.field {
  display: flex;
  align-items: center;
  min-height: 18px;
}

.hide {
  display: none;
}
</style>
`;

window.customElements.define(
  'swap-field-box',
  class extends mvvm {
    constructor() {
      super({
        html,
        data: {
          contents: '',
          isDisplayField: false,
        },
        methods: {
          displayField: () => {
            // display field component
            this.$data.isDisplayField = true;

            // set focus on the field component
            this.$ref['field-slot'].assignedNodes()[0].$methods.focus();

            // emit display-field event
            this.$emit('displayfield');
          },
          closeField: () => {
            // close the field component
            this.$data.isDisplayField = false;

            // update contents
            this.$data.contents =
              this.$ref['field-slot'].assignedNodes()[0].$data.insert;

            // emit update event with contents
            this.$emit('update', this.$data.contents);
          },
          tryCloseFieldWithKeydown: evt => {
            const { code, shiftKey } = evt;

            // whether code is enter, close the field component
            if (code === 'Enter') {
              // however, when press the shift key, it becomes a line-break
              // (only textarea component)
              if (shiftKey) {
                return;
              }

              evt.preventDefault();
              this.$methods.closeField();
            }
          },
        },
        watch: {
          isDisplayField: [
            (oldValue, isDisplayField) => {
              if (isDisplayField) {
                this.$ref['modify-button'].classList.add('hide');
                this.$ref['field-container'].classList.remove('hide');
              } else {
                this.$ref['modify-button'].classList.remove('hide');
                this.$ref['field-container'].classList.add('hide');
              }
            },
          ],
        },
        mounted() {
          this.$data.isDisplayField = false;
        },
      });
    }
  },
);
