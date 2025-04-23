import { start } from "telegram";

import express from "express";
import App from "./app";

const app = new App(express())
const telegram = start();

app.listen();

export {
  app,
  telegram
};