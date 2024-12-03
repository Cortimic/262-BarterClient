import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const ItemDetail = ({ route, navigation }) => {
  const { item, toggleInterested, interestedItems } = route.params || {};
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    if (interestedItems) {
      setIsInterested(interestedItems.some(i => i.itemid === item.itemid));
    }
  }, [interestedItems, item]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.itemDescription}>No item details available.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleInterested = () => {
    setIsInterested(!isInterested);
    toggleInterested(item);
  };

  return (
    <View style={styles.container}>
      {item.img && <Image source={item.img} style={styles.itemImage} />}
      <Text style={styles.itemName}>{item.itemname}</Text>
      <Text style={styles.itemDescription}>{item.itemdescription}</Text>
      <Text style={styles.itemLocation}>
        Location: ({item.itemlocation.x}, {item.itemlocation.y})
      </Text>
      <Text style={styles.itemTags}>Tags: {item.itemtags.join(', ')}</Text>
      <Text style={styles.lookingForTags}>
        Looking For: {item.lookingfortags.join(', ')}
      </Text>
      <Text style={styles.itemDate}>Posted on: {formatDate(item.dateposted)}</Text>
      <TouchableOpacity
        style={[
          styles.interestedButton,
          isInterested ? styles.interestedButtonActive : styles.interestedButtonInactive,
        ]}
        onPress={handleInterested}
      >
        <Text style={styles.buttonText}>
          {isInterested ? 'Not Interested' : 'Interested'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemTags: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  lookingForTags: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  itemImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  interestedButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 10,
  },
  interestedButtonActive: {
    borderWidth: 2,
    borderColor: '#4ecdc4',
    backgroundColor: '#4ecdc4',
  },
  interestedButtonInactive: {
    borderWidth: 2,
    borderColor: '#4ecdc4',
    backgroundColor: '#ebfafa',
  },
  backButton: {
    backgroundColor: '#45aaf2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

ItemDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        itemid: PropTypes.number.isRequired,
        itemname: PropTypes.string.isRequired,
        itemdescription: PropTypes.string.isRequired,
        itemlocation: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        }).isRequired,
        dateposted: PropTypes.string.isRequired,
        itemtags: PropTypes.arrayOf(PropTypes.string).isRequired,
        lookingfortags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      toggleInterested: PropTypes.func.isRequired,
      interestedItems: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ItemDetail;
