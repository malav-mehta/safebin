import axios from "./axios";

const BASE_URL = "/paste";

const get = async (shortLink: string, password: string) => {
  try {
    const result = await axios.post(BASE_URL + "/get", {
      shortLink: shortLink,
      password: password,
    });
    return result.data;
  } catch (err) {
    console.error(
      `Error sending request to paste ${shortLink}:\n${JSON.stringify(
        err,
        null,
        2
      )}`
    );
    return { hasError: true, err };
  }
};

const insert = async (paste: TClientPaste) => {
  try {
    const result = await axios.post(BASE_URL + "/insert", paste);
    return result.data;
  } catch (err) {
    console.error(
      `Error sending request to insert paste:\n${JSON.stringify(err, null, 2)}`
    );
    return { hasError: true, err };
  }
};

export default {
  get,
  insert,
};
