import { IHeftPlugin, HeftSession, HeftConfiguration } from '@rushstack/heft';
import { default as heftExamplePlugin01 } from 'heft-example-plugin-01';

const PLUGIN_NAME: string = 'example-plugin-02';

export class ExamplePlugin02 implements IHeftPlugin {
  public displayName: string = PLUGIN_NAME;

  public apply(heftSession: HeftSession, heftConfiguration: HeftConfiguration): void {
    heftSession.applyForPlugin(heftExamplePlugin01, (plugin: typeof heftExamplePlugin01) => {
      plugin.hooks.exampleHook.tap(PLUGIN_NAME, () => {
        heftConfiguration.terminal.writeLine(
          `!!!!!!!!!!!!!!! Plugin "${plugin.displayName}" hook called !!!!!!!!!!!!!!! `
        );
      });
    });
  }
}

export default new ExamplePlugin02();
