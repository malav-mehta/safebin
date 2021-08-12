import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

export default app;
