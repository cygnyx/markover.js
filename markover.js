!(function() {

var markover = {

"title":"markover",

"tag":"Web Literate Programming",

"version":"0.0.1",

"head":"<!DOCTYPE html>\n<html lang=\"en\" class=\"\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"Content-Language\" content=\"en\">\n  <meta name=\"viewport\" content=\"initial-scale=1\">\n  <script type=\"text/x-mathjax-config\">\n    MathJax.Hub.Config({\n      showProcessingMessages: false,\n      tex2jax: { inlineMath: [['\\\\(','\\\\)']] },\n      TeX: { equationNumbers: {autoNumber: \"AMS\"} }\n    });\n  </script>\n  <script type=\"text/javascript\"\n    src=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\">\n  </script>\n  <script type=\"text/javascript\"\n    src=\"http://code.jquery.com/jquery-2.1.3.min.js\">\n  </script>",

"transition":"</head>\n<body>",

"tail":"</body>\n</html>\n<script type=\"text/javascript\">\n  [\"bash\", \"xml\", \"javascript\", \"json\", \"css\", \"markdown\"].forEach(function(e) {\n    var s = $('<script>')\n    s.type = 'text/javascript'\n    s.src = 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/languages/' + e + '.min.js'\n    $('head').append(s)\n  })\n</script>",

"headstylesheet":"html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,\nabbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp,\nsmall, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, a,\nfieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section, summary, time, mark, audio, video {\n  display: block;\n  margin:0;\n  padding:0;\n  border:0;\n  outline:0;\n  line-height: 140%;\n  font-size: 100%;\n  vertical-align:baseline;\n  text-decoration: none;\n  background:transparent;\n}\n\na, code, span, b, i, em { display: inline; }",

"stylesheet":"#content {\n  font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif; \n}\n\n#content #title {\n  clear: both;\n  text-align: center;\n  font-size: 140%;\n  font-weight: bold;\n  margin: 2em 0 0 0;\n}\n\n#content #tag {\n  clear: both;\n  text-align: center;\n  font-size: 110%;\n  margin: 0 0 1em 0;\n}\n#content #toc {\n  padding: 0 0 0 1em;\n  max-width: 96%;\n  page-break-after: always;\n}\n\n@media screen and (min-width: 641px) {\n  #content #toc {\n    float: left;\n    max-width: 26%;\n  }\n}\n\n#content .tocsn { float: left; }\n#content .tocsr { overflow: hidden; }\n\n#content #toc ol {\n  list-style-type: none;\n}\n\n#content #toc ol ol {\n  margin: 0 0 0 1em;\n}\n#content #doc,\n#content #toc {\n  margin: 0 1em 0 1em;\n}\n\n#content p { text-indent: 1em; }\n\n#content code { font-size: 120%; }\n\n#content pre code {\n  font-family: \"Courier New\", Courier, monospace;\n  font-size: 100%;\n}\n\n@media screen and (min-width: 641px) {\n  #content #doc {\n    overflow: hidden;\n    max-width: 70%;\n  }\n}\n#content pre .field {\n  display:block;\n  margin: 1em 1em 0em 0em;\n}\n\n#content pre .field::after {\n  content: \" :=\";\n}\n#content pre code {\n  display: block;\n  margin: 1em;\n  padding: 1em;\n  border: solid 1px #aaa;\n}\n\n@media screen {\n  #content pre code {\n    overflow: auto;\n    max-height: 30em;\n  }\n}\n\n@media print {\n  #content pre {\n    page-break-inside: avoid;\n  }\n  #content pre code {\n    overflow: visible;\n    word-wrap: break-word;\n  }\n}\n@media screen {\n  #content .lang-js { background-color: ivory; }\n  #content .lang-md { background-color: lightyellow; }\n  #content .lang-html { background-color: floralwhite; }\n  #content .lang-json { background-color: honeydew; }\n  #content .lang-css { background-color: cornsilk; }\n  #content .lang-sh { background-color: lemonchiffon; }\n}\n#content h1,\n#content h2,\n#content h3,\n#content h4,\n#content h5,\n#content h6 {\n  margin: 0.5em 0em;\n  page-break-after: avoid\n}\n\n#content h1 { font-size: 140%; }\n#content h2 { font-size: 130%; }\n#content h3 { font-size: 120%; }\n#content h4,\n#content h5,\n#content h6 { font-size: 110%; }\n#content a:hover { color: #aaa; }\n\n#content a:visited,\n#content a { color: #000;}\n\n@media screen {\n  #content a {\n    text-decoration: underline;\n  }\n}\n\n@media print {\n  #content a {\n    text-decoration: none;\n  }\n  #content #doc a[href]:after {\n    content: \" (\" attr(href) \")\";\n    font-size: 90%;\n  }\n}\n.hljs {\n    overflow: auto;\n    padding: 0.5em;\n    color: #333;\n}\n.hljs-comment, .diff .hljs-header, .hljs-javadoc {\n    color: #999;\n    font-style: italic;\n}\n.hljs-keyword, .css .rule .hljs-keyword, .hljs-winutils, .nginx .hljs-title,\n.hljs-subst, .hljs-request, .hljs-status {\n    color: #333;\n    font-weight: bold;\n}\n.hljs-number, .hljs-hexcolor, .ruby .hljs-constant {\n    color: #088;\n}\n.hljs-string, .hljs-tag .hljs-value, .hljs-phpdoc, .hljs-dartdoc, .tex .hljs-formula {\n    color: #d14;\n}\n.hljs-title, .hljs-id, .scss .hljs-preprocessor {\n    color: #900;\n    font-weight: bold;\n}\n.hljs-list .hljs-keyword, .hljs-subst {\n    font-weight: normal;\n}\n.hljs-class .hljs-title, .hljs-type, .vhdl .hljs-literal, .tex .hljs-command {\n    color: #458;\n    font-weight: bold;\n}\n.hljs-tag, .hljs-tag .hljs-title, .hljs-rules .hljs-property, .django .hljs-tag .hljs-keyword {\n    color: #000080;\n    font-weight: normal;\n}\n.hljs-attribute, .hljs-variable, .lisp .hljs-body {\n    color: #008080;\n}\n.hljs-regexp {\n    color: #009926;\n}\n.hljs-built_in {\n    color: #0086b3;\n}\n.hljs-symbol, .ruby .hljs-symbol .hljs-string, .lisp .hljs-keyword,\n.clojure .hljs-keyword, .scheme .hljs-keyword, .tex .hljs-special,\n.hljs-prompt {\n    color: #990073;\n}\n.hljs-preprocessor, .hljs-pragma, .hljs-pi, .hljs-doctype, .hljs-shebang,\n.hljs-cdata {\n    color: #999;\n    font-weight: bold;\n}\n.hljs-deletion {\n    background: #fdd;\n}\n.hljs-addition {\n    background: #dfd;\n}\n.diff .hljs-change {\n    background: #0086b3;\n}\n.hljs-chunk {\n    color: #aaa;\n}\n@media print {\n  .hljs {\n    overflow: visible;\n    word-wrap: break-word;\n  }\n  .hljs-number, .hljs-hexcolor, .ruby .hljs-constant {\n    color: #888;\n  }\n  .hljs-string, .hljs-tag .hljs-value, .hljs-phpdoc, .hljs-dartdoc, .tex .hljs-formula {\n    color: #ddd;\n  }\n  .hljs-title, .hljs-id, .scss .hljs-preprocessor {\n    color: #999;\n  }\n  .hljs-class .hljs-title, .hljs-type, .vhdl .hljs-literal, .tex .hljs-command {\n    color: #888;\n  }\n  .hljs-tag, .hljs-tag .hljs-title, .hljs-rules .hljs-property, .django .hljs-tag .hljs-keyword {\n    color: #888;\n  }\n  .hljs-attribute, .hljs-variable, .lisp .hljs-body {\n    color: #888;\n  }\n  .hljs-regexp {\n    color: #999;\n  }\n  .hljs-symbol, .ruby .hljs-symbol .hljs-string, .lisp .hljs-keyword,\n  .clojure .hljs-keyword, .scheme .hljs-keyword, .tex .hljs-special,\n  .hljs-prompt {\n    color: #999;\n  }\n  .hljs-built_in {\n    color: #888;\n  }\n  .hljs-deletion {\n    background: #ddd;\n  }\n  .hljs-addition {\n    background: #ddd;\n  }\n  .diff .hljs-change {\n    background: #888;\n  }\n}",

"pool":function(options) {
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
},

"escape":function (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
},

"unescape":function(html) {
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
},

"tangleFormatPrefix":" {%n%n",

"tangleFormatSuffix":"%n}%n%n",

"tangleFormatDelimiter":",%n%n",

"tangleFormatFieldPrefix":"\"",

"tangleFormatFieldSuffix":"\":",

"tangleFormat":function(ff, fields, lf) {
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
},

"tangleJSON":function (str, options) {
  options = options || {}
  options.exclude = options.exclude || []
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
  var doc = '[' + marked(str).substring(1) + ']'
  var obj = JSON.parse(doc)
  var fields = {}
  var ff = ''
  var lf = ''
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
  if (fields["first"] != undefined) {
    ff = fields["first"]
    delete fields["first"]
  }

  if (fields["last"] != undefined) {
    lf = fields["last"]
    delete fields["last"]
  }

  return this.tangleFormat(ff, fields, lf)
},

"tangleStream":function (opts) {
  var options = {convert: this.tangleJSON, self:this}
  for(var i in opts)
    options[i] = opts[i]
  var p = this.pool(options)

  if (!p.options.notstdio) {
    process.stdin.pipe(p).pipe(process.stdout)
    return true
  }

  return p
},

"heading":function(text, level, raw, toc, prefix) {
  var i = raw.toLowerCase().replace(/[^\w]+/g, '-')
  var n = [0, 0, 0, 0, 0, 0, 0]
  if (level > 6) level = 6
  else if (level < 1) level = 1
  toc.push([text, level, i])
  var l
  for (var x = 0; x < toc.length; x++) {
    l = toc[x][1]
    n[l] = n[l] + 1
    while (++l < toc.length)
      n[l] = 0
  }
  var sn = n.slice(1, level+1).join('.') + (level == 1 ? '.' : '')
  toc[toc.length-1].push(sn)
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
},

"weaveHighlight":function (lang, code) {
  return require('highlight.js').highlight(lang, this.unescape(code), true)
},

"weaveCode":function(code, lang, escaped, fields, prefix) {
  var c = code
  if (!lang) {
    return '<pre><code>'
      + c
      + '\n</code></pre>'
  }
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
},

"weaveMarked":function () {
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
  p.field = []
  p.toc = []
  p.self = this
  p.heading = function (text, level, raw) {
    return this.self.heading.call(this.self, text, level, raw, p.toc, this.options.headerPrefix)
  }
  p.code = function (code, lang, escaped) {
    return this.self.weaveCode.call(this.self, code, lang, escaped, p.field, this.options.langPrefix)
  }

  return [marked, p]
},

"weaveJSON":function (str, options) {
  options = options || {}
  var m = this.weaveMarked()
  var marked = m[0]
  var p = m[1]
  var doc = marked.call(this, str)
  function f(l,d) { return this.unescape(p.field[l] || d) }
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
},

"weaveStream":function (opts) {
  var options = {convert: this.weaveJSON, self:this}
  for(var i in opts)
    options[i] = opts[i]
  var p = this.pool(options)

  if (!p.options.notstdio) {
    process.stdin.pipe(p).pipe(process.stdout)
    return true
  }

  return p
},

"untangleStream":function (opts) {
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
}

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
