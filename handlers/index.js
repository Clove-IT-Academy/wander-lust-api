import { Router } from "express";
import USER_ROUTER from "./user.js";
import AUTH_ROUTER from "./auth.js";
import TRIP_ROUTER from "./trip.js";

const router = Router();

router.use("/users", USER_ROUTER);
router.use("/auth", AUTH_ROUTER);
router.use("/trip", TRIP_ROUTER);

export default router;
