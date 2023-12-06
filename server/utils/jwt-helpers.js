import "dotenv/config";
import jwt from "jsonwebtoken";

const jwtToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "15m"}
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: "15 days"}
  );
  return { accessToken, refreshToken };
};

export default jwtToken;