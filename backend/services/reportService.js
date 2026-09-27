import { analyzerState } from '../data/packetStore.js';

export function createReport() {
  return {
    generatedAt: new Date().toISOString(),
    totalPackets: analyzerState.packets.length,
    protocolDistribution: analyzerState.protocolCounts,
    threats: analyzerState.threats,
    trafficData: analyzerState.trafficData,
    packets: analyzerState.packets.slice(0, 100),
  };
}
