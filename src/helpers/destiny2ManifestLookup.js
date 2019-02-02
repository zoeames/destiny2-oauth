const genderLookup = (genderHash) => {
  switch (genderHash) {
    case 2204441813:
      return 'Female';
    case 3111576190:
      return 'Male';
    default:
      return 'Unknown';
  }
};

const raceLookup = (raceHash) => {
  switch (raceHash) {
    case 2803282938:
      return 'Awoken';
    case 3887404748:
      return 'Human';
    case 898834093:
      return 'Exo';
    default:
      return 'Unknown';
  }
};

const classLookup = (classHash) => {
  switch (classHash) {
    case 671679327:
      return 'Hunter';
    case 3655393761:
      return 'Titan';
    case 2271682572:
      return 'Warlock';
    default:
      return 'Unknown';
  }
};

export default {
  genderLookup,
  raceLookup,
  classLookup,
};
