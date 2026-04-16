import { eq } from "drizzle-orm";
import { db } from "../db";
import { uf } from "../schema/schema";

export async function criarUf(data: {
  id: string;
  nome: string;
  sigla: string;
}) {
  await db.insert(uf).values(data);
}

export async function listarUfs() {
  return await db.select().from(uf);
}

export async function buscarUfPorId(id: string) {
  const result = await db.select().from(uf).where(eq(uf.id, id));
  return result[0] || null;
}

export async function buscarUfPorSigla(sigla: string) {
  const result = await db.select().from(uf).where(eq(uf.sigla, sigla));
  return result[0] || null;
}

export async function atualizarUf(
  id: string,
  data: {
    nome: string;
    sigla: string;
  }
) {
  await db
    .update(uf)
    .set({
      nome: data.nome,
      sigla: data.sigla,
    })
    .where(eq(uf.id, id));
}

export async function excluirUf(id: string) {
  await db.delete(uf).where(eq(uf.id, id));
}