import express from "express";

import { authenticateToken } from "../middleware/user_auth.js";
import { checkPermissions } from "../middleware/rolebasedAccess.js";

import { getPermissions, createPermission, updatePermission, deletePermission } from "../controllers/permissionController.js";

const routes = express.Router();

routes.get("/", authenticateToken, checkPermissions("super_admin"),  getPermissions);
routes.post("/", authenticateToken, checkPermissions("super_admin"), createPermission);
// routes.post("/", authenticateToken, createPermission);
routes.put("/:id", authenticateToken, checkPermissions("super_admin"), updatePermission);
routes.delete("/:id", authenticateToken, checkPermissions("super_admin"), deletePermission);

export default routes;