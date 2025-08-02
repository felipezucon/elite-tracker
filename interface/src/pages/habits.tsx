import { PaperPlaneRightIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import dayjs from 'dayjs';
import { Header } from '../components/header';
import { Info } from '../components/info';
import clsx from 'clsx';
import { Calendar } from '@mantine/dates';

type Habits = {
	_id: string;
	name: string;
	completedDates: string[];
	userId: string;
	createdAt: string;
	updatedAt: string;
};

type HabitsMetrics = {
	_id: string;
	name: string;
	completedDates: string[];
};

export function Habits() {
	const [habits, setHabits] = useState<Habits[]>([]);
	const [metrics, setMetrics] = useState<HabitsMetrics>({} as HabitsMetrics);
	const [selectHabit, setSelectHabit] = useState<Habits | null>(null);
	const nameInput = useRef<HTMLInputElement>(null);

	const today = dayjs().startOf('day').toISOString();

	async function handleSelect(habit: Habits) {
		setSelectHabit(habit);
	}

	async function loadHabits() {
		const { data } = await api.get<Habits[]>('habits');

		setHabits(data);
	}

	async function handleSubmit() {
		const name = nameInput.current?.value;

		if (name) {
			await api.post('/habits', {
				name,
			});

			if (nameInput.current) {
				nameInput.current.value = '';
			}

			await loadHabits();
		}
	}

	async function handleToggle(id: string) {
		await api.patch(`/habits/${id}/toggle`);

		await loadHabits();
	}

	async function handleDelete(id: string) {
		await api.delete(`/habits/${id}`);

		await loadHabits();
	}

	useEffect(() => {
		loadHabits();
	}, []);

	return (
		<div className="h-screen w-full grid-cols-[60%_1fr] flex bg-background text-text">
			<div className="w-full border-r-1 p-5 border-r-detail">
				<Header title="Hábitos diários" />
				<div className="w-full h-9 px-2.5 flex items-center justify-between border border-detail rounded-sm my-10">
					<input
						type="text"
						ref={nameInput}
						className="w-[95%] text-lg focus:outline-none placeholder:pl-2 placeholder:text-detail/50"
						placeholder="Digite aqui um novo hábito"
					/>
					<PaperPlaneRightIcon
						className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
						size={24}
						onClick={handleSubmit}
					/>
				</div>
				{/* Container Hábitos */}
				<div className="rounded-sm">
					{habits.map((item) => (
						<div
							key={item._id}
							className={clsx(
								'flex items-center justify-between w-full h-12 border-b border-b-detail p-5 hover:bg-container',
								item._id === selectHabit?._id && 'bg-container',
							)}
						>
							{/** biome-ignore lint/a11y/useKeyWithClickEvents: <> */}
							<p onClick={() => handleSelect(item)} className="text-lg cursor-pointer w-full">
								{item.name}
							</p>
							<div className="flex items-center justify-between w-[90px]">
								<PencilIcon
									size={20}
									className="cursor-pointer hover:text-blue-500/50 transition-colors"
								/>
								<input
									type="checkbox"
									className=""
									checked={item.completedDates.some((item) => item === today)}
									onChange={() => handleToggle(item._id)}
								/>
								<TrashIcon
									size={20}
									className="cursor-pointer hover:text-red-500/50 transition-colors"
									onClick={() => handleDelete(item._id)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* Metricas */}
			<div className="p-5">
				<h2 className="font-semibold text-2xl mt-5">Estudar Inglês</h2>
				<div className="flex items-center justify-center py-10 gap-20 border-b border-detail">
					<Info value="20/30" label="Dias concluídos" />
					<Info value="66%" label="Porcentagem" />
				</div>
				<div className="flex items-center justify-center mt-10">
					<Calendar />
				</div>
			</div>
		</div>
	);
}
