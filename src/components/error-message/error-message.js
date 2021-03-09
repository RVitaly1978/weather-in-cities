import React from 'react';

import './error-message.scss';

export const ErrorMessage = ({ error = null, classes = undefined }) => {
  if (error) {
    return (
      <div className={`error ${classes}`}>
        {error}
      </div>
    );
  }

  return null;
};
