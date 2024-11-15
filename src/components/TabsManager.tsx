import React from 'react';
import { X } from 'lucide-react';
import { Tab } from '../types';
import { VerseDisplay } from './VerseDisplay';
import { SearchResults } from './SearchResults';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';

interface TabsManagerProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onResultClick: (testament: string, book: string, chapter: number, verse: number) => void;
  searchProps: {
    value: string;
    matchAllWords: boolean;
    searchSeparateWords: boolean;
    onChange: (value: string) => void;
    onSearch: (query: string) => void;
    onMatchAllWordsChange: (checked: boolean) => void;
    onSearchSeparateWordsChange: (checked: boolean) => void;
  };
  sidebarProps: {
    testaments: any[];
    selectedTestament: string | null;
    selectedBook: string | null;
    selectedChapter: number | null;
    onTestamentSelect: (testament: string) => void;
    onBookSelect: (book: string) => void;
    onChapterSelect: (testament: string, book: string, chapter: number) => void;
  };
}

export const TabsManager: React.FC<TabsManagerProps> = ({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onResultClick,
  searchProps,
  sidebarProps,
}) => {
  if (tabs.length === 0) return null;

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const isAnyTabExpanded = tabs.some(tab => !tab.isCollapsed);

  return (
    <div className="fixed inset-0 flex flex-col justify-end">
      <div className={`bg-white transition-all duration-300 ${
        isAnyTabExpanded ? 'h-[calc(100%-3rem)]' : 'h-0'
      } overflow-y-auto`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`h-full ${
              activeTabId === tab.id && !tab.isCollapsed ? 'block' : 'hidden'
            }`}
          >
            {tab.type === 'verse' && tab.content.verses && (
              <VerseDisplay
                verses={tab.content.verses}
                testament={tab.content.testament!}
                book={tab.content.book!}
                chapter={tab.content.chapter!}
                highlightedVerse={tab.content.highlightedVerse}
                searchQuery={tab.content.searchQuery}
              />
            )}
            {tab.type === 'search-results' && tab.content.searchResults && (
              <SearchResults
                results={tab.content.searchResults}
                searchQuery={tab.content.searchQuery!}
                onResultClick={onResultClick}
              />
            )}
            {tab.type === 'navigation' && (
              <Sidebar {...sidebarProps} />
            )}
            {tab.type === 'search-input' && (
              <SearchBar {...searchProps} />
            )}
          </div>
        ))}
      </div>
      
      <div className="h-12 bg-white border-t border-gray-200 flex items-center px-4">
        <div className="flex overflow-x-auto hide-scrollbar" dir="rtl">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center px-4 py-2 space-x-2 space-x-reverse border-r border-gray-200 ${
                activeTabId === tab.id && !tab.isCollapsed
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => onTabClick(tab.id)}
                className="flex items-center gap-2"
              >
                <span>{tab.title}</span>
              </button>
              {(tab.type !== 'navigation' && tab.type !== 'search-input') && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};