import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

export const requireAdmin = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Authentication token missing.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_apex_craft_2026_luxury_tailoring');
    
    const user = await AdminUser.findById(decoded.id).select('-passwordHash');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User no longer exists.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
  }
};
