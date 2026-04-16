import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, Text } from "react-native";
import {
  adminCriarUf,
  adminEditarUf,
  adminListarUfs,
  adminRemoverUf,
} from "../services/uf.service";

import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";

type Uf = {
  id: string;
  nome: string;
  sigla: string;
};

export default function ManageUfScreen() {
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const carregarUfs = useCallback(async () => {
    try {
      const dados = await adminListarUfs();
      setUfs(dados as Uf[]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarUfs();
    }, [carregarUfs])
  );

  async function handleSalvar() {
    try {
      if (editandoId) {
        await adminEditarUf(editandoId, { nome, sigla });
        Alert.alert("Sucesso", "UF atualizada com sucesso");
      } else {
        await adminCriarUf({ nome, sigla });
        Alert.alert("Sucesso", "UF criada com sucesso");
      }

      setNome("");
      setSigla("");
      setEditandoId(null);
      await carregarUfs();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleExcluir(id: string) {
    try {
      await adminRemoverUf(id);
      await carregarUfs();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  function handleEditar(item: Uf) {
    setNome(item.nome);
    setSigla(item.sigla);
    setEditandoId(item.id);
  }

  return (
    <ScreenContainer>
      <AppTitle>Gerenciar UF</AppTitle>

      <AppInput
        label="Nome da UF"
        placeholder="Digite o nome da UF"
        value={nome}
        onChangeText={setNome}
      />

      <AppInput
        label="Sigla"
        placeholder="Digite a sigla"
        value={sigla}
        onChangeText={setSigla}
      />

      <AppButton
        title={editandoId ? "Atualizar UF" : "Criar UF"}
        variant="success"
        onPress={handleSalvar}
        style={{ marginBottom: 20 }}
      />

      {ufs.length === 0 ? (
        <Text>Nenhuma UF cadastrada.</Text>
      ) : (
        ufs.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nome}</Text>
            <Text style={{ marginTop: 6 }}>Sigla: {item.sigla}</Text>

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