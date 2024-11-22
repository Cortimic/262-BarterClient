// ProfilePage.js
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons' //Used: npm install react-native-vector-icons
import { Text, View, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import ItemPage from './ItemPage';
import SavedItemPage from './SavedItemPage'
import exampleImage from '../assets/testUserPic.jpg'

const ProfilePage = ({ route, navigation }) => {
  const {} = route.params || {};

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image source={exampleImage} style={styles.userImage} /> {/* Need to add profile picture from database */} </View>

        <View style={styles.settingsIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} > 
          <Icon name="settings" size={30} color="#000" /> 
        </TouchableOpacity>
        </View>

      </View>

      
      <Text style={styles.profileFiller}>Jane Doe </Text> {/* Need to add username source from database */}

      
      <TouchableOpacity style={styles.myItemButton} onPress={() => navigation.navigate('ItemPage')}>
                <Text style={styles.itemButtonText}>My Items</Text>
                </TouchableOpacity>
      <TouchableOpacity style={styles.myItemButton} onPress={() => navigation.navigate('SavedItemPage')}>
                <Text style={styles.itemButtonText}>Saved Items</Text>
                </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },

  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    marginVertical: 20,
  },

  imageContainer: {
    flex: 2,
    alignItems: 'center',
    left: 40,
    marginVertical: 10,
  },

  settingsIconContainer: {
    flex: 3,
    alignItems: 'absolute',
    top: 40,
    right: 50,
    left: 200,
    //marginVertical: 20,
  },

  profileFiller: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  myItemButton: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    padding: 10,
    backgroundColor: '#06ACB7',
    borderRadius: 10,
    alignItems: 'center',
},

itemButtonText: {
  color: '#fff',

},

userImage: {
  width: 100,
  height: 100,
  borderRadius: 50,
}

});


export default ProfilePage;
