// middleware/userRole.js
import User from '../models/usermodel.js';
export const checkPermissions = (requiredPermission) => {
    return async (req, res, next) => {
        // Ensure the user is authenticated
        try {
            
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
            }
            
            if (req.user.isSuperAdmin) {
                return next();
            }

           

            const permissionSet = new Set(req.user.permission.map(p => p.name));

            
            if (!permissionSet.has(requiredPermission)) {
                return res.status(403).json({ message: 'Forbidden: Access denied'});
            }
    
            next();
        } catch (error) {
            console.error('Error in checkPermissions middleware:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
};
