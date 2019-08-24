import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import { firestoreGet, firestoreDelete, firestorePut } from 'api/firestoreRequest';

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

const deleteUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    await firestoreDelete('users', id);

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data: {}
    };
    res.status(200).json(bodyResponse);
};

const putUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const body = req.body;

    const updatedData = {
        ...body,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firestorePut('users', id, updatedData);
    const users = await firestoreGet('users', id);

    const data = users.data();
    delete data.password;

    const bodyResponse = {
        code: 204,
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
            deleteUser(req, res);
            break;
        case 'PUT':
            putUser(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
