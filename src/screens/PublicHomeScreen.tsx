import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text } from "react-native";
import { obterNoticiasPublicadas } from "../services/noticia.service";

import ScreenContainer from "../components/ScreenContainer";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import AppTitle from "../components/AppTitle";

type Noticia = {
  id: string;
  titulo: string;
  imagem: string | null;
  resumo: string;
  texto: string;
  status: string;
};

export default function PublicHomeScreen({ navigation }: any) {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  const carregarNoticias = useCallback(async () => {
    try {
      const dados = await obterNoticiasPublicadas();
      setNoticias(dados as Noticia[]);
    } catch (error) {
      console.error("Erro ao carregar notícias publicadas:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarNoticias();
    }, [carregarNoticias])
  );

  return (
    <ScreenContainer>
      <AppTitle>Notícias publicadas</AppTitle>

      <AppButton
        title="Buscar por tag"
        variant="secondary"
        onPress={() => navigation.navigate("SearchByTag")}
        style={{ marginBottom: 20 }}
      />

      {noticias.length === 0 ? (
        <Text>Nenhuma notícia publicada no momento.</Text>
      ) : (
        noticias.map((item) => (
          <AppCard key={item.id}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.titulo}
            </Text>

            <Text style={{ marginTop: 8 }}>{item.resumo}</Text>

            <AppButton
              title="Ler notícia"
              onPress={() =>
                navigation.navigate("NewsDetail", { noticiaId: item.id })
              }
              style={{ marginTop: 12 }}
            />
          </AppCard>
        ))
      )}
    </ScreenContainer>
  );
}