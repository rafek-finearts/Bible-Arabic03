import React from 'react';
import { History } from 'lucide-react';
import { getHistory } from '../utils/history';

interface HistoryPanelProps {
  onHistoryItemClick: (entry: any) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onHistoryItemClick }) => {
  const history = getHistory();

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative group">
        <button
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          title="السجل"
        >
          <History className="h-5 w-5" />
        </button>
        
        <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="p-4" dir="rtl">
            <h3 className="text-lg font-bold mb-4">السجل</h3>
            <div className="space-y-2">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => onHistoryItemClick(entry)}
                  className="w-full text-right p-2 hover:bg-gray-50 rounded-lg"
                >
                  <div className="font-medium">{entry.title}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString('ar')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};