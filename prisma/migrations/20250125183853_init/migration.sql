-- CreateEnum
CREATE TYPE "GadgetStatus" AS ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

-- CreateTable
CREATE TABLE "Gadget" (
    "gadgetId" TEXT NOT NULL,
    "gadgetName" TEXT NOT NULL,
    "status" "GadgetStatus" NOT NULL DEFAULT 'Available',
    "decommissionedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gadget_pkey" PRIMARY KEY ("gadgetId")
);

-- CreateTable
CREATE TABLE "Agent" (
    "agentId" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "agentEmail" TEXT NOT NULL,
    "agentSecretKey" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gadget_gadgetName_key" ON "Gadget"("gadgetName");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_agentEmail_key" ON "Agent"("agentEmail");
