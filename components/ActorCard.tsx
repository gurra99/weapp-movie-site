import { StyleSheet, View, Text, Image } from "react-native";
import { getDefaultImage } from "../utilities/getStaticImages";
import { baseImageUrl } from "../api/config";

interface ActorCardProps {
  id: number;
  name: string;
  profile_path: string;
}

export default function ActorCard(props: ActorCardProps) {
  const { id, name, profile_path } = props;

  console.log("actor-card");

  return (
    <View style={styles.actorItem} key={id}>
      <Image
        source={
          profile_path == "noImageActor"
            ? getDefaultImage.noImageActor
            : { uri: baseImageUrl + profile_path }
        }
        style={styles.image}
      />
      <View style={styles.itemTextContainer}>
        <Text>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actorItem: {
    width: 120,
    maxWidth: "30%",
    height: 250,
    margin: 5,
    elevation: 4,
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    height: "75%",
    resizeMode: "cover",
  },
  itemTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 5,
    height: "25%",
  },
  title: {
    fontSize: 10,
  },
});
