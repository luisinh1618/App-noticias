import { removerSessao } from "../services/session.service";
import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";

export default function AuthorHomeScreen({ navigation }: any) {
  async function handleLogout() {
    await removerSessao();
    navigation.replace("Login");
  }

  return (
    <ScreenContainer scroll={false}>
      <AppTitle>Home do AUTOR</AppTitle>

      <AppButton
        title="Minhas notícias"
        onPress={() => navigation.navigate("MyNews")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Ver notícias publicadas"
        variant="secondary"
        onPress={() => navigation.navigate("PublicHome")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Gerenciar tags"
        variant="warning"
        onPress={() => navigation.navigate("Tags")}
        style={{ marginBottom: 12 }}
      />

      <AppButton
        title="Sair"
        variant="danger"
        onPress={handleLogout}
      />
    </ScreenContainer>
  );
}