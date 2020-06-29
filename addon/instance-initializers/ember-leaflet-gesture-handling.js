import { GestureHandling } from "leaflet-gesture-handling";

export function initialize(appInstance) {
  const leaf = typeof window.L === 'undefined' ? {} : window.L;

  const config = appInstance.resolveRegistration('config:environment');
  const gestureHandlingConfig = Object.assign({}, config.ENV.leafletGestureHandling || { enabled: true });

  if (gestureHandlingConfig.enabled === undefined) {
    gestureHandlingConfig.enabled = true;
  }

  if (gestureHandlingConfig.enabled) {
    const options = {gestureHandling: true};

    if (!isNaN(parseInt(gestureHandlingConfig.duration))) {
      options.gestureHandlingOptions = {duration : gestureHandlingConfig.duration};
    }

    if (gestureHandlingConfig.text) {
      options.gestureHandlingOptions = Object.assign({text : gestureHandlingConfig.text}, options.gestureHandlingOptions)
    }

    leaf.Map.mergeOptions(options);

    leaf.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
  }
}

export default {
  initialize
};
