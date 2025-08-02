type HeaderProps = {
	title: string;
};

export function Header({ title }: HeaderProps) {
	function formatarDataCustomizada(data: Date): string {
		const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
			dateStyle: 'full',
			timeZone: 'America/Sao_Paulo',
		}).format(data);

		return dataFormatada
			.replace(/^./, (letra) => letra.toUpperCase())
			.replace(/\b(de|do|da|dos|das)\b/g, (p) => p.toLowerCase())
			.replace(/\b[a-zà-ú]+\b/gi, (palavra) => {
				if (['de', 'do', 'da', 'dos', 'das'].includes(palavra.toLowerCase())) {
					return palavra;
				}
				return palavra.charAt(0).toUpperCase() + palavra.slice(1);
			});
	}

	return (
		<header>
			<h1 className="font-semibold text-2xl text-text">{title}</h1>
			<span className="mt-4 text-sm font-light text-text">{formatarDataCustomizada(new Date())}</span>
		</header>
	);
}
