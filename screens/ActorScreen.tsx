import { StyleSheet, ActivityIndicator, FlatList, View } from "react-native";
import ErrorMessage from "../components/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchActorsByMovieId } from "../api/actors";
import ActorCard from "../components/ActorCard";
import { IActor } from "../models/actor";
import { transformDataIntoRows } from "../utilities/transformData";
import { ScreenProps } from "../App";
import EmptyContentMessage from "../components/EmptyContentMessage";

export default function ActorsScreen({
  navigation,
  route,
}: ScreenProps<"Actors">) {
  const [numColumns] = useState<number>(3);
  const [rows, setRows] = useState([] as IActor[][]);
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

  useEffect(() => {
    if (actors?.length > 1) {
      setRows(transformDataIntoRows(actors, numColumns));
    }
  }, [actors]);

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

  const renderRow = ({ item }: { item: IActor[] }) => (
    <View style={styles.row}>
      {item.map((columnItem) => renderItem({ item: columnItem }))}
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  console.log(actors);

  return (
    <>
      {actors?.length > 0 ? (
        <FlatList
          data={rows.slice(0, 30)}
          renderItem={renderRow}
          keyExtractor={(_, index) => `row-${index}`}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <EmptyContentMessage text="There are no actors for this movie" />
      )}
    </>
  );
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
