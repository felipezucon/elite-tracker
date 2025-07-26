import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useUser } from '../hooks/use-user';

export function Auth() {
	const [searchParams] = useSearchParams();
	const {getUserInfo, userData} = useUser()

	useEffect(() => {
		getUserInfo(String(searchParams.get('code')));
	}, [getUserInfo]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<h1 className="text-vibrant text-4xl">Loading...</h1>
		</div>
	);
}
