import { LayoutDashboard, Network, Activity, Shield, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'packets', icon: Network, label: 'Packet Capture' },
    { id: 'protocols', icon: Activity, label: 'Protocol Stats' },
    { id: 'threats', icon: Shield, label: 'Threat Detection' },
    { id: 'analytics', icon: BarChart3, label: 'Traffic Analytics' },
  ];

  return (
    <aside className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Network Analyzer</h1>
        <p className="text-white/60 text-sm mt-1">Real-time monitoring</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                onClick={() => onViewChange(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeView === id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="size-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="size-6 text-green-400" />
          </div>
          <p className="text-white/80 text-sm font-medium">System Active</p>
          <p className="text-white/50 text-xs mt-1">All systems operational</p>
        </div>
      </div>
    </aside>
  );
}
