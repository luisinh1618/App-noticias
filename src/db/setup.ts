import { initDatabase } from "./init";
import { seedDatabase } from "./seed";
import { seedUsuariosTeste } from "./dev-seed";

export async function setupDatabase() {
  await initDatabase();
  await seedDatabase();
  await seedUsuariosTeste();
}