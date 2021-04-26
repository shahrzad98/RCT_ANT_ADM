import { permissionsSelector } from '../../modules/authentication';
import { UserPermission } from '../constants';
import { useAppSelector } from './index';

const usePermissions = () => {
  const userPermissions = useAppSelector(permissionsSelector);

  const hasPermission = (permission: UserPermission) => {
    return userPermissions.includes(permission);
  };

  const hasPermissions = (permissions: readonly UserPermission[] | undefined, passIfEmpty: boolean = false) => {
    if (!permissions || permissions.length === 0) {
      return passIfEmpty;
    }

    for (const permission of permissions) {
      if (!hasPermission(permission)) {
        return false;
      }
    }
    return true;
  };

  return { hasPermission, hasPermissions };
};

export default usePermissions;
