const { Profile } = require('../model');

const checkForAuth = async (req, res, next) => {
  const profile = await Profile.findOne({
    where: { id: req.get('profile_id') || 0 },
  });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

const isAdmin = async (req, res, next) => {
  if (!req.headers.key || (req.headers.key !== process.env.ADMIN_SECRET))
    return res.status(401).end();
  next();
};

module.exports = { checkForAuth, isAdmin };
