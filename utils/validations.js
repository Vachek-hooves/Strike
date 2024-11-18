export const isFormValid = (collectionName, selectedCategory) => {
    return collectionName.trim() !== '' && selectedCategory !== '';
};
