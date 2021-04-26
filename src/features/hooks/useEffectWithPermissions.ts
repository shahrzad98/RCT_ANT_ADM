import { DependencyList, EffectCallback, useEffect } from 'react';

import { UserPermission } from '../constants';
import { usePermissions } from './index';

const useEffectWithPermissions = (effect: EffectCallback, permissions: readonly UserPermission[], deps?: DependencyList) => {
  const { hasPermissions } = usePermissions();

  useEffect(() => {
    if (hasPermissions(permissions)) {
      effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectWithPermissions;
