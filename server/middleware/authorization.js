import "dotenv/config";
import jwt from "jsonwebtoken";

export default function authorization(req, res, next) {
    try {
      const accessToken = req.cookies.access_token;
      if (accessToken) {
        jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET,
          (err, payload) => {
            if (err) return res.status(403).json({ "403 error": err });
            req.user = payload;
            next();
          }
        );
      } else {
        res.status(401).json({ error: "Null token, Not authorized" });
      }
    } catch (err) {
      console.error("error from authenticate:", err);
    }
}