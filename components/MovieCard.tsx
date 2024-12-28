import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getDefaultImage } from "../utilities/getStaticImages";
import { baseImageUrl } from "../api/config";

interface MovieCardProps {
  title?: string;
  release_date?: string;
  poster_path: string;
  onPress?: any;
}

export default function MovieCard(props: MovieCardProps) {
  const { title, poster_path, release_date, onPress } = props;

  console.log("movie-card");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        styles.movieItem,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <ImageBackground
        source={
          poster_path === "noImageMovie"
            ? getDefaultImage.noImageMovie
            : { uri: baseImageUrl + poster_path }
        }
        style={styles.image}
      >
        <View style={styles.itemTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>Released: {release_date}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flex: 1,
    margin: 16,
    elevation: 4,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 5,
    justifyContent: "flex-end",
  },
  itemTextContainer: {
    justifyContent: "center",
    height: "23%",
    backgroundColor: "rgba(102, 96, 96, 0.8)",
    paddingHorizontal: 5,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
