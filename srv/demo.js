'use strict'

var opts = {
  port: 6011,
  metrics: {
    emitter: {enabled: true},
    collector: {enabled: true}
  },
  seneca_metrics: {
    pins: [
      'role:demo, cmd:one',
      'role:demo, cmd:two'
    ]
  }
}

require('seneca')()
  .use('vidi-metrics', opts.metrics)
  .use(require('..'), opts.seneca_metrics)
  .use(msg_generator)
  .use(sink_logger)
  .listen({port: opts.port})

function msg_generator (opts) {
  var seneca = this

  seneca
    .add('role:demo, cmd:one', function (msg, done) {done()})
    .add('role:demo, cmd:two', function (msg, done) {done()})
    .ready(function (err) {
      if (err) {
        seneca.log.error(err)
        return
      }

      setInterval(function () {
        seneca.act('role:demo, cmd:one')
        seneca.act('role:demo, cmd:two')
      }, 500)
    })

  return 'msg_generator'
}


function sink_logger (opts) {
  this.add({role: 'metrics', hook: 'sink'}, function (msg, done) {
    console.log(JSON.stringify(msg.metric, null, 2))
    done()
  })

  return 'sink-logger'
}
