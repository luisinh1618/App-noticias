import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { adminListarUsuarios, adminRemoverUsuario } from "../services/user.service";
import { buscarPerfilPorId } from "../repositories/perfil.repository";
import AppCard from "../components/AppCard";

type Usuario = {
  id: string;
  nome: string;
  username: string;
  password: string;
  perfilId: string;
};

type UsuarioComPerfil = Usuario & {
  perfilDescricao: string;
};

export default function ManageUsersScreen({ navigation }: any) {
  const [usuarios, setUsuarios] = useState<UsuarioComPerfil[]>([]);

  const carregarUsuarios = useCallback(async () => {
    try {
      const dados = await adminListarUsuarios();

      const usuariosComPerfil = await Promise.all(
        (dados as Usuario[]).map(async (item) => {
          const perfil = await buscarPerfilPorId(item.perfilId);
          return {
            ...item,
            perfilDescricao: perfil?.descricao ?? "Sem perfil",
          };
        })
      );

      setUsuarios(usuariosComPerfil);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarUsuarios();
    }, [carregarUsuarios])
  );

  async function handleExcluir(id: string) {
    try {
      await adminRemoverUsuario(id);
      await carregarUsuarios();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Gerenciar usuários</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("CreateUser")}
        style={{ backgroundColor: "green", padding: 14, borderRadius: 8, marginBottom: 20 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Novo usuário</Text>
      </TouchableOpacity>

      {usuarios.length === 0 ? (
        <Text>Nenhum usuário encontrado.</Text>
      ) : (
        usuarios.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nome}</Text>
            <Text>Username: {item.username}</Text>
            <Text>Perfil: {item.perfilDescricao}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditUser", { userId: item.id })}
              style={{
                backgroundColor: "royalblue",
                padding: 12,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleExcluir(item.id)}
              style={{
                backgroundColor: "crimson",
                padding: 12,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Excluir</Text>
            </TouchableOpacity>
          </AppCard>
        ))
      )}
    </ScrollView>
  );
}