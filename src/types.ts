import { Movie } from './services/movie';

export enum ConnectionStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export enum IconDirection {
  Up = 'up',
  Down = 'down',
  Remains = 'remains',
}
export interface MovieVote extends Movie {
  id: number;
  description: string;
  totalVotes: number;
  lastUpdated: string;
  direction?: IconDirection;
}
