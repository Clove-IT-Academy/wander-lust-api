import { Router } from "express";
import { createBaggageValidator } from "../validators/baggage";
import { create, index } from "../services/baggage";

const router = Router();

router.post("/", createBaggageValidator, async (req, res, next) => {
  try {
    const baggage = await create({...req.body, user: req.user, trip: req.params.tripId});
    res.status(201).json(baggage);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const baggage = await index(req.user, req.params.tripId);
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

export default router;