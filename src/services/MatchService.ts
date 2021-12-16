import { PrismaClient } from "@prisma/client";

export class MatchService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async getAllMatches(userId: string) {
        const matches = await this.prisma.match.findMany({
            where: {
                userId
            },
            select: {
                killer: {
                    select: {
                        title: true
                    }
                },
                map: {
                    select: {
                        realm: true,
                        name: true
                    }
                },
                survivors: {
                    select: {
                        name: true,
                        result: true
                    }
                },
                created_at: true
            }
        })

        return matches;
    }
}