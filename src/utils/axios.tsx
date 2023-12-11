import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (err) {
    const { config } = err;
    const originalRequest = config;
    if (err.response.data === "jwt expired") {
      //  window.location.reload();
      const refreshToken = localStorage.getItem("refreshToken");
      const body = {
        refreshToken,
      };

      const { data } = await axios
        .post(`http://localhost:4000/users/refresh`, body, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        })

        .catch((err) => {
          console.log(err.response);
        });

      localStorage.setItem("accessToken", data.response.accessToken);
      localStorage.setItem("refreshToken", data.response.refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${data.response.accessToekn}`;
      originalRequest.headers.Authorization = `Bearer ${data.response.refreshToken}`;
      return axios(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
