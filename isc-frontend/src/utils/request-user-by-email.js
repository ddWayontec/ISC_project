import { URLS } from "./constants";
import { request } from "./request";

export const requestUserByEmail = async (email, data) => {
  return await request(URLS.requestReport, {
    method: "post",
    data: {
      ...data,
      Payload: {
        Email: email
      }
    }
  });
};
