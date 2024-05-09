import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons library

const Menubar = () => {
  const navigation = useNavigation();

  const [activeMenu, setActiveMenu] = useState('Home'); // Track active menu item

  const handleMenuPress = (menuItem) => {
    setActiveMenu(menuItem); // Update active menu state
    navigation.navigate(menuItem); // Navigate to the selected screen
  };

  return (
    <>
      {/* Menu Bar */}
      
      <View style={styles.menuBar}>
      <Image
          source={require('../assets/LogoMechGuide.png')} // Adjust the path as necessary
          style={styles.logo}
        />
                <View style={styles.line} />

                <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Home' && styles.menuItemActive]}
          onPress={() => handleMenuPress('Home')}
        >
          <MaterialCommunityIcons name="home" size={24} color={activeMenu === 'Home' ? '#000' : '#FFF'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'Home' && styles.menuItemTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'User' && styles.menuItemActive]}
          onPress={() => handleMenuPress('User')}
        >
          <MaterialCommunityIcons name="account" size={24} color={activeMenu === 'User' ? '#000' : '#697080'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'User' && styles.menuItemTextActive]}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Mechanics' && styles.menuItemActive]}
          onPress={() => handleMenuPress('Mechanics')}
        >
          <MaterialCommunityIcons name="wrench" size={24} color={activeMenu === 'Mechanics' ? '#000' : 'rgba(255, 255, 255, 0.38)'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'Mechanics' && styles.menuItemTextActive]}>Mechanic Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Feedback' && styles.menuItemActive]}
          onPress={() => handleMenuPress('Feedback')}
        >
          <MaterialCommunityIcons name="comment" size={22} color={activeMenu === 'Feedback' ? '#000' : 'rgba(255, 255, 255, 0.38)'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'Feedback' && styles.menuItemTextActive]}>User Complaint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'MechanicsComplaint' && styles.menuItemActive]}
          onPress={() => handleMenuPress('MechanicsComplaint')}
        >
          <MaterialCommunityIcons name="comment" size={22} color={activeMenu === 'MechanicsComplaint' ? '#000' : 'rgba(255, 255, 255, 0.38)'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'MechanicsComplaint' && styles.menuItemTextActive]}>Mechanics Complaint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'RegisterNewAdmin' && styles.menuItemActive]}
          onPress={() => handleMenuPress('RegisterNewAdmin')}
        >
          <MaterialCommunityIcons name="account-plus" size={24} color={activeMenu === 'RegisterNewAdmin' ? '#000' : 'rgba(255, 255, 255, 0.38)'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'RegisterNewAdmin' && styles.menuItemTextActive]}>Register New Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, activeMenu === 'Login' && styles.menuItemActive]}
          onPress={() => handleMenuPress('Login')}
        >
          <MaterialCommunityIcons name="logout" size={24} color={activeMenu === 'Login' ? '#000' : 'rgba(255, 255, 255, 0.38)'} style={styles.icon} />
          <Text style={[styles.menuItemText, activeMenu === 'Login' && styles.menuItemTextActive]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuBar: {
    width: '20%',
    backgroundColor: '#2a303d',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  menuItemText: {
    color: '#FFF',
    fontFamily: 'Arial', // Adjust the font family as needed
    fontSize: 16, // Adjust the font size as needed
  },
  menuItemTextActive: {
    color: '#000',
    fontFamily: 'Arial', // Adjust the font family as needed
    fontSize: 16, // Adjust the font size as needed
  },
  logo: {
    width: 110, // Adjust the width as needed
    height: 110, // Adjust the height as needed
    marginBottom: 20, // Add margin to separate the logo from menu items
    textAlign:'center',
    justifyContent:'center',
    display:'flex',
    border:'2',
    marginLeft:73
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#697080',
    width: '100%',

    marginTop: 10,
    marginBottom:20
  },
  menuItem: {
    padding: 10,
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center', // Align icon and text vertically
    width: '90%',
    marginLeft:10,
    marginRight:10,
    marginTop:18,
    borderRadius:10
  },
  menuItemActive: {
    backgroundColor: '#e0e0e0',
  },
  icon: {
    marginRight: 10, // Add some space between icon and text
  },
});

export default Menubar;
