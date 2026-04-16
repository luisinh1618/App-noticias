import { eq } from "drizzle-orm";
import { db } from "../db";
import { comentario, user } from "../schema/schema";

export async function criarComentario(data: {
  id: string;
  texto: string;
  dataCriacao: string;
  userId: string;
  noticiaId: string;
}) {
  await db.insert(comentario).values({
    id: data.id,
    texto: data.texto,
    dataCriacao: data.dataCriacao,
    userId: data.userId,
    noticiaId: data.noticiaId,
  });
}

export async function listarComentariosPorNoticia(noticiaId: string) {
  return await db
    .select({
      id: comentario.id,
      texto: comentario.texto,
      dataCriacao: comentario.dataCriacao,
      userId: comentario.userId,
      noticiaId: comentario.noticiaId,
      nomeUsuario: user.nome,
      username: user.username,
    })
    .from(comentario)
    .innerJoin(user, eq(comentario.userId, user.id))
    .where(eq(comentario.noticiaId, noticiaId));
}

export async function listarTodosComentarios() {
  return await db
    .select({
      id: comentario.id,
      texto: comentario.texto,
      dataCriacao: comentario.dataCriacao,
      userId: comentario.userId,
      noticiaId: comentario.noticiaId,
      nomeUsuario: user.nome,
      username: user.username,
    })
    .from(comentario)
    .innerJoin(user, eq(comentario.userId, user.id));
}

export async function excluirComentario(id: string) {
  await db.delete(comentario).where(eq(comentario.id, id));
}