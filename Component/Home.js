import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Menubar from './Menubar';
import User from './User';
import Graphdata from './Graphdata'

const Home = () => {
  return (
    <View style={styles.container}>
      {/* <Menubar navigation={navigation}/> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Graphdata/>
        <User/>
        {/* Add more components or content here */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Ensure horizontal layout for the menu and content
    backgroundColor:'white'
  },
  scrollViewContent: {
    flexGrow: 1, // Take remaining space for content
  },
});

export default Home;
