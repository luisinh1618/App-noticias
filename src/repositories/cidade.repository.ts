import { eq } from "drizzle-orm";
import { db } from "../db";
import { cidade, uf } from "../schema/schema";

export async function criarCidade(data: {
  id: string;
  nome: string;
  ufId: string;
}) {
  await db.insert(cidade).values(data);
}

export async function listarCidades() {
  return await db
    .select({
      id: cidade.id,
      nome: cidade.nome,
      ufId: cidade.ufId,
      ufNome: uf.nome,
      ufSigla: uf.sigla,
    })
    .from(cidade)
    .innerJoin(uf, eq(cidade.ufId, uf.id));
}

export async function buscarCidadePorId(id: string) {
  const result = await db.select().from(cidade).where(eq(cidade.id, id));
  return result[0] || null;
}

export async function atualizarCidade(
  id: string,
  data: {
    nome: string;
    ufId: string;
  }
) {
  await db
    .update(cidade)
    .set({
      nome: data.nome,
      ufId: data.ufId,
    })
    .where(eq(cidade.id, id));
}

export async function excluirCidade(id: string) {
  await db.delete(cidade).where(eq(cidade.id, id));
}