

import axios from 'axios';
import apiKeys from '../apiKeys';

const bungieApiKey = apiKeys.bungieApi.apiKey;
const bungieBaseUrl = 'https://www.bungie.net/Platform';

const getBungieAccount = bungieId => new Promise((resolve, reject) => {
  axios.get(`${bungieBaseUrl}/User/GetMembershipsById/${bungieId}/0/`, { headers: { 'X-API-Key': bungieApiKey } })
    .then((result) => {
      const bungieUser = result.data.Response;
      const destinyProfile = bungieUser.destinyMemberships[0];
      resolve(destinyProfile);
    })
    .catch((error) => {
      reject(error);
    });
});

const getDestinyCharacterIds = destinyProfileId => new Promise((resolve, reject) => {
  axios.get(`${bungieBaseUrl}/Destiny2/1/Profile/${destinyProfileId}/?components=100 `, { headers: { 'X-API-Key': bungieApiKey } })
    .then((result) => {
      const { characterIds } = result.data.Response.profile.data;
      resolve(characterIds);
    })
    .catch((error) => {
      reject(error);
    });
});

const getDestinyCharacter = characterId => new Promise((resolve, reject) => {
  axios.get(`${bungieBaseUrl}/Destiny2/1/Profile/4611686018452963830/Character/${characterId}/?components=200`, { headers: { 'X-API-Key': bungieApiKey } })
    .then((result) => {
      const character = result.data.Response.character.data;
      resolve(character);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getBungieAccount,
  getDestinyCharacterIds,
  getDestinyCharacter,
};
