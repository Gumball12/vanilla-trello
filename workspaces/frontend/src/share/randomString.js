/**
 * generate a random string
 *
 * @returns {String} random string
 */
export default () => (Math.random() * new Date().getTime()).toString();
