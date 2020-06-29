import Application from '@ember/application';

import { initialize } from 'dummy/instance-initializers/ember-leaflet-gesture-handling';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import sinon from 'sinon';

module('Unit | Instance Initializer | ember-leaflet-gesture-handling', function (hooks) {
  hooks.beforeEach(function () {
    // eslint-disable-next-line ember/no-classic-classes
    this.TestApplication = Application.extend();
    this.TestApplication.instanceInitializer({
      name: 'ember-leaflet-gesture-handling',
      initialize
    });
    this.application = this.TestApplication.create({ autoboot: false });
    this.instance = this.application.buildInstance();

    window.L = {
      Map: {
        mergeOptions: sinon.stub(),
        addInitHook: sinon.stub(),
      }
    };
  });

  hooks.afterEach(function () {
    run(this.instance, 'destroy');
    run(this.application, 'destroy');
  });

  test('it will enabled when no environment configuration has been defined', async function (assert) {
    this.instance.register('config:environment', { ENV: {} });

    await this.instance.boot();

    const calledConfig = { gestureHandling: true };

    assert.ok(window.L.Map.mergeOptions.calledWith(calledConfig), 'mergeOptions was not invoked with expected arguments');
    assert.ok(window.L.Map.addInitHook.calledOnce, 'addInitHook was not invoked');
  });

  test('it can be configured to be not enabled', async function (assert) {
    const envConfig = {
      enabled: false
    };

    this.instance.register('config:environment', { ENV: { leafletGestureHandling: envConfig } });

    await this.instance.boot();

    assert.ok(window.L.Map.mergeOptions.notCalled, 'mergeOptions was invoked');
    assert.ok(window.L.Map.addInitHook.notCalled, 'addInitHook was invoked');
  });

  test('it can be configured with a duration', async function (assert) {
    const envConfig = {
      duration: 1500
    };

    this.instance.register('config:environment', { ENV: { leafletGestureHandling: envConfig } });

    await this.instance.boot();

    const calledConfig = Object.assign({ gestureHandling: true }, { gestureHandlingOptions: envConfig });

    assert.ok(window.L.Map.mergeOptions.calledWith(calledConfig), 'mergeOptions was not invoked with expected arguments');
    assert.ok(window.L.Map.addInitHook.calledOnce, 'addInitHook was not invoked');
  });

  test('it can be configured with a text hash', async function (assert) {
    const envConfig = {
      text: {
        touch: "Hai, use two fingers to move the map",
        scroll: "Hai, use ctrl + scroll to zoom the map",
        scrollMac: "Hai, use \u2318 + scroll to zoom the map"
      }
    };

    this.instance.register('config:environment', { ENV: { leafletGestureHandling: envConfig } });

    await this.instance.boot();

    const calledConfig = Object.assign({ gestureHandling: true }, { gestureHandlingOptions: envConfig });

    assert.ok(window.L.Map.mergeOptions.calledWith(calledConfig), 'mergeOptions was not invoked with unexpected params');
    assert.ok(window.L.Map.addInitHook.calledOnce, 'addInitHook was not invoked');
  });
});
