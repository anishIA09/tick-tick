import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

export const get = ({ url = "", params, headers }) =>
  new Promise((resolve, reject) => {
    axiosInstance
      .get(url, {
        headers: {
          ...headers,
        },
        params: params,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const post = ({ url = "", params, body, headers }) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, body, {
        headers: {
          ...headers,
        },
        params,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          let message;

          if (error.status >= 500 && error.status < 600) {
            message = "Something went wrong.";
          } else {
            message = error?.response?.data?.message || error.message;
          }

          return reject({ data: error?.response?.data, message });
        } else {
          return reject(error?.response?.data ?? "Something went wrong.");
        }
      });
  });
};
