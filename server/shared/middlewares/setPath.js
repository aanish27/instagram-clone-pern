const setPath = (path) => {
  return (req, res, next) => {
    req.storage_path = path;
    next();
  };
};

module.exports = setPath;
