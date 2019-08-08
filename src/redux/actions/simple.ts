import { Dispatch } from 'redux';
import { GET_FULLNAME } from '../types';

export const getFullName = () => async (dispatch: Dispatch): Promise<any> => {
    dispatch({ type: GET_FULLNAME, payload: 'Adli Fariz Bonaputra' });
};
