import { PaperPlaneRightIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { Sidebar } from '../components/sidebar';

export function Habits() {

	return (
		<div className="flex h-screen w-screen"><Sidebar /> 
		<div className="h-screen flex-1 bg-background text-text">
			<div className="h-screen w-2/3 border-r-1 p-5 border-r-detail">
				<header>
					<h1 className="font-semibold text-2xl">Hábitos Diários</h1>
					<span className="mt-4 text-sm font-light">Quarta-feira, 23 de Julho de 2025</span>
				</header>
				<div className="w-full h-9 px-2.5 flex items-center justify-between border border-detail rounded-sm my-10">
					<input
						type="text"
						name=""
						id=""
						className="w-[95%] text-lg focus:outline-none placeholder:pl-2 placeholder:text-detail/50"
						placeholder="Digite aqui um novo hábito"
					/>
					<PaperPlaneRightIcon
						className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
						size={24}
					/>
				</div>
				{/* Container Hábitos */}
				<div className="rounded-sm">
					<div className="flex items-center justify-between w-full h-12 border-b border-b-detail p-5">
						<p className="text-lg">Estudar Inglês</p>
						<div className="flex items-center justify-between w-[90px]">
							<PencilIcon size={20} />
							{/*  */}

							<input type="checkbox" className="" />

							{/*  */}
							<TrashIcon size={20} />
						</div>
					</div>
				</div>
			</div>
		</div></div>
	);
}
