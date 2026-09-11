import { Router } from "express";
import { create, index, show, update, remove } from "../services/user.js";
import {
  createUserValidator,
  updateUserValidator,
} from "../validators/user.js";

const router = Router();

router.post("/", createUserValidator, async (req, res, next) => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await index();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await show(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", updateUserValidator, async (req, res, next) => {
  try {
    const user = await update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const user = await remove(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
