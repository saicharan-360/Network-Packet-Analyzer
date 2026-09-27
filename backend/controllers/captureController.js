import {
  clearCapture,
  getAnalyzerState,
  startCapture,
  stopCapture,
} from '../services/captureService.js';

export function getStateController() {
  return getAnalyzerState();
}

export function startCaptureController() {
  return startCapture();
}

export function stopCaptureController() {
  return stopCapture();
}

export function clearCaptureController() {
  return clearCapture();
}
