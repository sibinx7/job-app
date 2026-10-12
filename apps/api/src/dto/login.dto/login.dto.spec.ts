import { LoginDto } from './login.dto.js';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });
});
