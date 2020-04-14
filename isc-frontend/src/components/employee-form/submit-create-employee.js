import trim from "lodash/trim";

import { CREATE_ISC_EMPLOYEE_DATA, URLS } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const submitCreateEmployee = async ({
  formData,
  setLoading,
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen
}) => {
  setLoading(true);

  const responseData = await request(URLS.addAndMapUser, {
    method: "post",
    data: {
      ...CREATE_ISC_EMPLOYEE_DATA.addAndMapUser,
      id: trim(formData.email),
      email: trim(formData.email),
      EmployeeID: trim(formData.id),
      mobile_no: trim(formData.phone),
      first_name: trim(formData.firstName),
      FirstLanguage: trim(formData.firstLanguage),
      last_name: trim(formData.lastName),
      password: formData.password,
      proposedUser: [
        {
          ID: trim(formData.email),
          MSPID: "Org1MSP"
        }
      ]
    }
  });

  if (statusIsTrue(responseData)) {
    const sendMessageResponse = await request(URLS.sendMessage, {
      method: "post",
      data: {
        ...CREATE_ISC_EMPLOYEE_DATA.sendMessage,
        Receiver: {
          ID: formData.email,
          MSPID: "Org1MSP"
        },
        Payload: {
          ...CREATE_ISC_EMPLOYEE_DATA.sendMessage.Payload,
          Email: trim(formData.email),
          EmployeeID: trim(formData.id),
          FirstLanguage: trim(formData.firstLanguage),
          FirstNameEmp: trim(formData.firstName),
          LastNameEmp: trim(formData.lastName),
          Password: formData.password,
          TelephoneNo: trim(formData.phone)
        }
      }
    });

    if (statusIsTrue(sendMessageResponse)) {
      setLoading(false);
      return setSuccessSnackbarOpen(true);
    }
  }
  setLoading(false);
  return setErrorSnackbarOpen(true);
};
