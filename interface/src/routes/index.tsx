import { createBrowserRouter } from 'react-router';
import { Login } from '../pages/login';
import { Habits } from '../pages/habits';
import { Auth } from '../pages/auth';
import { PrivateRoutes } from './private-routes';
import { Focus } from '../pages/focus';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <PrivateRoutes component={<Habits />} />,
	},
	{
		path: '/focus',
		element: <PrivateRoutes component={<Focus />} />,
	},
]);
