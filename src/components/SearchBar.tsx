import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  matchAllWords: boolean;
  searchSeparateWords: boolean;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  onMatchAllWordsChange: (checked: boolean) => void;
  onSearchSeparateWordsChange: (checked: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  matchAllWords,
  searchSeparateWords,
  onChange,
  onSearch,
  onMatchAllWordsChange,
  onSearchSeparateWordsChange,
}) => {
  return (
    <div className="p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ابحث في الكتاب المقدس..."
            className="w-full px-4 py-2 pr-10 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchSeparateWords}
                onChange={(e) => onSearchSeparateWordsChange(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span>البحث عن الكلمات منفصلة</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={matchAllWords}
                onChange={(e) => onMatchAllWordsChange(e.target.checked)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span>تطابق جميع الكلمات في نفس الآية</span>
            </label>
          </div>
          <button
            onClick={() => onSearch(value)}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            بحث
          </button>
        </div>
      </div>
    </div>
  );
};