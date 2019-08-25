import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreWarehouses } from 'api/firestoreRequest';

const getWarehouse = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const users = await firestoreRequest(firestoreWarehouses.doc(id));

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

const deleteWarehouse = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    await firestoreRequest(firestoreWarehouses.doc(id).delete());

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data: {}
    };
    res.status(bodyResponse.code).json(bodyResponse);
};

const putWarehouse = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const body = req.body;

    const updatedData = {
        ...body,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firestoreRequest(firestoreWarehouses.doc(id).update(updatedData));
    const warehouses = await firestoreRequest(firestoreWarehouses.doc(id).get());

    const data = warehouses.data();

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
            getWarehouse(req, res);
            break;
        case 'DELETE':
            deleteWarehouse(req, res);
            break;
        case 'PUT':
            putWarehouse(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
