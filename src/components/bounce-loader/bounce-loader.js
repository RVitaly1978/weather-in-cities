import React from 'react';

import './bounce-loader.scss';

export const BounceLoader = ({ classes = null }) => {
  return (
    <div className={`bounce_container ${classes}`}>
      <span className='bounce_point bounce_point__1'></span>
      <span className='bounce_point bounce_point__2'></span>
      <span className='bounce_point'></span>
    </div>
  );
};
