import express from "express";
import { authenticateToken } from "../middleware/user_auth.js";
import { checkPermissions } from "../middleware/rolebasedAccess.js";

const routes = express.Router();

import { getuser, createuser, regester, login, updateuser, deluser, Verify } from "../controllers/usercontroller.js";

routes.get("/", authenticateToken, getuser);
routes.post("/", authenticateToken, checkPermissions('create_user'), createuser); // For admin to create user
// Note: The regester route is for self-registration, allowing users to create their own accounts
routes.post("/register", regester);
routes.put("/:id", authenticateToken, updateuser);
routes.delete("/:id", authenticateToken, deluser);
routes.post("/login", login);
routes.get("/verify/:token", Verify);

export default routes;