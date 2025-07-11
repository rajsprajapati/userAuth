import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },

  group: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  }],

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },

  permission: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  }],

  isVerified: {
    type: Boolean,
    default: false,
  },

  isSuperAdmin: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

// Hash password before save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
