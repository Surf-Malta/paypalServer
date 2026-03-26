import { Router } from "express";
import * as sectionController from "../controllers/section.controller";

/**
 * Section Routes
 */

const router = Router();

// Public route to get active sections for the landing page
router.get("/active", sectionController.getActiveSections);

// Admin routes
router.get("/", sectionController.getAllSections);
router.post("/", sectionController.createSection);
router.put("/reorder", sectionController.reorderSections);
router.post("/:id/reset", sectionController.resetSection);
router.put("/:id", sectionController.updateSection);
router.delete("/:id", sectionController.deleteSection);

export default router;
