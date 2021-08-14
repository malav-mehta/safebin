import express from "express";
import { Paste } from "../controllers";

const routes = express.Router();

routes.post("/insert", async (req, res) => {
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "0.0.0.0"
  ).toString();

  const formattedPaste = await Paste.formatRawData({
    expirationLength: req.body.expirationLength,
    hasPassword: req.body.hasPassword,
    password: req.body.password,
    language: req.body.language,
    pasteContent: req.body.pasteContent,
    ip,
  });

  return res.json(await Paste.insert(formattedPaste));
});

routes.post("/get", async (req, res) => {
  return res.json(await Paste.get(req.body.shortLink, req.body.password));
});

export default routes;
