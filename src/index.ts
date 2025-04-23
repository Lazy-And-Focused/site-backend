import { start } from "telegram";

import express from "express";
import App from "./app";

(async () => {
  new App(express()).listen();
  start();
})();