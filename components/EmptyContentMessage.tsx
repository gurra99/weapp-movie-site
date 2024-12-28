import { StyleSheet, Text, View } from "react-native";

interface EmptyContentMessageProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export default function EmptyContentMessage({
  text,
}: EmptyContentMessageProps) {
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
  },
});
