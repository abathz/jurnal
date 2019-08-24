import axios, { AxiosResponse, AxiosInstance, AxiosStatic } from 'axios';
import _get from 'lodash/get';
import to from 'await-to-js';
import { getSession } from 'lib/session';

const defaultConfig = {
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: ''
    }
};

const api = (customConfig?: any): { [key: string]: any } => {
    const token = getSession('at');
    if (token) defaultConfig.headers.Authorization = `Bearer ${token}`;
    return axios.create({
        ...defaultConfig,
        ...customConfig
    });
};

const resolveResponse = (response: AxiosResponse) => {
    const data = _get(response, 'data.data', {});
    const status = _get(response, 'status', 400);
    const message = _get(response, 'data.message', '');
    const bodyResponse = {
        data,
        message,
        ok: status >= 200 && status < 300,
        code: status
    };

    const callback = new Promise(resolve => {
        if (bodyResponse.ok) {
            resolve(bodyResponse);
        } else {
            const errorMessage = _get(bodyResponse, 'message', 'An error has occurred while processing your request.');
            bodyResponse.message = errorMessage;
            console.error(`[Error: ${status}]: ${errorMessage}`);
            resolve(bodyResponse);
        }
    });
    return callback;
};

const responseHandler = (axiosRes: any) => {
    const [err, res] = axiosRes;
    const toResolve = err ? err.response : res;
    return resolveResponse(toResolve);
};

const apiHandler = async (method: string, ...args: any[]) => {
    return responseHandler(await to(api()[method](...args)));
};

export const apiGet = (...args: any[]) => apiHandler('get', ...args);
export const apiPost = (...args: any[]) => apiHandler('post', ...args);
export const apiPut = (...args: any[]) => apiHandler('put', ...args);
export const apiPatch = (...args: any[]) => apiHandler('patch', ...args);
export const apiDelete = (...args: any[]) => apiHandler('delete', ...args);
