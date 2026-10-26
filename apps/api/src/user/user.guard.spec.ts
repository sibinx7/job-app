import { UserGuard } from './user.guard.js';

describe('UserGuard', () => {
  it('should be defined', () => {
    expect(new UserGuard()).toBeDefined();
  });
});
