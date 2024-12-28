import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./screens/HomeScreen";

const client = new QueryClient();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
