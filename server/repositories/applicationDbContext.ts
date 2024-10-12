import { PrismaClient } from '@prisma/client';
import logger from '../logger';
import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

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

    public static auth() : Lucia {
        const adapter = new PrismaAdapter(this.getInstance().session,this.getInstance().user);
        return new Lucia(adapter,{
            sessionCookie: {
                attributes: {
                    secure: process.env.NODE_ENV === "production"
                }
            },
            getUserAttributes: (attributes) => {
                return {
                    username: attributes.username
                };
            }
        });
    }
}

/// <reference types="lucia" />
declare module "lucia" {
	interface Register {
		Lucia: typeof Lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}

export default DatabaseContext; 

