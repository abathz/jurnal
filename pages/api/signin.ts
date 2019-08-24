import { NowRequest, NowResponse } from '@now/node';
import { Base64 } from 'js-base64';
import _get from 'lodash/get';
import { firestoreGet } from 'api/firestoreRequest';
import { createToken } from 'lib/jwt';

export default async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const data = {
        ...body,
        password: Base64.encode(body.password)
    };

    const token = createToken(data);

    const users: any = await firestoreGet('users');

    const isUserValid: boolean = users.docs
        .map((doc: any) => {
            const user = doc.data();
            return user;
        })
        .some((user: any) => user.email === data.email && user.password === data.password);

    if (isUserValid) {
        res.status(200).json({ ...users, token });
    } else {
        res.status(404).json({ code: 404, ok: false, message: 'login failed', data: {} });
    }
};
