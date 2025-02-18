import jsonwebtoken from "jsonwebtoken";

export const userMiddleware = async (req, res, next) => {
  try {
    console.log("req.headers: ", req.headers);
    if (req.headers.authorization === undefined) {
      return res.status(400).json({
        msg: "No token found ...",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(400).json({
        msg: "No token found ... ",
      });
    }
    // verifying the token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    // check the expiry of the token
    // decoded:  { id: '67b3511ce035adbb0c9c6930', iat: 1739889761, exp: 1739893361 }
    console.log("time: ", new Date().getTime());
    const currentTime = new Date().getTime() / 1000;
    console.log("current time: ", currentTime);
    if (decoded.exp < currentTime) {
      return res.status(400).json({
        msg: "Token expired ...",
      });
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
        msg: error.message
    });
  }
};
