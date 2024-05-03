const { createServer } = require('http');
const { Server } = require('ws');
const { createViteDevServer } = require('vite');

async function start() {
  const vite = await createViteDevServer({
    server: { middlewareMode: 'html' },
  });

  const httpServer = createServer(vite.middlewares);
  const wsServer = new Server({ server: httpServer });

  wsServer.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (message) => {
      console.log(`Received: ${message}`);
      socket.send(`Message received: ${message}`);
    });

    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });

  const port = 3000;
  httpServer.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

start();