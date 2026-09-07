import { Router } from "express";
import USER_ROUTER from "./user.js";

const router = Router();

router.use("/users", USER_ROUTER);

export default router;
