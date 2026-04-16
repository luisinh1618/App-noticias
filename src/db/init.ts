import { expoDb } from "./index";

export async function initDatabase() {
  await expoDb.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS perfil (
      id TEXT PRIMARY KEY NOT NULL,
      descricao TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      perfil_id TEXT NOT NULL,
      FOREIGN KEY (perfil_id) REFERENCES perfil(id)
    );

    CREATE TABLE IF NOT EXISTS uf (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      sigla TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS cidade (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      uf_id TEXT NOT NULL,
      FOREIGN KEY (uf_id) REFERENCES uf(id)
    );

    CREATE TABLE IF NOT EXISTS noticia (
      id TEXT PRIMARY KEY NOT NULL,
      titulo TEXT NOT NULL,
      imagem TEXT,
      resumo TEXT NOT NULL,
      texto TEXT NOT NULL,
      autor_id TEXT NOT NULL,
      status TEXT NOT NULL,
      data_criacao TEXT NOT NULL,
      data_publicacao TEXT,
      FOREIGN KEY (autor_id) REFERENCES user(id)
    );

    CREATE TABLE IF NOT EXISTS tag (
      id TEXT PRIMARY KEY NOT NULL,
      descricao TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS noticia_tag (
      noticia_id TEXT NOT NULL,
      tag_id TEXT NOT NULL,
      PRIMARY KEY (noticia_id, tag_id),
      FOREIGN KEY (noticia_id) REFERENCES noticia(id),
      FOREIGN KEY (tag_id) REFERENCES tag(id)
    );

    CREATE TABLE IF NOT EXISTS comentario (
      id TEXT PRIMARY KEY NOT NULL,
      texto TEXT NOT NULL,
      data_criacao TEXT NOT NULL,
      user_id TEXT NOT NULL,
      noticia_id TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES user(id),
      FOREIGN KEY (noticia_id) REFERENCES noticia(id)
    );
  `);
}