import { buscarUsuarioPorUsername, criarUsuario } from "../repositories/user.repository";

export async function registerUser(data: {
  nome: string;
  username: string;
  password: string;
}) {
  const existente = await buscarUsuarioPorUsername(data.username);

  if (existente) {
    throw new Error("Usuário já existe");
  }

  await criarUsuario({
    id: `user-${Date.now()}`,
    nome: data.nome,
    username: data.username,
    password: data.password,
    perfilId: "perfil-leitor", // padrão
  });
}

export async function loginUser(username: string, password: string) {
  const user = await buscarUsuarioPorUsername(username);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (user.password !== password) {
    throw new Error("Senha inválida");
  }

  return user;
}