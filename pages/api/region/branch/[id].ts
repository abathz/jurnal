import { NowRequest, NowResponse } from '@now/node';
import firebase from 'firebase';
import firestoreRequest, { firestoreBranchRegions } from 'api/firestoreRequest';

const getBranch = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const branchregion = await firestoreRequest(firestoreBranchRegions.doc(id).get());

    let bodyResponse;

    if (branchregion.data()) {
        const data = branchregion.data();
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

const deleteBranch = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    await firestoreRequest(firestoreBranchRegions.doc(id).delete());

    const bodyResponse = {
        code: 204,
        ok: true,
        message: '',
        data: {}
    };
    res.status(bodyResponse.code).json(bodyResponse);
};

const putBranch = async (req: NowRequest, res: NowResponse) => {
    const id: any = req.query.id;
    const body = req.body;

    const updatedData = {
        ...body,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firestoreRequest(firestoreBranchRegions.doc(id).update(updatedData));
    const branchregion = await firestoreRequest(firestoreBranchRegions.doc(id).get());

    const data = branchregion.data();

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
            getBranch(req, res);
            break;
        case 'DELETE':
            deleteBranch(req, res);
            break;
        case 'PUT':
            putBranch(req, res);
            break;
        default:
            res.status(405).json({ message: 'Method Not Allowed' });
            break;
    }
};
