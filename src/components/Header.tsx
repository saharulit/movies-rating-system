import React from 'react';
import { ConnectionStatus } from '../types';
import { format } from 'date-fns';

interface HeaderProps {
  connectionStatus: ConnectionStatus;
  lastReceivedTime: Date | null;
}

const Header: React.FC<HeaderProps> = ({
  connectionStatus,
  lastReceivedTime,
}) => {
  const statusColor =
    connectionStatus === ConnectionStatus.Connected ? 'green' : 'red';

  return (
    <header>
      <div>
        <span>Status: </span>
        <span style={{ color: statusColor }}>{connectionStatus}</span>
      </div>
      <div>
        {lastReceivedTime && (
          <span>
            Last Received Data:{' '}
            {format(lastReceivedTime, 'dd/MM/yyyy HH:mm:ss')}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
