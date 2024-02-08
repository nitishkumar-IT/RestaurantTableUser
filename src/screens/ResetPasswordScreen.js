// Import necessary modules and components
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Import Firebase Authentication
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/reset_pwd';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

// ResetPasswordScreen component
export default function ResetPasswordScreen({ navigation }) {
  // State variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Function to send password reset email
  const sendResetPasswordEmail = async () => {
    try {
      // Check if email is provided
      if (!email) {
        setEmailError('Email is required.');
        return;
      }

      // Send a password reset email using Firebase Authentication
      await sendPasswordResetEmail(auth, email);

      // Password reset email sent successfully
      Alert.alert('Success', 'Password reset email sent successfully', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    } catch (error) {
      // Handle any errors here (e.g., invalid email or email not found)
      setEmailError(error.message);

      // Show an alert for email not found
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Email Not Found', 'No account found with this email address.');
      }
    }
  };

  return (
    <Background>
      {/* Back button */}
      <BackButton goBack={navigation.goBack} />

      {/* Logo */}
      <Logo />

      {/* Header */}
      <Header>Reset Password</Header>

      {/* Email input */}
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError('');
        }}
        error={!!emailError}
        errorText={emailError}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with a password reset link."
      />

      {/* Send Email button */}
      <Button mode="contained" onPress={sendResetPasswordEmail} style={{ marginTop: 15 }}>
        Send Email
      </Button>
    </Background>
  );
}
