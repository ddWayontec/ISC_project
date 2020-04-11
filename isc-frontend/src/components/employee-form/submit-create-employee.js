import { CREATE_ISC_EMPLOYEE_DATA } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const submitCreateEmployee = async ({
  formData,
  setLoading,
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen
}) => {
  setLoading(true);

  const responseData = await request("/kc/api/ledgerChainCode/addAndMapUser", {
    method: "post",
    data: {
      ...CREATE_ISC_EMPLOYEE_DATA.addAndMapUser,
      id: formData.email,
      email: formData.email,
      EmployeeID: formData.id,
      mobile_no: formData.phone,
      first_name: formData.firstName,
      FirstLanguage: formData.firstLanguage,
      last_name: formData.lastName,
      password: formData.password,
      proposedUser: [
        {
          ID: formData.email,
          MSPID: "Org1MSP"
        }
      ]
    }
  });

  if (statusIsTrue(responseData)) {
    const sendMessageResponse = await request(
      "/kc/api/ledgerChainCode/sendMessage",
      {
        method: "post",
        data: {
          ...CREATE_ISC_EMPLOYEE_DATA.sendMessage,
          Receiver: {
            ID: formData.email,
            MSPID: "Org1MSP"
          },
          Payload: {
            ...CREATE_ISC_EMPLOYEE_DATA.sendMessage.Payload,
            Email: formData.email,
            EmployeeID: formData.id,
            FirstLanguage: formData.firstLanguage,
            FirstNameEmp: formData.firstName,
            LastNameEmp: formData.lastName,
            Password: formData.password,
            TelephoneNo: formData.phone
          }
        }
      }
    );

    if (statusIsTrue(sendMessageResponse)) {
      setLoading(false);
      return setSuccessSnackbarOpen(true);
    }
  }
  setLoading(false);
  return setErrorSnackbarOpen(true);
};
