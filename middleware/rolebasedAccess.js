// // middleware/userRole.js
// export const UserRole = (allowedRoles = []) => {
//     return (req, res, next) => {
//         // Ensure the user is authenticated
//         if (!req.user) {
//             return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//         }

//         // Check if the user's role is in the allowed roles list
//         if (!allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Forbidden: Access denied' });
//         }

//         // If everything is fine, move to the next middleware or route handler
//         next();
//     };
// };





import User from '../models/usermodel.js';

export const checkPermissions = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId)
        .populate({
          path: 'roles',
          populate: { path: 'groups', populate: { path: 'permissions' } }
        })
        .populate({
          path: 'groups',
          populate: { path: 'permissions' }
        });

      let allPermissions = new Set();

      user.group.forEach(group => {
        group.permissions.forEach(p => allPermissions.add(p.name));
      });

      user.role.forEach(role => {
        role.groups.forEach(group => {
          group.permissions.forEach(p => allPermissions.add(p.name));
        });
      });

      if (!allPermissions.has(requiredPermission)) {
        return res.status(403).json({ message: 'Access Denied: Permission not found' });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
};
