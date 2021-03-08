import React from 'react';

export const ErrorMessage = ({ error, classes }) => {
  if (error) {
    return (
      <div className={classes}>
        {error}
      </div>
    );
  }

  return null;
};
