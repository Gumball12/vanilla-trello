/**
 * swap nodes
 *
 * @param {HTMLElement} node1
 * @param {HTMLElement} node2
 */
export default (node1, node2) => {
  // store node1's parent node
  const parent = node1.parentNode;

  // get node1's sibling node
  // if sibling node is node2 => get node1
  // if silbing node is not node2 => get node1's sibling node
  const sibling = node1.nextSibling === node2 ? node1 : node1.nextSibling;

  // move node1 => before node2
  node2.parentNode.insertBefore(node1, node2);

  // move node2 => before node1's sibling node
  parent.insertBefore(node2, sibling);
};
