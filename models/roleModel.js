import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    group: [{
        type: mongoose.Types.ObjectId,
        ref: "Group",
        required: true
    }],
}, {
    timestamps: true
});

const Role = mongoose.model("Role", roleSchema);

export default Role;