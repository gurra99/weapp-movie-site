import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./screens/HomeScreen";
import ActorsScreen from "./screens/ActorsScreen";

export type RootStackParamList = {
  Home: undefined; // No parameters for Home
  Actors: { id: number; title: string }; // id and title parameter for Actors
};

const client = new QueryClient();
const Stack = createNativeStackNavigator<RootStackParamList>();
export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export default function App() {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Actors" component={ActorsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
});
