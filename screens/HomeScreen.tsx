import { useInfiniteQuery } from "@tanstack/react-query";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { ITopRatedMovies } from "../models/movie";
import { fetchTopMovies } from "../api/movies";
import ErrorMessage from "../components/ErrorMessage";

export default function HomeScreen() {
  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<ITopRatedMovies>({
      queryKey: ["movies"],
      queryFn: fetchTopMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage: ITopRatedMovies) => {},
    });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
});
