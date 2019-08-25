import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreBranchRegions } from 'api/firestoreRequest';

const getBranches = async (req: NowRequest, res: NowResponse) => {
    const branches = await firestoreRequest(firestoreBranchRegions.get());
    let bodyResponse;

    if (branches.docs.length > 0) {
        const data = branches.docs.map((res: any) => {
            const branchesId = res.id;
            const branches = res.data();

            return { id: branchesId, ...branches };
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

const postBranches = async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const newData = {
        name: body.name,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firestoreRequest(firestoreBranchRegions.doc().set(newData));

    const branchregion = await firestoreRequest(
        firestoreBranchRegions
            .orderBy('created_at', 'desc')
            .limit(1)
            .get()
    );

    const data = branchregion.docs.map((res: any) => res.data())[0];

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
            getBranches(req, res);
            break;
        case 'POST':
            postBranches(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
