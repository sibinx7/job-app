import { UserMiddleware } from './user.middleware.js';

describe('UserMiddleware', () => {
  it('should be defined', () => {
    expect(new UserMiddleware()).toBeDefined();
  });
});
