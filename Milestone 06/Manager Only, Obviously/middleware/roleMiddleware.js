export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Ensure authMiddleware has already populated req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    // 2. Check if the authenticated user's role is permitted
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required: ${allowedRoles.join(' or ')}.`,
      });
    }

    next();
  };
};