import {useContextApp} from '../../store/context';
const {addCollection} = useContextApp();

export const createCollectionHandler = async (name, category) => {
  return success = await addCollection(name, category);
};
