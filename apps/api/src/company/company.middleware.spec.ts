import { CompanyMiddleware } from './company.middleware.js';

describe('CompanyMiddleware', () => {
  it('should be defined', () => {
    expect(new CompanyMiddleware()).toBeDefined();
  });
});
