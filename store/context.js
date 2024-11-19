import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext();

export const ContextProvider = ({children}) => {
  const [collections, setCollections] = useState([]);
  console.log('collections', collections);

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
  const addCollection = async (name, category, image) => {
    try {
      const newCollection = {
        id: Date.now().toString(), // Simple unique ID
        name,
        category,
        image,
            createdAt: new Date().toISOString(),
        items: [] // For future items in this collection
      };

      const updatedCollections = [...collections, newCollection];
      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      return true;
    } catch (error) {
      console.error('Error adding collection:', error);
      return false;
    }
  };

  // Get collections by category
  const getCollectionsByCategory = (category) => {
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

  const value = {
    collections,
    addCollection,
   
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
