// biome-ignore assist/source/organizeImports: <>
import { createBrowserRouter } from 'react-router';
import { Login } from '../pages/login';
import { Habits } from '../pages/habits';

export const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/',
		element: <Habits />,
	},
]);
