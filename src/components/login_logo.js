import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function login_logo() {
  return <Image source={require('../assets/login_logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
})
