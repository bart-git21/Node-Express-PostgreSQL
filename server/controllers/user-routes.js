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
    console.log("body: ", req.body);
    console.log("params: ", req.params);
    try {
      const id = req.params.id;
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      res.send(result.rows[0]);
    } catch (err) {
      console.error("Find error:", err);
    }
  },

  updateUser: (req, response) => {
    console.log(req.body);
    console.log(req.params);
    try {
      const { id } = req.body;
      db.query("SELECT * FROM users WHERE id = $1", [id], (err, res) => {
        return response.json(res.rows[0]);
      });
    } catch (err) {
      console.error(err);
    }
  },

  deleteUser: async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    try {
      const { id } = req.body;
      console.log(id);
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json({ "result: ": result.rows[0], "deleted id:": id });
    } catch (err) {
      res.json({ "error from delete function:": err.message });
    }
  },
};

export { userRoutes };
