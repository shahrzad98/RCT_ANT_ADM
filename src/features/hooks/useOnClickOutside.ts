import { MutableRefObject, useEffect } from 'react';

const useOnClickOutside = (ref: MutableRefObject<Element | null>, handler: (event: any) => void) => {
  const listener = (event: any) => {
    // Do nothing if clicking ref's element or descendent elements
    console.log(ref.current);
    if (!ref.current || ref.current?.contains(event.target)) {
      return;
    }
    handler(event);
  };

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
