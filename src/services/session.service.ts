import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "@app_noticias_user";

export type SessionUser = {
  id: string;
  nome: string;
  username: string;
  password: string;
  perfilId: string;
};

export async function salvarSessao(user: SessionUser) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function obterSessao() {
  const data = await AsyncStorage.getItem(SESSION_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as SessionUser;
}

export async function removerSessao() {
  await AsyncStorage.removeItem(SESSION_KEY);
}