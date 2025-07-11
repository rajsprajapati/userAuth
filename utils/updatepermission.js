import User from '../models/usermodel.js';
import redis from '../utils/redisClient.js'; // adjust path as needed

export const updateUserPermissions = async (userId) => {
  // Check if permissions are already cached
  const cachedPerms = await redis.get(`user:permissions:${userId}`);
  if (cachedPerms) {
    return JSON.parse(cachedPerms);
  }

  // Not in cache, so fetch from DB
  const user = await User.findById(userId)
    .populate({
      path: 'group',
      populate: { path: 'permission' }
    })
    .populate("permission")
    .lean();

  const perms = new Set([
    ...(user.group?.flatMap(g => g.permission.map(p => p.name)) || []),
    ...(user.permission?.map(p => p.name) || [])
  ]);

  const finalPerms = [...perms];

  // Cache in Redis with TTL of 5 minutes (300 seconds)
  await redis.setex(`user:permissions:${userId}`, 300, JSON.stringify(finalPerms));

  return finalPerms;
};
