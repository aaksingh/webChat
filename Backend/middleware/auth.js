import jwt from "jsonwebtoken";
import { secret } from "../secret/secret.js";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decoedData;

    if (token) {
      decoedData = jwt.verify(token, secret);
      req.userID = decoedData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
