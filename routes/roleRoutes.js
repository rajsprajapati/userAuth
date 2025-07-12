import express from "express";
import { authenticateToken } from "../middleware/user_auth.js";
import { checkPermissions } from "../middleware/rolebasedAccess.js";


const routes = express.Router();

// Import the controller functions
import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleControllers.js';

// Define the routes
routes.get('/', authenticateToken, checkPermissions("view_R"), getRoles); // Get all roles
routes.post('/', authenticateToken, checkPermissions("create_R"), createRole); // Create a new role
routes.put('/:id', authenticateToken, checkPermissions("edit_R"), updateRole); // Update a role by ID 
routes.delete('/:id', authenticateToken, checkPermissions("delete_R"), deleteRole); // Delete a role by ID

// Export the routes
export default routes;