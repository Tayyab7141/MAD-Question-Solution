import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Dummy Authentication (Can be replaced with Firebase/Auth API)
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'test@gmail.com' && password === '123456') {
            navigation.replace('JobList'); // Navigate to job list on successful login
        } else {
            alert('Invalid Credentials');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>
            <TextInput placeholder="Email" style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, marginBottom: 10, padding: 10 }} onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

// Job Listings Screen
const JobListScreen = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('https://jsonfakery.com/job-posts') // Replace with your Node.js API URL
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>Job Listings</Text>
            <FlatList
                data={jobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { job: item })} style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 18 }}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

// Job Details Screen
const JobDetailScreen = ({ route }) => {
    const { job } = route.params;

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 10 }}>{job.title}</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{job.description}</Text>
            <Button title="Apply Now" onPress={() => Linking.openURL(job.apply_link)} />
        </View>
    );
};

// Stack Navigator
const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="JobList" component={JobListScreen} />
                <Stack.Screen name="JobDetail" component={JobDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;