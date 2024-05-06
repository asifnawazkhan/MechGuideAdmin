import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth"; // Import for user deletion

import { auth, db } from "../firebase/firebase.config";
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming you're using Expo
import { ScrollView } from "react-native-web";

const User = ({ navigation }) => {
  const [userData, setUserData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          serialNo: index + 1,
          ...doc.data(),
        }));
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      // Delete user data from Firestore
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);
  
      // Delete user's authentication credential
      await deleteUser(id);
  
      // Update local state to reflect deletion
      setUserData((prevData) => prevData.filter((item) => item.id !== id));
      alert("User data and credentials deleted successfully");
    } catch (error) {
      alert(error);
    }
  };
  
  const openUpdateModal = (id, name, email, phone) => {
    setSelectedUserId(id);
    setName(name);
    setEmail(email);
    setPhone(phone);
    setModalVisible(true);
  };

  const updateItem = async () => {
    try {
      const docRef = doc(db, 'users', selectedUserId);
      await updateDoc(docRef, {
        name: name,
        email: email,
        phone: phone
      });
      setModalVisible(false);
      alert("User data updated successfully");
    } catch (error) {
      alert(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.serialNo}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.phone}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openUpdateModal(item.id, item.name, item.email, item.phone)}>
          <FontAwesome5 name="pen" size={20} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <FontAwesome5 name="trash-alt" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* <Menubar navigation={navigation} /> */}
      <View style={styles.content}>
        <Text style={styles.headerText}>USER DATA</Text>
        <View style={styles.table_sty}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell]}>S.No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            <Text style={[styles.cell, styles.headerCell]}>Email</Text>
            <Text style={[styles.cell, styles.headerCell]}>Phone</Text>
            <Text style={[styles.cell, styles.headerCell]}>Actions</Text>
          </View>
          <FlatList
            data={userData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      
      {/* Modal for updating user */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={setName}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={setPhone}
              value={phone}
            />
            <Button title="Update" onPress={updateItem} />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    marginTop:40,
   
  },
  content: {
    flex: 1,
    margin: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#1e2c45',
    borderBottomWidth: 1,
    borderColor: '#616975',
    borderRadius: 20
  },
  table_sty: {
    backgroundColor: '#1e2c45',
    borderColor: '#616975' // Change border color
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#616975",
    marginBottom: 10,
    backgroundColor: '#222326',
    padding: 10
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#616975",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
    fontFamily: "Arial", // Example font family
    fontSize: 14, // Example font size
    color: 'white'
  },
  headerCell: {
    fontWeight: "bold",
    fontFamily: "Arial", // Example font family
    fontSize: 16, // Example font size
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    color: "white", // Changed to white
    fontSize: 26, // Increased font size
    marginBottom: 10,
    padding: 14,
    fontFamily: "Arial", // Example font family
    fontWeight: "bold", // Example font 
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default User;
