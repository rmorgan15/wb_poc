import { PrismaClient } from '@prisma/client';

// Add prisma to the NodeJS global type

// Prevent multiple instances of Prisma Client in development
export const prisma = new PrismaClient();

