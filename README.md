ember-leaflet-gesture-handling
==============================================================================

This addon extends [leaflet-gesture-handling](https://github.com/elmarquis/Leaflet.GestureHandling) 
and is a plugin for [ember-leaflet](https://github.com/miguelcobain/ember-leaflet).

Brings the basic functionality of Google Maps Gesture Handling into Leaflet. 
Prevents users from getting trapped on the map when scrolling a long page.

Installation
------------------------------------------------------------------------------

```
ember install ember-leaflet-gesture-handling
```


Usage
------------------------------------------------------------------------------

It will be enabled by default after installation.

Disabling or further reconfiguration can be done via the application 
configuration (config/environment.js).

```json
ENV['leafletGestureHandling'] = {
  enabled: true,
  text: {
    touch: "two fingers to move the map",
    scroll: "ctrl + scroll to zoom the map",
    scrollMac: "\u2318 + scroll to zoom the map"
  },
  duration: 1000,
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
