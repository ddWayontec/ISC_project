import axios from "axios";

export const request = async (url, options) => {
  const { headers = {} } = options;

  const response = await axios({
    url,
    ...options,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded'",
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
