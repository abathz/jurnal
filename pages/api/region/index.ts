import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreRegions } from 'api/firestoreRequest';

const getRegions = async (req: NowRequest, res: NowResponse) => {
    const regions = await firestoreRequest(firestoreRegions.get());
    let bodyResponse;

    if (regions.docs.length > 0) {
        const data = regions.docs.map((res: any) => {
            const regionsId = res.id;
            const region = res.data();

            return { id: regionsId, ...region };
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

const postRegions = async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const newData = {
        name: body.name,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firestoreRequest(firestoreRegions.doc().set(newData));

    const regions = await firestoreRequest(
        firestoreRegions
            .orderBy('created_at', 'desc')
            .limit(1)
            .get()
    );

    const data = regions.docs.map((res: any) => res.data())[0];

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
            getRegions(req, res);
            break;
        case 'POST':
            postRegions(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
