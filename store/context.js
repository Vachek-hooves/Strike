import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({
  collections: [],
  addCollection: () => {},
  getCollectionsByCategory: () => {},
  getCollectionsGroupedByCategory: () => {},
  getCollectionById: () => {},
  deleteCollection: () => {},
  deleteItemFromCollection: () => {},
  achievements: {},
  scores: 0,
  updateAchievements: () => {},
});

export const ContextProvider = ({children}) => {
  const [collections, setCollections] = useState([]);
  const [achievements, setAchievements] = useState({});
  const [scores, setScores] = useState(0);

  // Load collections from AsyncStorage when app starts
  useEffect(() => {
    loadCollections();
    loadAchievements();
    loadScores();
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

  const loadAchievements = async () => {
    try {
      const savedAchievements = await AsyncStorage.getItem('achievements');
      if (savedAchievements) {
        setAchievements(JSON.parse(savedAchievements));
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  };

  const loadScores = async () => {
    try {
      const savedScores = await AsyncStorage.getItem('scores');
      if (savedScores) {
        setScores(parseInt(savedScores));
      }
    } catch (error) {
      console.error('Error loading scores:', error);
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

      // Add achievement for first collection
      if (collections.length === 0) {
        await updateAchievement('firstCollection', 25);
      }
      
      // Add base points for creating a collection
      await updateScores(10);
      
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
          const updatedCollection = {
            ...collection,
            items: [
              {
                id: Date.now().toString(),
                ...itemData
              },
              ...collection.items
            ]
          };
          return updatedCollection;
        }
        return collection;
      });

    setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));

      const collection = collections.find(c => c.id === collectionId);
      const newItemCount = collection.items.length + 1;

      // Add achievement for first item
      if (newItemCount === 1) {
        await updateAchievement('firstItem', 30);
      }

      // Check for 10 items achievement
      if (newItemCount === 10) {
        await updateAchievement('collector10Items', 50);
      }

      // Add base points for adding an item
      await updateScores(10);

      return true;
    } catch (error) {
      console.error('Error adding item to collection:', error);
      return false;
    }
  };

  // Add getCollectionById function
  const getCollectionById = (id) => {
    return collections.find(collection => collection.id === id);
  };

  const deleteItemFromCollection = async (collectionId, itemId) => {
    try {
      const updatedCollections = collections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            items: collection.items.filter(item => item.id !== itemId)
          };
        }
        return collection;
      });

      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  };

  const updateAchievement = async (achievementId, points) => {
    try {
      const newAchievements = {
        ...achievements,
        [achievementId]: true,
      };
      setAchievements(newAchievements);
      await AsyncStorage.setItem('achievements', JSON.stringify(newAchievements));
      await updateScores(points);
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const updateScores = async (points) => {
    try {
      const newScores = scores + points;
      setScores(newScores);
      await AsyncStorage.setItem('scores', newScores.toString());
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  const value = {
    collections,
    addCollection,
    deleteCollection,
    addItemToCollection,
    getCollectionsByCategory,
    getCollectionsGroupedByCategory,
    getCollectionById,
    deleteItemFromCollection,
    achievements,
    scores,
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
