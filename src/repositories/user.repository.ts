import { eq } from "drizzle-orm";
import { db } from "../db";
import { user } from "../schema/schema";

// Criar usuário
export async function criarUsuario(data: {
  id: string;
  nome: string;
  username: string;
  password: string;
  perfilId: string;
}) {
  await db.insert(user).values(data);
}

// Buscar por username
export async function buscarUsuarioPorUsername(username: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  return result[0] || null;
}

export async function listarUsuarios() {
  return await db.select().from(user);
}

export async function buscarUsuarioPorId(id: string) {
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0] || null;
}

export async function atualizarUsuario(
  id: string,
  data: {
    nome: string;
    username: string;
    password: string;
    perfilId: string;
  }
) {
  await db
    .update(user)
    .set({
      nome: data.nome,
      username: data.username,
      password: data.password,
      perfilId: data.perfilId,
    })
    .where(eq(user.id, id));
}

export async function excluirUsuario(id: string) {
  await db.delete(user).where(eq(user.id, id));
}