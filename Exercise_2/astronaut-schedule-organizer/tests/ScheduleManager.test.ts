import { ScheduleManager } from '../src/managers/ScheduleManager';
import { TaskFactory } from '../src/factories/TaskFactory';

describe('ScheduleManager Test Suite', () => {
  let manager: ScheduleManager;

  beforeEach(() => {
    // Reinitialize the manager before each test to avoid data carry-over between tests
    manager = ScheduleManager.getInstance();
    manager.clearTasks();
  });
  test('View tasks when no tasks exist', () => {
    const tasks = manager.viewTasks();
    expect(tasks.length).toBe(0);  // No tasks exist
  });
  test('Add Task "Morning Exercise", no conflicts', () => {
    const task = TaskFactory.createTask('Morning Exercise', '07:00', '08:00', 'High');
    const result = manager.addTask(task);
    expect(result).toBe('Task added');
  });

  test('Add Task "Team Meeting", no conflicts', () => {
    const task = TaskFactory.createTask('Team Meeting', '09:00', '10:00', 'Medium');
    const result = manager.addTask(task);
    expect(result).toBe('Task added');
  });

  test('View all tasks (should show Morning Exercise and Team Meeting)', () => {
    manager.addTask(TaskFactory.createTask('Morning Exercise', '07:00', '08:00', 'High'));
    manager.addTask(TaskFactory.createTask('Team Meeting', '09:00', '10:00', 'Medium'));

    const tasks = manager.viewTasks();
    expect(tasks).toEqual([
      { description: 'Morning Exercise', startTime: '07:00', endTime: '08:00', priority: 'High', isCompleted: false },
      { description: 'Team Meeting', startTime: '09:00', endTime: '10:00', priority: 'Medium', isCompleted: false }
    ]);
  });

  test('Remove Task "Morning Exercise", task removed successfully', () => {
    manager.addTask(TaskFactory.createTask('Morning Exercise', '07:00', '08:00', 'High'));
    const result = manager.removeTask('Morning Exercise');
    expect(result).toBe('Task removed');
  });

  test('Add Task "Lunch Break", no conflicts', () => {
    const task = TaskFactory.createTask('Lunch Break', '12:00', '13:00', 'Low');
    const result = manager.addTask(task);
    expect(result).toBe('Task added');
  });

  // Negative Test Cases
  test('Add Task "Training Session", conflicts with "Team Meeting"', () => {
    manager.addTask(TaskFactory.createTask('Team Meeting', '09:00', '10:00', 'Medium'));
    const task = TaskFactory.createTask('Training Session', '09:30', '10:30', 'High');
    const result = manager.addTask(task);
    expect(result).toBe('Task conflict');
  });

  test('Remove non-existent task', () => {
    const result = manager.removeTask('Non-existent Task');
    expect(result).toBe('Task not found');
  });

  test('Add Task with invalid time "25:00" to "26:00"', () => {
    const task = TaskFactory.createTask('Invalid Time Task', '25:00', '26:00', 'Low');
    const result = manager.addTask(task);
    expect(result).toBe('Invalid time');
  });

  test('Add Task "Overlap Task", conflicts with "Team Meeting"', () => {
    manager.addTask(TaskFactory.createTask('Team Meeting', '09:00', '10:00', 'Medium'));
    const task = TaskFactory.createTask('Overlap Task', '08:30', '09:30', 'Medium');
    const result = manager.addTask(task);
    expect(result).toBe('Task conflict');
  });

  test('View tasks when no tasks exist', () => {
    const tasks = manager.viewTasks();
    expect(tasks.length).toBe(0);  // No tasks exist
  });
});
