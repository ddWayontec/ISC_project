import trim from "lodash/trim";

import { CREATE_IMMIGRANT, URLS } from "../../utils/constants";
import { request } from "../../utils/request";
import { statusIsTrue } from "../../utils/status-is-true";

export const submitCreateImmigrant = async ({
  formData,
  setLoading,
  setSuccessSnackbarOpen,
  setErrorSnackbarOpen
}) => {
  setLoading(true);

  const responseData = await request(URLS.addAndMapUser, {
    method: "post",
    data: {
      ...CREATE_IMMIGRANT.addAndMapUser,
      id: trim(formData.email),
      DoA: { format: "02-01-2006", value: formData.doa.toString() },
      DoB: { format: "02-01-2006", value: formData.dob.toString() },
      email: trim(formData.email),
      mobile_no: formData.phone,
      first_name: trim(formData.firstName),
      last_name: trim(formData.lastName),
      password: formData.password,
      PRNo: trim(formData.prNo),
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
        ...CREATE_IMMIGRANT.sendMessage,
        Receiver: { ID: trim(formData.email), MSPID: "Org1MSP" },
        Payload: {
          ...CREATE_IMMIGRANT.sendMessage.Payload,
          DoA: { format: "02-01-2006", value: formData.doa.toString() },
          DoB: { format: "02-01-2006", value: formData.dob.toString() },
          Email: trim(formData.email),
          FirstName: trim(formData.firstName),
          LastName: trim(formData.lastName),
          PRNo: trim(formData.prNo),
          Password: formData.password,
          TelephoneNo: formData.phone
        }
      }
    });

    if (statusIsTrue(sendMessageResponse)) {
      setLoading(false);
      return setSuccessSnackbarOpen(true);
    }
  }

  setLoading(false);
  setErrorSnackbarOpen(true);
};
