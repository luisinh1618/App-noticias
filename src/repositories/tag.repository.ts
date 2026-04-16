import { eq, and } from "drizzle-orm"; 
import { db } from "../db";
import { tag, noticiaTag, noticia } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";

export async function criarTag(data: { id: string; descricao: string }) {
  await db.insert(tag).values(data);
}

export async function listarTags() {
  return await db.select().from(tag);
}

export async function buscarTagPorDescricao(descricao: string) {
  const result = await db.select().from(tag).where(eq(tag.descricao, descricao));
  return result[0] || null;
}

export async function buscarTagPorId(id: string) {
  const result = await db.select().from(tag).where(eq(tag.id, id));
  return result[0] || null;
}

export async function atualizarTag(id: string, descricao: string) {
  await db.update(tag).set({ descricao }).where(eq(tag.id, id));
}

export async function excluirTag(id: string) {
  await db.delete(tag).where(eq(tag.id, id));
}

export async function buscarVinculoTagNoticia(noticiaId: string, tagId: string) {
  const result = await db
    .select()
    .from(noticiaTag)
    .where(
      and(
        eq(noticiaTag.noticiaId, noticiaId),
        eq(noticiaTag.tagId, tagId)
      )
    );

  return result[0] || null;
}

export async function vincularTagNaNoticia(data: {
  noticiaId: string;
  tagId: string;
}) {
  await db.insert(noticiaTag).values({
    noticiaId: data.noticiaId,
    tagId: data.tagId,
  });
}

export async function listarTagsDaNoticia(noticiaId: string) {
  return await db
    .select({
      id: tag.id,
      descricao: tag.descricao,
    })
    .from(noticiaTag)
    .innerJoin(tag, eq(noticiaTag.tagId, tag.id))
    .where(eq(noticiaTag.noticiaId, noticiaId));
}

export async function listarNoticiasPublicadasPorTag(tagId: string) {
  return await db
    .select({
      id: noticia.id,
      titulo: noticia.titulo,
      imagem: noticia.imagem,
      resumo: noticia.resumo,
      texto: noticia.texto,
      status: noticia.status,
      dataCriacao: noticia.dataCriacao,
      dataPublicacao: noticia.dataPublicacao,
    })
    .from(noticiaTag)
    .innerJoin(noticia, eq(noticiaTag.noticiaId, noticia.id))
    .where(eq(noticiaTag.tagId, tagId));
}