import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { PacketCapture } from './components/PacketCapture';
import { ProtocolStatistics } from './components/ProtocolStatistics';
import { ThreatDetectionView } from './components/ThreatDetectionView';
import { TrafficAnalytics } from './components/TrafficAnalytics';
import {
  clearCapture,
  downloadReport,
  getAnalyzerState,
  startCapture,
  stopCapture,
  type AnalyzerState,
} from './api';

export interface Packet {
  id: number;
  timestamp: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  port: number;
  size: number;
  info: string;
}

export interface TrafficData {
  time: string;
  packets: number;
  bandwidth: number;
}

export interface Threat {
  id: number;
  timestamp: string;
  type: 'Port Scan' | 'DDoS Attack' | 'Suspicious Traffic' | 'Malware' | 'Brute Force';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  description: string;
}

export default function App() {
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
  const [activeView, setActiveView] = useState('dashboard');
  const [isCapturing, setIsCapturing] = useState(false);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [protocolCounts, setProtocolCounts] = useState({
    TCP: 0,
    UDP: 0,
    ICMP: 0,
  });
  const [threats, setThreats] = useState<Threat[]>([]);

  const applyAnalyzerState = useCallback((state: AnalyzerState) => {
    setIsCapturing(state.isCapturing);
    setPackets(state.packets);
    setTrafficData(state.trafficData);
    setProtocolCounts(state.protocolCounts);
    setThreats(state.threats);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) * 100;
    const y = (clientY / height) * 100;
    setGradientPosition({ x, y });
  }, []);

  const handleStart = useCallback(async () => {
    applyAnalyzerState(await startCapture());
  }, [applyAnalyzerState]);

  const handleStop = useCallback(async () => {
    applyAnalyzerState(await stopCapture());
  }, [applyAnalyzerState]);

  const handleClear = useCallback(async () => {
    applyAnalyzerState(await clearCapture());
  }, [applyAnalyzerState]);

  const handleExport = useCallback(() => {
    downloadReport();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncState = async () => {
      try {
        const state = await getAnalyzerState();
        if (isMounted) {
          applyAnalyzerState(state);
        }
      } catch (error) {
        console.error(error);
      }
    };

    syncState();
    const interval = setInterval(syncState, 500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [applyAnalyzerState]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            isCapturing={isCapturing}
            onStart={handleStart}
            onStop={handleStop}
            onClear={handleClear}
            onExport={handleExport}
            protocolCounts={protocolCounts}
            totalPackets={packets.length}
            threatsCount={threats.length}
          />
        );
      case 'packets':
        return <PacketCapture packets={packets} />;
      case 'protocols':
        return <ProtocolStatistics counts={protocolCounts} totalPackets={packets.length} />;
      case 'threats':
        return <ThreatDetectionView threats={threats} />;
      case 'analytics':
        return <TrafficAnalytics data={trafficData} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="size-full flex overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%,
          rgb(15, 23, 42) 0%,
          rgb(30, 41, 59) 25%,
          rgb(51, 65, 85) 50%,
          rgb(15, 23, 42) 75%,
          rgb(2, 6, 23) 100%)`,
        transition: 'background 0.3s ease',
      }}
    >
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}
