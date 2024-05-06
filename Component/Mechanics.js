import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const Mechanics = () => {
  const [mechanicsData, setMechanicsData] = useState([]);
  const [openedImageUri, setOpenedImageUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Mechdata"));
        const data = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          serialNo: index + 1,
          ...doc.data(),
        }));
        setMechanicsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const rejectApplication = async (id) => {
    try {
      const docRef = doc(db, "Mechdata", id);
      await updateDoc(docRef, {
        status: "rejected",
      });
      const updatedData = mechanicsData.map((item) => {
        if (item.id === id) {
          return { ...item, status: "rejected" };
        }
        return item;
      });
      setMechanicsData(updatedData);
    } catch (error) {
      console.error("Error rejecting application: ", error);
    }
  };
  const acceptedApplication = async (id) => {
    try {
      const docRef = doc(db, "Mechdata", id);
      await updateDoc(docRef, {
        status: "accepted",
      });
      const updatedData = mechanicsData.map((item) => {
        if (item.id === id) {
          return { ...item, status: "accepted" };
        }
        return item;
      });
      setMechanicsData(updatedData);
    } catch (error) {
      console.error("Error accepting application: ", error);
    }
  };
    const openImage = (uri) => {
    setOpenedImageUri(uri);
  };

  const closeImage = () => {
    setOpenedImageUri(null);
  };

  const renderImage = (uri) => (
    <TouchableOpacity onPress={() => openImage(uri)}>
      <Image style={styles.image} source={{ uri }} resizeMode="contain" />
    </TouchableOpacity>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { color: "orange" };
      case "accepted":
        return { color: "green" };
      case "rejected":
        return { color: "red" };
      default:
        return {};
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.serialNo}</Text>
      <Text style={styles.cell}>{item.firstName}</Text>
      <Text style={styles.cell}>{item.lastName}</Text>
      <View style={styles.imageCell}>
        {renderImage(item.certificateImageFront)}
        {renderImage(item.certificateImageBack)}
      </View>
      <View style={styles.imageCell}>
        {renderImage(item.cnicFront)}
        {renderImage(item.cnicBack)}
      </View>
      <View style={styles.imageCell}>
        {renderImage(item.holdingCnicImage)}
        {renderImage(item.drivingLicense)}
      </View>
      <Text style={[styles.status, getStatusStyle(item.status)]}>
        {item.status}
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.buttonAccept}
        onPress={() => acceptedApplication(item.id)}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonReject}
          onPress={() => rejectApplication(item.id)}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View>
        {" "}
        <Text style={styles.headerText}>MECHANICS Request</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={styles.upercontainer}
      >
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Serial No</Text>
            <Text style={styles.headerCell}>First Name</Text>
            <Text style={styles.headerCell}>Last Name</Text>
            <Text style={styles.headerCell}>Certification Front</Text>
            <Text style={styles.headerCell}>Certification Back</Text>
            <Text style={styles.headerCell}>CNIC Front</Text>
            <Text style={styles.headerCell}>CNIC Back</Text>
            <Text style={styles.headerCell}>Holding CNIC</Text>
            <Text style={styles.headerCell}>Driving License</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Action</Text>
          </View>
          <FlatList
            data={mechanicsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <Modal visible={openedImageUri !== null} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={{ uri: openedImageUri }}
              resizeMode="cover"
            />
            <Button title="Close" onPress={closeImage} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  upercontainer: {

    flex: 1,
    marginLeft: 20,
    marginRight: 20,

  },
  container: {
    flex: 1,
    width: 2000,
    margin: 10,
    backgroundColor: '#1e2c45',
    borderColor: '#616975', // Change border color

  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center',
    marginTop:20

  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: '#616975' ,// Change border color
    paddingVertical: 10,
    backgroundColor: '#222326',
    paddingBottom:25,
    paddingTop:25

  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color:'white'
    
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    borderTopWidth: 1,
    alignItems: "center",

  },
  cell: {
    flex: 1,
    textAlign: "center",
    color:'white'

  },
  imageCell: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  status: {
    flex: 1,
    textAlign: "center",
    fontWeight:'bold'
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  buttonAccept: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonReject: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: 700,
    height: 500,
  },
  
});

export default Mechanics;
