import get from "lodash/get";

import {
  GET_IMMIGRANT_BY_EMAIL_DATA,
  GET_ISC_EMPLOYEE_BY_EMAIL_DATA,
  ROLES
} from "./constants";
import { requestUserByEmail } from "./request-user-by-email";
import { statusIsTrue } from "./status-is-true";

const getImmigrantIdByEmail = async email => {
  const response = await requestUserByEmail(email, GET_IMMIGRANT_BY_EMAIL_DATA);

  if (statusIsTrue(response)) {
    return {
      id: get(response, "Extra[0].mapsByNameAndFieldValue.PRNo.value"),
      firstName: get(
        response,
        "Extra[0].mapsByNameAndFieldValue.FirstName.value"
      ),
      lastName: get(response, "Extra[0].mapsByNameAndFieldValue.LastName.value")
    };
  }

  return {};
};

const getIscEmployeeByEmail = async email => {
  const response = await requestUserByEmail(
    email,
    GET_ISC_EMPLOYEE_BY_EMAIL_DATA
  );

  if (statusIsTrue(response)) {
    return {
      id: get(response, "Extra[0].mapsByNameAndFieldValue.EmployeeID.value"),
      firstName: get(
        response,
        "Extra[0].mapsByNameAndFieldValue.FirstNameEmp.value"
      ),
      lastName: get(
        response,
        "Extra[0].mapsByNameAndFieldValue.LastNameEmp.value"
      )
    };
  }

  return {};
};

export const getBasicUserInfoByEmail = async (email, role) => {
  if (role === ROLES.IMMIGRANT) {
    return await getImmigrantIdByEmail(email);
  }

  if (role === ROLES.ISC_EMPLOYEE) {
    return await getIscEmployeeByEmail(email);
  }
};
