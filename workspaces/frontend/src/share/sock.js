const WSS_BASE = 'ws://localhost:3001';
const THROTTLE_INTERVAL = 1000;

const sock = new WebSocket(WSS_BASE);

/**
 * try to connect with web-socket-server
 */
export const tryOpen = () =>
  new Promise(res => sock.addEventListener('open', () => res()));

/**
 * send message to server
 *
 * @param {String} msg
 */
export const send = (() => {
  // throttling object
  let throttle = null;

  return async msg => {
    // check connection
    if (sock.readyState !== sock.OPEN) {
      await tryOpen();
    }

    // check prev request
    if (throttle !== null) {
      clearTimeout(throttle);
    }

    // send data (throttling)
    throttle = setTimeout(() => {
      sock.send(msg);
      throttle = null;
    }, THROTTLE_INTERVAL);
  };
})();

/**
 * add onmessage event handler
 *
 * @param {Function} cb
 */
export const onmessage = cb => sock.addEventListener('message', cb);

export default {
  onmessage,
  tryOpen,
  send,
};
