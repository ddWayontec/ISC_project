import { rules } from "../rbac-rules";
import { NO_PERMISSIONS } from "../utils/constants";

export const usePermissions = ({
  user,
  action,
  resourceId = undefined,
  data = {}
}) => {
  const { email, role } = user;
  const permissions = rules[role];
  // role wasn't found in our rules
  if (!permissions) return false;

  if (resourceId && email && email.toString() !== resourceId.toString()) {
    console.log(
      `Immigrant user ${email} is trying to access a resource that doesn't belong to them resource id: ${resourceId}`
    );
    return false;
  }

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
