import permission from '../services/permission/permissionServices.js';

// import { authenticateToken } from '../middleware/user_auth.js';

export const getPermissions = async (req, res) => {
    const response = await permission.getPermissions();
    res.status(response.status).json(response);
}

export const createPermission = async (req, res) => {
    const { name, description } = req.body;
    const response = await permission.createPermission(name, description);
    res.status(response.status).json(response);
}

export const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const response = await permission.updatePermission(id, name, description);
    res.status(response.status).json(response);
}

export const deletePermission = async (req, res) => {
    const { id } = req.params;
    const response = await permission.deletePermission(id);
    res.status(response.status).json(response);
}