import React, { useEffect, useState } from 'react';

/**
 * Wait an amount of time, and then do a callback
 */

interface WaitThenProps {
  wait: number; // Seconds to wait
  andThen: () => void; // Action to perform
}

export const WaitThen: React.FC<WaitThenProps> = ({ wait, andThen }) => {
  useEffect(() => {
    const timer = setTimeout(andThen, wait * 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
};


/**
 * Wait an amount of time, and then show the children
 */

interface WaitThenShowProps {
  wait: number; // Seconds to wait
}

export const WaitThenShow: React.FC<WaitThenShowProps> = ({ wait, children }) => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {setShow(true); }, wait * 1000);
    return () => clearTimeout(timer);
  }, []);

  if (show) {
    return (
      <>
        {children}
      </>
    );
  }

  return null;
};
