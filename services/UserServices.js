import bcrypt from 'bcrypt';
import User from '../models/usermodel.js';
import { sendSignUpEmail, transporter } from '../utils/mailer.js';
import { generateToken } from '../middleware/user_auth.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class UserServices {

    async getUser() {
        try {
            const allUser = await User.find();
            return {
                status: 200,
                message: "Get All User successfully",
                allUser
            }
        } catch (error) {
            return {
                status: 200,
                message: " Error while Get All User",
            }
        }
    }

    // async createUser(query) {
    async createUser( Name, UserName, password, useremail, role, group, permission) {
        const newUser = new User({ Name, UserName, password, useremail, role, group, permission });
        await newUser.save();
        const data = {
            id: newUser._id.toString(),
            date: new Date()
        }
        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h', });
        
        if(!token) {
            return {
                status: 500,
                message: "Error generating token"
            }
        }

        await sendSignUpEmail(useremail, token);
        // await transporter.transporter;
        return {
            status: 200,
            message: "New User Created successfully",
            newUser,
            token
        }

    }

    async login(UserName, password) {
        try {

            const user = await User.findOne({ UserName });
            if (!user) {
                return {
                    status: 404,
                    message: "User Not found",
                }
            }

            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match:", isMatch);
            if (!isMatch) {
                return {
                    status: 404,
                    message: 'Invalid email or password password not match',
                }
            }

            const user_id = user._id.toString();

            const token = generateToken(user_id);

            console.log("Generated token:", token);

            return {
                status: 200,
                message: "User logged in successfully",
                user,
                token
            }
        } catch (error) {
            return {
                status: 500,
                message: "Internal Server Error",
                error: error.message
            }
        }

    }

    async UpdateUser(id, data) {
        const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
        return {
            status: 200,
            message: "User Updated ",
            updateUser
        }
    }

    async deleteUser(id) {
        const deluser = await User.findByIdAndDelete(id);
        return {
            status: 200,
            message: "User deleted successfully",
            deluser
        }
    }

    async verifyEmail(token) {
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decoded.id);

            if (!user) {
                return {
                    status: 400,
                    message: 'Invalid token'
                };
            }

            if (user.isVerified) {
                return {
                    status: 200,
                    message: 'Email already verified'
                };
            }

            // Update the user's verification status
            user.isVerified = true;
            await user.save();

            return {
                status: 200,
                message: 'Email verified successfully'
            };

        } catch (err) {
            return {
                status: 400,
                message: err.message
            };
        }
    }


}

export default new UserServices();