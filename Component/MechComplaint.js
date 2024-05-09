import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { FontAwesome5 } from '@expo/vector-icons';

const MechComplaint = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MechanicsComplaint'));
        const data = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          serialNo: index + 1,
          ...doc.data(),
        }));
        setFeedbackData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.serialNo}</Text>
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.selectedEmoji}</Text>
      <Text style={styles.cell}>{item.suggestions}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container2}>
        <Text style={styles.headerText}>Mechanics Complaints and Feedback Data</Text>
        <View style={styles.table_sty}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell]}>S.No</Text>
            <Text style={[styles.cell, styles.headerCell]}>Username</Text>
            <Text style={[styles.cell, styles.headerCell]}>Email</Text>
            <Text style={[styles.cell, styles.headerCell]}>Selected Emoji</Text>
            <Text style={[styles.cell, styles.headerCell]}>Suggestions</Text>
          </View>
          <FlatList
            data={feedbackData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1e2c45'
  },
  container2:{
    margin:20
    },

  headerText: {
  color:'white',
    fontSize: 26,
    marginBottom: 10,
    padding: 14,
    fontWeight: 'bold',
    textAlign:'center'
    
  },
  table_sty: {
    backgroundColor: '#1e2c45',
    borderColor: '#616975',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#616975',
    marginBottom: 10,
    backgroundColor: '#222326',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#616975',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: 'Arial',
    fontSize: 14,
    color: 'white',
  },
  headerCell: {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fontSize: 16,
  },
});

export default MechComplaint;
