import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured');
    }

    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '30d',
    });
};



export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
