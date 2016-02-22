'use strict'

var RStats = require('rolling-stats')
var _ = require('lodash')

var opts = {
  plugin: 'vidi-seneca-metrics',
  group: '',
  tag: '',
  pid: process.pid,
  role: 'metrics',
  size: 9999,
  interval: 1000
}

module.exports = function (options) {
  var seneca = this
  var extend = seneca.util.deepextend

  opts = extend(opts, options)
  opts.stats = RStats.NamedStats(opts.size, opts.interval)

  var pin  = opts.pin || opts.pins || null
  var pins = Array.isArray(pin) ? pin : [pin]

  pins.forEach(pin => {
    seneca.sub(pin, msg => {
      opts.stats.point(1, msg.meta$.sub)
    })
  })

  seneca.add({role: opts.role, hook: 'map'}, map)
  seneca.add({role: opts.role, hook: 'emit'}, emit)


  return {
    name: opts.plugin
  }
}

function emit (msg, done) {
  var stats = opts.stats.calculate()
  var payload = []
  var pins = []

  _.forOwn(stats, (stat, key) => {
    pins.push({
      pattern: key,
      rate: stat.count
    })
  })

  done(null, [{
    source: 'seneca-metrics',
    payload: {
      group: opts.group,
      tag: opts.tag,
      pid: opts.pid,
      pins: pins
    }
  }])
}

function map (msg, done) {
  this.prior(msg, (err, reply) => {})
  done(null, [])

  var metrics = []
  var payload = msg.payload

  if (!payload || !payload.pins) {
    return
  }

  _.each(payload.pins, pin => {
    metrics.push({
      name: 'seneca.message.flow_rate',
      values: {
        rate: pin.rate
      },
      tags: {
        pattern: pin.pattern,
        group: payload.group,
        tag: payload.tag,
        id: payload.pid
      }
    })
  })

  _.each(metrics, metric => {
    this.act({
      role: opts.role,
      hook: 'sink',
      name: metric.name,
      metric: metric
    })
  })
}
