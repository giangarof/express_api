import jwt from 'jsonwebtoken';

export const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.SECRET, {
        expiresIn: '30d'
    });

    // setjwt as http only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: "strict",
        maxAge: 30 * 24 *  60 * 60 * 1000 //30 days
    });
    
    // return token;

}