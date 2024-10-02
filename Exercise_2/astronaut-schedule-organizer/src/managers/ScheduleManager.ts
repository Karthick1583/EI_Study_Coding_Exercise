import { Task } from '../models/Task';
import { Validator } from '../utils/Validator';
import { Logger } from '../utils/Logger';

export class ScheduleManager {
    private static instance: ScheduleManager;
    private tasks: Task[] = [];

    private constructor() {}

    public static getInstance(): ScheduleManager {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }
    public clearTasks(): void {
        this.tasks = [];
    }

    public addTask(task: Task): string {
        if (!Validator.validateTaskTime(task.startTime, task.endTime)) {
            Logger.log('Error: Invalid time');
            return 'Invalid time';
        }

        if (Validator.checkTaskConflict(task, this.tasks)) {
            Logger.log(`Error: Task conflict with existing tasks`);
            return 'Task conflict';
        }

        this.tasks.push(task);
        Logger.log(`Task "${task.description}" added successfully.`);
        return 'Task added';
    }

    public removeTask(description: string): string {
        const index = this.tasks.findIndex(task => task.description === description);
        if (index === -1) {
            Logger.log(`Error: Task "${description}" not found`);
            return 'Task not found';
        }

        this.tasks.splice(index, 1);
        Logger.log(`Task "${description}" removed successfully.`);
        return 'Task removed';
    }

    public viewTasks(): Task[] {
        return this.tasks.sort((a, b) => (a.startTime < b.startTime ? -1 : 1));
    }
}
