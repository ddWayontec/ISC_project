import get from "lodash/get";

import {
  GET_IMMIGRANT_BY_EMAIL_DATA,
  GET_ISC_EMPLOYEE_BY_EMAIL_DATA,
  ROLES,
  URLS
} from "./constants";
import { requestUserByEmail } from "./request-user-by-email";

const getImmigrantIdByEmail = async email => {
  const response = await requestUserByEmail(email, GET_IMMIGRANT_BY_EMAIL_DATA);

  return get(response, "Extra[0].mapsByNameAndFieldValue.PRNo.value");
};

const getIscEmployeeByEmail = async email => {
  const response = await requestUserByEmail(
    email,
    GET_ISC_EMPLOYEE_BY_EMAIL_DATA
  );

  return get(response, "Extra[0].mapsByNameAndFieldValue.EmployeeID.value");
};

export const getUserIdByEmail = async (email, role) => {
  if (role === ROLES.IMMIGRANT) {
    return await getImmigrantIdByEmail(email);
  }

  if (role === ROLES.ISC_EMPLOYEE) {
    return await getIscEmployeeByEmail(email);
  }
};
