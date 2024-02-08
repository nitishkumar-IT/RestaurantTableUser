import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const onSavePressed = () => {
  // Handle save logic here
};

const ProfileSetting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.profileInfoContainer}>
          <Image
            source={require('../../assets/ProfileIcons/Profile.png')} // Replace with your image path
            style={styles.profileImage}
          />
          <View style={styles.cameraOverlay}>
            <Image
              source={require('../../assets/ProfileIcons/Profile.png')} // Replace with your image path
              style={styles.cameraIcon}
            />
          </View>
        </View>

        <Text style={styles.greetingText}>Hi there Nitish!</Text>

        {/* Other form inputs */}
        <CustomFormInput label="Name" value="Nitishkumar" borderStyle={styles.inputContainer} />
        <CustomFormInput label="Email" value="nitishkumarofficial19@email.com" borderStyle={styles.inputContainer} />
        <CustomFormInput label="Mobile No" value="4313465434" borderStyle={styles.inputContainer} />
        <CustomFormInput label="Date of Birth" value="2001-01-01" isDateInput={true} borderStyle={styles.inputContainer} />
        <CustomFormInput label="Password" value="Nitishkumar@2001" isPassword={true} borderStyle={styles.inputContainer} />
        
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={onSavePressed}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomFormInput = ({ label, value, isPassword, borderStyle }) => {
  const [inputValue, setInputValue] = useState(value); // Use state to manage input value
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle saving the updated value here, for example, by calling an API or updating a state variable.
  };

  return (
    <View style={borderStyle}>
      {isEditing ? (
        <View style={styles.inputWithEdit}>
          <TextInput
            style={styles.input}
            placeholder={label}
            secureTextEntry={isPassword}
            value={inputValue} // Use state variable here
            onChangeText={(text) => setInputValue(text)} // Update state variable on change
          />
          <TouchableOpacity style={styles.editButton} onPress={handleSave}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Text style={styles.inputValue}>{inputValue}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
   flex: 1,
 },
 scrollViewContainer: {
   paddingHorizontal: 20,
 },
 header: {
   marginTop: 20,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 headerText: {
   fontSize: 24,
   fontWeight: 'bold',
 },
 cartIcon: {
   width: 24,
   height: 24,
 },
 profileInfoContainer: {
   marginTop: 20,
   alignItems: 'center',
 },
 profileImage: {
   width: 80,
   height: 80,
   borderRadius: 40,
 },
 cameraOverlay: {
   position: 'absolute',
   bottom: 0,
   width: 80,
   backgroundColor: 'rgba(0,0,0,0.3)',
 },
 cameraIcon: {
   width: 20,
   height: 20,
   alignSelf: 'center',
   marginBottom: 5,
 },
 editProfileButton: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 10,
 },
 editProfileIcon: {
   width: 20,
   height: 20,
 },
 greetingText: {
   fontSize: 24,
   color: 'black',
 },
 inputContainer: {
   width: '100%',
   height: '100',
   padding: 10,
   paddingStart: 20,
   borderBottomRightRadius:10,
   borderTopLeftRadius:10,
   backgroundColor: 'white',
   borderColor: 'black',
   marginTop: 25,
 },
 input: {
   fontSize: 10,
 },
 saveButtonContainer: {
  marginTop: 40,
  alignItems: 'center',
},
saveButton: {
  backgroundColor: '#6F5060',
  paddingVertical: 10,
  paddingHorizontal: 100,
  borderRadius: 10,
},
saveButtonText: {
  fontSize: 16,
  color: 'white',
  fontWeight: 'bold',
},
  inputWithEdit: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#6F5060',
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    flex: 1,
    padding: 1,
    fontSize: 16,
    color: 'black',
  },
  inputValue: {
    flex: 2,
    fontSize: 17,
  },
});

export default ProfileSetting;
