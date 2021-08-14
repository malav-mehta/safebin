import dotenv from "dotenv";
dotenv.config();

import { app, initApp } from "./server";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Listening on port ${port}.`);
  initApp();
});
