import { AdminGuard } from './admin.guard.js';

describe('AdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuard()).toBeDefined();
  });
});
