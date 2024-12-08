import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './ChatPage';
import TradePage from './tradePage';
import PropTypes from 'prop-types';

const Stack = createNativeStackNavigator();

const MessagingPage = () => {
    // Contains the stack navigator for the home screen to allow for navigation to the chatDetail page
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={ChatsPage} />
            <Stack.Screen name="Chat" component={ChatPage} />
            <Stack.Screen name="Trade" component={TradePage} />
        </Stack.Navigator>
    );
};

const ChatsPage = ({ navigation }) => {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        setShowNotification(true);
    }, []);

    const handlePressNotification = () => {
        setShowNotification(false);
        navigation.navigate('Trade');
    };

    const renderChat = ({ item }) => (
        <TouchableOpacity
            style={styles.chatContainer}
            onPress={() => navigation.navigate('Chat', { chat: item })}
        >
            <View style={styles.details}>
                <Text style={styles.chatName}>{item.user1}, {item.user2}</Text>
                <Text>Chat</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {showNotification && (
                <TouchableOpacity
                    style={styles.notificationContainer}
                    onPress={handlePressNotification}
                >
                    <Text style={styles.notificationText}>New Trade Request!</Text>
                    <View style={styles.notificationCircle} />
                </TouchableOpacity>
            )}
            <FlatList
                data={chats}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChat}
                ListEmptyComponent={<Text style={styles.noChatsText}>No chats as of yet.</Text>}
            />
        </View>
    );
};

// PropTypes for ChatsPage
ChatsPage.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    notificationText: {
        fontWeight: 'bold',
    },
    notificationCircle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: 'red',
    },
    chatContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: "space-between"
    },
    chatName: {
        fontWeight: "bold"
    },
    noChatsText: {
        textAlign: 'center',
        marginTop: 20,
    },
    selectedText:
    {
        color: '#fff',
    },
    unselectedText:
    {
        color: '#000',
    }
});

const chats = [
    {
        user1: "Musa",
        user2: "Landon"
    },
    {
        user1: "Musa",
        user2: "Jack287"
    }
];

export default MessagingPage;
