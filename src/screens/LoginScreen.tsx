import { useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { loginUser } from "../services/auth.service";
import { buscarPerfilPorId } from "../repositories/perfil.repository";
import { salvarSessao } from "../services/session.service";
import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { colors } from "../theme/colors";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      await salvarSessao(user);

      const perfil = await buscarPerfilPorId(user.perfilId);

      if (!perfil) {
        Alert.alert("Erro", "Perfil do usuário não encontrado");
        return;
      }

      if (perfil.descricao === "LEITOR") {
        navigation.replace("ReaderHome");
        return;
      }

      if (perfil.descricao === "AUTOR") {
        navigation.replace("AuthorHome");
        return;
      }

      if (perfil.descricao === "EDITOR") {
        navigation.replace("EditorHome");
        return;
      }

      if (perfil.descricao === "SUPERADMIN") {
        navigation.replace("SuperAdminHome");
        return;
      }

      Alert.alert("Erro", "Perfil inválido");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <ScreenContainer scroll={false}>
      <AppTitle>Login</AppTitle>

      <AppInput
        label="Username"
        placeholder="Digite seu username"
        value={username}
        onChangeText={setUsername}
      />

      <AppInput
        label="Senha"
        placeholder="Digite sua senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 16 }}>
        <Text style={{ textAlign: "center", color: colors.primary }}>
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("PublicHome")} style={{ marginTop: 12 }}>
        <Text style={{ textAlign: "center", color: colors.primary }}>
          Continuar sem login
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}