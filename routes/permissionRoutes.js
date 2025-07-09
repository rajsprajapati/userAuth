import express from "express";

import { authenticateToken } from "../middleware/user_auth.js";

import { getPermissions, createPermission, updatePermission, deletePermission } from "../controllers/permissionController.js";

const routes = express.Router();

routes.get("/", getPermissions);
routes.post("/", createPermission);
// routes.post("/", authenticateToken, createPermission);
routes.put("/:id", updatePermission);
routes.delete("/:id", deletePermission);

export default routes;