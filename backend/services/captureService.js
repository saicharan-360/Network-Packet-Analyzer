import { analyzerState, resetAnalyzerData } from '../data/packetStore.js';
import { createPacket } from '../models/packetModel.js';
import { analyzePacketForThreat } from './threatDetectionService.js';

let captureTimer = null;

function addPacketToState(packet) {
  analyzerState.packets = [packet, ...analyzerState.packets].slice(0, 1000);
  analyzerState.protocolCounts[packet.protocol] += 1;

  const latest = analyzerState.trafficData[analyzerState.trafficData.length - 1];
  analyzerState.trafficData = [
    ...analyzerState.trafficData,
    {
      time: new Date().toLocaleTimeString(),
      packets: (latest?.packets || 0) + 1,
      bandwidth: (latest?.bandwidth || 0) + packet.size,
    },
  ].slice(-20);

  const threat = analyzePacketForThreat(packet);
  if (threat) {
    analyzerState.threats = [threat, ...analyzerState.threats].slice(0, 50);
  }
}

function captureTick() {
  addPacketToState(createPacket());
}

export function startCapture() {
  if (analyzerState.isCapturing) {
    return getAnalyzerState();
  }

  analyzerState.isCapturing = true;
  captureTimer = setInterval(captureTick, 500);
  return getAnalyzerState();
}

export function stopCapture() {
  analyzerState.isCapturing = false;

  if (captureTimer) {
    clearInterval(captureTimer);
    captureTimer = null;
  }

  return getAnalyzerState();
}

export function clearCapture() {
  resetAnalyzerData();
  return getAnalyzerState();
}

export function getAnalyzerState() {
  return {
    isCapturing: analyzerState.isCapturing,
    packets: analyzerState.packets,
    trafficData: analyzerState.trafficData,
    protocolCounts: analyzerState.protocolCounts,
    threats: analyzerState.threats,
    totalPackets: analyzerState.packets.length,
  };
}
