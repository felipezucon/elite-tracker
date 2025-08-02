import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { Header } from '../components/header';
import { useRef, useState } from 'react';
import { Button } from '../components/button';
import { useTimer } from 'react-timer-hook';
import dayjs from 'dayjs';
import { api } from '../services/api';
import { Info } from '../components/info';
import { Calendar } from '@mantine/dates';

type Timers = {
	focus: number;
	rest: number;
};

enum TimerState {
	PAUSED = 'PAUSED',
	FOCUS = 'FOCUS',
	REST = 'REST',
}

const timerStateTitle = {
	[TimerState.PAUSED]: 'Pausado',
	[TimerState.FOCUS]: 'Em foco',
	[TimerState.REST]: 'Em descanso',
};

export function Focus() {
	const focusInput = useRef<HTMLInputElement>(null);
	const restInput = useRef<HTMLInputElement>(null);
	const [timers, setTimers] = useState<Timers>({ focus: 0, rest: 0 });
	const [timerState, setTimerState] = useState<TimerState>(TimerState.PAUSED);
	const [timeFrom, setTimeFrom] = useState<Date | null>(null);

	function addSeconds(date: Date, seconds: number) {
		const time = dayjs(date).add(seconds, 'seconds');

		return time.toDate();
	}

	function handleStart() {
		restTimer.pause();

		const now = new Date();

		focusTimer.restart(addSeconds(now, timers.focus * 60));

		setTimeFrom(now);
	}

	async function handleEnd() {
		focusTimer.pause();

		await api.post('/focus-time', {
			timeFrom: timeFrom?.toISOString(),
			timeTo: new Date().toISOString(),
		});

		setTimeFrom(null);
	}

	const focusTimer = useTimer({
		expiryTimestamp: new Date(),
		async onExpire() {
			if (timerState !== TimerState.PAUSED) {
				await handleEnd();
			}
		},
	});

	const restTimer = useTimer({
		expiryTimestamp: new Date(),
		async onExpire() {
			if (timerState !== TimerState.PAUSED) {
				await handleEnd();
			}
		},
	});

	function handleAddMinutes(type: 'focus' | 'rest') {
		if (type === 'focus') {
			const currentValue = Number(focusInput.current?.value);

			if (focusInput.current) {
				const value = currentValue + 5;
				focusInput.current.value = String(value);

				setTimers((old) => ({
					...old,
					focus: value,
				}));
			}

			return;
		}

		if (type === 'rest') {
			const currentValue = Number(restInput.current?.value);

			if (restInput.current) {
				const value = currentValue + 5;
				restInput.current.value = String(value);

				setTimers((old) => ({
					...old,
					rest: value,
				}));
			}

			return;
		}
	}

	function handleMinusMinutes(type: 'focus' | 'rest') {
		if (type === 'focus') {
			const currentValue = Number(focusInput.current?.value);

			if (focusInput.current) {
				focusInput.current.value = String(Math.max((currentValue || 0) - 5, 0));
			}

			return;
		}

		if (type === 'rest') {
			const currentValue = Number(restInput.current?.value);

			if (restInput.current) {
				restInput.current.value = String(Math.max((currentValue || 0) - 5, 0));
			}

			return;
		}
	}

	function handleCancel() {
		setTimers({
			focus: 0,
			rest: 0,
		});

		setTimerState(TimerState.PAUSED);

		if (focusInput.current) {
			focusInput.current.value = '';
		}

		if (restInput.current) {
			restInput.current.value = '';
		}
	}

	function handleFocus() {
		handleStart();

		setTimerState(TimerState.FOCUS);
	}

	async function handleRest() {
		await handleEnd();

		const now = new Date();

		restTimer.restart(addSeconds(now, timers.rest * 60));

		setTimerState(TimerState.REST);
	}

	return (
		<div className="h-screen w-full grid-cols-[60%_1fr] flex bg-background">
			<div className="w-full border-r-1 p-5 border-r-detail">
				<Header title="Tempo de foco" />
				{/* Inputs foco e descanso */}
				<div className="w-full max-w-140 h-9 flex items-center mx-auto my-10 gap-5">
					<div className="relative flex flex-1 max-w-65 items-center p-1 border border-detail rounded-sm">
						<PlusCircleIcon
							className="mx-auto hover:text-detail/50 cursor-pointer text-vibrant transition-colors"
							size={24}
							onClick={() => handleAddMinutes('focus')}
						/>

						<input
							ref={focusInput}
							id="focus"
							type="number"
							className="peer remove-arrow max-w-40 w-full text-base text-center focus:outline-none placeholder-transparent"
							placeholder="Tempo de foco"
						/>

						<label
							htmlFor="focus"
							className="absolute left-1/2 -translate-x-1/2 -top-7 text-detail/80 transition-all duration-200 text-base text-center whitespace-nowrap peer-placeholder-shown:top-1 peer-focus:-top-7"
						>
							Tempo de foco
						</label>

						<MinusCircleIcon
							onClick={() => handleMinusMinutes('focus')}
							className="mx-auto hover:text-detail/50 cursor-pointer text-vibrant transition-colors"
							size={24}
						/>
					</div>
					{/* Input descanso */}
					<div className="flex relative flex-1 max-w-65 items-center p-1 border border-detail rounded-sm">
						<PlusCircleIcon
							onClick={() => handleAddMinutes('rest')}
							className="mx-auto hover:text-detail/50 cursor-pointer text-vibrant transition-colors"
							size={24}
						/>

						<input
							ref={restInput}
							type="number"
							id="rest"
							className="peer remove-arrow text-base max-w-40 text-center focus:outline-none placeholder-transparent"
							placeholder="Tempo de descanso"
						/>

						<label
							htmlFor="rest"
							className="absolute left-1/2 -translate-x-1/2 -top-7 text-detail/80 transition-all duration-200 text-base text-center whitespace-nowrap peer-placeholder-shown:top-1 peer-focus:-top-7"
						>
							Tempo de descanso
						</label>

						<MinusCircleIcon
							onClick={() => handleMinusMinutes('rest')}
							className="mx-auto hover:text-detail/50 cursor-pointer text-vibrant transition-colors"
							size={24}
						/>
					</div>
				</div>
				{/* Timer */}
				<div className="flex flex-col items-center justify-center min-w-35 max-w-70 w-full aspect-square border-3 border-detail mx-auto rounded-full">
					{/* Titulo */}
					<strong className="font-normal text-text">{timerStateTitle[timerState]}</strong>
					{/* Relógio */}
					{timerState === TimerState.PAUSED && (
						<span className="font-semibold text-5xl text-text">{`${String(timers.focus).padStart(2, '0')}:00`}</span>
					)}

					{timerState === TimerState.FOCUS && (
						<span className="font-semibold text-5xl text-text">{`${String(focusTimer.minutes).padStart(2, '0')}:${String(focusTimer.seconds).padStart(2, '0')}`}</span>
					)}

					{timerState === TimerState.REST && (
						<span className="font-semibold text-5xl text-text">{`${String(restTimer.minutes).padStart(2, '0')}:${String(restTimer.seconds).padStart(2, '0')}`}</span>
					)}
				</div>
				{/* Botões */}
				<div className="flex flex-col items-center mx-auto mt-10 w-full max-w-45 gap-5">
					{timerState === TimerState.PAUSED && (
						<Button onClick={handleFocus} disabled={timers.focus <= 0 || timers.rest <= 0}>
							Começar
						</Button>
					)}

					{timerState === TimerState.FOCUS && (
						<Button onClick={handleRest}>Iniciar descanso</Button>
					)}

					{timerState === TimerState.REST && <Button onClick={handleFocus}>Retomar</Button>}

					<Button onClick={handleCancel} variant="error">
						Cancelar
					</Button>
				</div>
			</div>
			{/* Metricas */}
			<div className="p-5">
				<h2 className="font-semibold text-2xl mt-5 text-text">Estudar Inglês</h2>
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
