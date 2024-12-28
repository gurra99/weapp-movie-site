import { useInfiniteQuery } from "@tanstack/react-query";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { IMovie, ITopRatedMovies } from "../models/movie";
import { fetchTopMovies } from "../api/movies";
import ErrorMessage from "../components/ErrorMessage";
import { useState } from "react";
import MovieCard from "../components/MovieCard";

export default function HomeScreen({ navigation }: any) {
  const [numColumns] = useState<number>(2);

  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<ITopRatedMovies>({
      queryKey: ["movies"],
      queryFn: fetchTopMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage: ITopRatedMovies) => {},
    });

  function renderMovieItem({ item }: { item: IMovie }) {
    function pressHandler() {
      navigation.navigate("Actors", {
        id: item?.id ? item?.id : 0,
        title: item?.title ? item?.title : "0",
      });
    }

    return (
      <MovieCard
        title={item.title}
        poster_path={item.poster_path || "noImageMovie"}
        release_date={item.release_date || "Unknown"}
        onPress={pressHandler}
      />
    );
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item: IMovie) => item?.id?.toString() || "0"}
        renderItem={renderMovieItem}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
});
