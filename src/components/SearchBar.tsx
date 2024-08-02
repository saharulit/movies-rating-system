import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      className="p-2 border border-slate-700 rounded-lg"
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
