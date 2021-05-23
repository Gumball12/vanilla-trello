// import dependencies
const { Server } = require('ws');
const compression = require('compression');

// sync data
const data = null;

// create express app
const app = require('express')();

// using compression plugin
app.use(compression());

// create web server
const server = require('http').createServer(app);

// create web-socket-server
const wss = new Server({ server });

/**
 * set connection event handler
 */
wss.on('connection', ws => {
  // 1. send stored data
  if (data !== null) {
    ws.send(data);
  }

  /**
   * received data (broadcast)
   *
   * @param {String} data
   */
  ws.on('message', data =>
    wss.clients.forEach(client => {
      data = data;
      client.send(data);
    }),
  );
});

// start the web server
server.listen(3001, () => console.log('listen on :3001'));
