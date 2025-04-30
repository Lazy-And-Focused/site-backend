import Env from "env";

import express from "express";
import App from "./app";

import connect from "./database/connect";
import "./telegram/index";

const env = new Env();
const app = new App(express())

connect(env.get("MONGO_URL"));
app.listen();

export {
  app,
};