/**
 * whether node2 is above node1
 *
 * - if node1 is placed further down => return false
 * - if node2 is placed further down => return true
 *
 * @param {HTMLElement} node1
 * @param {HTMLElement} node2
 * @returns {Boolean}
 */
export default (node1, node2) => {
  // get bounding area
  const bound1 = node1.getBoundingClientRect();
  const bound2 = node2.getBoundingClientRect();

  return bound1.top + bound1.height / 2 < bound2.top + bound2.height / 2;
};
