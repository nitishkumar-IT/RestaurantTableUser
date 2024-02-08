import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../../../firebaseConfig';
import { onSnapshot, collection } from 'firebase/firestore';
import SearchBox from './SearchBox';
import Swiper from 'react-native-swiper';

const Home = ({ navigation }) => {
  const [hotels, setHotels] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, [refreshing]);

  const fetchHotels = async () => {
    try {
      const hotelsCollection = collection(db, 'hotels');
      const unsubscribe = onSnapshot(hotelsCollection, (querySnapshot) => {
        const hotelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHotels(hotelsData);
        setRefreshing(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching hotels:', error.message);
    }
  };

  const handleHotelPress = (hotel) => {
    console.log('Pressed hotel:', hotel);
    navigation.navigate('DetailsScreen', { hotel });
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.hotelName.toLowerCase().includes(searchInput.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchInput.toLowerCase())
    // Add more conditions based on other fields you want to search
  );

  const renderHotelCard = ({ item }) => (
    <TouchableOpacity style={styles.hotelCard} onPress={() => handleHotelPress(item)}>
      <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
      >
        {item.imageUrls.map((imageUrl, index) => (
          <Image
            key={index}
            style={styles.hotelImage}
            source={{ uri: imageUrl }}
          />
        ))}
      </Swiper>
      <View style={styles.hotelCardContent}>
        <Text style={styles.hotelName}>{item.hotelName}</Text>
        <Text style={styles.hotelLocation}>{item.location}</Text>
        <Text style={styles.hotelTime}>{item.openingTime} - {item.closingTime}</Text>
        <Text style={styles.hotelDays}>{item.openingDay} - {item.closingDay}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <>
      <View style={styles.appbar}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../../assets/ProfileIcons/Profile.png')} // Adjust the path accordingly
          />
          <View style={styles.profileText}>
            <Text style={styles.subtitle}>Welcome..!!</Text>
            <Text style={styles.title}>Nitishkumar</Text>
          </View>
        </View>
        <TouchableOpacity>
          <View style={styles.notificationIcon}>
            <Icon name="bell" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Where are you planned to Dine?</Text>
      </View>
      <SearchBox/>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      data={filteredHotels}
      keyExtractor={(item) => item.id}
      renderItem={renderHotelCard}
      ListHeaderComponent={renderHeader}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    width: '100%',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 7,
  },
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileText: {
    marginLeft: 10,
    color: 'black'
  },
  subtitle: {
    color: 'black',
    fontSize: 14,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
  },
  swiperContainer: {
    height: 200,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    marginTop: 15
  },

  hotelCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  hotelImage: {
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
    borderBottomWidth: 1,
  },
  hotelCardContent: {
    padding: 15,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  hotelLocation: {
    fontSize: 15,
    color: '#777',
    marginTop: 5,
  },
  hotelTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default Home;
