import { Router } from "express";

import { ROUTES, ROUTER } from "./news.routes";

import Service from "./news.service";
import Controller from "./news.controller";

const controller = new Controller();
const router = Router();

router.get(ROUTES.GET, controller.get);

export { ROUTER }

export default router;
