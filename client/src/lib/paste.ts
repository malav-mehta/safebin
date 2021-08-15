import axios from "./axios";
import cryptojs from "crypto-js";

const BASE_URL = "/paste";

const encryptData = (data: string, password: string) => {
  return cryptojs.AES.encrypt(data, password).toString();
};

const decryptData = (cipher: string, password: string) => {
  return cryptojs.AES.decrypt(cipher, password).toString(cryptojs.enc.Utf8);
};

const get = async ({
  shortLink,
  password,
}: {
  shortLink: string;
  password: string;
}) => {
  try {
    let result = await axios.post(BASE_URL + "/get", {
      shortLink: shortLink,
      password: password,
    });
    if (result.data.paste) {
      const { hasPassword, pasteContent } = result.data.paste;
      if (hasPassword)
        result.data.paste.pasteContent = decryptData(pasteContent, password);
    }
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
    if (paste.hasPassword)
      paste.pasteContent = encryptData(paste.pasteContent, paste.password);
    const result = await axios.post(BASE_URL + "/insert", paste);
    return result.data;
  } catch (err) {
    console.error(
      `Error sending request to insert paste:\n${JSON.stringify(err, null, 2)}`
    );
    return { hasError: true, err };
  }
};

const Paste = {
  get,
  insert,
};

export default Paste;
