# IMF Gadgets Management API

## Project Overview
Backend system for managing IMF (International Missions Facility) gadgets inventory with robust authentication and lifecycle management.

## Technical Stack
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Project Structure
```
├── controllers/
│   ├── agentController.js
│   └── gadgetController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── prismaSchema.prisma
├── routes/
│   ├── agentRoutes.js
│   └── gadgetRoutes.js
└── server.js
```

## Database Schema
```prisma
model Gadget {
  gadgetId        String       @id @default(uuid()) 
  gadgetName      String       @unique 
  status          GadgetStatus @default(Available) 
  decommissionedAt DateTime?   
  createdAt       DateTime     @default(now()) 
  updatedAt       DateTime     @updatedAt       
}

model Agent {
  agentId   String    @id @default(uuid()) 
  agentName String    
  agentEmail String   @unique 
  agentSecretKey String    
}
```

## Environment Configuration
```bash
# Required Environment Variables
DATABASE_URL=postgresql_connection_string
JWT_SECRET=your_secret_key
PORT=6000
```

## Authentication Flow
1. Agent Registration
2. JWT Token Generation
3. Secure Route Protection
4. Token-based Session Management

## Gadget Lifecycle
- Available
- Deployed
- Decommissioned
- Destroyed

## Key API Endpoints
- `POST /agents/register`: Create agent account
- `POST /agents/login`: Authenticate agent
- `POST /gadgets/logout`: Logout Agent

# Gadget Management API

## Routes

### Add Gadget
- **URL:** `/add`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Description:** Add a new gadget to the system

### Get All Gadgets
- **URL:** `/`
- **Method:** `GET`
- **Authentication:** Not required
- **Description:** Retrieve all gadgets

### Get Gadgets by Status
- **URL:** `/status`
- **Method:** `GET`
- **Authentication:** Not required
- **Description:** Retrieve gadgets filtered by their current status

### Update Gadget
- **URL:** `/:gadgetId`
- **Method:** `PATCH`
- **Authentication Required:** Yes
- **Description:** Update details of a specific gadget

### Decommission Gadget
- **URL:** `/:gadgetId`
- **Method:** `DELETE`
- **Authentication Required:** Yes
- **Description:** Permanently decommission a specific gadget

### Trigger Self-Destruct
- **URL:** `/self-destruct/:gadgetId`
- **Method:** `POST`
- **Authentication Required:** Yes
- **Description:** Initiate self-destruct sequence for a specific gadget

## Error Handling Strategies
- Comprehensive error responses
- Input validation
- Secure error messaging
- Logging critical errors

## Security Measures
- Encrypted credentials
- JWT authentication
- Role-based access control
- Input sanitization
- Rate limiting

## Performance Optimization
- Efficient Prisma queries
- Minimal database roundtrips
- Indexed database fields
- Caching mechanisms

## Deployment
- Platform: Render
- Base URL: https://imf-gadgets-1.onrender.com/api/v1
- Continuous Integration/Deployment

## Development Commands
```bash
# Install Dependencies
npm install

# Run Development Server
npm run dev

# Run Production Build
npm start

# Database Migrations
npx prisma migrate dev
```