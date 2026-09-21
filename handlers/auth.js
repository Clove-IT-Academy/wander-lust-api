import { Router } from "express";
import { createUserValidator } from "../validators/user";
import { login, register } from "../services/auth";

const router = Router();

router.post("/register", createUserValidator, async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});


router.post("/login", async (req, res, next) => {
  try {
    const user = await login(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;