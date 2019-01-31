import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const createUser = user => axios.post(`${firebaseUrl}/users.json`, user);

export default {
  createUser,
};
