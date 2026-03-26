import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Section, SectionType, CreateSectionDto, UpdateSectionDto } from "../types/section.types";
import { initialSections } from "../config/defaultSections";

/**
 * Section Service
 * Handles landing page sections with JSON persistence
 */

class SectionService {
  private filePath: string;
  private sections: Section[] = [];
  private initialized: boolean = false;

  constructor() {
    this.filePath = path.join(process.cwd(), "data", "sections.json");
  }

  /**
   * Initialize the service by loading data from JSON file
   */
  private async init() {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.filePath);
      await fs.mkdir(dataDir, { recursive: true });

      // Check if file exists
      try {
        const data = await fs.readFile(this.filePath, "utf-8");
        this.sections = JSON.parse(data);
      } catch (error: any) {
        if (error.code === "ENOENT") {
          // File doesn't exist, start with empty list
          if (!this.initialized) {
            this.sections = [];
            await this.save();
          }
        } else {
          throw error;
        }
      }
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize SectionService:", error);
      throw error;
    }
  }

  /**
   * Save current sections to JSON file
   */
  private async save() {
    await fs.writeFile(this.filePath, JSON.stringify(this.sections, null, 2), "utf-8");
  }

  /**
   * Get all sections
   */
  async getAllSections(): Promise<Section[]> {
    await this.init();
    return [...this.sections].sort((a, b) => a.order - b.order);
  }

  /**
   * Get active sections
   */
  async getActiveSections(): Promise<Section[]> {
    await this.init();
    return this.sections
      .filter((s) => s.isActive)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get section by ID
   */
  async getSectionById(id: string): Promise<Section | null> {
    await this.init();
    return this.sections.find((s) => s.id === id) || null;
  }

  /**
   * Create a new section
   */
  async createSection(dto: CreateSectionDto): Promise<Section> {
    await this.init();
    const newSection: Section = {
      id: uuidv4(),
      ...dto,
      isActive: dto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.sections.push(newSection);
    await this.save();
    return newSection;
  }

  /**
   * Update an existing section
   */
  async updateSection(id: string, dto: UpdateSectionDto): Promise<Section> {
    await this.init();
    const index = this.sections.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Section not found");
    }

    const updatedSection = {
      ...this.sections[index],
      ...dto,
      updatedAt: new Date(),
    };

    this.sections[index] = updatedSection;
    await this.save();
    return updatedSection;
  }

  /**
   * Reset a section to its default content
   */
  async resetSection(id: string): Promise<Section> {
    await this.init();
    const index = this.sections.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error("Section not found");
    }

    const section = this.sections[index];
    const defaultSection = initialSections.find((s) => s.type === section.type);
    
    if (!defaultSection) {
      throw new Error(`No default content found for section type: ${section.type}`);
    }

    const updatedSection = {
      ...section,
      content: defaultSection.content,
      updatedAt: new Date(),
    };

    this.sections[index] = updatedSection;
    await this.save();
    return updatedSection;
  }

  /**
   * Bulk update section orders
   */
  async reorderSections(orders: { id: string; order: number }[]): Promise<Section[]> {
    await this.init();
    
    for (const item of orders) {
      const section = this.sections.find(s => s.id === item.id);
      if (section) {
        section.order = item.order;
        section.updatedAt = new Date();
      }
    }

    await this.save();
    return this.getAllSections();
  }

  /**
   * Delete a section
   */
  async deleteSection(id: string): Promise<void> {
    await this.init();
    const initialLength = this.sections.length;
    this.sections = this.sections.filter((s) => s.id !== id);
    
    if (this.sections.length !== initialLength) {
      await this.save();
    }
  }

  /**
   * Seed initial data if empty
   */
  async seedInitialData(sections: CreateSectionDto[]): Promise<void> {
    await this.init();
    if (this.sections.length > 0) return;

    for (const dto of sections) {
      await this.createSection(dto);
    }
  }
}

export const sectionService = new SectionService();
