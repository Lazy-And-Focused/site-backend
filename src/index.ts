import Env from "env";

import express from "express";
import App from "./app";

import connect from "./database/connect";
import { start } from "./telegram/index";

const env = new Env();
const app = new App(express())

start()
connect(env.get("MONGO_URL"));
app.listen();

export {
  app,
};