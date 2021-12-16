import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { MatchService } from "../../services/MatchService";
import { ISessionUser } from "./auth/[...nextauth]";

const matchService = new MatchService();

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    const user = session?.user as ISessionUser;

    const matches = await matchService.getAllMatches(user.id);

    return res.json({matches})
}

export default handler;
