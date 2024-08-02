import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MovieTable from './MovieTable';
import { MovieVote } from '../types';

const mockMovies: MovieVote[] = [
  {
    id: 1,
    description: 'Action Movie',
    totalVotes: 1200,
    lastUpdated: '2024-08-01T10:00:00Z',
  },
  {
    id: 2,
    description: 'Comedy Movie',
    totalVotes: 800,
    lastUpdated: '2024-08-02T11:00:00Z',
  },
];

describe('MovieTable', () => {
  it('renders the table with movie data', () => {
    render(<MovieTable movies={mockMovies} onMovieSelect={() => {}} />);

    expect(screen.getByText('Action Movie')).toBeInTheDocument();
    expect(screen.getByText('Comedy Movie')).toBeInTheDocument();

    expect(screen.getByText('1K')).toBeInTheDocument();
    expect(screen.getByText('800')).toBeInTheDocument();
  });

  it('calls onMovieSelect when a row is clicked', async () => {
    const handleMovieSelect = vi.fn();
    render(
      <MovieTable movies={mockMovies} onMovieSelect={handleMovieSelect} />
    );

    fireEvent.click(screen.getByText('Action Movie'));

    expect(handleMovieSelect).toHaveBeenCalled();
    const [arg] = handleMovieSelect.mock.calls[0];
    expect(arg).toEqual(mockMovies[0]);
  });
});
