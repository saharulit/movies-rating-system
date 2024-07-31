import React from 'react';
import upIcon from '../assets/up-icon.svg';
import downIcon from '../assets/down-icon.svg';
import { IconDirection } from '../types';

interface IconColProps {
  direction: IconDirection | null;
}

const IconCol: React.FC<IconColProps> = ({ direction }) => {
  if (!direction) {
    return null;
  }

  return (
    <img
      src={direction === 'up' ? upIcon : downIcon}
      alt={direction === 'up' ? 'Up' : 'Down'}
      style={{ width: '20px', height: '20px' }}
    />
  );
};

export default IconCol;
