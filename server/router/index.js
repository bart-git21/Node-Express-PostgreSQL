import express from "express";
import { validationRules, validation } from "./../middleware/validation.js";
import authorization from "./../middleware/authorization.js";
import { controller } from "./../controllers/index.js";

const router = express.Router();

router.post("/auth/registration", controller.registration);
router.post("/auth/login", validationRules, validation, controller.login);
router.get("/auth/refresh", controller.refresh);
router.delete("/auth/refresh", authorization, controller.logout);

router.get("/users", authorization, controller.getUsers);
router.get("/user/:id", controller.getOneUser);
router.delete("/user", controller.deleteUser);
router.put("/user/:id", controller.updateUser);

export { router };
