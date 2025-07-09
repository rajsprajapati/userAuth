import role from "../../models/roleModel.js"; // Adjust the import path as necessary

class RoleServices {

    async getRoles() {
        try {
            const allRoles = await role.find().populate('group');
            return {
                status: 200,
                message: "Get All Roles successfully",
                allRoles
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while getting roles",
            }
        }
    }

    async createRole(name, group) {
        try {
            const newRole = new role({ name, group });
            await newRole.save();
            return {
                status: 201,
                message: "New Role Created successfully",
                newRole
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while creating role",
            }
        }
    }

    async updateRole(id, name, group) {
        try {
            const updatedRole = await role.findByIdAndUpdate(id, { name, group }, { new: true });
            if (!updatedRole) {
                return {
                    status: 404,
                    message: "Role not found"
                }
            }
            return {
                status: 200,
                message: "Role updated successfully",
                updatedRole
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while updating role",
            }
        }
    }

    async deleteRole(id) {
        try {
            const deletedRole = await role.findByIdAndDelete(id);
            if (!deletedRole) {
                return {
                    status: 404,
                    message: "Role not found"
                }
            }
            return {
                status: 200,
                message: "Role deleted successfully"
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while deleting role",
            }
        }
    }
}

export default new RoleServices();