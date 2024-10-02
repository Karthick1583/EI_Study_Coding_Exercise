import { Task } from '../models/Task';

export class TaskFactory {
    public static createTask(description: string, startTime: string, endTime: string, priority: string): Task {
        return new Task(description, startTime, endTime, priority);
    }
}
