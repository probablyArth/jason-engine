import { Engine } from 'c/Engine';

const engine = new Engine('/home/arth/engine-pg');
(async () => {
  await engine.initialize();
})();
