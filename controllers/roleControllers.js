import roleServices from "../services/role/roleServices.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await roleServices.getRoles();
        res.status(roles.status).json({ message: roles.message, data: roles.allRoles });
    } catch (error) {
        res.status(500).json({ message: "Error while getting all roles", error: error.message });
    }
}

export const createRole = async (req, res) => {
    try {
        const { name, group } = req.body;
        const newRole = await roleServices.createRole(name, group);
        res.status(newRole.status).json({ message: newRole.message, data: newRole.newRole });
    } catch (error) {
        res.status(500).json({ message: "Error while creating role", error: error.message });
    }
}

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, group } = req.body;
        const updatedRole = await roleServices.updateRole(id, name, group);
        res.status(updatedRole.status).json({ message: updatedRole.message, data: updatedRole.updatedRole });
    } catch (error) {
        res.status(500).json({ message: "Error while updating role", error: error.message });
    }
}

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRole = await roleServices.deleteRole(id);
        res.status(deletedRole.status).json({ message: deletedRole.message });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting role", error: error.message });
    }
}

