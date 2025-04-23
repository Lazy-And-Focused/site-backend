import express from "express";
import App from "../app";

import "../telegram/index";

export = () => {
  const app = new App(express());
  app.listen();
}