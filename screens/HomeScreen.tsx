import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { IMovie, ITopRatedMovies } from "../models/movie";
import MovieCard from "../components/MovieCard";
import { fetchTopMovies } from "../api/movies";
import ErrorMessage from "../components/ErrorMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { sortByReleaseDate } from "../utilities/sortMovies";
import { ScreenProps } from "../App";
import EmptyContentMessage from "../components/EmptyContentMessage";

export default function HomeScreen({ navigation }: ScreenProps<"Home">) {
  const [numColumns] = useState<number>(2);

  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery<ITopRatedMovies>({
      queryKey: ["movies"],
      queryFn: fetchTopMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage: ITopRatedMovies) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
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

  const loadMoreMovies = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  // Combines the results of all pages into a single array of movies.
  const getFlattenedMovies = () => {
    const movies = data?.pages.map((page) => page.results).flat();
    return sortByReleaseDate(movies || []);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ErrorMessage text={error.message} />;
  }

  console.log("home");
  console.log(data);

  return (
    <View style={styles.container}>
      {!isLoading && getFlattenedMovies().length > 0 ? (
        <FlatList
          data={getFlattenedMovies()}
          keyExtractor={(item: IMovie) => item?.id?.toString() || "0"}
          renderItem={renderMovieItem}
          numColumns={numColumns}
          onEndReached={loadMoreMovies}
        />
      ) : (
        <EmptyContentMessage text="There are no movies" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
});
