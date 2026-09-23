import { Router } from "express";
import { createBaggageValidator, updateBaggageValidator } from "../validators/baggage";
import { create, findOne, index, remove, update } from "../services/baggage";

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

router.get("/:id", async (req, res, next) => {
  try {
    const baggage = await findOne(req.params.id, req.user);
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", updateBaggageValidator, async (req, res, next) => {
  try {
    const baggage = await update(req.params.id, req.body, req.user);
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const baggage = await remove(req.params.id, req.user);
    res.status(200).json(baggage);
  } catch (error) {
    next(error);
  }
});

export default router;