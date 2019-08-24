import Cookies from 'js-cookie';

export function getSession(name: string) {
    return Cookies.get(name);
}

export function setSession(name: string, value: string, config?: any) {
    Cookies.set(name, value, config);
}

export function removeSession(name: string, config?: any) {
    Cookies.remove(name, config);
}

export function setAccountSession(data: any) {
    const idToken = data.id_token || '';
    const refreshToken = data.refresh_token || '';
    const { id = '', email = '', first_name = '', last_name = '' } = data.profile; // eslint-disable-line

    const username = `${first_name} ${last_name}`; // eslint-disable-line
    const userProfile = { id, email, username };

    if (idToken) Cookies.set('at', idToken, { path: '/' });
    if (refreshToken) Cookies.set('rt', refreshToken, { path: '/' });
    Cookies.set('up', userProfile, { path: '/' });
}

export function clearAccountSession() {
    Cookies.remove('at', { path: '/' });
    Cookies.remove('rt', { path: '/' });
    Cookies.remove('up', { path: '/' });
}

export function hasToken() {
    const refreshToken = Cookies.get('rt');
    const accessToken = Cookies.get('at');

    if (refreshToken && refreshToken === 'undefined') return false;
    if (accessToken && accessToken === 'undefined') return false;
    return !!(refreshToken && accessToken);
}
