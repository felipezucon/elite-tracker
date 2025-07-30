import type { ZodIssue } from 'zod';

export function validationErrorMessage(issues: ZodIssue[]): string[] {
	const errors = issues.map(
		(item) => `${item.path.join('.')}: ${item.message}`,
	);

	return errors;
}
