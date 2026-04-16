import { excluirComentario, listarTodosComentarios } from "../repositories/comentario.repository";

export async function adminListarComentarios() {
  return await listarTodosComentarios();
}

export async function adminExcluirComentario(id: string) {
  await excluirComentario(id);
}