import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfirmationScreen = ({ route, navigation }) => {
  const { bookingDetails } = route.params;

  // Convert date to a serializable format (string)
  const formattedDate = new Date(bookingDetails.date).toLocaleDateString();

  // Create a new object with the serializable date
  const serializableBookingDetails = {
    ...bookingDetails,
    date: formattedDate,
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.backgroundContainer}>
        <Icon name="check-circle" size={80} color="#4CAF50" style={styles.icon} />
        <Text style={styles.heading}>Booking Confirmed!</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Hotel: {serializableBookingDetails.hotel}</Text>
          <Text style={styles.detailsText}>People Type: {serializableBookingDetails.peopleType}</Text>
          <Text style={styles.detailsText}>Timing: {serializableBookingDetails.timing}</Text>
          <Text style={styles.detailsText}>Date: {serializableBookingDetails.date}</Text>
          <Text style={styles.detailsText}>Number of People: {serializableBookingDetails.numPeople}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
          <Text style={styles.backButtonText}>Back to Booking</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  backgroundContainer: {
    backgroundColor: '#6F5060',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  backButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9E768F',
    borderRadius: 10,
    padding: 10,
  },
  backButtonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#6F5060',
  },
});

export default ConfirmationScreen;
