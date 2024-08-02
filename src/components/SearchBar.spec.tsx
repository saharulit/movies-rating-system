import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('calls onSearch with the input value when changed', () => {
    const handleSearch = vi.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Action' } });

    expect(handleSearch).toHaveBeenCalledWith('Action');
  });
});
