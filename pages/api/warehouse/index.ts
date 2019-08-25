import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreWarehouses } from 'api/firestoreRequest';

const getWarehouses = async (req: NowRequest, res: NowResponse) => {
    const inventory = await firestoreRequest(firestoreWarehouses.get());
    let bodyResponse;

    if (inventory.docs.length > 0) {
        const data = inventory.docs.map((res: any) => {
            const inventoryId = res.id;
            const inventory = res.data();

            return { id: inventoryId, ...inventory };
        });

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

const postWarehouses = async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const newData = {
        name: body.name,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firestoreRequest(firestoreWarehouses.doc().set(newData));

    const warehouse = await firestoreRequest(
        firestoreWarehouses
            .orderBy('created_at', 'desc')
            .limit(1)
            .get()
    );

    const data = warehouse.docs.map((res: any) => res.data())[0];

    const bodyResponse = {
        code: 201,
        ok: true,
        message: '',
        data
    };

    res.status(bodyResponse.code).json(bodyResponse);
};

export default (req: NowRequest, res: NowResponse) => {
    switch (req.method) {
        case 'GET':
            getWarehouses(req, res);
            break;
        case 'POST':
            postWarehouses(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
