import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        // Pass the username when navigating to the Dashboard
        navigation.replace('Dashboard', { username });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Image source={require('../assets/LogoTransparent.png')} style={styles.logo} />

                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Login to continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                    <Text style={styles.signupText}>
                        Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F8F4F9',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 20,
        color: '#666',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupText: {
        color: '#666',
        fontSize: 14,
    },
    signupLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});
