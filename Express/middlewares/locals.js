module.exports = async (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.name = req.session.name;
  next();
};
