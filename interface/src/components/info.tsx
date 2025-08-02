type InfoProps = {
	value: string;
	label: string;
};

export function Info({ value, label }: InfoProps) {
	return (
		<div className="flex flex-col items-center gap-2">
			<strong className="text-text font-bold text-2xl leading-2">{value}</strong>
			<span className="text-detail/80 font-normal text-base whitespace-nowrap">{label}</span>
		</div>
	);
}
