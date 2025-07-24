import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../@types/user.type';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ message: 'Token not provide' });
	}

	const [_, token] = authToken.split(' ');

	try {
		jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
			if (err) {
				throw new Error();
			}

			req.user = decoded as User;
		});
	} catch {
		return res.status(401).json({ message: 'Token is invalid' });
	}

	next();
}
