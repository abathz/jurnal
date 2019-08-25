import { NowRequest, NowResponse } from '@now/node';
import { Base64 } from 'js-base64';
import _get from 'lodash/get';
import firestoreRequest, { firestoreUsers } from 'api/firestoreRequest';
import { createToken } from 'lib/jwt';

export default async (req: NowRequest, res: NowResponse) => {
    const body = req.body;
    const data = {
        ...body,
        password: Base64.encode(body.password)
    };
    let bodyResponse;

    const token = createToken(data);

    let users: any = await firestoreRequest(firestoreUsers.get());

    const isUserValid: boolean = users.docs
        .map((doc: any) => {
            const user = doc.data();
            return user;
        })
        .some((user: any) => user.email === data.email && user.password === data.password);

    users = users.docs
        .map((doc: any) => {
            const user = doc.data();
            return user;
        })
        .find((user: any) => user.email === data.email && user.password === data.password && delete user.password);

    if (isUserValid) {
        bodyResponse = {
            code: 200,
            ok: true,
            message: '',
            data: {
                token,
                profile: users
            }
        };
        res.status(bodyResponse.code).json(bodyResponse);
    } else {
        bodyResponse = { code: 404, ok: false, message: 'login failed', data: {} };
        res.status(bodyResponse.code).json(bodyResponse);
    }
};
