const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log({ verified });
    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { auth };
