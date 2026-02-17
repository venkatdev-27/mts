import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    const jwtSecret = process.env.JWT_SECRET;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            if (!jwtSecret) {
                res.status(500).json({ message: 'Server auth configuration error' });
                return;
            }

            token = req.headers.authorization.split(' ')[1];

            const decoded: any = jwt.verify(token, jwtSecret);

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }
            req.user = user;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};
