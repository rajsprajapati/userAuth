import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Permission = mongoose.model("Permission", PermissionSchema);

export default Permission;