const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({ message: 'No token provided' });
  const parts = header.split(' ');
  if(parts.length !== 2) return res.status(401).json({ message: 'Token error' });
  const [scheme, token] = parts;
  if(!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: 'Malformed token' });
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user._id, email: user.email };
    next();
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' });
  }
};
