import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { fetchActorsByMovieId } from "../api/actors";
import { ScreenProps } from "../App";
import ErrorMessage from "../components/ErrorMessage";

export default function ActorsScreen({
  navigation,
  route,
}: ScreenProps<"Actors">) {
  const { id, title } = route.params;

  const {
    data: actors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["actors", id],
    queryFn: () => fetchActorsByMovieId(id || 1),
  });

  useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  console.log(actors);

  return <View></View>;
}

const styles = StyleSheet.create({});
