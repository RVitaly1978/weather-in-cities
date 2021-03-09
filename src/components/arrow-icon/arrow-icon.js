import React from 'react';

import './arrow-icon.scss';

export const ArrowIcon = ({ classes = null, styles = null }) => {
  return (
    <span style={styles} className='icon_container'>
      <span className={`icon_item ${classes}`}></span>
    </span>
  );
};
