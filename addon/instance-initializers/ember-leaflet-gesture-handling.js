/* global L */
import { GestureHandling } from "leaflet-gesture-handling";

const leaf = typeof L === 'undefined' ? {} : L;

export function initialize(appInstance) {
  const config = appInstance.resolveRegistration('config:environment');
  const gestureHandlingConfig = Object.assign({}, config.ENV.leafletGestureHandling || { enabled: true });

  if (gestureHandlingConfig.enabled) {
    const options = {};

    if (!isNaN(parseInt(gestureHandlingConfig.duration))) {
      options.duration = gestureHandlingConfig.duration;
    }

    if (gestureHandlingConfig.text) {
      options.text = gestureHandlingConfig.text;
    }

    leaf.Map.mergeOptions({
      gestureHandling: true,
      gestureHandlingOptions: options
    });

    leaf.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
  }
}

export default {
  initialize
};
