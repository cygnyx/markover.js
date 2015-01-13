
# Introduction

Programming methodology continues to rapidly change.
There have been vast improvements in increasing the reliability
of programs.
Several interesting changes involve the use of interpreted languages
compared to compiled languages.
Some languages offered translations into an intermediate code representation.
Some translate into machine specific code.
The result is that interpreted languages are now approaching the speed of
compiled languages.
There are cases where interpreted languages are faster than compiled
languages due to run-time optimization strategies.
One such interpreted language is
[javascript](http://en.wikipedia.org/wiki/JavaScript):
it is standards based, it runs quickly, and its syntax is familiar.
`javascript` started in the Web browser and is now available on the server
side too. Programming environments like [nodejs](http://nodejs.org) and
[spidermonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey) have made `javascript`
available in many situations.

Along with the Web came a number of document markup languages, such as [HTML](http://www.w3.org/html).
These languages provided a means of displaying documents on screen
and could be formatted into print.
Over time, `HTML` document information was separated from its display.
The display of `HTML` documents were encoded in [CSS](http://www.w3.org/Style/CSS).
These languages seemed syntactically heavy and inappropriate for transmitting
data between machines with limited bandwidth.
This led to the development of [JSON](http://www.json.org) to represent simple data structures in
an readable format that borrowed its structure from `javascript`.
`JSON` is easily used to provide configuration information to programs,
although `JSON` fields can appear in any order.

Given the complexity of `HTML` documents a number of authoring languages were
developed, such as [markdown](http://en.wikipedia.org/wiki/Markdown).
The purpose of the languages was to facilitate
the generation of `HTML` documents.
There are many other authoring that have been used
in the past, such as [TeX](http://en.wikipedia.org/wiki/TeX) and
[troff](http://en.wikipedia.org/wiki/Troff).
Although `TeX` pre-dates the Web, [MathJax](http://www.mathjax.org/) can be used
to render `TeX` based math formulas.

One service that makes use of `javascript` and `JSON` is [couchdb](http://couchdb.apache.org)
database management system server. It uses `JSON` for the configuration of its
database and for delivering data to clients.
[couchapp](http://docs.couchdb.org/en/latest/couchapp/index.html?highlight=couchapp)
is a client-server application framework based
on a Web browser front-end and a `couchdb` back-end.
A feature of this framework is that all the configuration can be written using Web
standards: `CSS`, `HTML`, and `javascript`. Since `couchdb` uses 
[HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) and
[HTTPS](http://en.wikipedia.org/wiki/HTTP_Secure) to communicate
with Web browsers is relatively straight forward.

This seems an appropriate time to revisit the 'Literate Programming' idea of 
[Knuth](http://en.wikipedia.org/wiki/Donald_Knuth), published in 1984,
in the context of Web standards.

[markover](https://cygnyx.github.io/markover) is a `javascript` library implemented as a
[CommonJS](http://wiki.commonjs.org/wiki/CommonJS) module.

# Literate Programming

This document is a literate program that can be used to make the `markover` system.
It describes the source code used in `markover` and can generate the source code.
That is, the same authoring document (the `markover` document)
is used `tangle` itself into a program (the source code) and to `weave`
itself into a viewable document (the display document).
The `markover` document is written in `markdown`.
The primary source code target is a `javascript` object.
The `javascript` object might be used as a configuration file (in the form of a `JSON` object),
or as a couchapp (as a `JSON` object or a CommonJS module),
or a javascript library (a CommonJS module).
The primary display document target is `HTML`, `CSS` and `MathJax`.

Other tools have targeted similar platforms, like the
`literate` option in [coffeescript](http://coffeescript.org).
However, literate coffeescript lacks the ability to `tangle`
code. The order of the code is constrained by the needs of the
programming language compiler. `markover` is more similiar to
Knuth's system by allowing greater flexibility in the order that
the program is presented. But it doesn't provide as much
flexibility as Knuth's system.

`markover` has enough flexibility to produce source code for many text based programming
language. However, it is designed to work with a single `javascript` object.

`markdown` has had a number of extensions added to it.
One set, called GFM (GitHub Flavored Markdown), is used by `markover`.
In GFM `markdown` a section of code is marked off, like this:

```js
console.log('Hello, World!')
```

which is produced by:

    ```js
    console.log('Hello, World!')
    ```

The word after the fence normally identifies the language that the code block is written in.
`markover` extends this syntax to include a field name.
This is used to add
the code block to the object field. When the field name is repeated, the additional
code is appended to the object field. So, when `markover` processes a `markdown` document, it looks
for lines starting with a fence, followed by an optional language id, a hash tag, an optional
plus sign, followed by the field name.
The source code is appended line by line until the closing fence is found.
Code blocks that don't have a field name are ignored.

The optional plus sign is a flag that the field should be quoted in the output.
This conveniently reduces the need to use a large number of escape characters in the
`markover` document.
By flagging a field as a quoted string,
`markover` will make appropriate escape sequences.
This keeps the structure of fields fairly neat
and more consistent with the embedded languages
that are sometimes used inside the strings.

For example:


    ```json#foo
    [1,2]
    ```

will set the field 'foo' to be an array with two values. Whereas,


    ```json#+foo
    [1,2]
    ```

will set the field to the string "[1,2]".

There are a few special markers used in `markover`.
A language of `noweave` indicates
that the code block will not be included in the `weave` output.
Field names of `#first` and `#last` are used to
include arbitrary beginning and ending material, respectively.
A missing language with a field name (like `#foo`) will default
to `json`.

# Markover fields

By convention `markover` documents have a few common fields.
A `title` which names the document and a `tag` which is a one-line
description of the document. You may include a `version` field as well.

```noweave#+title
markover
```

```noweave#+tag
Web Literate Programming
```

```noweave#+version
0.0.1
```

That all there is to know about the structure of `markover`
documents.
There are no specific dependencies on the target language.

## File structure

For a CommonJS module there is usually some
beginning and ending material that is needed.
For this module, the object is written
within an anonymous function so that the name
space won't be polluted.

```js#first
!(function() {

var markover = 
```

The trailing material allows the object to be
used in several environments.
This is attached to the anonymous function
after the literate object is declared.
It does several checks to determine which
environment it is operating in.

```js#last
if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = markover
} else if (typeof define === 'function' && define.amd) {
    define(function() { return markover })
} else {
    this.markover = markover
}

}).call(function () {
        return this || (typeof window !== 'undefined' ? window : global)
})
```

## Display Document

It seems like every system as standard boilerplate material that must be included.
`HTML` documents has quite a bit.

### Basic structure
Here is the typical start of an HTML document, which comes before the actual header.

```html#+head
<!DOCTYPE html>
<html lang="en" class="">
<head>
```

The `HTML` has a section the separates the header from the body of the document.

```html#+transition
</head>
<body>
```

And some ending material.

```html#+tail
</body>
</html>
```

### Additional Header Material

These meta provide additional information about the display document encoding.

```html#+head
  <meta charset="utf-8">
  <meta http-equiv="Content-Language" content="en">
  <meta name="viewport" content="initial-scale=1">
```

### MathJax configuration

The following code enables `MathJax` on the Web.
It requires a configuration block before the MathJax code can be included.
In order to avoid confusion with other uses of symbols, `markover` only
uses `\\(` and `\\)` to delimit inline math equations.

```html#+head
  <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      showProcessingMessages: false,
      tex2jax: { inlineMath: [['\\(','\\)']] },
      TeX: { equationNumbers: {autoNumber: "AMS"} }
    });
  </script>
  <script type="text/javascript"
    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
  </script>
```

For example, here is an equation that will be processed with `MathJax` and appear as in-line
equations in the text: \\( x \lt y \\) or gamma \\( \Gamma \\). However if `MathJax` isn't properly
included, the in-line equations will still be readable. `MathJax` also provides display equations,
such as:

$$
x \lt y
$$

### JQuery configuration

The display document makes some use of [jquery](http://jquery.com). This tools handles
most of the inconsistentcies between Web browser and simplifies the manipulation of
`HTML` documents.

```html#+head
  <script type="text/javascript"
    src="http://code.jquery.com/jquery-2.1.3.min.js">
  </script>
```

JQuery is used to load `highlight.js` parsers for the languages used in this document.
There isn't a one-to-one relationship between languages and parsers. For example,
the `HTML` parser is located in `xml`.

```html#+tail
<script type="text/javascript">
  ["bash", "xml", "javascript", "json", "css", "markdown"].forEach(function(e) {
    var s = $('<script>')
    s.type = 'text/javascript'
    s.src = 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/languages/' + e + '.min.js'
    $('head').append(s)
  })
</script>
```

### HTML stylesheet

The format of the display document is largely controlled by the `CSS`.
Part of the `CSS` is based on the [highlight.js](https://highlightjs.org/) rendering style.
The following `stylesheet` details how the rest of the document is displayed.

Is this necessary? No. Instead of including the stylesheet here, you can link to a stylesheet
in the header section. Or, parts of the the style can be included in the header.
For example, there are standard `highlight.js` style sheets available on `CDNs` that
can be included for the language syntax highlighting. In this case, I wanted a little more
control over the presentation on screen and in print. I've included the entire style sheet here.

#### Vanilla style

This first section resets all `HTML` elements to reasonable default values.
This is used in the heading of the page and has selectors that effect elements
throughout the document.

```css#+headstylesheet
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, a,
fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
  display: block;
  margin:0;
  padding:0;
  border:0;
  outline:0;
  line-height: 140%;
  font-size: 100%;
  vertical-align:baseline;
  text-decoration: none;
  background:transparent;
}

a, code, span, b, i, em { display: inline; }
```

#### Preliminary Material

The following stylesheet operates within the content generated by applying `weave`
to the source document.
`markover` marks up 3 areas before the main document body:
title, tag, and a table of contents.

Title and tag are each in a single id and only appear once in the display document.

```css#+stylesheet
#content {
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
}

#content #title {
  clear: both;
  text-align: center;
  font-size: 140%;
  font-weight: bold;
  margin: 2em 0 0 0;
}

#content #tag {
  clear: both;
  text-align: center;
  font-size: 110%;
  margin: 0 0 1em 0;
}
```

The table of contents, in a single `toc` id, is slightly more complex.

```css#+stylesheet
#content #toc {
  padding: 0 0 0 1em;
  max-width: 96%;
  page-break-after: always;
}

@media screen and (min-width: 641px) {
  #content #toc {
    float: left;
    max-width: 26%;
  }
}

#content .tocsn { float: left; }
#content .tocsr { overflow: hidden; }

#content #toc ol {
  list-style-type: none;
}

#content #toc ol ol {
  margin: 0 0 0 1em;
}
```

#### Main body

The main document is in a single `doc` id.
Make the toc and doc with the same margins.

```css#+stylesheet
#content #doc,
#content #toc {
  margin: 0 1em 0 1em;
}

#content p { text-indent: 1em; }

#content code { font-size: 120%; }

#content pre code {
  font-family: "Courier New", Courier, monospace;
  font-size: 100%;
}

@media screen and (min-width: 641px) {
  #content #doc {
    overflow: hidden;
    max-width: 70%;
  }
}
```

Field names are in a `field` class.

```css#+stylesheet
#content pre .field {
  display:block;
  margin: 1em 1em 0em 0em;
}
 
#content pre .field::after {
  content: " :=";
}
```

The code blocks are in the `code` tag and
have classes that identify their language.

```css#+stylesheet
#content pre code {
  display: block;
  margin: 1em;
  padding: 1em;
  border: solid 1px #aaa;
}

@media screen {
  #content pre code {
    overflow: auto;
    max-height: 30em;
  }
}

@media print {
  #content pre {
    page-break-inside: avoid;
  }
  #content pre code {
    overflow: visible;
    word-wrap: break-word;
  }
}
```

Each language uses a slightly different light background color.

```css#+stylesheet
@media screen {
  #content .lang-js { background-color: ivory; }
  #content .lang-md { background-color: lightyellow; }
  #content .lang-html { background-color: floralwhite; }
  #content .lang-json { background-color: honeydew; }
  #content .lang-css { background-color: cornsilk; }
  #content .lang-sh { background-color: lemonchiffon; }
}
```

The header font sizes are set.

```css#+stylesheet
#content h1,
#content h2,
#content h3,
#content h4,
#content h5,
#content h6 {
  margin: 0.5em 0em;
  page-break-after: avoid
}

#content h1 { font-size: 140%; }
#content h2 { font-size: 130%; }
#content h3 { font-size: 120%; }
#content h4,
#content h5,
#content h6 { font-size: 110%; }
```

More styling

```css#+stylesheet
#content a:hover { color: #aaa; }

#content a:visited,
#content a { color: #000;}

@media screen {
  #content a {
    text-decoration: underline;
  }
}

@media print {
  #content a {
    text-decoration: none;
  }
  #content #doc a[href]:after {
    content: " (" attr(href) ")";
    font-size: 90%;
  }
}
```

#### Highlight markup

`highlight.js` specific styles for code blocks.
Basic type markup:

```css#+stylesheet
.hljs {
    overflow: auto;
    padding: 0.5em;
    color: #333;
}
.hljs-comment, .diff .hljs-header, .hljs-javadoc {
    color: #999;
    font-style: italic;
}
.hljs-keyword, .css .rule .hljs-keyword, .hljs-winutils, .nginx .hljs-title,
.hljs-subst, .hljs-request, .hljs-status {
    color: #333;
    font-weight: bold;
}
.hljs-number, .hljs-hexcolor, .ruby .hljs-constant {
    color: #088;
}
.hljs-string, .hljs-tag .hljs-value, .hljs-phpdoc, .hljs-dartdoc, .tex .hljs-formula {
    color: #d14;
}
.hljs-title, .hljs-id, .scss .hljs-preprocessor {
    color: #900;
    font-weight: bold;
}
.hljs-list .hljs-keyword, .hljs-subst {
    font-weight: normal;
}
.hljs-class .hljs-title, .hljs-type, .vhdl .hljs-literal, .tex .hljs-command {
    color: #458;
    font-weight: bold;
}
.hljs-tag, .hljs-tag .hljs-title, .hljs-rules .hljs-property, .django .hljs-tag .hljs-keyword {
    color: #000080;
    font-weight: normal;
}
.hljs-attribute, .hljs-variable, .lisp .hljs-body {
    color: #008080;
}
.hljs-regexp {
    color: #009926;
}
.hljs-built_in {
    color: #0086b3;
}
```

Language specific markup

```css#+stylesheet
.hljs-symbol, .ruby .hljs-symbol .hljs-string, .lisp .hljs-keyword,
.clojure .hljs-keyword, .scheme .hljs-keyword, .tex .hljs-special,
.hljs-prompt {
    color: #990073;
}
```

Other uncommon specialize markup:

```css#+stylesheet
.hljs-preprocessor, .hljs-pragma, .hljs-pi, .hljs-doctype, .hljs-shebang,
.hljs-cdata {
    color: #999;
    font-weight: bold;
}
.hljs-deletion {
    background: #fdd;
}
.hljs-addition {
    background: #dfd;
}
.diff .hljs-change {
    background: #0086b3;
}
.hljs-chunk {
    color: #aaa;
}
```

Using `CSS` it is possibly to have a separate
layout for print media.
`markover` overrides certain values for print media.

```css#+stylesheet
@media print {
  .hljs {
    overflow: visible;
    word-wrap: break-word;
  }
  .hljs-number, .hljs-hexcolor, .ruby .hljs-constant {
    color: #888;
  }
  .hljs-string, .hljs-tag .hljs-value, .hljs-phpdoc, .hljs-dartdoc, .tex .hljs-formula {
    color: #ddd;
  }
  .hljs-title, .hljs-id, .scss .hljs-preprocessor {
    color: #999;
  }
  .hljs-class .hljs-title, .hljs-type, .vhdl .hljs-literal, .tex .hljs-command {
    color: #888;
  }
  .hljs-tag, .hljs-tag .hljs-title, .hljs-rules .hljs-property, .django .hljs-tag .hljs-keyword {
    color: #888;
  }
  .hljs-attribute, .hljs-variable, .lisp .hljs-body {
    color: #888;
  }
  .hljs-regexp {
    color: #999;
  }
  .hljs-symbol, .ruby .hljs-symbol .hljs-string, .lisp .hljs-keyword,
  .clojure .hljs-keyword, .scheme .hljs-keyword, .tex .hljs-special,
  .hljs-prompt {
    color: #999;
  }
  .hljs-built_in {
    color: #888;
  }
  .hljs-deletion {
    background: #ddd;
  }
  .hljs-addition {
    background: #ddd;
  }
  .diff .hljs-change {
    background: #888;
  }
}
```

# Program structure

This implementation is based on [marked](http://github.com/chjj/marked),
which is a `javascript` markdown parser with a lot of flexibility.
It provides a number of options that are very useful for `markover`.

weaveStream, tangleStream and untangleStream are based on `nodejs` stream
transformation. They read from a source stream, transform the input,
and write out to an output stream.

## Utilities

I'm using a lazy implementation of the `nodejs` stream transform.
Instead of processing the input buffer piece by piece, I collect
the entire stream into a `pool`. At the end, the entire `pool`
is flushed to the output pipe. It takes a single argument which
is a set of options which must include a `convert` function that
converts a string into the transformed string.
The default `convert` function does not transform the string.
The options are passed to the `convert` function.
`pool` calls the `convert` function in the context of the
optional `self` object.
This gives the `convert` function access to all the facilities
of the identified object (methods and members).

```js#pool
function(options) {
  options = options || {}

  var dam = new require('stream').Transform()
  dam.options = options
  dam.options.convert = dam.options.convert || function(string, options) { return string }
  dam.options.self = dam.options.self || this

  dam.lake = []
  dam._transform = function(chunk, encoding, done) {
    dam.lake.push(chunk.toString())
    done()
  }

  dam._flush = function(done) {
    dam.push(dam.options.convert.call(dam.options.self, dam.lake.join(''), dam.options))
    dam.push('\n')
    dam.lake = []
    done()
  }

  return dam
}
```

For displaying a document in `HTML` there are certain character
sequences that must be escaped and then unescaped.

```js#escape
function (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

```js#unescape
function(html) {
  return html.replace(/&([#\w]+);/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n === 'lt') return '<';
    if (n === 'gt') return '>';
    if (n === 'quot') return '"';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  })
}
```

## tangle

The `tangle` process is the most important process in `markover`.

The `tangle` process has to exist before `markover` can work.
During my initial implementation I prototyped `javascript`
code that could `tangle` a complex `markdown` document.
Then I inserted the `tangle` prototype into a prototype
`markover` document.
After further adjustments I produced a `markdown` document
that could be tangled into a functional identical `tangle` prototype.
At this point I could make improvements to the document,
`tangle` it, verify the results, and update the `tangle` process.
If you don't have a `tangle` process, you can manually create 
a prototype by applying the `tangle` algorithm described here
to this document. Once your prototype works, you can use it
to produce the `tangle` process described in this document.

`markover` uses `marked` to parse `markover` documents.
This parser has enough flexibility to implement the main
features of `markover`: `tangle` and `weave`.
I haven't investigated all the options that `marked`
provides. But I have found a set of options that produce
good results. The `gfm` option, which is 'GitHub Flavored Markdown'
is particularly important to turn on.
This option implements the fence style code blocks that
`markover` is dependent on.
All the renderer output functions are set to `noop` except
for `code`.

Quoting is an important element of `markover`.
It uses % escape sequences to convert
native codes into escape codes.

The following fields describe all of the formating
that the `tangle` process uses in creating source code
from `markover` documents.

```js#+tangleFormatPrefix
 {%n%n
```

```js#+tangleFormatSuffix
%n}%n%n
```

```js#+tangleFormatDelimiter
,%n%n
```

```js#+tangleFormatFieldPrefix
"
```

```js#+tangleFormatFieldSuffix
": 
```

### tangle Formating

Once a `markover` document has been tangled,
there are 3 results: the starting material,
the fields, and the ending material.
The starting and ending material are passed
straight through.

The `tangleFormat` function handles the
processing of the fields. The fields are
stored in an object. For each field, the
delimited field name is emitted and then
the value.
For `javascript` output the delimited field
is in double quotes.
For languages that don't use objects and 
fields, the delimited field name could be
put in a source code comment.
Not that fields are not in any particular
order.

The final part of the processing is 
to translate the % escape sequences back
to their original representation.

```js#tangleFormat
function(ff, fields, lf) {
  var res = [ff, this.tangleFormatPrefix]
  var firsttime = true
  var v
  for (var e in fields) {
    v = fields[e]
    if (firsttime) {
      firsttime = false
    } else {
      res.push(this.tangleFormatDelimiter)
    }
    res.push(this.tangleFormatFieldPrefix + e + this.tangleFormatFieldSuffix)
    res.push(v)
  }
   res.push(this.tangleFormatSuffix)
   res.push(lf)

   return res.join('')
     .replace(/%q/gm, '\"')
     .replace(/%n/gm, '\n')
     .replace(/%s/gm, '\\')
     .replace(/%p/gm , '%')
}
```

### tangleJSON

Given a `makeover` source string `tangleJSON`
returns the converted source code using `marked`.
Options can have an array of field names that
should be excluded from the output.

```js#tangleJSON
function (str, options) {
  options = options || {}
  options.exclude = options.exclude || []
```

We get a reference to the Renderer object
so that it can be modified as needed.

```js#tangleJSON
  var marked = require('marked')
  var p = new marked.Renderer()
  marked.setOptions({
    renderer: p,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  })
```

The main part of the rendered used in
`tangle` is the `code` function which
handles the code blocks.
Code blocks without field names are ignored.
Quoted code blocks are encoded in strings.
Then the entire string is % escaped.
Each code is stored as a triple of _strings_: field, quote, & text.

```js#tangleJSON
  p.code = function(code, lang, escaped) {

    if (!lang)
      return ''

    var field = lang.replace(/\S*#[+]?(\S*)/, "$1")
    if (lang == field)
      return ''

    var quote = lang.replace(/\S*#([+]?)\S*/, "$1")
    lang = lang.replace(/(\S*)#[+]?\S*/, "$1")
    if (lang == '') lang = 'json'

    if (quote == '+') {
      code = ('"' +
        code
          .replace(/\\/gm, '\\\\')
          .replace(/\"/gm /*"*/, '\\"')
          .replace(/\n/gm , '\\n')
        + '"')
    }

    var esccode = code
      .replace(/%/gm , '%p')
      .replace(/"/gm /*"*/, '%q')
      .replace(/\n/gm, '%n')
      .replace(/\\/gm, '%s')

    return ',["' + field + '", "' + (quote == '+')  + '", "' + esccode + '"]'
  }

```

All other rendering blocks are stopped.

```js#tangleJSON
  function noop() { return ''}

  p.blockquote = noop
  p.html = noop
  p.heading = noop
  p.hr = noop
  p.list = noop
  p.listitem = noop
  p.paragraph = noop
  p.table = noop
  p.tablerow = noop
  p.tablecell = noop
  p.strong = noop
  p.em = noop
  p.codespan = noop
  p.br = noop
  p.del = noop
  p.link = noop
  p.image = noop

```

`marked` does all the parsing at this point.
The resulting set of triples is converted into
an array of objects.

```js#tangleJSON
  var doc = '[' + marked(str).substring(1) + ']'
  var obj = JSON.parse(doc)
  var fields = {}
  var ff = ''
  var lf = ''
```

Each triple is decoded and appended to any existing text.
There is a subtle difference in the quoted versus non-quoted
appending: the quoted append inserts an escaped newline,
while the non-quoted inserts a % escaped newline (which is
converted into an actual newline in the output.
Note that inserting these newlines prevents quote fields
from being concatenated without a newline character.

```js#tangleJSON
  var res = obj.forEach(function(e) {
    var k = e[0]
    var q = (e[1] == "true")
    var v = e[2]
    var doit = true
    if (options.exclude.indexOf(k) != -1)
      doit = false
    if (doit) {
      if (fields[k] != undefined) {
        if (q) {
          v = fields[k].substring(0,fields[k].length-2) + '\\n' + v.substring(2)
        } else {
          v = fields[k] + '%n' + v
        }
      }
      fields[k] = v
    }
  })
```

Once all the fields are prepared, the special first and last
field names are located and the results are formatted for output.
If the `sourcetarget` options is given, then the quoted source document
is stored at the location.

```js#tangleJSON
  if (fields["first"] != undefined) {
    ff = fields["first"]
    delete fields["first"]
  }

  if (fields["last"] != undefined) {
    lf = fields["last"]
    delete fields["last"]
  }

  if (options.sourcetarget) {
    fields[options.sourcetarget] = 
        ('"' +
          str
          .replace(/\\/gm, '\\\\')
          .replace(/\"/gm /*"*/, '\\"')
          .replace(/\n/gm , '\\n')
          .replace(/%/gm , '%p')
        + '"')
  }
   
  return this.tangleFormat(ff, fields, lf)
}
```

### tangleStream

`tangleStream` can produce a transform object or
apply it to stdin and stdout. The input stream is
pooled, then tangled and pushed to the output stream.

```js#tangleStream
function (opts) {
  var options = {convert: this.tangleJSON, self:this}
  for(var i in opts)
    options[i] = opts[i]
  var p = this.pool(options)

  if (!p.options.notstdio) {
    process.stdin.pipe(p).pipe(process.stdout)
    return true
  }

  return p
}
```

## weave

The `weave` process complements `tangle` by producing
a readable document that describes the program's operation.
Many document systems, such as [doxygen](http://www.stack.nl/~dimitri/doxygen)
use the programming languages structure to attach documentation.
Literate programming emphasizes the documentation structure
over the programming structure.
Since the `tangle` process provides field names for targets and allows
fields to be concatenated, the `markover` document layout can
be structured in the order that makes the most sense for the
description of the program.
Of course, parts of a program might be best described in the
order the the programming language requires, and this can easily be
done in `markover` as well.

The `weave` process maintains the order that the `markover`
document is written in.
It also weaves into the source code additional markup to
clarify the syntax of the code.

### weave headings

By processing the headings in the `markover` document
a table of contents can be developed.
As headings are rendered into `HTML`, they are appended
to a `toc`. Each `toc` element starts as a triple: text,
level, id.
An array `n` is maintained to enumerate the headings.

```js#heading
function(text, level, raw, toc, prefix) {
  var i = raw.toLowerCase().replace(/[^\w]+/g, '-')
  var n = [0, 0, 0, 0, 0, 0, 0]
```

`HTML` defines 6 levels of headings.
This seems more than sufficient.

```js#heading
  if (level > 6) level = 6
  else if (level < 1) level = 1
  toc.push([text, level, i])
```

The `n` array is regenerated to reflect the
current heading count.

```js#heading
  var l
  for (var x = 0; x < toc.length; x++) {
    l = toc[x][1]
    n[l] = n[l] + 1
    while (++l < toc.length)
      n[l] = 0
  }
```

A section number is calculated from the `n` array
and added to the `toc` element.

```js#heading
  var sn = n.slice(1, level+1).join('.') + (level == 1 ? '.' : '')
  toc[toc.length-1].push(sn)
```

And the `HTML` rendering of the heading is returned, lightly formatted.

```js#heading
  return '<h'
    + level
    + ' id="'
    + prefix
    + i
    + '">'
    + sn + ' ' + text
    + '</h'
    + level
    + '>\n'
}
```

### weave code highlighting

Highlighting code handled by `highlight.js`.
This utility function returns a code block that
is highlighted according to the identified language.

```js#weaveHighlight
function (lang, code) {
  return require('highlight.js').highlight(lang, this.unescape(code), true)
}
```

### weaveCode

This function formats a code block for the `HTML` document.
The formatting consists of labelling parts of the code with
`HTML` tags with suitable classes. Code blocks that don't
have an identified language are not highlighted.

```js#weaveCode
function(code, lang, escaped, fields, prefix) {
  var c = code
  if (!lang) {
    return '<pre><code>'
      + c
      + '\n</code></pre>'
  }
```

Code blocks that have a language, but don't have
a field name are highlighted.

```js#weaveCode
  var i = lang.indexOf('#')
  if (i == -1) {
    if (lang == "noweave") return ''
    return '<pre><code class="'
      + prefix
      + this.escape(lang, true)
      + '">'
      + this.weaveHighlight(lang, c).value
      + '\n</code></pre>\n'
  }
```

Code blocks that have a field name are highlighted
as well unless the language is `noweave`.
Field names are appended and retained in
weaving too. These field names can be used in the
output of the `HTML` document.
This is useful for the defining the structure
of the `HTML` document.

```js#weaveCode
  var field = lang.substring(i+1)
  lang = lang.substring(0, i)
  if (lang == "") lang = "json"

  if (field.substring(0,1) == '+') {
    field = field.substring(1)
  }

  if (fields[field] == undefined) {
    fields[field] = c
  } else {
    fields[field] = fields[field] + '\n' + c
  }

  if (lang == "noweave") return ''

  return '<pre><div class="field">'
    + field + '</div>'
    + '<code class="'
    + prefix
    + this.escape(lang, true)
    + '">'
    + this.weaveHighlight((lang != "" ? lang : "json"), c).value
    + '\n</code></pre>\n'
}
```

### weave parsing

The `markover` parsing for weaving is done by `marked`.
We start with the standard `marked` rendered and then
modify routines to prepare the `HTML` generation.

```js#weaveMarked
function () {
  var marked = require('marked')
  var p = new marked.Renderer()

  marked.setOptions({
    renderer: p,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  })
```

Create the `toc`, `field`, and	`self` members to keep
the needed state during parsing.

```js#weaveMarked
  p.field = []
  p.toc = []
  p.self = this
```

Process the heading with this object so that heading
can access the utility functions.
Do the same for code blocks.
This returns the parser and the renderer.

```js#weaveMarked
  p.heading = function (text, level, raw) {
    return this.self.heading.call(this.self, text, level, raw, p.toc, this.options.headerPrefix)
  }
  p.code = function (code, lang, escaped) {
    return this.self.weaveCode.call(this.self, code, lang, escaped, p.field, this.options.langPrefix)
  }

  return [marked, p]
}
```

### weave document

This function formats the final `HTML` document
using `marked`.

```js#weaveJSON
function (str, options) {
  options = options || {}
  var m = this.weaveMarked()
  var marked = m[0]
  var p = m[1]
  var doc = marked.call(this, str)
```

Utility function

```js#weaveJSON
  function f(l,d) { return this.unescape(p.field[l] || d) }
```

Format the basic elements of the document.
Use reasonable default values where applicable.

```js#weaveJSON
  var title = f("title", "Weave Output")
  var tag = f("tag", "from weaving")
  var headstylesheet = f("headstylesheet", "")
  var stylesheet = f("stylesheet", "")

  var headline = f("head", "<!DOCTYPE html><html><head>")
  var transitionline = f("transition", "</head><body>")
  var tailline = f("tail", "</body></html>") + '\n'

  var headtitle = '<title>' + title + ' - ' + tag + '</title>\n'
  var titleline = '<div id="title">' + title + '</div>'
  var tagline = '<div id="tag">' + tag + '</div>'

  var headstyleline = headstylesheet == '' ? '' : '<style>' + headstylesheet + '</style>'
  var styleline = stylesheet == '' ? '' : '<style>' + stylesheet + '</style>'
```

Create and mark up the table of contents.
Open or close ordered list elements whenever there is a change
in the heading level.

```js#weaveJSON
  var tocitems = p.toc.map(function(e, i, a) {
    var ll = 0
    var o = ''
    if (i > 0) ll = a[i-1][1]
    if (ll < e[1]) {
      while (ll++ < e[1])
        o = o + '<ol>'
    } else if (ll > e[1]) {
      while (ll-- > e[1])
        o = o + '</ol>'
    }
    return (
            o + '<li><div class="tocsn">' + e[3] + '&nbsp;</div><div class="tocsr"><a href="#' + e[2] + '">'
	      + e[0] + '</a></div>'
           )
  })
```

Append enough ordered list ending tags and put the results in `toc`

```js#weaveJSON
  var toc = ''
  var ll
  var o

  if (p.toc.length > 0) {
    ll = p.toc[p.toc.length-1][1]
    o = ''
    while (ll-- > 0)
      o = o + '</ol>'
    toc = '<div id="toc"><h1>Contents</h1>\n' + tocitems.join('\n') + o + '</div>\n'
  }
```

Return the assembled document.
The bulk of the document is in the `doc` variable.

```js#weaveJSON
  var heading = ''
  var tailing = ''
  if (options.contentonly != true) {
    heading = headline + headtitle + headstyleline + styleline + transitionline
    tailing = tailline
  } else
    heading = styleline

  return (heading +
          '<div id="content">' +
             titleline + tagline + toc +
          '<div id="doc">' + doc + '</div>' +
          '</div>' + tailing)
}
```

### weaveStream

`weaveStream` can produce a transform object or
apply it to stdin and stdout. The input stream is
pooled, then weaved and pushed to the output stream.


```js#weaveStream
function (opts) {
  var options = {convert: this.weaveJSON, self:this}
  for(var i in opts)
    options[i] = opts[i]
  var p = this.pool(options)

  if (!p.options.notstdio) {
    process.stdin.pipe(p).pipe(process.stdout)
    return true
  }

  return p
}
```

## untangle

untangle is a utility that embeds a code block
into a `markover` document.
Basically it has a fence prefix and suffix.

```js#untangleStream
function (opts) {
  opts = opts || {}
  var options
  options = {
    convert: function (str, options) {
      return '```\n' + str + '```\n'
    },
    self: this
  }

  for(var i in opts)
    options[i] = opts[i]

  var p = this.pool(options)

  if (!options.notstdio) {
    process.stdin.pipe(p).pipe(process.stdout)
    return true
  }

  return p
}
```

# Unix build instructions

To bootstrap try:

```sh
node -e "require('./markover').tangleStream()" < README.md > markover1.js && node -e "require('./markover1').tangleStream()" < README.md > markover2.js && diff markover2.js markover1.js && mv markover1.js markover.js
```

You can rebuild `markover` from this document (assuming it is called README.md) by running the following in a Unix shell:

```sh
node -e "require('./markover').tangleStream()" < README.md > markover.js
```

To weave:

```sh
node -e "require('./markover').weaveStream()" < README.md > index.html
```

# GitHub Notes

`markover` documents do not display completely correctly on GitHub using the GitHub
display system.
The field names that are embedded in the code block fence are not interpreted by GitHub.
The `MathJax` processing is not rendered either.
And, of course, there is no table of contents.
Nevertheless the displayed `markover` document is somewhat readable.

The raw text of the `markover` documents are more readable.
The raw text of the `HTML` display document is not very readable:
the `markdown` text isn't too bad, but the
code blocks are extremely difficult to read.

Fortunately, the output `CommonJS` module is very readable. It is included in
the source since it is needed to bootstrap `markover`.

Downloading the package and viewing the `HTML` document is the best way to
see `markover` in action.

# Concluding Remarks

`markover` offers authors the ability to write software in an order that is
most suitable for understanding the code.
It has facilities for presenting documentation on screen and in print with
full access to `TeX` equation formatting.
The `markdown` document is readable as plain text and easily manipulated with `marked`.
Yet `untangling` source code into a `markover` document is trivial.
Moving from traditional programming to literate programming can be done incrementally.

In writing `markover` I found that it very easy to add reminders.
There was no extra effort to embed notes into 'structure comments'.
While reviewing the `markover` document or the `HTML` document,
I naturally revisited the notes to revise them or implement the ideas.
Including references to related work is straight forward and will be
help to reader's with greater interest.
In short, writing `markover` in this style improved the implementation.

Is it possible to write documents for every program?
Yes, to varying degrees.
Experimental code might have little documentation.
Difficult algorithms implementations might have a lot more.
Code with many contributors might have more documenation.
In any case, the software can start with little documentation
and incremental be improved as needed.

Knuth's system offers parameterize macros. `MathJax` does have this ability in `math` mode.
But this implementation only uses `MathJax` for the display document.
Including this capability might be the next required step.
`markover` has some ability to substitute field values in the `HTML` output.
Perhaps the an escape sequence could be used in a code block to subsitute the
contents of another field. A pair of backtick characters might be used for the escape
sequence, like:

```
console.log("This is ``title``")
```

Care would be needed to avoid mutually recursive macro substitutions.

Adding a table of contents was straight forward given the capabilities of the `marked` library.
Adding an index would be considerably more challenging.
Another feature of Knuth's system is a trailing footnote that indicates what other sections
of the document contributed to the current block of code.
Using a series of regex pattern matching as in `highlight.js` could yield good results for
a wide range of languages.

Unlike Knuth's system, `markover` has a fairly straight forward mechanism for tangling code.
Knuth's system provides a lot more flexibility for re-ordering code and inserting code at
arbitrary places in the code.
`markover` is more restrictive, only providing the field names as targets for code blocks.
It seems like this is enough flexibility and it allows the author to structure code blocks
in a readable fashion that is copied into place producing fairly readable source code.
If a more fine grain target is need, the source code can be divided into component functions
or subroutines. Then each subroutine can be targeted separately.

Today there are sophisticate IDEs for javascript and other languages.
The generated source files resemble the `markover` document.
It should be possible for good programmers to work with the generated
source files and modify the original document.
A possible enhancement is to generate a source map file along with the
source code. Tools like [uglify2](http://github.com/mishoo/UglifyJS2)
can read input source map files and generate source map files for its
mangled output. A tool like this could be included in `markover` itself.

In Knuth's system he went to some lengths to avoid using system libraries,
much less 3rd party software.
The development of the Web has turned this equation around.
A tool like `markover` would be much more difficult to create without
using libraries like `marked` and `highlight.js`.
[CDN](http://en.wikipedia.org/wiki/Content_delivery_network)
providers improve user experience by downloading libraries
quickly to their systems.
The downside is the need to update to program as these resources change.
