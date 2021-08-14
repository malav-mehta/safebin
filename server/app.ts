import express from "express";
import { Paste } from "./controllers";

export const initApp = async () => {
  await Paste.createTable();
  await Paste.createBucket();
};

const app = express();

app.get("/", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "0.0.0.0";
  res.json({ ip });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
