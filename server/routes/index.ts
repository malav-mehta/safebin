import express from "express";
import pasteRoutes from "./paste";

const v1 = express.Router();

v1.use("/paste", pasteRoutes);

export default {
  v1,
};
