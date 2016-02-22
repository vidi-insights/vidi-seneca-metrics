![Banner][]

# vidi-seneca-metrics
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

The demo runs emits seneca messages on regular intervals and prints the mapped results to screen.

## Options

```js
{
  // The name the plugin is registered with
  plugin: 'vidi-seneca-metrics',

  // The role to use when acting and adding actions
  role: 'metrics',

  // A group to assign to emitted metrics
  group: '',

  // A tag to assign to emitted metrics
  tag: '',

  // A pid to assign to emitted metrics
  pid: process.pid,

  // The size of the rolling stats
  size: 9999,

  // The interval to calculate rolling stats
  interval: 1000
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
[Seneca]: http://senecajs.org
