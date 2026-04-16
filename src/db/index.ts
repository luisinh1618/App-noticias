import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

export const expoDb = SQLite.openDatabaseSync("noticias.db");
export const db = drizzle(expoDb);