import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from './consts';

const HUB_URL = `${API_BASE_URL}/ClientHub`;

export interface Vote {
  generatedTime: string;
  itemId: number;
  itemCount: number;
}

class SignalRService {
  private connection: signalR.HubConnection | null = null;

  async startConnection(
    token: string,
    onVoteReceived: (votes: Vote[]) => void
  ) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
      })
      // .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on('DataReceived', onVoteReceived);

    try {
      await this.connection.start();
    } catch (err) {
      throw new Error(`SignalR failed: ${err}`);
    }
  }

  stopConnection() {
    if (this.connection) {
      this.connection.stop();
    }
  }
}

export default new SignalRService();
