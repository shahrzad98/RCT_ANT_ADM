import { useState } from 'react';

const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => {
    setValue(!value);
  };

  return [value, toggle];
};

export default useToggle;
