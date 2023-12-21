import "dotenv/config";
import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtToken from "./../utils/jwt-helpers.js";

const authRoutes = {
  registration: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
      );
      res.status(201).json(`user added with ID: ${newUser.rows[0].id}`);
    } catch (err) {
      res.json({ "error from registration": err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const authUser = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (authUser.rows.length === 0) {
        return res.status(401).json({ error: "Email is incorrect" });
      }

      const isValidPassword = await bcrypt.compare(
        password,
        authUser.rows[0].password
      );
      if (!isValidPassword) {
        return res.status(401).json({ error: "the password is incorrect" });
      }

      const tokens = jwtToken(authUser.rows[0]);
      res.cookie("access_token", tokens.accessToken, { httpOnly: true });
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });

      return res.status(200).json({
        id: authUser.rows[0].id,
        name: authUser.rows[0].name,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (err) {
      console.error("error: ", err.message);
    }
  },

  refresh: (req, res) => {
    console.log("from refresh  controller");
    try {
      const refreshToken = req.cookies.refresh_token;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err)
            return res.status(403).json({ "403 error from refresh": err });
          const tokens = jwtToken(payload);
          res.cookie("access_token", tokens.accessToken, { httpOnly: true });
          //   res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
          res.status(200).json({
            "access token: ": tokens.accessToken,
            "refresh token:": tokens.refreshToken,
          });
        }
      );
    } catch (err) {
      console.error("error from refresh: ", err.message);
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.status(200).json({ message: "Successfully logged out 😏 🍀" });
    } catch (err) {
      res.status(401).json({ "log out 401 error: ": err.message });
    }
  },
};

export { authRoutes };
