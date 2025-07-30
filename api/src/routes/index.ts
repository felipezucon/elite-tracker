/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { type Request, type Response, Router } from 'express';
import packageJson from '../../package.json';
import { HabitsController } from '../controllers/habits.controller';
import { FocusController } from '../controllers/focus-time.controller';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const routes = Router();

const habitsController = new HabitsController();
const focusTimeController = new FocusController();
const authController = new AuthController();

routes.get('/info', (_req: Request, res: Response): any => {
	const { name, description, version } = packageJson;
	return res.status(200).json({ name, description, version });
});

//Base
routes.get('/', (_req: Request, res: Response): any => {
	const { name, description, version } = packageJson;
	return res.status(200).json({ name, description, version });
});

//Login
routes.get('/auth', authController.auth as any);
routes.get('/auth/callback', authController.callback as any);

// PRIVATE ROUTES
routes.use(authMiddleware as any);
//Habits
routes.post('/habits', habitsController.store as any);
routes.get('/habits', habitsController.index as any);
routes.get('/habits/:id/metrics', habitsController.metrics as any);
routes.delete('/habits/:id', habitsController.remove as any);
routes.patch('/habits/:id/toggle', habitsController.toggle as any);
//Focus
routes.post('/focus-time', focusTimeController.store as any);
routes.get('/focus-time', focusTimeController.index as any);
routes.get('/focus-time/metrics', focusTimeController.metricsByMonth as any);
