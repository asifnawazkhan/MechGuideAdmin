import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const DataCard = ({ navigation }) => {
  const [userDataLength, setUserDataLength] = useState(null);
  const [mechanicsDataLength, setMechanicsDataLength] = useState(null);
  const [feedbackLength, setFeedbackLength] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch number of users
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        setUserDataLength(usersQuerySnapshot.size);

        // Fetch number of mechanics
        const mechanicsQuerySnapshot = await getDocs(collection(db, "Mechdata"));
        setMechanicsDataLength(mechanicsQuerySnapshot.size);

        // Fetch number of feedback
        const feedbackQuerySnapshot = await getDocs(collection(db, "Usercomplaint"));
        setFeedbackLength(feedbackQuerySnapshot.size);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const dataItems = [
    { id: '1', title: 'Number of Users Register', icon: 'user', length: userDataLength },
    { id: '2', title: 'Number of Mechanics Register', icon: 'wrench', length: mechanicsDataLength },
    { id: '3', title: 'User Complaint', icon: 'comments', length: feedbackLength },
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('User')} style={[styles.cardContainer]}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']} // Fixed gradient colors
        style={[styles.card]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name={item.icon} size={45} color="#fff" style={styles.iconstyle}/>
        <Text style={styles.text_col}>({item.length})</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {dataItems.map(item => (
          <View key={item.id} style={styles.gridItem}>
            {renderItem({ item })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Align items evenly
    padding: 10, // Add padding for better spacing
  },
  gridItem: {
    width: '45%',
    marginVertical: 10,
  },
  iconstyle: {
    color: '#fff',
    position: 'absolute',
    left: 10,
    top: 10
  },
  text_col: {
    color: 'yellow',
    fontSize: 50, // Adjust font size to fit within the card
    fontWeight: 'bold'
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  card: {
    borderRadius: 10,
    padding: 20, // Reduce padding to prevent overflow
    height: 250, // Set a fixed height
    alignItems: 'center',
    justifyContent: 'center', // Center content vertically
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 33, // Adjust font size to fit within the card
    marginTop: 5,
    color: 'white',
    textAlign: 'center'
  },
});

export default DataCard;
