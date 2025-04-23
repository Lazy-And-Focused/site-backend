import { Router } from "express";

import newsRouter, { ROUTER as news } from "./news";

const router = Router();

router.use("/" + news, newsRouter);

export default router;