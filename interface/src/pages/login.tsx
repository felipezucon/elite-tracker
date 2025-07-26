import { GithubLogoIcon } from '@phosphor-icons/react';
import { Button } from '../components/button';
import { Link } from 'react-router';
import { api } from '../services/api';

export function Login() {
	async function handleAuth() {
		const { data } = await api.get('/auth');

		window.location.href = data.redirectUrl;
	}

	return (
		<div className="min-h-screen bg-background flex flex-col justify-center items-center gap-4">
			<div className="flex items-center justify-center flex-col w-95 bg-container rounded-xl text-text p-8">
				<h1 className="font-bold text-2xl">Entre com</h1>
				<Button className="hover:-translate-y-0.5 mt-5 mb-2.5" onClick={handleAuth}>
					<GithubLogoIcon size={24} /> Github
				</Button>
				<p className="font-extralight text-[12px] text-center max-w-55">
					Ao entrar, eu concordo com os{' '}
					<Link
						className="underline"
						to="https://docs.github.com/pt/site-policy/github-terms/github-terms-of-service"
					>
						Termos de Serviços
					</Link>{' '}
					e a{' '}
					<Link
						className="underline"
						to="https://docs.github.com/pt/site-policy/privacy-policies/github-general-privacy-statement"
					>
						Política de Privacidade
					</Link>
				</p>
			</div>
		</div>
	);
}
