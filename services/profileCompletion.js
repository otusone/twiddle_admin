module.exports = function calculateProfileCompletion(user) {
  let score = 0;

  const steps = [
    !!user.fullName,
    !!user.dateOfBirth,
    !!user.gender,
    !!user.email,
    !!user.purpose,
    !!(user.preference && user.preference.length),
    !!(user.interest && user.interest.length),
    !!(user.discover && user.discover.length),
    !!(user.profilePhotos && user.profilePhotos.length),
    !!user.bio,
    !!user.location && user.location.coordinates && user.location.coordinates.some(Boolean),
    !!(user.languages && user.languages.length),
    !!user.jobTitle || !!user.education || !!user.company,
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter(Boolean).length;

  score = Math.round((completedSteps / totalSteps) * 100);
  return score;
};
