'use strict';

module.exports = {
  name: require('./package').name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import("node_modules/leaflet-gesture-handling/dist/leaflet-gesture-handling.css");
  },
};
