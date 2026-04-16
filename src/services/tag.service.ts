import { v4 as uuidv4 } from "uuid";
import {
  atualizarTag,
  buscarTagPorDescricao,
  buscarTagPorId,
  buscarVinculoTagNoticia,
  criarTag,
  excluirTag,
  listarNoticiasPublicadasPorTag,
  listarTags,
  listarTagsDaNoticia,
  vincularTagNaNoticia,
} from "../repositories/tag.repository";

export async function criarNovaTag(descricao: string) {
  if (!descricao.trim()) {
    throw new Error("Descrição da tag é obrigatória");
  }

  const existente = await buscarTagPorDescricao(descricao.trim());

  if (existente) {
    throw new Error("Tag já existe");
  }

  await criarTag({
    id: uuidv4(),
    descricao: descricao.trim(),
  });
}

export async function obterTags() {
  return await listarTags();
}

export async function editarTag(id: string, descricao: string) {
  if (!descricao.trim()) {
    throw new Error("Descrição da tag é obrigatória");
  }

  const tagAtual = await buscarTagPorId(id);

  if (!tagAtual) {
    throw new Error("Tag não encontrada");
  }

  await atualizarTag(id, descricao.trim());
}

export async function removerTag(id: string) {
  const tagAtual = await buscarTagPorId(id);

  if (!tagAtual) {
    throw new Error("Tag não encontrada");
  }

  await excluirTag(id);
}

export async function adicionarTagNaNoticia(data: {
  noticiaId: string;
  tagId: string;
}) {
  const vinculoExistente = await buscarVinculoTagNoticia(
    data.noticiaId,
    data.tagId
  );

  if (vinculoExistente) {
    throw new Error("Essa tag já está vinculada à notícia");
  }

  await vincularTagNaNoticia(data);
}

export async function obterTagsDaNoticia(noticiaId: string) {
  return await listarTagsDaNoticia(noticiaId);
}

export async function obterNoticiasPorTag(tagId: string) {
  const noticias = await listarNoticiasPublicadasPorTag(tagId);
  return noticias.filter((item) => item.status === "PUBLICADO");
}