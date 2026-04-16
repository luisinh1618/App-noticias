import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity } from "react-native";
import {
  adminCriarCidade,
  adminEditarCidade,
  adminListarCidades,
  adminRemoverCidade,
} from "../services/cidade.service";
import { adminListarUfs } from "../services/uf.service";
import { colors } from "../theme/colors";

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

type Cidade = {
  id: string;
  nome: string;
  ufId: string;
  ufNome: string;
  ufSigla: string;
};

export default function ManageCitiesScreen() {
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [nome, setNome] = useState("");
  const [ufSelecionadaId, setUfSelecionadaId] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const carregarCidades = useCallback(async () => {
    try {
      const dados = await adminListarCidades();
      setCidades(dados as Cidade[]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useEffect(() => {
    async function carregarUfs() {
      try {
        const dados = await adminListarUfs();
        setUfs(dados as Uf[]);

        if ((dados as Uf[]).length > 0 && !ufSelecionadaId) {
          setUfSelecionadaId((dados as Uf[])[0].id);
        }
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      }
    }

    carregarUfs();
  }, [ufSelecionadaId]);

  useFocusEffect(
    useCallback(() => {
      carregarCidades();
    }, [carregarCidades])
  );

  async function handleSalvar() {
    try {
      if (!ufSelecionadaId) {
        Alert.alert("Erro", "Selecione uma UF");
        return;
      }

      if (editandoId) {
        await adminEditarCidade(editandoId, {
          nome,
          ufId: ufSelecionadaId,
        });
        Alert.alert("Sucesso", "Cidade atualizada com sucesso");
      } else {
        await adminCriarCidade({
          nome,
          ufId: ufSelecionadaId,
        });
        Alert.alert("Sucesso", "Cidade criada com sucesso");
      }

      setNome("");
      setEditandoId(null);
      await carregarCidades();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  async function handleExcluir(id: string) {
    try {
      await adminRemoverCidade(id);
      await carregarCidades();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  function handleEditar(item: Cidade) {
    setNome(item.nome);
    setUfSelecionadaId(item.ufId);
    setEditandoId(item.id);
  }

  return (
    <ScreenContainer>
      <AppTitle>Gerenciar cidades</AppTitle>

      <AppInput
        label="Nome da cidade"
        placeholder="Digite o nome da cidade"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Selecione a UF:</Text>

      {ufs.map((uf) => (
        <TouchableOpacity
          key={uf.id}
          onPress={() => setUfSelecionadaId(uf.id)}
          style={{
            backgroundColor: ufSelecionadaId === uf.id ? colors.primary : "#ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: ufSelecionadaId === uf.id ? "#fff" : "#000",
              textAlign: "center",
            }}
          >
            {uf.nome} ({uf.sigla})
          </Text>
        </TouchableOpacity>
      ))}

      <AppButton
        title={editandoId ? "Atualizar cidade" : "Criar cidade"}
        variant="success"
        onPress={handleSalvar}
        style={{ marginTop: 20, marginBottom: 20 }}
      />

      {cidades.length === 0 ? (
        <Text>Nenhuma cidade cadastrada.</Text>
      ) : (
        cidades.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nome}</Text>
            <Text style={{ marginTop: 6 }}>
              UF: {item.ufNome} ({item.ufSigla})
            </Text>

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