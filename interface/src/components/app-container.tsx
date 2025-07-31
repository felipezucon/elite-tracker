import type { ReactNode } from 'react';

type AppContainerProps = {
	children: ReactNode;
};

export function AppContainer({ children }: AppContainerProps) {
	return <div className="flex h-screen w-screen">{children}</div>;
}
