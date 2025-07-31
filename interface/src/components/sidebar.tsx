import { ListChecksIcon, SignOutIcon, TimerIcon } from '@phosphor-icons/react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useUser } from '../hooks/use-user';
import clsx from 'clsx';

export function Sidebar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { userData, logout } = useUser();
	function handleLogout() {
		logout();

		navigate('/login');
	}

	return (
		<div className="flex flex-col items-center w-20 bg-neutral-950 h-screen py-4">
			<img src={userData.avatar} alt="user-photo" className="w-12.5 h-12.5 rounded-full" />
			<div className="flex flex-col mt-10 gap-10">
				<Link to="/" className={clsx(pathname === '/' ? 'text-vibrant' : 'text-detail')}>
					<ListChecksIcon size={32} className="hover:text-detail/80" />
				</Link>
				<Link to="/focus" className={clsx(pathname === '/focus' ? 'text-vibrant' : 'text-detail')}>
					<TimerIcon size={32} className="hover:text-detail/80" />
				</Link>
			</div>
			<SignOutIcon
				size={32}
				onClick={handleLogout}
				className="mt-auto text-red-600 hover:text-red-600/50 transition-colors cursor-pointer"
			/>
		</div>
	);
}
