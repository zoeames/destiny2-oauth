import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createCharacter = character => axios.post(`${firebaseUrl}/characters.json`, character);

export default {
  createCharacter,
};
