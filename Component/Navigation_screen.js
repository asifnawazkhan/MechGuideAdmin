import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Home from './Home';
import User from './User';
import Mechanics from './Mechanics';
import Feedback from './Feedback';
import Login from './Login';
import Register from './Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menubar from './Menubar';

const Stack = createStackNavigator();

function Navation_screen({navigation}) {
  return (
    <>
      <NavigationContainer>
        <Menubar />
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Hide header for all screens
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Mechanic" component={Mechanics} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="RegisterNewAdmin" component={Register} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 0, // Set padding to 0
    margin: 0, // Set margin to 0
  },
});

export default Navation_screen;
