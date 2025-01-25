const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateAgent = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const agent = await prisma.agent.findUnique({
      where: { id: decoded.agentId },
    });

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    req.agent = agent; 
    next(); 
  } catch (error) {
    console.error('Error verifying token or fetching agent:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateAgent };
