import { NowRequest, NowResponse } from '@now/node';
import { firestoreGet } from 'api/firestoreRequest';

export default async (req: NowRequest, res: NowResponse) => {
    const users = await firestoreGet('users');

    const data = users.docs.map((res: any) => {
        const userId = res.id;
        const user = res.data();

        delete user.password;
        return { id: userId, ...user };
    });

    const bodyResponse = {
        code: 200,
        ok: true,
        message: '',
        data
    };
    res.status(200).json(bodyResponse);
};
