import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const BookingScreenHotel = ({ route, navigation }) => {
  const { hotel } = route.params;

  const [peopleType, setPeopleType] = useState('');
  const [timing, setTiming] = useState('');
  const [date, setDate] = useState(new Date());
  const [numPeople, setNumPeople] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTiming(getDefaultTime());
    setDate(getDefaultDate());
    setNumPeople(getDefaultNumPeople());
    setPeopleType('');
  }, []);

  const getDefaultTime = () => {
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 1);
    return defaultTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDefaultDate = () => {
    const today = new Date();
    return today;
  };

  const getDefaultNumPeople = () => {
    return peopleType === 'Couples' ? '2' : '1';
  };

  const handleBooking = () => {
    if (!peopleType || !date || !timing || !numPeople) {
      setErrorMessage('Please fill in all the information.');
      return;
    }

    const bookingDetails = {
      peopleType,
      timing,
      date: date.toISOString(),
      numPeople,
    };

    setErrorMessage('');
    console.log('Booking Details:', bookingDetails);
    // You can customize the navigation destination or actions here
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
      const currentDate = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(currentDate.getDate() + 5);

      if (selectedDate >= currentDate && selectedDate <= fiveDaysLater) {
        setDate(selectedDate);
      } else {
        setErrorMessage('Please select a date within the next 5 days.');
      }
    }
  };

  const renderNumPeopleInput = () => {
    const maxPeople = peopleType === 'Couples' ? 8 : 15;
    const peopleArray = [...Array(maxPeople).keys()].map((num) => num + 1);

    return (
      <Picker
        selectedValue={numPeople}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setNumPeople(itemValue)}
      >
        {peopleArray.map((num) => (
          <Picker.Item key={num} label={num.toString()} value={num.toString()} />
        ))}
      </Picker>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Book a Table</Text>
        <Text style={styles.subHeading}>at {hotel.hotelName}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconLabelContainer}>
          <Icon name="account-group" size={25} color="#E91E63" style={styles.icon} />
          <Text style={styles.label}>Select Group Type</Text>
        </View>
        <Picker
          selectedValue={peopleType}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setPeopleType(itemValue)}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Couples" value="Couples" />
          <Picker.Item label="Friends" value="Friends" />
          <Picker.Item label="Family" value="Family" />
        </Picker>
      </View>

      <View style={styles.card}>
        <View style={styles.iconLabelContainer}>
          <Icon name="calendar-clock" size={25} color="#2196F3" style={styles.icon} />
          <Text style={styles.label}>Select Date</Text>
        </View>
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
          maximumDate={new Date().setDate(new Date().getDate() + 5)}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.iconLabelContainer}>
          <Icon name="clock-time-four-outline" size={25} color="#FFC107" style={styles.icon} />
          <Text style={styles.label}>Select Time</Text>
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
      </View>

      <View style={styles.card}>
        <View style={styles.iconLabelContainer}>
          <Icon name="account-multiple" size={25} color="#4CAF50" style={styles.icon} />
          <Text style={styles.label}>Number of Guests</Text>
        </View>
        {renderNumPeopleInput()}
      </View>

      <TouchableOpacity style={styles.animatedButton} onPress={handleBooking}>
        <Icon name="arrow-right" size={30} color="#fff" />
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6F5060',
    padding: 20,
    paddingBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subHeading: {
    fontSize: 18,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 20,
    padding: 15,
    elevation: 5,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
   
  },
  picker: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    color: '#333',
    marginBottom: 10,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  animatedButton: {
    alignSelf: 'flex-end',
    margin: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FF5722',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    margin: 10,
  },
});

export default BookingScreenHotel;

