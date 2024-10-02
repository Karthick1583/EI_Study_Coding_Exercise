import { Task } from '../models/Task';

export class TaskObserver {
    public static notifyConflict(task: Task): void {
        console.log(`Conflict detected: Task "${task.description}" overlaps with another task.`);
    }

    public static notifyTaskAdded(task: Task): void {
        console.log(`Task "${task.description}" added successfully.`);
    }
}
