var spec   = require('hifive')()
var assert = require('assert')
var parse  = require('../../')

var ok = assert.ok

var xml = '<?xml version="1.0" encoding="utf-8" ?>'
        + '<items qty="2">'
        + '<item><title>Bar</title></item>'
        + '<item><title><![CDATA[Baz]]></title></item>'
        + '</items>'


module.exports = [
spec('parse(xml) → Document', function(it) {

  it('Elements should be reifed as HTMLElements.', function() {
    ok(parse(xml).childNodes[0].tagName === 'items')
  })

  it('Elements should carry the attributes.', function() {
    ok(parse(xml).childNodes[0].getAttribute('qty') === '2')
  })

  it('Elements should have the proper children', function() {
    ok(parse(xml).childNodes[0].childNodes.length === 2)
  })

  it('Text elements should be reifed as TextNodes', function() {
    ok(parse(xml).childNodes[0] // items
                 .childNodes[0]   // item
                 .childNodes[0]   // title
                 .childNodes[0].data === 'Bar')
  })

  it('CData sections should be reifed as TextNodes', function() {
    ok(parse(xml).childNodes[0] // items
                 .childNodes[1]   // item
                 .childNodes[0]   // title
                 .childNodes[0].data === 'Baz')
  })

})]