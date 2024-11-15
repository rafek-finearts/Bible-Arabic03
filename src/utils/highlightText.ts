export const highlightSearchText = (text: string, query: string): string => {
  if (!query) return text;
  
  const words = query.trim().split(/\s+/);
  let highlightedText = text;
  
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<span class="text-blue-600 font-semibold">$1</span>');
  });
  
  return highlightedText;
};