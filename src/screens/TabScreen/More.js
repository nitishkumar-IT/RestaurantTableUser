import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth } from '../../../firebaseConfig';

const handleLogout = async (navigation) => {
  try {
    await auth.signOut(); // Use auth object to sign out

    // After signing out, navigate to the login screen.
    navigation.navigate('LoginScreen');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const More = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, marginHorizontal: 20, marginTop: 10 }}>More</Text>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Card
        image={require('../../assets/ProfileIcons/Profile.png')}
        name="Profile Settings"
        handler={() => navigation.navigate('ProfileSetting')}
      />
          <Card
            image={require('../../assets/ProfileIcons/Payment.png')}
            name="Payment Details"
            handler={() => navigation.navigate('Payment')}
          />
          <Card
            image={require('../../assets/ProfileIcons/Orders.png')}
            name="Your Orders"
            handler={() => navigation.navigate('Bookings')}
          />
          <Card
            image={require('../../assets/ProfileIcons/Notification.png')}
            name="Notifications"
            isNoti={true}
            handler={() => navigation.navigate('')}
          />
          <Card
            image={require('../../assets/ProfileIcons/Favorite.png')}
            name="Favorite Hotels"
            handler={() => navigation.navigate('Payment')}
          />
          <Card
            image={require('../../assets/ProfileIcons/Settings.png')}
            name="Settings"
            handler={() => navigation.navigate('Settings')}
          />
          <Card
            image={require('../../assets/ProfileIcons/Logout.png')}
            name="Log Out"
            handler={() => handleLogout(navigation)}
          />
        </View>
      </View>
      </View>
    </View>
  );
};

const Card = ({ name, image, handler }) => {
  return (
    <TouchableOpacity onPress={handler}>
      <View style={styles.moreCard}>
        <View style={styles.moreCardInfo}>
          <Image style={styles.moreCardImage} source={image} />
          <Text style={styles.moreCardText}>{name}</Text>
        </View>
        <View style={styles.moreCardIconContainer}>
          <Image source={require('../../assets/ProfileIcons/Arrow.png')} style={styles.moreCardIcon} />
        </View>

          </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 30,
  },
  moreCardContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  moreCard: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    marginRight: 20,
  },
  moreCardInfo: {
    height: '100%',
    width: '93%',
    padding: 15,
    borderRadius: 7,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreCardImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  moreCardText: {
    color: '#000',
    marginLeft: 15,
  },
  moreCardIconContainer: {
    height: 70,
    width: 35,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0.1,
    borderTopLeftRadius: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreCardIcon: {
    width: 20,
    height: 17,
    tintColor: '#6F5060',
  },
});
export default More;