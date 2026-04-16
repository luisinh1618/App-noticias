import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { adminCriarUsuario } from "../services/user.service";
import { listarPerfis } from "../repositories/perfil.repository";

type Perfil = {
  id: string;
  descricao: string;
};

export default function CreateUserScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState("");

  useEffect(() => {
    async function carregarPerfis() {
      const dados = await listarPerfis();
      setPerfis(dados as Perfil[]);

      if (dados.length > 0) {
        setPerfilSelecionado((dados[0] as Perfil).descricao);
      }
    }

    carregarPerfis();
  }, []);

  async function handleSalvar() {
    try {
      await adminCriarUsuario({
        nome,
        username,
        password,
        perfilDescricao: perfilSelecionado,
      });

      Alert.alert("Sucesso", "Usuário criado com sucesso");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Novo usuário</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 20 }}
      />

      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Escolha o perfil:</Text>

      {perfis.map((perfil) => (
        <TouchableOpacity
          key={perfil.id}
          onPress={() => setPerfilSelecionado(perfil.descricao)}
          style={{
            backgroundColor: perfilSelecionado === perfil.descricao ? "black" : "#ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: perfilSelecionado === perfil.descricao ? "#fff" : "#000",
              textAlign: "center",
            }}
          >
            {perfil.descricao}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={handleSalvar}
        style={{ backgroundColor: "green", padding: 14, borderRadius: 8, marginTop: 20 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Criar usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}