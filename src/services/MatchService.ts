import { PrismaClient } from "@prisma/client";
import { ISurvivorData } from "../components/MatchCard";

export interface IMatchBody {
    killer: {
        name: string;
        title: string;
    },
    map: {
        map: string;
        realm: string;
    },
    survivors: ISurvivorData[];
}

export class MatchService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async createMatch(matchData: IMatchBody, userId: string) {

        const newMatch = await this.prisma.match.create({
            data: {
                killer: {
                    create: {
                        title: matchData.killer.title
                    }
                },
                map: {
                    create: {
                        name: matchData.map.map,
                        realm: matchData.map.realm
                    }
                },
                survivors: {
                    createMany: {
                        data: matchData.survivors
                    }
                },
                User: {
                    connect: {
                        id: userId
                    }
                }
            }
        })

        return newMatch;
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
                created_at: true,
                id: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return matches;
    }
}