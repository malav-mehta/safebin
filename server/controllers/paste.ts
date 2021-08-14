import base62 from "base62";
import MD5 from "crypto-js/md5";
import bcrypt from "bcrypt";

import { ddb, p, s3 } from "../aws";
import { Paste, TPaste } from "../models";

const BUCKET_NAME = "safebin";

const createBucket = async () => {
  try {
    const result = await s3.root
      .createBucket({
        Bucket: BUCKET_NAME,
      })
      .promise();
    console.log(`Bucket ${BUCKET_NAME} created.`);
    return { hasErrror: false };
  } catch (err) {
    if (err.code === "BucketAlreadyOwnedByYou") {
      console.log(`Bucket ${BUCKET_NAME} already exists.`);
      return { hasError: false };
    }

    console.log(`Error creating bucket ${BUCKET_NAME}:\n${p(err)}`);
    return { hasError: true, err };
  }
};

const createTable = async () => {
  try {
    const result = await ddb.root.createTable(Paste.schema).promise();
    console.log(`Table ${Paste.schema.TableName} successfully created.`);
  } catch (err) {
    if (err.code === "ResourceInUseException") {
      console.log(`Table ${Paste.schema.TableName} already created.`);
    } else {
      console.error(
        `Error creating table ${Paste.schema.TableName}:\n${p(err)}`
      );
    }
  }
};

const insert = async (paste: TPaste) => {
  try {
    const result = await ddb.client.put(Paste.create(paste)).promise();
    console.log(`Created paste with link ${paste.short_link}`);
    return { hasError: false, paste };
  } catch (err) {
    console.log(`Error creating paste:\n${p(err)}`);
    return { hasError: true, err };
  }
};

const get = async (short_link: string, userPassword: string) => {
  try {
    const rawPaste = await ddb.client.get(Paste.read(short_link)).promise();

    if (Object.keys(rawPaste).length === 0) {
      console.log(
        `Error reading paste with link ${short_link}: paste does not exist.`
      );
      return { hasEror: true, err: { code: "PasteDoesNotExist" } };
    } else {
      console.log(`Read paste with link ${short_link}`);
    }

    const paste = rawPaste.Item;

    // @ts-ignore
    if (paste.expiration_time < Date.now()) {
      console.log(`Paste ${short_link} has expired.`);
      await remove(short_link);
      return { hasError: true, err: { code: "PasteExpired" } };
    }

    // @ts-ignore
    const { has_password, password } = paste;
    if (has_password && !(await verifyPassword(userPassword, password))) {
      return { hasError: true, err: { code: "IncorrectPassword" } };
    }

    const fetchPastePathResult = await fetchPastePath(short_link);
    if (fetchPastePathResult.hasError) {
      return { hasError: true, err: fetchPastePathResult.err };
    }

    await incrementReads(short_link);

    return {
      hasError: false,
      paste: { ...paste, paste_content: fetchPastePathResult.pasteContent },
    };
  } catch (err) {
    console.log(`Error reading paste with link ${short_link}:\n${p(err)}`);
    return { hasError: true, err };
  }
};

const incrementReads = async (short_link: string) => {
  try {
    const result = await ddb.client
      .update(
        Paste.update({
          short_link,
          updateExpression: "set read_count = read_count + :r",
          expressionAttributes: {
            ":r": 1,
          },
        })
      )
      .promise();
    return { hasError: false, result };
  } catch (err) {
    console.log(
      `Error updating read count for paste ${short_link}:\n${p(err)}`
    );
    return { hasError: true, err };
  }
};

const remove = async (short_link: string) => {
  try {
    const result = await ddb.client.delete(Paste.del(short_link)).promise();
    console.log(`Deleted paste with link ${short_link}`);
    return { hasError: false, result };
  } catch (err) {
    console.log(`Error deleting paste with link ${short_link}:\n${p(err)}`);
    return { hasError: true, err };
  }
};

const exists = async (short_link: string) => {
  const { hasError, err, paste } = await get(short_link, "");
  return !!(hasError && err === "PasteNotExist");
};

const generateShortLink = async (ip: string) => {
  let link;

  do {
    const hashString = MD5(ip + Date.now().toString()).toString();
    const hashInt = parseInt(hashString, 16);
    const encoded = base62.encode(hashInt);
    link = encoded.substr(0, 7);
  } while (await exists(link));

  return link;
};

const encryptPassword = async (password: string) => {
  const SALT_ROUNDS = 10;
  try {
    const encrypted = await bcrypt.hash(password, SALT_ROUNDS);
    return encrypted;
  } catch (err) {
    console.log(`Error encrypting password: \n${p(err)}`);
    return password;
  }
};

const verifyPassword = async (password: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    console.log(`Error verifying password:\n${p(err)}`);
    return false;
  }
};

const getPastePath = async (shortLink: string, pasteContent: string) => {
  try {
    const data = await s3.root
      .upload({
        Bucket: BUCKET_NAME,
        Key: `${shortLink}.txt`,
        Body: pasteContent,
      })
      .promise();
    return data.Location;
  } catch (err) {
    console.log(`Error uploading data for paste ${shortLink}:\n${p(err)}`);
    return "";
  }
};

const fetchPastePath = async (shortLink: string) => {
  try {
    const data = await s3.root
      .getObject({
        Bucket: BUCKET_NAME,
        Key: `${shortLink}.txt`,
      })
      .promise();
    return { hasError: false, pasteContent: (data.Body || "").toString() };
  } catch (err) {
    console.log(`Error fetching paste content for ${shortLink}:\n${p(err)}`);
    return { hasError: true, err };
  }
};

const formatRawData = async ({
  expirationLength,
  hasPassword,
  password,
  language,
  pasteContent,
  ip,
}: {
  expirationLength: number;
  hasPassword: boolean;
  password: string;
  language: string;
  pasteContent: string;
  ip: string;
}) => {
  const now = Date.now();
  const link = await generateShortLink(ip);

  const paste: TPaste = {
    short_link: link,
    created_at: now,
    expiration_time: now + expirationLength,
    has_password: hasPassword,
    password: await encryptPassword(password),
    read_count: 0,
    language,
    paste_path: await getPastePath(link, pasteContent),
  };

  return paste;
};

export default {
  createBucket,
  createTable,
  insert,
  get,
  formatRawData,
};
