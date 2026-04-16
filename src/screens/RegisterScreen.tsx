import { useState } from "react";
import { Alert } from "react-native";
import { registerUser } from "../services/auth.service";
import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";

export default function RegisterScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ nome, username, password });
      Alert.alert("Sucesso", "Usuário criado com sucesso");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <ScreenContainer>
      <AppTitle>Cadastro</AppTitle>

      <AppInput
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <AppInput
        label="Username"
        placeholder="Escolha um username"
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

      <AppButton title="Cadastrar" onPress={handleRegister} />
    </ScreenContainer>
  );
}