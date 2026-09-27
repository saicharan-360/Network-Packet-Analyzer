import { Network } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import type { Packet } from '../App';

interface PacketCaptureProps {
  packets: Packet[];
}

export function PacketCapture({ packets }: PacketCaptureProps) {
  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'TCP':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'UDP':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/30';
      case 'ICMP':
        return 'bg-pink-500/20 text-pink-300 border-pink-400/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Live Packet Capture</h1>
        <p className="text-white/80">Real-time network packet monitoring</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl h-64 mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633265486064-086b219458ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxuZXR3b3JrJTIwc2VjdXJpdHklMjBjeWJlcnxlbnwxfHx8fDE3NzkzNTAzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Network security"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Packet Analysis</h3>
            <p className="text-white/80 text-sm">Deep inspection of network traffic</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Network className="size-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Captured Packets</h2>
          <span className="ml-auto text-white/60 text-sm">
            {packets.length} {packets.length === 1 ? 'packet' : 'packets'}
          </span>
        </div>

        <div className="overflow-auto max-h-96 rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-white/80 font-medium">Time</th>
                <th className="px-4 py-3 text-left text-white/80 font-medium">Source</th>
                <th className="px-4 py-3 text-left text-white/80 font-medium">Destination</th>
                <th className="px-4 py-3 text-left text-white/80 font-medium">Protocol</th>
                <th className="px-4 py-3 text-right text-white/80 font-medium">Port</th>
                <th className="px-4 py-3 text-left text-white/80 font-medium">Info</th>
              </tr>
            </thead>
            <tbody>
              {packets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-white/40">
                    No packets captured yet. Start capture from the dashboard.
                  </td>
                </tr>
              ) : (
                packets.map((packet) => (
                  <tr
                    key={packet.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-white/70">{packet.timestamp}</td>
                    <td className="px-4 py-3 text-white/90 font-mono text-xs">{packet.source}</td>
                    <td className="px-4 py-3 text-white/90 font-mono text-xs">{packet.destination}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getProtocolColor(packet.protocol)}`}>
                        {packet.protocol}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white/70 font-mono">{packet.port}</td>
                    <td className="px-4 py-3 text-white/60 text-xs">{packet.info}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
