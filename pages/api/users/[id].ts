import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreUsers } from 'api/firestoreRequest';

const getUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const users = await firestoreRequest(firestoreUsers.doc(id).get());

    let bodyResponse;

    if (users.data()) {
        const data = users.data();
        delete data.password;

        bodyResponse = {
            code: 200,
            ok: true,
            message: '',
            data
        };
    } else {
        bodyResponse = {
            code: 404,
            ok: false,
            message: 'Not Found',
            data: {}
        };
    }

    res.status(bodyResponse.code).json(bodyResponse);
};

const deleteUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    await firestoreRequest(firestoreUsers.doc(id).delete());

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data: {}
    };
    res.status(bodyResponse.code).json(bodyResponse);
};

const putUser = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const body = req.body;

    const updatedData = {
        ...body,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firestoreRequest(firestoreUsers.doc(id).update(updatedData));
    const users = await firestoreRequest(firestoreUsers.doc(id).get());

    const data = users.data();
    delete data.password;

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data
    };
    res.status(bodyResponse.code).json(bodyResponse);
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
