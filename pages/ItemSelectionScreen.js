import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ItemSelectionScreen({ navigation }) {
    const [selectedItems, setSelectedItems] = useState({
        Electronics: false,
        Furniture: false,
        Clothing: false,
        Books: false,
        Other: false,
    });

    const toggleItem = (item) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };

    const handleContinue = () => {
        const selected = Object.keys(selectedItems).filter((item) => selectedItems[item]);
        if (selected.length > 0) {
            navigation.navigate('Dashboard', {
                userItems: userItems,  // Your list of user items
                marketItems: marketItems,  // Your list of market items
                username: 'JohnDoe',  // Pass other parameters as needed
                initialPage: 'Market',  // Initial page to show in the Tab Navigator
            });
        } else { 
            alert('Please select at least one item.');
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>What type of items are you interested in?</Text>

            <View style={styles.checkboxList}>
                {Object.keys(selectedItems).map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={styles.checkboxContainer}
                        onPress={() => toggleItem(item)}
                    >
                        <View style={styles.checkbox}>
                            {selectedItems[item] && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxLabel}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
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
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    checkboxList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#007bff',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        width: 10,
        height: 10,
        backgroundColor: '#007bff',
    },
    checkboxLabel: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
