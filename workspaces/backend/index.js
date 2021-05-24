// import dependencies
const { Server } = require('ws');
const compression = require('compression');

// sync data
let syncData = null;

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
  /**
   * received data (broadcast)
   *
   * @param {String} data
   */
  ws.on('message', data => {
    if (data === 'hello') {
      if (syncData !== null) {
        // sync stored data
        return ws.send(syncData);
      }

      // syncData === null => nothing
      return;
    }

    wss.clients.forEach(client => {
      syncData = data;
      client.send(syncData);
    });
  });
});

// start the web server
server.listen(3001, () => console.log('listen on :3001'));
