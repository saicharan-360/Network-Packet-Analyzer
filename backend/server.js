import http from 'node:http';
import { serverConfig } from './config/serverConfig.js';
import { handleApiRoutes } from './routes/apiRoutes.js';
import { sendJson, sendNotFound } from './utils/httpResponse.js';

const server = http.createServer((request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host}`);

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (handleApiRoutes(request, response, url)) {
    return;
  }

  sendNotFound(response);
});

server.listen(serverConfig.port, () => {
  console.log(`Network Packet Analyzer API running at http://127.0.0.1:${serverConfig.port}`);
});
