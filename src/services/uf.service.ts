import { v4 as uuidv4 } from "uuid";
import {
  atualizarUf,
  buscarUfPorId,
  buscarUfPorSigla,
  criarUf,
  excluirUf,
  listarUfs,
} from "../repositories/uf.repository";

export async function adminCriarUf(data: {
  nome: string;
  sigla: string;
}) {
  if (!data.nome.trim()) {
    throw new Error("Nome da UF é obrigatório");
  }

  if (!data.sigla.trim()) {
    throw new Error("Sigla da UF é obrigatória");
  }

  const sigla = data.sigla.trim().toUpperCase();

  const existente = await buscarUfPorSigla(sigla);

  if (existente) {
    throw new Error("Já existe uma UF com essa sigla");
  }

  await criarUf({
    id: uuidv4(),
    nome: data.nome.trim(),
    sigla,
  });
}

export async function adminListarUfs() {
  return await listarUfs();
}

export async function adminEditarUf(
  id: string,
  data: {
    nome: string;
    sigla: string;
  }
) {
  const uf = await buscarUfPorId(id);

  if (!uf) {
    throw new Error("UF não encontrada");
  }

  await atualizarUf(id, {
    nome: data.nome.trim(),
    sigla: data.sigla.trim().toUpperCase(),
  });
}

export async function adminRemoverUf(id: string) {
  const uf = await buscarUfPorId(id);

  if (!uf) {
    throw new Error("UF não encontrada");
  }

  await excluirUf(id);
}