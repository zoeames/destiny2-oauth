import axios from 'axios';
import apiKeys from '../apiKeys';

import authRequests from './authRequests';
import destiny2ManifestLookup from '../destiny2ManifestLookup';

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

const getDestinyCharacterIds = (membershipTypeId, destinyProfileId) => new Promise((resolve, reject) => {
  axios.get(`${bungieBaseUrl}/Destiny2/${membershipTypeId}/Profile/${destinyProfileId}/?components=100 `, { headers: { 'X-API-Key': bungieApiKey } })
    .then((result) => {
      const { characterIds } = result.data.Response.profile.data;
      resolve(characterIds);
    })
    .catch((error) => {
      reject(error);
    });
});

const getDestinyCharacter = (membershipTypeId, characterId) => new Promise((resolve, reject) => {
  axios.get(`${bungieBaseUrl}/Destiny2/${membershipTypeId}/Profile/4611686018452963830/Character/${characterId}/?components=200`, { headers: { 'X-API-Key': bungieApiKey } })
    .then((result) => {
      const character = result.data.Response.character.data;
      const newCharacter = {
        characterId: character.characterId,
        light: character.light,
        gender: destiny2ManifestLookup.genderLookup(character.genderHash),
        race: destiny2ManifestLookup.raceLookup(character.raceHash),
        class: destiny2ManifestLookup.classLookup(character.classHash),
        emblemBackgroundPath: `https://www.bungie.net/${character.emblemBackgroundPath}`,
        emblemPath: `https://www.bungie.net/${character.emblemPath}`,
        level: character.levelProgression.level,
        uid: authRequests.getCurrentUid(),
      };
      resolve(newCharacter);
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
