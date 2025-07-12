import bcrypt from 'bcrypt';
import User from '../models/usermodel.js';
import { sendSignUpEmail, transporter } from '../utils/mailer.js';
import { generateToken } from '../middleware/user_auth.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

import redis from '../utils/redisClient.js'; // adjust path as needed

class UserServices {

    async getUser(page, limit, skip, Name, useremail, group, role, permission) {
        try {
            const query = {};

            if (Name) query.Name = { $regex: Name, $options: 'i' };
            if (useremail) query.useremail = { $regex: useremail, $options: 'i' };
            if (group) query.group = group;
            if (role) query.role = role;
            if (permission) query.permission = permission;

            
            const cacheKey = `users:page=${page}:limit=${limit}:Name=${Name}:useremail=${useremail}:group=${group}:role=${role}:permission=${permission}`;

            // ✅ Try to fetch from Redis cache
            const cachedData = await redis.get(cacheKey);
            if (cachedData) {
                return {
                    status: 200,
                    message: 'Users fetched from Redis cache',
                    ...JSON.parse(cachedData),
                };
            }
            
           const allUser = await User.find(query)
                .skip(skip)
                .limit(limit)
                .populate('group')
                .populate('role')
                .populate('permission');

            const total = await User.countDocuments(query);

            const response = {
                totalusers: total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
                allUser,
            };

            // ✅ Cache the result for 5 minutes
            await redis.set(cacheKey, JSON.stringify(response), 'EX', 300);

            return {
                status: 200,
                message: 'Users fetched from database',
                ...response,
            };
        } catch (error) {
            console.error('Error in getUser:', error);
            return {
                status: 500,
                message: 'Error while fetching users',
                error: error.message,
            };
        }
    }

    // async createUser(query) {
    async createUser(Name, UserName, password, useremail, role, group, permission) {
        const newUser = new User({ Name, UserName, password, useremail, role, group, permission });
        await newUser.save();
        const data = {
            id: newUser._id.toString(),
            date: new Date()
        }
        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h', });

        if (!token) {
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
            // console.log("Password match:", isMatch);
            if (!isMatch) {
                return {
                    status: 404,
                    message: 'Invalid email or password password not match',
                }
            }

            const user_id = user._id.toString();

            const token = generateToken(user_id);

            // console.log("Generated token:", token);

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