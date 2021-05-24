const WSS_BASE = 'ws://localhost:3001';
const THROTTLE_INTERVAL = 500;

const sock = new WebSocket(WSS_BASE);

// init connection state (not open)
let isConnected = false;

/**
 * try to connect with web-socket-server
 *
 * @returns {Promise}
 */
export const tryHello = () =>
  new Promise(res => {
    sock.addEventListener('open', () => {
      sock.send('hello'); // init connection
      res((isConnected = true));
    });
  });

/**
 * send message to server
 *
 * @param {String} msg
 */
export const send = (() => {
  // throttling object
  let throttle = null;

  return async msg => {
    // check prev request
    if (throttle !== null) {
      clearTimeout(throttle);
    }

    // check connection
    if (!isConnected) {
      await tryHello();
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
export const onmessage = async cb => {
  // check connection
  if (!isConnected) {
    await tryHello();
  }

  sock.addEventListener('message', cb);
};

export default {
  onmessage,
  send,
};
