import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import axios from 'axios';

const JobListingScreen = ({ route, navigation }) => {
  const [jobs, setJobs] = useState([]);
  const { user } = route.params;
  const scale = new Animated.Value(1);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleProfile = () => {
    navigation.navigate('Profile'); // Example ke liye "Profile" screen navigate ki hai
  };

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      {/* Logout Button */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={handleLogout}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* New Button */}
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          onPress={handleProfile}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.button, styles.profileButton]}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1c1c1c',
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4f4f4',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    backgroundColor: '#2c2c2c',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    color: '#f4f4f4',
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#ccc',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  button: {
    backgroundColor: '#ff5c5c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#ff5c5c',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginTop: 10,
  },
  profileButton: {
    backgroundColor: '#4CAF50', // Profile button ke liye green color
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobListingScreen;
