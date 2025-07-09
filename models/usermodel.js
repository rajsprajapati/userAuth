import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import Template from "./templateModel";

const User = new mongoose.Schema({
    Name : {
        type : String,
        require: true,

    },
    UserName : {
        type: String,
        require: true,
        unique: true
                
    },
    password : {
        type: String,
        require: true
    },
    useremail: {
        type : String,
        require: true,
        unique: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        require: true,
        default: "User"
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        require: true,
        default: "User"
    },
    permission: {
        // type: [mongoose.Schema.Types.Mixed],
        type: [String],
        ref: "Permission",
        require: true
    },
    isVerified: {
    type: Boolean,
    default: false  // default as boolean false
    }
},{
    timestamps: true
})

User.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const user = mongoose.model("User", User);

export default user;