import React from 'react';
import { highlightSearchText } from '../utils/highlightText';

interface VerseDisplayProps {
  verses: Verse[];
  testament: string;
  book: string;
  chapter: number;
  highlightedVerse: number | null;
  searchQuery?: string;
}

export const VerseDisplay: React.FC<VerseDisplayProps> = ({
  verses,
  testament,
  book,
  chapter,
  highlightedVerse,
  searchQuery,
}) => {
  return (
    <div className="relative" dir="rtl">
      <div className="sticky top-0 bg-white z-10 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto px-8">
          <h1 className="text-3xl font-bold mb-2">{book}</h1>
          <p className="text-gray-600">
            {testament} • الإصحاح {chapter}
          </p>
        </div>
      </div>
      <div className="p-8 pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {verses.map((verse) => (
              <div 
                key={verse.number} 
                className={`flex ${highlightedVerse === verse.number ? 'bg-yellow-100 -mx-4 px-4 py-2 rounded-lg' : ''}`}
              >
                <span className="text-gray-400 ml-4 mt-1 text-sm">
                  {verse.number}
                </span>
                <p 
                  className="text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: searchQuery 
                      ? highlightSearchText(verse.text, searchQuery)
                      : verse.text
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};