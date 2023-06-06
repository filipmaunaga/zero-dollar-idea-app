import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // verify if user is authenticated

  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization?.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    const userId = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
