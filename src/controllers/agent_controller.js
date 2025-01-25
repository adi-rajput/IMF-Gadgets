const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

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



module.exports = { registerAgent };
