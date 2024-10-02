import { TaskFactory } from '../src/factories/TaskFactory';

describe('TaskFactory Tests', () => {
  it('should create a new task', () => {
    const task = TaskFactory.createTask('Test Task', '09:00', '10:00', 'High');
    expect(task.description).toBe('Test Task');
    expect(task.startTime).toBe('09:00');
    expect(task.endTime).toBe('10:00');
    expect(task.priority).toBe('High');
  });
});
