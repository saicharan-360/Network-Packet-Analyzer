import { ControlPanel } from './ControlPanel';
import { Play, Activity, Shield, Database } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface DashboardProps {
  isCapturing: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onExport: () => void;
  protocolCounts: { TCP: number; UDP: number; ICMP: number };
  totalPackets: number;
  threatsCount: number;
}

export function Dashboard({
  isCapturing,
  onStart,
  onStop,
  onClear,
  onExport,
  protocolCounts,
  totalPackets,
  threatsCount,
}: DashboardProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/80">Monitor your network in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="relative overflow-hidden rounded-2xl h-64">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwc2VjdXJpdHklMjBjeWJlcnxlbnwxfHx8fDE3NzkzNTAzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Network infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-1">Network Infrastructure</h3>
              <p className="text-white/80 text-sm">Advanced packet analysis and monitoring</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Database className="size-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Packets</p>
                <p className="text-white text-2xl font-bold">{totalPackets.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Activity className="size-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Active Protocols</p>
                <p className="text-white text-2xl font-bold">
                  {Object.values(protocolCounts).filter(c => c > 0).length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Shield className="size-6 text-red-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Threats Detected</p>
                <p className="text-white text-2xl font-bold">{threatsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ControlPanel
        isCapturing={isCapturing}
        onStart={onStart}
        onStop={onStop}
        onClear={onClear}
        onExport={onExport}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 font-medium">TCP</span>
            <span className="text-white font-bold text-xl">{protocolCounts.TCP}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${totalPackets > 0 ? (protocolCounts.TCP / totalPackets) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 font-medium">UDP</span>
            <span className="text-white font-bold text-xl">{protocolCounts.UDP}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{
                width: `${totalPackets > 0 ? (protocolCounts.UDP / totalPackets) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 font-medium">ICMP</span>
            <span className="text-white font-bold text-xl">{protocolCounts.ICMP}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-300"
              style={{
                width: `${totalPackets > 0 ? (protocolCounts.ICMP / totalPackets) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
