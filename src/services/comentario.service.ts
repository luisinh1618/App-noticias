import { v4 as uuidv4 } from "uuid";
import {
  criarComentario,
  listarComentariosPorNoticia,
} from "../repositories/comentario.repository";

export async function adicionarComentario(data: {
  texto: string;
  userId: string;
  noticiaId: string;
}) {
  if (!data.texto.trim()) {
    throw new Error("O comentário não pode estar vazio");
  }

  await criarComentario({
    id: uuidv4(),
    texto: data.texto,
    dataCriacao: new Date().toISOString(),
    userId: data.userId,
    noticiaId: data.noticiaId,
  });
}

export async function obterComentariosDaNoticia(noticiaId: string) {
  return await listarComentariosPorNoticia(noticiaId);
}