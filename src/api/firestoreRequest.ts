import _get from 'lodash/get';
import to from 'await-to-js';
import firestore from 'lib/firestore';

export const USERS = 'users';
export const WAREHOUSES = 'warehouses';
export const REGIONS = 'regions';
export const BRANCH_REGIONS = 'branchregion';

const responseHandler = (firebaseRes: any) => {
    const [err, res] = firebaseRes;
    if (err) {
        console.error(`[Error]: ${err}`);
    } else {
        return res;
    }
};

export const firestoreUsers = firestore.collection('users');
export const firestoreWarehouses = firestore.collection('warehouses');
export const firestoreRegions = firestore.collection('regions');
export const firestoreBranchRegions = firestore.collection('branchregion');

export default async (request: any) => {
    return responseHandler(await to(request));
};
