mapPreferencesToGenders=(preferences)=> {
  const map = {
    men: ['Male'],
    women: ['Female'],
    'non-binary people': ['Non-Binary'],
  };

  return preferences.flatMap(pref => map[pref] || []);
}

module.exports = {
  mapPreferencesToGenders,
};
