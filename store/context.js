import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
import { showToast } from '../config/toast/toastConfig';

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
  const addCollection = async (name, category, image, description) => {
    try {
      const newCollection = {
        id: Date.now().toString(),
        name,
        category,
        image,
        description,
        createdAt: new Date().toISOString(),
        items: [],
      };

      const updatedCollections = [newCollection, ...collections];
      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      showToast('success', 'Collection Created', `${name} collection has been created successfully!`);

      // Existing achievements
      if (collections.length === 0) {
        await updateAchievement('firstCollection', 25);
      }

      // New category-specific achievements
      switch (category.toLowerCase()) {
        case 'stamps':
          await updateAchievement('fanOfStamps', 20);
          break;
        case 'custom':
          await updateAchievement('customCollection', 25);
          break;
        case 'antiques':
          await updateAchievement('antiques', 15);
          break;
      }

      // Base points for creating a collection
      await updateScores(10);
      
      return true;
    } catch (error) {
      console.error('Error adding collection:', error);
      showToast('error', 'Error', 'Failed to create collection');
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
        const collection = collections.find(c => c.id === id);
      const updatedCollections = collections.filter(
        collection => collection.id !== id
      );
      setCollections(updatedCollections);
      await AsyncStorage.setItem('collections', JSON.stringify(updatedCollections));
      showToast('success', 'Collection Deleted', `${collection.name} has been deleted`);
      return true;
    } catch (error) {
    //   console.error('Error deleting collection:', error);
    showToast('error', 'Error', 'Failed to delete collection');
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
      showToast('success', 'Item Added', `Item has been added to collection`);

      const collection = collections.find(c => c.id === collectionId);
      const newItemCount = collection.items.length + 1;

      // Existing achievements
      if (newItemCount === 1) {
        await updateAchievement('firstItem', 30);
        showToast('success', 'Achievement Unlocked! 🏆', 'Added your first item');
      }
      if (newItemCount === 10) {
        await updateAchievement('collector10Items', 50);
        showToast('success', 'Achievement Unlocked! 🏆', 'Collector of 10 items');
    }
    
    // New category-specific achievements
    if (collection.category.toLowerCase() === 'stamps' && newItemCount % 5 === 0) {
        // Award points for every 5 stamps
        await updateAchievement('fanOfStamps', 20);
        showToast('success', 'Achievement Unlocked! 🏆', 'Stamp Collection Milestone');
      }

      if (collection.category.toLowerCase() === 'books' && newItemCount % 6 === 0) {
        // Award points for every 6 books
        await updateAchievement('bookCollector', 25);
        showToast('success', 'Achievement Unlocked! 🏆', 'Book Collection Milestone');
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
        const collection = collections.find(c => c.id === collectionId);
        const item = collection.items.find(i => i.id === itemId);

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
      showToast('success', 'Item Deleted', `Item has been removed from ${collection.name}`);
      return true;
    } catch (error) {
    //   console.error('Error deleting item:', error);
    showToast('error', 'Error', 'Failed to delete item');
      return false;
    }
  };

//   const updateAchievement = async (achievementId, points) => {
//     try {
//       const newAchievements = {
//         ...achievements,
//         [achievementId]: true,
//       };
//       setAchievements(newAchievements);
//       await AsyncStorage.setItem('achievements', JSON.stringify(newAchievements));
//       await updateScores(points);
//     } catch (error) {
//       console.error('Error updating achievement:', error);
//     }
//   };

const updateAchievement = async (achievementId, points) => {
    try {
      if (!achievements[achievementId]) {  // Only if achievement not already earned
        const newAchievements = {
          ...achievements,
          [achievementId]: true,
        };
        setAchievements(newAchievements);
        await AsyncStorage.setItem('achievements', JSON.stringify(newAchievements));
        await updateScores(points);
      }
    } catch (error) {
      showToast('error', 'Error', 'Failed to update achievement');
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
