import { Navigate } from 'react-router';
import { userLocalStorageKey } from '../hooks/use-user';
import type { ReactNode } from 'react';

type PrivateRoutesProps = {
	component: ReactNode;
};

export function PrivateRoutes({ component }: PrivateRoutesProps) {
	const userData = localStorage.getItem(userLocalStorageKey);

	if (!userData) {
		return <Navigate to="/login" />;
	}

	return <>{component}</>;
}
