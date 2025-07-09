import express from 'express';

const routes = express.Router();

import { checkPermissions } from '../middleware/rolebasedAccess.js';

// Import the controller functions
import { getGroups, createGroup, updateGroup, deleteGroup } from '../controllers/groupControllers.js';

// Define the routes
routes.get('/', getGroups); // Get all groups
// routes.get('/', checkPermissions(['edit_profile']), getGroups); // Get all groups
routes.post('/', createGroup); // Create a new group
routes.put('/:id', updateGroup); // Update a group by ID
routes.delete('/:id', deleteGroup); // Delete a group by ID
// Export the routes
export default routes;