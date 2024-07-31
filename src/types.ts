export enum ConnectionStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export interface Movie {
  id: number;
  description: string;
  totalVotes: number;
  lastUpdated: string;
  // positionChange: 'up' | 'down' | 'same';
}
