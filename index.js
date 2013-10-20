// # Module exemel
//
// A normalised way of parsing XML, supporting old IEs.
//
// Copyright (c) 2013 Quildreen "Sorella" Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Parser implementations
var parser = 'DOMParser' in window?      domParser
           : 'ActiveXObject' in window?  msxmlParser
           : /* otherwise */             shimParser

//+ String → Document
function domParser(xml) {
  var parser = new DOMParser()
  return parser.parseFromString(xml, 'application/xml') }

//+ String → Document
function msxmlParser(xml) {
  var dom = new ActiveXObject('msxml2.DOMDocument.3.0')
  dom.loadXml(xml)
  return dom }

//+ String → Document
function shimParser(xml) {
  var doc = document.implementation.createHTMLDocument('')
  doc.documentElement.innerHTML = xml
  return asFragment(doc.querySelector('body').childNodes) }


//+ (Node → Node), [Node] → [Node]
function map(f, xs) {
  var len    = xs.length
  var result = new Array(len)

  for (var i = 0; i < len; ++i)  result[i] = f(xs[i])
  return result }

//+ (Node → ()), [Node] → ()
function each(f, xs) {
  for (var i = 0; i < xs.length; ++i)  f(xs[i]) }


//+ [Node] → DocumentFragment
function asFragment(xs) {
  var fragment = document.createDocumentFragment()
  appendChildren(fragment, xs)
  return fragment }

//+ Node → Node
function reify(x) {
  return isElement(x)?    makeHtmlElement(x)
  :      isText(x)?       makeTextNode(x)
  :      isDocument(x)?   asFragment(x.childNodes)
  :      /* otherwise */  null }

//+ Node → Bool
function isElement(x) {
  return x.nodeType === document.ELEMENT_NODE }

//+ Node → Bool
function isText(x) {
  return x.nodeType === document.TEXT_NODE
  ||     x.nodeType === document.CDATA_SECTION_NODE }

//+ Node → Bool
function isDocument(x) {
  return x.nodeType === document.DOCUMENT_NODE }

//+ Node → TextNode
function makeTextNode(x) {
  return document.createTextNode(x.data) }

//+ Node → HTMLElement
function makeHtmlElement(x) {
  var el = document.createElement(x.tagName)
  el.namespaceURI = x.namespaceURI
  copyAttributes(el, x.attributes)
  appendChildren(el, map(reify, x.childNodes))
  return el }

//+ HTMLElement, [Attribute] → ()
function copyAttributes(element, attributes) {
  each( function(x) { element.setAttribute(x.name, x.value) }
      , attributes )}

//+ HTMLElement, [Node] → ()
function appendChildren(element, children) {
  each( function(x) { element.appendChild(x) }
      , children )}


//+ String → [HTMLElement]
function parse(xml) {
  return parser === shimParser?  shimParser(xml)
  :      /* otherwise */         reify(parser(xml)) }


module.exports = parse