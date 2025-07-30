// biome-ignore assist/source/organizeImports: <>
import type { Request, Response } from 'express';
import { z } from 'zod';
import { habitModel } from '../models/habits.model';
import { validationErrorMessage } from '../utils/validationErrorMessage.util';
import dayjs from 'dayjs';
import mongoose from 'mongoose';

export class HabitsController {
	//POST - Create
	store = async (req: Request, res: Response): Promise<Response> => {
		// Middlerware
		const schema = z.object({
			name: z.string(),
		});

		const habit = schema.safeParse(req.body);

		if (!habit.success) {
			const errors = validationErrorMessage(habit.error.issues);

			return res.status(422).json({ message: errors });
		}
		// Controller
		const findHabit = await habitModel.findOne({ name: habit.data.name });

		if (findHabit) {
			return res.status(400).json({ message: 'Habits already exist' });
		}

		const newHabit = await habitModel.create({
			name: habit.data.name,
			completedDates: [],
			userId: req.user.id,
		});

		return res.status(201).json(newHabit);
	};

	//GET - List
	index = async (req: Request, res: Response): Promise<Response> => {
		const listHabits = await habitModel.find({ userId: req.user.id }).sort({ name: 1 });

		return res.status(200).json(listHabits);
	};

	//DELETE - Remove
	remove = async (req: Request, res: Response): Promise<Response> => {
		//Middlerware
		const idSchema = z.object({
			id: z.string(),
		});

		const idHabit = idSchema.safeParse(req.params);

		if (!idHabit.success) {
			const errors = validationErrorMessage(idHabit.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const findIdHabit = await habitModel.findOne({ _id: idHabit.data.id, userId: req.user.id });

		if (!findIdHabit) {
			return res.status(404).json({ message: 'Habit not found' });
		}

		await habitModel.deleteOne({ _id: idHabit.data.id });

		return res.status(200).json('Habit successfully removed');
	};

	//PATCH - Update toggle
	toggle = async (req: Request, res: Response) => {
		//Middlerware
		const idSchema = z.object({
			id: z.string(),
		});

		const validated = idSchema.safeParse(req.params);

		if (!validated.success) {
			const errors = validationErrorMessage(validated.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const findIdHabit = await habitModel.findOne({ _id: validated.data.id, userId: req.user.id });

		if (!findIdHabit) {
			return res.status(404).json({ message: 'Habit not found' });
		}

		const now = dayjs().startOf('day').toISOString();

		const isHabitCompletedOnDate = findIdHabit
			.toObject()
			?.completedDates.find((item) => dayjs(String(item)).startOf('day').toISOString() === now);

		if (isHabitCompletedOnDate) {
			const habitUpdated = await habitModel.findOneAndUpdate(
				{
					_id: validated.data.id,
				},
				{
					$pull: {
						completedDates: now,
					},
				},
				{
					returnDocument: 'after',
				},
			);

			return res.status(200).json(habitUpdated);
		} else {
			const habitUpdated = await habitModel.findOneAndUpdate(
				{
					_id: validated.data.id,
				},
				{
					$push: {
						completedDates: now,
					},
				},
				{
					returnDocument: 'after',
				},
			);

			return res.status(200).json(habitUpdated);
		}
	};

	//GET - Metricas
	metrics = async (req: Request, res: Response) => {
		//Middleware
		const schema = z.object({
			id: z.string(),
			date: z.coerce.date(),
		});

		const validated = schema.safeParse({ ...req.params, ...req.query });

		if (!validated.success) {
			const errors = validationErrorMessage(validated.error.issues);

			return res.status(422).json({ message: errors });
		}

		//Controller
		const dateFrom = dayjs(validated.data.date).startOf('month');
		const dateTo = dayjs(validated.data.date).endOf('month');

		const [habitMetrics] = await habitModel
			.aggregate()
			.match({
				_id: new mongoose.Types.ObjectId(validated.data.id),
				userId: req.user.id,
			})
			.project({
				_id: 1,
				name: 1,
				completedDates: {
					$filter: {
						input: '$completedDates',
						as: 'completedDate',
						cond: {
							$and: [
								{
									$gte: ['$$completedDate', dateFrom.toDate()],
								},
								{
									$lte: ['$$completedDate', dateTo.toDate()],
								},
							],
						},
					},
				},
			});

		if (!habitMetrics) {
			return res.status(404).json({ message: 'Habit not found' });
		}

		return res.status(200).json(habitMetrics);
	};
}
