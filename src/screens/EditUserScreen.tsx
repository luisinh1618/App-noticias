import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { buscarUsuarioPorId } from "../repositories/user.repository";
import { listarPerfis } from "../repositories/perfil.repository";
import { adminEditarUsuario } from "../services/user.service";

type Perfil = {
  id: string;
  descricao: string;
};

export default function EditUserScreen({ route, navigation }: any) {
  const { userId } = route.params;

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [perfilSelecionadoId, setPerfilSelecionadoId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const usuario = await buscarUsuarioPorId(userId);
        const listaPerfis = await listarPerfis();

        if (!usuario) {
          Alert.alert("Erro", "Usuário não encontrado");
          navigation.goBack();
          return;
        }

        setNome(usuario.nome);
        setUsername(usuario.username);
        setPassword(usuario.password);
        setPerfilSelecionadoId(usuario.perfilId);
        setPerfis(listaPerfis as Perfil[]);
      } catch (error: any) {
        Alert.alert("Erro", error.message);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [userId, navigation]);

  async function handleSalvar() {
    try {
      await adminEditarUsuario(userId, {
        nome,
        username,
        password,
        perfilId: perfilSelecionadoId,
      });

      Alert.alert("Sucesso", "Usuário atualizado com sucesso");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  if (loading) {
    return (
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text>Carregando usuário...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Editar usuário</Text>

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
          onPress={() => setPerfilSelecionadoId(perfil.id)}
          style={{
            backgroundColor: perfilSelecionadoId === perfil.id ? "black" : "#ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              color: perfilSelecionadoId === perfil.id ? "#fff" : "#000",
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
        <Text style={{ color: "#fff", textAlign: "center" }}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}