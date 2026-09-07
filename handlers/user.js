import { Router } from "express";
import { create } from "../services/user.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
