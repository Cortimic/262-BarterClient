import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ItemPage() {
    const navigation = useNavigation();
    const route = useRoute();

    const { username, userItems = [] } = route.params || {}; // Fetch data from route params
    const [itemList, setItemList] = useState(userItems);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemTouchable} onPress={() => handleNavigateToDetail(item)}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.itemname}</Text>
                <Text style={styles.itemDescription}>{item.itemdescription}</Text>
                <Text style={styles.itemLocation}>
                    Location: ({item.itemlocation.x}, {item.itemlocation.y})
                </Text>
                <Text style={styles.itemDate}>Posted on: {formatDate(item.dateposted)}</Text>
                <Text style={styles.itemTags}>
                    Tags: {item.itemtags.join(', ')}
                </Text>
                <Text style={styles.lookingForTags}>
                    Looking For: {item.lookingfortags.join(', ')}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const handleNavigateToDetail = (item) => {
        navigation.navigate('ItemDetail', { item });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {username || 'Guest'}</Text>
            {itemList.length > 0 ? (
                <>
                    <Text style={styles.itemsTitle}>Your Items:</Text>
                    <FlatList
                        data={itemList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.itemid.toString()}
                        style={styles.list}
                    />
                </>
            ) : (
                <Text style={styles.emptyListText}>No items to display.</Text>
            )}
        </View>
    );
}

// const marketItems = [
//     //Contains dummy market data
//     {
//         img: "image.jpg",
//         name: "Item1",
//         desc: "This is the description of item 1",
//         location: "49546",
//         lookingFor: ["furniture", "appliances", "decor"],
//         owner: "User1",
//         postedDate: "10-21-2024",
//         tags: ["furniture", "electronics"]
//     },
//     {
//         img: "exampleImage.jpg",
//         name: "Item2",
//         desc: "This is the description of item 2",
//         location: "90210",
//         lookingFor: ["furniture", "electronics", "kitchenware"],
//         owner: "User2",
//         postedDate: "10-15-2024",
//         tags: ["appliances", "furniture"]
//     },
//     {
//         img: "anotherImage.png",
//         name: "Item3",
//         desc: "This is the description of item 3",
//         location: "30301",
//         lookingFor: ["books", "furniture", "decor"],
//         owner: "User3",
//         postedDate: "09-30-2024",
//         tags: ["books", "decor"]
//     },
//     {
//         img: "item4.jpg",
//         name: "Item4",
//         desc: "This is the description of item 4",
//         location: "60614",
//         lookingFor: ["furniture", "decor"],
//         owner: "User4",
//         postedDate: "10-10-2024",
//         tags: ["furniture", "toys"]
//     },
//     {
//         img: "item5.jpg",
//         name: "Item5",
//         desc: "This is the description of item 5",
//         location: "77005",
//         lookingFor: ["furniture", "appliances"],
//         owner: "User5",
//         postedDate: "09-25-2024",
//         tags: ["appliances", "kitchenware"]
//     },
//     {
//         img: "item6.png",
//         name: "Item6",
//         desc: "This is the description of item 6",
//         location: "33101",
//         lookingFor: ["appliances", "electronics", "furniture"],
//         owner: "User6",
//         postedDate: "10-05-2024",
//         tags: ["appliances", "furniture"]
//     },
//     {
//         img: "item7.png",
//         name: "Item7",
//         desc: "This is the description of item 7",
//         location: "80202",
//         lookingFor: ["furniture", "decor"],
//         owner: "User7",
//         postedDate: "10-08-2024",
//         tags: ["decor", "books"]
//     },
//     {
//         img: "item8.jpg",
//         name: "Item8",
//         desc: "This is the description of item 8",
//         location: "98101",
//         lookingFor: ["kitchenware", "furniture", "decor"],
//         owner: "User8",
//         postedDate: "09-28-2024",
//         tags: ["kitchenware", "furniture"]
//     },
//     {
//         img: "item9.jpg",
//         name: "Item9",
//         desc: "This is the description of item 9",
//         location: "15213",
//         lookingFor: ["books", "decor"],
//         owner: "User9",
//         postedDate: "10-12-2024",
//         tags: ["books", "decor"]
//     }
// ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
    },
    subtitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    list: {
        marginTop: 20,
    },
    itemTouchable: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemContainer: {
        paddingVertical: 15,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
    },
    itemDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    itemsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    emptyListText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 50,
        fontSize: 16,
    },


    skipButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    skipButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

