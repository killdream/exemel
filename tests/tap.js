var hifive = require('hifive')
var tap    = require('hifive-tap')
var specs  = require('./specs')


hifive.run(specs, tap())