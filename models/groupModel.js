import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permission: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Permission' 
    }],
}, {
    timestamps: true
});

const Group = mongoose.model("Group", groupSchema);

export default Group;