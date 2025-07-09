import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const  authenticateToken = (req, res, next ) => {
    const authHeader = req.header['authorization'] || req.get('authorization');
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return res.status(401).json({message: "Token not provided"})
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err){
            console.log("Error in authRoute middelware:", err);
            return res.status(403).json({message: "Unauthorize "})
        }
        console.log("Decoded token:", decoded);
        next();
    })
};

export default authenticateToken;