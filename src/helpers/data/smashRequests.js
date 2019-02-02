import bungieRequests from './bungieRequests';
import userRequests from './userRequests';
import characterRequests from './characterRequests';

const registerBungieUser = (uid, newUser) => new Promise((resolve, reject) => {
  let destiny2MembershipId = '';
  bungieRequests.getBungieAccount(newUser.bungieId)
    .then((bungieAccountResult) => {
      destiny2MembershipId = bungieAccountResult.membershipId;
      const uzer = {
        displayName: bungieAccountResult.displayName,
        destinyMembershipId: destiny2MembershipId,
        destinyMembershipType: bungieAccountResult.membershipType,
        bungieMembershipIcon: `https://www.bungie.net/${bungieAccountResult.iconPath}`,
        bungieMembershipType: newUser.membershipType,
        bungieId: newUser.bungieId,
        uid,
      };
      userRequests.createUser(uzer).then(() => {
        bungieRequests.getDestinyCharacterIds(newUser.membershipType, destiny2MembershipId).then((characterIds) => {
          characterIds.forEach((charId) => {
            bungieRequests.getDestinyCharacter(newUser.membershipType, charId).then((char) => {
              characterRequests.createCharacter(char);
            });
          });
        });
      });
    })
    .catch(err => reject(err));
});

export default {
  registerBungieUser,
};
