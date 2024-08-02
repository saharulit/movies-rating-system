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
  return (
    <header className="bg-gray-100 p-4">
      <div>
        <span>Status: </span>
        <span
          className={
            connectionStatus === ConnectionStatus.Connected
              ? 'text-green-700'
              : 'text-red-700	'
          }
        >
          {connectionStatus}
        </span>
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
