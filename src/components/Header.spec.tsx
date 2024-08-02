import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { ConnectionStatus } from '../types';
import { format } from 'date-fns';

describe('Header', () => {
  it('renders disconnected status correctly', () => {
    render(
      <Header
        connectionStatus={ConnectionStatus.Disconnected}
        lastReceivedTime={null}
      />
    );

    const disconnectedStatus = screen.getByText(ConnectionStatus.Disconnected);
    expect(disconnectedStatus).toHaveClass('text-red-700');
  });
  it('renders connection status correctly', () => {
    render(
      <Header
        connectionStatus={ConnectionStatus.Connected}
        lastReceivedTime={null}
      />
    );

    const statusElement = screen.getByText(/Status:/i);
    expect(statusElement).toBeInTheDocument();

    const connectedStatus = screen.getByText(ConnectionStatus.Connected);
    expect(connectedStatus).toHaveClass('text-green-700');
  });

  it('renders last received time correctly when provided', () => {
    const testDate = new Date();
    render(
      <Header
        connectionStatus={ConnectionStatus.Connected}
        lastReceivedTime={testDate}
      />
    );

    const formattedDate = format(testDate, 'dd/MM/yyyy HH:mm:ss');
    const lastReceivedTimeElement = screen.getByText(
      `Last Received Data: ${formattedDate}`
    );
    expect(lastReceivedTimeElement).toBeInTheDocument();
  });
});
