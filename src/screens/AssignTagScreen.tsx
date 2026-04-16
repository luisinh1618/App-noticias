import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { obterTags, adicionarTagNaNoticia } from "../services/tag.service";

type Tag = {
  id: string;
  descricao: string;
};

export default function AssignTagScreen({ route, navigation }: any) {
  const { noticiaId } = route.params;
  const [tags, setTags] = useState<Tag[]>([]);

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

  async function handleSelecionar(tagId: string) {
    try {
      await adicionarTagNaNoticia({ noticiaId, tagId });
      Alert.alert("Sucesso", "Tag vinculada à notícia");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Vincular tag</Text>

      {tags.length === 0 ? (
        <Text>Nenhuma tag cadastrada.</Text>
      ) : (
        tags.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSelecionar(item.id)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 14,
              marginBottom: 10,
            }}
          >
            <Text>{item.descricao}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}