const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const agentRoutes = require('./src/routes/agent_routes');
const gadgetRoutes = require('./src/routes/gadgets_routes');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/gadgets', gadgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    });

