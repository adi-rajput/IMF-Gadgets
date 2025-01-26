const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { log } = require('console');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const agentFirstNames = ['James', 'Sophia', 'Alexander', 'Victoria', 'Evelyn', 'Sebastian', 'Charlotte', 'Oliver', 'Isabella', 'Maximilian'];
const agentLastNames = ['Carter', 'Hawkins', 'Montgomery', 'Weston', 'Knight', 'Davenport', 'Blackwood', 'Sinclair', 'Caldwell', 'Grayson'];

const generateRandomAgentName = () => {
  const firstName = agentFirstNames[Math.floor(Math.random() * agentFirstNames.length)];
  const lastName = agentLastNames[Math.floor(Math.random() * agentLastNames.length)];
  return `${firstName} ${lastName}`;
};

const registerAgent = async (req, res) => {
  const { agentEmail, agentSecretKey } = req.body;

  if (!agentEmail || !agentSecretKey) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const agentName = generateRandomAgentName();
  console.log(`Generated random agent name: ${agentName}`);

  try {
    const existingAgent = await prisma.agent.findUnique({
      where: { agentEmail }
    });

    if (existingAgent) {
      return res.status(400).json({ message: 'Agent with this email already exists' });
    }

    const hashedSecretKey = await bcrypt.hash(agentSecretKey, 10);

    const newAgent = await prisma.agent.create({
      data: {
        agentName,
        agentEmail,
        agentSecretKey: hashedSecretKey
      }
    });

    return res.status(201).json({ message: 'Agent registered successfully', agent: newAgent });
  } catch (error) {
    console.error('Error registering agent:', error);
    return res.status(500).json({ message: 'Failed to register agent' });
  }
};

const loginAgent = async (req, res) => {
    const { agentEmail, agentSecretKey } = req.body;
  
    if (!agentEmail || !agentSecretKey) {
      return res.status(400).json({ message: 'Email and secret key are required' });
    }
  
    try {
      const agent = await prisma.agent.findUnique({
        where: { agentEmail },
      });
  
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
  
      const isSecretKeyValid = await bcrypt.compare(agentSecretKey, agent.agentSecretKey);
  
      if (!isSecretKeyValid) {
        return res.status(401).json({ message: 'Invalid secret key' });
      }
  
      const token = jwt.sign(
        { agentId: agent.agentId, agentEmail: agent.agentEmail },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      return res.cookie(
        "token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
            }
      ).status(200).json({
        message: 'Agent logged in successfully',
        agentName: agent.agentName,
        token,
      });   
    } catch (error) {
      console.error('Error logging in agent:', error);
      return res.status(500).json({ message: 'Internal server error. Failed to log in.' });
    }
  };

  const logoutAgent = (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      return res.status(200).json({ message: 'Agent logged out successfully' });
    } catch (error) {
      console.error('Error logging out agent:', error);
      return res.status(500).json({ message: 'Failed to log out agent' });
    }
  };
  

module.exports = { registerAgent , loginAgent ,logoutAgent};
