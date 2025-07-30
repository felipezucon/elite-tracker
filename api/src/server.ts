import 'dotenv/config';

// biome-ignore assist/source/organizeImports: <>
import express from 'express';
import { routes } from './routes';
import { setupMongo } from './database';
import cors from 'cors';

const app = express();
const PORT = 4000;

setupMongo()
	.then(() => {
		app.use(cors({ origin: true }));
		app.use(express.json());
		app.use(routes);
		app.listen(PORT, () => console.log(`🚀 Server is running at port ${PORT}`));
	})
	.catch((err) => {
		console.error(err.message);
	});
