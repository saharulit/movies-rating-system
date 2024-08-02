import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieChart from './MovieChart';

describe('MovieChart', () => {
  it('displays a message when no votes are provided', () => {
    render(<MovieChart votes={[]} />);

    const message = screen.getByText(
      'Please select movie to display vote chart'
    );
    expect(message).toBeInTheDocument();
  });
});
