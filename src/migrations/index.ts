import * as migration_20260327_212120_initial from './20260327_212120_initial';

export const migrations = [
  {
    up: migration_20260327_212120_initial.up,
    down: migration_20260327_212120_initial.down,
    name: '20260327_212120_initial'
  },
];
