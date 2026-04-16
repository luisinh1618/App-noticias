import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { adminExcluirComentario, adminListarComentarios } from "../services/admin-comment.service";

type Comentario = {
  id: string;
  texto: string;
  dataCriacao: string;
  userId: string;
  noticiaId: string;
  nomeUsuario: string;
  username: string;
};

export default function ManageCommentsScreen() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const carregarComentarios = useCallback(async () => {
    try {
      const dados = await adminListarComentarios();
      setComentarios(dados as Comentario[]);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarComentarios();
    }, [carregarComentarios])
  );

  async function handleExcluir(id: string) {
    try {
      await adminExcluirComentario(id);
      await carregarComentarios();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Gerenciar comentários</Text>

      {comentarios.length === 0 ? (
        <Text>Nenhum comentário encontrado.</Text>
      ) : (
        comentarios.map((item) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {item.nomeUsuario} (@{item.username})
            </Text>
            <Text style={{ marginTop: 6 }}>{item.texto}</Text>
            <Text style={{ marginTop: 6, fontSize: 12 }}>{item.dataCriacao}</Text>

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
          </View>
        ))
      )}
    </ScrollView>
  );
}