import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ navigation }) => {
  const [peopleType, setPeopleType] = useState('');
  const [timing, setTiming] = useState('');
  const [date, setDate] = useState(new Date());
  const [numPeople, setNumPeople] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleBooking = () => {
    const bookingDetails = {
      peopleType,
      timing,
      date,
      numPeople,
    };
    console.log('Booking Details:', bookingDetails);
    navigation.navigate('ConfirmationScreen', { bookingDetails });
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (selectedTime) => {
    hideTimePicker();
    if (selectedTime) {
      setTiming(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const renderNumPeopleInput = () => {
    if (peopleType === 'Couples') {
      return (
        <Picker
          selectedValue={numPeople}
          style={styles.input}
          onValueChange={(itemValue) => setNumPeople(itemValue)}
        >
          {[...Array(5).keys()].map((num) => (
            <Picker.Item key={2 * (num + 1)} label={(2 * (num + 1)).toString()} value={(2 * (num + 1)).toString()} />
          ))}
        </Picker>
      );
    } else if (peopleType === 'Family') {
      return (
        <Picker
          selectedValue={numPeople}
          style={styles.input}
          onValueChange={(itemValue) => setNumPeople(itemValue)}
        >
          {[...Array(10).keys()].map((num) => (
            <Picker.Item key={num + 1} label={(num + 1).toString()} value={(num + 1).toString()} />
          ))}
        </Picker>
      );
    } else {
      return (
        <TextInput
          placeholder={`Number of ${peopleType}`}
          style={styles.input}
          value={numPeople}
          onChangeText={(text) => setNumPeople(text)}
          keyboardType="numeric"
          editable={peopleType !== ''}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book a Table</Text>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Icon name="user" size={25} color="#3498db" style={styles.icon} />
          <Text style={styles.cardText}>Select People Type</Text>
        </View>
        <Picker
          selectedValue={peopleType}
          style={styles.input}
          onValueChange={(itemValue) => setPeopleType(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Couples" value="Couples" />
          <Picker.Item label="Friends" value="Friends" />
          <Picker.Item label="Family" value="Family" />
        </Picker>
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Icon name="calendar" size={25} color="#e74c3c" style={styles.icon} />
          <Text style={styles.cardText}>Select Date</Text>
        </View>
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Icon name="clock-o" size={25} color="#2ecc71" style={styles.icon} />
          <Text style={styles.cardText}>Select Timing</Text>
        </View>
        <TouchableOpacity onPress={showTimePicker} style={styles.input}>
          <Text>{timing || 'Select Time'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
      </Card>

      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Icon name="users" size={25} color="#f39c12" style={styles.icon} />
          <Text style={styles.cardText}>Number of People</Text>
        </View>
        {renderNumPeopleInput()}
      </Card>

      <TouchableOpacity style={styles.animatedButton} onPress={handleBooking}>
        <Icon name="arrow-right" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9', // Set a background color if needed
  },
  heading: {
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6F5060',
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginLeft: 25,
    color: '#333', // Adjust text color as needed
  },
  card: {
    width: '100%',
    height: '18%',
    marginBottom: 16,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    marginRight: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#333',
  },
  animatedButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: '#6F5060',
  },
  icon: {
    marginLeft: 25,
  },
});

export default BookingScreen;
