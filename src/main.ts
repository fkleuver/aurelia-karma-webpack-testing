import { Aurelia, PLATFORM } from 'aurelia-framework';

export async function configure(au: Aurelia): Promise<void> {
  au.use.standardConfiguration();
  au.use.developmentLogging();

  au.use.globalResources([
    PLATFORM.moduleName('greeter')
  ]);

  const root = PLATFORM.moduleName('app');
  const host = document.querySelector('[aurelia-app]');

  await au.start();

  await au.setRoot(root, host);
}
