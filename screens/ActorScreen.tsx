import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { fetchActorsByMovieId } from "../api/actors";
import { ScreenProps } from "../App";

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

  console.log(actors);

  return <View></View>;
}

const styles = StyleSheet.create({});
