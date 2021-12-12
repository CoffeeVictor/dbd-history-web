import { PrismaClient } from "@prisma/client";
import { compareSync, hashSync } from 'bcrypt';

export interface IUserCredentials {
    username: string;
    password: string;
}

export class UserService {
    
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    public async authenticate(credentials: IUserCredentials) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: credentials.username
            }
        })

        if(!user) return null;

        const isAuthenticated = compareSync(credentials.password, user.password);

        return isAuthenticated ? user : null;
    }

    public async register(credentials: IUserCredentials) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: credentials.username
            }
        })

        if(user) return null;

        const SALT_ROUNDS = 10; // Recommended

        const hashedPassword = hashSync(credentials.password, SALT_ROUNDS)

        const newUser = await this.prisma.user.create({
            data: {
                username: credentials.username,
                password: hashedPassword
            }
        })

        return newUser
    }
}