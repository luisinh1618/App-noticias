import { Text } from "react-native";
import { removerSessao } from "../services/session.service";
import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";

export default function SuperAdminHomeScreen({ navigation }: any) {
  async function handleLogout() {
    await removerSessao();
    navigation.replace("Login");
  }

  return (
    <ScreenContainer scroll={false}>
      <AppTitle>Home do SUPERADMIN</AppTitle>

      <AppButton
        title="Gerenciar usuários"
        onPress={() => navigation.navigate("ManageUsers")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Gerenciar comentários"
        variant="secondary"
        onPress={() => navigation.navigate("ManageComments")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Gerenciar tags"
        variant="warning"
        onPress={() => navigation.navigate("Tags")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Gerenciar UF"
        variant="success"
        onPress={() => navigation.navigate("ManageUf")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Gerenciar cidades"
        variant="secondary"
        onPress={() => navigation.navigate("ManageCities")}
        style={{ marginBottom: 12 }}
      />

      <AppButton title="Sair" variant="danger" onPress={handleLogout} />
    </ScreenContainer>
  );
}