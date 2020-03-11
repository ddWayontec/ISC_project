import { rules } from "../rbac-rules";
import { NO_PERMISSIONS } from "../utils/constants";

export const usePermissions = (role, action, data = {}) => {
  const permissions = rules[role];
  // role wasn't found in our rules
  if (!permissions) return false;

  // if the action requires no permissions, as long as the user has a valid role they can perform the action
  if (action === NO_PERMISSIONS) return true;

  const staticPermissions = permissions.static;
  if (staticPermissions && staticPermissions.includes(action)) return true;

  // dynamic permissions are functions defined in our rules to dynamically check given data does our user
  // have action to perform the given action
  const dynamicPermissions = permissions.dynamic;
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) return false;

    return permissionCondition(data);
  }

  // action wasn't found in static or dynamic permissions
  return false;
};
