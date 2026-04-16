import { db } from "../db";
import { noticia } from "../schema/schema";
import { eq } from "drizzle-orm";

export async function criarNoticia(data: {
  id: string;
  titulo: string;
  imagem?: string | null;
  resumo: string;
  texto: string;
  autorId: string;
  status: string;
  dataCriacao: string;
  dataPublicacao?: string | null;
}) {
  await db.insert(noticia).values({
    id: data.id,
    titulo: data.titulo,
    imagem: data.imagem ?? null,
    resumo: data.resumo,
    texto: data.texto,
    autorId: data.autorId,
    status: data.status,
    dataCriacao: data.dataCriacao,
    dataPublicacao: data.dataPublicacao ?? null,
  });
}

export async function listarNoticias() {
  return await db.select().from(noticia);
}

// Nova função adicionada:
export async function listarNoticiasPublicadas() {
  return await db
    .select()
    .from(noticia)
    .where(eq(noticia.status, "PUBLICADO"));
}

export async function listarNoticiasPorAutor(autorId: string) {
  return await db
    .select()
    .from(noticia)
    .where(eq(noticia.autorId, autorId));
}

export async function buscarNoticiaPorId(id: string) {
  const result = await db.select().from(noticia).where(eq(noticia.id, id));
  return result[0] || null;
}

export async function atualizarNoticia(
  id: string,
  data: {
    titulo: string;
    imagem?: string | null;
    resumo: string;
    texto: string;
  }
) {
  await db
    .update(noticia)
    .set({
      titulo: data.titulo,
      imagem: data.imagem ?? null,
      resumo: data.resumo,
      texto: data.texto,
    })
    .where(eq(noticia.id, id));
}

export async function atualizarStatusNoticia(
  id: string,
  status: "RASCUNHO" | "PUBLICADO"
) {
  await db
    .update(noticia)
    .set({
      status,
      dataPublicacao: status === "PUBLICADO" ? new Date().toISOString() : null,
    })
    .where(eq(noticia.id, id));
}

export async function excluirNoticia(id: string) {
  await db.delete(noticia).where(eq(noticia.id, id));
}