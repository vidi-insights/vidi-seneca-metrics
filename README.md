# vidi-seneca-metrics
Generate and map metrics from Seneca

![Banner][]

# vidi-influx-sink

- __Lead Maintainer:__ [Dean McDonnell][Lead]
- __Sponsor:__ [nearForm][Sponsor]

A Vidi: Metrics plugin that generates metrics [Seneca][]. Can be ran as a plugin or as a
stand-alone micro-service. Used on both collectors and emitters.

- __Work in progress:__ This module is currently a work in progress.

## Running as a plugin
To use as a plugin, install via npm and use in your Seneca system,

```
npm install vidi-metrics
npm install vidi-seneca-metrics
```

```js
var opts = {
  collector: {enabled: true},
  emitter: {enabled: true}
}

require('seneca')()
  .use('vidi-metrics', opts)
  .use('vidi-seneca-metrics')
  ...
```

## Running as a micro-service
A demo micro-service can be found in `srv/demo.js` and ran via npm. Simply clone this repository
locally and run,

```
npm install; npm run demo
```

The demo runs in collector mode and tracks any data emitted by toolbag to it's default port. It makes a
great springboard for a custom micro-service tailored to your needs. Check the [Org][] for additional
plugins that can be dropped in to add more functionality.

## Options

```js
{
  // The name the plugin is registered with
  plugin: 'vidi-seneca-metrics',

  // The role that is used when adding the sink
  role: 'metrics',

  // Batch save settings
  batch: {
    // Max per batch before write
    max: 5,

    // Force write timeout
    timeout: 500,
  },

  // The plugin will disable on InfluxDb Error
  enabled: true
}

```

## Contributing
The [Vidi: Insights org][Org] encourages __open__ and __safe__ participation.

- [Code of Conduct][CoC]

If you feel you can help in any way, be it with documentation, examples, extra testing, or new
features please get in touch.

## License
Copyright (c) 2016, Dean McDonnell and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/vidi-insights/org/master/assets/vidi-banner.png
[Lead]: https://github.com/mcdonnelldean
[Sponsor]: http://www.nearform.com/
[Org]: https://github.com/vidi-insights
[CoC]: https://github.com/vidi-insights/org/blob/master/code-of-conduct.md
[MIT]: ./LICENSE

[Toolbag]: https://github.com/continuationlabs/toolbag
