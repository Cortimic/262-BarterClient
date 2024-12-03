import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons' //Used: npm install react-native-vector-icons

import Market from './Market'; // Import the ItemDetail component
import ProfilePage from './ProfilePage'; // Import the ProfilePage component
import MessagingPage from './MessagingPage';

const Tab = createBottomTabNavigator();

export default function Dashboard({ route }) {
    // Extract params from route
    const { userItems, marketItems } = route.params || {};
    const { username = 'Guest', initialPage = 'Market' } = route.params || {};

    return (
        <Tab.Navigator initialRouteName={initialPage}
        screenOptions={{ 
            tabBarStyle: styles.tabBar, 
            tabBarActiveTintColor: '#1ABC9C',
            tabBarInactiveTintColor: '#fff',
            tabBarHideOnKeyboard: true
        }}>
            <Tab.Screen name="Market" 
                children={() => <Market userItems={userItems} marketItems={marketItems} />} 
                options={{ 
                    tabBarIcon: ({ focused, color, size }) => 
                    <Icon focused={focused} name='store' size={size} color={color} /> 
                }} 
            />

            <Tab.Screen name="Chats" component={MessagingPage}
                options={{ 
                    tabBarIcon: ({ focused, color, size }) => 
                    <Icon focused={focused} name='chat' size={size} color={color} /> 
                }} 
            />

            <Tab.Screen name="Profile" component={ProfilePage}
                options={{ 
                    tabBarIcon: ({ focused, color, size }) => 
                    <Icon focused={focused} name='person' size={size} color={color} /> 
                }} 
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    dummyText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
    },

    tabBar: { 
        backgroundColor: '#2C3E50',
        tabBarActiveTintColor: '#fff',
        tabBarActiveTintColor: '#000',

    },
    
});




