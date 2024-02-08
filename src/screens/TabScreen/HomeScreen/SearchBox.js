// SearchBox.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBox = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Icon name="ios-search" size={20} color="black" />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Hotels for Dine in..... "
          placeholderTextColor="black"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    width: '100%',
    height: 55,
    borderRadius: 18,
    backgroundColor: 'lightgray',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    color: 'black',
  },
});

export default SearchBox;
