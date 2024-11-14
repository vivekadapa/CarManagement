import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const connectToDatabase = async () => {
    try {
      await db.$connect();
      console.log("Connected to the database successfully.");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
      process.exit(1); // Exit the process if the database connection fails
    }
  };

export default db;
