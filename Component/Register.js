import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister =async () => {
    // Implement your registration logic here
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const userRef = doc(db, "Register_Admin", user.uid);
        await setDoc(userRef, {
          name: username,
          email: email,
          password: password,
        });
        console.log("User data added to Firestore:", userRef.id);
        alert("user added");
        navigation.navigate("Home");
        
      } else {
        console.log("User object is undefined.");
      }
    } catch (error) {
      console.log("Registration failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_register}>
      <Text style={styles.title_reg}>Register</Text>
      <Text style={styles.title}>Create your account</Text>
      <View style={styles.inputContainer}>
        <View style={[styles.iconContainer, { backgroundColor: '#dbdfe6' }]}>
          <MaterialCommunityIcons name="account-outline" size={24} color="black" style={styles.icon} />
        </View>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.iconContainer, { backgroundColor: '#dbdfe6' }]}>
          <MaterialCommunityIcons name="email-outline" size={24} color="black" style={styles.icon} />
        </View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.iconContainer, { backgroundColor: '#dbdfe6' }]}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="black" style={styles.icon} />
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_register:{
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
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    color: '#333333', // Text color
  },
  title_reg:{
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#cccccc', // Border color
    borderRadius: 8, // Rounded corners
    width:400
  },
  iconContainer: {
    padding: 10,
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
    marginRight:10
    
  },
  icon: {
    marginRight: 5,
    marginLeft: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 5,
    color: '#333333', // Text color
    fontSize: 16,
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


export default RegisterPage;
