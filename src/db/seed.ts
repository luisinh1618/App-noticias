import { expoDb } from "./index";

export async function seedDatabase() {
  const perfis = [
    { id: "perfil-leitor", descricao: "LEITOR" },
    { id: "perfil-autor", descricao: "AUTOR" },
    { id: "perfil-editor", descricao: "EDITOR" },
    { id: "perfil-superadmin", descricao: "SUPERADMIN" },
  ];


  for (const perfil of perfis) {
    await expoDb.runAsync(
      `INSERT OR IGNORE INTO perfil (id, descricao) VALUES (?, ?)`,
      [perfil.id, perfil.descricao]
    );
  }
  
}