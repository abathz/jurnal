import _get from 'lodash/get';
import to from 'await-to-js';
import firebase from 'lib/firebase';

const rejectResponse = (err: any) => console.error(`[Error]: ${err}`);

const responseHandler = (firebaseRes: any) => {
    const [err, res] = firebaseRes;
    if (err) {
        return rejectResponse(err);
    } else {
        return res;
    }
};

export const firestoreGet = async (collection: string, doc?: string) => {
    if (doc) {
        return responseHandler(
            await to(
                firebase
                    .collection(collection)
                    .doc(doc)
                    .get()
            )
        );
    } else {
        return responseHandler(await to(firebase.collection(collection).get()));
    }
};

export const firestorePost = async (collection: string, data: any) => {
    return responseHandler(
        await to(
            firebase
                .collection(collection)
                .doc()
                .set(data)
        )
    );
};

export const firestorePut = async (collection: string, doc: string, data: any) => {
    return responseHandler(
        await to(
            firebase
                .collection(collection)
                .doc(doc)
                .set(data)
        )
    );
};

export const firestoreDelete = async (collection: string, doc: string) => {
    return responseHandler(
        await to(
            firebase
                .collection(collection)
                .doc(doc)
                .delete()
        )
    );
};
