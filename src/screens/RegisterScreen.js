import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../../firebaseConfig';
import Background from '../components/Background';
import Logo from '../components/register_logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError('Invalid phone number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      setPasswordError(
        'Password must include at least 1 number, 1 uppercase letter, and 1 special character'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (user) {
            updateProfile(user, {
              displayName: name,
              phoneNumber: phone,
            })
              .then(() => {
                const database = getDatabase();
                const userRef = ref(database, `users/${user.uid}`);
                set(userRef, {
                  name: name,
                  phone: phone,
                  email: email,
                })
                  .then(() => {
                    console.log('User information saved to database successfully');
                    navigation.navigate('LoginScreen');
                  })
                  .catch((error) => {
                    console.error('Error saving user information to database:', error);
                  });
              })
              .catch((error) => {
                console.error('Error updating profile:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Firebase authentication error:', error.code, error.message);
        });
    }
  };

  return (
    <ScrollView>
      <Background>
        <Logo />
        <Header>Create Account</Header>
        <Text h4>Register with email</Text>

        <TextInput
          label="Full Name"
          returnKeyType="next"
          value={name}
          onChangeText={(text) => setName(text)}
          error={!!nameError}
          errorText={nameError}
        />
        <TextInput
          label="Phone no"
          returnKeyType="next"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          error={!!phoneError}
          errorText={phoneError}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          error={!!emailError}
          errorText={emailError}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          error={!!passwordError}
          errorText={passwordError}
          secureTextEntry
        />

        <Button mode="contained" onPress={handleSignUp} style={{ marginTop: 24 }}>
          Sign Up
        </Button>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Already Have an account</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 0,
  },
  link: {
    color: theme.colors.primary,
  },
});
