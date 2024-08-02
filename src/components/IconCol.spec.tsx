import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IconCol from './IconCol';
import { IconDirection } from '../types';
import upIcon from '../assets/up-icon.svg';
import downIcon from '../assets/down-icon.svg';
import remainsIcon from '../assets/remains-icon.svg';

describe('IconCol', () => {
  it('renders the up icon when direction is up', () => {
    render(<IconCol direction={IconDirection.Up} />);
    const icon = screen.getByRole('img', { name: IconDirection.Up });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', upIcon);
  });

  it('renders the down icon when direction is down', () => {
    render(<IconCol direction={IconDirection.Down} />);
    const icon = screen.getByRole('img', { name: IconDirection.Down });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', downIcon);
  });

  it('renders the remains icon when direction is remains', () => {
    render(<IconCol direction={IconDirection.Remains} />);
    const icon = screen.getByRole('img', { name: IconDirection.Remains });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', remainsIcon);
  });
  it('renders the remains icon when direction is undefined', () => {
    render(<IconCol />);
    const defaultIcon = screen.getByRole('img', {
      name: IconDirection.Remains,
    });
    expect(defaultIcon).toBeInTheDocument();
    expect(defaultIcon).toHaveAttribute('src', remainsIcon);
  });
});
