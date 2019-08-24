import { NowRequest, NowResponse } from '@now/node';
import { Base64 } from 'js-base64';
import { firestorePost } from 'api/firestoreRequest';
import firebase from 'firebase';

export default async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const data = {
        ...body,
        password: Base64.encode(body.password),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
    };

    await firestorePost('users', data);

    const bodyResponse = {
        code: 201,
        ok: true,
        message: '',
        data: {}
    };

    res.status(200).json(bodyResponse);
};
