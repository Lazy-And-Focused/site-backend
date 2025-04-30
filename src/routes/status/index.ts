import { Router } from "express";

import databaseouter, { ROUTER as database } from "./database";

const router = Router();

router.use(database, databaseouter);

export default router;