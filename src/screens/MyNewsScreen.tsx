import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import { obterSessao } from "../services/session.service";
import {
  despublicarNoticia,
  obterNoticiasDoAutor,
  publicarNoticia,
  removerNoticia,
} from "../services/noticia.service";
import { obterTagsDaNoticia } from "../services/tag.service";

import ScreenContainer from "../components/ScreenContainer";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import AppTitle from "../components/AppTitle";

type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  status: string;
  dataCriacao: string;
  dataPublicacao: string | null;
};

type Tag = {
  id: string;
  descricao: string;
};

type NoticiaComTags = Noticia & {
  tags: Tag[];
};

export default function MyNewsScreen({ navigation }: any) {
  const [noticias, setNoticias] = useState<NoticiaComTags[]>([]);

  const carregarNoticias = useCallback(async () => {
    try {
      const usuario = await obterSessao();

      if (!usuario) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      const dados = await obterNoticiasDoAutor(usuario.id);

      const noticiasComTags = await Promise.all(
        (dados as Noticia[]).map(async (item) => {
          const tags = await obterTagsDaNoticia(item.id);
          return {
            ...item,
            tags: tags as Tag[],
          };
        })
      );

      setNoticias(noticiasComTags);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarNoticias();
    }, [carregarNoticias])
  );

  async function handlePublicar(id: string) {
    try {
      await publicarNoticia(id);
      await carregarNoticias();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleDespublicar(id: string) {
    try {
      await despublicarNoticia(id);
      await carregarNoticias();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleExcluir(id: string) {
    try {
      await removerNoticia(id);
      await carregarNoticias();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScreenContainer>
      <AppTitle>Minhas notícias</AppTitle>

      <AppButton
        title="Nova notícia"
        onPress={() => navigation.navigate("CreateNews")}
        style={{ marginBottom: 20 }}
      />

      {noticias.length === 0 ? (
        <Text>Nenhuma notícia encontrada.</Text>
      ) : (
        noticias.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.titulo}</Text>
            <Text style={{ marginTop: 6 }}>{item.resumo}</Text>
            <Text style={{ marginTop: 6, fontWeight: "bold" }}>
              Status: {item.status}
            </Text>

            <View style={{ marginTop: 8 }}>
              <Text style={{ fontWeight: "bold" }}>Tags:</Text>
              {item.tags.length === 0 ? (
                <Text>Nenhuma tag vinculada</Text>
              ) : (
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
                  {item.tags.map((tag) => (
                    <View
                      key={tag.id}
                      style={{
                        backgroundColor: "#ddd",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 20,
                        marginRight: 8,
                        marginBottom: 8,
                      }}
                    >
                      <Text>{tag.descricao}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {item.status === "RASCUNHO" && (
              <AppButton
                title="Editar"
                variant="secondary"
                onPress={() => navigation.navigate("EditNews", { noticiaId: item.id })}
                style={{ marginTop: 10 }}
              />
            )}

            <AppButton
              title="Vincular tag"
              variant="secondary"
              onPress={() => navigation.navigate("AssignTag", { noticiaId: item.id })}
              style={{ marginTop: 10 }}
            />

            <AppButton
              title={item.status === "RASCUNHO" ? "Publicar" : "Despublicar"}
              variant={item.status === "RASCUNHO" ? "success" : "warning"}
              onPress={() =>
                item.status === "RASCUNHO"
                  ? handlePublicar(item.id)
                  : handleDespublicar(item.id)
              }
              style={{ marginTop: 10 }}
            />

            <AppButton
              title="Excluir"
              variant="danger"
              onPress={() => handleExcluir(item.id)}
              style={{ marginTop: 10 }}
            />
          </AppCard>
        ))
      )}
    </ScreenContainer>
  );
}