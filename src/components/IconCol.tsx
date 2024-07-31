import React from 'react';
import upIcon from '../assets/up-icon.svg';
import downIcon from '../assets/down-icon.svg';
import remainsIcon from '../assets/remains-icon.svg';

import { IconDirection } from '../types';

interface IconColProps {
  direction?: IconDirection;
}

const IconCol: React.FC<IconColProps> = ({ direction }) => {
  let iconSrc = remainsIcon;

  if (direction === IconDirection.Up) {
    iconSrc = upIcon;
  } else if (direction === IconDirection.Down) {
    iconSrc = downIcon;
  }

  return (
    <img
      src={iconSrc}
      alt={
        direction === IconDirection.Up
          ? IconDirection.Up
          : direction === IconDirection.Down
          ? IconDirection.Down
          : IconDirection.Remains
      }
      style={{ width: '20px', height: '20px' }}
    />
  );
};

export default IconCol;
