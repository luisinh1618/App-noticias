import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { expoDb } from "./index";

export async function seedUsuariosTeste() {
  const criarUsuarioSeNaoExistir = async (
    perfilDescricao: string,
    nome: string,
    username: string,
    password: string
  ) => {
    const perfil = await expoDb.getFirstAsync<{ id: string }>(
      `SELECT id FROM perfil WHERE descricao = ?`,
      [perfilDescricao]
    );

    if (!perfil) {
      return;
    }

    const usuarioExistente = await expoDb.getFirstAsync<{ id: string }>(
      `SELECT id FROM user WHERE username = ?`,
      [username]
    );

    if (usuarioExistente) {
      return;
    }

    await expoDb.runAsync(
      `INSERT INTO user (id, nome, username, password, perfil_id) VALUES (?, ?, ?, ?, ?)`,
      [uuidv4(), nome, username, password, perfil.id]
    );
  };

  await criarUsuarioSeNaoExistir("AUTOR", "Autor Teste", "autor", "123456");
  await criarUsuarioSeNaoExistir("EDITOR", "Editor Teste", "editor", "123456");
  await criarUsuarioSeNaoExistir("SUPERADMIN", "Admin Teste", "admin", "123456");
}