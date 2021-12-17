import { NextApiHandler } from "next";
import { IUserCredentials, UserService } from "../../services/UserService";

const userService = new UserService();

export interface IUser {
    id: string;
    password: string;
}

const handle: NextApiHandler<IUser | string> = async (req, res) => {
    if(req.method === 'POST') {
        // Register

        const {username, password} = req.body as IUserCredentials;

        const newUser = await userService.register({username, password});

        if(!newUser) {
            return res.status(409).send('User already exists.');
        }

        return res.status(201).json(newUser);
    }
}

export default handle;
