import { useCallback, useRef, useState } from 'react';

const useManualRerender = () => {
  const [date, setDate] = useState(Date.now());

  const needRerenderRef = useRef<boolean>();

  const rerender = useCallback(() => {
    setDate(Date.now());
    needRerenderRef.current = false;
  }, []);

  const rerenderOnNeed = useCallback(() => {
    if (needRerenderRef.current === true) {
      rerender();
    }
  }, []);

  return { rerenderData: date, rerender, needRerenderRef, rerenderOnNeed };
};

export default useManualRerender;
