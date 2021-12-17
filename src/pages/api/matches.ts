import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { IMatchBody, MatchService } from "../../services/MatchService";
import { ISessionUser } from "./auth/[...nextauth]";

const matchService = new MatchService();

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    const user = session?.user as ISessionUser;

    if(req.method === 'GET') {
        const matches = await matchService.getAllMatches(user.id);

        return res.json({matches})
    } else if (req.method === 'POST') {
        const {match}: {match: IMatchBody} = req.body;

        const newMatch = await matchService.createMatch(match, user.id);

        return res.status(200).json({
            created: newMatch
        })
    }
}

export default handler;
