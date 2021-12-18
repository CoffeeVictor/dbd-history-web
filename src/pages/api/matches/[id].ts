import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { MatchService } from "../../../services/MatchService";
import { ISessionUser } from "../auth/[...nextauth]";

const matchService = new MatchService();

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    const user = session?.user as ISessionUser;

    if(req.method === 'DELETE') {

        const {id} = req.query;

        if(typeof id !== 'string') {
            return res.status(403).send('Malformated id');
        }

        const deletedMatch = await matchService.deleteMatch(id, user.id);

        if(!deletedMatch) return res.status(403).send('You have no permission to delete this resource.');

        return res.status(200).json(deletedMatch);
    }
}

export default handler;