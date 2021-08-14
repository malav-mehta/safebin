import express from "express";
import { Paste } from "./controllers";

import { p } from "../server/aws";

export const initApp = async () => {
  await Paste.createTable();
  await Paste.createBucket();
};

const app = express();

app.get("/", async (req, res) => {
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "0.0.0.0"
  ).toString();
  const formattedPaste = await Paste.formatRawData({
    expirationLength: 1800000,
    hasPassword: true,
    password: "password",
    language: "python3",
    pasteContent: "2nd inserted paste",
    ip,
  });

  res.json(await Paste.insert(formattedPaste));
});

app.get("/get", async (req, res) => {
  res.json(await Paste.get("5Cv6Nus", "password"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
