import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HotelEntry = ({ name, status, rating, location, imageUri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>{status}</Text>
        <Text style={styles.rating}>Rating: {rating}</Text>
        <Text style={styles.location}>Location: {location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
  },
  rating: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
  },
});

export default HotelEntry;
