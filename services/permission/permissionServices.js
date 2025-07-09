import Permission from "../../models/permissionModel.js";

class PermissionServices {

    async getPermissions() {
        try {
            const allPermissions = await Permission.find();
            return {
                status: 200,
                message: "Get All Permissions successfully",
                allPermissions
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while getting permissions",
            }
        }
    }

    async createPermission(name, description) {
        try {
            const newPermission = new Permission({ name, description });
            await newPermission.save();
            return {
                status: 201,
                message: "New Permission Created successfully",
                newPermission
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while creating permission",
            }
        }
    }

    async updatePermission(id, name, description) {
        try {
            const updatedPermission = await Permission.findByIdAndUpdate(id, { name, description }, { new: true });
            if (!updatedPermission) {
                return {
                    status: 404,
                    message: "Permission not found"
                }
            }
            return {
                status: 200,
                message: "Permission updated successfully",
                updatedPermission
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while updating permission",
            }
        }
    }

    async deletePermission(id) {
        try {
            const deletedPermission = await Permission.findByIdAndDelete(id);
            if (!deletedPermission) {
                return {
                    status: 404,
                    message: "Permission not found"
                }
            }
            return {
                status: 200,
                message: "Permission deleted successfully",
                deletedPermission
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while deleting permission",
            }
        }
    }

}
export default new PermissionServices();