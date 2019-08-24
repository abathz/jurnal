import { NowRequest, NowResponse } from '@now/node';
import { firestoreGet } from 'api/firestoreRequest';

const getUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const users = await firestoreGet('users', id);

    const data = users.data();
    delete data.password;

    const bodyResponse = {
        code: 200,
        ok: true,
        message: '',
        data
    };
    res.status(200).json(bodyResponse);
};

export default (req: NowRequest, res: NowResponse) => {
    switch (req.method) {
        case 'GET':
            getUser(req, res);
            break;
        case 'DELETE':
            console.log('delete user');
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
