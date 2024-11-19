import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({
  collections: [],
  addCollection: () => {},
  getCollectionsByCategory: () => {},
  getCollectionsGroupedByCategory: () => {},
  deleteCollection: () => {},
});

export const ContextProvider = ({children}) => {
  const [collections, setCollections] = useState([]);

  // Load collections from AsyncStorage when app starts
  useEffect(() => {
    loadCollections();
  }, []);

  // Load collections from storage
  const loadCollections = async () => {
    try {
      const savedCollections = await AsyncStorage.getItem('collections');
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections));
      }
    } catch (error) {
      console.error('Error loading collections:', error);
    }
  };

  // Save new collection
  const addCollection = async (name, category, image,description) => {
    try {
      const newCollection = {
        id: Date.now().toString(), // Simple unique ID
        name,
        category,
        image,
        description,
        createdAt: new Date().toISOString(),
        items: [], // For future items in this collection
      };

      const updatedCollections = [newCollection,...collections];
      setCollections(updatedCollections);
      await AsyncStorage.setItem(
        'collections',
        JSON.stringify(updatedCollections),
      );
      return true;
    } catch (error) {
      console.error('Error adding collection:', error);
      return false;
    }
  };

  // Get collections by category
  const getCollectionsByCategory = category => {
    return collections.filter(collection => collection.category === category);
  };

  // Get all categories with their collections
  const getCollectionsGroupedByCategory = () => {
    return collections.reduce((grouped, collection) => {
      if (!grouped[collection.category]) {
        grouped[collection.category] = [];
      }
      grouped[collection.category].push(collection);
      return grouped;
    }, {});
  };

  const deleteCollection = async (id) => {
    try {
      const updatedCollections = collections.filter(
        collection => collection.id !== id
      );
      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      return true;
    } catch (error) {
      console.error('Error deleting collection:', error);
      return false;
    }
  };

  // Add item to collection
  const addItemToCollection = async (collectionId, itemData) => {
    try {
      const updatedCollections = collections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            items: [
              {
                id: Date.now().toString(),
                ...itemData
              },
              ...collection.items
            ]
          };
        }
        return collection;
      });

      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      return true;
    } catch (error) {
      console.error('Error adding item to collection:', error);
      return false;
    }
  };

  const value = {
    collections,
    addCollection,
    deleteCollection,
    addItemToCollection,
    getCollectionsByCategory,
    getCollectionsGroupedByCategory,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextApp = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContext must be used within a ContextProvider');
  }
  return context;
};
