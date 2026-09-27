import { Play, Square, Trash2, Download } from 'lucide-react';

interface ControlPanelProps {
  isCapturing: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onExport: () => void;
}

export function ControlPanel({ isCapturing, onStart, onStop, onClear, onExport }: ControlPanelProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {!isCapturing ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Play className="size-5" />
            Start Capture
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Square className="size-5" />
            Stop Capture
          </button>
        )}

        <button
          onClick={onClear}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Trash2 className="size-5" />
          Clear Data
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Download className="size-5" />
          Export Report
        </button>
      </div>
    </div>
  );
}
