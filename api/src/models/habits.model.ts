import { model, Schema } from 'mongoose';

const HabitsSchema = new Schema(
	{
		name: String,
		completedDates: [Date],
		userId: String,
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export const habitModel = model('Habit', HabitsSchema);
