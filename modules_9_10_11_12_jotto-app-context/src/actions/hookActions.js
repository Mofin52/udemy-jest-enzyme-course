import axios from "axios";

export const getSecretWord = async (setSecretWord) => {
  const response = await axios.get("http://secretwordserver.com/");
  setSecretWord(response.data);
};

// default export for mocking convenience
export default { getSecretWord };
