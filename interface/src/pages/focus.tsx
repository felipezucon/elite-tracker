import { MinusCircleIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { Header } from '../components/header';
import { useRef } from 'react';

export function Focus() {
	const focusInput = useRef<HTMLInputElement>(null);
	const restInput = useRef<HTMLInputElement>(null);

	function handleAddMinutes(type: 'focus' | 'rest') {
		if (type === 'focus') {
			const currentValue = Number(focusInput.current?.value);

			if (focusInput.current) {
				focusInput.current.value = String(currentValue + 5);
			}

			return;
		}

		if (type === 'rest') {
			const currentValue = Number(restInput.current?.value);

			if (restInput.current) {
				restInput.current.value = String(currentValue + 5);
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

	return (
		<div className="h-screen flex-1 bg-background text-text">
			<div className="h-screen w-2/3 border-r-1 p-5 border-r-detail">
				<Header title="Tempo de foco" />
				<div className="w-full max-w-140 h-9 px-2.5 flex mx-auto my-10 gap-5">
					<div className="flex items-center p-1 border border-detail rounded-sm">
						<PlusCircleIcon
							className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
							size={24}
							onClick={() => handleAddMinutes('focus')}
						/>

						<input
							ref={focusInput}
							type="number"
							className="text-lg text-center focus:outline-none placeholder:pl-2 placeholder:text-detail/50"
							placeholder="Tempo de foco"
							disabled
                            
						/>

						<MinusCircleIcon
							onClick={() => handleMinusMinutes('focus')}
							className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
							size={24}
						/>
					</div>

					<div className="flex items-center p-1 border border-detail rounded-sm">
						<PlusCircleIcon
							onClick={() => handleAddMinutes('rest')}
							className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
							size={24}
						/>

						<input
							ref={restInput}
							type="number"
							className="text-lg text-center focus:outline-none placeholder:pl-2 placeholder:text-detail/50"
							placeholder="Tempo de descanso"
							disabled
						/>

						<MinusCircleIcon
							onClick={() => handleMinusMinutes('rest')}
							className="mx-auto text-detail/50 cursor-pointer hover:text-vibrant transition-colors"
							size={24}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
