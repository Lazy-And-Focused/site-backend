import express from "express";
import App from "./app";

const app = new App(express())
app.listen();

export {
  app,
};