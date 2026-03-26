import { sectionService } from "./services/section.service";
import { initialSections } from "./config/defaultSections";

export const seed = async () => {
  console.log("Seeding initial sections...");
  try {
    await sectionService.seedInitialData(initialSections);
    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
};

if (require.main === module) {
  seed();
}
