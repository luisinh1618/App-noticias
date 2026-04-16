import { v4 as uuidv4 } from "uuid";
import {
  atualizarCidade,
  buscarCidadePorId,
  criarCidade,
  excluirCidade,
  listarCidades,
} from "../repositories/cidade.repository";
import { buscarUfPorId } from "../repositories/uf.repository";

export async function adminCriarCidade(data: {
  nome: string;
  ufId: string;
}) {
  if (!data.nome.trim()) {
    throw new Error("Nome da cidade é obrigatório");
  }

  const uf = await buscarUfPorId(data.ufId);

  if (!uf) {
    throw new Error("UF inválida");
  }

  await criarCidade({
    id: uuidv4(),
    nome: data.nome.trim(),
    ufId: data.ufId,
  });
}

export async function adminListarCidades() {
  return await listarCidades();
}

export async function adminEditarCidade(
  id: string,
  data: {
    nome: string;
    ufId: string;
  }
) {
  const cidade = await buscarCidadePorId(id);

  if (!cidade) {
    throw new Error("Cidade não encontrada");
  }

  const uf = await buscarUfPorId(data.ufId);

  if (!uf) {
    throw new Error("UF inválida");
  }

  await atualizarCidade(id, {
    nome: data.nome.trim(),
    ufId: data.ufId,
  });
}

export async function adminRemoverCidade(id: string) {
  const cidade = await buscarCidadePorId(id);

  if (!cidade) {
    throw new Error("Cidade não encontrada");
  }

  await excluirCidade(id);
}