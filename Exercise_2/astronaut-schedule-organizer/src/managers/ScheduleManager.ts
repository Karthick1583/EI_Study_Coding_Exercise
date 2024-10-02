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

    public addTask(task: Task): string {
        if (!Validator.validateTaskTime(task.startTime, task.endTime)) {
            Logger.log('Error: Invalid time');
            return 'Invalid time';
        }

        if (Validator.checkTaskConflict(task, this.tasks)) {
            Logger.log('Error: Task conflict with existing tasks');
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

    // New: View tasks by priority
    public viewTasksByPriority(priority: string): Task[] {
        return this.tasks.filter(task => task.priority.toLowerCase() === priority.toLowerCase());
    }

    // New: Mark a task as completed
    public markTaskAsCompleted(description: string): string {
        const task = this.tasks.find(task => task.description === description);
        if (!task) {
            Logger.log(`Error: Task "${description}" not found`);
            return 'Task not found';
        }
        task.isCompleted = true;
        Logger.log(`Task "${description}" marked as completed.`);
        return 'Task marked as completed';
    }

    // New: Edit an existing task
    public editTask(
        description: string, 
        newDescription: string, 
        newStartTime: string, 
        newEndTime: string, 
        newPriority: string
    ): string {
        const task = this.tasks.find(task => task.description === description);
        if (!task) {
            Logger.log(`Error: Task "${description}" not found`);
            return 'Task not found';
        }

        if (!Validator.validateTaskTime(newStartTime, newEndTime)) {
            Logger.log('Error: Invalid time');
            return 'Invalid time';
        }

        const newTask = new Task(newDescription, newStartTime, newEndTime, newPriority);

        // Check for conflicts with other tasks
        if (Validator.checkTaskConflict(newTask, this.tasks.filter(t => t.description !== description))) {
            Logger.log('Error: Task conflict with existing tasks');
            return 'Task conflict';
        }

        // Update the task details
        task.description = newDescription;
        task.startTime = newStartTime;
        task.endTime = newEndTime;
        task.priority = newPriority;

        Logger.log(`Task "${description}" edited successfully.`);
        return 'Task edited successfully';
    }

    // Clear the task list
    public clearTasks(): void {
        this.tasks = [];
    }
}
