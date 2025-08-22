const User = require('../models/User.js');

const auth = async (req, res, next) => {
  try {
    // Get user ID from request header (simple auth without JWT)
    const userId = req.header('x-auth-user');
    
    if (!userId) {
      return res.status(401).json({ msg: 'No user ID, authorization denied' });
    }
    
    // Find user by ID
    const user = await User.findById(userId).select('-password');
     
    if (!user) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = auth;