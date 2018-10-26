import './setup';
import { Greeter } from './../src/greeter';
import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent, ComponentTester } from 'aurelia-testing';
import { PLATFORM } from 'aurelia-framework';
import { assert } from 'chai';

describe('Greeter', () => {
  let el: HTMLElement;
  let tester: ComponentTester;
  let sut: Greeter;

  beforeEach(async () => {
    tester = StageComponent
      .withResources(PLATFORM.moduleName('greeter'))
      .inView(`<greeter name.bind="name"></greeter>`)
      .manuallyHandleLifecycle();

    await tester.create(bootstrap);
    el = <HTMLElement>tester.element;
    sut = tester.viewModel;
  });

  it('binds correctly', async () => {
    await tester.bind({ name: 'Bob' });

    assert.equal(sut.name, 'Bob');
  });

  it('renders correctly', async () => {
    await tester.bind({ name: 'Bob' });
    await tester.attached();

    assert.equal(el.innerText.trim(), 'Hello, Bob!');
  });
});
