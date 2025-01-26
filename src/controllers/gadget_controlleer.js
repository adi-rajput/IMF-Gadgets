const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const gadgetFirstNames = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet'];
const gadgetLastNames = ['Titan', 'Phantom', 'Vanguard', 'Sentinel', 'Guardian', 'Striker', 'Ranger', 'Hunter', 'Shadow', 'Specter'];

const usedNames = new Set();

const generateUniqueGadgetName = () => {
  let uniqueName = null;

  while (!uniqueName) {
    const firstName = gadgetFirstNames[Math.floor(Math.random() * gadgetFirstNames.length)];
    const lastName = gadgetLastNames[Math.floor(Math.random() * gadgetLastNames.length)];
    const gadgetName = `${firstName} ${lastName}`;

    if (!usedNames.has(gadgetName)) {
      usedNames.add(gadgetName);
      uniqueName = gadgetName;
    }
  }

  return uniqueName;
};

const addGadget = async (req, res) => {
  const { status, decommissionedAt } = req.body;

  try {
    const gadgetName = generateUniqueGadgetName();

    const newGadget = await prisma.gadget.create({
      data: {
        gadgetName,
        status: status || 'Available',
        decommissionedAt: decommissionedAt || null,
      }
    });

    return res.status(201).json({ message: 'Gadget added successfully', gadget: newGadget });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Gadget name already exists, please try again.' });
    }

    return res.status(500).json({ message: 'Failed to add gadget' });
  }
};

module.exports = { addGadget };
