import get from "lodash/get";
import { useEffect } from "react";

import { GET_IMMIGRANT_BY_EMAIL_DATA } from "../utils/constants";
import { requestUserByEmail } from "../utils/request-user-by-email";
import { statusIsTrue } from "../utils/status-is-true";

export const useBasicImmigrantInfoWithState = ({
  state,
  email,
  setLoading,
  setUserData
}) => {
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const response = await requestUserByEmail(
        email,
        GET_IMMIGRANT_BY_EMAIL_DATA
      );

      if (statusIsTrue(response)) {
        const cleanedData = response.Extra.map(user => ({
          firstName: get(user, "mapsByNameAndFieldValue.FirstName.value"),
          lastName: get(user, "mapsByNameAndFieldValue.LastName.value"),
          prNo: get(user, "mapsByNameAndFieldValue.PRNo.value")
        }))[0];

        setUserData(cleanedData);
      }

      setLoading(false);
    };

    // only fetch data if state wasn't passed in
    // page was navigated to directly
    if (!state) {
      fetchUserData();
    }
  }, []);
};
