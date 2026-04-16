import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { buscarNoticiaPorId } from "../repositories/noticia.repository";
import { editarNoticia } from "../services/noticia.service";
import { obterSessao } from "../services/session.service";

export default function EditNewsScreen({ route, navigation }: any) {
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
      const usuario = await obterSessao();

      if (!usuario) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      await editarNoticia(noticiaId, usuario.id, {
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
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>Carregando notícia...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Editar notícia</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="URL da imagem"
        value={imagem}
        onChangeText={setImagem}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Resumo"
        value={resumo}
        onChangeText={setResumo}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Texto completo"
        value={texto}
        onChangeText={setTexto}
        multiline
        numberOfLines={8}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
          minHeight: 160,
          textAlignVertical: "top",
        }}
      />

      <TouchableOpacity
        onPress={handleSalvar}
        style={{ backgroundColor: "green", padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}