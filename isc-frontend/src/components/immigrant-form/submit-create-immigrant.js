import { CREATE_IMMIGRANT } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const submitCreateImmigrant = async ({
  formData,
  setLoading,
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen
}) => {
  setLoading(true);

  console.log(`form data: ${JSON.stringify(formData)}`);

  const responseData = await request("/kc/api/ledgerChainCode/addAndMapUser", {
    method: "post",
    data: {
      ...CREATE_IMMIGRANT.addAndMapUser,
      id: formData.email,
      DoA: { format: "02-01-2006", value: formData.doa.toString() },
      DoB: { format: "02-01-2006", value: formData.dob.toString() },
      email: formData.email,
      mobile_no: formData.phone,
      first_name: formData.firstName,
      last_name: formData.lastName,
      password: formData.password,
      PRNo: formData.prNo,
      proposedUser: [
        {
          ID: formData.email,
          MSPID: "Org1MSP"
        }
      ]
    }
  });

  console.log(`Response data: ${JSON.stringify(responseData)}`);
  if (statusIsTrue(responseData)) {
    const sendMessageResponse = await request(
      "/kc/api/ledgerChainCode/sendMessage",
      {
        method: "post",
        data: {
          ...CREATE_IMMIGRANT.sendMessage,
          Receiver: { ID: formData.email, MSPID: "Org1MSP" },
          Payload: {
            ...CREATE_IMMIGRANT.sendMessage.Payload,
            DoA: { format: "02-01-2006", value: formData.doa.toString() },
            DoB: { format: "02-01-2006", value: formData.dob.toString() },
            Email: formData.email,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            PRNo: formData.prNo,
            Password: formData.password,
            TelephoneNo: formData.phone
          }
        }
      }
    );

    console.log(
      `send message response data: ${JSON.stringify(sendMessageResponse)}`
    );

    if (statusIsTrue(sendMessageResponse)) {
      setLoading(false);
      return setSuccessSnackbarOpen(true);
    }
  }

  setLoading(false);
  setErrorSnackbarOpen(true);
};
