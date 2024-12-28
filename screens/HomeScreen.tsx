import { useInfiniteQuery } from "@tanstack/react-query";
import { StyleSheet, View, Text } from "react-native";
import { ITopRatedMovies } from "../models/movie";
import { fetchTopMovies } from "../api/movies";

export default function HomeScreen() {
  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<ITopRatedMovies>({
      queryKey: ["movies"],
      queryFn: fetchTopMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage: ITopRatedMovies) => {},
    });

  console.log(data);

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
