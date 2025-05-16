import { env } from "../../src/services/env";

import express from "express";
import serverless from "serverless-http";

import App from "../../src/app";

import connect from "../../src/database/connect";
// import { start } from "../../src/telegram/index";

const { app } = new App(express(), ".netlify/functions/");

// start()
connect(env.get("MONGO_URL"));

export const handler = serverless(app);