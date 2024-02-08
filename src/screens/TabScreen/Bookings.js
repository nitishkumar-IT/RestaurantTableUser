import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const BookingScreen = () => {
  const [activeTab, setActiveTab] = React.useState('Upcoming');
  const translateX = React.useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === 'Upcoming' ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleTabChange('Upcoming')} style={styles.tab}>
          <Text style={activeTab === 'Upcoming' ? styles.activeTabText : styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('Completed')} style={styles.tab}>
          <Text style={activeTab === 'Completed' ? styles.activeTabText : styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              transform: [{ translateX: translateX.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }) }],
            },
          ]}
        />
      </View>
      {/* Add your booking list here based on the activeTab */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#6F5060',
    height: 70,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50%', // Adjust this width to match your tabs
    height: 5,
    backgroundColor: '#ffffff',
  },
});

export default BookingScreen;
