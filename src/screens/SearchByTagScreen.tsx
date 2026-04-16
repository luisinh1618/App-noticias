import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { obterTags, obterNoticiasPorTag } from "../services/tag.service";
import { colors } from "../theme/colors";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

type Tag = {
  id: string;
  descricao: string;
};

type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
};

export default function SearchByTagScreen({ navigation }: any) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [tagSelecionada, setTagSelecionada] = useState<string>("");

  useEffect(() => {
    async function carregarTags() {
      try {
        const dados = await obterTags();
        setTags(dados as Tag[]);
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      }
    }

    carregarTags();
  }, []);

  async function handleBuscar(tagId: string) {
    try {
      setTagSelecionada(tagId);
      const dados = await obterNoticiasPorTag(tagId);
      setNoticias(dados as Noticia[]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScreenContainer>
      <AppTitle>Buscar por tag</AppTitle>

      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Selecione uma tag:</Text>

      {tags.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleBuscar(item.id)}
          style={{
            backgroundColor: tagSelecionada === item.id ? colors.primary : "#ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: tagSelecionada === item.id ? "#fff" : "#030303",
              textAlign: "center",
            }}
          >
            {item.descricao}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Notícias encontradas:</Text>

        {noticias.length === 0 ? (
          <Text style={{color: colors.primary}}>Nenhuma notícia encontrada para essa tag.</Text>
        ) : (
          noticias.map((item) => (
            <AppCard key={item.id}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.titulo}</Text>
              <Text style={{ marginTop: 6 }}>{item.resumo}</Text>

              <AppButton
                title="Ler notícia"
                variant="secondary"
                onPress={() => navigation.navigate("NewsDetail", { noticiaId: item.id })}
                style={{ marginTop: 10 }}
              />
            </AppCard>
          ))
        )}
      </View>
    </ScreenContainer>
  );
}