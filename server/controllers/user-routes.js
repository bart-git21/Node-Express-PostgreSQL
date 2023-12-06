import { db } from "../db.js";

const userRoutes = {
  getUsers: async (req, res) => {
    try {
      //   const role = req.user.role;
      const result = await db.query("SELECT * FROM users");
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "error from getUsers" });
    }
  },

  getOneUser: async (req, res) => {
    try {
      const { id } = req.body;
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      res.send(result.rows[0]);
    } catch (err) {
      console.error("Find error:", err);
    }
  },

  updateUser: (req, response) => {
    try {
      const id = req.params.id;
      db.query("SELECT * from users WHERE id = $1", [id], (err, res) => {
        response.json({ "user:": res.rows[0] });
        return res.rows[0];
      });
    } catch (err) {
      console.error(err);
    }
  },

  deleteUser: (req, res) => {
    try {
      const { id } = req.body;
      db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
      res.json({ "deleted id:": id });
    } catch (err) {
      res.json({ "error from delete function:": err.message });
    }
  },
};

export { userRoutes };
