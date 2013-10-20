eXeMeL
======

[![Dependencies Status](https://david-dm.org/killdream/exemel.png)](https://david-dm.org/killdream/exemel.png)
[![NPM version](https://badge.fury.io/js/exemel.png)](http://badge.fury.io/js/exemel)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

[![browser support](http://ci.testling.com/killdream/exemel.png)](http://ci.testling.com/killdream/exemel)


A normalised way of parsing XML, supporting old IEs (7+).

Basically, it gives you your usual HTML DOM API for handling a XML document.

## Example

```js
var xml = require('exemel')
var dom = xml.parse('<items><item name="foo"><![CDATA[Bar]]></item><item>Baz</item></items>')

var items = dom.querySelectorAll('item')
for (var i = 0; i < items.length; ++i) {
  console.log(items[i].innerText || items[i].textContent)
}

// => console: "Bar"; "Baz"
```


## Installing

The easiest way is to grab it from NPM (if you're in the Browser, use [Browserify][]):

    $ npm install exemel
    
If you don't want to use NPM and/or Browserify, you'll need to compile the
library yourself. You'll need [Git][], [Make][] and [Node.js][]:

    $ git clone git://github.com/killdream/exemel.git
    $ cd exemel
    $ npm install
    $ make bundle
    
And use the `dist/exemel.umd.js` file without a module system, or with an
AMD module system like Require.js.
    
[Browserify]: http://browserify.org/
[Git]: http://git-scm.com/
[Make]: http://www.gnu.org/software/make/
[Node.js]: http://nodejs.org/


Testing
-------

    $ npm install -g hifive-browser
    $ make browser-test
    # Then point your browsers to the URL on yer console.


## Licence

Copyright (c) 2013 Quildreen Motta.

Released under the [MIT licence](https://github.com/killdream/exemel/blob/master/LICENCE).

