export const analyzerState = {
  isCapturing: false,
  packets: [],
  trafficData: [],
  protocolCounts: {
    TCP: 0,
    UDP: 0,
    ICMP: 0,
  },
  threats: [],
};

export function resetAnalyzerData() {
  analyzerState.packets = [];
  analyzerState.trafficData = [];
  analyzerState.protocolCounts = { TCP: 0, UDP: 0, ICMP: 0 };
  analyzerState.threats = [];
}
