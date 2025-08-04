import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

dayjs.updateLocale('pt-br', {
	months: [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	],
	weekdays: [
		'Domingo',
		'Segunda-feira',
		'Terça-feira',
		'Quarta-feira',
		'Quinta-feira',
		'Sexta-feira',
		'Sábado',
	],
});

dayjs.locale('pt-br');

type HeaderProps = {
	title: string;
};

export function Header({ title }: HeaderProps) {
	const today = dayjs().startOf('day').format('dddd, DD [de] MMMM [de] YYYY');

	return (
		<header>
			<h1 className="font-semibold text-2xl text-text">{title}</h1>
			<span className="mt-4 text-sm font-light text-text">{today}</span>
		</header>
	);
}
