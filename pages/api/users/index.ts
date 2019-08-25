import { NowRequest, NowResponse } from '@now/node';
import firestoreRequest, { firestoreUsers } from 'api/firestoreRequest';

export default async (req: NowRequest, res: NowResponse) => {
    const users = await firestoreRequest(firestoreUsers.orderBy('created_at', 'desc').get());

    let bodyResponse;

    if (users.docs.length > 0) {
        const data = users.docs.map((res: any) => {
            const userId = res.id;
            const user = res.data();

            delete user.password;
            return { id: userId, ...user };
        });

        bodyResponse = {
            code: 200,
            ok: true,
            message: '',
            data
        };
    } else {
        bodyResponse = {
            code: 200,
            ok: true,
            message: '',
            data: {}
        };
    }

    res.status(bodyResponse.code).json(bodyResponse);
};
