import React, { useState, useContext } from 'react';
import {View,TextInput,StyleSheet,Text,FlatList,Button,Modal,TouchableOpacity,ScrollView,Image,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import ItemDetail from './ItemDetail';
import InterestedPage from './InterestedPage';
import { AppContext } from '../App'; // Import the AppContext


const Stack = createNativeStackNavigator();

const allowedTags = ['books','decor','kitchenware','furniture','appliances', 'electronics','toys','games',];

const Market = () => {
  const [interestedItems, setInterestedItems] = useState([]);

  const toggleInterested = (item) => {
    setInterestedItems((prevItems) =>
      prevItems.some((i) => i.name === item.name)
        ? prevItems.filter((i) => i.name !== item.name)
        : [...prevItems, item]
    );
  };

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home">
        {(props) => (
          <MarketPage
            {...props}
            interestedItems={interestedItems}
            toggleInterested={toggleInterested}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ItemDetail">
        {(props) => (
          <ItemDetail
            {...props}
            route={{
              ...props.route,
              params: { ...props.route.params, toggleInterested, interestedItems },
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="InterestedPage">
        {(props) => <InterestedPage {...props} route={{ ...props.route, params: { interestedItems } }} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const MarketPage = ({ navigation, interestedItems, toggleInterested }) => {
  const [searchText, setSearchText] = useState('');
  const [desiredLookingFor, setDesiredLookingFor] = useState(['furniture', 'appliances', 'electronics']);
  const [desiredTags, setDesiredTags] = useState(['decor', 'kitchenware']);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { marketItems } = useContext(AppContext);

  const filterItems = (itemsList, lookingFor, tags, nameText) => {
    return itemsList.filter(
      (item) =>
        item.lookingFor.some((lf) => lookingFor.includes(lf)) &&
        item.tags.some((tag) => tags.includes(tag)) &&
        (!nameText || item.name.toLowerCase().includes(nameText.toLowerCase()))
    );
  };

  const toggleSelection = (item, setState, getState) => {
    setState(getState.includes(item) ? getState.filter((i) => i !== item) : [...getState, item]);
  };

  const renderFilterDialog = () => (
    <Modal
      transparent
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.filterTitle}>I'm Looking For</Text>
            {allowedTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagOption,
                  desiredTags.includes(tag) ? styles.selectedOption : styles.unselectedOption,
                ]}
                onPress={() => toggleSelection(tag, setDesiredTags, desiredTags)}
              >
                <Text style={desiredTags.includes(tag) ? styles.selectedText : styles.unselectedText}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.filterTitle}>I'm Trading Away</Text>
            {allowedTags.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.tagOption,
                  desiredLookingFor.includes(category)
                    ? styles.selectedOption
                    : styles.unselectedOption,
                ]}
                onPress={() => toggleSelection(category, setDesiredLookingFor, desiredLookingFor)}
              >
                <Text
                  style={
                    desiredLookingFor.includes(category)
                      ? styles.selectedText
                      : styles.unselectedText
                  }
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setFilterModalVisible(false)} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const filteredItems = filterItems(marketItems, desiredLookingFor, desiredTags, searchText);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ItemDetail', { item })}
    >
      <Image source={item.img} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.desc}</Text>
        <Text>Tags: {item.tags.join(', ')}</Text>
        <Text>Looking For: {item.lookingFor.join(', ')}</Text>
        <Text>Location: {item.location}</Text>
      </View>
      <TouchableOpacity
        style={styles.savedIcon}
        onPress={() => toggleInterested(item)}
      >
        <Ionicons
          name={interestedItems.some((i) => i.name === item.name) ? 'heart' : 'heart-outline'}
          size={24}
          color={interestedItems.some((i) => i.name === item.name) ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for items..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.interestedCount}
          onPress={() => navigation.navigate('InterestedPage', { interestedItems })}
        >
          <Text style={styles.interestedCountText}>Saved Items: {interestedItems.length}</Text>
        </TouchableOpacity>
        <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
      </View>
      {filteredItems.length > 0 ? (
        <FlatList data={filteredItems} keyExtractor={(item, index) => index.toString()} renderItem={renderItem} />
      ) : (
        <Text style={styles.noItemsText}>No items match your filters.</Text>
      )}
      {renderFilterDialog()}
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        flexDirection: "row",
        marginBottom: 10
    },
    searchInput: {
        flex: 1,
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginRight: 10
    },
    itemContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    itemDetails: {
        flex: 1,
        padding: 10,
        flexShrink: 1,
    },
    itemName: {
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    tagOption: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#1ABC9C',
    },
    unselectedOption: {
        backgroundColor: '#f3f3f3',
    },
    noItemsText: {
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
    },

    itemImage: {
        width: '35%',
        height: "100%",
        resizeMode: "stretch",
    },
    header: {
        marginBottom: 16,
        position: 'relative',
    },
    interestedCount: {
        position: 'absolute',
        top: -30,
        right: 10,
        backgroundColor: '#1ABC9C',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        zIndex: 1,
    },
    interestedCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }, header: {
        marginBottom: 16,
    },
    searchContainer: {
        position: 'relative',
        marginBottom: 10,
        paddingTop: 30,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    interestedCount: {
        position: 'absolute',
        top: -5,
        right: 10,
        backgroundColor: '#1ABC9C',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    interestedCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
// const items = [
//     {
//         img: require('./item-images/squish.png'),
//         name: "Squishmallow",
//         desc: "Destroyer of worlds but a very squishy lil guy",
//         location: "Calvin",
//         lookingFor: ["decor", "toys"],
//         owner: "Landon",
//         postedDate: "10-21-2024",
//         tags: ["decor", "toys"]
//     },
// ];