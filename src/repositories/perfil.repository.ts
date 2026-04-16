import { eq } from "drizzle-orm";
import { db } from "../db";
import { perfil } from "../schema/schema";

export async function listarPerfis() {
  return await db.select().from(perfil);
}

export async function buscarPerfilPorDescricao(descricao: string) {
  const result = await db
    .select()
    .from(perfil)
    .where(eq(perfil.descricao, descricao));

  return result[0] || null;
}

export async function buscarPerfilPorId(id: string) {
  const result = await db
    .select()
    .from(perfil)
    .where(eq(perfil.id, id));

  return result[0] || null;
}