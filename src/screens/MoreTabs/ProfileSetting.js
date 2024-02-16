import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../../../firebaseConfig';

const ProfileSetting = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userUid = firebase.auth().currentUser.uid;
        const snapshot = await firebase.database().ref(`users/${userUid}`).once('value');
        const userData = snapshot.val();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const userUid = firebase.auth().currentUser.uid;
      await firebase.database().ref(`users/${userUid}`).set(user);

      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.profileInfoContainer}>
          <Image
            source={{ uri: user?.profileImage || 'placeholder_image_url' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraOverlay}>
            <Image
              source={require('../../assets/ProfileIcons/Profile.png')} // Placeholder camera icon
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.greetingText}>{`Hi there ${user?.name || ''}!`}</Text>

        <CustomFormInput
          label="Name"
          value={user?.name || ''}
          isEditing={isEditing}
          onChangeText={(text) => setUser({ ...user, name: text })}
          borderStyle={styles.inputContainer}
        />
        <CustomFormInput
          label="Email"
          value={user?.email || ''}
          isEditing={isEditing}
          onChangeText={(text) => setUser({ ...user, email: text })}
          borderStyle={styles.inputContainer}
        />
        <CustomFormInput
          label="Mobile No"
          value={user?.mobileNo || ''}
          isEditing={isEditing}
          onChangeText={(text) => setUser({ ...user, mobileNo: text })}
          borderStyle={styles.inputContainer}
        />
        <CustomFormInput
          label="Date of Birth"
          value={user?.dateOfBirth || ''}
          isEditing={isEditing}
          onChangeText={(text) => setUser({ ...user, dateOfBirth: text })}
          isDateInput={true}
          borderStyle={styles.inputContainer}
        />
        <CustomFormInput
          label="Password"
          value={user?.password || ''}
          isEditing={isEditing}
          onChangeText={(text) => setUser({ ...user, password: text })}
          isPassword={true}
          borderStyle={styles.inputContainer}
        />

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CustomFormInput = ({ label, value, isEditing, isPassword, isDateInput, onChangeText, borderStyle }) => {
  return (
    <View style={borderStyle}>
      {isEditing ? (
        <View style={styles.inputWithEdit}>
          <TextInput
            style={styles.input}
            placeholder={label}
            secureTextEntry={isPassword}
            value={value}
            onChangeText={onChangeText}
          />
          <TouchableOpacity style={styles.editButton} onPress={() => onChangeText(value)}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Text style={styles.inputValue}>{isDateInput ? new Date(value).toDateString() : value}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => onChangeText(value)}>
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
    backgroundColor: '#ffffff',
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
  greetingText: {
    fontSize: 24,
    color: 'black',
  },
  inputWithEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#6F5060',
    padding: 10,
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
  inputContainer: {
    width: '100%',
    height: 60,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 25,
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
});

export default ProfileSetting;
