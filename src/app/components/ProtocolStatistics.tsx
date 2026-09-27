import { Activity } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface ProtocolStatisticsProps {
  counts: {
    TCP: number;
    UDP: number;
    ICMP: number;
  };
  totalPackets: number;
}

export function ProtocolStatistics({ counts, totalPackets }: ProtocolStatisticsProps) {
  const stats = [
    { protocol: 'TCP', count: counts.TCP, color: 'bg-blue-500', percentage: totalPackets > 0 ? (counts.TCP / totalPackets) * 100 : 0 },
    { protocol: 'UDP', count: counts.UDP, color: 'bg-purple-500', percentage: totalPackets > 0 ? (counts.UDP / totalPackets) * 100 : 0 },
    { protocol: 'ICMP', count: counts.ICMP, color: 'bg-pink-500', percentage: totalPackets > 0 ? (counts.ICMP / totalPackets) * 100 : 0 },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Protocol Statistics</h1>
        <p className="text-white/80">Network protocol distribution and analysis</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl h-64 mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NzkzNTAzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Data visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Protocol Analytics</h3>
            <p className="text-white/80 text-sm">Detailed breakdown of network protocols</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="size-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Protocol Distribution</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map(({ protocol, count, color, percentage }) => (
            <div key={protocol} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/80 font-medium text-lg">{protocol}</span>
                <span className="text-white font-bold text-3xl">{count}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className={`h-full ${color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-right text-white/60 text-sm">
                {percentage.toFixed(1)}% of total
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Total Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Total Packets</p>
              <p className="text-white text-2xl font-bold">{totalPackets.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">TCP Packets</p>
              <p className="text-blue-400 text-2xl font-bold">{counts.TCP.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">UDP Packets</p>
              <p className="text-purple-400 text-2xl font-bold">{counts.UDP.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-white/60 text-sm mb-1">ICMP Packets</p>
              <p className="text-pink-400 text-2xl font-bold">{counts.ICMP.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
