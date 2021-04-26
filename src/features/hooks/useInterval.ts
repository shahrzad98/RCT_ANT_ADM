import { useCallback, useEffect, useRef, useState } from 'react';

import { useMount } from './index';

const useInterval = (intervalFunction: Function, delayMs: number, cancelOnUnmount: boolean = true) => {
  const interval = useRef<NodeJS.Timeout>();
  const callback = useRef<Function>(intervalFunction);
  const [isCleared, setIsCleared] = useState(false);

  const cleanup = useCallback(() => {
    if (interval.current) {
      setIsCleared(true);
      clearInterval(interval.current);
    }
  }, []);

  useEffect(() => {
    callback.current = intervalFunction;
  }, [intervalFunction]);

  useEffect(() => {
    interval.current = setInterval(() => {
      callback.current();
    }, delayMs);

    return cleanup;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs]);

  useMount(() => {
    return () => {
      if (cancelOnUnmount) {
        cleanup();
      }
    };
  });

  return { isCleared, cleanup };
};

export default useInterval;
