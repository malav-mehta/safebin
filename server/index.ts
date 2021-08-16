import dotenv from "dotenv";
dotenv.config();

import { app, initApp, port } from "./src";

app.listen(port, async () => {
  console.log(`Listening on port ${port}.`);
  initApp();
});
