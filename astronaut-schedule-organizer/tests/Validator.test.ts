import { Validator } from '../src/utils/Validator';
import { Task } from '../src/models/Task';

describe('Validator Tests', () => {
  it('should validate task times correctly', () => {
    const isValid = Validator.validateTaskTime('09:00', '10:00');
    expect(isValid).toBe(true);
  });

  it('should detect invalid task times', () => {
    const isValid = Validator.validateTaskTime('10:00', '09:00');
    expect(isValid).toBe(false);
  });
});
