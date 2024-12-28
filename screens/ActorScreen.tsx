import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { fetchActorsByMovieId } from "../api/actors";
import { ScreenProps } from "../App";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect } from "react";
import { IActor } from "../models/actor";
import ActorCard from "../components/ActorCard";

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

  useEffect(() => {}, [actors]);

  const renderItem = ({ item }: { item: IActor }) => {
    if (item.id === -1) {
      // Render nothing for empty placeholders
      return <View style={[styles.item, styles.placeholder]} key={item.id} />;
    }
    return (
      <ActorCard
        id={item.id || 0}
        name={item.name || "Unknown"}
        profile_path={item.profile_path || "noImageActor"}
        key={item.id}
      />
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  console.log(actors);

  return <View></View>;
}

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  item: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: "transparent",
  },
});
