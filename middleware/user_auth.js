import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
import User from '../models/usermodel.js'
// import { sendSignUpEmail } from '../utils/mailer.js';

dotenv.config();

export const  authenticateToken = (req, res, next ) => {
    const authHeader = req.header['authorization'] || req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json({message: "Token not provided"})
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err){
            console.log("Error in authRoute middelware:", err);
            return res.status(403).json({message: "Unauthorize "})
        }
        // console.log("user token data: ",decoded);
        req.user = await User.findById(decoded.id, {permission: 1, isSuperAdmin:1}).populate('permission');
        // console.log("user data: ", req.user);
        next();
    })
};

export const generateToken = (user_id) => {
    const data = {
        id: user_id,
        data: new Date(),
        // userRole: userRole
    };
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
    });
    return token;
    // const status = await sendSignUpEmail(email, token);
}