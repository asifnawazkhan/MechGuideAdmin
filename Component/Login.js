import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from "../firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";


const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // try {
    //   await signInWithEmailAndPassword(auth, username, password);
    //   console.log("User logged in successfully");
    //   alert("User logged in successfully");
    //   navigation.navigate("Home");
    // } catch (error) {
    //   setError("Login failed. Please check your credentials.");
    //   console.error("Login error:", error.message);
    // }
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_login}>
        <Image
          source={require('../assets/LogoMechGuide.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Admin Login</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.inputContainer}>
          <View style={[styles.iconContainer, { backgroundColor: '#dbdfe6' }]}>
            <MaterialCommunityIcons name="account-outline" size={24} color="black" style={styles.icon} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={[styles.iconContainer, { backgroundColor: '#dbdfe6' }]}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="black" style={styles.icon} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  container_login: {
    padding: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 8,
    borderRadius: 10,
    alignItems: 'center', // Center align the content
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333', // Text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc', // Border color
    borderRadius: 8, // Rounded corners
    width: '100%',
  },
  iconContainer: {
    padding: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 10
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#333333', // Text color
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2eb85c', // Button background color
    paddingVertical: 13,
    paddingHorizontal: 140,
    borderRadius: 8, // Rounded corners
  },
  buttonText: {
    color: '#ffffff', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginForm;
