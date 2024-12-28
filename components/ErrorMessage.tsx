import { StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  text: string;
}

export default function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  errorMessage: {
    fontSize: 20,
    color: "red",
  },
});
