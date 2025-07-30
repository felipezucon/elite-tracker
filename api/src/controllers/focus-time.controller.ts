// biome-ignore assist/source/organizeImports: <>
import type { Request, Response } from 'express';
import { z } from 'zod';
import { validationErrorMessage } from '../utils/validationErrorMessage.util';
import dayjs from 'dayjs';
import { focusTimeModel } from '../models/focus-time.model';

export class FocusController {
	//POST - Create
	store = async (req: Request, res: Response) => {
		//Middleware
		const schema = z.object({
			timeFrom: z.coerce.date(),
			timeTo: z.coerce.date(),
		});

		const focusTime = schema.safeParse(req.body);

		if (!focusTime.success) {
			const errors = validationErrorMessage(focusTime.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const timeFrom = dayjs(focusTime.data?.timeFrom);
		const timeTo = dayjs(focusTime.data?.timeTo);

		const isTimeToBeforeTimeFrom = timeTo.isBefore(timeFrom);

		if (isTimeToBeforeTimeFrom) {
			return res.status(400).json({ message: 'timeTo cannot be in the past' });
		}

		const createTimeFocus = await focusTimeModel.create({
			timeFrom: timeFrom.toDate(),
			timeTo: timeTo.toDate(),
			userId: req.user.id,
		});

		return res.status(201).json(createTimeFocus);
	};

	//GET - metrics by day
	index = async (req: Request, res: Response) => {
		//Middleware
		const schema = z.object({
			date: z.coerce.date(),
		});

		const validated = schema.safeParse(req.query);

		if (!validated.success) {
			const errors = validationErrorMessage(validated.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const startDate = dayjs(validated.data.date).startOf('day');
		const endDate = dayjs(validated.data.date).endOf('day');

		const focusTime = await focusTimeModel
			.find({
				timeFrom: {
					$gte: startDate.toDate(),
					$lte: endDate.toDate(),
				},
				userId: req.user.id,
			})
			.sort({ timeFrom: 1 });

		return res.status(200).json(focusTime);
	};

	//GET - metrics by month
	metricsByMonth = async (req: Request, res: Response) => {
		//Middleware
		const schema = z.object({
			date: z.coerce.date(),
		});

		const validated = schema.safeParse(req.query);

		if (!validated.success) {
			const errors = validationErrorMessage(validated.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const startDate = dayjs(validated.data.date).startOf('month');
		const endDate = dayjs(validated.data.date).endOf('month');

		const focusTimeMetrics = await focusTimeModel
			.aggregate()
			.match({
				timeFrom: {
					$gte: startDate.toDate(),
					$lte: endDate.toDate(),
				},
				userId: req.user.id,
			})
			.project({
				year: {
					$year: '$timeFrom',
				},
				month: {
					$month: '$timeFrom',
				},
				day: {
					$dayOfMonth: '$timeFrom',
				},
			})
			.group({
				_id: ['$year', '$month', '$day'],
				count: { $sum: 1 },
			})
			.sort({ _id: 1 });

		return res.status(200).json(focusTimeMetrics);
	};
}
