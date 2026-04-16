import { v4 as uuidv4 } from "uuid";
import {
  atualizarUsuario,
  buscarUsuarioPorId,
  buscarUsuarioPorUsername,
  criarUsuario,
  excluirUsuario,
  listarUsuarios,
} from "../repositories/user.repository";
import { buscarPerfilPorDescricao, buscarPerfilPorId } from "../repositories/perfil.repository";

export async function adminCriarUsuario(data: {
  nome: string;
  username: string;
  password: string;
  perfilDescricao: string;
}) {
  if (!data.nome.trim()) {
    throw new Error("Nome é obrigatório");
  }

  if (!data.username.trim()) {
    throw new Error("Username é obrigatório");
  }

  if (!data.password.trim()) {
    throw new Error("Senha é obrigatória");
  }

  const existente = await buscarUsuarioPorUsername(data.username.trim());

  if (existente) {
    throw new Error("Username já cadastrado");
  }

  const perfil = await buscarPerfilPorDescricao(data.perfilDescricao);

  if (!perfil) {
    throw new Error("Perfil não encontrado");
  }

  await criarUsuario({
    id: uuidv4(),
    nome: data.nome.trim(),
    username: data.username.trim(),
    password: data.password.trim(),
    perfilId: perfil.id,
  });
}

export async function adminListarUsuarios() {
  return await listarUsuarios();
}

export async function adminEditarUsuario(
  id: string,
  data: {
    nome: string;
    username: string;
    password: string;
    perfilId: string;
  }
) {
  const usuario = await buscarUsuarioPorId(id);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const perfil = await buscarPerfilPorId(data.perfilId);

  if (!perfil) {
    throw new Error("Perfil inválido");
  }

  await atualizarUsuario(id, data);
}

export async function adminRemoverUsuario(id: string) {
  const usuario = await buscarUsuarioPorId(id);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  await excluirUsuario(id);
}