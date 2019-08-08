import { NowRequest, NowResponse } from '@now/node';
import firebase from 'lib/firebase';

const getUser = async (req: NowRequest, res: NowResponse) => {
    try {
        const users = await firebase.collection('users').get();

        const result: any[] = [];

        users.forEach((data: any) => result.push(data.data()));

        res.json({ status: 200, data: result, message: '' });
    } catch (err) {
        res.json({ status: 404, data: [], message: 'Not Found' });
    }
};

export default async (req: NowRequest, res: NowResponse) => {
    switch (req.method) {
        case 'GET':
            await getUser(req, res);
            break;
        default:
            res.json({ message: 'Method not Allowed!' });
    }
};
