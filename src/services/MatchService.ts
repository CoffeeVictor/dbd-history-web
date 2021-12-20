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
    role: 'killer' | 'survivor';
}

export class MatchService {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async createMatch(matchData: IMatchBody, userId: string) {

        const survivors = matchData.survivors.map((survivor, index) => {

            let newSurvivor: any = {};

            newSurvivor.name = survivor.name;
            newSurvivor.result = survivor.result;

            if(index === 0 && matchData.role.toLowerCase() === 'survivor') {
                newSurvivor.isPlayer = true;
            } else {
                newSurvivor.isPlayer = false;
            }

            return newSurvivor;
        })

        const newMatch = await this.prisma.match.create({
            data: {
                killer: {
                    create: {
                        title: matchData.killer.title,
                        isPlayer: matchData.role.toLowerCase() === 'killer',
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
                        data: survivors
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
                        title: true,
                        isPlayer: true
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
                        result: true,
                        isPlayer: true
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

    public async deleteMatch(matchId: string, userId: string) {
        const match = await this.prisma.match.findFirst({
            where: {
                id: matchId
            }
        })

        if(match?.userId === userId) {

            await this.prisma.killer.delete({
                where: {
                    id: match.killerId
                }
            })

            await this.prisma.map.delete({
                where: {
                    id: match.mapId
                }
            })

            return match;
        }

        return null;
    }
}