import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { Sidebar } from './components/Sidebar';
import { TabsManager } from './components/TabsManager';
import { HistoryPanel } from './components/HistoryPanel';
import { searchBible } from './utils/arabicUtils';
import { saveToHistory, getLastTab } from './utils/history';
import { Tab } from './types';
import bibleData from './data/bible.json';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSeparateWords, setSearchSeparateWords] = useState(false);
  const [matchAllWords, setMatchAllWords] = useState(false);
  const [selectedTestament, setSelectedTestament] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');

  useEffect(() => {
    // Initialize with the last opened tab or first chapter
    const lastTab = getLastTab();
    const firstTestament = bibleData[0];
    const firstBook = firstTestament.books[0];
    const firstChapter = firstBook.chapters[0];

    const initialTab: Tab = lastTab || {
      id: `verse-${firstTestament.name}-${firstBook.name}-${firstChapter.number}-initial`,
      type: 'verse',
      title: `${firstBook.name} ${firstChapter.number}`,
      content: {
        testament: firstTestament.name,
        book: firstBook.name,
        chapter: firstChapter.number,
        verses: firstChapter.verses,
        highlightedVerse: null,
      },
      isCollapsed: false
    };

    const navigationTab: Tab = {
      id: 'navigation',
      type: 'navigation',
      title: 'الكتب',
      content: {},
      isCollapsed: true
    };

    const searchTab: Tab = {
      id: 'search',
      type: 'search-input',
      title: 'البحث',
      content: {},
      isCollapsed: true
    };

    setTabs([navigationTab, searchTab, initialTab]);
    setActiveTabId(initialTab.id);
    setSelectedTestament(firstTestament.name);
    setSelectedBook(firstBook.name);
    setSelectedChapter(firstChapter.number);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) return;

    const results = searchBible(query, bibleData, matchAllWords, searchSeparateWords);
    
    const searchTab: Tab = {
      id: `search-results-${Date.now()}`,
      type: 'search-results',
      title: `نتائج: ${query}`,
      content: {
        searchQuery: query,
        searchResults: results,
      },
      isCollapsed: false
    };

    setTabs(prev => [...prev, searchTab]);
    setActiveTabId(searchTab.id);
    saveToHistory(searchTab);
  };

  const handleVerseSelection = (testament: string, book: string, chapter: number, highlightedVerse?: number) => {
    const verses = bibleData
      .find(t => t.name === testament)
      ?.books.find(b => b.name === book)
      ?.chapters.find(c => c.number === chapter)
      ?.verses || [];

    if (!verses.length) return;

    const verseTab: Tab = {
      id: `verse-${testament}-${book}-${chapter}-${Date.now()}`,
      type: 'verse',
      title: `${book} ${chapter}`,
      content: {
        testament,
        book,
        chapter,
        verses,
        highlightedVerse,
        searchQuery: highlightedVerse ? searchQuery : undefined,
      },
      isCollapsed: false
    };

    setTabs(prev => prev.map(tab => ({ ...tab, isCollapsed: true })).concat(verseTab));
    setActiveTabId(verseTab.id);
    saveToHistory(verseTab);
  };

  const handleSearchResultClick = (
    testament: string,
    book: string,
    chapter: number,
    verse: number
  ) => {
    handleVerseSelection(testament, book, chapter, verse);
  };

  const handleHistoryItemClick = (historyEntry: any) => {
    if (historyEntry.type === 'verse') {
      handleVerseSelection(
        historyEntry.content.testament,
        historyEntry.content.book,
        historyEntry.content.chapter,
        historyEntry.content.highlightedVerse
      );
    } else if (historyEntry.type === 'search-results') {
      setSearchQuery(historyEntry.content.searchQuery);
      handleSearch(historyEntry.content.searchQuery);
    }
  };

  const handleTabClose = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.type === 'navigation' || tab?.type === 'search-input') return;
    
    setTabs(prev => {
      const updatedTabs = prev.filter(tab => tab.id !== tabId);
      // Ensure at least one tab is open
      if (updatedTabs.length > 2 && updatedTabs.every(tab => tab.isCollapsed)) {
        return updatedTabs.map((tab, index) => 
          index === updatedTabs.length - 1 ? { ...tab, isCollapsed: false } : tab
        );
      }
      return updatedTabs;
    });

    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter(tab => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        setActiveTabId(remainingTabs[remainingTabs.length - 1].id);
      }
    }
  };

  const handleTabClick = (tabId: string) => {
    const clickedTab = tabs.find(tab => tab.id === tabId);
    if (!clickedTab) return;

    setTabs(prev => prev.map(tab => ({
      ...tab,
      isCollapsed: tab.id === tabId ? !tab.isCollapsed : true
    })));
    
    setActiveTabId(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HistoryPanel onHistoryItemClick={handleHistoryItemClick} />
      <TabsManager
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
        onResultClick={handleSearchResultClick}
        searchProps={{
          value: searchQuery,
          matchAllWords,
          searchSeparateWords,
          onChange: setSearchQuery,
          onSearch: handleSearch,
          onMatchAllWordsChange: setMatchAllWords,
          onSearchSeparateWordsChange: setSearchSeparateWords,
        }}
        sidebarProps={{
          testaments: bibleData,
          selectedTestament,
          selectedBook,
          selectedChapter,
          onTestamentSelect: setSelectedTestament,
          onBookSelect: setSelectedBook,
          onChapterSelect: handleVerseSelection,
        }}
      />
    </div>
  );
}

export default App;