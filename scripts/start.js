const http = require('http');
const serveHandler = require('serve-handler');
const { PUBLIC } = require('./common');

start();

async function start() {
  const port = parseInt(process.argv[2], 10);
  if (!Number.isSafeInteger(port) || port < 0) {
    throw new Error(`Invalid port: "${port}"`);
  }

  const server = http.createServer(async (req, res) => {
    await serveHandler(req, res, {
      public: PUBLIC,
      headers: [
        {
          source: '**/*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-cache',
            },
          ],
        },
      ],
    });
  });

  server.listen({ port }, () =>
    console.log(`Server listening on: http://localhost:${port}`),
  );

  server.on('error', (error) => {
    console.error('Server error', error);
    process.exitCode = 1;
    server.close();
  });

  server.on('close', () => {
    console.log('Server closed');
    process.exitCode = 1;
  });
}
