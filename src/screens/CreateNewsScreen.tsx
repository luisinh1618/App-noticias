import { useState } from "react";
import { Alert } from "react-native";
import { criarNovaNoticia } from "../services/noticia.service";
import { obterSessao } from "../services/session.service";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default function CreateNewsScreen({ navigation }: any) {
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  const [texto, setTexto] = useState("");

  async function handleSalvar() {
    try {
      const usuario = await obterSessao();

      if (!usuario) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      await criarNovaNoticia({
        titulo,
        imagem,
        resumo,
        texto,
        autorId: usuario.id,
      });

      Alert.alert("Sucesso", "Notícia criada como rascunho");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScreenContainer>
      <AppTitle>Nova notícia</AppTitle>

      <AppInput
        label="Título"
        placeholder="Digite o título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <AppInput
        label="URL da imagem"
        placeholder="Digite a URL da imagem"
        value={imagem}
        onChangeText={setImagem}
      />

      <AppInput
        label="Resumo"
        placeholder="Digite o resumo"
        value={resumo}
        onChangeText={setResumo}
      />

      <AppInput
        label="Texto completo"
        placeholder="Digite o conteúdo da notícia"
        value={texto}
        onChangeText={setTexto}
        multiline
      />

      <AppButton
        title="Salvar notícia"
        variant="success"
        onPress={handleSalvar}
      />
    </ScreenContainer>
  );
}