interface HistoryEntry {
  id: string;
  type: 'verse' | 'search-results';
  title: string;
  content: any;
  timestamp: number;
}

const HISTORY_KEY = 'bible_app_history';
const LAST_TAB_KEY = 'bible_app_last_tab';

export const saveToHistory = (tab: { id: string; type: string; title: string; content: any }) => {
  if (tab.type !== 'verse' && tab.type !== 'search-results') return;

  const history = getHistory();
  const entry: HistoryEntry = {
    ...tab,
    timestamp: Date.now(),
  };

  const updatedHistory = [entry, ...history.filter(h => h.id !== tab.id)].slice(0, 100);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  localStorage.setItem(LAST_TAB_KEY, JSON.stringify(entry));
};

export const getHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
};

export const getLastTab = () => {
  try {
    return JSON.parse(localStorage.getItem(LAST_TAB_KEY) || 'null');
  } catch {
    return null;
  }
};