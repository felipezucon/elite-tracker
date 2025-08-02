import clsx from 'clsx';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'info' | 'error';
};

export function Button({
	children,
	className = '',
	variant = 'info',
	disabled,
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type="button"
			disabled={disabled}
			className={clsx(
				'flex items-center justify-center gap-1 w-full transition text-[1.13rem] h-8 rounded-md hover:shadow hover:shadow-detail',
				variant === 'error' ? 'bg-red-800 text-text' : 'bg-vibrant text-background',
				'disabled:bg-container disabled:text-text disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
				className,
			)}
		>
			{children}
		</button>
	);
}
