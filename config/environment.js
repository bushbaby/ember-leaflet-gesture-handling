'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    ENV: {
      leafletGestureHandling : {
        enabled :true,
        text: {
          touch: "Hai, use two fingers to move the map",
          scroll: "Hai, use ctrl + scroll to zoom the map",
          scrollMac: "Hait, use \u2318 + scroll to zoom the map"
        },
        duration: 2000
      }
    }
  };
};
