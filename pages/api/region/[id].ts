import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreRegions } from 'api/firestoreRequest';

const getRegion = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const users = await firestoreRequest(firestoreRegions.doc(id).get());

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

const deleteRegion = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    await firestoreRequest(firestoreRegions.doc(id).delete());

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data: {}
    };
    res.status(bodyResponse.code).json(bodyResponse);
};

const putRegion = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const body = req.body;

    const updatedData = {
        ...body,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firestoreRequest(firestoreRegions.doc(id).update(updatedData));
    const regions = await firestoreRequest(firestoreRegions.doc(id).get());

    const data = regions.data();

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
            getRegion(req, res);
            break;
        case 'DELETE':
            deleteRegion(req, res);
            break;
        case 'PUT':
            putRegion(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
