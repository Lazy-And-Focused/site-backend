import express from "express";
import App from "./app";

import "./telegram/index";

const app = new App(express())
app.listen();

export {
  app,
};