import { ScheduleManager } from '../src/managers/ScheduleManager';
import { TaskFactory } from '../src/factories/TaskFactory';

describe('ScheduleManager', () => {
  it('should add a task successfully', () => {
    const manager = ScheduleManager.getInstance();
    const task = TaskFactory.createTask('Test Task', '10:00', '11:00', 'High');
    const result = manager.addTask(task);
    expect(result).toBe('Task added');
  });
});
