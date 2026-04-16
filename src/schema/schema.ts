import { sqliteTable, text } from "drizzle-orm/sqlite-core";

// PERFIL
export const perfil = sqliteTable("perfil", {
  id: text("id").primaryKey(),
  descricao: text("descricao").notNull(),
});

// USER
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  perfilId: text("perfil_id")
    .notNull()
    .references(() => perfil.id),
});

// UF
export const uf = sqliteTable("uf", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  sigla: text("sigla").notNull(),
});

// CIDADE
export const cidade = sqliteTable("cidade", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  ufId: text("uf_id")
    .notNull()
    .references(() => uf.id),
});

// NOTICIA
export const noticia = sqliteTable("noticia", {
  id: text("id").primaryKey(),
  titulo: text("titulo").notNull(),
  imagem: text("imagem"),
  resumo: text("resumo").notNull(),
  texto: text("texto").notNull(),
  autorId: text("autor_id")
    .notNull()
    .references(() => user.id),
  status: text("status").notNull(),
  dataCriacao: text("data_criacao").notNull(),
  dataPublicacao: text("data_publicacao"),
});

// TAG
export const tag = sqliteTable("tag", {
  id: text("id").primaryKey(),
  descricao: text("descricao").notNull(),
});

// NOTICIA_TAG
export const noticiaTag = sqliteTable("noticia_tag", {
  noticiaId: text("noticia_id")
    .notNull()
    .references(() => noticia.id),
  tagId: text("tag_id")
    .notNull()
    .references(() => tag.id),
});

// COMENTARIO
export const comentario = sqliteTable("comentario", {
  id: text("id").primaryKey(),
  texto: text("texto").notNull(),
  dataCriacao: text("data_criacao").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  noticiaId: text("noticia_id")
    .notNull()
    .references(() => noticia.id),
});