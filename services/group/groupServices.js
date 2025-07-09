import group from "../../models/groupModel.js";

class GroupServices {

    async getGroups() {
        try {
            const allGroups = await group.find();
            return {
                status: 200,
                message: "Get All Groups successfully",
                allGroups
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while getting groups",
            }
        }
    }

    async createGroup(name, permission) {
        try {
            const newGroup = new group({ name, permission });
            await newGroup.save();
            return {
                status: 201,
                message: "New Group Created successfully",
                newGroup
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while creating group",
            }
        }
    }

    async updateGroup(id, name, permission) {
        try {
            const updatedGroup = await group.findByIdAndUpdate(id, { name, permission }, { new: true });
            if (!updatedGroup) {
                return {
                    status: 404,
                    message: "Group not found"
                }
            }
            return {
                status: 200,
                message: "Group updated successfully",
                updatedGroup
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while updating group",
            }
        }
    }

    async deleteGroup(id) {
        try {
            const deletedGroup = await group.findByIdAndDelete(id);
            if (!deletedGroup) {
                return {
                    status: 404,
                    message: "Group not found"
                }
            }
            return {
                status: 200,
                message: "Group deleted successfully",
                deletedGroup
            }
        } catch (error) {
            return {
                status: 500,
                message: "Error while deleting group",
            }
        }
    }

}

export default new GroupServices();
