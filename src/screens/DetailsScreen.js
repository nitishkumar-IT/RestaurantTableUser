import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HotelDetails = ({ route }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { hotel } = route.params;

  useEffect(() => {
    // Fetch hotel details if needed
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const openGalleryModal = (index) => {
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  const bookHotel = () => {
    navigation.navigate('BookingScreenHotel', { hotel });
  };

  const getDirections = () => {
    const locationAddress = hotel.googleMapAddress;
    const url = `${locationAddress}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
       <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
      >
        {hotel.imageUrls.map((imageUrl, index) => (
          <View key={index}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => openGalleryModal(index)}
            >
              <Text style={styles.buttonText}>View Gallery</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>

      <View style={styles.details}>
        <View style={styles.top}>
          <Text style={styles.name}>{hotel.hotelName}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-o'}
              size={28}
              color={isFavorite ? '#e74c3c' : '#3498db'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.address}>
          <Icon name="map-marker" size={22} color="#58D68D" />
          <Text style={styles.text}>{hotel.location}</Text>
          <Text style={styles.text}>{hotel.address}</Text>
        </View>

        <View style={styles.middle}>
          <View style={styles.timing}>
            <Icon name="clock-o" size={24} color="#58D68D" />
            <Text style={styles.text}>
              {hotel.openingTime} - {hotel.closingTime}
            </Text>
          </View>

          <TouchableOpacity style={styles.call}>
            <Icon name="phone" size={22} color="#fff" />
          
          </TouchableOpacity>
        </View>

        <View style={styles.ratings}>
          {[1, 2, 3, 4, 5].map((star, index) => (
            <Icon
              key={index}
              name={index + 1 <= hotel.rating ? 'star' : 'star-o'}
              size={22}
              color="#f39c12"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={bookHotel}>
          <Text style={styles.buttonText}>Book a Table</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.directionButton} onPress={getDirections}>
            <Icon name="map" size={24} color="#fff" />
            <Text style={styles.buttonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.galleryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hotel.imageUrls.map((imageUrl, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openGalleryModal(index)}
                style={styles.thumbnailContainer}
              >
                <Image source={{ uri: imageUrl }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showGalleryModal}
        onRequestClose={closeGalleryModal}
      >
        <ScrollView style={styles.galleryModalContainer}>
          {hotel.imageUrls.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={[
                styles.galleryImage,
                index === selectedImageIndex && styles.selectedImage,
              ]}
            />
          ))}
          <TouchableOpacity
            style={styles.closeGalleryModalButton}
            onPress={closeGalleryModal}
          >
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  details: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -25,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 35,
    paddingHorizontal: 25,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6F5060',
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
  },
  swiperContainer: {
    height: '100%', 
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  call: {
    backgroundColor: '#e74c3c',
    padding: 13,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  ratings: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: '#6F5060',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  galleryButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  directionButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  galleryContainer: {
    marginTop: 20,
  },
  thumbnailContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  galleryModalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  galleryImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  selectedImage: {
    borderColor: '#58D68D',
    borderWidth: 2,
  },
  closeGalleryModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default HotelDetails;
