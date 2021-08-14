import dotenv from "dotenv";
dotenv.config();

import { app, initApp, port } from "./server";

app.listen(port, async () => {
  console.log(`Listening on port ${port}.`);
  initApp();
});
