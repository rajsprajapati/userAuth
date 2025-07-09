import express from "express";

const routes = express.Router();

// Import the controller functions
import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleControllers.js';

// Define the routes
routes.get('/', getRoles); // Get all roles
routes.post('/', createRole); // Create a new role
routes.put('/:id', updateRole); // Update a role by ID 
routes.delete('/:id', deleteRole); // Delete a role by ID

// Export the routes
export default routes;