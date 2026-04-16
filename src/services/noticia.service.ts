import { v4 as uuidv4 } from "uuid";
import {
  atualizarNoticia,
  atualizarStatusNoticia,
  buscarNoticiaPorId,
  criarNoticia,
  excluirNoticia,
  listarNoticias,
  listarNoticiasPorAutor,
  listarNoticiasPublicadas,
} from "../repositories/noticia.repository";

export async function criarNovaNoticia(data: {
  titulo: string;
  imagem?: string;
  resumo: string;
  texto: string;
  autorId: string;
}) {
  if (!data.titulo.trim()) {
    throw new Error("Título é obrigatório");
  }

  if (!data.resumo.trim()) {
    throw new Error("Resumo é obrigatório");
  }

  if (!data.texto.trim()) {
    throw new Error("Texto é obrigatório");
  }

  await criarNoticia({
    id: uuidv4(),
    titulo: data.titulo,
    imagem: data.imagem ?? null,
    resumo: data.resumo,
    texto: data.texto,
    autorId: data.autorId,
    status: "RASCUNHO",
    dataCriacao: new Date().toISOString(),
    dataPublicacao: null,
  });
}

export async function obterTodasNoticias() {
  return await listarNoticias();
}

export async function obterNoticiasPublicadas() {
  return await listarNoticiasPublicadas();
}

export async function obterNoticiasDoAutor(autorId: string) {
  return await listarNoticiasPorAutor(autorId);
}

export async function editarNoticia(
  id: string,
  autorId: string,
  data: {
    titulo: string;
    imagem?: string;
    resumo: string;
    texto: string;
  }
) {
  const noticia = await buscarNoticiaPorId(id);

  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }

  if (noticia.autorId !== autorId) {
    throw new Error("Você só pode editar suas próprias notícias");
  }

  if (noticia.status !== "RASCUNHO") {
    throw new Error("Só é possível editar notícia em rascunho");
  }

  await atualizarNoticia(id, data);
}

export async function publicarNoticia(id: string) {
  const noticia = await buscarNoticiaPorId(id);

  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }

  await atualizarStatusNoticia(id, "PUBLICADO");
}

export async function despublicarNoticia(id: string) {
  const noticia = await buscarNoticiaPorId(id);

  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }

  await atualizarStatusNoticia(id, "RASCUNHO");
}

export async function removerNoticia(id: string) {
  const noticia = await buscarNoticiaPorId(id);

  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }

  await excluirNoticia(id);
}

// Função adicionada conforme solicitado
export async function editorEditarNoticia(
  id: string,
  data: {
    titulo: string;
    imagem?: string;
    resumo: string;
    texto: string;
  }
) {
  const noticia = await buscarNoticiaPorId(id);

  if (!noticia) {
    throw new Error("Notícia não encontrada");
  }

  await atualizarNoticia(id, data);
}