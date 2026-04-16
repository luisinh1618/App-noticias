import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { buscarNoticiaPorId } from "../repositories/noticia.repository";
import { editorEditarNoticia } from "../services/noticia.service";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default function EditorEditNewsScreen({ route, navigation }: any) {
  const { noticiaId } = route.params;

  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarNoticia() {
      try {
        const noticia = await buscarNoticiaPorId(noticiaId);

        if (!noticia) {
          Alert.alert("Erro", "Notícia não encontrada");
          navigation.goBack();
          return;
        }

        setTitulo(noticia.titulo);
        setImagem(noticia.imagem ?? "");
        setResumo(noticia.resumo);
        setTexto(noticia.texto);
      } catch (error: any) {
        Alert.alert("Erro", error.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }

    carregarNoticia();
  }, [noticiaId, navigation]);

  async function handleSalvar() {
    try {
      await editorEditarNoticia(noticiaId, {
        titulo,
        imagem,
        resumo,
        texto,
      });

      Alert.alert("Sucesso", "Notícia atualizada com sucesso");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  if (loading) {
    return (
      <ScreenContainer>
        <Text>Carregando notícia...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppTitle>Editar notícia</AppTitle>

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
        title="Salvar alterações"
        variant="success"
        onPress={handleSalvar}
      />
    </ScreenContainer>
  );
}