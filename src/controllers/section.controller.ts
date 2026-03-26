import { Request, Response } from "express";
import { sectionService } from "../services/section.service";
import { CreateSectionDto, UpdateSectionDto } from "../types/section.types";

/**
 * Section Controller
 * Handles HTTP requests for landing page sections
 */

export const getAllSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionService.getAllSections();
    res.status(200).json({
      success: true,
      data: sections,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sections",
    });
  }
};

export const getActiveSections = async (req: Request, res: Response) => {
  try {
    const sections = await sectionService.getActiveSections();
    res.status(200).json({
      success: true,
      data: sections,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch active sections",
    });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const dto: CreateSectionDto = req.body;
    const section = await sectionService.createSection(dto);
    res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create section",
    });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dto: UpdateSectionDto = req.body;
    const section = await sectionService.updateSection(id, dto);
    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update section",
    });
  }
};

export const reorderSections = async (req: Request, res: Response) => {
  try {
    const { orders } = req.body;
    const sections = await sectionService.reorderSections(orders);
    res.status(200).json({
      success: true,
      data: sections,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to reorder sections",
    });
  }
};

export const resetSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const section = await sectionService.resetSection(id);
    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to reset section",
    });
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await sectionService.deleteSection(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete section",
    });
  }
};
