import { Task } from '../models/Task';

export class Validator {
    public static validateTaskTime(startTime: string, endTime: string): boolean {
        // Validate if the start and end times are in the correct format and logical
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        if (
            startHour < 0 || startHour >= 24 || startMinute < 0 || startMinute >= 60 ||
            endHour < 0 || endHour >= 24 || endMinute < 0 || endMinute >= 60
        ) {
            return false;
        }

        return (startHour < endHour) || (startHour === endHour && startMinute < endMinute);
    }

    public static checkTaskConflict(newTask: Task, tasks: Task[]): boolean {
        for (const task of tasks) {
            if (
                (newTask.startTime < task.endTime && newTask.endTime > task.startTime)
            ) {
                return true;
            }
        }
        return false;
    }
}
