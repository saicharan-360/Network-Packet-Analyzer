import type { Packet, Threat, TrafficData } from './App';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4000';

export interface AnalyzerState {
  isCapturing: boolean;
  packets: Packet[];
  trafficData: TrafficData[];
  protocolCounts: {
    TCP: number;
    UDP: number;
    ICMP: number;
  };
  threats: Threat[];
  totalPackets: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getAnalyzerState() {
  return request<AnalyzerState>('/api/state');
}

export function startCapture() {
  return request<AnalyzerState>('/api/capture/start', { method: 'POST' });
}

export function stopCapture() {
  return request<AnalyzerState>('/api/capture/stop', { method: 'POST' });
}

export function clearCapture() {
  return request<AnalyzerState>('/api/capture/clear', { method: 'POST' });
}

export async function downloadReport() {
  const response = await fetch(`${API_BASE}/api/report`);

  if (!response.ok) {
    throw new Error(`Report export failed: ${response.status}`);
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `network-analysis-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}
