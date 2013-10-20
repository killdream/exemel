targets = exemel.umd.js
bin = $(shell npm bin)
browserify = $(bin)/browserify index.js

bundle:
	mkdir -p dist
	$(browserify) --standalone exemel > dist/exemel.umd.js

clean:
	rm -rf dist

browser-test:
	hifive-browser serve test/specs

.PHONY: test
