import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { UserProvider } from './hooks/use-user';

// biome-ignore lint/style/noNonNullAssertion: <>
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</StrictMode>,
);
