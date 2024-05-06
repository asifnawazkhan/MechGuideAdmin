import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { getDocs, collection } from 'firebase/firestore'; // Assuming you're using Firestore

const Data = () => {
  const [userDataLength, setUserDataLength] = useState(0);
  const [mechanicsDataLength, setMechanicsDataLength] = useState(0);
  const [feedbackLength, setFeedbackLength] = useState(0);
  const [error, setError] = useState(null);

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
        setError(error.message || 'An error occurred');
      }
    };
    fetchData();
  }, []);

  // Data for the line chart
  const lineChartData = {
    labels: ['Users', 'Mechanics', 'Feedback'],
    datasets: [
      {
        data: [userDataLength, mechanicsDataLength, feedbackLength]
      }
    ]
  };

  // Data for the bar chart
  const barChartData = {
    labels: ['Users', 'Mechanics', 'Feedback'],
    datasets: [
      {
        data: [userDataLength, mechanicsDataLength, feedbackLength],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
      }
    ]
  };

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Data</Text>
      <LineChart
        data={lineChartData}
        width={300}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726'
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <BarChart
        data={barChartData}
        width={300}
        height={200}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

export default Data;
