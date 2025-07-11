import { updateUserPermissions } from "../utils/updatepermission.js";

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

            const userPermissions = await updateUserPermissions(req.user._id.toString());
            const permissionSet = new Set(userPermissions);
            
            console.log('requiredPermission:', requiredPermission);

            if (!permissionSet.has(requiredPermission)) {
                return res.status(403).json({ message: 'Forbidden: Access denied'});
            }
    
            // console.log('access granted for user:', req.user.UserName);
            next();
        } catch (error) {
            console.error('Error in checkPermissions middleware:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
};
