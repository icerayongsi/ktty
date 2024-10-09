import { PrismaClient } from '@prisma/client';
import logger from '../logger';

class DatabaseContext {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!DatabaseContext.instance) {
            DatabaseContext.instance = new PrismaClient();
            logger.info("Database client instance created");
        }
        return DatabaseContext.instance;
    }
}

export default DatabaseContext; 