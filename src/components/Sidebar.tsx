import React, { useState } from 'react';
import { Book as BookIcon, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  testaments: Testament[];
  selectedTestament: string | null;
  selectedBook: string | null;
  selectedChapter: number | null;
  onTestamentSelect: (testament: string) => void;
  onBookSelect: (book: string) => void;
  onChapterSelect: (testament: string, book: string, chapter: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  testaments,
  selectedTestament,
  selectedBook,
  selectedChapter,
  onTestamentSelect,
  onBookSelect,
  onChapterSelect,
}) => {
  const [expandedTestaments, setExpandedTestaments] = useState<string[]>([]);
  const [expandedBooks, setExpandedBooks] = useState<string[]>([]);

  const toggleTestament = (testament: string) => {
    setExpandedTestaments(prev =>
      prev.includes(testament)
        ? prev.filter(t => t !== testament)
        : [...prev, testament]
    );
  };

  const toggleBook = (book: string) => {
    setExpandedBooks(prev =>
      prev.includes(book)
        ? prev.filter(b => b !== book)
        : [...prev, book]
    );
  };

  return (
    <div className="h-full" dir="rtl">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">الكتاب المقدس</h2>
        <div className="space-y-2">
          {testaments.map((testament) => (
            <div key={testament.name} className="border-b border-gray-100 pb-2">
              <button
                onClick={() => toggleTestament(testament.name)}
                className={`w-full text-right px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between ${
                  selectedTestament === testament.name ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <span className="font-medium">{testament.name}</span>
                {expandedTestaments.includes(testament.name) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {expandedTestaments.includes(testament.name) && (
                <div className="mr-4 mt-1 space-y-1">
                  {testament.books.map((book) => (
                    <div key={book.name}>
                      <button
                        onClick={() => toggleBook(book.name)}
                        className={`w-full text-right px-3 py-1.5 rounded-lg hover:bg-gray-50 flex items-center justify-between text-sm ${
                          selectedBook === book.name ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        <span>{book.name}</span>
                        {expandedBooks.includes(book.name) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                      
                      {expandedBooks.includes(book.name) && (
                        <div className="grid grid-cols-10 gap-1 p-2 mr-4">
                          {book.chapters.map((chapter) => (
                            <button
                              key={chapter.number}
                              onClick={() => {
                                onTestamentSelect(testament.name);
                                onBookSelect(book.name);
                                onChapterSelect(testament.name, book.name, chapter.number);
                              }}
                              className={`p-1 rounded-md text-center text-sm ${
                                selectedChapter === chapter.number && selectedBook === book.name
                                  ? 'bg-blue-600 text-white'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {chapter.number}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};