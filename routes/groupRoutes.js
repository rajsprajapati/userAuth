import express from 'express';

const routes = express.Router();

import { checkPermissions } from '../middleware/rolebasedAccess.js';
import { authenticateToken } from '../middleware/user_auth.js';

// Import the controller functions
import { getGroups, createGroup, updateGroup, deleteGroup } from '../controllers/groupControllers.js';

// Define the routes
routes.get('/', 
    authenticateToken, checkPermissions("view_G"), 
    getGroups); // Get all groups
// routes.get('/', checkPermissions(['edit_profile']), getGroups); // Get all groups
routes.post('/', 
    authenticateToken, checkPermissions("create_G"), 
    createGroup); // Create a new group
routes.put('/:id', 
    authenticateToken, checkPermissions("edit_G"), 
    updateGroup); // Update a group by ID
routes.delete('/:id', 
    authenticateToken, checkPermissions("delete_G"), 
    deleteGroup); // Delete a group by ID
// Export the routes
export default routes;