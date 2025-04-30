import { Router } from "express";

import databaseRouter, { ROUTER as database } from "./database";

const router = Router();

router.use(database, databaseRouter);

export default router;