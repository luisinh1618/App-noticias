import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Text } from "react-native";
import {
  criarNovaTag,
  editarTag,
  obterTags,
  removerTag,
} from "../services/tag.service";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

type Tag = {
  id: string;
  descricao: string;
};

export default function TagsScreen() {
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const carregarTags = useCallback(async () => {
    try {
      const dados = await obterTags();
      setTags(dados as Tag[]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTags();
    }, [carregarTags])
  );

  async function handleSalvar() {
    try {
      if (editandoId) {
        await editarTag(editandoId, descricao);
        Alert.alert("Sucesso", "Tag atualizada com sucesso");
      } else {
        await criarNovaTag(descricao);
        Alert.alert("Sucesso", "Tag criada com sucesso");
      }

      setDescricao("");
      setEditandoId(null);
      await carregarTags();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleExcluir(id: string) {
    try {
      await removerTag(id);
      await carregarTags();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  function handleEditar(tag: Tag) {
    setDescricao(tag.descricao);
    setEditandoId(tag.id);
  }

  return (
    <ScreenContainer>
      <AppTitle>Gerenciar tags</AppTitle>

      <AppInput
        label="Descrição da tag"
        placeholder="Digite a descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <AppButton
        title={editandoId ? "Atualizar tag" : "Criar tag"}
        variant="success"
        onPress={handleSalvar}
        style={{ marginBottom: 20 }}
      />

      {tags.length === 0 ? (
        <Text>Nenhuma tag cadastrada.</Text>
      ) : (
        tags.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.descricao}</Text>

            <AppButton
              title="Editar"
              variant="secondary"
              onPress={() => handleEditar(item)}
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