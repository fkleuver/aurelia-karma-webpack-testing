import './setup';
import { App } from './../src/app';
import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent, ComponentTester } from 'aurelia-testing';
import { PLATFORM } from 'aurelia-framework';
import { assert } from 'chai';

describe('App', () => {
  let el: HTMLElement;
  let tester: ComponentTester;
  let sut: App;

  beforeEach(async () => {
    tester = StageComponent
      .withResources([
        PLATFORM.moduleName('greeter'),
        PLATFORM.moduleName('app')
      ])
      .inView(`<app></app>`)
      .manuallyHandleLifecycle();

    await tester.create(bootstrap);
    el = <HTMLElement>tester.element;
    sut = tester.viewModel;
  });

  it('renders correctly', async () => {
    await tester.bind({});
    await tester.attached();

    assert.equal(el.innerText.trim(), 'Hello, Bob!');
  });
});
