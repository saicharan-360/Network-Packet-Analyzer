import {
  clearCaptureController,
  getStateController,
  startCaptureController,
  stopCaptureController,
} from '../controllers/captureController.js';
import { exportReportController } from '../controllers/reportController.js';
import { sendJson } from '../utils/httpResponse.js';

export function handleApiRoutes(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true, service: 'network-packet-analyzer-api' });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/state') {
    sendJson(response, 200, getStateController());
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/capture/start') {
    sendJson(response, 200, startCaptureController());
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/capture/stop') {
    sendJson(response, 200, stopCaptureController());
    return true;
  }

  if (request.method === 'POST' && url.pathname === '/api/capture/clear') {
    sendJson(response, 200, clearCaptureController());
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/api/report') {
    const fileName = `network-analysis-${Date.now()}.json`;
    sendJson(response, 200, exportReportController(), {
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    return true;
  }

  return false;
}
