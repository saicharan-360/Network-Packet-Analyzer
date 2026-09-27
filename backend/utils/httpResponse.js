import { serverConfig } from '../config/serverConfig.js';

export function sendJson(response, statusCode, data, extraHeaders = {}) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': serverConfig.cors.origin,
    'Access-Control-Allow-Methods': serverConfig.cors.methods,
    'Access-Control-Allow-Headers': serverConfig.cors.headers,
    ...extraHeaders,
  });
  response.end(JSON.stringify(data, null, 2));
}

export function sendNotFound(response) {
  sendJson(response, 404, { error: 'Route not found' });
}
