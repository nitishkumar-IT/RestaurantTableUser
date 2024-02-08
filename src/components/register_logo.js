import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function register_logo() {
  return <Image source={require('../assets/signup_logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
})
