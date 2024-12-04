const jwt = require("jsonwebtoken");
const { retrieveUserSecret } = require("../services/secretService");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(403).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ error: "Access denied. Invalid token format." });
  }

  try {
    const decoded = jwt.decode(token);
    const userId = decoded.id;

    const userSecret = await retrieveUserSecret(userId);
    if (!userSecret) {
      return res
        .status(401)
        .json({ error: "Invalid token: Secret not found." });
    }

    jwt.verify(token, userSecret); // Verify token using the dynamic secret
    req.user = decoded; // Attach decoded token info to request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Error in token verification:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};
