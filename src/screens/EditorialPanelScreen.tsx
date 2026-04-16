import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  despublicarNoticia,
  obterTodasNoticias,
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

export default function EditorialPanelScreen({ navigation }: any) {
  const [noticias, setNoticias] = useState<NoticiaComTags[]>([]);

  const carregarNoticias = useCallback(async () => {
    try {
      const dados = await obterTodasNoticias();

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
      <AppTitle>Painel editorial</AppTitle>

      {noticias.length === 0 ? (
        <Text>Nenhuma notícia cadastrada.</Text>
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

            <AppButton
              title="Editar"
              variant="secondary"
              onPress={() => navigation.navigate("EditorEditNews", { noticiaId: item.id })}
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