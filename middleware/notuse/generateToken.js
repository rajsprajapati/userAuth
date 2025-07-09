import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user) => {
    // (req, res, next) => {}
    const data = {
        id: user,
        date: new Date(),
    };
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

export default generateToken;