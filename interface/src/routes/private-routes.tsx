import { Navigate } from 'react-router';
import { userLocalStorageKey } from '../hooks/use-user';
import type { ReactNode } from 'react';
import { Sidebar } from '../components/sidebar';
import { AppContainer } from '../components/app-container';

type PrivateRoutesProps = {
	component: ReactNode;
};

export function PrivateRoutes({ component }: PrivateRoutesProps) {
	const userData = localStorage.getItem(userLocalStorageKey);

	if (!userData) {
		return <Navigate to="/login" />;
	}

	return (
		<AppContainer>
			<Sidebar />
			{component}
		</AppContainer>
	);
}
