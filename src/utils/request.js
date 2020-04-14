import axios from "axios";

const proxyUrl =
  process.env.REACT_APP_BLOCKCHAIN_URL || "http://localhost:3006/blockchain";

export const request = async (url, options) => {
  const { headers = {}, data } = options;

  const response = await axios({
    url: proxyUrl,
    method: "post",
    data: {
      ...data,
      krypcUrl: url
    },
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });

  if (response.status === 200 || response.status === 204) {
    return response.data;
  }

  if (response.status >= 300) {
    throw new Error(response.data);
  }
  return response;
};
