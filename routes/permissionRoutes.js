import express from "express";

import { authenticateToken } from "../middleware/user_auth.js";
import { checkPermissions } from "../middleware/rolebasedAccess.js";

import { getPermissions, createPermission, updatePermission, deletePermission } from "../controllers/permissionController.js";

const routes = express.Router();

routes.get("/", authenticateToken, checkPermissions("view_P"),  getPermissions);
routes.post("/", authenticateToken, checkPermissions("create_P"), createPermission);
// routes.post("/", authenticateToken, createPermission);
routes.put("/:id", authenticateToken, checkPermissions("edit_P"), updatePermission);
routes.delete("/:id", authenticateToken, checkPermissions("delete_P"), deletePermission);

export default routes;