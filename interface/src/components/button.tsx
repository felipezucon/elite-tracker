import type { ComponentProps} from 'react';

type ButtonProps = ComponentProps<'button'>;

export function Button({ children, className = '', ...props }: ButtonProps) {
	return (
		<button
		{...props}
			type="button"
			className={`flex items-center justify-center gap-1 w-full text-background bg-vibrant hover:shadow hover:shadow-detail transition text-[18px] h-8 rounded-md ${className}`}
		>
			{children}
		</button>
	);
}
