import { Shield, AlertTriangle, AlertCircle, ShieldAlert } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import type { Threat } from '../App';

interface ThreatDetectionViewProps {
  threats: Threat[];
}

export function ThreatDetectionView({ threats }: ThreatDetectionViewProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          color: 'bg-red-500/20 text-red-300 border-red-400/40',
          icon: ShieldAlert,
          iconColor: 'text-red-400',
          badge: 'bg-red-500',
        };
      case 'high':
        return {
          color: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
          icon: AlertCircle,
          iconColor: 'text-orange-400',
          badge: 'bg-orange-500',
        };
      case 'medium':
        return {
          color: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
          icon: AlertTriangle,
          iconColor: 'text-yellow-400',
          badge: 'bg-yellow-500',
        };
      default:
        return {
          color: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
          icon: Shield,
          iconColor: 'text-blue-400',
          badge: 'bg-blue-500',
        };
    }
  };

  const severityCounts = threats.reduce(
    (acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const criticalCount = severityCounts.critical || 0;
  const highCount = severityCounts.high || 0;
  const mediumCount = severityCounts.medium || 0;
  const lowCount = severityCounts.low || 0;

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Threat Detection</h1>
        <p className="text-white/80">Advanced security threat monitoring and analysis</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl h-64 mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1751448555253-f39c06e29d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzaGllbGQlMjBzZWN1cml0eSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzc5MzUwMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Security protection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Security Shield</h3>
            <p className="text-white/80 text-sm">Real-time threat detection and prevention</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="size-6 text-white" />
          <h2 className="text-xl font-semibold text-white">Detected Threats</h2>
          <span className="ml-auto text-white/60 text-sm">
            {threats.length} {threats.length === 1 ? 'threat' : 'threats'} detected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-300 text-sm font-medium">Critical</span>
            </div>
            <div className="text-white text-2xl font-bold">{criticalCount}</div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-2 rounded-full bg-orange-500" />
              <span className="text-orange-300 text-sm font-medium">High</span>
            </div>
            <div className="text-white text-2xl font-bold">{highCount}</div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-2 rounded-full bg-yellow-500" />
              <span className="text-yellow-300 text-sm font-medium">Medium</span>
            </div>
            <div className="text-white text-2xl font-bold">{mediumCount}</div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="size-2 rounded-full bg-blue-500" />
              <span className="text-blue-300 text-sm font-medium">Low</span>
            </div>
            <div className="text-white text-2xl font-bold">{lowCount}</div>
          </div>
        </div>

        <div className="overflow-auto max-h-96 rounded-xl border border-white/10">
          {threats.length === 0 ? (
            <div className="p-8 text-center">
              <Shield className="size-12 text-green-400 mx-auto mb-3" />
              <p className="text-white/60">No threats detected</p>
              <p className="text-white/40 text-sm mt-1">Your network is secure</p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {threats.map((threat) => {
                const config = getSeverityConfig(threat.severity);
                const Icon = config.icon;

                return (
                  <div
                    key={threat.id}
                    className={`bg-white/5 border rounded-lg p-4 hover:bg-white/10 transition-colors ${config.color}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`size-5 mt-0.5 ${config.iconColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{threat.type}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${config.badge}`}>
                            {threat.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-white/50 ml-auto">{threat.timestamp}</span>
                        </div>
                        <p className="text-sm text-white/70 mb-1">{threat.description}</p>
                        <p className="text-xs text-white/50 font-mono">Source: {threat.source}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
