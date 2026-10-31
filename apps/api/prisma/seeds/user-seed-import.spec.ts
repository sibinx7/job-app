import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

describe('user seed shared enum import', () => {
  it('loads the user enums through the package source entry with Node and tsx', () => {
    const source = `
      import { UserGender, UserRole, UserStatus } from '@job-app/shared/source';
      console.log(JSON.stringify({
        gender: UserGender.MALE,
        role: UserRole.JOB_SEEKER,
        status: UserStatus.ACTIVE,
      }));
    `;
    const result = spawnSync(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '--eval', source],
      {
        cwd: fileURLToPath(new URL('../..', import.meta.url)),
        encoding: 'utf8',
      },
    );

    expect(result.status, result.stderr).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({
      gender: 'MALE',
      role: 'JOB_SEEKER',
      status: 'ACTIVE',
    });
  });
});