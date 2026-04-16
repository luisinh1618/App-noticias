import { removerSessao } from "../services/session.service";
import ScreenContainer from "../components/ScreenContainer";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";

export default function ReaderHomeScreen({ navigation }: any) {
  async function handleLogout() {
    await removerSessao();
    navigation.replace("Login");
  }

  return (
    <ScreenContainer scroll={false}>
      <AppTitle>Home do LEITOR</AppTitle>

      <AppButton
        title="Ver notícias publicadas"
        onPress={() => navigation.navigate("PublicHome")}
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