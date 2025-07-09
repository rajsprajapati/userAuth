import groupServices from "../services/group/groupServices.js";

export const getGroups = async (req, res) => {
    try {
        const groups = await groupServices.getGroups();
        res.status(groups.status).json({ message: groups.message, data: groups.allGroups });
    } catch (error) {
        res.status(500).json({ message: "Error while getting all groups", error: error.message });
    }
}

export const createGroup = async (req, res) => {
    try {
        const { name, permission } = req.body;
        const newGroup = await groupServices.createGroup(name, permission);
        res.status(newGroup.status).json({ message: newGroup.message, data: newGroup.newGroup });
    } catch (error) {
        res.status(500).json({ message: "Error while creating group", error: error.message });
    }
}

export const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, permission } = req.body;
        const updatedGroup = await groupServices.updateGroup(id, name, permission);
        res.status(updatedGroup.status).json({ message: updatedGroup.message, data: updatedGroup.updatedGroup });
    } catch (error) {
        res.status(500).json({ message: "Error while updating group", error: error.message });
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGroup = await groupServices.deleteGroup(id);
        res.status(deletedGroup.status).json({ message: deletedGroup.message });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting group", error: error.message });
    }
}

