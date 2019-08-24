import jwt from 'jsonwebtoken';

export const createToken = (user: any) => {
    const data = {
        name: user.name,
        email: user.email
    };

    const token = jwt.sign(data, process.env.JWT_KEY || 'jurnal');

    return token;
};

export const verifyToken = (token: string) => {
    const isUserVerify = jwt.verify(token, process.env.JWT_KEY || 'jurnal');

    return isUserVerify;
};
