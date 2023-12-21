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
      const id = req.params.id;
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      res.status(200).send(result.rows[0]);
    } catch (err) {
      console.error("Find error:", err.message);
    }
  },

  updateUser: (req, response) => {
    try {
      const { id } = req.body;
      db.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
        return response.status(200).json({"updated user: ": res.rows[0]});
      });
    } catch (err) {
      console.error(err.message);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        res.status(200).json({ "result: ": result.rows[0], "deleted id:": id });
    } catch (err) {
      res.json({ "error from delete function:": err.message });
    }
  },
};

export { userRoutes };
