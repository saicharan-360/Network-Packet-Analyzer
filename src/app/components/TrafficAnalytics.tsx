import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import type { TrafficData } from '../App';

interface TrafficAnalyticsProps {
  data: TrafficData[];
}

export function TrafficAnalytics({ data }: TrafficAnalyticsProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Traffic Analytics</h1>
        <p className="text-white/80">Comprehensive network traffic analysis and trends</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl h-64 mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1770681381576-f1fdceb2ea01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NzkzNTAzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Analytics dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Traffic Insights</h3>
            <p className="text-white/80 text-sm">Real-time network performance metrics</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="size-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Traffic Visualization</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-medium mb-4">Packet Flow Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPackets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="time" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="packets"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorPackets)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-medium mb-4">Bandwidth Monitoring</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="time" stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#ffffff' }} />
                <Line
                  type="monotone"
                  dataKey="bandwidth"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7', r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Bandwidth (bytes)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="text-white font-medium mb-4">Network Activity Timeline</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPacketsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBandwidthArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="time" stroke="#ffffff60" style={{ fontSize: '12px' }} />
              <YAxis stroke="#ffffff60" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#ffffff' }} />
              <Area
                type="monotone"
                dataKey="packets"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorPacketsArea)"
                name="Packets"
              />
              <Area
                type="monotone"
                dataKey="bandwidth"
                stroke="#ec4899"
                fillOpacity={1}
                fill="url(#colorBandwidthArea)"
                name="Bandwidth (bytes)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
