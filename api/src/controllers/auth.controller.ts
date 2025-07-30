import axios, { isAxiosError } from 'axios';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const {
	GITHUB_CLIENT_ID: clientId,
	GITHUB_CLIENT_SECRET: clientSecret,
	JWT_SECRET: secret,
	JWT_EXPIRES_IN: expires,
} = process.env;

export class AuthController {
	auth = async (req: Request, res: Response) => {
		try {
			const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`;

			res.status(200).json({ redirectUrl });
		} catch (err) {
			if (isAxiosError(err)) {
				return res.status(400).json(err.response?.data);
			}
			return res.status(500).json({ message: 'Erro no servidor' });
		}
	};

	callback = async (req: Request, res: Response) => {
		try {
			const { code } = req.query;

			const acessTokenResult = await axios.post(
				'https://github.com/login/oauth/access_token',
				{
					client_id: clientId,
					client_secret: clientSecret,
					code,
				},
				{
					headers: { Accept: 'application/json' },
				},
			);

			const userData = await axios.get('https://api.github.com/user', {
				headers: {
					Authorization: `Bearer ${acessTokenResult.data.access_token}`,
				},
			});

			const { node_id: id, avatar_url: avatar, login: name } = userData.data;

			const token = jwt.sign({ id }, String(secret), {
				expiresIn: expires,
			});

			return res.status(200).json({ id, avatar, name, token });
		} catch (err) {
			if (isAxiosError(err)) {
				return res.status(400).json(err.response?.data);
			}
			return res.status(500).json({ message: 'Erro no servidor' });
		}
	};
}
