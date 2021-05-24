import isAbove from './isAbove.js';
import swap from './swap.js';
import swapCards from './swapCards.js';
import state from '/src/state.js';

// set params
const cursor = { x: 0, y: 0 }; // cursor position
const curListBound = { left: 0, right: 0 }; // list-box bounding area

let dragTarget = null;
let placeholder = null;
let isDrag = false;

/**
 * destroy the placeholder element
 */
const destroyPlaceholder = () => {
  if (placeholder !== null) {
    placeholder.parentNode.removeChild(placeholder);
    placeholder = null;
    isDrag = false;
  }
};

/**
 * mousemove event handler
 *
 * @param {MouseEvent} evt
 * @param {Number} evt.pageX
 * @param {Number} evt.pageY
 */
const mousemove = ({ pageX, pageY }) => {
  // get drag-target's parent node
  const dragParent = dragTarget.parentNode;

  //init placeholder element
  if (!isDrag) {
    isDrag = true;

    // set placeholder elemenet
    placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    placeholder.style.setProperty('height', `${dragTarget.clientHeight}px`);

    // insert before drag-target's next-sibling contents
    dragParent.insertBefore(placeholder, dragTarget.nextSibling);
  }

  // set drag-target style (for move effect)
  dragTarget.style.setProperty('position', 'absolute');
  dragTarget.style.setProperty('left', `${pageX - cursor.x}px`);
  dragTarget.style.setProperty('top', `${pageY - cursor.y}px`);
  dragTarget.style.setProperty('transform', 'rotate(-7deg)');

  /**
   * 1. check if the cursor crosses over the list bounds
   * = check horizontal
   */

  const listBox = dragParent.parentNode.parentNode.host;

  // check bounds
  if (
    pageX < curListBound.left &&
    listBox.previousElementSibling !== null &&
    listBox.previousElementSibling.tagName === 'LIST-BOX'
  ) {
    // update current bounds
    const { left, right } =
      listBox.previousElementSibling.getBoundingClientRect();
    curListBound.left = left;
    curListBound.right = right;

    // move drag-target to the left list
    listBox.$methods.removeCard({ target: dragTarget });
    listBox.previousElementSibling.$methods.appendCard(dragTarget);

    // remove placeholder
    destroyPlaceholder();

    // stop process
    return;
  } else if (
    curListBound.right < pageX &&
    listBox.nextElementSibling !== null &&
    listBox.nextElementSibling.tagName === 'LIST-BOX'
  ) {
    // update current bounds
    const { left, right } = listBox.nextElementSibling.getBoundingClientRect();
    curListBound.left = left;
    curListBound.right = right;

    // move drag-target to the right list
    listBox.$methods.removeCard({ target: dragTarget });
    listBox.nextElementSibling.$methods.appendCard(dragTarget);

    // remove placeholder
    destroyPlaceholder();

    // stop process
    return;
  }

  /**
   * 2. check if the cursor crosses over the card bounds
   * = check vertical
   */

  // get drag-target's prev element
  const dragPrev = dragTarget.previousElementSibling;

  // get placeholder's next element
  const placeNext = placeholder.nextElementSibling;

  // cards data
  const cards = listBox.$data.cards;

  // if the drag-target violates drag-prev boundary
  // = if drag-prev is placed further below the drag-target
  if (dragPrev !== null && isAbove(dragTarget, dragPrev)) {
    swap(placeholder, dragTarget); // swap with placeholder <=> drag-target
    swap(placeholder, dragPrev); // swap with placeholder <=> drag-prev

    // swap cards data
    swapCards(cards, dragTarget, dragPrev);

    // emit update
    listBox.$emit('updatelist');
  }

  // if the drag-target violates place-next boundary
  // = if the drag-target is placed further below the place-next
  if (placeNext !== null && isAbove(placeNext, dragTarget)) {
    swap(placeNext, placeholder); // swap with place-next <=> placeholder
    swap(placeNext, dragTarget); // swap with place-next <=> drag-target

    // swap cards data
    swapCards(cards, placeNext, dragTarget);

    // emit update
    listBox.$emit('updatelist');
  }
};

/**
 * mouseup event handler
 */
const mouseup = () => {
  // remove placeholder
  destroyPlaceholder();

  // remove drag-target move effects
  dragTarget.style.removeProperty('position');
  dragTarget.style.removeProperty('top');
  dragTarget.style.removeProperty('left');
  dragTarget.style.removeProperty('transform');
  dragTarget.$ref.field.$ref['modify-button'].style.removeProperty('cursor');

  // remove events
  document.removeEventListener('mousemove', mousemove);
  document.removeEventListener('mouseup', mouseup);

  // update state
  state.$methods.disableDrag();
};

/**
 * mousedown event handler
 *
 * @param {MouseEvent} evt
 * @param {HTMLElement} evt.target must be card-box node
 * @param {Number} evt.pageX
 * @param {Number} evt.pageY
 */
const mousedown = ({ target, pageX, pageY }) => {
  // tag validation
  if (target.tagName !== 'CARD-BOX') {
    return;
  }

  // edit state validation
  if (target.$ref.field.$data.isDisplayField) {
    return;
  }

  // set drag target
  dragTarget = target;

  // set list bounds
  const { left: listLeft, right: listRight } =
    target.parentNode.getBoundingClientRect();
  curListBound.left = listLeft;
  curListBound.right = listRight;

  // get target's bounding area
  const { left: targetLeft, top: targetTop } =
    dragTarget.getBoundingClientRect();

  // set cursor
  cursor.x = pageX - targetLeft;
  cursor.y = pageY - targetTop;

  // set events
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup);

  // set cursor style
  dragTarget.$ref.field.$ref['modify-button'].style.setProperty(
    'cursor',
    'grabbing',
  );

  // update state
  state.$methods.enableDrag();
};

/**
 * export default mousedown event handler
 */
export default mousedown;
