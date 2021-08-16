import express from "express";
import cors from "cors";

import { Paste } from "./controllers";
import routes from "./routes";

export const initApp = async () => {
  // await Paste.createTable();
  // await Paste.createBucket();
};

const app = express();
export const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes.v1);

export default app;
