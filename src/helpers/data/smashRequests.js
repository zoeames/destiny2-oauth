import bungieRequests from './bungieRequests';
import userRequests from './userRequests';

const registerBungieUser = (uid, newUser) => new Promise((resolve, reject) => {
  bungieRequests.getBungieAccount(newUser.bungieId)
    .then((bungieAccountResult) => {
      const uzer = {
        displayName: bungieAccountResult.displayName,
        destinyIconPath: `https://www.bungie.net/${bungieAccountResult.iconPath}`,
        destinyMembershipId: bungieAccountResult.membershipId,
        destinyMembershipType: bungieAccountResult.membershipType,
        bungieMembershipType: newUser.membershipType,
        bungieId: newUser.bungieId,
        uid,
      };
      userRequests.createUser(uzer).then(userCreateResult => resolve(userCreateResult));
    })
    .catch(err => reject(err));
});

export default {
  registerBungieUser,
};
