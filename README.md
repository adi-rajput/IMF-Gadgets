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
model Agent {
  id           String   @id @default(uuid())
  email        String   @unique
  secretKey    String
  name         String
}

model Gadget {
  id                     String   @id @default(uuid())
  name                   String
  status                 String
  missionProbability     Float
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt
  decommissionedAt       DateTime?
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
- `POST /gadgets/add`: Create new gadget
- `GET /gadgets/status`: Filter gadgets
- `PATCH /gadgets/{id}`: Update gadget status
- `POST /gadgets/self-destruct/{id}`: Trigger self-destruct

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