import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useUser } from '../hooks/use-user';

export function Auth() {
	const [searchParams] = useSearchParams();
	const { getUserInfo } = useUser();
	const navigate = useNavigate();

	async function handleAuth() {
		await getUserInfo(String(searchParams.get('code')));

		navigate('/');
	}

	useEffect(() => {
		handleAuth();
	}, []);

const text = "Loading...".split("");

	return (
		
		<div className="flex items-center justify-center w-screen h-screen bg-background">
			<h1 className="text-[50px] font-bold text-vibrant">
				{text.map((letter, index) => (
					<span
						key={index}
						className={`bounce bounce-delay-${index}`}
					>
						{letter}
					</span>
				))}
			</h1>
		</div>
	);
}


