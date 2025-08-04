import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'dayjs/locale/pt-br';


import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';

import { RouterProvider } from 'react-router';
import { UserProvider } from './hooks/use-user';
import { router } from './routes';

export function App() {
	return (
		<UserProvider>
			<DatesProvider settings={{ locale: 'pt-br' }}>
				<MantineProvider defaultColorScheme="dark">
					<RouterProvider router={router} />
				</MantineProvider>
			</DatesProvider>
		</UserProvider>
	);
}
