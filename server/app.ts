import express from "express";

import { Paste } from "./controllers";
import routes from "./routes";

export const initApp = async () => {
  await Paste.createTable();
  await Paste.createBucket();
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes.v1);

export default app;
