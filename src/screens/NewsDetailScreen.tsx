import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { buscarNoticiaPorId } from "../repositories/noticia.repository";
import {
  adicionarComentario,
  obterComentariosDaNoticia,
} from "../services/comentario.service";
import { obterSessao } from "../services/session.service";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

type Noticia = {
  id: string;
  titulo: string;
  imagem: string | null;
  resumo: string;
  texto: string;
  status: string;
  dataCriacao: string;
  dataPublicacao: string | null;
};

type Comentario = {
  id: string;
  texto: string;
  dataCriacao: string;
  userId: string;
  noticiaId: string;
  nomeUsuario: string;
  username: string;
};

export default function NewsDetailScreen({ route, navigation }: any) {
  const { noticiaId } = route.params;

  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [textoComentario, setTextoComentario] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  async function carregarTudo() {
    try {
      const dadosNoticia = await buscarNoticiaPorId(noticiaId);

      if (!dadosNoticia) {
        Alert.alert("Erro", "Notícia não encontrada");
        return;
      }

      const dadosComentarios = await obterComentariosDaNoticia(noticiaId);
      const sessao = await obterSessao();

      setNoticia(dadosNoticia as Noticia);
      setComentarios(dadosComentarios as Comentario[]);
      setUsuarioLogado(sessao);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  useEffect(() => {
    carregarTudo();
  }, [noticiaId]);

  async function handleComentar() {
    try {
      if (!usuarioLogado) {
        Alert.alert("Login necessário", "Você precisa estar logado para comentar");
        return;
      }

      await adicionarComentario({
        texto: textoComentario,
        userId: usuarioLogado.id,
        noticiaId,
      });

      setTextoComentario("");
      await carregarTudo();
      Alert.alert("Sucesso", "Comentário adicionado");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  if (!noticia) {
    return (
      <ScreenContainer>
        <Text>Carregando notícia...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AppTitle>{noticia.titulo}</AppTitle>

      <Text style={{ fontSize: 16, marginBottom: 12 }}>{noticia.resumo}</Text>

      <View style={{ marginBottom: 16 }}>
        <Text>{noticia.texto}</Text>
      </View>

      <Text style={{ marginBottom: 20 }}>
        Publicação: {noticia.dataPublicacao ? noticia.dataPublicacao : "Ainda não publicada"}
      </Text>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        Comentários
      </Text>

      {comentarios.length === 0 ? (
        <Text style={{ marginBottom: 20 }}>Nenhum comentário ainda.</Text>
      ) : (
        comentarios.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontWeight: "bold" }}>
              {item.nomeUsuario} (@{item.username})
            </Text>
            <Text style={{ marginTop: 6 }}>{item.texto}</Text>
            <Text style={{ marginTop: 6, fontSize: 12 }}>{item.dataCriacao}</Text>
          </AppCard>
        ))
      )}

      {usuarioLogado ? (
        <>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Escrever comentário
          </Text>

          <AppInput
            placeholder="Digite seu comentário"
            value={textoComentario}
            onChangeText={setTextoComentario}
            multiline
          />

          <AppButton
            title="Comentar"
            variant="success"
            onPress={handleComentar}
          />
        </>
      ) : (
        <AppButton
          title="Fazer login para comentar"
          onPress={() => navigation.navigate("Login")}
        />
      )}
    </ScreenContainer>
  );
}