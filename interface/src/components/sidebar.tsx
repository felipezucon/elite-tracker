import { ListChecksIcon, SignOutIcon, TimerIcon } from '@phosphor-icons/react';
import { Link } from 'react-router';
import { useUser } from '../hooks/use-user';

export function Sidebar() {
	const { userData } = useUser();

	return (
		<div className="flex flex-col items-center w-20 bg-neutral-950 h-screen py-4">
			<img
				src={userData.avatar}
				alt="user-photo"
				className="w-12.5 h-12.5 rounded-full"
			/>
			<div className="flex flex-col mt-10 gap-5">
				<Link to="/">
					<ListChecksIcon size={32} className="text-detail hover:text-detail/80" />
				</Link>
				<Link to="/">
					<TimerIcon size={32} className="text-detail hover:text-detail/80" />
				</Link>
			</div>
			<Link className="mt-auto" to="/">
				<SignOutIcon size={32} className="text-red-600 hover:text-red-600/50 transition-colors" />
			</Link>
		</div>
	);
}
