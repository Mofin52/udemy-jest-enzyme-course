import axios from "axios";

export const getSecretWord = () => {
  return axios
    .get("http://secretwordserver/getSecretWord")
    .then((response) => response.data);
};
