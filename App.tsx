import "react-native-get-random-values";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { setupDatabase } from "./src/db/setup";
import { obterSessao } from "./src/services/session.service";
import { buscarPerfilPorId } from "./src/repositories/perfil.repository";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ReaderHomeScreen from "./src/screens/ReaderHomeScreen";
import AuthorHomeScreen from "./src/screens/AuthorHomeScreen";
import EditorHomeScreen from "./src/screens/EditorHomeScreen";
import SuperAdminHomeScreen from "./src/screens/SuperAdminHomeScreen";
import MyNewsScreen from "./src/screens/MyNewsScreen";
import CreateNewsScreen from "./src/screens/CreateNewsScreen";
import EditNewsScreen from "./src/screens/EditNewsScreen";
import PublicHomeScreen from "./src/screens/PublicHomeScreen";
import NewsDetailScreen from "./src/screens/NewsDetailScreen";
import TagsScreen from "./src/screens/TagsScreen";
import AssignTagScreen from "./src/screens/AssignTagScreen";
import SearchByTagScreen from "./src/screens/SearchByTagScreen";
import EditorialPanelScreen from "./src/screens/EditorialPanelScreen";
import EditorEditNewsScreen from "./src/screens/EditorEditNewsScreen";
import ManageUsersScreen from "./src/screens/ManageUsersScreen";
import CreateUserScreen from "./src/screens/CreateUserScreen";
import EditUserScreen from "./src/screens/EditUserScreen";
import ManageCommentsScreen from "./src/screens/ManageCommentsScreen";
import ManageUfScreen from "./src/screens/ManageUfScreen";
import ManageCitiesScreen from "./src/screens/ManageCitiesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Login");

  useEffect(() => {
    async function init() {
      try {
        await setupDatabase();

        const session = await obterSessao();

        if (!session) {
          setInitialRoute("Login");
          return;
        }

        const perfil = await buscarPerfilPorId(session.perfilId);

        if (!perfil) {
          setInitialRoute("Login");
          return;
        }

        if (perfil.descricao === "LEITOR") {
          setInitialRoute("ReaderHome");
          return;
        }

        if (perfil.descricao === "AUTOR") {
          setInitialRoute("AuthorHome");
          return;
        }

        if (perfil.descricao === "EDITOR") {
          setInitialRoute("EditorHome");
          return;
        }

        if (perfil.descricao === "SUPERADMIN") {
          setInitialRoute("SuperAdminHome");
          return;
        }

        setInitialRoute("Login");
      } catch (error) {
        console.error("Erro ao iniciar app:", error);
        setInitialRoute("Login");
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563eb",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      >
     <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Entrar" }} />
<Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Cadastro" }} />

{/* Telas de Home Atualizadas */}
<Stack.Screen name="ReaderHome" component={ReaderHomeScreen} options={{ title: "Leitor" }} />
<Stack.Screen name="AuthorHome" component={AuthorHomeScreen} options={{ title: "Autor" }} />
<Stack.Screen name="EditorHome" component={EditorHomeScreen} options={{ title: "Editor" }} />
<Stack.Screen name="SuperAdminHome" component={SuperAdminHomeScreen} options={{ title: "Superadmin" }} />

{/* Demais Telas */}
<Stack.Screen name="MyNews" component={MyNewsScreen} options={{ title: "Minhas Notícias" }} />
<Stack.Screen name="CreateNews" component={CreateNewsScreen} options={{ title: "Criar Notícia" }} />
<Stack.Screen name="EditNews" component={EditNewsScreen} options={{ title: "Editar Notícia" }} />
<Stack.Screen name="PublicHome" component={PublicHomeScreen} options={{ title: "Portal de Notícias" }} />
<Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: "Detalhes" }} />
<Stack.Screen name="Tags" component={TagsScreen} options={{ title: "Tags" }} />
<Stack.Screen name="AssignTag" component={AssignTagScreen} options={{ title: "Vincular Tag" }} />
<Stack.Screen name="SearchByTag" component={SearchByTagScreen} options={{ title: "Pesquisar por Tag" }} />
<Stack.Screen name="EditorialPanel" component={EditorialPanelScreen} options={{ title: "Painel Editorial" }} />
<Stack.Screen name="EditorEditNews" component={EditorEditNewsScreen} options={{ title: "Revisão de Notícia" }} />
<Stack.Screen name="ManageUsers" component={ManageUsersScreen} options={{ title: "Gerenciar Usuários" }} />
<Stack.Screen name="CreateUser" component={CreateUserScreen} options={{ title: "Novo Usuário" }} />
<Stack.Screen name="EditUser" component={EditUserScreen} options={{ title: "Editar Usuário" }} />
<Stack.Screen name="ManageComments" component={ManageCommentsScreen} options={{ title: "Comentários" }} />
<Stack.Screen name="ManageUf" component={ManageUfScreen} options={{ title: "Gerenciar UF" }} />
<Stack.Screen name="ManageCities" component={ManageCitiesScreen} options={{ title: "Gerenciar Cidades" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}