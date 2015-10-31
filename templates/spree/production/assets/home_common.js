/*!
 * jQuery JavaScript Library v2.1.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:10Z
 */
(function(b, a) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = b.document ? a(b, true) : function(c) {
			if (!c.document) {
				throw new Error("jQuery requires a window with a document")
			}
			return a(c)
		}
	} else {
		a(b)
	}
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
	var arr = [];
	var slice = arr.slice;
	var concat = arr.concat;
	var push = arr.push;
	var indexOf = arr.indexOf;
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var trim = "".trim;
	var support = {};
	var document = window.document,
		version = "2.1.0",
		jQuery = function(selector, context) {
			return new jQuery.fn.init(selector, context)
		},
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function(all, letter) {
			return letter.toUpperCase()
		};
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function() {
			return slice.call(this)
		},
		get: function(num) {
			return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this)
		},
		pushStack: function(elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret
		},
		each: function(callback, args) {
			return jQuery.each(this, callback, args)
		},
		map: function(callback) {
			return this.pushStack(jQuery.map(this, function(elem, i) {
				return callback.call(elem, i, elem)
			}))
		},
		slice: function() {
			return this.pushStack(slice.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[i] || {};
			i++
		}
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {}
		}
		if (i === length) {
			target = this;
			i--
		}
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue
					}
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : []
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {}
						}
						target[name] = jQuery.extend(deep, clone, copy)
					} else {
						if (copy !== undefined) {
							target[name] = copy
						}
					}
				}
			}
		}
		return target
	};
	jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		isReady: true,
		error: function(msg) {
			throw new Error(msg)
		},
		noop: function() {},
		isFunction: function(obj) {
			return jQuery.type(obj) === "function"
		},
		isArray: Array.isArray,
		isWindow: function(obj) {
			return obj != null && obj === obj.window
		},
		isNumeric: function(obj) {
			return obj - parseFloat(obj) >= 0
		},
		isPlainObject: function(obj) {
			if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
				return false
			}
			try {
				if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false
				}
			} catch (e) {
				return false
			}
			return true
		},
		isEmptyObject: function(obj) {
			var name;
			for (name in obj) {
				return false
			}
			return true
		},
		type: function(obj) {
			if (obj == null) {
				return obj + ""
			}
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
		},
		globalEval: function(code) {
			var script, indirect = eval;
			code = jQuery.trim(code);
			if (code) {
				if (code.indexOf("use strict") === 1) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild(script).parentNode.removeChild(script)
				} else {
					indirect(code)
				}
			}
		},
		camelCase: function(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
		},
		nodeName: function(elem, name) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
		},
		each: function(obj, callback, args) {
			var value, i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break
						}
					}
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break
						}
					}
				}
			}
			return obj
		},
		trim: function(text) {
			return text == null ? "" : trim.call(text)
		},
		makeArray: function(arr, results) {
			var ret = results || [];
			if (arr != null) {
				if (isArraylike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
				} else {
					push.call(ret, arr)
				}
			}
			return ret
		},
		inArray: function(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i)
		},
		merge: function(first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			for (; j < len; j++) {
				first[i++] = second[j]
			}
			first.length = i;
			return first
		},
		grep: function(elems, callback, invert) {
			var callbackInverse, matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i])
				}
			}
			return matches
		},
		map: function(elems, callback, arg) {
			var value, i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value)
					}
				}
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value)
					}
				}
			}
			return concat.apply([], ret)
		},
		guid: 1,
		proxy: function(fn, context) {
			var tmp, args, proxy;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp
			}
			if (!jQuery.isFunction(fn)) {
				return undefined
			}
			args = slice.call(arguments, 2);
			proxy = function() {
				return fn.apply(context || this, args.concat(slice.call(arguments)))
			};
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
			return proxy
		},
		now: Date.now,
		support: support
	});
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase()
	});

	function isArraylike(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		if (type === "function" || jQuery.isWindow(obj)) {
			return false
		}
		if (obj.nodeType === 1 && length) {
			return true
		}
		return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v1.10.16
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-01-13
	 */
	(function(window) {
		var i, support, Expr, getText, isXML, compile, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -(new Date()),
			preferredDoc = window.document,
			dirruns = 0,
			done = 0,
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			sortOrder = function(a, b) {
				if (a === b) {
					hasDuplicate = true
				}
				return 0
			},
			strundefined = typeof undefined,
			MAX_NEGATIVE = 1 << 31,
			hasOwn = ({}).hasOwnProperty,
			arr = [],
			pop = arr.pop,
			push_native = arr.push,
			push = arr.push,
			slice = arr.slice,
			indexOf = arr.indexOf ||
		function(elem) {
			var i = 0,
				len = this.length;
			for (; i < len; i++) {
				if (this[i] === elem) {
					return i
				}
			}
			return -1
		}, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
			ID: new RegExp("^#(" + characterEncoding + ")"),
			CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
			TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
			ATTR: new RegExp("^" + attributes),
			PSEUDO: new RegExp("^" + pseudos),
			CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			bool: new RegExp("^(?:" + booleans + ")$", "i"),
			needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		}, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 65536;
			return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
		};
		try {
			push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
			arr[preferredDoc.childNodes.length].nodeType
		} catch (e) {
			push = {
				apply: arr.length ?
				function(target, els) {
					push_native.apply(target, slice.call(els))
				} : function(target, els) {
					var j = target.length,
						i = 0;
					while ((target[j++] = els[i++])) {}
					target.length = j - 1
				}
			}
		}
		function Sizzle(selector, context, results, seed) {
			var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
			if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
				setDocument(context)
			}
			context = context || document;
			results = results || [];
			if (!selector || typeof selector !== "string") {
				return results
			}
			if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
				return []
			}
			if (documentIsHTML && !seed) {
				if ((match = rquickExpr.exec(selector))) {
					if ((m = match[1])) {
						if (nodeType === 9) {
							elem = context.getElementById(m);
							if (elem && elem.parentNode) {
								if (elem.id === m) {
									results.push(elem);
									return results
								}
							} else {
								return results
							}
						} else {
							if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
								results.push(elem);
								return results
							}
						}
					} else {
						if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results
						} else {
							if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
								push.apply(results, context.getElementsByClassName(m));
								return results
							}
						}
					}
				}
				if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
					nid = old = expando;
					newContext = context;
					newSelector = nodeType === 9 && selector;
					if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
						groups = tokenize(selector);
						if ((old = context.getAttribute("id"))) {
							nid = old.replace(rescape, "\\$&")
						} else {
							context.setAttribute("id", nid)
						}
						nid = "[id='" + nid + "'] ";
						i = groups.length;
						while (i--) {
							groups[i] = nid + toSelector(groups[i])
						}
						newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						newSelector = groups.join(",")
					}
					if (newSelector) {
						try {
							push.apply(results, newContext.querySelectorAll(newSelector));
							return results
						} catch (qsaError) {} finally {
							if (!old) {
								context.removeAttribute("id")
							}
						}
					}
				}
			}
			return select(selector.replace(rtrim, "$1"), context, results, seed)
		}
		function createCache() {
			var keys = [];

			function cache(key, value) {
				if (keys.push(key + " ") > Expr.cacheLength) {
					delete cache[keys.shift()]
				}
				return (cache[key + " "] = value)
			}
			return cache
		}
		function markFunction(fn) {
			fn[expando] = true;
			return fn
		}
		function assert(fn) {
			var div = document.createElement("div");
			try {
				return !!fn(div)
			} catch (e) {
				return false
			} finally {
				if (div.parentNode) {
					div.parentNode.removeChild(div)
				}
				div = null
			}
		}
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
				i = attrs.length;
			while (i--) {
				Expr.attrHandle[arr[i]] = handler
			}
		}
		function siblingCheck(a, b) {
			var cur = b && a,
				diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
			if (diff) {
				return diff
			}
			if (cur) {
				while ((cur = cur.nextSibling)) {
					if (cur === b) {
						return -1
					}
				}
			}
			return a ? 1 : -1
		}
		function createInputPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type
			}
		}
		function createButtonPseudo(type) {
			return function(elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type
			}
		}
		function createPositionalPseudo(fn) {
			return markFunction(function(argument) {
				argument = +argument;
				return markFunction(function(seed, matches) {
					var j, matchIndexes = fn([], seed.length, argument),
						i = matchIndexes.length;
					while (i--) {
						if (seed[(j = matchIndexes[i])]) {
							seed[j] = !(matches[j] = seed[j])
						}
					}
				})
			})
		}
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== strundefined && context
		}
		support = Sizzle.support = {};
		isXML = Sizzle.isXML = function(elem) {
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false
		};
		setDocument = Sizzle.setDocument = function(node) {
			var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
				parent = doc.defaultView;
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document
			}
			document = doc;
			docElem = doc.documentElement;
			documentIsHTML = !isXML(doc);
			if (parent && parent !== parent.top) {
				if (parent.addEventListener) {
					parent.addEventListener("unload", function() {
						setDocument()
					}, false)
				} else {
					if (parent.attachEvent) {
						parent.attachEvent("onunload", function() {
							setDocument()
						})
					}
				}
			}
			support.attributes = assert(function(div) {
				div.className = "i";
				return !div.getAttribute("className")
			});
			support.getElementsByTagName = assert(function(div) {
				div.appendChild(doc.createComment(""));
				return !div.getElementsByTagName("*").length
			});
			support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
				div.innerHTML = "<div class='a'></div><div class='a i'></div>";
				div.firstChild.className = "i";
				return div.getElementsByClassName("i").length === 2
			});
			support.getById = assert(function(div) {
				docElem.appendChild(div).id = expando;
				return !doc.getElementsByName || !doc.getElementsByName(expando).length
			});
			if (support.getById) {
				Expr.find.ID = function(id, context) {
					if (typeof context.getElementById !== strundefined && documentIsHTML) {
						var m = context.getElementById(id);
						return m && m.parentNode ? [m] : []
					}
				};
				Expr.filter.ID = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						return elem.getAttribute("id") === attrId
					}
				}
			} else {
				delete Expr.find.ID;
				Expr.filter.ID = function(id) {
					var attrId = id.replace(runescape, funescape);
					return function(elem) {
						var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
						return node && node.value === attrId
					}
				}
			}
			Expr.find.TAG = support.getElementsByTagName ?
			function(tag, context) {
				if (typeof context.getElementsByTagName !== strundefined) {
					return context.getElementsByTagName(tag)
				}
			} : function(tag, context) {
				var elem, tmp = [],
					i = 0,
					results = context.getElementsByTagName(tag);
				if (tag === "*") {
					while ((elem = results[i++])) {
						if (elem.nodeType === 1) {
							tmp.push(elem)
						}
					}
					return tmp
				}
				return results
			};
			Expr.find.CLASS = support.getElementsByClassName &&
			function(className, context) {
				if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
					return context.getElementsByClassName(className)
				}
			};
			rbuggyMatches = [];
			rbuggyQSA = [];
			if ((support.qsa = rnative.test(doc.querySelectorAll))) {
				assert(function(div) {
					div.innerHTML = "<select t=''><option selected=''></option></select>";
					if (div.querySelectorAll("[t^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
					}
					if (!div.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
					}
					if (!div.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked")
					}
				});
				assert(function(div) {
					var input = doc.createElement("input");
					input.setAttribute("type", "hidden");
					div.appendChild(input).setAttribute("name", "D");
					if (div.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
					}
					if (!div.querySelectorAll(":enabled").length) {
						rbuggyQSA.push(":enabled", ":disabled")
					}
					div.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:")
				})
			}
			if ((support.matchesSelector = rnative.test((matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
				assert(function(div) {
					support.disconnectedMatch = matches.call(div, "div");
					matches.call(div, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos)
				})
			}
			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
			hasCompare = rnative.test(docElem.compareDocumentPosition);
			contains = hasCompare || rnative.test(docElem.contains) ?
			function(a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
			} : function(a, b) {
				if (b) {
					while ((b = b.parentNode)) {
						if (b === a) {
							return true
						}
					}
				}
				return false
			};
			sortOrder = hasCompare ?
			function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0
				}
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare
				}
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
				if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
					if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1
					}
					if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1
					}
					return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
				}
				return compare & 4 ? -1 : 1
			} : function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0
				}
				var cur, i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [a],
					bp = [b];
				if (!aup || !bup) {
					return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
				} else {
					if (aup === bup) {
						return siblingCheck(a, b)
					}
				}
				cur = a;
				while ((cur = cur.parentNode)) {
					ap.unshift(cur)
				}
				cur = b;
				while ((cur = cur.parentNode)) {
					bp.unshift(cur)
				}
				while (ap[i] === bp[i]) {
					i++
				}
				return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
			};
			return doc
		};
		Sizzle.matches = function(expr, elements) {
			return Sizzle(expr, null, null, elements)
		};
		Sizzle.matchesSelector = function(elem, expr) {
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem)
			}
			expr = expr.replace(rattributeQuotes, "='$1']");
			if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
				try {
					var ret = matches.call(elem, expr);
					if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
						return ret
					}
				} catch (e) {}
			}
			return Sizzle(expr, document, null, [elem]).length > 0
		};
		Sizzle.contains = function(context, elem) {
			if ((context.ownerDocument || context) !== document) {
				setDocument(context)
			}
			return contains(context, elem)
		};
		Sizzle.attr = function(elem, name) {
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem)
			}
			var fn = Expr.attrHandle[name.toLowerCase()],
				val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
		};
		Sizzle.error = function(msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg)
		};
		Sizzle.uniqueSort = function(results) {
			var elem, duplicates = [],
				j = 0,
				i = 0;
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);
			if (hasDuplicate) {
				while ((elem = results[i++])) {
					if (elem === results[i]) {
						j = duplicates.push(i)
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1)
				}
			}
			sortInput = null;
			return results
		};
		getText = Sizzle.getText = function(elem) {
			var node, ret = "",
				i = 0,
				nodeType = elem.nodeType;
			if (!nodeType) {
				while ((node = elem[i++])) {
					ret += getText(node)
				}
			} else {
				if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					if (typeof elem.textContent === "string") {
						return elem.textContent
					} else {
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem)
						}
					}
				} else {
					if (nodeType === 3 || nodeType === 4) {
						return elem.nodeValue
					}
				}
			}
			return ret
		};
		Expr = Sizzle.selectors = {
			cacheLength: 50,
			createPseudo: markFunction,
			match: matchExpr,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: true
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: true
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(match) {
					match[1] = match[1].replace(runescape, funescape);
					match[3] = (match[4] || match[5] || "").replace(runescape, funescape);
					if (match[2] === "~=") {
						match[3] = " " + match[3] + " "
					}
					return match.slice(0, 4)
				},
				CHILD: function(match) {
					match[1] = match[1].toLowerCase();
					if (match[1].slice(0, 3) === "nth") {
						if (!match[3]) {
							Sizzle.error(match[0])
						}
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +((match[7] + match[8]) || match[3] === "odd")
					} else {
						if (match[3]) {
							Sizzle.error(match[0])
						}
					}
					return match
				},
				PSEUDO: function(match) {
					var excess, unquoted = !match[5] && match[2];
					if (matchExpr.CHILD.test(match[0])) {
						return null
					}
					if (match[3] && match[4] !== undefined) {
						match[2] = match[4]
					} else {
						if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess)
						}
					}
					return match.slice(0, 3)
				}
			},
			filter: {
				TAG: function(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ?
					function() {
						return true
					} : function(elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
					}
				},
				CLASS: function(className) {
					var pattern = classCache[className + " "];
					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
					})
				},
				ATTR: function(name, operator, check) {
					return function(elem) {
						var result = Sizzle.attr(elem, name);
						if (result == null) {
							return operator === "!="
						}
						if (!operator) {
							return true
						}
						result += "";
						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
					}
				},
				CHILD: function(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
						forward = type.slice(-4) !== "last",
						ofType = what === "of-type";
					return first === 1 && last === 0 ?
					function(elem) {
						return !!elem.parentNode
					} : function(elem, context, xml) {
						var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
						if (parent) {
							if (simple) {
								while (dir) {
									node = elem;
									while ((node = node[dir])) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
											return false
										}
									}
									start = dir = type === "only" && !start && "nextSibling"
								}
								return true
							}
							start = [forward ? parent.firstChild : parent.lastChild];
							if (forward && useCache) {
								outerCache = parent[expando] || (parent[expando] = {});
								cache = outerCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];
								while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
									if (node.nodeType === 1 && ++diff && node === elem) {
										outerCache[type] = [dirruns, nodeIndex, diff];
										break
									}
								}
							} else {
								if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
									diff = cache[1]
								} else {
									while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
											if (useCache) {
												(node[expando] || (node[expando] = {}))[type] = [dirruns, diff]
											}
											if (node === elem) {
												break
											}
										}
									}
								}
							}
							diff -= last;
							return diff === first || (diff % first === 0 && diff / first >= 0)
						}
					}
				},
				PSEUDO: function(pseudo, argument) {
					var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
					if (fn[expando]) {
						return fn(argument)
					}
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
							var idx, matched = fn(seed, argument),
								i = matched.length;
							while (i--) {
								idx = indexOf.call(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i])
							}
						}) : function(elem) {
							return fn(elem, 0, args)
						}
					}
					return fn
				}
			},
			pseudos: {
				not: markFunction(function(selector) {
					var input = [],
						results = [],
						matcher = compile(selector.replace(rtrim, "$1"));
					return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
						var elem, unmatched = matcher(seed, null, xml, []),
							i = seed.length;
						while (i--) {
							if ((elem = unmatched[i])) {
								seed[i] = !(matches[i] = elem)
							}
						}
					}) : function(elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						return !results.pop()
					}
				}),
				has: markFunction(function(selector) {
					return function(elem) {
						return Sizzle(selector, elem).length > 0
					}
				}),
				contains: markFunction(function(text) {
					return function(elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
					}
				}),
				lang: markFunction(function(lang) {
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang)
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function(elem) {
						var elemLang;
						do {
							if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false
					}
				}),
				target: function(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id
				},
				root: function(elem) {
					return elem === docElem
				},
				focus: function(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
				},
				enabled: function(elem) {
					return elem.disabled === false
				},
				disabled: function(elem) {
					return elem.disabled === true
				},
				checked: function(elem) {
					var nodeName = elem.nodeName.toLowerCase();
					return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected)
				},
				selected: function(elem) {
					if (elem.parentNode) {
						elem.parentNode.selectedIndex
					}
					return elem.selected === true
				},
				empty: function(elem) {
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false
						}
					}
					return true
				},
				parent: function(elem) {
					return !Expr.pseudos.empty(elem)
				},
				header: function(elem) {
					return rheader.test(elem.nodeName)
				},
				input: function(elem) {
					return rinputs.test(elem.nodeName)
				},
				button: function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button"
				},
				text: function(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
				},
				first: createPositionalPseudo(function() {
					return [0]
				}),
				last: createPositionalPseudo(function(matchIndexes, length) {
					return [length - 1]
				}),
				eq: createPositionalPseudo(function(matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument]
				}),
				even: createPositionalPseudo(function(matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				odd: createPositionalPseudo(function(matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				lt: createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i)
					}
					return matchIndexes
				}),
				gt: createPositionalPseudo(function(matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i)
					}
					return matchIndexes
				})
			}
		};
		Expr.pseudos.nth = Expr.pseudos.eq;
		for (i in {
			radio: true,
			checkbox: true,
			file: true,
			password: true,
			image: true
		}) {
			Expr.pseudos[i] = createInputPseudo(i)
		}
		for (i in {
			submit: true,
			reset: true
		}) {
			Expr.pseudos[i] = createButtonPseudo(i)
		}
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		function tokenize(selector, parseOnly) {
			var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
			if (cached) {
				return parseOnly ? 0 : cached.slice(0)
			}
			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;
			while (soFar) {
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						soFar = soFar.slice(match[0].length) || soFar
					}
					groups.push((tokens = []))
				}
				matched = false;
				if ((match = rcombinators.exec(soFar))) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length)
				}
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length)
					}
				}
				if (!matched) {
					break
				}
			}
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
		}
		function toSelector(tokens) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value
			}
			return selector
		}
		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;
			return combinator.first ?
			function(elem, context, xml) {
				while ((elem = elem[dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml)
					}
				}
			} : function(elem, context, xml) {
				var oldCache, outerCache, newCache = [dirruns, doneName];
				if (xml) {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true
							}
						}
					}
				} else {
					while ((elem = elem[dir])) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});
							if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
								return (newCache[2] = oldCache[2])
							} else {
								outerCache[dir] = newCache;
								if ((newCache[2] = matcher(elem, context, xml))) {
									return true
								}
							}
						}
					}
				}
			}
		}
		function elementMatcher(matchers) {
			return matchers.length > 1 ?
			function(elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false
					}
				}
				return true
			} : matchers[0]
		}
		function condense(unmatched, map, filter, context, xml) {
			var elem, newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;
			for (; i < len; i++) {
				if ((elem = unmatched[i])) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i)
						}
					}
				}
			}
			return newUnmatched
		}
		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter)
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector)
			}
			return markFunction(function(seed, results, context, xml) {
				var temp, i, elem, preMap = [],
					postMap = [],
					preexisting = results.length,
					elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
					matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
					matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml)
				}
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);
					i = temp.length;
					while (i--) {
						if ((elem = temp[i])) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
						}
					}
				}
				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if ((elem = matcherOut[i])) {
									temp.push((matcherIn[i] = elem))
								}
							}
							postFinder(null, (matcherOut = []), temp, xml)
						}
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
								seed[temp] = !(results[temp] = elem)
							}
						}
					}
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml)
					} else {
						push.apply(results, matcherOut)
					}
				}
			})
		}
		function matcherFromTokens(tokens) {
			var checkContext, matcher, j, len = tokens.length,
				leadingRelative = Expr.relative[tokens[0].type],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,
				matchContext = addCombinator(function(elem) {
					return elem === checkContext
				}, implicitRelative, true),
				matchAnyContext = addCombinator(function(elem) {
					return indexOf.call(checkContext, elem) > -1
				}, implicitRelative, true),
				matchers = [function(elem, context, xml) {
					return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
				}];
			for (; i < len; i++) {
				if ((matcher = Expr.relative[tokens[i].type])) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)]
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
					if (matcher[expando]) {
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
							value: tokens[i - 2].type === " " ? "*" : ""
						})).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
					}
					matchers.push(matcher)
				}
			}
			return elementMatcher(matchers)
		}
		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function(seed, context, xml, results, outermost) {
					var elem, j, matcher, matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						setMatched = [],
						contextBackup = outermostContext,
						elems = seed || byElement && Expr.find.TAG("*", outermost),
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
						len = elems.length;
					if (outermost) {
						outermostContext = context !== document && context
					}
					for (; i !== len && (elem = elems[i]) != null; i++) {
						if (byElement && elem) {
							j = 0;
							while ((matcher = elementMatchers[j++])) {
								if (matcher(elem, context, xml)) {
									results.push(elem);
									break
								}
							}
							if (outermost) {
								dirruns = dirrunsUnique
							}
						}
						if (bySet) {
							if ((elem = !matcher && elem)) {
								matchedCount--
							}
							if (seed) {
								unmatched.push(elem)
							}
						}
					}
					matchedCount += i;
					if (bySet && i !== matchedCount) {
						j = 0;
						while ((matcher = setMatchers[j++])) {
							matcher(unmatched, setMatched, context, xml)
						}
						if (seed) {
							if (matchedCount > 0) {
								while (i--) {
									if (!(unmatched[i] || setMatched[i])) {
										setMatched[i] = pop.call(results)
									}
								}
							}
							setMatched = condense(setMatched)
						}
						push.apply(results, setMatched);
						if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
							Sizzle.uniqueSort(results)
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup
					}
					return unmatched
				};
			return bySet ? markFunction(superMatcher) : superMatcher
		}
		compile = Sizzle.compile = function(selector, group) {
			var i, setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[selector + " "];
			if (!cached) {
				if (!group) {
					group = tokenize(selector)
				}
				i = group.length;
				while (i--) {
					cached = matcherFromTokens(group[i]);
					if (cached[expando]) {
						setMatchers.push(cached)
					} else {
						elementMatchers.push(cached)
					}
				}
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
			}
			return cached
		};

		function multipleContexts(selector, contexts, results) {
			var i = 0,
				len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results)
			}
			return results
		}
		function select(selector, context, results, seed) {
			var i, tokens, token, type, find, match = tokenize(selector);
			if (!seed) {
				if (match.length === 1) {
					tokens = match[0] = match[0].slice(0);
					if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
						context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
						if (!context) {
							return results
						}
						selector = selector.slice(tokens.shift().value.length)
					}
					i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
					while (i--) {
						token = tokens[i];
						if (Expr.relative[(type = token.type)]) {
							break
						}
						if ((find = Expr.find[type])) {
							if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
								tokens.splice(i, 1);
								selector = seed.length && toSelector(tokens);
								if (!selector) {
									push.apply(results, seed);
									return results
								}
								break
							}
						}
					}
				}
			}
			compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
			return results
		}
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
		support.detectDuplicates = !! hasDuplicate;
		setDocument();
		support.sortDetached = assert(function(div1) {
			return div1.compareDocumentPosition(document.createElement("div")) & 1
		});
		if (!assert(function(div) {
			div.innerHTML = "<a href='#'></a>";
			return div.firstChild.getAttribute("href") === "#"
		})) {
			addHandle("type|href|height|width", function(elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
				}
			})
		}
		if (!support.attributes || !assert(function(div) {
			div.innerHTML = "<input/>";
			div.firstChild.setAttribute("value", "");
			return div.firstChild.getAttribute("value") === ""
		})) {
			addHandle("value", function(elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue
				}
			})
		}
		if (!assert(function(div) {
			return div.getAttribute("disabled") == null
		})) {
			addHandle(booleans, function(elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
				}
			})
		}
		return Sizzle
	})(window);
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	var rneedsContext = jQuery.expr.match.needsContext;
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	var risSimple = /^.[^:#\[\.,]*$/;

	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function(elem, i) {
				return !!qualifier.call(elem, i, elem) !== not
			})
		}
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function(elem) {
				return (elem === qualifier) !== not
			})
		}
		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not)
			}
			qualifier = jQuery.filter(qualifier, elements)
		}
		return jQuery.grep(elements, function(elem) {
			return (indexOf.call(qualifier, elem) >= 0) !== not
		})
	}
	jQuery.filter = function(expr, elems, not) {
		var elem = elems[0];
		if (not) {
			expr = ":not(" + expr + ")"
		}
		return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
			return elem.nodeType === 1
		}))
	};
	jQuery.fn.extend({
		find: function(selector) {
			var i, len = this.length,
				ret = [],
				self = this;
			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function() {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true
						}
					}
				}))
			}
			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret)
			}
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret
		},
		filter: function(selector) {
			return this.pushStack(winnow(this, selector || [], false))
		},
		not: function(selector) {
			return this.pushStack(winnow(this, selector || [], true))
		},
		is: function(selector) {
			return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
		}
	});
	var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		init = jQuery.fn.init = function(selector, context) {
			var match, elem;
			if (!selector) {
				return this
			}
			if (typeof selector === "string") {
				if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
					match = [null, selector, null]
				} else {
					match = rquickExpr.exec(selector)
				}
				if (match && (match[1] || !context)) {
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;
						jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {
								if (jQuery.isFunction(this[match])) {
									this[match](context[match])
								} else {
									this.attr(match, context[match])
								}
							}
						}
						return this
					} else {
						elem = document.getElementById(match[2]);
						if (elem && elem.parentNode) {
							this.length = 1;
							this[0] = elem
						}
						this.context = document;
						this.selector = selector;
						return this
					}
				} else {
					if (!context || context.jquery) {
						return (context || rootjQuery).find(selector)
					} else {
						return this.constructor(context).find(selector)
					}
				}
			} else {
				if (selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this
				} else {
					if (jQuery.isFunction(selector)) {
						return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery)
					}
				}
			}
			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context
			}
			return jQuery.makeArray(selector, this)
		};
	init.prototype = jQuery.fn;
	rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	jQuery.extend({
		dir: function(elem, dir, until) {
			var matched = [],
				truncate = until !== undefined;
			while ((elem = elem[dir]) && elem.nodeType !== 9) {
				if (elem.nodeType === 1) {
					if (truncate && jQuery(elem).is(until)) {
						break
					}
					matched.push(elem)
				}
			}
			return matched
		},
		sibling: function(n, elem) {
			var matched = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					matched.push(n)
				}
			}
			return matched
		}
	});
	jQuery.fn.extend({
		has: function(target) {
			var targets = jQuery(target, this),
				l = targets.length;
			return this.filter(function() {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true
					}
				}
			})
		},
		closest: function(selectors, context) {
			var cur, i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
					if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
						matched.push(cur);
						break
					}
				}
			}
			return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
		},
		index: function(elem) {
			if (!elem) {
				return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
			}
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0])
			}
			return indexOf.call(this, elem.jquery ? elem[0] : elem)
		},
		add: function(selector, context) {
			return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
		},
		addBack: function(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur
	}
	jQuery.each({
		parent: function(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null
		},
		parents: function(elem) {
			return jQuery.dir(elem, "parentNode")
		},
		parentsUntil: function(elem, i, until) {
			return jQuery.dir(elem, "parentNode", until)
		},
		next: function(elem) {
			return sibling(elem, "nextSibling")
		},
		prev: function(elem) {
			return sibling(elem, "previousSibling")
		},
		nextAll: function(elem) {
			return jQuery.dir(elem, "nextSibling")
		},
		prevAll: function(elem) {
			return jQuery.dir(elem, "previousSibling")
		},
		nextUntil: function(elem, i, until) {
			return jQuery.dir(elem, "nextSibling", until)
		},
		prevUntil: function(elem, i, until) {
			return jQuery.dir(elem, "previousSibling", until)
		},
		siblings: function(elem) {
			return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
		},
		children: function(elem) {
			return jQuery.sibling(elem.firstChild)
		},
		contents: function(elem) {
			return elem.contentDocument || jQuery.merge([], elem.childNodes)
		}
	}, function(name, fn) {
		jQuery.fn[name] = function(until, selector) {
			var matched = jQuery.map(this, fn, until);
			if (name.slice(-5) !== "Until") {
				selector = until
			}
			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched)
			}
			if (this.length > 1) {
				if (!guaranteedUnique[name]) {
					jQuery.unique(matched)
				}
				if (rparentsprev.test(name)) {
					matched.reverse()
				}
			}
			return this.pushStack(matched)
		}
	});
	var rnotwhite = (/\S+/g);
	var optionsCache = {};

	function createOptions(options) {
		var object = optionsCache[options] = {};
		jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
			object[flag] = true
		});
		return object
	}
	jQuery.Callbacks = function(options) {
		options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
		var memory, fired, firing, firingStart, firingLength, firingIndex, list = [],
			stack = !options.once && [],
			fire = function(data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
						memory = false;
						break
					}
				}
				firing = false;
				if (list) {
					if (stack) {
						if (stack.length) {
							fire(stack.shift())
						}
					} else {
						if (memory) {
							list = []
						} else {
							self.disable()
						}
					}
				}
			},
			self = {
				add: function() {
					if (list) {
						var start = list.length;
						(function add(args) {
							jQuery.each(args, function(_, arg) {
								var type = jQuery.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) {
										list.push(arg)
									}
								} else {
									if (arg && arg.length && type !== "string") {
										add(arg)
									}
								}
							})
						})(arguments);
						if (firing) {
							firingLength = list.length
						} else {
							if (memory) {
								firingStart = start;
								fire(memory)
							}
						}
					}
					return this
				},
				remove: function() {
					if (list) {
						jQuery.each(arguments, function(_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);
								if (firing) {
									if (index <= firingLength) {
										firingLength--
									}
									if (index <= firingIndex) {
										firingIndex--
									}
								}
							}
						})
					}
					return this
				},
				has: function(fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length)
				},
				empty: function() {
					list = [];
					firingLength = 0;
					return this
				},
				disable: function() {
					list = stack = memory = undefined;
					return this
				},
				disabled: function() {
					return !list
				},
				lock: function() {
					stack = undefined;
					if (!memory) {
						self.disable()
					}
					return this
				},
				locked: function() {
					return !stack
				},
				fireWith: function(context, args) {
					if (list && (!fired || stack)) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (firing) {
							stack.push(args)
						} else {
							fire(args)
						}
					}
					return this
				},
				fire: function() {
					self.fireWith(this, arguments);
					return this
				},
				fired: function() {
					return !!fired
				}
			};
		return self
	};
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
				["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
				["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
				["notify", "progress", jQuery.Callbacks("memory")]
			],
				state = "pending",
				promise = {
					state: function() {
						return state
					},
					always: function() {
						deferred.done(arguments).fail(arguments);
						return this
					},
					then: function() {
						var fns = arguments;
						return jQuery.Deferred(function(newDefer) {
							jQuery.each(tuples, function(i, tuple) {
								var fn = jQuery.isFunction(fns[i]) && fns[i];
								deferred[tuple[1]](function() {
									var returned = fn && fn.apply(this, arguments);
									if (returned && jQuery.isFunction(returned.promise)) {
										returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
									} else {
										newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
									}
								})
							});
							fns = null
						}).promise()
					},
					promise: function(obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise
					}
				},
				deferred = {};
			promise.pipe = promise.then;
			jQuery.each(tuples, function(i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if (stateString) {
					list.add(function() {
						state = stateString
					}, tuples[i ^ 1][2].disable, tuples[2][2].lock)
				}
				deferred[tuple[0]] = function() {
					deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
					return this
				};
				deferred[tuple[0] + "With"] = list.fireWith
			});
			promise.promise(deferred);
			if (func) {
				func.call(deferred, deferred)
			}
			return deferred
		},
		when: function(subordinate) {
			var i = 0,
				resolveValues = slice.call(arguments),
				length = resolveValues.length,
				remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
				updateFunc = function(i, contexts, values) {
					return function(value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values)
						} else {
							if (!(--remaining)) {
								deferred.resolveWith(contexts, values)
							}
						}
					}
				},
				progressValues, progressContexts, resolveContexts;
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
					} else {
						--remaining
					}
				}
			}
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues)
			}
			return deferred.promise()
		}
	});
	var readyList;
	jQuery.fn.ready = function(fn) {
		jQuery.ready.promise().done(fn);
		return this
	};
	jQuery.extend({
		isReady: false,
		readyWait: 1,
		holdReady: function(hold) {
			if (hold) {
				jQuery.readyWait++
			} else {
				jQuery.ready(true)
			}
		},
		ready: function(wait) {
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return
			}
			jQuery.isReady = true;
			if (wait !== true && --jQuery.readyWait > 0) {
				return
			}
			readyList.resolveWith(document, [jQuery]);
			if (jQuery.fn.trigger) {
				jQuery(document).trigger("ready").off("ready")
			}
		}
	});

	function completed() {
		document.removeEventListener("DOMContentLoaded", completed, false);
		window.removeEventListener("load", completed, false);
		jQuery.ready()
	}
	jQuery.ready.promise = function(obj) {
		if (!readyList) {
			readyList = jQuery.Deferred();
			if (document.readyState === "complete") {
				setTimeout(jQuery.ready)
			} else {
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false)
			}
		}
		return readyList.promise(obj)
	};
	jQuery.ready.promise();
	var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
			var i = 0,
				len = elems.length,
				bulk = key == null;
			if (jQuery.type(key) === "object") {
				chainable = true;
				for (i in key) {
					jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
				}
			} else {
				if (value !== undefined) {
					chainable = true;
					if (!jQuery.isFunction(value)) {
						raw = true
					}
					if (bulk) {
						if (raw) {
							fn.call(elems, value);
							fn = null
						} else {
							bulk = fn;
							fn = function(elem, key, value) {
								return bulk.call(jQuery(elem), value)
							}
						}
					}
					if (fn) {
						for (; i < len; i++) {
							fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
						}
					}
				}
			}
			return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet
		};
	jQuery.acceptData = function(owner) {
		return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType)
	};

	function Data() {
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {}
			}
		});
		this.expando = jQuery.expando + Math.random()
	}
	Data.uid = 1;
	Data.accepts = jQuery.acceptData;
	Data.prototype = {
		key: function(owner) {
			if (!Data.accepts(owner)) {
				return 0
			}
			var descriptor = {},
				unlock = owner[this.expando];
			if (!unlock) {
				unlock = Data.uid++;
				try {
					descriptor[this.expando] = {
						value: unlock
					};
					Object.defineProperties(owner, descriptor)
				} catch (e) {
					descriptor[this.expando] = unlock;
					jQuery.extend(owner, descriptor)
				}
			}
			if (!this.cache[unlock]) {
				this.cache[unlock] = {}
			}
			return unlock
		},
		set: function(owner, data, value) {
			var prop, unlock = this.key(owner),
				cache = this.cache[unlock];
			if (typeof data === "string") {
				cache[data] = value
			} else {
				if (jQuery.isEmptyObject(cache)) {
					jQuery.extend(this.cache[unlock], data)
				} else {
					for (prop in data) {
						cache[prop] = data[prop]
					}
				}
			}
			return cache
		},
		get: function(owner, key) {
			var cache = this.cache[this.key(owner)];
			return key === undefined ? cache : cache[key]
		},
		access: function(owner, key, value) {
			var stored;
			if (key === undefined || ((key && typeof key === "string") && value === undefined)) {
				stored = this.get(owner, key);
				return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key))
			}
			this.set(owner, key, value);
			return value !== undefined ? value : key
		},
		remove: function(owner, key) {
			var i, name, camel, unlock = this.key(owner),
				cache = this.cache[unlock];
			if (key === undefined) {
				this.cache[unlock] = {}
			} else {
				if (jQuery.isArray(key)) {
					name = key.concat(key.map(jQuery.camelCase))
				} else {
					camel = jQuery.camelCase(key);
					if (key in cache) {
						name = [key, camel]
					} else {
						name = camel;
						name = name in cache ? [name] : (name.match(rnotwhite) || [])
					}
				}
				i = name.length;
				while (i--) {
					delete cache[name[i]]
				}
			}
		},
		hasData: function(owner) {
			return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {})
		},
		discard: function(owner) {
			if (owner[this.expando]) {
				delete this.cache[owner[this.expando]]
			}
		}
	};
	var data_priv = new Data();
	var data_user = new Data();
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr(elem, key, data) {
		var name;
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
				} catch (e) {}
				data_user.set(elem, key, data)
			} else {
				data = undefined
			}
		}
		return data
	}
	jQuery.extend({
		hasData: function(elem) {
			return data_user.hasData(elem) || data_priv.hasData(elem)
		},
		data: function(elem, name, data) {
			return data_user.access(elem, name, data)
		},
		removeData: function(elem, name) {
			data_user.remove(elem, name)
		},
		_data: function(elem, name, data) {
			return data_priv.access(elem, name, data)
		},
		_removeData: function(elem, name) {
			data_priv.remove(elem, name)
		}
	});
	jQuery.fn.extend({
		data: function(key, value) {
			var i, name, data, elem = this[0],
				attrs = elem && elem.attributes;
			if (key === undefined) {
				if (this.length) {
					data = data_user.get(elem);
					if (elem.nodeType === 1 && !data_priv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {
							name = attrs[i].name;
							if (name.indexOf("data-") === 0) {
								name = jQuery.camelCase(name.slice(5));
								dataAttr(elem, name, data[name])
							}
						}
						data_priv.set(elem, "hasDataAttrs", true)
					}
				}
				return data
			}
			if (typeof key === "object") {
				return this.each(function() {
					data_user.set(this, key)
				})
			}
			return access(this, function(value) {
				var data, camelKey = jQuery.camelCase(key);
				if (elem && value === undefined) {
					data = data_user.get(elem, key);
					if (data !== undefined) {
						return data
					}
					data = data_user.get(elem, camelKey);
					if (data !== undefined) {
						return data
					}
					data = dataAttr(elem, camelKey, undefined);
					if (data !== undefined) {
						return data
					}
					return
				}
				this.each(function() {
					var data = data_user.get(this, camelKey);
					data_user.set(this, camelKey, value);
					if (key.indexOf("-") !== -1 && data !== undefined) {
						data_user.set(this, key, value)
					}
				})
			}, null, value, arguments.length > 1, null, true)
		},
		removeData: function(key) {
			return this.each(function() {
				data_user.remove(this, key)
			})
		}
	});
	jQuery.extend({
		queue: function(elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = data_priv.get(elem, type);
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = data_priv.access(elem, type, jQuery.makeArray(data))
					} else {
						queue.push(data)
					}
				}
				return queue || []
			}
		},
		dequeue: function(elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function() {
					jQuery.dequeue(elem, type)
				};
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--
			}
			if (fn) {
				if (type === "fx") {
					queue.unshift("inprogress")
				}
				delete hooks.stop;
				fn.call(elem, next, hooks)
			}
			if (!startLength && hooks) {
				hooks.empty.fire()
			}
		},
		_queueHooks: function(elem, type) {
			var key = type + "queueHooks";
			return data_priv.get(elem, key) || data_priv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove(elem, [type + "queue", key])
				})
			})
		}
	});
	jQuery.fn.extend({
		queue: function(type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--
			}
			if (arguments.length < setter) {
				return jQuery.queue(this[0], type)
			}
			return data === undefined ? this : this.each(function() {
				var queue = jQuery.queue(this, type, data);
				jQuery._queueHooks(this, type);
				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type)
				}
			})
		},
		dequeue: function(type) {
			return this.each(function() {
				jQuery.dequeue(this, type)
			})
		},
		clearQueue: function(type) {
			return this.queue(type || "fx", [])
		},
		promise: function(type, obj) {
			var tmp, count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if (!(--count)) {
						defer.resolveWith(elements, [elements])
					}
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined
			}
			type = type || "fx";
			while (i--) {
				tmp = data_priv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve)
				}
			}
			resolve();
			return defer.promise(obj)
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	var cssExpand = ["Top", "Right", "Bottom", "Left"];
	var isHidden = function(elem, el) {
			elem = el || elem;
			return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
		};
	var rcheckableType = (/^(?:checkbox|radio)$/i);
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild(document.createElement("div"));
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !! div.cloneNode(true).lastChild.defaultValue
	})();
	var strundefined = typeof undefined;
	support.focusinBubbles = "onfocusin" in window;
	var rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true
	}
	function returnFalse() {
		return false
	}
	function safeActiveElement() {
		try {
			return document.activeElement
		} catch (err) {}
	}
	jQuery.event = {
		global: {},
		add: function(elem, types, handler, data, selector) {
			var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
			if (!elemData) {
				return
			}
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector
			}
			if (!handler.guid) {
				handler.guid = jQuery.guid++
			}
			if (!(events = elemData.events)) {
				events = elemData.events = {}
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function(e) {
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined
				}
			}
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					continue
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				special = jQuery.event.special[type] || {};
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle, false)
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid
					}
				}
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj)
				} else {
					handlers.push(handleObj)
				}
				jQuery.event.global[type] = true
			}
		},
		remove: function(elem, types, handler, selector, mappedTypes) {
			var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
			if (!elemData || !(events = elemData.events)) {
				return
			}
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true)
					}
					continue
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);
						if (handleObj.selector) {
							handlers.delegateCount--
						}
						if (special.remove) {
							special.remove.call(elem, handleObj)
						}
					}
				}
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
						jQuery.removeEvent(elem, type, elemData.handle)
					}
					delete events[type]
				}
			}
			if (jQuery.isEmptyObject(events)) {
				delete elemData.handle;
				data_priv.remove(elem, "events")
			}
		},
		trigger: function(event, data, elem, onlyHandlers) {
			var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
			cur = tmp = elem = elem || document;
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return
			}
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return
			}
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort()
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
			event.result = undefined;
			if (!event.target) {
				event.target = elem
			}
			data = data == null ? [event] : jQuery.makeArray(data, [event]);
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return
			}
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur
				}
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window)
				}
			}
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1 ? bubbleType : special.bindType || type;
				handle = (data_priv.get(cur, "events") || {})[event.type] && data_priv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data)
				}
				handle = ontype && cur[ontype];
				if (handle && handle.apply && jQuery.acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault()
					}
				}
			}
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
						tmp = elem[ontype];
						if (tmp) {
							elem[ontype] = null
						}
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;
						if (tmp) {
							elem[ontype] = tmp
						}
					}
				}
			}
			return event.result
		},
		dispatch: function(event) {
			event = jQuery.event.fix(event);
			var i, j, ret, matched, handleObj, handlerQueue = [],
				args = slice.call(arguments),
				handlers = (data_priv.get(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};
			args[0] = event;
			event.delegateTarget = this;
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return
			}
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
					if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
						event.handleObj = handleObj;
						event.data = handleObj.data;
						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation()
							}
						}
					}
				}
			}
			if (special.postDispatch) {
				special.postDispatch.call(this, event)
			}
			return event.result
		},
		handlers: function(event, handlers) {
			var i, matches, sel, handleObj, handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
				for (; cur !== this; cur = cur.parentNode || this) {
					if (cur.disabled !== true || event.type !== "click") {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							sel = handleObj.selector + " ";
							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
							}
							if (matches[sel]) {
								matches.push(handleObj)
							}
						}
						if (matches.length) {
							handlerQueue.push({
								elem: cur,
								handlers: matches
							})
						}
					}
				}
			}
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: this,
					handlers: handlers.slice(delegateCount)
				})
			}
			return handlerQueue
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(event, original) {
				if (event.which == null) {
					event.which = original.charCode != null ? original.charCode : original.keyCode
				}
				return event
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(event, original) {
				var eventDoc, doc, body, button = original.button;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
					event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
				}
				if (!event.which && button !== undefined) {
					event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
				}
				return event
			}
		},
		fix: function(event) {
			if (event[jQuery.expando]) {
				return event
			}
			var i, prop, copy, type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];
			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
			event = new jQuery.Event(originalEvent);
			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop]
			}
			if (!event.target) {
				event.target = document
			}
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode
			}
			return fixHook.filter ? fixHook.filter(event, originalEvent) : event
		},
		special: {
			load: {
				noBubble: true
			},
			focus: {
				trigger: function() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false
					}
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
						this.click();
						return false
					}
				},
				_default: function(event) {
					return jQuery.nodeName(event.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(event) {
					if (event.result !== undefined) {
						event.originalEvent.returnValue = event.result
					}
				}
			}
		},
		simulate: function(type, elem, event, bubble) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true,
				originalEvent: {}
			});
			if (bubble) {
				jQuery.event.trigger(e, null, elem)
			} else {
				jQuery.event.dispatch.call(elem, e)
			}
			if (e.isDefaultPrevented()) {
				event.preventDefault()
			}
		}
	};
	jQuery.removeEvent = function(elem, type, handle) {
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle, false)
		}
	};
	jQuery.Event = function(src, props) {
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props)
		}
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse
		} else {
			this.type = src
		}
		if (props) {
			jQuery.extend(this, props)
		}
		this.timeStamp = src && src.timeStamp || jQuery.now();
		this[jQuery.expando] = true
	};
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (e && e.preventDefault) {
				e.preventDefault()
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (e && e.stopPropagation) {
				e.stopPropagation()
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation()
		}
	};
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,
			handle: function(event) {
				var ret, target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
				if (!related || (related !== target && !jQuery.contains(target, related))) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix
				}
				return ret
			}
		}
	});
	if (!support.focusinBubbles) {
		jQuery.each({
			focus: "focusin",
			blur: "focusout"
		}, function(orig, fix) {
			var handler = function(event) {
					jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
				};
			jQuery.event.special[fix] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access(doc, fix);
					if (!attaches) {
						doc.addEventListener(orig, handler, true)
					}
					data_priv.access(doc, fix, (attaches || 0) + 1)
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access(doc, fix) - 1;
					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						data_priv.remove(doc, fix)
					} else {
						data_priv.access(doc, fix, attaches)
					}
				}
			}
		})
	}
	jQuery.fn.extend({
		on: function(types, selector, data, fn, one) {
			var origFn, type;
			if (typeof types === "object") {
				if (typeof selector !== "string") {
					data = data || selector;
					selector = undefined
				}
				for (type in types) {
					this.on(type, selector, data, types[type], one)
				}
				return this
			}
			if (data == null && fn == null) {
				fn = selector;
				data = selector = undefined
			} else {
				if (fn == null) {
					if (typeof selector === "string") {
						fn = data;
						data = undefined
					} else {
						fn = data;
						data = selector;
						selector = undefined
					}
				}
			}
			if (fn === false) {
				fn = returnFalse
			} else {
				if (!fn) {
					return this
				}
			}
			if (one === 1) {
				origFn = fn;
				fn = function(event) {
					jQuery().off(event);
					return origFn.apply(this, arguments)
				};
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
			}
			return this.each(function() {
				jQuery.event.add(this, types, fn, data, selector)
			})
		},
		one: function(types, selector, data, fn) {
			return this.on(types, selector, data, fn, 1)
		},
		off: function(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this
			}
			if (typeof types === "object") {
				for (type in types) {
					this.off(type, selector, types[type])
				}
				return this
			}
			if (selector === false || typeof selector === "function") {
				fn = selector;
				selector = undefined
			}
			if (fn === false) {
				fn = returnFalse
			}
			return this.each(function() {
				jQuery.event.remove(this, types, fn, selector)
			})
		},
		trigger: function(type, data) {
			return this.each(function() {
				jQuery.event.trigger(type, data, this)
			})
		},
		triggerHandler: function(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true)
			}
		}
	});
	var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
	}
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);
		if (match) {
			elem.type = match[1]
		} else {
			elem.removeAttribute("type")
		}
		return elem
	}
	function setGlobalEval(elems, refElements) {
		var i = 0,
			l = elems.length;
		for (; i < l; i++) {
			data_priv.set(elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval"))
		}
	}
	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
		if (dest.nodeType !== 1) {
			return
		}
		if (data_priv.hasData(src)) {
			pdataOld = data_priv.access(src);
			pdataCur = data_priv.set(dest, pdataOld);
			events = pdataOld.events;
			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};
				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i])
					}
				}
			}
		}
		if (data_user.hasData(src)) {
			udataOld = data_user.access(src);
			udataCur = jQuery.extend({}, udataOld);
			data_user.set(dest, udataCur)
		}
	}
	function getAll(context, tag) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : context.querySelectorAll ? context.querySelectorAll(tag || "*") : [];
		return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret
	}
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked
		} else {
			if (nodeName === "input" || nodeName === "textarea") {
				dest.defaultValue = src.defaultValue
			}
		}
	}
	jQuery.extend({
		clone: function(elem, dataAndEvents, deepDataAndEvents) {
			var i, l, srcElements, destElements, clone = elem.cloneNode(true),
				inPage = jQuery.contains(elem.ownerDocument, elem);
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i])
				}
			}
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);
					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i])
					}
				} else {
					cloneCopyEvent(elem, clone)
				}
			}
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"))
			}
			return clone
		},
		buildFragment: function(elems, context, scripts, selection) {
			var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;
			for (; i < l; i++) {
				elem = elems[i];
				if (elem || elem === 0) {
					if (jQuery.type(elem) === "object") {
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
					} else {
						if (!rhtml.test(elem)) {
							nodes.push(context.createTextNode(elem))
						} else {
							tmp = tmp || fragment.appendChild(context.createElement("div"));
							tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
							wrap = wrapMap[tag] || wrapMap._default;
							tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
							j = wrap[0];
							while (j--) {
								tmp = tmp.lastChild
							}
							jQuery.merge(nodes, tmp.childNodes);
							tmp = fragment.firstChild;
							tmp.textContent = ""
						}
					}
				}
			}
			fragment.textContent = "";
			i = 0;
			while ((elem = nodes[i++])) {
				if (selection && jQuery.inArray(elem, selection) !== -1) {
					continue
				}
				contains = jQuery.contains(elem.ownerDocument, elem);
				tmp = getAll(fragment.appendChild(elem), "script");
				if (contains) {
					setGlobalEval(tmp)
				}
				if (scripts) {
					j = 0;
					while ((elem = tmp[j++])) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem)
						}
					}
				}
			}
			return fragment
		},
		cleanData: function(elems) {
			var data, elem, events, type, key, j, special = jQuery.event.special,
				i = 0;
			for (;
			(elem = elems[i]) !== undefined; i++) {
				if (jQuery.acceptData(elem)) {
					key = elem[data_priv.expando];
					if (key && (data = data_priv.cache[key])) {
						events = Object.keys(data.events || {});
						if (events.length) {
							for (j = 0;
							(type = events[j]) !== undefined; j++) {
								if (special[type]) {
									jQuery.event.remove(elem, type)
								} else {
									jQuery.removeEvent(elem, type, data.handle)
								}
							}
						}
						if (data_priv.cache[key]) {
							delete data_priv.cache[key]
						}
					}
				}
				delete data_user.cache[elem[data_user.expando]]
			}
		}
	});
	jQuery.fn.extend({
		text: function(value) {
			return access(this, function(value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function() {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value
					}
				})
			}, null, value, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this)
				}
			})
		},
		after: function() {
			return this.domManip(arguments, function(elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling)
				}
			})
		},
		remove: function(selector, keepData) {
			var elem, elems = selector ? jQuery.filter(selector, this) : this,
				i = 0;
			for (;
			(elem = elems[i]) != null; i++) {
				if (!keepData && elem.nodeType === 1) {
					jQuery.cleanData(getAll(elem))
				}
				if (elem.parentNode) {
					if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
						setGlobalEval(getAll(elem, "script"))
					}
					elem.parentNode.removeChild(elem)
				}
			}
			return this
		},
		empty: function() {
			var elem, i = 0;
			for (;
			(elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {
					jQuery.cleanData(getAll(elem, false));
					elem.textContent = ""
				}
			}
			return this
		},
		clone: function(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function() {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
			})
		},
		html: function(value) {
			return access(this, function(value) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML
				}
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
					value = value.replace(rxhtmlTag, "<$1></$2>");
					try {
						for (; i < l; i++) {
							elem = this[i] || {};
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value
							}
						}
						elem = 0
					} catch (e) {}
				}
				if (elem) {
					this.empty().append(value)
				}
			}, null, value, arguments.length)
		},
		replaceWith: function() {
			var arg = arguments[0];
			this.domManip(arguments, function(elem) {
				arg = this.parentNode;
				jQuery.cleanData(getAll(this));
				if (arg) {
					arg.replaceChild(elem, this)
				}
			});
			return arg && (arg.length || arg.nodeType) ? this : this.remove()
		},
		detach: function(selector) {
			return this.remove(selector, true)
		},
		domManip: function(args, callback) {
			args = concat.apply([], args);
			var fragment, first, scripts, hasScripts, node, doc, i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction(value);
			if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
				return this.each(function(index) {
					var self = set.eq(index);
					if (isFunction) {
						args[0] = value.call(this, index, self.html())
					}
					self.domManip(args, callback)
				})
			}
			if (l) {
				fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
				first = fragment.firstChild;
				if (fragment.childNodes.length === 1) {
					fragment = first
				}
				if (first) {
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;
					for (; i < l; i++) {
						node = fragment;
						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);
							if (hasScripts) {
								jQuery.merge(scripts, getAll(node, "script"))
							}
						}
						callback.call(this[i], node, i)
					}
					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;
						jQuery.map(scripts, restoreScript);
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (rscriptType.test(node.type || "") && !data_priv.access(node, "globalEval") && jQuery.contains(doc, node)) {
								if (node.src) {
									if (jQuery._evalUrl) {
										jQuery._evalUrl(node.src)
									}
								} else {
									jQuery.globalEval(node.textContent.replace(rcleanScript, ""))
								}
							}
						}
					}
				}
			}
			return this
		}
	});
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(name, original) {
		jQuery.fn[name] = function(selector) {
			var elems, ret = [],
				insert = jQuery(selector),
				last = insert.length - 1,
				i = 0;
			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);
				push.apply(ret, elems.get())
			}
			return this.pushStack(ret)
		}
	});
	var iframe, elemdisplay = {};

	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
			display = window.getDefaultComputedStyle ? window.getDefaultComputedStyle(elem[0]).display : jQuery.css(elem[0], "display");
		elem.detach();
		return display
	}
	function defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];
		if (!display) {
			display = actualDisplay(nodeName, doc);
			if (display === "none" || !display) {
				iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
				doc = iframe[0].contentDocument;
				doc.write();
				doc.close();
				display = actualDisplay(nodeName, doc);
				iframe.detach()
			}
			elemdisplay[nodeName] = display
		}
		return display
	}
	var rmargin = (/^margin/);
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	var getStyles = function(elem) {
			return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
		};

	function curCSS(elem, name, computed) {
		var width, minWidth, maxWidth, ret, style = elem.style;
		computed = computed || getStyles(elem);
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name]
		}
		if (computed) {
			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name)
			}
			if (rnumnonpx.test(ret) && rmargin.test(name)) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth
			}
		}
		return ret !== undefined ? ret + "" : ret
	}
	function addGetHookIf(conditionFn, hookFn) {
		return {
			get: function() {
				if (conditionFn()) {
					delete this.get;
					return
				}
				return (this.get = hookFn).apply(this, arguments)
			}
		}
	}(function() {
		var pixelPositionVal, boxSizingReliableVal, divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			docElem = document.documentElement,
			container = document.createElement("div"),
			div = document.createElement("div");
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
		container.appendChild(div);

		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
			docElem.appendChild(container);
			var divStyle = window.getComputedStyle(div, null);
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";
			docElem.removeChild(container)
		}
		if (window.getComputedStyle) {
			jQuery.extend(support, {
				pixelPosition: function() {
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal
				},
				boxSizingReliable: function() {
					if (boxSizingReliableVal == null) {
						computePixelPositionAndBoxSizingReliable()
					}
					return boxSizingReliableVal
				},
				reliableMarginRight: function() {
					var ret, marginDiv = div.appendChild(document.createElement("div"));
					marginDiv.style.cssText = div.style.cssText = divReset;
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild(container);
					ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
					docElem.removeChild(container);
					div.innerHTML = "";
					return ret
				}
			})
		}
	})();
	jQuery.swap = function(elem, options, callback, args) {
		var ret, name, old = {};
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name]
		}
		ret = callback.apply(elem, args || []);
		for (name in options) {
			elem.style[name] = old[name]
		}
		return ret
	};
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
		cssShow = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		cssNormalTransform = {
			letterSpacing: 0,
			fontWeight: 400
		},
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];

	function vendorPropName(style, name) {
		if (name in style) {
			return name
		}
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in style) {
				return name
			}
		}
		return origName
	}
	function setPositiveNumber(elem, value, subtract) {
		var matches = rnumsplit.exec(value);
		return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
	}
	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
			val = 0;
		for (; i < 4; i += 2) {
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles)
			}
			if (isBorderBox) {
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
				}
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
				}
			} else {
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
				}
			}
		}
		return val
	}
	function getWidthOrHeight(elem, name, extra) {
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
		if (val <= 0 || val == null) {
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name]
			}
			if (rnumnonpx.test(val)) {
				return val
			}
			valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
			val = parseFloat(val) || 0
		}
		return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px"
	}
	function showHide(elements, show) {
		var display, elem, hidden, values = [],
			index = 0,
			length = elements.length;
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue
			}
			values[index] = data_priv.get(elem, "olddisplay");
			display = elem.style.display;
			if (show) {
				if (!values[index] && display === "none") {
					elem.style.display = ""
				}
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = data_priv.access(elem, "olddisplay", defaultDisplay(elem.nodeName))
				}
			} else {
				if (!values[index]) {
					hidden = isHidden(elem);
					if (display && display !== "none" || !hidden) {
						data_priv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
					}
				}
			}
		}
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none"
			}
		}
		return elements
	}
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function(elem, computed) {
					if (computed) {
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret
					}
				}
			}
		},
		cssNumber: {
			columnCount: true,
			fillOpacity: true,
			fontWeight: true,
			lineHeight: true,
			opacity: true,
			order: true,
			orphans: true,
			widows: true,
			zIndex: true,
			zoom: true
		},
		cssProps: {
			"float": "cssFloat"
		},
		style: function(elem, name, value, extra) {
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return
			}
			var ret, type, hooks, origName = jQuery.camelCase(name),
				style = elem.style;
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (value !== undefined) {
				type = typeof value;
				if (type === "string" && (ret = rrelNum.exec(value))) {
					value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
					type = "number"
				}
				if (value == null || value !== value) {
					return
				}
				if (type === "number" && !jQuery.cssNumber[origName]) {
					value += "px"
				}
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit"
				}
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
					style[name] = "";
					style[name] = value
				}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
					return ret
				}
				return style[name]
			}
		},
		css: function(elem, name, extra, styles) {
			var val, num, hooks, origName = jQuery.camelCase(name);
			name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra)
			}
			if (val === undefined) {
				val = curCSS(elem, name, styles)
			}
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name]
			}
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || jQuery.isNumeric(num) ? num || 0 : val
			}
			return val
		}
	});
	jQuery.each(["height", "width"], function(i, name) {
		jQuery.cssHooks[name] = {
			get: function(elem, computed, extra) {
				if (computed) {
					return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
						return getWidthOrHeight(elem, name, extra)
					}) : getWidthOrHeight(elem, name, extra)
				}
			},
			set: function(elem, value, extra) {
				var styles = extra && getStyles(elem);
				return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0)
			}
		}
	});
	jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
		if (computed) {
			return jQuery.swap(elem, {
				display: "inline-block"
			}, curCSS, [elem, "marginRight"])
		}
	});
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function(value) {
				var i = 0,
					expanded = {},
					parts = typeof value === "string" ? value.split(" ") : [value];
				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
				}
				return expanded
			}
		};
		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
		}
	});
	jQuery.fn.extend({
		css: function(name, value) {
			return access(this, function(elem, name, value) {
				var styles, len, map = {},
					i = 0;
				if (jQuery.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;
					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles)
					}
					return map
				}
				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
			}, name, value, arguments.length > 1)
		},
		show: function() {
			return showHide(this, true)
		},
		hide: function() {
			return showHide(this)
		},
		toggle: function(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide()
			}
			return this.each(function() {
				if (isHidden(this)) {
					jQuery(this).show()
				} else {
					jQuery(this).hide()
				}
			})
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing)
	}
	jQuery.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
		},
		cur: function() {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
		},
		run: function(percent) {
			var eased, hooks = Tween.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
			} else {
				this.pos = eased = percent
			}
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this)
			}
			if (hooks && hooks.set) {
				hooks.set(this)
			} else {
				Tween.propHooks._default.set(this)
			}
			return this
		}
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function(tween) {
				var result;
				if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
					return tween.elem[tween.prop]
				}
				result = jQuery.css(tween.elem, tween.prop, "");
				return !result || result === "auto" ? 0 : result
			},
			set: function(tween) {
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween)
				} else {
					if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
						jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
					} else {
						tween.elem[tween.prop] = tween.now
					}
				}
			}
		}
	};
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now
			}
		}
	};
	jQuery.easing = {
		linear: function(p) {
			return p
		},
		swing: function(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2
		}
	};
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.step = {};
	var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [function(prop, value) {
				var tween = this.createTween(prop, value),
					target = tween.cur(),
					parts = rfxnum.exec(value),
					unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
					start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
					scale = 1,
					maxIterations = 20;
				if (start && start[3] !== unit) {
					unit = unit || start[3];
					parts = parts || [];
					start = +target || 1;
					do {
						scale = scale || ".5";
						start = start / scale;
						jQuery.style(tween.elem, prop, start + unit)
					} while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
				}
				if (parts) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
				}
				return tween
			}]
		};

	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined
		});
		return (fxNow = jQuery.now())
	}
	function genFx(type, includeWidth) {
		var which, i = 0,
			attrs = {
				height: type
			};
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type
		}
		if (includeWidth) {
			attrs.opacity = attrs.width = type
		}
		return attrs
	}
	function createTween(value, prop, animation) {
		var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
			index = 0,
			length = collection.length;
		for (; index < length; index++) {
			if ((tween = collection[index].call(animation, prop, value))) {
				return tween
			}
		}
	}
	function defaultPrefilter(elem, props, opts) {
		var prop, value, toggle, tween, hooks, oldfire, display, anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden(elem),
			dataShow = data_priv.get(elem, "fxshow");
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if (!hooks.unqueued) {
						oldfire()
					}
				}
			}
			hooks.unqueued++;
			anim.always(function() {
				anim.always(function() {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire()
					}
				})
			})
		}
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			display = jQuery.css(elem, "display");
			if (display === "none") {
				display = defaultDisplay(elem.nodeName)
			}
			if (display === "inline" && jQuery.css(elem, "float") === "none") {
				style.display = "inline-block"
			}
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2]
			})
		}
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true
					} else {
						continue
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
			}
		}
		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden
				}
			} else {
				dataShow = data_priv.access(elem, "fxshow", {})
			}
			if (toggle) {
				dataShow.hidden = !hidden
			}
			if (hidden) {
				jQuery(elem).show()
			} else {
				anim.done(function() {
					jQuery(elem).hide()
				})
			}
			anim.done(function() {
				var prop;
				data_priv.remove(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop])
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0
					}
				}
			}
		}
	}
	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0]
			}
			if (index !== name) {
				props[name] = value;
				delete props[index]
			}
			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing
					}
				}
			} else {
				specialEasing[name] = easing
			}
		}
	}
	function Animation(elem, properties, options) {
		var result, stopped, index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always(function() {
				delete tick.elem
			}),
			tick = function() {
				if (stopped) {
					return false
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) {
					animation.tweens[index].run(percent)
				}
				deferred.notifyWith(elem, [animation, percent, remaining]);
				if (percent < 1 && length) {
					return remaining
				} else {
					deferred.resolveWith(elem, [animation]);
					return false
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {
					specialEasing: {}
				}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function(prop, end) {
					var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
					animation.tweens.push(tween);
					return tween
				},
				stop: function(gotoEnd) {
					var index = 0,
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1)
					}
					if (gotoEnd) {
						deferred.resolveWith(elem, [animation, gotoEnd])
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd])
					}
					return this
				}
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = animationPrefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				return result
			}
		}
		jQuery.map(props, createTween, animation);
		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation)
		}
		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));
		return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
	}
	jQuery.Animation = jQuery.extend(Animation, {
		tweener: function(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"]
			} else {
				props = props.split(" ")
			}
			var prop, index = 0,
				length = props.length;
			for (; index < length; index++) {
				prop = props[index];
				tweeners[prop] = tweeners[prop] || [];
				tweeners[prop].unshift(callback)
			}
		},
		prefilter: function(callback, prepend) {
			if (prepend) {
				animationPrefilters.unshift(callback)
			} else {
				animationPrefilters.push(callback)
			}
		}
	});
	jQuery.speed = function(speed, easing, fn) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx"
		}
		opt.old = opt.complete;
		opt.complete = function() {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this)
			}
			if (opt.queue) {
				jQuery.dequeue(this, opt.queue)
			}
		};
		return opt
	};
	jQuery.fn.extend({
		fadeTo: function(speed, to, easing, callback) {
			return this.filter(isHidden).css("opacity", 0).show().end().animate({
				opacity: to
			}, speed, easing, callback)
		},
		animate: function(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function() {
					var anim = Animation(this, jQuery.extend({}, prop), optall);
					if (empty || data_priv.get(this, "finish")) {
						anim.stop(true)
					}
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
		},
		stop: function(type, clearQueue, gotoEnd) {
			var stopQueue = function(hooks) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop(gotoEnd)
				};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", [])
			}
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get(this);
				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index])
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index])
						}
					}
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1)
					}
				}
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type)
				}
			})
		},
		finish: function(type) {
			if (type !== false) {
				type = type || "fx"
			}
			return this.each(function() {
				var index, data = data_priv.get(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
				data.finish = true;
				jQuery.queue(this, type, []);
				if (hooks && hooks.stop) {
					hooks.stop.call(this, true)
				}
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1)
					}
				}
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this)
					}
				}
				delete data.finish
			})
		}
	});
	jQuery.each(["toggle", "show", "hide"], function(i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function(speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
		}
	});
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(name, props) {
		jQuery.fn[name] = function(speed, easing, callback) {
			return this.animate(props, speed, easing, callback)
		}
	});
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer, i = 0,
			timers = jQuery.timers;
		fxNow = jQuery.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1)
			}
		}
		if (!timers.length) {
			jQuery.fx.stop()
		}
		fxNow = undefined
	};
	jQuery.fx.timer = function(timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start()
		} else {
			jQuery.timers.pop()
		}
	};
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if (!timerId) {
			timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
		}
	};
	jQuery.fx.stop = function() {
		clearInterval(timerId);
		timerId = null
	};
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	jQuery.fn.delay = function(time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";
		return this.queue(type, function(next, hooks) {
			var timeout = setTimeout(next, time);
			hooks.stop = function() {
				clearTimeout(timeout)
			}
		})
	};
	(function() {
		var input = document.createElement("input"),
			select = document.createElement("select"),
			opt = select.appendChild(document.createElement("option"));
		input.type = "checkbox";
		support.checkOn = input.value !== "";
		support.optSelected = opt.selected;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t"
	})();
	var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
	jQuery.fn.extend({
		attr: function(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1)
		},
		removeAttr: function(name) {
			return this.each(function() {
				jQuery.removeAttr(this, name)
			})
		}
	});
	jQuery.extend({
		attr: function(elem, name, value) {
			var hooks, ret, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return
			}
			if (typeof elem.getAttribute === strundefined) {
				return jQuery.prop(elem, name, value)
			}
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
			}
			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name)
				} else {
					if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
						return ret
					} else {
						elem.setAttribute(name, value + "");
						return value
					}
				}
			} else {
				if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
					return ret
				} else {
					ret = jQuery.find.attr(elem, name);
					return ret == null ? undefined : ret
				}
			}
		},
		removeAttr: function(elem, value) {
			var name, propName, i = 0,
				attrNames = value && value.match(rnotwhite);
			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					propName = jQuery.propFix[name] || name;
					if (jQuery.expr.match.bool.test(name)) {
						elem[propName] = false
					}
					elem.removeAttribute(name)
				}
			}
		},
		attrHooks: {
			type: {
				set: function(elem, value) {
					if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val
						}
						return value
					}
				}
			}
		}
	});
	boolHook = {
		set: function(elem, value, name) {
			if (value === false) {
				jQuery.removeAttr(elem, name)
			} else {
				elem.setAttribute(name, name)
			}
			return name
		}
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;
		attrHandle[name] = function(elem, name, isXML) {
			var ret, handle;
			if (!isXML) {
				handle = attrHandle[name];
				attrHandle[name] = ret;
				ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
				attrHandle[name] = handle
			}
			return ret
		}
	});
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	jQuery.fn.extend({
		prop: function(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1)
		},
		removeProp: function(name) {
			return this.each(function() {
				delete this[jQuery.propFix[name] || name]
			})
		}
	});
	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(elem, name, value) {
			var ret, hooks, notxml, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return
			}
			notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
			if (notxml) {
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name]
			}
			if (value !== undefined) {
				return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value)
			} else {
				return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name]
			}
		},
		propHooks: {
			tabIndex: {
				get: function(elem) {
					return elem.hasAttribute("tabindex") || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1
				}
			}
		}
	});
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function(elem) {
				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex
				}
				return null
			}
		}
	}
	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		jQuery.propFix[this.toLowerCase()] = this
	});
	var rclass = /[\t\r\n\f]/g;
	jQuery.fn.extend({
		addClass: function(value) {
			var classes, elem, cur, clazz, j, finalValue, proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;
			if (jQuery.isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).addClass(value.call(this, j, this.className))
				})
			}
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " "
							}
						}
						finalValue = jQuery.trim(cur);
						if (elem.className !== finalValue) {
							elem.className = finalValue
						}
					}
				}
			}
			return this
		},
		removeClass: function(value) {
			var classes, elem, cur, clazz, j, finalValue, proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;
			if (jQuery.isFunction(value)) {
				return this.each(function(j) {
					jQuery(this).removeClass(value.call(this, j, this.className))
				})
			}
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							while (cur.indexOf(" " + clazz + " ") >= 0) {
								cur = cur.replace(" " + clazz + " ", " ")
							}
						}
						finalValue = value ? jQuery.trim(cur) : "";
						if (elem.className !== finalValue) {
							elem.className = finalValue
						}
					}
				}
			}
			return this
		},
		toggleClass: function(value, stateVal) {
			var type = typeof value;
			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value)
			}
			if (jQuery.isFunction(value)) {
				return this.each(function(i) {
					jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
				})
			}
			return this.each(function() {
				if (type === "string") {
					var className, i = 0,
						self = jQuery(this),
						classNames = value.match(rnotwhite) || [];
					while ((className = classNames[i++])) {
						if (self.hasClass(className)) {
							self.removeClass(className)
						} else {
							self.addClass(className)
						}
					}
				} else {
					if (type === strundefined || type === "boolean") {
						if (this.className) {
							data_priv.set(this, "__className__", this.className)
						}
						this.className = this.className || value === false ? "" : data_priv.get(this, "__className__") || ""
					}
				}
			})
		},
		hasClass: function(selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++) {
				if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
					return true
				}
			}
			return false
		}
	});
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function(value) {
			var hooks, ret, isFunction, elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret
					}
					ret = elem.value;
					return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
				}
				return
			}
			isFunction = jQuery.isFunction(value);
			return this.each(function(i) {
				var val;
				if (this.nodeType !== 1) {
					return
				}
				if (isFunction) {
					val = value.call(this, i, jQuery(this).val())
				} else {
					val = value
				}
				if (val == null) {
					val = ""
				} else {
					if (typeof val === "number") {
						val += ""
					} else {
						if (jQuery.isArray(val)) {
							val = jQuery.map(val, function(value) {
								return value == null ? "" : value + ""
							})
						}
					}
				}
				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val
				}
			})
		}
	});
	jQuery.extend({
		valHooks: {
			select: {
				get: function(elem) {
					var value, option, options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ? max : one ? index : 0;
					for (; i < max; i++) {
						option = options[i];
						if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
							value = jQuery(option).val();
							if (one) {
								return value
							}
							values.push(value)
						}
					}
					return values
				},
				set: function(elem, value) {
					var optionSet, option, options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;
					while (i--) {
						option = options[i];
						if ((option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0)) {
							optionSet = true
						}
					}
					if (!optionSet) {
						elem.selectedIndex = -1
					}
					return values
				}
			}
		}
	});
	jQuery.each(["radio", "checkbox"], function() {
		jQuery.valHooks[this] = {
			set: function(elem, value) {
				if (jQuery.isArray(value)) {
					return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function(elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value
			}
		}
	});
	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
		jQuery.fn[name] = function(data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
		}
	});
	jQuery.fn.extend({
		hover: function(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
		},
		bind: function(types, data, fn) {
			return this.on(types, null, data, fn)
		},
		unbind: function(types, fn) {
			return this.off(types, null, fn)
		},
		delegate: function(selector, types, data, fn) {
			return this.on(types, selector, data, fn)
		},
		undelegate: function(selector, types, fn) {
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
		}
	});
	var nonce = jQuery.now();
	var rquery = (/\?/);
	jQuery.parseJSON = function(data) {
		return JSON.parse(data + "")
	};
	jQuery.parseXML = function(data) {
		var xml, tmp;
		if (!data || typeof data !== "string") {
			return null
		}
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString(data, "text/xml")
		} catch (e) {
			xml = undefined
		}
		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data)
		}
		return xml
	};
	var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

	function addToPrefiltersOrTransports(structure) {
		return function(dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*"
			}
			var dataType, i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
			if (jQuery.isFunction(func)) {
				while ((dataType = dataTypes[i++])) {
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func)
					} else {
						(structure[dataType] = structure[dataType] || []).push(func)
					}
				}
			}
		}
	}
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
		var inspected = {},
			seekingTransport = (structure === transports);

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false
				} else {
					if (seekingTransport) {
						return !(selected = dataTypeOrTransport)
					}
				}
			});
			return selected
		}
		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
	}
	function ajaxExtend(target, src) {
		var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep)
		}
		return target
	}
	function ajaxHandleResponses(s, jqXHR, responses) {
		var ct, type, finalDataType, firstDataType, contents = s.contents,
			dataTypes = s.dataTypes;
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
			}
		}
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break
				}
			}
		}
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0]
		} else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break
				}
				if (!firstDataType) {
					firstDataType = type
				}
			}
			finalDataType = finalDataType || firstDataType
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType)
			}
			return responses[finalDataType]
		}
	}
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2, current, conv, tmp, prev, converters = {},
			dataTypes = s.dataTypes.slice();
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv]
			}
		}
		current = dataTypes.shift();
		while (current) {
			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response
			}
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType)
			}
			prev = current;
			current = dataTypes.shift();
			if (current) {
				if (current === "*") {
					current = prev
				} else {
					if (prev !== "*" && prev !== current) {
						conv = converters[prev + " " + current] || converters["* " + current];
						if (!conv) {
							for (conv2 in converters) {
								tmp = conv2.split(" ");
								if (tmp[1] === current) {
									conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
									if (conv) {
										if (conv === true) {
											conv = converters[conv2]
										} else {
											if (converters[conv2] !== true) {
												current = tmp[0];
												dataTypes.unshift(tmp[1])
											}
										}
										break
									}
								}
							}
						}
						if (conv !== true) {
							if (conv && s["throws"]) {
								response = conv(response)
							} else {
								try {
									response = conv(response)
								} catch (e) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									}
								}
							}
						}
					}
				}
			}
		}
		return {
			state: "success",
			data: response
		}
	}
	jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": true,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML
			},
			flatOptions: {
				url: true,
				context: true
			}
		},
		ajaxSetup: function(target, settings) {
			return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function(url, options) {
			if (typeof url === "object") {
				options = url;
				url = undefined
			}
			options = options || {};
			var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options),
				callbackContext = s.context || s,
				globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				statusCode = s.statusCode || {},
				requestHeaders = {},
				requestHeadersNames = {},
				state = 0,
				strAbort = "canceled",
				jqXHR = {
					readyState: 0,
					getResponseHeader: function(key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase()] = match[2]
								}
							}
							match = responseHeaders[key.toLowerCase()]
						}
						return match == null ? null : match
					},
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null
					},
					setRequestHeader: function(name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
							requestHeaders[name] = value
						}
						return this
					},
					overrideMimeType: function(type) {
						if (!state) {
							s.mimeType = type
						}
						return this
					},
					statusCode: function(map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {
									statusCode[code] = [statusCode[code], map[code]]
								}
							} else {
								jqXHR.always(map[jqXHR.status])
							}
						}
						return this
					},
					abort: function(statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText)
						}
						done(0, finalText);
						return this
					}
				};
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
			s.type = options.method || options.type || s.method || s.type;
			s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
			if (s.crossDomain == null) {
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
			}
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional)
			}
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			if (state === 2) {
				return jqXHR
			}
			fireGlobals = s.global;
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart")
			}
			s.type = s.type.toUpperCase();
			s.hasContent = !rnoContent.test(s.type);
			cacheURL = s.url;
			if (!s.hasContent) {
				if (s.data) {
					cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
					delete s.data
				}
				if (s.cache === false) {
					s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++
				}
			}
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
				}
			}
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType)
			}
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i])
			}
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
				return jqXHR.abort()
			}
			strAbort = "abort";
			for (i in {
				success: 1,
				error: 1,
				complete: 1
			}) {
				jqXHR[i](s[i])
			}
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			if (!transport) {
				done(-1, "No Transport")
			} else {
				jqXHR.readyState = 1;
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s])
				}
				if (s.async && s.timeout > 0) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout")
					}, s.timeout)
				}
				try {
					state = 1;
					transport.send(requestHeaders, done)
				} catch (e) {
					if (state < 2) {
						done(-1, e)
					} else {
						throw e
					}
				}
			}
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess, success, error, response, modified, statusText = nativeStatusText;
				if (state === 2) {
					return
				}
				state = 2;
				if (timeoutTimer) {
					clearTimeout(timeoutTimer)
				}
				transport = undefined;
				responseHeadersString = headers || "";
				jqXHR.readyState = status > 0 ? 4 : 0;
				isSuccess = status >= 200 && status < 300 || status === 304;
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses)
				}
				response = ajaxConvert(s, response, jqXHR, isSuccess);
				if (isSuccess) {
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified
						}
					}
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent"
					} else {
						if (status === 304) {
							statusText = "notmodified"
						} else {
							statusText = response.state;
							success = response.data;
							error = response.error;
							isSuccess = !error
						}
					}
				} else {
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0
						}
					}
				}
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
				}
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
				}
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					if (!(--jQuery.active)) {
						jQuery.event.trigger("ajaxStop")
					}
				}
			}
			return jqXHR
		},
		getJSON: function(url, data, callback) {
			return jQuery.get(url, data, callback, "json")
		},
		getScript: function(url, callback) {
			return jQuery.get(url, undefined, callback, "script")
		}
	});
	jQuery.each(["get", "post"], function(i, method) {
		jQuery[method] = function(url, data, callback, type) {
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined
			}
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			})
		}
	});
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
		jQuery.fn[type] = function(fn) {
			return this.on(type, fn)
		}
	});
	jQuery._evalUrl = function(url) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		})
	};
	jQuery.fn.extend({
		wrapAll: function(html) {
			var wrap;
			if (jQuery.isFunction(html)) {
				return this.each(function(i) {
					jQuery(this).wrapAll(html.call(this, i))
				})
			}
			if (this[0]) {
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) {
					wrap.insertBefore(this[0])
				}
				wrap.map(function() {
					var elem = this;
					while (elem.firstElementChild) {
						elem = elem.firstElementChild
					}
					return elem
				}).append(this)
			}
			return this
		},
		wrapInner: function(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function(i) {
					jQuery(this).wrapInner(html.call(this, i))
				})
			}
			return this.each(function() {
				var self = jQuery(this),
					contents = self.contents();
				if (contents.length) {
					contents.wrapAll(html)
				} else {
					self.append(html)
				}
			})
		},
		wrap: function(html) {
			var isFunction = jQuery.isFunction(html);
			return this.each(function(i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				if (!jQuery.nodeName(this, "body")) {
					jQuery(this).replaceWith(this.childNodes)
				}
			}).end()
		}
	});
	jQuery.expr.filters.hidden = function(elem) {
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0
	};
	jQuery.expr.filters.visible = function(elem) {
		return !jQuery.expr.filters.hidden(elem)
	};
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (jQuery.isArray(obj)) {
			jQuery.each(obj, function(i, v) {
				if (traditional || rbracket.test(prefix)) {
					add(prefix, v)
				} else {
					buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
				}
			})
		} else {
			if (!traditional && jQuery.type(obj) === "object") {
				for (name in obj) {
					buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
				}
			} else {
				add(prefix, obj)
			}
		}
	}
	jQuery.param = function(a, traditional) {
		var prefix, s = [],
			add = function(key, value) {
				value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
			};
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
		}
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			jQuery.each(a, function() {
				add(this.name, this.value)
			})
		} else {
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add)
			}
		}
		return s.join("&").replace(r20, "+")
	};
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this
			}).filter(function() {
				var type = this.type;
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
			}).map(function(i, elem) {
				var val = jQuery(this).val();
				return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
					return {
						name: elem.name,
						value: val.replace(rCRLF, "\r\n")
					}
				}) : {
					name: elem.name,
					value: val.replace(rCRLF, "\r\n")
				}
			}).get()
		}
	});
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest()
		} catch (e) {}
	};
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			0: 200,
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	if (window.ActiveXObject) {
		jQuery(window).on("unload", function() {
			for (var key in xhrCallbacks) {
				xhrCallbacks[key]()
			}
		})
	}
	support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
	support.ajax = xhrSupported = !! xhrSupported;
	jQuery.ajaxTransport(function(options) {
		var callback;
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function(headers, complete) {
					var i, xhr = options.xhr(),
						id = ++xhrId;
					xhr.open(options.type, options.url, options.async, options.username, options.password);
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i]
						}
					}
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType)
					}
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest"
					}
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i])
					}
					callback = function(type) {
						return function() {
							if (callback) {
								delete xhrCallbacks[id];
								callback = xhr.onload = xhr.onerror = null;
								if (type === "abort") {
									xhr.abort()
								} else {
									if (type === "error") {
										complete(xhr.status, xhr.statusText)
									} else {
										complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined, xhr.getAllResponseHeaders())
									}
								}
							}
						}
					};
					xhr.onload = callback();
					xhr.onerror = callback("error");
					callback = xhrCallbacks[id] = callback("abort");
					xhr.send(options.hasContent && options.data || null)
				},
				abort: function() {
					if (callback) {
						callback()
					}
				}
			}
		}
	});
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(text) {
				jQuery.globalEval(text);
				return text
			}
		}
	});
	jQuery.ajaxPrefilter("script", function(s) {
		if (s.cache === undefined) {
			s.cache = false
		}
		if (s.crossDomain) {
			s.type = "GET"
		}
	});
	jQuery.ajaxTransport("script", function(s) {
		if (s.crossDomain) {
			var script, callback;
			return {
				send: function(_, complete) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", callback = function(evt) {
						script.remove();
						callback = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type)
						}
					});
					document.head.appendChild(script[0])
				},
				abort: function() {
					if (callback) {
						callback()
					}
				}
			}
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
			this[callback] = true;
			return callback
		}
	});
	jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
		var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
			} else {
				if (s.jsonp !== false) {
					s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
				}
			}
			s.converters["script json"] = function() {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called")
				}
				return responseContainer[0]
			};
			s.dataTypes[0] = "json";
			overwritten = window[callbackName];
			window[callbackName] = function() {
				responseContainer = arguments
			};
			jqXHR.always(function() {
				window[callbackName] = overwritten;
				if (s[callbackName]) {
					s.jsonpCallback = originalSettings.jsonpCallback;
					oldCallbacks.push(callbackName)
				}
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0])
				}
				responseContainer = overwritten = undefined
			});
			return "script"
		}
	});
	jQuery.parseHTML = function(data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false
		}
		context = context || document;
		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];
		if (parsed) {
			return [context.createElement(parsed[1])]
		}
		parsed = jQuery.buildFragment([data], context, scripts);
		if (scripts && scripts.length) {
			jQuery(scripts).remove()
		}
		return jQuery.merge([], parsed.childNodes)
	};
	var _load = jQuery.fn.load;
	jQuery.fn.load = function(url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments)
		}
		var selector, type, response, self = this,
			off = url.indexOf(" ");
		if (off >= 0) {
			selector = url.slice(off);
			url = url.slice(0, off)
		}
		if (jQuery.isFunction(params)) {
			callback = params;
			params = undefined
		} else {
			if (params && typeof params === "object") {
				type = "POST"
			}
		}
		if (self.length > 0) {
			jQuery.ajax({
				url: url,
				type: type,
				dataType: "html",
				data: params
			}).done(function(responseText) {
				response = arguments;
				self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
			}).complete(callback &&
			function(jqXHR, status) {
				self.each(callback, response || [jqXHR.responseText, status, jqXHR])
			})
		}
		return this
	};
	jQuery.expr.filters.animated = function(elem) {
		return jQuery.grep(jQuery.timers, function(fn) {
			return elem === fn.elem
		}).length
	};
	var docElem = window.document.documentElement;

	function getWindow(elem) {
		return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView
	}
	jQuery.offset = {
		setOffset: function(elem, options, i) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};
			if (position === "static") {
				elem.style.position = "relative"
			}
			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0
			}
			if (jQuery.isFunction(options)) {
				options = options.call(elem, i, curOffset)
			}
			if (options.top != null) {
				props.top = (options.top - curOffset.top) + curTop
			}
			if (options.left != null) {
				props.left = (options.left - curOffset.left) + curLeft
			}
			if ("using" in options) {
				options.using.call(elem, props)
			} else {
				curElem.css(props)
			}
		}
	};
	jQuery.fn.extend({
		offset: function(options) {
			if (arguments.length) {
				return options === undefined ? this : this.each(function(i) {
					jQuery.offset.setOffset(this, options, i)
				})
			}
			var docElem, win, elem = this[0],
				box = {
					top: 0,
					left: 0
				},
				doc = elem && elem.ownerDocument;
			if (!doc) {
				return
			}
			docElem = doc.documentElement;
			if (!jQuery.contains(docElem, elem)) {
				return box
			}
			if (typeof elem.getBoundingClientRect !== strundefined) {
				box = elem.getBoundingClientRect()
			}
			win = getWindow(doc);
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			}
		},
		position: function() {
			if (!this[0]) {
				return
			}
			var offsetParent, offset, elem = this[0],
				parentOffset = {
					top: 0,
					left: 0
				};
			if (jQuery.css(elem, "position") === "fixed") {
				offset = elem.getBoundingClientRect()
			} else {
				offsetParent = this.offsetParent();
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset()
				}
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
			}
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			}
		},
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
				while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
					offsetParent = offsetParent.offsetParent
				}
				return offsetParent || docElem
			})
		}
	});
	jQuery.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(method, prop) {
		var top = "pageYOffset" === prop;
		jQuery.fn[method] = function(val) {
			return access(this, function(elem, method, val) {
				var win = getWindow(elem);
				if (val === undefined) {
					return win ? win[prop] : elem[method]
				}
				if (win) {
					win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset)
				} else {
					elem[method] = val
				}
			}, method, val, arguments.length, null)
		}
	});
	jQuery.each(["top", "left"], function(i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
			}
		})
	});
	jQuery.each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		jQuery.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			jQuery.fn[funcName] = function(margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
				return access(this, function(elem, type, value) {
					var doc;
					if (jQuery.isWindow(elem)) {
						return elem.document.documentElement["client" + name]
					}
					if (elem.nodeType === 9) {
						doc = elem.documentElement;
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
					}
					return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
				}, type, chainable ? margin : undefined, chainable, null)
			}
		})
	});
	jQuery.fn.size = function() {
		return this.length
	};
	jQuery.fn.andSelf = jQuery.fn.addBack;
	if (typeof define === "function" && define.amd) {
		define("jquery", [], function() {
			return jQuery
		})
	}
	var _jQuery = window.jQuery,
		_$ = window.$;
	jQuery.noConflict = function(deep) {
		if (window.$ === jQuery) {
			window.$ = _$
		}
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery
		}
		return jQuery
	};
	if (typeof noGlobal === strundefined) {
		window.jQuery = window.$ = jQuery
	}
	return jQuery
}));
/*! jQuery UI - v1.10.4 - 2014-04-16
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.resizable.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.menu.js, jquery.ui.tabs.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(b, f) {
	var a = 0,
		e = /^ui-id-\d+$/;
	b.ui = b.ui || {};
	b.extend(b.ui, {
		version: "1.10.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	});
	b.fn.extend({
		focus: (function(g) {
			return function(h, i) {
				return typeof h === "number" ? this.each(function() {
					var j = this;
					setTimeout(function() {
						b(j).focus();
						if (i) {
							i.call(j)
						}
					}, h)
				}) : g.apply(this, arguments)
			}
		})(b.fn.focus),
		scrollParent: function() {
			var g;
			if ((b.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
				g = this.parents().filter(function() {
					return (/(relative|absolute|fixed)/).test(b.css(this, "position")) && (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"))
				}).eq(0)
			} else {
				g = this.parents().filter(function() {
					return (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"))
				}).eq(0)
			}
			return (/fixed/).test(this.css("position")) || !g.length ? b(document) : g
		},
		zIndex: function(j) {
			if (j !== f) {
				return this.css("zIndex", j)
			}
			if (this.length) {
				var h = b(this[0]),
					g, i;
				while (h.length && h[0] !== document) {
					g = h.css("position");
					if (g === "absolute" || g === "relative" || g === "fixed") {
						i = parseInt(h.css("zIndex"), 10);
						if (!isNaN(i) && i !== 0) {
							return i
						}
					}
					h = h.parent()
				}
			}
			return 0
		},
		uniqueId: function() {
			return this.each(function() {
				if (!this.id) {
					this.id = "ui-id-" + (++a)
				}
			})
		},
		removeUniqueId: function() {
			return this.each(function() {
				if (e.test(this.id)) {
					b(this).removeAttr("id")
				}
			})
		}
	});

	function d(i, g) {
		var k, j, h, l = i.nodeName.toLowerCase();
		if ("area" === l) {
			k = i.parentNode;
			j = k.name;
			if (!i.href || !j || k.nodeName.toLowerCase() !== "map") {
				return false
			}
			h = b("img[usemap=#" + j + "]")[0];
			return !!h && c(h)
		}
		return (/input|select|textarea|button|object/.test(l) ? !i.disabled : "a" === l ? i.href || g : g) && c(i)
	}
	function c(g) {
		return b.expr.filters.visible(g) && !b(g).parents().addBack().filter(function() {
			return b.css(this, "visibility") === "hidden"
		}).length
	}
	b.extend(b.expr[":"], {
		data: b.expr.createPseudo ? b.expr.createPseudo(function(g) {
			return function(h) {
				return !!b.data(h, g)
			}
		}) : function(j, h, g) {
			return !!b.data(j, g[3])
		},
		focusable: function(g) {
			return d(g, !isNaN(b.attr(g, "tabindex")))
		},
		tabbable: function(i) {
			var g = b.attr(i, "tabindex"),
				h = isNaN(g);
			return (h || g >= 0) && d(i, !h)
		}
	});
	if (!b("<a>").outerWidth(1).jquery) {
		b.each(["Width", "Height"], function(j, g) {
			var h = g === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
				k = g.toLowerCase(),
				m = {
					innerWidth: b.fn.innerWidth,
					innerHeight: b.fn.innerHeight,
					outerWidth: b.fn.outerWidth,
					outerHeight: b.fn.outerHeight
				};

			function l(o, n, i, p) {
				b.each(h, function() {
					n -= parseFloat(b.css(o, "padding" + this)) || 0;
					if (i) {
						n -= parseFloat(b.css(o, "border" + this + "Width")) || 0
					}
					if (p) {
						n -= parseFloat(b.css(o, "margin" + this)) || 0
					}
				});
				return n
			}
			b.fn["inner" + g] = function(i) {
				if (i === f) {
					return m["inner" + g].call(this)
				}
				return this.each(function() {
					b(this).css(k, l(this, i) + "px")
				})
			};
			b.fn["outer" + g] = function(i, n) {
				if (typeof i !== "number") {
					return m["outer" + g].call(this, i)
				}
				return this.each(function() {
					b(this).css(k, l(this, i, true, n) + "px")
				})
			}
		})
	}
	if (!b.fn.addBack) {
		b.fn.addBack = function(g) {
			return this.add(g == null ? this.prevObject : this.prevObject.filter(g))
		}
	}
	if (b("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
		b.fn.removeData = (function(g) {
			return function(h) {
				if (arguments.length) {
					return g.call(this, b.camelCase(h))
				} else {
					return g.call(this)
				}
			}
		})(b.fn.removeData)
	}
	b.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
	b.support.selectstart = "onselectstart" in document.createElement("div");
	b.fn.extend({
		disableSelection: function() {
			return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(g) {
				g.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	});
	b.extend(b.ui, {
		plugin: {
			add: function(h, j, l) {
				var g, k = b.ui[h].prototype;
				for (g in l) {
					k.plugins[g] = k.plugins[g] || [];
					k.plugins[g].push([j, l[g]])
				}
			},
			call: function(g, j, h) {
				var k, l = g.plugins[j];
				if (!l || !g.element[0].parentNode || g.element[0].parentNode.nodeType === 11) {
					return
				}
				for (k = 0; k < l.length; k++) {
					if (g.options[l[k][0]]) {
						l[k][1].apply(g.element, h)
					}
				}
			}
		},
		hasScroll: function(j, h) {
			if (b(j).css("overflow") === "hidden") {
				return false
			}
			var g = (h && h === "left") ? "scrollLeft" : "scrollTop",
				i = false;
			if (j[g] > 0) {
				return true
			}
			j[g] = 1;
			i = (j[g] > 0);
			j[g] = 0;
			return i
		}
	})
})(jQuery);
(function(b, e) {
	var a = 0,
		d = Array.prototype.slice,
		c = b.cleanData;
	b.cleanData = function(f) {
		for (var g = 0, h;
		(h = f[g]) != null; g++) {
			try {
				b(h).triggerHandler("remove")
			} catch (j) {}
		}
		c(f)
	};
	b.widget = function(f, g, n) {
		var k, l, i, m, h = {},
			j = f.split(".")[0];
		f = f.split(".")[1];
		k = j + "-" + f;
		if (!n) {
			n = g;
			g = b.Widget
		}
		b.expr[":"][k.toLowerCase()] = function(o) {
			return !!b.data(o, k)
		};
		b[j] = b[j] || {};
		l = b[j][f];
		i = b[j][f] = function(o, p) {
			if (!this._createWidget) {
				return new i(o, p)
			}
			if (arguments.length) {
				this._createWidget(o, p)
			}
		};
		b.extend(i, l, {
			version: n.version,
			_proto: b.extend({}, n),
			_childConstructors: []
		});
		m = new g();
		m.options = b.widget.extend({}, m.options);
		b.each(n, function(p, o) {
			if (!b.isFunction(o)) {
				h[p] = o;
				return
			}
			h[p] = (function() {
				var q = function() {
						return g.prototype[p].apply(this, arguments)
					},
					r = function(s) {
						return g.prototype[p].apply(this, s)
					};
				return function() {
					var u = this._super,
						s = this._superApply,
						t;
					this._super = q;
					this._superApply = r;
					t = o.apply(this, arguments);
					this._super = u;
					this._superApply = s;
					return t
				}
			})()
		});
		i.prototype = b.widget.extend(m, {
			widgetEventPrefix: l ? (m.widgetEventPrefix || f) : f
		}, h, {
			constructor: i,
			namespace: j,
			widgetName: f,
			widgetFullName: k
		});
		if (l) {
			b.each(l._childConstructors, function(p, q) {
				var o = q.prototype;
				b.widget(o.namespace + "." + o.widgetName, i, q._proto)
			});
			delete l._childConstructors
		} else {
			g._childConstructors.push(i)
		}
		b.widget.bridge(f, i)
	};
	b.widget.extend = function(k) {
		var g = d.call(arguments, 1),
			j = 0,
			f = g.length,
			h, i;
		for (; j < f; j++) {
			for (h in g[j]) {
				i = g[j][h];
				if (g[j].hasOwnProperty(h) && i !== e) {
					if (b.isPlainObject(i)) {
						k[h] = b.isPlainObject(k[h]) ? b.widget.extend({}, k[h], i) : b.widget.extend({}, i)
					} else {
						k[h] = i
					}
				}
			}
		}
		return k
	};
	b.widget.bridge = function(g, f) {
		var h = f.prototype.widgetFullName || g;
		b.fn[g] = function(k) {
			var i = typeof k === "string",
				j = d.call(arguments, 1),
				l = this;
			k = !i && j.length ? b.widget.extend.apply(null, [k].concat(j)) : k;
			if (i) {
				this.each(function() {
					var n, m = b.data(this, h);
					if (!m) {
						return b.error("cannot call methods on " + g + " prior to initialization; attempted to call method '" + k + "'")
					}
					if (!b.isFunction(m[k]) || k.charAt(0) === "_") {
						return b.error("no such method '" + k + "' for " + g + " widget instance")
					}
					n = m[k].apply(m, j);
					if (n !== m && n !== e) {
						l = n && n.jquery ? l.pushStack(n.get()) : n;
						return false
					}
				})
			} else {
				this.each(function() {
					var m = b.data(this, h);
					if (m) {
						m.option(k || {})._init()
					} else {
						b.data(this, h, new f(k, this))
					}
				})
			}
			return l
		}
	};
	b.Widget = function() {};
	b.Widget._childConstructors = [];
	b.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: false,
			create: null
		},
		_createWidget: function(f, g) {
			g = b(g || this.defaultElement || this)[0];
			this.element = b(g);
			this.uuid = a++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = b.widget.extend({}, this.options, this._getCreateOptions(), f);
			this.bindings = b();
			this.hoverable = b();
			this.focusable = b();
			if (g !== this) {
				b.data(g, this.widgetFullName, this);
				this._on(true, this.element, {
					remove: function(h) {
						if (h.target === g) {
							this.destroy()
						}
					}
				});
				this.document = b(g.style ? g.ownerDocument : g.document || g);
				this.window = b(this.document[0].defaultView || this.document[0].parentWindow)
			}
			this._create();
			this._trigger("create", null, this._getCreateEventData());
			this._init()
		},
		_getCreateOptions: b.noop,
		_getCreateEventData: b.noop,
		_create: b.noop,
		_init: b.noop,
		destroy: function() {
			this._destroy();
			this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(b.camelCase(this.widgetFullName));
			this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
			this.bindings.unbind(this.eventNamespace);
			this.hoverable.removeClass("ui-state-hover");
			this.focusable.removeClass("ui-state-focus")
		},
		_destroy: b.noop,
		widget: function() {
			return this.element
		},
		option: function(j, k) {
			var f = j,
				l, h, g;
			if (arguments.length === 0) {
				return b.widget.extend({}, this.options)
			}
			if (typeof j === "string") {
				f = {};
				l = j.split(".");
				j = l.shift();
				if (l.length) {
					h = f[j] = b.widget.extend({}, this.options[j]);
					for (g = 0; g < l.length - 1; g++) {
						h[l[g]] = h[l[g]] || {};
						h = h[l[g]]
					}
					j = l.pop();
					if (arguments.length === 1) {
						return h[j] === e ? null : h[j]
					}
					h[j] = k
				} else {
					if (arguments.length === 1) {
						return this.options[j] === e ? null : this.options[j]
					}
					f[j] = k
				}
			}
			this._setOptions(f);
			return this
		},
		_setOptions: function(f) {
			var g;
			for (g in f) {
				this._setOption(g, f[g])
			}
			return this
		},
		_setOption: function(f, g) {
			this.options[f] = g;
			if (f === "disabled") {
				this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! g).attr("aria-disabled", g);
				this.hoverable.removeClass("ui-state-hover");
				this.focusable.removeClass("ui-state-focus")
			}
			return this
		},
		enable: function() {
			return this._setOption("disabled", false)
		},
		disable: function() {
			return this._setOption("disabled", true)
		},
		_on: function(i, h, g) {
			var j, f = this;
			if (typeof i !== "boolean") {
				g = h;
				h = i;
				i = false
			}
			if (!g) {
				g = h;
				h = this.element;
				j = this.widget()
			} else {
				h = j = b(h);
				this.bindings = this.bindings.add(h)
			}
			b.each(g, function(p, o) {
				function m() {
					if (!i && (f.options.disabled === true || b(this).hasClass("ui-state-disabled"))) {
						return
					}
					return (typeof o === "string" ? f[o] : o).apply(f, arguments)
				}
				if (typeof o !== "string") {
					m.guid = o.guid = o.guid || m.guid || b.guid++
				}
				var n = p.match(/^(\w+)\s*(.*)$/),
					l = n[1] + f.eventNamespace,
					k = n[2];
				if (k) {
					j.delegate(k, l, m)
				} else {
					h.bind(l, m)
				}
			})
		},
		_off: function(g, f) {
			f = (f || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
			g.unbind(f).undelegate(f)
		},
		_delay: function(i, h) {
			function g() {
				return (typeof i === "string" ? f[i] : i).apply(f, arguments)
			}
			var f = this;
			return setTimeout(g, h || 0)
		},
		_hoverable: function(f) {
			this.hoverable = this.hoverable.add(f);
			this._on(f, {
				mouseenter: function(g) {
					b(g.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(g) {
					b(g.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(f) {
			this.focusable = this.focusable.add(f);
			this._on(f, {
				focusin: function(g) {
					b(g.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(g) {
					b(g.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(f, g, h) {
			var k, j, i = this.options[f];
			h = h || {};
			g = b.Event(g);
			g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
			g.target = this.element[0];
			j = g.originalEvent;
			if (j) {
				for (k in j) {
					if (!(k in g)) {
						g[k] = j[k]
					}
				}
			}
			this.element.trigger(g, h);
			return !(b.isFunction(i) && i.apply(this.element[0], [g].concat(h)) === false || g.isDefaultPrevented())
		}
	};
	b.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(g, f) {
		b.Widget.prototype["_" + g] = function(j, i, l) {
			if (typeof i === "string") {
				i = {
					effect: i
				}
			}
			var k, h = !i ? g : i === true || typeof i === "number" ? f : i.effect || f;
			i = i || {};
			if (typeof i === "number") {
				i = {
					duration: i
				}
			}
			k = !b.isEmptyObject(i);
			i.complete = l;
			if (i.delay) {
				j.delay(i.delay)
			}
			if (k && b.effects && b.effects.effect[h]) {
				j[g](i)
			} else {
				if (h !== g && j[h]) {
					j[h](i.duration, i.easing, l)
				} else {
					j.queue(function(m) {
						b(this)[g]();
						if (l) {
							l.call(j[0])
						}
						m()
					})
				}
			}
		}
	})
})(jQuery);
(function(b, c) {
	var a = false;
	b(document).mouseup(function() {
		a = false
	});
	b.widget("ui.mouse", {
		version: "1.10.4",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var d = this;
			this.element.bind("mousedown." + this.widgetName, function(e) {
				return d._mouseDown(e)
			}).bind("click." + this.widgetName, function(e) {
				if (true === b.data(e.target, d.widgetName + ".preventClickEvent")) {
					b.removeData(e.target, d.widgetName + ".preventClickEvent");
					e.stopImmediatePropagation();
					return false
				}
			});
			this.started = false
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName);
			if (this._mouseMoveDelegate) {
				b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
			}
		},
		_mouseDown: function(f) {
			if (a) {
				return
			}(this._mouseStarted && this._mouseUp(f));
			this._mouseDownEvent = f;
			var e = this,
				g = (f.which === 1),
				d = (typeof this.options.cancel === "string" && f.target.nodeName ? b(f.target).closest(this.options.cancel).length : false);
			if (!g || d || !this._mouseCapture(f)) {
				return true
			}
			this.mouseDelayMet = !this.options.delay;
			if (!this.mouseDelayMet) {
				this._mouseDelayTimer = setTimeout(function() {
					e.mouseDelayMet = true
				}, this.options.delay)
			}
			if (this._mouseDistanceMet(f) && this._mouseDelayMet(f)) {
				this._mouseStarted = (this._mouseStart(f) !== false);
				if (!this._mouseStarted) {
					f.preventDefault();
					return true
				}
			}
			if (true === b.data(f.target, this.widgetName + ".preventClickEvent")) {
				b.removeData(f.target, this.widgetName + ".preventClickEvent")
			}
			this._mouseMoveDelegate = function(h) {
				return e._mouseMove(h)
			};
			this._mouseUpDelegate = function(h) {
				return e._mouseUp(h)
			};
			b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
			f.preventDefault();
			a = true;
			return true
		},
		_mouseMove: function(d) {
			if (b.ui.ie && (!document.documentMode || document.documentMode < 9) && !d.button) {
				return this._mouseUp(d)
			}
			if (this._mouseStarted) {
				this._mouseDrag(d);
				return d.preventDefault()
			}
			if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
				this._mouseStarted = (this._mouseStart(this._mouseDownEvent, d) !== false);
				(this._mouseStarted ? this._mouseDrag(d) : this._mouseUp(d))
			}
			return !this._mouseStarted
		},
		_mouseUp: function(d) {
			b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			if (this._mouseStarted) {
				this._mouseStarted = false;
				if (d.target === this._mouseDownEvent.target) {
					b.data(d.target, this.widgetName + ".preventClickEvent", true)
				}
				this._mouseStop(d)
			}
			return false
		},
		_mouseDistanceMet: function(d) {
			return (Math.max(Math.abs(this._mouseDownEvent.pageX - d.pageX), Math.abs(this._mouseDownEvent.pageY - d.pageY)) >= this.options.distance)
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return true
		}
	})
})(jQuery);
(function(e, c) {
	e.ui = e.ui || {};
	var j, k = Math.max,
		o = Math.abs,
		m = Math.round,
		d = /left|center|right/,
		h = /top|center|bottom/,
		a = /[\+\-]\d+(\.[\d]+)?%?/,
		l = /^\w+/,
		b = /%$/,
		g = e.fn.position;

	function n(r, q, p) {
		return [parseFloat(r[0]) * (b.test(r[0]) ? q / 100 : 1), parseFloat(r[1]) * (b.test(r[1]) ? p / 100 : 1)]
	}
	function i(p, q) {
		return parseInt(e.css(p, q), 10) || 0
	}
	function f(q) {
		var p = q[0];
		if (p.nodeType === 9) {
			return {
				width: q.width(),
				height: q.height(),
				offset: {
					top: 0,
					left: 0
				}
			}
		}
		if (e.isWindow(p)) {
			return {
				width: q.width(),
				height: q.height(),
				offset: {
					top: q.scrollTop(),
					left: q.scrollLeft()
				}
			}
		}
		if (p.preventDefault) {
			return {
				width: 0,
				height: 0,
				offset: {
					top: p.pageY,
					left: p.pageX
				}
			}
		}
		return {
			width: q.outerWidth(),
			height: q.outerHeight(),
			offset: q.offset()
		}
	}
	e.position = {
		scrollbarWidth: function() {
			if (j !== c) {
				return j
			}
			var q, p, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
				r = s.children()[0];
			e("body").append(s);
			q = r.offsetWidth;
			s.css("overflow", "scroll");
			p = r.offsetWidth;
			if (q === p) {
				p = s[0].clientWidth
			}
			s.remove();
			return (j = q - p)
		},
		getScrollInfo: function(t) {
			var s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
				r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
				q = s === "scroll" || (s === "auto" && t.width < t.element[0].scrollWidth),
				p = r === "scroll" || (r === "auto" && t.height < t.element[0].scrollHeight);
			return {
				width: p ? e.position.scrollbarWidth() : 0,
				height: q ? e.position.scrollbarWidth() : 0
			}
		},
		getWithinInfo: function(q) {
			var r = e(q || window),
				p = e.isWindow(r[0]),
				s = !! r[0] && r[0].nodeType === 9;
			return {
				element: r,
				isWindow: p,
				isDocument: s,
				offset: r.offset() || {
					left: 0,
					top: 0
				},
				scrollLeft: r.scrollLeft(),
				scrollTop: r.scrollTop(),
				width: p ? r.width() : r.outerWidth(),
				height: p ? r.height() : r.outerHeight()
			}
		}
	};
	e.fn.position = function(z) {
		if (!z || !z.of) {
			return g.apply(this, arguments)
		}
		z = e.extend({}, z);
		var A, w, u, y, t, p, v = e(z.of),
			s = e.position.getWithinInfo(z.within),
			q = e.position.getScrollInfo(s),
			x = (z.collision || "flip").split(" "),
			r = {};
		p = f(v);
		if (v[0].preventDefault) {
			z.at = "left top"
		}
		w = p.width;
		u = p.height;
		y = p.offset;
		t = e.extend({}, y);
		e.each(["my", "at"], function() {
			var D = (z[this] || "").split(" "),
				C, B;
			if (D.length === 1) {
				D = d.test(D[0]) ? D.concat(["center"]) : h.test(D[0]) ? ["center"].concat(D) : ["center", "center"]
			}
			D[0] = d.test(D[0]) ? D[0] : "center";
			D[1] = h.test(D[1]) ? D[1] : "center";
			C = a.exec(D[0]);
			B = a.exec(D[1]);
			r[this] = [C ? C[0] : 0, B ? B[0] : 0];
			z[this] = [l.exec(D[0])[0], l.exec(D[1])[0]]
		});
		if (x.length === 1) {
			x[1] = x[0]
		}
		if (z.at[0] === "right") {
			t.left += w
		} else {
			if (z.at[0] === "center") {
				t.left += w / 2
			}
		}
		if (z.at[1] === "bottom") {
			t.top += u
		} else {
			if (z.at[1] === "center") {
				t.top += u / 2
			}
		}
		A = n(r.at, w, u);
		t.left += A[0];
		t.top += A[1];
		return this.each(function() {
			var C, L, E = e(this),
				G = E.outerWidth(),
				D = E.outerHeight(),
				F = i(this, "marginLeft"),
				B = i(this, "marginTop"),
				K = G + F + i(this, "marginRight") + q.width,
				J = D + B + i(this, "marginBottom") + q.height,
				H = e.extend({}, t),
				I = n(r.my, E.outerWidth(), E.outerHeight());
			if (z.my[0] === "right") {
				H.left -= G
			} else {
				if (z.my[0] === "center") {
					H.left -= G / 2
				}
			}
			if (z.my[1] === "bottom") {
				H.top -= D
			} else {
				if (z.my[1] === "center") {
					H.top -= D / 2
				}
			}
			H.left += I[0];
			H.top += I[1];
			if (!e.support.offsetFractions) {
				H.left = m(H.left);
				H.top = m(H.top)
			}
			C = {
				marginLeft: F,
				marginTop: B
			};
			e.each(["left", "top"], function(N, M) {
				if (e.ui.position[x[N]]) {
					e.ui.position[x[N]][M](H, {
						targetWidth: w,
						targetHeight: u,
						elemWidth: G,
						elemHeight: D,
						collisionPosition: C,
						collisionWidth: K,
						collisionHeight: J,
						offset: [A[0] + I[0], A[1] + I[1]],
						my: z.my,
						at: z.at,
						within: s,
						elem: E
					})
				}
			});
			if (z.using) {
				L = function(P) {
					var R = y.left - H.left,
						O = R + w - G,
						Q = y.top - H.top,
						N = Q + u - D,
						M = {
							target: {
								element: v,
								left: y.left,
								top: y.top,
								width: w,
								height: u
							},
							element: {
								element: E,
								left: H.left,
								top: H.top,
								width: G,
								height: D
							},
							horizontal: O < 0 ? "left" : R > 0 ? "right" : "center",
							vertical: N < 0 ? "top" : Q > 0 ? "bottom" : "middle"
						};
					if (w < G && o(R + O) < w) {
						M.horizontal = "center"
					}
					if (u < D && o(Q + N) < u) {
						M.vertical = "middle"
					}
					if (k(o(R), o(O)) > k(o(Q), o(N))) {
						M.important = "horizontal"
					} else {
						M.important = "vertical"
					}
					z.using.call(this, P, M)
				}
			}
			E.offset(e.extend(H, {
				using: L
			}))
		})
	};
	e.ui.position = {
		fit: {
			left: function(t, s) {
				var r = s.within,
					v = r.isWindow ? r.scrollLeft : r.offset.left,
					x = r.width,
					u = t.left - s.collisionPosition.marginLeft,
					w = v - u,
					q = u + s.collisionWidth - x - v,
					p;
				if (s.collisionWidth > x) {
					if (w > 0 && q <= 0) {
						p = t.left + w + s.collisionWidth - x - v;
						t.left += w - p
					} else {
						if (q > 0 && w <= 0) {
							t.left = v
						} else {
							if (w > q) {
								t.left = v + x - s.collisionWidth
							} else {
								t.left = v
							}
						}
					}
				} else {
					if (w > 0) {
						t.left += w
					} else {
						if (q > 0) {
							t.left -= q
						} else {
							t.left = k(t.left - u, t.left)
						}
					}
				}
			},
			top: function(s, r) {
				var q = r.within,
					w = q.isWindow ? q.scrollTop : q.offset.top,
					x = r.within.height,
					u = s.top - r.collisionPosition.marginTop,
					v = w - u,
					t = u + r.collisionHeight - x - w,
					p;
				if (r.collisionHeight > x) {
					if (v > 0 && t <= 0) {
						p = s.top + v + r.collisionHeight - x - w;
						s.top += v - p
					} else {
						if (t > 0 && v <= 0) {
							s.top = w
						} else {
							if (v > t) {
								s.top = w + x - r.collisionHeight
							} else {
								s.top = w
							}
						}
					}
				} else {
					if (v > 0) {
						s.top += v
					} else {
						if (t > 0) {
							s.top -= t
						} else {
							s.top = k(s.top - u, s.top)
						}
					}
				}
			}
		},
		flip: {
			left: function(v, u) {
				var t = u.within,
					z = t.offset.left + t.scrollLeft,
					C = t.width,
					r = t.isWindow ? t.scrollLeft : t.offset.left,
					w = v.left - u.collisionPosition.marginLeft,
					A = w - r,
					q = w + u.collisionWidth - C - r,
					y = u.my[0] === "left" ? -u.elemWidth : u.my[0] === "right" ? u.elemWidth : 0,
					B = u.at[0] === "left" ? u.targetWidth : u.at[0] === "right" ? -u.targetWidth : 0,
					s = -2 * u.offset[0],
					p, x;
				if (A < 0) {
					p = v.left + y + B + s + u.collisionWidth - C - z;
					if (p < 0 || p < o(A)) {
						v.left += y + B + s
					}
				} else {
					if (q > 0) {
						x = v.left - u.collisionPosition.marginLeft + y + B + s - r;
						if (x > 0 || o(x) < q) {
							v.left += y + B + s
						}
					}
				}
			},
			top: function(u, t) {
				var s = t.within,
					B = s.offset.top + s.scrollTop,
					C = s.height,
					p = s.isWindow ? s.scrollTop : s.offset.top,
					w = u.top - t.collisionPosition.marginTop,
					y = w - p,
					v = w + t.collisionHeight - C - p,
					z = t.my[1] === "top",
					x = z ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
					D = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
					r = -2 * t.offset[1],
					A, q;
				if (y < 0) {
					q = u.top + x + D + r + t.collisionHeight - C - B;
					if ((u.top + x + D + r) > y && (q < 0 || q < o(y))) {
						u.top += x + D + r
					}
				} else {
					if (v > 0) {
						A = u.top - t.collisionPosition.marginTop + x + D + r - p;
						if ((u.top + x + D + r) > v && (A > 0 || o(A) < v)) {
							u.top += x + D + r
						}
					}
				}
			}
		},
		flipfit: {
			left: function() {
				e.ui.position.flip.left.apply(this, arguments);
				e.ui.position.fit.left.apply(this, arguments)
			},
			top: function() {
				e.ui.position.flip.top.apply(this, arguments);
				e.ui.position.fit.top.apply(this, arguments)
			}
		}
	};
	(function() {
		var t, v, q, s, r, p = document.getElementsByTagName("body")[0],
			u = document.createElement("div");
		t = document.createElement(p ? "div" : "body");
		q = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none"
		};
		if (p) {
			e.extend(q, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px"
			})
		}
		for (r in q) {
			t.style[r] = q[r]
		}
		t.appendChild(u);
		v = p || document.documentElement;
		v.insertBefore(t, v.firstChild);
		u.style.cssText = "position: absolute; left: 10.7432222px;";
		s = e(u).offset().left;
		e.support.offsetFractions = s > 10 && s < 11;
		t.innerHTML = "";
		v.removeChild(t)
	})()
}(jQuery));
(function(a, b) {
	a.widget("ui.draggable", a.ui.mouse, {
		version: "1.10.4",
		widgetEventPrefix: "drag",
		options: {
			addClasses: true,
			appendTo: "parent",
			axis: false,
			connectToSortable: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			grid: false,
			handle: false,
			helper: "original",
			iframeFix: false,
			opacity: false,
			refreshPositions: false,
			revert: false,
			revertDuration: 500,
			scope: "default",
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: false,
			snapMode: "both",
			snapTolerance: 20,
			stack: false,
			zIndex: false,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
				this.element[0].style.position = "relative"
			}
			if (this.options.addClasses) {
				this.element.addClass("ui-draggable")
			}
			if (this.options.disabled) {
				this.element.addClass("ui-draggable-disabled")
			}
			this._mouseInit()
		},
		_destroy: function() {
			this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
			this._mouseDestroy()
		},
		_mouseCapture: function(c) {
			var d = this.options;
			if (this.helper || d.disabled || a(c.target).closest(".ui-resizable-handle").length > 0) {
				return false
			}
			this.handle = this._getHandle(c);
			if (!this.handle) {
				return false
			}
			a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function() {
				a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1000
				}).css(a(this).offset()).appendTo("body")
			});
			return true
		},
		_mouseStart: function(c) {
			var d = this.options;
			this.helper = this._createHelper(c);
			this.helper.addClass("ui-draggable-dragging");
			this._cacheHelperProportions();
			if (a.ui.ddmanager) {
				a.ui.ddmanager.current = this
			}
			this._cacheMargins();
			this.cssPosition = this.helper.css("position");
			this.scrollParent = this.helper.scrollParent();
			this.offsetParent = this.helper.offsetParent();
			this.offsetParentCssPosition = this.offsetParent.css("position");
			this.offset = this.positionAbs = this.element.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
			this.offset.scroll = false;
			a.extend(this.offset, {
				click: {
					left: c.pageX - this.offset.left,
					top: c.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this.position = this._generatePosition(c);
			this.originalPageX = c.pageX;
			this.originalPageY = c.pageY;
			(d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt));
			this._setContainment();
			if (this._trigger("start", c) === false) {
				this._clear();
				return false
			}
			this._cacheHelperProportions();
			if (a.ui.ddmanager && !d.dropBehaviour) {
				a.ui.ddmanager.prepareOffsets(this, c)
			}
			this._mouseDrag(c, true);
			if (a.ui.ddmanager) {
				a.ui.ddmanager.dragStart(this, c)
			}
			return true
		},
		_mouseDrag: function(c, e) {
			if (this.offsetParentCssPosition === "fixed") {
				this.offset.parent = this._getParentOffset()
			}
			this.position = this._generatePosition(c);
			this.positionAbs = this._convertPositionTo("absolute");
			if (!e) {
				var d = this._uiHash();
				if (this._trigger("drag", c, d) === false) {
					this._mouseUp({});
					return false
				}
				this.position = d.position
			}
			if (!this.options.axis || this.options.axis !== "y") {
				this.helper[0].style.left = this.position.left + "px"
			}
			if (!this.options.axis || this.options.axis !== "x") {
				this.helper[0].style.top = this.position.top + "px"
			}
			if (a.ui.ddmanager) {
				a.ui.ddmanager.drag(this, c)
			}
			return false
		},
		_mouseStop: function(d) {
			var c = this,
				e = false;
			if (a.ui.ddmanager && !this.options.dropBehaviour) {
				e = a.ui.ddmanager.drop(this, d)
			}
			if (this.dropped) {
				e = this.dropped;
				this.dropped = false
			}
			if (this.options.helper === "original" && !a.contains(this.element[0].ownerDocument, this.element[0])) {
				return false
			}
			if ((this.options.revert === "invalid" && !e) || (this.options.revert === "valid" && e) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, e))) {
				a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					if (c._trigger("stop", d) !== false) {
						c._clear()
					}
				})
			} else {
				if (this._trigger("stop", d) !== false) {
					this._clear()
				}
			}
			return false
		},
		_mouseUp: function(c) {
			a("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			});
			if (a.ui.ddmanager) {
				a.ui.ddmanager.dragStop(this, c)
			}
			return a.ui.mouse.prototype._mouseUp.call(this, c)
		},
		cancel: function() {
			if (this.helper.is(".ui-draggable-dragging")) {
				this._mouseUp({})
			} else {
				this._clear()
			}
			return this
		},
		_getHandle: function(c) {
			return this.options.handle ? !! a(c.target).closest(this.element.find(this.options.handle)).length : true
		},
		_createHelper: function(d) {
			var e = this.options,
				c = a.isFunction(e.helper) ? a(e.helper.apply(this.element[0], [d])) : (e.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
			if (!c.parents("body").length) {
				c.appendTo((e.appendTo === "parent" ? this.element[0].parentNode : e.appendTo))
			}
			if (c[0] !== this.element[0] && !(/(fixed|absolute)/).test(c.css("position"))) {
				c.css("position", "absolute")
			}
			return c
		},
		_adjustOffsetFromHelper: function(c) {
			if (typeof c === "string") {
				c = c.split(" ")
			}
			if (a.isArray(c)) {
				c = {
					left: +c[0],
					top: +c[1] || 0
				}
			}
			if ("left" in c) {
				this.offset.click.left = c.left + this.margins.left
			}
			if ("right" in c) {
				this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
			}
			if ("top" in c) {
				this.offset.click.top = c.top + this.margins.top
			}
			if ("bottom" in c) {
				this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
			}
		},
		_getParentOffset: function() {
			var c = this.offsetParent.offset();
			if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) {
				c.left += this.scrollParent.scrollLeft();
				c.top += this.scrollParent.scrollTop()
			}
			if ((this.offsetParent[0] === document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && a.ui.ie)) {
				c = {
					top: 0,
					left: 0
				}
			}
			return {
				top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this.cssPosition === "relative") {
				var c = this.element.position();
				return {
					top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			} else {
				return {
					top: 0,
					left: 0
				}
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: (parseInt(this.element.css("marginLeft"), 10) || 0),
				top: (parseInt(this.element.css("marginTop"), 10) || 0),
				right: (parseInt(this.element.css("marginRight"), 10) || 0),
				bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var e, g, d, f = this.options;
			if (!f.containment) {
				this.containment = null;
				return
			}
			if (f.containment === "window") {
				this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
				return
			}
			if (f.containment === "document") {
				this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
				return
			}
			if (f.containment.constructor === Array) {
				this.containment = f.containment;
				return
			}
			if (f.containment === "parent") {
				f.containment = this.helper[0].parentNode
			}
			g = a(f.containment);
			d = g[0];
			if (!d) {
				return
			}
			e = g.css("overflow") !== "hidden";
			this.containment = [(parseInt(g.css("borderLeftWidth"), 10) || 0) + (parseInt(g.css("paddingLeft"), 10) || 0), (parseInt(g.css("borderTopWidth"), 10) || 0) + (parseInt(g.css("paddingTop"), 10) || 0), (e ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(g.css("borderRightWidth"), 10) || 0) - (parseInt(g.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(g.css("borderBottomWidth"), 10) || 0) - (parseInt(g.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
			this.relative_container = g
		},
		_convertPositionTo: function(f, g) {
			if (!g) {
				g = this.position
			}
			var e = f === "absolute" ? 1 : -1,
				c = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
			if (!this.offset.scroll) {
				this.offset.scroll = {
					top: c.scrollTop(),
					left: c.scrollLeft()
				}
			}
			return {
				top: (g.top + this.offset.relative.top * e + this.offset.parent.top * e - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * e)),
				left: (g.left + this.offset.relative.left * e + this.offset.parent.left * e - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * e))
			}
		},
		_generatePosition: function(d) {
			var c, i, j, f, e = this.options,
				k = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
				h = d.pageX,
				g = d.pageY;
			if (!this.offset.scroll) {
				this.offset.scroll = {
					top: k.scrollTop(),
					left: k.scrollLeft()
				}
			}
			if (this.originalPosition) {
				if (this.containment) {
					if (this.relative_container) {
						i = this.relative_container.offset();
						c = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
					} else {
						c = this.containment
					}
					if (d.pageX - this.offset.click.left < c[0]) {
						h = c[0] + this.offset.click.left
					}
					if (d.pageY - this.offset.click.top < c[1]) {
						g = c[1] + this.offset.click.top
					}
					if (d.pageX - this.offset.click.left > c[2]) {
						h = c[2] + this.offset.click.left
					}
					if (d.pageY - this.offset.click.top > c[3]) {
						g = c[3] + this.offset.click.top
					}
				}
				if (e.grid) {
					j = e.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1] : this.originalPageY;
					g = c ? ((j - this.offset.click.top >= c[1] || j - this.offset.click.top > c[3]) ? j : ((j - this.offset.click.top >= c[1]) ? j - e.grid[1] : j + e.grid[1])) : j;
					f = e.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / e.grid[0]) * e.grid[0] : this.originalPageX;
					h = c ? ((f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2]) ? f : ((f - this.offset.click.left >= c[0]) ? f - e.grid[0] : f + e.grid[0])) : f
				}
			}
			return {
				top: (g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : this.offset.scroll.top)),
				left: (h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : this.offset.scroll.left))
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging");
			if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
				this.helper.remove()
			}
			this.helper = null;
			this.cancelHelperRemoval = false
		},
		_trigger: function(c, d, e) {
			e = e || this._uiHash();
			a.ui.plugin.call(this, c, [d, e]);
			if (c === "drag") {
				this.positionAbs = this._convertPositionTo("absolute")
			}
			return a.Widget.prototype._trigger.call(this, c, d, e)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	});
	a.ui.plugin.add("draggable", "connectToSortable", {
		start: function(d, f) {
			var e = a(this).data("ui-draggable"),
				g = e.options,
				c = a.extend({}, f, {
					item: e.element
				});
			e.sortables = [];
			a(g.connectToSortable).each(function() {
				var h = a.data(this, "ui-sortable");
				if (h && !h.options.disabled) {
					e.sortables.push({
						instance: h,
						shouldRevert: h.options.revert
					});
					h.refreshPositions();
					h._trigger("activate", d, c)
				}
			})
		},
		stop: function(d, f) {
			var e = a(this).data("ui-draggable"),
				c = a.extend({}, f, {
					item: e.element
				});
			a.each(e.sortables, function() {
				if (this.instance.isOver) {
					this.instance.isOver = 0;
					e.cancelHelperRemoval = true;
					this.instance.cancelHelperRemoval = false;
					if (this.shouldRevert) {
						this.instance.options.revert = this.shouldRevert
					}
					this.instance._mouseStop(d);
					this.instance.options.helper = this.instance.options._helper;
					if (e.options.helper === "original") {
						this.instance.currentItem.css({
							top: "auto",
							left: "auto"
						})
					}
				} else {
					this.instance.cancelHelperRemoval = false;
					this.instance._trigger("deactivate", d, c)
				}
			})
		},
		drag: function(d, f) {
			var e = a(this).data("ui-draggable"),
				c = this;
			a.each(e.sortables, function() {
				var g = false,
					h = this;
				this.instance.positionAbs = e.positionAbs;
				this.instance.helperProportions = e.helperProportions;
				this.instance.offset.click = e.offset.click;
				if (this.instance._intersectsWith(this.instance.containerCache)) {
					g = true;
					a.each(e.sortables, function() {
						this.instance.positionAbs = e.positionAbs;
						this.instance.helperProportions = e.helperProportions;
						this.instance.offset.click = e.offset.click;
						if (this !== h && this.instance._intersectsWith(this.instance.containerCache) && a.contains(h.instance.element[0], this.instance.element[0])) {
							g = false
						}
						return g
					})
				}
				if (g) {
					if (!this.instance.isOver) {
						this.instance.isOver = 1;
						this.instance.currentItem = a(c).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
						this.instance.options._helper = this.instance.options.helper;
						this.instance.options.helper = function() {
							return f.helper[0]
						};
						d.target = this.instance.currentItem[0];
						this.instance._mouseCapture(d, true);
						this.instance._mouseStart(d, true, true);
						this.instance.offset.click.top = e.offset.click.top;
						this.instance.offset.click.left = e.offset.click.left;
						this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
						this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
						e._trigger("toSortable", d);
						e.dropped = this.instance.element;
						e.currentItem = e.element;
						this.instance.fromOutside = e
					}
					if (this.instance.currentItem) {
						this.instance._mouseDrag(d)
					}
				} else {
					if (this.instance.isOver) {
						this.instance.isOver = 0;
						this.instance.cancelHelperRemoval = true;
						this.instance.options.revert = false;
						this.instance._trigger("out", d, this.instance._uiHash(this.instance));
						this.instance._mouseStop(d, true);
						this.instance.options.helper = this.instance.options._helper;
						this.instance.currentItem.remove();
						if (this.instance.placeholder) {
							this.instance.placeholder.remove()
						}
						e._trigger("fromSortable", d);
						e.dropped = false
					}
				}
			})
		}
	});
	a.ui.plugin.add("draggable", "cursor", {
		start: function() {
			var c = a("body"),
				d = a(this).data("ui-draggable").options;
			if (c.css("cursor")) {
				d._cursor = c.css("cursor")
			}
			c.css("cursor", d.cursor)
		},
		stop: function() {
			var c = a(this).data("ui-draggable").options;
			if (c._cursor) {
				a("body").css("cursor", c._cursor)
			}
		}
	});
	a.ui.plugin.add("draggable", "opacity", {
		start: function(d, e) {
			var c = a(e.helper),
				f = a(this).data("ui-draggable").options;
			if (c.css("opacity")) {
				f._opacity = c.css("opacity")
			}
			c.css("opacity", f.opacity)
		},
		stop: function(c, d) {
			var e = a(this).data("ui-draggable").options;
			if (e._opacity) {
				a(d.helper).css("opacity", e._opacity)
			}
		}
	});
	a.ui.plugin.add("draggable", "scroll", {
		start: function() {
			var c = a(this).data("ui-draggable");
			if (c.scrollParent[0] !== document && c.scrollParent[0].tagName !== "HTML") {
				c.overflowOffset = c.scrollParent.offset()
			}
		},
		drag: function(e) {
			var d = a(this).data("ui-draggable"),
				f = d.options,
				c = false;
			if (d.scrollParent[0] !== document && d.scrollParent[0].tagName !== "HTML") {
				if (!f.axis || f.axis !== "x") {
					if ((d.overflowOffset.top + d.scrollParent[0].offsetHeight) - e.pageY < f.scrollSensitivity) {
						d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop + f.scrollSpeed
					} else {
						if (e.pageY - d.overflowOffset.top < f.scrollSensitivity) {
							d.scrollParent[0].scrollTop = c = d.scrollParent[0].scrollTop - f.scrollSpeed
						}
					}
				}
				if (!f.axis || f.axis !== "y") {
					if ((d.overflowOffset.left + d.scrollParent[0].offsetWidth) - e.pageX < f.scrollSensitivity) {
						d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft + f.scrollSpeed
					} else {
						if (e.pageX - d.overflowOffset.left < f.scrollSensitivity) {
							d.scrollParent[0].scrollLeft = c = d.scrollParent[0].scrollLeft - f.scrollSpeed
						}
					}
				}
			} else {
				if (!f.axis || f.axis !== "x") {
					if (e.pageY - a(document).scrollTop() < f.scrollSensitivity) {
						c = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
					} else {
						if (a(window).height() - (e.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
							c = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
						}
					}
				}
				if (!f.axis || f.axis !== "y") {
					if (e.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
						c = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
					} else {
						if (a(window).width() - (e.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
							c = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
						}
					}
				}
			}
			if (c !== false && a.ui.ddmanager && !f.dropBehaviour) {
				a.ui.ddmanager.prepareOffsets(d, e)
			}
		}
	});
	a.ui.plugin.add("draggable", "snap", {
		start: function() {
			var c = a(this).data("ui-draggable"),
				d = c.options;
			c.snapElements = [];
			a(d.snap.constructor !== String ? (d.snap.items || ":data(ui-draggable)") : d.snap).each(function() {
				var f = a(this),
					e = f.offset();
				if (this !== c.element[0]) {
					c.snapElements.push({
						item: this,
						width: f.outerWidth(),
						height: f.outerHeight(),
						top: e.top,
						left: e.left
					})
				}
			})
		},
		drag: function(u, p) {
			var c, z, j, k, s, n, m, A, v, h, g = a(this).data("ui-draggable"),
				q = g.options,
				y = q.snapTolerance,
				x = p.offset.left,
				w = x + g.helperProportions.width,
				f = p.offset.top,
				e = f + g.helperProportions.height;
			for (v = g.snapElements.length - 1; v >= 0; v--) {
				s = g.snapElements[v].left;
				n = s + g.snapElements[v].width;
				m = g.snapElements[v].top;
				A = m + g.snapElements[v].height;
				if (w < s - y || x > n + y || e < m - y || f > A + y || !a.contains(g.snapElements[v].item.ownerDocument, g.snapElements[v].item)) {
					if (g.snapElements[v].snapping) {
						(g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {
							snapItem: g.snapElements[v].item
						})))
					}
					g.snapElements[v].snapping = false;
					continue
				}
				if (q.snapMode !== "inner") {
					c = Math.abs(m - e) <= y;
					z = Math.abs(A - f) <= y;
					j = Math.abs(s - w) <= y;
					k = Math.abs(n - x) <= y;
					if (c) {
						p.position.top = g._convertPositionTo("relative", {
							top: m - g.helperProportions.height,
							left: 0
						}).top - g.margins.top
					}
					if (z) {
						p.position.top = g._convertPositionTo("relative", {
							top: A,
							left: 0
						}).top - g.margins.top
					}
					if (j) {
						p.position.left = g._convertPositionTo("relative", {
							top: 0,
							left: s - g.helperProportions.width
						}).left - g.margins.left
					}
					if (k) {
						p.position.left = g._convertPositionTo("relative", {
							top: 0,
							left: n
						}).left - g.margins.left
					}
				}
				h = (c || z || j || k);
				if (q.snapMode !== "outer") {
					c = Math.abs(m - f) <= y;
					z = Math.abs(A - e) <= y;
					j = Math.abs(s - x) <= y;
					k = Math.abs(n - w) <= y;
					if (c) {
						p.position.top = g._convertPositionTo("relative", {
							top: m,
							left: 0
						}).top - g.margins.top
					}
					if (z) {
						p.position.top = g._convertPositionTo("relative", {
							top: A - g.helperProportions.height,
							left: 0
						}).top - g.margins.top
					}
					if (j) {
						p.position.left = g._convertPositionTo("relative", {
							top: 0,
							left: s
						}).left - g.margins.left
					}
					if (k) {
						p.position.left = g._convertPositionTo("relative", {
							top: 0,
							left: n - g.helperProportions.width
						}).left - g.margins.left
					}
				}
				if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
					(g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {
						snapItem: g.snapElements[v].item
					})))
				}
				g.snapElements[v].snapping = (c || z || j || k || h)
			}
		}
	});
	a.ui.plugin.add("draggable", "stack", {
		start: function() {
			var c, e = this.data("ui-draggable").options,
				d = a.makeArray(a(e.stack)).sort(function(g, f) {
					return (parseInt(a(g).css("zIndex"), 10) || 0) - (parseInt(a(f).css("zIndex"), 10) || 0)
				});
			if (!d.length) {
				return
			}
			c = parseInt(a(d[0]).css("zIndex"), 10) || 0;
			a(d).each(function(f) {
				a(this).css("zIndex", c + f)
			});
			this.css("zIndex", (c + d.length))
		}
	});
	a.ui.plugin.add("draggable", "zIndex", {
		start: function(d, e) {
			var c = a(e.helper),
				f = a(this).data("ui-draggable").options;
			if (c.css("zIndex")) {
				f._zIndex = c.css("zIndex")
			}
			c.css("zIndex", f.zIndex)
		},
		stop: function(c, d) {
			var e = a(this).data("ui-draggable").options;
			if (e._zIndex) {
				a(d.helper).css("zIndex", e._zIndex)
			}
		}
	})
})(jQuery);
(function(c, d) {
	function b(e) {
		return parseInt(e, 10) || 0
	}
	function a(e) {
		return !isNaN(parseInt(e, 10))
	}
	c.widget("ui.resizable", c.ui.mouse, {
		version: "1.10.4",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: false,
			animate: false,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: false,
			autoHide: false,
			containment: false,
			ghost: false,
			grid: false,
			handles: "e,s,se",
			helper: false,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_create: function() {
			var l, f, j, g, e, h = this,
				k = this.options;
			this.element.addClass("ui-resizable");
			c.extend(this, {
				_aspectRatio: !! (k.aspectRatio),
				aspectRatio: k.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: k.helper || k.ghost || k.animate ? k.helper || "ui-resizable-helper" : null
			});
			if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
				this.element.wrap(c("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				}));
				this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable"));
				this.elementIsWrapper = true;
				this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				});
				this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				});
				this.originalResizeStyle = this.originalElement.css("resize");
				this.originalElement.css("resize", "none");
				this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				}));
				this.originalElement.css({
					margin: this.originalElement.css("margin")
				});
				this._proportionallyResize()
			}
			this.handles = k.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {
				n: ".ui-resizable-n",
				e: ".ui-resizable-e",
				s: ".ui-resizable-s",
				w: ".ui-resizable-w",
				se: ".ui-resizable-se",
				sw: ".ui-resizable-sw",
				ne: ".ui-resizable-ne",
				nw: ".ui-resizable-nw"
			});
			if (this.handles.constructor === String) {
				if (this.handles === "all") {
					this.handles = "n,e,s,w,se,sw,ne,nw"
				}
				l = this.handles.split(",");
				this.handles = {};
				for (f = 0; f < l.length; f++) {
					j = c.trim(l[f]);
					e = "ui-resizable-" + j;
					g = c("<div class='ui-resizable-handle " + e + "'></div>");
					g.css({
						zIndex: k.zIndex
					});
					if ("se" === j) {
						g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
					}
					this.handles[j] = ".ui-resizable-" + j;
					this.element.append(g)
				}
			}
			this._renderAxis = function(q) {
				var n, o, m, p;
				q = q || this.element;
				for (n in this.handles) {
					if (this.handles[n].constructor === String) {
						this.handles[n] = c(this.handles[n], this.element).show()
					}
					if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
						o = c(this.handles[n], this.element);
						p = /sw|ne|nw|se|n|s/.test(n) ? o.outerHeight() : o.outerWidth();
						m = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
						q.css(m, p);
						this._proportionallyResize()
					}
					if (!c(this.handles[n]).length) {
						continue
					}
				}
			};
			this._renderAxis(this.element);
			this._handles = c(".ui-resizable-handle", this.element).disableSelection();
			this._handles.mouseover(function() {
				if (!h.resizing) {
					if (this.className) {
						g = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
					}
					h.axis = g && g[1] ? g[1] : "se"
				}
			});
			if (k.autoHide) {
				this._handles.hide();
				c(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
					if (k.disabled) {
						return
					}
					c(this).removeClass("ui-resizable-autohide");
					h._handles.show()
				}).mouseleave(function() {
					if (k.disabled) {
						return
					}
					if (!h.resizing) {
						c(this).addClass("ui-resizable-autohide");
						h._handles.hide()
					}
				})
			}
			this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var f, e = function(g) {
					c(g).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
				};
			if (this.elementIsWrapper) {
				e(this.element);
				f = this.element;
				this.originalElement.css({
					position: f.css("position"),
					width: f.outerWidth(),
					height: f.outerHeight(),
					top: f.css("top"),
					left: f.css("left")
				}).insertAfter(f);
				f.remove()
			}
			this.originalElement.css("resize", this.originalResizeStyle);
			e(this.originalElement);
			return this
		},
		_mouseCapture: function(g) {
			var f, h, e = false;
			for (f in this.handles) {
				h = c(this.handles[f])[0];
				if (h === g.target || c.contains(h, g.target)) {
					e = true
				}
			}
			return !this.options.disabled && e
		},
		_mouseStart: function(g) {
			var k, h, j, i = this.options,
				f = this.element.position(),
				e = this.element;
			this.resizing = true;
			if ((/absolute/).test(e.css("position"))) {
				e.css({
					position: "absolute",
					top: e.css("top"),
					left: e.css("left")
				})
			} else {
				if (e.is(".ui-draggable")) {
					e.css({
						position: "absolute",
						top: f.top,
						left: f.left
					})
				}
			}
			this._renderProxy();
			k = b(this.helper.css("left"));
			h = b(this.helper.css("top"));
			if (i.containment) {
				k += c(i.containment).scrollLeft() || 0;
				h += c(i.containment).scrollTop() || 0
			}
			this.offset = this.helper.offset();
			this.position = {
				left: k,
				top: h
			};
			this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: e.width(),
				height: e.height()
			};
			this.originalSize = this._helper ? {
				width: e.outerWidth(),
				height: e.outerHeight()
			} : {
				width: e.width(),
				height: e.height()
			};
			this.originalPosition = {
				left: k,
				top: h
			};
			this.sizeDiff = {
				width: e.outerWidth() - e.width(),
				height: e.outerHeight() - e.height()
			};
			this.originalMousePosition = {
				left: g.pageX,
				top: g.pageY
			};
			this.aspectRatio = (typeof i.aspectRatio === "number") ? i.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
			j = c(".ui-resizable-" + this.axis).css("cursor");
			c("body").css("cursor", j === "auto" ? this.axis + "-resize" : j);
			e.addClass("ui-resizable-resizing");
			this._propagate("start", g);
			return true
		},
		_mouseDrag: function(e) {
			var k, g = this.helper,
				l = {},
				i = this.originalMousePosition,
				m = this.axis,
				o = this.position.top,
				f = this.position.left,
				n = this.size.width,
				j = this.size.height,
				q = (e.pageX - i.left) || 0,
				p = (e.pageY - i.top) || 0,
				h = this._change[m];
			if (!h) {
				return false
			}
			k = h.apply(this, [e, q, p]);
			this._updateVirtualBoundaries(e.shiftKey);
			if (this._aspectRatio || e.shiftKey) {
				k = this._updateRatio(k, e)
			}
			k = this._respectSize(k, e);
			this._updateCache(k);
			this._propagate("resize", e);
			if (this.position.top !== o) {
				l.top = this.position.top + "px"
			}
			if (this.position.left !== f) {
				l.left = this.position.left + "px"
			}
			if (this.size.width !== n) {
				l.width = this.size.width + "px"
			}
			if (this.size.height !== j) {
				l.height = this.size.height + "px"
			}
			g.css(l);
			if (!this._helper && this._proportionallyResizeElements.length) {
				this._proportionallyResize()
			}
			if (!c.isEmptyObject(l)) {
				this._trigger("resize", e, this.ui())
			}
			return false
		},
		_mouseStop: function(h) {
			this.resizing = false;
			var g, e, f, k, n, j, m, i = this.options,
				l = this;
			if (this._helper) {
				g = this._proportionallyResizeElements;
				e = g.length && (/textarea/i).test(g[0].nodeName);
				f = e && c.ui.hasScroll(g[0], "left") ? 0 : l.sizeDiff.height;
				k = e ? 0 : l.sizeDiff.width;
				n = {
					width: (l.helper.width() - k),
					height: (l.helper.height() - f)
				};
				j = (parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left)) || null;
				m = (parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top)) || null;
				if (!i.animate) {
					this.element.css(c.extend(n, {
						top: m,
						left: j
					}))
				}
				l.helper.height(l.size.height);
				l.helper.width(l.size.width);
				if (this._helper && !i.animate) {
					this._proportionallyResize()
				}
			}
			c("body").css("cursor", "auto");
			this.element.removeClass("ui-resizable-resizing");
			this._propagate("stop", h);
			if (this._helper) {
				this.helper.remove()
			}
			return false
		},
		_updateVirtualBoundaries: function(g) {
			var i, h, f, k, e, j = this.options;
			e = {
				minWidth: a(j.minWidth) ? j.minWidth : 0,
				maxWidth: a(j.maxWidth) ? j.maxWidth : Infinity,
				minHeight: a(j.minHeight) ? j.minHeight : 0,
				maxHeight: a(j.maxHeight) ? j.maxHeight : Infinity
			};
			if (this._aspectRatio || g) {
				i = e.minHeight * this.aspectRatio;
				f = e.minWidth / this.aspectRatio;
				h = e.maxHeight * this.aspectRatio;
				k = e.maxWidth / this.aspectRatio;
				if (i > e.minWidth) {
					e.minWidth = i
				}
				if (f > e.minHeight) {
					e.minHeight = f
				}
				if (h < e.maxWidth) {
					e.maxWidth = h
				}
				if (k < e.maxHeight) {
					e.maxHeight = k
				}
			}
			this._vBoundaries = e
		},
		_updateCache: function(e) {
			this.offset = this.helper.offset();
			if (a(e.left)) {
				this.position.left = e.left
			}
			if (a(e.top)) {
				this.position.top = e.top
			}
			if (a(e.height)) {
				this.size.height = e.height
			}
			if (a(e.width)) {
				this.size.width = e.width
			}
		},
		_updateRatio: function(g) {
			var h = this.position,
				f = this.size,
				e = this.axis;
			if (a(g.height)) {
				g.width = (g.height * this.aspectRatio)
			} else {
				if (a(g.width)) {
					g.height = (g.width / this.aspectRatio)
				}
			}
			if (e === "sw") {
				g.left = h.left + (f.width - g.width);
				g.top = null
			}
			if (e === "nw") {
				g.top = h.top + (f.height - g.height);
				g.left = h.left + (f.width - g.width)
			}
			return g
		},
		_respectSize: function(j) {
			var g = this._vBoundaries,
				m = this.axis,
				p = a(j.width) && g.maxWidth && (g.maxWidth < j.width),
				k = a(j.height) && g.maxHeight && (g.maxHeight < j.height),
				h = a(j.width) && g.minWidth && (g.minWidth > j.width),
				n = a(j.height) && g.minHeight && (g.minHeight > j.height),
				f = this.originalPosition.left + this.originalSize.width,
				l = this.position.top + this.size.height,
				i = /sw|nw|w/.test(m),
				e = /nw|ne|n/.test(m);
			if (h) {
				j.width = g.minWidth
			}
			if (n) {
				j.height = g.minHeight
			}
			if (p) {
				j.width = g.maxWidth
			}
			if (k) {
				j.height = g.maxHeight
			}
			if (h && i) {
				j.left = f - g.minWidth
			}
			if (p && i) {
				j.left = f - g.maxWidth
			}
			if (n && e) {
				j.top = l - g.minHeight
			}
			if (k && e) {
				j.top = l - g.maxHeight
			}
			if (!j.width && !j.height && !j.left && j.top) {
				j.top = null
			} else {
				if (!j.width && !j.height && !j.top && j.left) {
					j.left = null
				}
			}
			return j
		},
		_proportionallyResize: function() {
			if (!this._proportionallyResizeElements.length) {
				return
			}
			var h, f, l, e, k, g = this.helper || this.element;
			for (h = 0; h < this._proportionallyResizeElements.length; h++) {
				k = this._proportionallyResizeElements[h];
				if (!this.borderDif) {
					this.borderDif = [];
					l = [k.css("borderTopWidth"), k.css("borderRightWidth"), k.css("borderBottomWidth"), k.css("borderLeftWidth")];
					e = [k.css("paddingTop"), k.css("paddingRight"), k.css("paddingBottom"), k.css("paddingLeft")];
					for (f = 0; f < l.length; f++) {
						this.borderDif[f] = (parseInt(l[f], 10) || 0) + (parseInt(e[f], 10) || 0)
					}
				}
				k.css({
					height: (g.height() - this.borderDif[0] - this.borderDif[2]) || 0,
					width: (g.width() - this.borderDif[1] - this.borderDif[3]) || 0
				})
			}
		},
		_renderProxy: function() {
			var e = this.element,
				f = this.options;
			this.elementOffset = e.offset();
			if (this._helper) {
				this.helper = this.helper || c("<div style='overflow:hidden;'></div>");
				this.helper.addClass(this._helper).css({
					width: this.element.outerWidth() - 1,
					height: this.element.outerHeight() - 1,
					position: "absolute",
					left: this.elementOffset.left + "px",
					top: this.elementOffset.top + "px",
					zIndex: ++f.zIndex
				});
				this.helper.appendTo("body").disableSelection()
			} else {
				this.helper = this.element
			}
		},
		_change: {
			e: function(f, e) {
				return {
					width: this.originalSize.width + e
				}
			},
			w: function(g, e) {
				var f = this.originalSize,
					h = this.originalPosition;
				return {
					left: h.left + e,
					width: f.width - e
				}
			},
			n: function(h, f, e) {
				var g = this.originalSize,
					i = this.originalPosition;
				return {
					top: i.top + e,
					height: g.height - e
				}
			},
			s: function(g, f, e) {
				return {
					height: this.originalSize.height + e
				}
			},
			se: function(g, f, e) {
				return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
			},
			sw: function(g, f, e) {
				return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
			},
			ne: function(g, f, e) {
				return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [g, f, e]))
			},
			nw: function(g, f, e) {
				return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [g, f, e]))
			}
		},
		_propagate: function(f, e) {
			c.ui.plugin.call(this, f, [e, this.ui()]);
			(f !== "resize" && this._trigger(f, e, this.ui()))
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	});
	c.ui.plugin.add("resizable", "animate", {
		stop: function(h) {
			var m = c(this).data("ui-resizable"),
				j = m.options,
				g = m._proportionallyResizeElements,
				e = g.length && (/textarea/i).test(g[0].nodeName),
				f = e && c.ui.hasScroll(g[0], "left") ? 0 : m.sizeDiff.height,
				l = e ? 0 : m.sizeDiff.width,
				i = {
					width: (m.size.width - l),
					height: (m.size.height - f)
				},
				k = (parseInt(m.element.css("left"), 10) + (m.position.left - m.originalPosition.left)) || null,
				n = (parseInt(m.element.css("top"), 10) + (m.position.top - m.originalPosition.top)) || null;
			m.element.animate(c.extend(i, n && k ? {
				top: n,
				left: k
			} : {}), {
				duration: j.animateDuration,
				easing: j.animateEasing,
				step: function() {
					var o = {
						width: parseInt(m.element.css("width"), 10),
						height: parseInt(m.element.css("height"), 10),
						top: parseInt(m.element.css("top"), 10),
						left: parseInt(m.element.css("left"), 10)
					};
					if (g && g.length) {
						c(g[0]).css({
							width: o.width,
							height: o.height
						})
					}
					m._updateCache(o);
					m._propagate("resize", h)
				}
			})
		}
	});
	c.ui.plugin.add("resizable", "containment", {
		start: function() {
			var m, g, q, e, l, h, r, n = c(this).data("ui-resizable"),
				k = n.options,
				j = n.element,
				f = k.containment,
				i = (f instanceof c) ? f.get(0) : (/parent/.test(f)) ? j.parent().get(0) : f;
			if (!i) {
				return
			}
			n.containerElement = c(i);
			if (/document/.test(f) || f === document) {
				n.containerOffset = {
					left: 0,
					top: 0
				};
				n.containerPosition = {
					left: 0,
					top: 0
				};
				n.parentData = {
					element: c(document),
					left: 0,
					top: 0,
					width: c(document).width(),
					height: c(document).height() || document.body.parentNode.scrollHeight
				}
			} else {
				m = c(i);
				g = [];
				c(["Top", "Right", "Left", "Bottom"]).each(function(p, o) {
					g[p] = b(m.css("padding" + o))
				});
				n.containerOffset = m.offset();
				n.containerPosition = m.position();
				n.containerSize = {
					height: (m.innerHeight() - g[3]),
					width: (m.innerWidth() - g[1])
				};
				q = n.containerOffset;
				e = n.containerSize.height;
				l = n.containerSize.width;
				h = (c.ui.hasScroll(i, "left") ? i.scrollWidth : l);
				r = (c.ui.hasScroll(i) ? i.scrollHeight : e);
				n.parentData = {
					element: i,
					left: q.left,
					top: q.top,
					width: h,
					height: r
				}
			}
		},
		resize: function(f) {
			var k, q, j, i, l = c(this).data("ui-resizable"),
				h = l.options,
				n = l.containerOffset,
				m = l.position,
				p = l._aspectRatio || f.shiftKey,
				e = {
					top: 0,
					left: 0
				},
				g = l.containerElement;
			if (g[0] !== document && (/static/).test(g.css("position"))) {
				e = n
			}
			if (m.left < (l._helper ? n.left : 0)) {
				l.size.width = l.size.width + (l._helper ? (l.position.left - n.left) : (l.position.left - e.left));
				if (p) {
					l.size.height = l.size.width / l.aspectRatio
				}
				l.position.left = h.helper ? n.left : 0
			}
			if (m.top < (l._helper ? n.top : 0)) {
				l.size.height = l.size.height + (l._helper ? (l.position.top - n.top) : l.position.top);
				if (p) {
					l.size.width = l.size.height * l.aspectRatio
				}
				l.position.top = l._helper ? n.top : 0
			}
			l.offset.left = l.parentData.left + l.position.left;
			l.offset.top = l.parentData.top + l.position.top;
			k = Math.abs((l._helper ? l.offset.left - e.left : (l.offset.left - e.left)) + l.sizeDiff.width);
			q = Math.abs((l._helper ? l.offset.top - e.top : (l.offset.top - n.top)) + l.sizeDiff.height);
			j = l.containerElement.get(0) === l.element.parent().get(0);
			i = /relative|absolute/.test(l.containerElement.css("position"));
			if (j && i) {
				k -= Math.abs(l.parentData.left)
			}
			if (k + l.size.width >= l.parentData.width) {
				l.size.width = l.parentData.width - k;
				if (p) {
					l.size.height = l.size.width / l.aspectRatio
				}
			}
			if (q + l.size.height >= l.parentData.height) {
				l.size.height = l.parentData.height - q;
				if (p) {
					l.size.width = l.size.height * l.aspectRatio
				}
			}
		},
		stop: function() {
			var k = c(this).data("ui-resizable"),
				f = k.options,
				l = k.containerOffset,
				e = k.containerPosition,
				g = k.containerElement,
				i = c(k.helper),
				n = i.offset(),
				m = i.outerWidth() - k.sizeDiff.width,
				j = i.outerHeight() - k.sizeDiff.height;
			if (k._helper && !f.animate && (/relative/).test(g.css("position"))) {
				c(this).css({
					left: n.left - e.left - l.left,
					width: m,
					height: j
				})
			}
			if (k._helper && !f.animate && (/static/).test(g.css("position"))) {
				c(this).css({
					left: n.left - e.left - l.left,
					width: m,
					height: j
				})
			}
		}
	});
	c.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var e = c(this).data("ui-resizable"),
				g = e.options,
				f = function(h) {
					c(h).each(function() {
						var i = c(this);
						i.data("ui-resizable-alsoresize", {
							width: parseInt(i.width(), 10),
							height: parseInt(i.height(), 10),
							left: parseInt(i.css("left"), 10),
							top: parseInt(i.css("top"), 10)
						})
					})
				};
			if (typeof(g.alsoResize) === "object" && !g.alsoResize.parentNode) {
				if (g.alsoResize.length) {
					g.alsoResize = g.alsoResize[0];
					f(g.alsoResize)
				} else {
					c.each(g.alsoResize, function(h) {
						f(h)
					})
				}
			} else {
				f(g.alsoResize)
			}
		},
		resize: function(g, i) {
			var f = c(this).data("ui-resizable"),
				j = f.options,
				h = f.originalSize,
				l = f.originalPosition,
				k = {
					height: (f.size.height - h.height) || 0,
					width: (f.size.width - h.width) || 0,
					top: (f.position.top - l.top) || 0,
					left: (f.position.left - l.left) || 0
				},
				e = function(m, n) {
					c(m).each(function() {
						var q = c(this),
							r = c(this).data("ui-resizable-alsoresize"),
							p = {},
							o = n && n.length ? n : q.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
						c.each(o, function(s, u) {
							var t = (r[u] || 0) + (k[u] || 0);
							if (t && t >= 0) {
								p[u] = t || null
							}
						});
						q.css(p)
					})
				};
			if (typeof(j.alsoResize) === "object" && !j.alsoResize.nodeType) {
				c.each(j.alsoResize, function(m, n) {
					e(m, n)
				})
			} else {
				e(j.alsoResize)
			}
		},
		stop: function() {
			c(this).removeData("resizable-alsoresize")
		}
	});
	c.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var f = c(this).data("ui-resizable"),
				g = f.options,
				e = f.size;
			f.ghost = f.originalElement.clone();
			f.ghost.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: e.height,
				width: e.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass(typeof g.ghost === "string" ? g.ghost : "");
			f.ghost.appendTo(f.helper)
		},
		resize: function() {
			var e = c(this).data("ui-resizable");
			if (e.ghost) {
				e.ghost.css({
					position: "relative",
					height: e.size.height,
					width: e.size.width
				})
			}
		},
		stop: function() {
			var e = c(this).data("ui-resizable");
			if (e.ghost && e.helper) {
				e.helper.get(0).removeChild(e.ghost.get(0))
			}
		}
	});
	c.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var r = c(this).data("ui-resizable"),
				i = r.options,
				s = r.size,
				k = r.originalSize,
				n = r.originalPosition,
				t = r.axis,
				f = typeof i.grid === "number" ? [i.grid, i.grid] : i.grid,
				p = (f[0] || 1),
				m = (f[1] || 1),
				h = Math.round((s.width - k.width) / p) * p,
				g = Math.round((s.height - k.height) / m) * m,
				l = k.width + h,
				e = k.height + g,
				j = i.maxWidth && (i.maxWidth < l),
				u = i.maxHeight && (i.maxHeight < e),
				q = i.minWidth && (i.minWidth > l),
				v = i.minHeight && (i.minHeight > e);
			i.grid = f;
			if (q) {
				l = l + p
			}
			if (v) {
				e = e + m
			}
			if (j) {
				l = l - p
			}
			if (u) {
				e = e - m
			}
			if (/^(se|s|e)$/.test(t)) {
				r.size.width = l;
				r.size.height = e
			} else {
				if (/^(ne)$/.test(t)) {
					r.size.width = l;
					r.size.height = e;
					r.position.top = n.top - g
				} else {
					if (/^(sw)$/.test(t)) {
						r.size.width = l;
						r.size.height = e;
						r.position.left = n.left - h
					} else {
						if (e - m > 0) {
							r.size.height = e;
							r.position.top = n.top - g
						} else {
							r.size.height = m;
							r.position.top = n.top + k.height - m
						}
						if (l - p > 0) {
							r.size.width = l;
							r.position.left = n.left - h
						} else {
							r.size.width = p;
							r.position.left = n.left + k.width - p
						}
					}
				}
			}
		}
	})
})(jQuery);
(function(a, b) {
	a.widget("ui.autocomplete", {
		version: "1.10.4",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: false,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function() {
			var e, c, f, h = this.element[0].nodeName.toLowerCase(),
				g = h === "textarea",
				d = h === "input";
			this.isMultiLine = g ? true : d ? false : this.element.prop("isContentEditable");
			this.valueMethod = this.element[g || d ? "val" : "text"];
			this.isNewMenu = true;
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
			this._on(this.element, {
				keydown: function(i) {
					if (this.element.prop("readOnly")) {
						e = true;
						f = true;
						c = true;
						return
					}
					e = false;
					f = false;
					c = false;
					var j = a.ui.keyCode;
					switch (i.keyCode) {
					case j.PAGE_UP:
						e = true;
						this._move("previousPage", i);
						break;
					case j.PAGE_DOWN:
						e = true;
						this._move("nextPage", i);
						break;
					case j.UP:
						e = true;
						this._keyEvent("previous", i);
						break;
					case j.DOWN:
						e = true;
						this._keyEvent("next", i);
						break;
					case j.ENTER:
					case j.NUMPAD_ENTER:
						if (this.menu.active) {
							e = true;
							i.preventDefault();
							this.menu.select(i)
						}
						break;
					case j.TAB:
						if (this.menu.active) {
							this.menu.select(i)
						}
						break;
					case j.ESCAPE:
						if (this.menu.element.is(":visible")) {
							this._value(this.term);
							this.close(i);
							i.preventDefault()
						}
						break;
					default:
						c = true;
						this._searchTimeout(i);
						break
					}
				},
				keypress: function(i) {
					if (e) {
						e = false;
						if (!this.isMultiLine || this.menu.element.is(":visible")) {
							i.preventDefault()
						}
						return
					}
					if (c) {
						return
					}
					var j = a.ui.keyCode;
					switch (i.keyCode) {
					case j.PAGE_UP:
						this._move("previousPage", i);
						break;
					case j.PAGE_DOWN:
						this._move("nextPage", i);
						break;
					case j.UP:
						this._keyEvent("previous", i);
						break;
					case j.DOWN:
						this._keyEvent("next", i);
						break
					}
				},
				input: function(i) {
					if (f) {
						f = false;
						i.preventDefault();
						return
					}
					this._searchTimeout(i)
				},
				focus: function() {
					this.selectedItem = null;
					this.previous = this._value()
				},
				blur: function(i) {
					if (this.cancelBlur) {
						delete this.cancelBlur;
						return
					}
					clearTimeout(this.searching);
					this.close(i);
					this._change(i)
				}
			});
			this._initSource();
			this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
				role: null
			}).hide().data("ui-menu");
			this._on(this.menu.element, {
				mousedown: function(i) {
					i.preventDefault();
					this.cancelBlur = true;
					this._delay(function() {
						delete this.cancelBlur
					});
					var j = this.menu.element[0];
					if (!a(i.target).closest(".ui-menu-item").length) {
						this._delay(function() {
							var k = this;
							this.document.one("mousedown", function(l) {
								if (l.target !== k.element[0] && l.target !== j && !a.contains(j, l.target)) {
									k.close()
								}
							})
						})
					}
				},
				menufocus: function(j, k) {
					if (this.isNewMenu) {
						this.isNewMenu = false;
						if (j.originalEvent && /^mouse/.test(j.originalEvent.type)) {
							this.menu.blur();
							this.document.one("mousemove", function() {
								a(j.target).trigger(j.originalEvent)
							});
							return
						}
					}
					var i = k.item.data("ui-autocomplete-item");
					if (false !== this._trigger("focus", j, {
						item: i
					})) {
						if (j.originalEvent && /^key/.test(j.originalEvent.type)) {
							this._value(i.value)
						}
					} else {
						this.liveRegion.text(i.value)
					}
				},
				menuselect: function(k, l) {
					var j = l.item.data("ui-autocomplete-item"),
						i = this.previous;
					if (this.element[0] !== this.document[0].activeElement) {
						this.element.focus();
						this.previous = i;
						this._delay(function() {
							this.previous = i;
							this.selectedItem = j
						})
					}
					if (false !== this._trigger("select", k, {
						item: j
					})) {
						this._value(j.value)
					}
					this.term = this._value();
					this.close(k);
					this.selectedItem = j
				}
			});
			this.liveRegion = a("<span>", {
				role: "status",
				"aria-live": "polite"
			}).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
			this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching);
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
			this.menu.element.remove();
			this.liveRegion.remove()
		},
		_setOption: function(c, d) {
			this._super(c, d);
			if (c === "source") {
				this._initSource()
			}
			if (c === "appendTo") {
				this.menu.element.appendTo(this._appendTo())
			}
			if (c === "disabled" && d && this.xhr) {
				this.xhr.abort()
			}
		},
		_appendTo: function() {
			var c = this.options.appendTo;
			if (c) {
				c = c.jquery || c.nodeType ? a(c) : this.document.find(c).eq(0)
			}
			if (!c) {
				c = this.element.closest(".ui-front")
			}
			if (!c.length) {
				c = this.document[0].body
			}
			return c
		},
		_initSource: function() {
			var e, c, d = this;
			if (a.isArray(this.options.source)) {
				e = this.options.source;
				this.source = function(g, f) {
					f(a.ui.autocomplete.filter(e, g.term))
				}
			} else {
				if (typeof this.options.source === "string") {
					c = this.options.source;
					this.source = function(g, f) {
						if (d.xhr) {
							d.xhr.abort()
						}
						d.xhr = a.ajax({
							url: c,
							data: g,
							dataType: "json",
							success: function(h) {
								f(h)
							},
							error: function() {
								f([])
							}
						})
					}
				} else {
					this.source = this.options.source
				}
			}
		},
		_searchTimeout: function(c) {
			clearTimeout(this.searching);
			this.searching = this._delay(function() {
				if (this.term !== this._value()) {
					this.selectedItem = null;
					this.search(null, c)
				}
			}, this.options.delay)
		},
		search: function(d, c) {
			d = d != null ? d : this._value();
			this.term = this._value();
			if (d.length < this.options.minLength) {
				return this.close(c)
			}
			if (this._trigger("search", c) === false) {
				return
			}
			return this._search(d)
		},
		_search: function(c) {
			this.pending++;
			this.element.addClass("ui-autocomplete-loading");
			this.cancelSearch = false;
			this.source({
				term: c
			}, this._response())
		},
		_response: function() {
			var c = ++this.requestIndex;
			return a.proxy(function(d) {
				if (c === this.requestIndex) {
					this.__response(d)
				}
				this.pending--;
				if (!this.pending) {
					this.element.removeClass("ui-autocomplete-loading")
				}
			}, this)
		},
		__response: function(c) {
			if (c) {
				c = this._normalize(c)
			}
			this._trigger("response", null, {
				content: c
			});
			if (!this.options.disabled && c && c.length && !this.cancelSearch) {
				this._suggest(c);
				this._trigger("open")
			} else {
				this._close()
			}
		},
		close: function(c) {
			this.cancelSearch = true;
			this._close(c)
		},
		_close: function(c) {
			if (this.menu.element.is(":visible")) {
				this.menu.element.hide();
				this.menu.blur();
				this.isNewMenu = true;
				this._trigger("close", c)
			}
		},
		_change: function(c) {
			if (this.previous !== this._value()) {
				this._trigger("change", c, {
					item: this.selectedItem
				})
			}
		},
		_normalize: function(c) {
			if (c.length && c[0].label && c[0].value) {
				return c
			}
			return a.map(c, function(d) {
				if (typeof d === "string") {
					return {
						label: d,
						value: d
					}
				}
				return a.extend({
					label: d.label || d.value,
					value: d.value || d.label
				}, d)
			})
		},
		_suggest: function(c) {
			var d = this.menu.element.empty();
			this._renderMenu(d, c);
			this.isNewMenu = true;
			this.menu.refresh();
			d.show();
			this._resizeMenu();
			d.position(a.extend({
				of: this.element
			}, this.options.position));
			if (this.options.autoFocus) {
				this.menu.next()
			}
		},
		_resizeMenu: function() {
			var c = this.menu.element;
			c.outerWidth(Math.max(c.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(d, c) {
			var e = this;
			a.each(c, function(f, g) {
				e._renderItemData(d, g)
			})
		},
		_renderItemData: function(c, d) {
			return this._renderItem(c, d).data("ui-autocomplete-item", d)
		},
		_renderItem: function(c, d) {
			return a("<li>").append(a("<a>").text(d.label)).appendTo(c)
		},
		_move: function(d, c) {
			if (!this.menu.element.is(":visible")) {
				this.search(null, c);
				return
			}
			if (this.menu.isFirstItem() && /^previous/.test(d) || this.menu.isLastItem() && /^next/.test(d)) {
				this._value(this.term);
				this.menu.blur();
				return
			}
			this.menu[d](c)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(d, c) {
			if (!this.isMultiLine || this.menu.element.is(":visible")) {
				this._move(d, c);
				c.preventDefault()
			}
		}
	});
	a.extend(a.ui.autocomplete, {
		escapeRegex: function(c) {
			return c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(e, c) {
			var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
			return a.grep(e, function(f) {
				return d.test(f.label || f.value || f)
			})
		}
	});
	a.widget("ui.autocomplete", a.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(c) {
					return c + (c > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(d) {
			var c;
			this._superApply(arguments);
			if (this.options.disabled || this.cancelSearch) {
				return
			}
			if (d && d.length) {
				c = this.options.messages.results(d.length)
			} else {
				c = this.options.messages.noResults
			}
			this.liveRegion.text(c)
		}
	})
}(jQuery));
(function(e, g) {
	var c, b = "ui-button ui-widget ui-state-default ui-corner-all",
		f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
		d = function() {
			var h = e(this);
			setTimeout(function() {
				h.find(":ui-button").button("refresh")
			}, 1)
		},
		a = function(i) {
			var h = i.name,
				j = i.form,
				k = e([]);
			if (h) {
				h = h.replace(/'/g, "\\'");
				if (j) {
					k = e(j).find("[name='" + h + "']")
				} else {
					k = e("[name='" + h + "']", i.ownerDocument).filter(function() {
						return !this.form
					})
				}
			}
			return k
		};
	e.widget("ui.button", {
		version: "1.10.4",
		defaultElement: "<button>",
		options: {
			disabled: null,
			text: false,
			label: null,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, d);
			if (typeof this.options.disabled !== "boolean") {
				this.options.disabled = !! this.element.prop("disabled")
			} else {
				this.element.prop("disabled", this.options.disabled)
			}
			this._determineButtonType();
			this.hasTitle = !! this.buttonElement.attr("title");
			var j = this,
				h = this.options,
				k = this.type === "checkbox" || this.type === "radio",
				i = !k ? "ui-state-active" : "";
			if (h.label === null) {
				h.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html())
			}
			this._hoverable(this.buttonElement);
			this.buttonElement.addClass(b).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
				if (h.disabled) {
					return
				}
				if (this === c) {
					e(this).addClass("ui-state-active")
				}
			}).bind("mouseleave" + this.eventNamespace, function() {
				if (h.disabled) {
					return
				}
				e(this).removeClass(i)
			}).bind("click" + this.eventNamespace, function(l) {
				if (h.disabled) {
					l.preventDefault();
					l.stopImmediatePropagation()
				}
			});
			this._on({
				focus: function() {
					this.buttonElement.addClass("ui-state-focus")
				},
				blur: function() {
					this.buttonElement.removeClass("ui-state-focus")
				}
			});
			if (k) {
				this.element.bind("change" + this.eventNamespace, function() {
					j.refresh()
				})
			}
			if (this.type === "checkbox") {
				this.buttonElement.bind("click" + this.eventNamespace, function() {
					if (h.disabled) {
						return false
					}
				})
			} else {
				if (this.type === "radio") {
					this.buttonElement.bind("click" + this.eventNamespace, function() {
						if (h.disabled) {
							return false
						}
						e(this).addClass("ui-state-active");
						j.buttonElement.attr("aria-pressed", "true");
						var l = j.element[0];
						a(l).not(l).map(function() {
							return e(this).button("widget")[0]
						}).removeClass("ui-state-active").attr("aria-pressed", "false")
					})
				} else {
					this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
						if (h.disabled) {
							return false
						}
						e(this).addClass("ui-state-active");
						c = this;
						j.document.one("mouseup", function() {
							c = null
						})
					}).bind("mouseup" + this.eventNamespace, function() {
						if (h.disabled) {
							return false
						}
						e(this).removeClass("ui-state-active")
					}).bind("keydown" + this.eventNamespace, function(l) {
						if (h.disabled) {
							return false
						}
						if (l.keyCode === e.ui.keyCode.SPACE || l.keyCode === e.ui.keyCode.ENTER) {
							e(this).addClass("ui-state-active")
						}
					}).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
						e(this).removeClass("ui-state-active")
					});
					if (this.buttonElement.is("a")) {
						this.buttonElement.keyup(function(l) {
							if (l.keyCode === e.ui.keyCode.SPACE) {
								e(this).click()
							}
						})
					}
				}
			}
			this._setOption("disabled", h.disabled);
			this._resetButton()
		},
		_determineButtonType: function() {
			var h, j, i;
			if (this.element.is("[type=checkbox]")) {
				this.type = "checkbox"
			} else {
				if (this.element.is("[type=radio]")) {
					this.type = "radio"
				} else {
					if (this.element.is("input")) {
						this.type = "input"
					} else {
						this.type = "button"
					}
				}
			}
			if (this.type === "checkbox" || this.type === "radio") {
				h = this.element.parents().last();
				j = "label[for='" + this.element.attr("id") + "']";
				this.buttonElement = h.find(j);
				if (!this.buttonElement.length) {
					h = h.length ? h.siblings() : this.element.siblings();
					this.buttonElement = h.filter(j);
					if (!this.buttonElement.length) {
						this.buttonElement = h.find(j)
					}
				}
				this.element.addClass("ui-helper-hidden-accessible");
				i = this.element.is(":checked");
				if (i) {
					this.buttonElement.addClass("ui-state-active")
				}
				this.buttonElement.prop("aria-pressed", i)
			} else {
				this.buttonElement = this.element
			}
		},
		widget: function() {
			return this.buttonElement
		},
		_destroy: function() {
			this.element.removeClass("ui-helper-hidden-accessible");
			this.buttonElement.removeClass(b + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
			if (!this.hasTitle) {
				this.buttonElement.removeAttr("title")
			}
		},
		_setOption: function(h, i) {
			this._super(h, i);
			if (h === "disabled") {
				this.element.prop("disabled", !! i);
				if (i) {
					this.buttonElement.removeClass("ui-state-focus")
				}
				return
			}
			this._resetButton()
		},
		refresh: function() {
			var h = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
			if (h !== this.options.disabled) {
				this._setOption("disabled", h)
			}
			if (this.type === "radio") {
				a(this.element[0]).each(function() {
					if (e(this).is(":checked")) {
						e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true")
					} else {
						e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
					}
				})
			} else {
				if (this.type === "checkbox") {
					if (this.element.is(":checked")) {
						this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true")
					} else {
						this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
					}
				}
			}
		},
		_resetButton: function() {
			if (this.type === "input") {
				if (this.options.label) {
					this.element.val(this.options.label)
				}
				return
			}
			var i = this.buttonElement.removeClass(f),
				h = e("<span></span>", this.document[0]);
			icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
			if (icons.primary || icons.secondary) {
				if (this.options.text) {
					buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : (icons.primary ? "-primary" : "-secondary")))
				}
				if (icons.primary) {
					i.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>")
				}
				if (icons.secondary) {
					i.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>")
				}
				if (!this.options.text) {
					buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only");
					if (!this.hasTitle) {
						i.attr("title", e.trim(h))
					}
				}
			} else {
				buttonClasses.push("ui-button-text-only")
			}
			i.addClass(buttonClasses.join(" "))
		}
	});
	e.widget("ui.buttonset", {
		version: "1.10.4",
		options: {
			items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
		},
		_create: function() {
			this.element.addClass("ui-buttonset")
		},
		_init: function() {
			this.refresh()
		},
		_setOption: function(h, i) {
			if (h === "disabled") {
				this.buttons.button("option", h, i)
			}
			this._super(h, i)
		},
		refresh: function() {
			var h = this.element.css("direction") === "rtl";
			this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(h ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(h ? "ui-corner-left" : "ui-corner-right").end().end()
		},
		_destroy: function() {
			this.element.removeClass("ui-buttonset");
			this.buttons.map(function() {
				return e(this).button("widget")[0]
			}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
		}
	})
}(jQuery));
(function(e, g) {
	e.extend(e.ui, {
		datepicker: {
			version: "1.10.4"
		}
	});
	var f = "datepicker",
		c;

	function b() {
		this._curInst = null;
		this._keyEvent = false;
		this._disabledInputs = [];
		this._datepickerShowing = false;
		this._inDialog = false;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ""
		};
		this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: false,
			hideIfNoPrevNext: false,
			navigationAsDateFormat: false,
			gotoCurrent: false,
			changeMonth: false,
			changeYear: false,
			yearRange: "c-10:c+10",
			showOtherMonths: false,
			selectOtherMonths: false,
			showWeek: false,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: true,
			showButtonPanel: false,
			autoSize: false,
			disabled: false
		};
		e.extend(this._defaults, this.regional[""]);
		this.dpDiv = d(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
	}
	e.extend(b.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(h) {
			a(this._defaults, h || {});
			return this
		},
		_attachDatepicker: function(k, h) {
			var l, j, i;
			l = k.nodeName.toLowerCase();
			j = (l === "div" || l === "span");
			if (!k.id) {
				this.uuid += 1;
				k.id = "dp" + this.uuid
			}
			i = this._newInst(e(k), j);
			i.settings = e.extend({}, h || {});
			if (l === "input") {
				this._connectDatepicker(k, i)
			} else {
				if (j) {
					this._inlineDatepicker(k, i)
				}
			}
		},
		_newInst: function(i, h) {
			var j = i[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: j,
				input: i,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: h,
				dpDiv: (!h ? this.dpDiv : d(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
			}
		},
		_connectDatepicker: function(j, i) {
			var h = e(j);
			i.append = e([]);
			i.trigger = e([]);
			if (h.hasClass(this.markerClassName)) {
				return
			}
			this._attachments(h, i);
			h.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
			this._autoSize(i);
			e.data(j, f, i);
			if (i.settings.disabled) {
				this._disableDatepicker(j)
			}
		},
		_attachments: function(j, m) {
			var i, l, h, n = this._get(m, "appendText"),
				k = this._get(m, "isRTL");
			if (m.append) {
				m.append.remove()
			}
			if (n) {
				m.append = e("<span class='" + this._appendClass + "'>" + n + "</span>");
				j[k ? "before" : "after"](m.append)
			}
			j.unbind("focus", this._showDatepicker);
			if (m.trigger) {
				m.trigger.remove()
			}
			i = this._get(m, "showOn");
			if (i === "focus" || i === "both") {
				j.focus(this._showDatepicker)
			}
			if (i === "button" || i === "both") {
				l = this._get(m, "buttonText");
				h = this._get(m, "buttonImage");
				m.trigger = e(this._get(m, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
					src: h,
					alt: l,
					title: l
				}) : e("<button type='button'></button>").addClass(this._triggerClass).html(!h ? l : e("<img/>").attr({
					src: h,
					alt: l,
					title: l
				})));
				j[k ? "before" : "after"](m.trigger);
				m.trigger.click(function() {
					if (e.datepicker._datepickerShowing && e.datepicker._lastInput === j[0]) {
						e.datepicker._hideDatepicker()
					} else {
						if (e.datepicker._datepickerShowing && e.datepicker._lastInput !== j[0]) {
							e.datepicker._hideDatepicker();
							e.datepicker._showDatepicker(j[0])
						} else {
							e.datepicker._showDatepicker(j[0])
						}
					}
					return false
				})
			}
		},
		_autoSize: function(o) {
			if (this._get(o, "autoSize") && !o.inline) {
				var l, j, k, n, m = new Date(2009, 12 - 1, 20),
					h = this._get(o, "dateFormat");
				if (h.match(/[DM]/)) {
					l = function(i) {
						j = 0;
						k = 0;
						for (n = 0; n < i.length; n++) {
							if (i[n].length > j) {
								j = i[n].length;
								k = n
							}
						}
						return k
					};
					m.setMonth(l(this._get(o, (h.match(/MM/) ? "monthNames" : "monthNamesShort"))));
					m.setDate(l(this._get(o, (h.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - m.getDay())
				}
				o.input.attr("size", this._formatDate(o, m).length)
			}
		},
		_inlineDatepicker: function(i, h) {
			var j = e(i);
			if (j.hasClass(this.markerClassName)) {
				return
			}
			j.addClass(this.markerClassName).append(h.dpDiv);
			e.data(i, f, h);
			this._setDate(h, this._getDefaultDate(h), true);
			this._updateDatepicker(h);
			this._updateAlternate(h);
			if (h.settings.disabled) {
				this._disableDatepicker(i)
			}
			h.dpDiv.css("display", "block")
		},
		_dialogDatepicker: function(o, i, m, j, n) {
			var h, r, l, q, p, k = this._dialogInst;
			if (!k) {
				this.uuid += 1;
				h = "dp" + this.uuid;
				this._dialogInput = e("<input type='text' id='" + h + "' style='position: absolute; top: -100px; width: 0px;'/>");
				this._dialogInput.keydown(this._doKeyDown);
				e("body").append(this._dialogInput);
				k = this._dialogInst = this._newInst(this._dialogInput, false);
				k.settings = {};
				e.data(this._dialogInput[0], f, k)
			}
			a(k.settings, j || {});
			i = (i && i.constructor === Date ? this._formatDate(k, i) : i);
			this._dialogInput.val(i);
			this._pos = (n ? (n.length ? n : [n.pageX, n.pageY]) : null);
			if (!this._pos) {
				r = document.documentElement.clientWidth;
				l = document.documentElement.clientHeight;
				q = document.documentElement.scrollLeft || document.body.scrollLeft;
				p = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = [(r / 2) - 100 + q, (l / 2) - 150 + p]
			}
			this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
			k.settings.onSelect = m;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if (e.blockUI) {
				e.blockUI(this.dpDiv)
			}
			e.data(this._dialogInput[0], f, k);
			return this
		},
		_destroyDatepicker: function(j) {
			var k, h = e(j),
				i = e.data(j, f);
			if (!h.hasClass(this.markerClassName)) {
				return
			}
			k = j.nodeName.toLowerCase();
			e.removeData(j, f);
			if (k === "input") {
				i.append.remove();
				i.trigger.remove();
				h.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
			} else {
				if (k === "div" || k === "span") {
					h.removeClass(this.markerClassName).empty()
				}
			}
		},
		_enableDatepicker: function(k) {
			var l, j, h = e(k),
				i = e.data(k, f);
			if (!h.hasClass(this.markerClassName)) {
				return
			}
			l = k.nodeName.toLowerCase();
			if (l === "input") {
				k.disabled = false;
				i.trigger.filter("button").each(function() {
					this.disabled = false
				}).end().filter("img").css({
					opacity: "1.0",
					cursor: ""
				})
			} else {
				if (l === "div" || l === "span") {
					j = h.children("." + this._inlineClass);
					j.children().removeClass("ui-state-disabled");
					j.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
				}
			}
			this._disabledInputs = e.map(this._disabledInputs, function(m) {
				return (m === k ? null : m)
			})
		},
		_disableDatepicker: function(k) {
			var l, j, h = e(k),
				i = e.data(k, f);
			if (!h.hasClass(this.markerClassName)) {
				return
			}
			l = k.nodeName.toLowerCase();
			if (l === "input") {
				k.disabled = true;
				i.trigger.filter("button").each(function() {
					this.disabled = true
				}).end().filter("img").css({
					opacity: "0.5",
					cursor: "default"
				})
			} else {
				if (l === "div" || l === "span") {
					j = h.children("." + this._inlineClass);
					j.children().addClass("ui-state-disabled");
					j.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
				}
			}
			this._disabledInputs = e.map(this._disabledInputs, function(m) {
				return (m === k ? null : m)
			});
			this._disabledInputs[this._disabledInputs.length] = k
		},
		_isDisabledDatepicker: function(j) {
			if (!j) {
				return false
			}
			for (var h = 0; h < this._disabledInputs.length; h++) {
				if (this._disabledInputs[h] === j) {
					return true
				}
			}
			return false
		},
		_getInst: function(i) {
			try {
				return e.data(i, f)
			} catch (h) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function(n, i, m) {
			var j, h, l, o, k = this._getInst(n);
			if (arguments.length === 2 && typeof i === "string") {
				return (i === "defaults" ? e.extend({}, e.datepicker._defaults) : (k ? (i === "all" ? e.extend({}, k.settings) : this._get(k, i)) : null))
			}
			j = i || {};
			if (typeof i === "string") {
				j = {};
				j[i] = m
			}
			if (k) {
				if (this._curInst === k) {
					this._hideDatepicker()
				}
				h = this._getDateDatepicker(n, true);
				l = this._getMinMaxDate(k, "min");
				o = this._getMinMaxDate(k, "max");
				a(k.settings, j);
				if (l !== null && j.dateFormat !== g && j.minDate === g) {
					k.settings.minDate = this._formatDate(k, l)
				}
				if (o !== null && j.dateFormat !== g && j.maxDate === g) {
					k.settings.maxDate = this._formatDate(k, o)
				}
				if ("disabled" in j) {
					if (j.disabled) {
						this._disableDatepicker(n)
					} else {
						this._enableDatepicker(n)
					}
				}
				this._attachments(e(n), k);
				this._autoSize(k);
				this._setDate(k, h);
				this._updateAlternate(k);
				this._updateDatepicker(k)
			}
		},
		_changeDatepicker: function(j, h, i) {
			this._optionDatepicker(j, h, i)
		},
		_refreshDatepicker: function(i) {
			var h = this._getInst(i);
			if (h) {
				this._updateDatepicker(h)
			}
		},
		_setDateDatepicker: function(j, h) {
			var i = this._getInst(j);
			if (i) {
				this._setDate(i, h);
				this._updateDatepicker(i);
				this._updateAlternate(i)
			}
		},
		_getDateDatepicker: function(j, h) {
			var i = this._getInst(j);
			if (i && !i.inline) {
				this._setDateFromField(i, h)
			}
			return (i ? this._getDate(i) : null)
		},
		_doKeyDown: function(k) {
			var i, h, m, l = e.datepicker._getInst(k.target),
				n = true,
				j = l.dpDiv.is(".ui-datepicker-rtl");
			l._keyEvent = true;
			if (e.datepicker._datepickerShowing) {
				switch (k.keyCode) {
				case 9:
					e.datepicker._hideDatepicker();
					n = false;
					break;
				case 13:
					m = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", l.dpDiv);
					if (m[0]) {
						e.datepicker._selectDay(k.target, l.selectedMonth, l.selectedYear, m[0])
					}
					i = e.datepicker._get(l, "onSelect");
					if (i) {
						h = e.datepicker._formatDate(l);
						i.apply((l.input ? l.input[0] : null), [h, l])
					} else {
						e.datepicker._hideDatepicker()
					}
					return false;
				case 27:
					e.datepicker._hideDatepicker();
					break;
				case 33:
					e.datepicker._adjustDate(k.target, (k.ctrlKey ? -e.datepicker._get(l, "stepBigMonths") : -e.datepicker._get(l, "stepMonths")), "M");
					break;
				case 34:
					e.datepicker._adjustDate(k.target, (k.ctrlKey ? +e.datepicker._get(l, "stepBigMonths") : +e.datepicker._get(l, "stepMonths")), "M");
					break;
				case 35:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._clearDate(k.target)
					}
					n = k.ctrlKey || k.metaKey;
					break;
				case 36:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._gotoToday(k.target)
					}
					n = k.ctrlKey || k.metaKey;
					break;
				case 37:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._adjustDate(k.target, (j ? +1 : -1), "D")
					}
					n = k.ctrlKey || k.metaKey;
					if (k.originalEvent.altKey) {
						e.datepicker._adjustDate(k.target, (k.ctrlKey ? -e.datepicker._get(l, "stepBigMonths") : -e.datepicker._get(l, "stepMonths")), "M")
					}
					break;
				case 38:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._adjustDate(k.target, -7, "D")
					}
					n = k.ctrlKey || k.metaKey;
					break;
				case 39:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._adjustDate(k.target, (j ? -1 : +1), "D")
					}
					n = k.ctrlKey || k.metaKey;
					if (k.originalEvent.altKey) {
						e.datepicker._adjustDate(k.target, (k.ctrlKey ? +e.datepicker._get(l, "stepBigMonths") : +e.datepicker._get(l, "stepMonths")), "M")
					}
					break;
				case 40:
					if (k.ctrlKey || k.metaKey) {
						e.datepicker._adjustDate(k.target, +7, "D")
					}
					n = k.ctrlKey || k.metaKey;
					break;
				default:
					n = false
				}
			} else {
				if (k.keyCode === 36 && k.ctrlKey) {
					e.datepicker._showDatepicker(this)
				} else {
					n = false
				}
			}
			if (n) {
				k.preventDefault();
				k.stopPropagation()
			}
		},
		_doKeyPress: function(j) {
			var i, h, k = e.datepicker._getInst(j.target);
			if (e.datepicker._get(k, "constrainInput")) {
				i = e.datepicker._possibleChars(e.datepicker._get(k, "dateFormat"));
				h = String.fromCharCode(j.charCode == null ? j.keyCode : j.charCode);
				return j.ctrlKey || j.metaKey || (h < " " || !i || i.indexOf(h) > -1)
			}
		},
		_doKeyUp: function(j) {
			var h, k = e.datepicker._getInst(j.target);
			if (k.input.val() !== k.lastVal) {
				try {
					h = e.datepicker.parseDate(e.datepicker._get(k, "dateFormat"), (k.input ? k.input.val() : null), e.datepicker._getFormatConfig(k));
					if (h) {
						e.datepicker._setDateFromField(k);
						e.datepicker._updateAlternate(k);
						e.datepicker._updateDatepicker(k)
					}
				} catch (i) {}
			}
			return true
		},
		_showDatepicker: function(i) {
			i = i.target || i;
			if (i.nodeName.toLowerCase() !== "input") {
				i = e("input", i.parentNode)[0]
			}
			if (e.datepicker._isDisabledDatepicker(i) || e.datepicker._lastInput === i) {
				return
			}
			var k, o, j, m, n, h, l;
			k = e.datepicker._getInst(i);
			if (e.datepicker._curInst && e.datepicker._curInst !== k) {
				e.datepicker._curInst.dpDiv.stop(true, true);
				if (k && e.datepicker._datepickerShowing) {
					e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])
				}
			}
			o = e.datepicker._get(k, "beforeShow");
			j = o ? o.apply(i, [i, k]) : {};
			if (j === false) {
				return
			}
			a(k.settings, j);
			k.lastVal = null;
			e.datepicker._lastInput = i;
			e.datepicker._setDateFromField(k);
			if (e.datepicker._inDialog) {
				i.value = ""
			}
			if (!e.datepicker._pos) {
				e.datepicker._pos = e.datepicker._findPos(i);
				e.datepicker._pos[1] += i.offsetHeight
			}
			m = false;
			e(i).parents().each(function() {
				m |= e(this).css("position") === "fixed";
				return !m
			});
			n = {
				left: e.datepicker._pos[0],
				top: e.datepicker._pos[1]
			};
			e.datepicker._pos = null;
			k.dpDiv.empty();
			k.dpDiv.css({
				position: "absolute",
				display: "block",
				top: "-1000px"
			});
			e.datepicker._updateDatepicker(k);
			n = e.datepicker._checkOffset(k, n, m);
			k.dpDiv.css({
				position: (e.datepicker._inDialog && e.blockUI ? "static" : (m ? "fixed" : "absolute")),
				display: "none",
				left: n.left + "px",
				top: n.top + "px"
			});
			if (!k.inline) {
				h = e.datepicker._get(k, "showAnim");
				l = e.datepicker._get(k, "duration");
				k.dpDiv.zIndex(e(i).zIndex() + 1);
				e.datepicker._datepickerShowing = true;
				if (e.effects && e.effects.effect[h]) {
					k.dpDiv.show(h, e.datepicker._get(k, "showOptions"), l)
				} else {
					k.dpDiv[h || "show"](h ? l : null)
				}
				if (e.datepicker._shouldFocusInput(k)) {
					k.input.focus()
				}
				e.datepicker._curInst = k
			}
		},
		_updateDatepicker: function(j) {
			this.maxRows = 4;
			c = j;
			j.dpDiv.empty().append(this._generateHTML(j));
			this._attachHandlers(j);
			j.dpDiv.find("." + this._dayOverClass + " a").mouseover();
			var l, h = this._getNumberOfMonths(j),
				k = h[1],
				i = 17;
			j.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			if (k > 1) {
				j.dpDiv.addClass("ui-datepicker-multi-" + k).css("width", (i * k) + "em")
			}
			j.dpDiv[(h[0] !== 1 || h[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			j.dpDiv[(this._get(j, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			if (j === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(j)) {
				j.input.focus()
			}
			if (j.yearshtml) {
				l = j.yearshtml;
				setTimeout(function() {
					if (l === j.yearshtml && j.yearshtml) {
						j.dpDiv.find("select.ui-datepicker-year:first").replaceWith(j.yearshtml)
					}
					l = j.yearshtml = null
				}, 0)
			}
		},
		_shouldFocusInput: function(h) {
			return h.input && h.input.is(":visible") && !h.input.is(":disabled") && !h.input.is(":focus")
		},
		_checkOffset: function(m, k, j) {
			var l = m.dpDiv.outerWidth(),
				p = m.dpDiv.outerHeight(),
				o = m.input ? m.input.outerWidth() : 0,
				h = m.input ? m.input.outerHeight() : 0,
				n = document.documentElement.clientWidth + (j ? 0 : e(document).scrollLeft()),
				i = document.documentElement.clientHeight + (j ? 0 : e(document).scrollTop());
			k.left -= (this._get(m, "isRTL") ? (l - o) : 0);
			k.left -= (j && k.left === m.input.offset().left) ? e(document).scrollLeft() : 0;
			k.top -= (j && k.top === (m.input.offset().top + h)) ? e(document).scrollTop() : 0;
			k.left -= Math.min(k.left, (k.left + l > n && n > l) ? Math.abs(k.left + l - n) : 0);
			k.top -= Math.min(k.top, (k.top + p > i && i > p) ? Math.abs(p + h) : 0);
			return k
		},
		_findPos: function(k) {
			var h, j = this._getInst(k),
				i = this._get(j, "isRTL");
			while (k && (k.type === "hidden" || k.nodeType !== 1 || e.expr.filters.hidden(k))) {
				k = k[i ? "previousSibling" : "nextSibling"]
			}
			h = e(k).offset();
			return [h.left, h.top]
		},
		_hideDatepicker: function(j) {
			var i, m, l, h, k = this._curInst;
			if (!k || (j && k !== e.data(j, f))) {
				return
			}
			if (this._datepickerShowing) {
				i = this._get(k, "showAnim");
				m = this._get(k, "duration");
				l = function() {
					e.datepicker._tidyDialog(k)
				};
				if (e.effects && (e.effects.effect[i] || e.effects[i])) {
					k.dpDiv.hide(i, e.datepicker._get(k, "showOptions"), m, l)
				} else {
					k.dpDiv[(i === "slideDown" ? "slideUp" : (i === "fadeIn" ? "fadeOut" : "hide"))]((i ? m : null), l)
				}
				if (!i) {
					l()
				}
				this._datepickerShowing = false;
				h = this._get(k, "onClose");
				if (h) {
					h.apply((k.input ? k.input[0] : null), [(k.input ? k.input.val() : ""), k])
				}
				this._lastInput = null;
				if (this._inDialog) {
					this._dialogInput.css({
						position: "absolute",
						left: "0",
						top: "-100px"
					});
					if (e.blockUI) {
						e.unblockUI();
						e("body").append(this.dpDiv)
					}
				}
				this._inDialog = false
			}
		},
		_tidyDialog: function(h) {
			h.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(i) {
			if (!e.datepicker._curInst) {
				return
			}
			var h = e(i.target),
				j = e.datepicker._getInst(h[0]);
			if (((h[0].id !== e.datepicker._mainDivId && h.parents("#" + e.datepicker._mainDivId).length === 0 && !h.hasClass(e.datepicker.markerClassName) && !h.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && !(e.datepicker._inDialog && e.blockUI))) || (h.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== j)) {
				e.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(l, k, j) {
			var i = e(l),
				h = this._getInst(i[0]);
			if (this._isDisabledDatepicker(i[0])) {
				return
			}
			this._adjustInstDate(h, k + (j === "M" ? this._get(h, "showCurrentAtPos") : 0), j);
			this._updateDatepicker(h)
		},
		_gotoToday: function(k) {
			var h, j = e(k),
				i = this._getInst(j[0]);
			if (this._get(i, "gotoCurrent") && i.currentDay) {
				i.selectedDay = i.currentDay;
				i.drawMonth = i.selectedMonth = i.currentMonth;
				i.drawYear = i.selectedYear = i.currentYear
			} else {
				h = new Date();
				i.selectedDay = h.getDate();
				i.drawMonth = i.selectedMonth = h.getMonth();
				i.drawYear = i.selectedYear = h.getFullYear()
			}
			this._notifyChange(i);
			this._adjustDate(j)
		},
		_selectMonthYear: function(l, h, k) {
			var j = e(l),
				i = this._getInst(j[0]);
			i["selected" + (k === "M" ? "Month" : "Year")] = i["draw" + (k === "M" ? "Month" : "Year")] = parseInt(h.options[h.selectedIndex].value, 10);
			this._notifyChange(i);
			this._adjustDate(j)
		},
		_selectDay: function(m, k, h, l) {
			var i, j = e(m);
			if (e(l).hasClass(this._unselectableClass) || this._isDisabledDatepicker(j[0])) {
				return
			}
			i = this._getInst(j[0]);
			i.selectedDay = i.currentDay = e("a", l).html();
			i.selectedMonth = i.currentMonth = k;
			i.selectedYear = i.currentYear = h;
			this._selectDate(m, this._formatDate(i, i.currentDay, i.currentMonth, i.currentYear))
		},
		_clearDate: function(i) {
			var h = e(i);
			this._selectDate(h, "")
		},
		_selectDate: function(l, h) {
			var i, k = e(l),
				j = this._getInst(k[0]);
			h = (h != null ? h : this._formatDate(j));
			if (j.input) {
				j.input.val(h)
			}
			this._updateAlternate(j);
			i = this._get(j, "onSelect");
			if (i) {
				i.apply((j.input ? j.input[0] : null), [h, j])
			} else {
				if (j.input) {
					j.input.trigger("change")
				}
			}
			if (j.inline) {
				this._updateDatepicker(j)
			} else {
				this._hideDatepicker();
				this._lastInput = j.input[0];
				if (typeof(j.input[0]) !== "object") {
					j.input.focus()
				}
				this._lastInput = null
			}
		},
		_updateAlternate: function(l) {
			var k, j, h, i = this._get(l, "altField");
			if (i) {
				k = this._get(l, "altFormat") || this._get(l, "dateFormat");
				j = this._getDate(l);
				h = this.formatDate(k, j, this._getFormatConfig(l));
				e(i).each(function() {
					e(this).val(h)
				})
			}
		},
		noWeekends: function(i) {
			var h = i.getDay();
			return [(h > 0 && h < 6), ""]
		},
		iso8601Week: function(h) {
			var i, j = new Date(h.getTime());
			j.setDate(j.getDate() + 4 - (j.getDay() || 7));
			i = j.getTime();
			j.setMonth(0);
			j.setDate(1);
			return Math.floor(Math.round((i - j) / 86400000) / 7) + 1
		},
		parseDate: function(x, s, z) {
			if (x == null || s == null) {
				throw "Invalid arguments"
			}
			s = (typeof s === "object" ? s.toString() : s + "");
			if (s === "") {
				return null
			}
			var k, u, i, y = 0,
				n = (z ? z.shortYearCutoff : null) || this._defaults.shortYearCutoff,
				j = (typeof n !== "string" ? n : new Date().getFullYear() % 100 + parseInt(n, 10)),
				q = (z ? z.dayNamesShort : null) || this._defaults.dayNamesShort,
				B = (z ? z.dayNames : null) || this._defaults.dayNames,
				h = (z ? z.monthNamesShort : null) || this._defaults.monthNamesShort,
				l = (z ? z.monthNames : null) || this._defaults.monthNames,
				m = -1,
				C = -1,
				w = -1,
				p = -1,
				v = false,
				A, r = function(E) {
					var F = (k + 1 < x.length && x.charAt(k + 1) === E);
					if (F) {
						k++
					}
					return F
				},
				D = function(G) {
					var E = r(G),
						H = (G === "@" ? 14 : (G === "!" ? 20 : (G === "y" && E ? 4 : (G === "o" ? 3 : 2)))),
						I = new RegExp("^\\d{1," + H + "}"),
						F = s.substring(y).match(I);
					if (!F) {
						throw "Missing number at position " + y
					}
					y += F[0].length;
					return parseInt(F[0], 10)
				},
				o = function(F, G, I) {
					var E = -1,
						H = e.map(r(F) ? I : G, function(K, J) {
							return [[J, K]]
						}).sort(function(K, J) {
							return -(K[1].length - J[1].length)
						});
					e.each(H, function(K, L) {
						var J = L[1];
						if (s.substr(y, J.length).toLowerCase() === J.toLowerCase()) {
							E = L[0];
							y += J.length;
							return false
						}
					});
					if (E !== -1) {
						return E + 1
					} else {
						throw "Unknown name at position " + y
					}
				},
				t = function() {
					if (s.charAt(y) !== x.charAt(k)) {
						throw "Unexpected literal at position " + y
					}
					y++
				};
			for (k = 0; k < x.length; k++) {
				if (v) {
					if (x.charAt(k) === "'" && !r("'")) {
						v = false
					} else {
						t()
					}
				} else {
					switch (x.charAt(k)) {
					case "d":
						w = D("d");
						break;
					case "D":
						o("D", q, B);
						break;
					case "o":
						p = D("o");
						break;
					case "m":
						C = D("m");
						break;
					case "M":
						C = o("M", h, l);
						break;
					case "y":
						m = D("y");
						break;
					case "@":
						A = new Date(D("@"));
						m = A.getFullYear();
						C = A.getMonth() + 1;
						w = A.getDate();
						break;
					case "!":
						A = new Date((D("!") - this._ticksTo1970) / 10000);
						m = A.getFullYear();
						C = A.getMonth() + 1;
						w = A.getDate();
						break;
					case "'":
						if (r("'")) {
							t()
						} else {
							v = true
						}
						break;
					default:
						t()
					}
				}
			}
			if (y < s.length) {
				i = s.substr(y);
				if (!/^\s+/.test(i)) {
					throw "Extra/unparsed characters found in date: " + i
				}
			}
			if (m === -1) {
				m = new Date().getFullYear()
			} else {
				if (m < 100) {
					m += new Date().getFullYear() - new Date().getFullYear() % 100 + (m <= j ? 0 : -100)
				}
			}
			if (p > -1) {
				C = 1;
				w = p;
				do {
					u = this._getDaysInMonth(m, C - 1);
					if (w <= u) {
						break
					}
					C++;
					w -= u
				} while (true)
			}
			A = this._daylightSavingAdjust(new Date(m, C - 1, w));
			if (A.getFullYear() !== m || A.getMonth() + 1 !== C || A.getDate() !== w) {
				throw "Invalid date"
			}
			return A
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
		formatDate: function(q, k, l) {
			if (!k) {
				return ""
			}
			var s, t = (l ? l.dayNamesShort : null) || this._defaults.dayNamesShort,
				i = (l ? l.dayNames : null) || this._defaults.dayNames,
				o = (l ? l.monthNamesShort : null) || this._defaults.monthNamesShort,
				m = (l ? l.monthNames : null) || this._defaults.monthNames,
				r = function(u) {
					var v = (s + 1 < q.length && q.charAt(s + 1) === u);
					if (v) {
						s++
					}
					return v
				},
				h = function(w, x, u) {
					var v = "" + x;
					if (r(w)) {
						while (v.length < u) {
							v = "0" + v
						}
					}
					return v
				},
				n = function(u, w, v, x) {
					return (r(u) ? x[w] : v[w])
				},
				j = "",
				p = false;
			if (k) {
				for (s = 0; s < q.length; s++) {
					if (p) {
						if (q.charAt(s) === "'" && !r("'")) {
							p = false
						} else {
							j += q.charAt(s)
						}
					} else {
						switch (q.charAt(s)) {
						case "d":
							j += h("d", k.getDate(), 2);
							break;
						case "D":
							j += n("D", k.getDay(), t, i);
							break;
						case "o":
							j += h("o", Math.round((new Date(k.getFullYear(), k.getMonth(), k.getDate()).getTime() - new Date(k.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							j += h("m", k.getMonth() + 1, 2);
							break;
						case "M":
							j += n("M", k.getMonth(), o, m);
							break;
						case "y":
							j += (r("y") ? k.getFullYear() : (k.getYear() % 100 < 10 ? "0" : "") + k.getYear() % 100);
							break;
						case "@":
							j += k.getTime();
							break;
						case "!":
							j += k.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (r("'")) {
								j += "'"
							} else {
								p = true
							}
							break;
						default:
							j += q.charAt(s)
						}
					}
				}
			}
			return j
		},
		_possibleChars: function(l) {
			var k, j = "",
				i = false,
				h = function(m) {
					var n = (k + 1 < l.length && l.charAt(k + 1) === m);
					if (n) {
						k++
					}
					return n
				};
			for (k = 0; k < l.length; k++) {
				if (i) {
					if (l.charAt(k) === "'" && !h("'")) {
						i = false
					} else {
						j += l.charAt(k)
					}
				} else {
					switch (l.charAt(k)) {
					case "d":
					case "m":
					case "y":
					case "@":
						j += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						if (h("'")) {
							j += "'"
						} else {
							i = true
						}
						break;
					default:
						j += l.charAt(k)
					}
				}
			}
			return j
		},
		_get: function(i, h) {
			return i.settings[h] !== g ? i.settings[h] : this._defaults[h]
		},
		_setDateFromField: function(m, j) {
			if (m.input.val() === m.lastVal) {
				return
			}
			var h = this._get(m, "dateFormat"),
				o = m.lastVal = m.input ? m.input.val() : null,
				n = this._getDefaultDate(m),
				i = n,
				k = this._getFormatConfig(m);
			try {
				i = this.parseDate(h, o, k) || n
			} catch (l) {
				o = (j ? "" : o)
			}
			m.selectedDay = i.getDate();
			m.drawMonth = m.selectedMonth = i.getMonth();
			m.drawYear = m.selectedYear = i.getFullYear();
			m.currentDay = (o ? i.getDate() : 0);
			m.currentMonth = (o ? i.getMonth() : 0);
			m.currentYear = (o ? i.getFullYear() : 0);
			this._adjustInstDate(m)
		},
		_getDefaultDate: function(h) {
			return this._restrictMinMax(h, this._determineDate(h, this._get(h, "defaultDate"), new Date()))
		},
		_determineDate: function(l, i, m) {
			var k = function(o) {
					var n = new Date();
					n.setDate(n.getDate() + o);
					return n
				},
				j = function(u) {
					try {
						return e.datepicker.parseDate(e.datepicker._get(l, "dateFormat"), u, e.datepicker._getFormatConfig(l))
					} catch (t) {}
					var o = (u.toLowerCase().match(/^c/) ? e.datepicker._getDate(l) : null) || new Date(),
						p = o.getFullYear(),
						s = o.getMonth(),
						n = o.getDate(),
						r = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
						q = r.exec(u);
					while (q) {
						switch (q[2] || "d") {
						case "d":
						case "D":
							n += parseInt(q[1], 10);
							break;
						case "w":
						case "W":
							n += parseInt(q[1], 10) * 7;
							break;
						case "m":
						case "M":
							s += parseInt(q[1], 10);
							n = Math.min(n, e.datepicker._getDaysInMonth(p, s));
							break;
						case "y":
						case "Y":
							p += parseInt(q[1], 10);
							n = Math.min(n, e.datepicker._getDaysInMonth(p, s));
							break
						}
						q = r.exec(u)
					}
					return new Date(p, s, n)
				},
				h = (i == null || i === "" ? m : (typeof i === "string" ? j(i) : (typeof i === "number" ? (isNaN(i) ? m : k(i)) : new Date(i.getTime()))));
			h = (h && h.toString() === "Invalid Date" ? m : h);
			if (h) {
				h.setHours(0);
				h.setMinutes(0);
				h.setSeconds(0);
				h.setMilliseconds(0)
			}
			return this._daylightSavingAdjust(h)
		},
		_daylightSavingAdjust: function(h) {
			if (!h) {
				return null
			}
			h.setHours(h.getHours() > 12 ? h.getHours() + 2 : 0);
			return h
		},
		_setDate: function(n, k, m) {
			var h = !k,
				j = n.selectedMonth,
				l = n.selectedYear,
				i = this._restrictMinMax(n, this._determineDate(n, k, new Date()));
			n.selectedDay = n.currentDay = i.getDate();
			n.drawMonth = n.selectedMonth = n.currentMonth = i.getMonth();
			n.drawYear = n.selectedYear = n.currentYear = i.getFullYear();
			if ((j !== n.selectedMonth || l !== n.selectedYear) && !m) {
				this._notifyChange(n)
			}
			this._adjustInstDate(n);
			if (n.input) {
				n.input.val(h ? "" : this._formatDate(n))
			}
		},
		_getDate: function(i) {
			var h = (!i.currentYear || (i.input && i.input.val() === "") ? null : this._daylightSavingAdjust(new Date(i.currentYear, i.currentMonth, i.currentDay)));
			return h
		},
		_attachHandlers: function(i) {
			var h = this._get(i, "stepMonths"),
				j = "#" + i.id.replace(/\\\\/g, "\\");
			i.dpDiv.find("[data-handler]").map(function() {
				var k = {
					prev: function() {
						e.datepicker._adjustDate(j, -h, "M")
					},
					next: function() {
						e.datepicker._adjustDate(j, +h, "M")
					},
					hide: function() {
						e.datepicker._hideDatepicker()
					},
					today: function() {
						e.datepicker._gotoToday(j)
					},
					selectDay: function() {
						e.datepicker._selectDay(j, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
						return false
					},
					selectMonth: function() {
						e.datepicker._selectMonthYear(j, this, "M");
						return false
					},
					selectYear: function() {
						e.datepicker._selectMonthYear(j, this, "Y");
						return false
					}
				};
				e(this).bind(this.getAttribute("data-event"), k[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(X) {
			var A, z, S, K, l, ab, V, O, ae, I, ai, s, u, t, i, aa, q, D, ad, Q, aj, C, H, r, m, T, M, P, N, p, F, v, W, Z, k, ac, ag, L, w, Y = new Date(),
				B = this._daylightSavingAdjust(new Date(Y.getFullYear(), Y.getMonth(), Y.getDate())),
				af = this._get(X, "isRTL"),
				ah = this._get(X, "showButtonPanel"),
				R = this._get(X, "hideIfNoPrevNext"),
				G = this._get(X, "navigationAsDateFormat"),
				x = this._getNumberOfMonths(X),
				o = this._get(X, "showCurrentAtPos"),
				J = this._get(X, "stepMonths"),
				E = (x[0] !== 1 || x[1] !== 1),
				j = this._daylightSavingAdjust((!X.currentDay ? new Date(9999, 9, 9) : new Date(X.currentYear, X.currentMonth, X.currentDay))),
				n = this._getMinMaxDate(X, "min"),
				y = this._getMinMaxDate(X, "max"),
				h = X.drawMonth - o,
				U = X.drawYear;
			if (h < 0) {
				h += 12;
				U--
			}
			if (y) {
				A = this._daylightSavingAdjust(new Date(y.getFullYear(), y.getMonth() - (x[0] * x[1]) + 1, y.getDate()));
				A = (n && A < n ? n : A);
				while (this._daylightSavingAdjust(new Date(U, h, 1)) > A) {
					h--;
					if (h < 0) {
						h = 11;
						U--
					}
				}
			}
			X.drawMonth = h;
			X.drawYear = U;
			z = this._get(X, "prevText");
			z = (!G ? z : this.formatDate(z, this._daylightSavingAdjust(new Date(U, h - J, 1)), this._getFormatConfig(X)));
			S = (this._canAdjustMonth(X, -1, U, h) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + z + "'><span class='ui-icon ui-icon-circle-triangle-" + (af ? "e" : "w") + "'>" + z + "</span></a>" : (R ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + z + "'><span class='ui-icon ui-icon-circle-triangle-" + (af ? "e" : "w") + "'>" + z + "</span></a>"));
			K = this._get(X, "nextText");
			K = (!G ? K : this.formatDate(K, this._daylightSavingAdjust(new Date(U, h + J, 1)), this._getFormatConfig(X)));
			l = (this._canAdjustMonth(X, +1, U, h) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + K + "'><span class='ui-icon ui-icon-circle-triangle-" + (af ? "w" : "e") + "'>" + K + "</span></a>" : (R ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + K + "'><span class='ui-icon ui-icon-circle-triangle-" + (af ? "w" : "e") + "'>" + K + "</span></a>"));
			ab = this._get(X, "currentText");
			V = (this._get(X, "gotoCurrent") && X.currentDay ? j : B);
			ab = (!G ? ab : this.formatDate(ab, V, this._getFormatConfig(X)));
			O = (!X.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(X, "closeText") + "</button>" : "");
			ae = (ah) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (af ? O : "") + (this._isInRange(X, V) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + ab + "</button>" : "") + (af ? "" : O) + "</div>" : "";
			I = parseInt(this._get(X, "firstDay"), 10);
			I = (isNaN(I) ? 0 : I);
			ai = this._get(X, "showWeek");
			s = this._get(X, "dayNames");
			u = this._get(X, "dayNamesMin");
			t = this._get(X, "monthNames");
			i = this._get(X, "monthNamesShort");
			aa = this._get(X, "beforeShowDay");
			q = this._get(X, "showOtherMonths");
			D = this._get(X, "selectOtherMonths");
			ad = this._getDefaultDate(X);
			Q = "";
			aj;
			for (C = 0; C < x[0]; C++) {
				H = "";
				this.maxRows = 4;
				for (r = 0; r < x[1]; r++) {
					m = this._daylightSavingAdjust(new Date(U, h, X.selectedDay));
					T = " ui-corner-all";
					M = "";
					if (E) {
						M += "<div class='ui-datepicker-group";
						if (x[1] > 1) {
							switch (r) {
							case 0:
								M += " ui-datepicker-group-first";
								T = " ui-corner-" + (af ? "right" : "left");
								break;
							case x[1] - 1:
								M += " ui-datepicker-group-last";
								T = " ui-corner-" + (af ? "left" : "right");
								break;
							default:
								M += " ui-datepicker-group-middle";
								T = "";
								break
							}
						}
						M += "'>"
					}
					M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && C === 0 ? (af ? l : S) : "") + (/all|right/.test(T) && C === 0 ? (af ? S : l) : "") + this._generateMonthYearHeader(X, h, U, n, y, C > 0 || r > 0, t, i) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
					P = (ai ? "<th class='ui-datepicker-week-col'>" + this._get(X, "weekHeader") + "</th>" : "");
					for (aj = 0; aj < 7; aj++) {
						N = (aj + I) % 7;
						P += "<th" + ((aj + I + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + s[N] + "'>" + u[N] + "</span></th>"
					}
					M += P + "</tr></thead><tbody>";
					p = this._getDaysInMonth(U, h);
					if (U === X.selectedYear && h === X.selectedMonth) {
						X.selectedDay = Math.min(X.selectedDay, p)
					}
					F = (this._getFirstDayOfMonth(U, h) - I + 7) % 7;
					v = Math.ceil((F + p) / 7);
					W = (E ? this.maxRows > v ? this.maxRows : v : v);
					this.maxRows = W;
					Z = this._daylightSavingAdjust(new Date(U, h, 1 - F));
					for (k = 0; k < W; k++) {
						M += "<tr>";
						ac = (!ai ? "" : "<td class='ui-datepicker-week-col'>" + this._get(X, "calculateWeek")(Z) + "</td>");
						for (aj = 0; aj < 7; aj++) {
							ag = (aa ? aa.apply((X.input ? X.input[0] : null), [Z]) : [true, ""]);
							L = (Z.getMonth() !== h);
							w = (L && !D) || !ag[0] || (n && Z < n) || (y && Z > y);
							ac += "<td class='" + ((aj + I + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + ((Z.getTime() === m.getTime() && h === X.selectedMonth && X._keyEvent) || (ad.getTime() === Z.getTime() && ad.getTime() === m.getTime()) ? " " + this._dayOverClass : "") + (w ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !q ? "" : " " + ag[1] + (Z.getTime() === j.getTime() ? " " + this._currentClass : "") + (Z.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!L || q) && ag[2] ? " title='" + ag[2].replace(/'/g, "&#39;") + "'" : "") + (w ? "" : " data-handler='selectDay' data-event='click' data-month='" + Z.getMonth() + "' data-year='" + Z.getFullYear() + "'") + ">" + (L && !q ? "&#xa0;" : (w ? "<span class='ui-state-default'>" + Z.getDate() + "</span>" : "<a class='ui-state-default" + (Z.getTime() === B.getTime() ? " ui-state-highlight" : "") + (Z.getTime() === j.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + Z.getDate() + "</a>")) + "</td>";
							Z.setDate(Z.getDate() + 1);
							Z = this._daylightSavingAdjust(Z)
						}
						M += ac + "</tr>"
					}
					h++;
					if (h > 11) {
						h = 0;
						U++
					}
					M += "</tbody></table>" + (E ? "</div>" + ((x[0] > 0 && r === x[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
					H += M
				}
				Q += H
			}
			Q += ae;
			X._keyEvent = false;
			return Q
		},
		_generateMonthYearHeader: function(l, j, t, n, r, u, p, h) {
			var y, i, z, w, m, v, s, o, k = this._get(l, "changeMonth"),
				A = this._get(l, "changeYear"),
				B = this._get(l, "showMonthAfterYear"),
				q = "<div class='ui-datepicker-title'>",
				x = "";
			if (u || !k) {
				x += "<span class='ui-datepicker-month'>" + p[j] + "</span>"
			} else {
				y = (n && n.getFullYear() === t);
				i = (r && r.getFullYear() === t);
				x += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
				for (z = 0; z < 12; z++) {
					if ((!y || z >= n.getMonth()) && (!i || z <= r.getMonth())) {
						x += "<option value='" + z + "'" + (z === j ? " selected='selected'" : "") + ">" + h[z] + "</option>"
					}
				}
				x += "</select>"
			}
			if (!B) {
				q += x + (u || !(k && A) ? "&#xa0;" : "")
			}
			if (!l.yearshtml) {
				l.yearshtml = "";
				if (u || !A) {
					q += "<span class='ui-datepicker-year'>" + t + "</span>"
				} else {
					w = this._get(l, "yearRange").split(":");
					m = new Date().getFullYear();
					v = function(D) {
						var C = (D.match(/c[+\-].*/) ? t + parseInt(D.substring(1), 10) : (D.match(/[+\-].*/) ? m + parseInt(D, 10) : parseInt(D, 10)));
						return (isNaN(C) ? m : C)
					};
					s = v(w[0]);
					o = Math.max(s, v(w[1] || ""));
					s = (n ? Math.max(s, n.getFullYear()) : s);
					o = (r ? Math.min(o, r.getFullYear()) : o);
					l.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
					for (; s <= o; s++) {
						l.yearshtml += "<option value='" + s + "'" + (s === t ? " selected='selected'" : "") + ">" + s + "</option>"
					}
					l.yearshtml += "</select>";
					q += l.yearshtml;
					l.yearshtml = null
				}
			}
			q += this._get(l, "yearSuffix");
			if (B) {
				q += (u || !(k && A) ? "&#xa0;" : "") + x
			}
			q += "</div>";
			return q
		},
		_adjustInstDate: function(k, n, m) {
			var j = k.drawYear + (m === "Y" ? n : 0),
				l = k.drawMonth + (m === "M" ? n : 0),
				h = Math.min(k.selectedDay, this._getDaysInMonth(j, l)) + (m === "D" ? n : 0),
				i = this._restrictMinMax(k, this._daylightSavingAdjust(new Date(j, l, h)));
			k.selectedDay = i.getDate();
			k.drawMonth = k.selectedMonth = i.getMonth();
			k.drawYear = k.selectedYear = i.getFullYear();
			if (m === "M" || m === "Y") {
				this._notifyChange(k)
			}
		},
		_restrictMinMax: function(k, i) {
			var j = this._getMinMaxDate(k, "min"),
				l = this._getMinMaxDate(k, "max"),
				h = (j && i < j ? j : i);
			return (l && h > l ? l : h)
		},
		_notifyChange: function(i) {
			var h = this._get(i, "onChangeMonthYear");
			if (h) {
				h.apply((i.input ? i.input[0] : null), [i.selectedYear, i.selectedMonth + 1, i])
			}
		},
		_getNumberOfMonths: function(i) {
			var h = this._get(i, "numberOfMonths");
			return (h == null ? [1, 1] : (typeof h === "number" ? [1, h] : h))
		},
		_getMinMaxDate: function(i, h) {
			return this._determineDate(i, this._get(i, h + "Date"), null)
		},
		_getDaysInMonth: function(h, i) {
			return 32 - this._daylightSavingAdjust(new Date(h, i, 32)).getDate()
		},
		_getFirstDayOfMonth: function(h, i) {
			return new Date(h, i, 1).getDay()
		},
		_canAdjustMonth: function(k, m, j, l) {
			var h = this._getNumberOfMonths(k),
				i = this._daylightSavingAdjust(new Date(j, l + (m < 0 ? m : h[0] * h[1]), 1));
			if (m < 0) {
				i.setDate(this._getDaysInMonth(i.getFullYear(), i.getMonth()))
			}
			return this._isInRange(k, i)
		},
		_isInRange: function(l, j) {
			var i, o, k = this._getMinMaxDate(l, "min"),
				h = this._getMinMaxDate(l, "max"),
				p = null,
				m = null,
				n = this._get(l, "yearRange");
			if (n) {
				i = n.split(":");
				o = new Date().getFullYear();
				p = parseInt(i[0], 10);
				m = parseInt(i[1], 10);
				if (i[0].match(/[+\-].*/)) {
					p += o
				}
				if (i[1].match(/[+\-].*/)) {
					m += o
				}
			}
			return ((!k || j.getTime() >= k.getTime()) && (!h || j.getTime() <= h.getTime()) && (!p || j.getFullYear() >= p) && (!m || j.getFullYear() <= m))
		},
		_getFormatConfig: function(h) {
			var i = this._get(h, "shortYearCutoff");
			i = (typeof i !== "string" ? i : new Date().getFullYear() % 100 + parseInt(i, 10));
			return {
				shortYearCutoff: i,
				dayNamesShort: this._get(h, "dayNamesShort"),
				dayNames: this._get(h, "dayNames"),
				monthNamesShort: this._get(h, "monthNamesShort"),
				monthNames: this._get(h, "monthNames")
			}
		},
		_formatDate: function(k, h, l, j) {
			if (!h) {
				k.currentDay = k.selectedDay;
				k.currentMonth = k.selectedMonth;
				k.currentYear = k.selectedYear
			}
			var i = (h ? (typeof h === "object" ? h : this._daylightSavingAdjust(new Date(j, l, h))) : this._daylightSavingAdjust(new Date(k.currentYear, k.currentMonth, k.currentDay)));
			return this.formatDate(this._get(k, "dateFormat"), i, this._getFormatConfig(k))
		}
	});

	function d(i) {
		var h = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return i.delegate(h, "mouseout", function() {
			e(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				e(this).removeClass("ui-datepicker-prev-hover")
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				e(this).removeClass("ui-datepicker-next-hover")
			}
		}).delegate(h, "mouseover", function() {
			if (!e.datepicker._isDisabledDatepicker(c.inline ? i.parent()[0] : c.input[0])) {
				e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
				e(this).addClass("ui-state-hover");
				if (this.className.indexOf("ui-datepicker-prev") !== -1) {
					e(this).addClass("ui-datepicker-prev-hover")
				}
				if (this.className.indexOf("ui-datepicker-next") !== -1) {
					e(this).addClass("ui-datepicker-next-hover")
				}
			}
		})
	}
	function a(j, i) {
		e.extend(j, i);
		for (var h in i) {
			if (i[h] == null) {
				j[h] = i[h]
			}
		}
		return j
	}
	e.fn.datepicker = function(i) {
		if (!this.length) {
			return this
		}
		if (!e.datepicker.initialized) {
			e(document).mousedown(e.datepicker._checkExternalClick);
			e.datepicker.initialized = true
		}
		if (e("#" + e.datepicker._mainDivId).length === 0) {
			e("body").append(e.datepicker.dpDiv)
		}
		var h = Array.prototype.slice.call(arguments, 1);
		if (typeof i === "string" && (i === "isDisabled" || i === "getDate" || i === "widget")) {
			return e.datepicker["_" + i + "Datepicker"].apply(e.datepicker, [this[0]].concat(h))
		}
		if (i === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
			return e.datepicker["_" + i + "Datepicker"].apply(e.datepicker, [this[0]].concat(h))
		}
		return this.each(function() {
			typeof i === "string" ? e.datepicker["_" + i + "Datepicker"].apply(e.datepicker, [this].concat(h)) : e.datepicker._attachDatepicker(this, i)
		})
	};
	e.datepicker = new b();
	e.datepicker.initialized = false;
	e.datepicker.uuid = new Date().getTime();
	e.datepicker.version = "1.10.4"
})(jQuery);
(function(c, d) {
	var a = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
		b = {
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true
		};
	c.widget("ui.dialog", {
		version: "1.10.4",
		options: {
			appendTo: "body",
			autoOpen: true,
			buttons: [],
			closeOnEscape: true,
			closeText: "close",
			dialogClass: "",
			draggable: true,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: false,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				using: function(f) {
					var e = c(this).css(f).offset().top;
					if (e < 0) {
						c(this).css("top", f.top - e)
					}
				}
			},
			resizable: true,
			show: null,
			title: null,
			width: 300,
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
		_create: function() {
			this.originalCss = {
				display: this.element[0].style.display,
				width: this.element[0].style.width,
				minHeight: this.element[0].style.minHeight,
				maxHeight: this.element[0].style.maxHeight,
				height: this.element[0].style.height
			};
			this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index(this.element)
			};
			this.originalTitle = this.element.attr("title");
			this.options.title = this.options.title || this.originalTitle;
			this._createWrapper();
			this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
			this._createTitlebar();
			this._createButtonPane();
			if (this.options.draggable && c.fn.draggable) {
				this._makeDraggable()
			}
			if (this.options.resizable && c.fn.resizable) {
				this._makeResizable()
			}
			this._isOpen = false
		},
		_init: function() {
			if (this.options.autoOpen) {
				this.open()
			}
		},
		_appendTo: function() {
			var e = this.options.appendTo;
			if (e && (e.jquery || e.nodeType)) {
				return c(e)
			}
			return this.document.find(e || "body").eq(0)
		},
		_destroy: function() {
			var f, e = this.originalPosition;
			this._destroyOverlay();
			this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
			this.uiDialog.stop(true, true).remove();
			if (this.originalTitle) {
				this.element.attr("title", this.originalTitle)
			}
			f = e.parent.children().eq(e.index);
			if (f.length && f[0] !== this.element[0]) {
				f.before(this.element)
			} else {
				e.parent.append(this.element)
			}
		},
		widget: function() {
			return this.uiDialog
		},
		disable: c.noop,
		enable: c.noop,
		close: function(h) {
			var g, f = this;
			if (!this._isOpen || this._trigger("beforeClose", h) === false) {
				return
			}
			this._isOpen = false;
			this._destroyOverlay();
			if (!this.opener.filter(":focusable").focus().length) {
				try {
					g = this.document[0].activeElement;
					if (g && g.nodeName.toLowerCase() !== "body") {
						c(g).blur()
					}
				} catch (e) {}
			}
			this._hide(this.uiDialog, this.options.hide, function() {
				f._trigger("close", h)
			})
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function() {
			this._moveToTop()
		},
		_moveToTop: function(g, e) {
			var f = !! this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
			if (f && !e) {
				this._trigger("focus", g)
			}
			return f
		},
		open: function() {
			var e = this;
			if (this._isOpen) {
				if (this._moveToTop()) {
					this._focusTabbable()
				}
				return
			}
			this._isOpen = true;
			this.opener = c(this.document[0].activeElement);
			this._size();
			this._position();
			this._createOverlay();
			this._moveToTop(null, true);
			this._show(this.uiDialog, this.options.show, function() {
				e._focusTabbable();
				e._trigger("focus")
			});
			this._trigger("open")
		},
		_focusTabbable: function() {
			var e = this.element.find("[autofocus]");
			if (!e.length) {
				e = this.element.find(":tabbable")
			}
			if (!e.length) {
				e = this.uiDialogButtonPane.find(":tabbable")
			}
			if (!e.length) {
				e = this.uiDialogTitlebarClose.filter(":tabbable")
			}
			if (!e.length) {
				e = this.uiDialog
			}
			e.eq(0).focus()
		},
		_keepFocus: function(e) {
			function f() {
				var h = this.document[0].activeElement,
					g = this.uiDialog[0] === h || c.contains(this.uiDialog[0], h);
				if (!g) {
					this._focusTabbable()
				}
			}
			e.preventDefault();
			f.call(this);
			this._delay(f)
		},
		_createWrapper: function() {
			this.uiDialog = c("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
				tabIndex: -1,
				role: "dialog"
			}).appendTo(this._appendTo());
			this._on(this.uiDialog, {
				keydown: function(g) {
					if (this.options.closeOnEscape && !g.isDefaultPrevented() && g.keyCode && g.keyCode === c.ui.keyCode.ESCAPE) {
						g.preventDefault();
						this.close(g);
						return
					}
					if (g.keyCode !== c.ui.keyCode.TAB) {
						return
					}
					var f = this.uiDialog.find(":tabbable"),
						h = f.filter(":first"),
						e = f.filter(":last");
					if ((g.target === e[0] || g.target === this.uiDialog[0]) && !g.shiftKey) {
						h.focus(1);
						g.preventDefault()
					} else {
						if ((g.target === h[0] || g.target === this.uiDialog[0]) && g.shiftKey) {
							e.focus(1);
							g.preventDefault()
						}
					}
				},
				mousedown: function(e) {
					if (this._moveToTop(e)) {
						this._focusTabbable()
					}
				}
			});
			if (!this.element.find("[aria-describedby]").length) {
				this.uiDialog.attr({
					"aria-describedby": this.element.uniqueId().attr("id")
				})
			}
		},
		_createTitlebar: function() {
			var e;
			this.uiDialogTitlebar = c("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
			this._on(this.uiDialogTitlebar, {
				mousedown: function(f) {
					if (!c(f.target).closest(".ui-dialog-titlebar-close")) {
						this.uiDialog.focus()
					}
				}
			});
			this.uiDialogTitlebarClose = c("<button type='button'></button>").button({
				label: this.options.closeText,
				text: false
			}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
			this._on(this.uiDialogTitlebarClose, {
				click: function(f) {
					f.preventDefault();
					this.close(f)
				}
			});
			e = c("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
			this._title(e);
			this.uiDialog.attr({
				"aria-labelledby": e.attr("id")
			})
		},
		_title: function(e) {
			if (!this.options.title) {
				e.html("&#160;")
			}
			e.text(this.options.title)
		},
		_createButtonPane: function() {
			this.uiDialogButtonPane = c("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
			this.uiButtonSet = c("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
			this._createButtons()
		},
		_createButtons: function() {
			var f = this,
				e = this.options.buttons;
			this.uiDialogButtonPane.remove();
			this.uiButtonSet.empty();
			if (c.isEmptyObject(e) || (c.isArray(e) && !e.length)) {
				this.uiDialog.removeClass("ui-dialog-buttons");
				return
			}
			c.each(e, function(g, h) {
				var i, j;
				h = c.isFunction(h) ? {
					click: h,
					text: g
				} : h;
				h = c.extend({
					type: "button"
				}, h);
				i = h.click;
				h.click = function() {
					i.apply(f.element[0], arguments)
				};
				j = {
					icons: h.icons,
					text: h.showText
				};
				delete h.icons;
				delete h.showText;
				c("<button></button>", h).button(j).appendTo(f.uiButtonSet)
			});
			this.uiDialog.addClass("ui-dialog-buttons");
			this.uiDialogButtonPane.appendTo(this.uiDialog)
		},
		_makeDraggable: function() {
			var g = this,
				f = this.options;

			function e(h) {
				return {
					position: h.position,
					offset: h.offset
				}
			}
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(h, i) {
					c(this).addClass("ui-dialog-dragging");
					g._blockFrames();
					g._trigger("dragStart", h, e(i))
				},
				drag: function(h, i) {
					g._trigger("drag", h, e(i))
				},
				stop: function(h, i) {
					f.position = [i.position.left - g.document.scrollLeft(), i.position.top - g.document.scrollTop()];
					c(this).removeClass("ui-dialog-dragging");
					g._unblockFrames();
					g._trigger("dragStop", h, e(i))
				}
			})
		},
		_makeResizable: function() {
			var j = this,
				h = this.options,
				i = h.resizable,
				e = this.uiDialog.css("position"),
				g = typeof i === "string" ? i : "n,e,s,w,se,sw,ne,nw";

			function f(k) {
				return {
					originalPosition: k.originalPosition,
					originalSize: k.originalSize,
					position: k.position,
					size: k.size
				}
			}
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: h.maxWidth,
				maxHeight: h.maxHeight,
				minWidth: h.minWidth,
				minHeight: this._minHeight(),
				handles: g,
				start: function(k, l) {
					c(this).addClass("ui-dialog-resizing");
					j._blockFrames();
					j._trigger("resizeStart", k, f(l))
				},
				resize: function(k, l) {
					j._trigger("resize", k, f(l))
				},
				stop: function(k, l) {
					h.height = c(this).height();
					h.width = c(this).width();
					c(this).removeClass("ui-dialog-resizing");
					j._unblockFrames();
					j._trigger("resizeStop", k, f(l))
				}
			}).css("position", e)
		},
		_minHeight: function() {
			var e = this.options;
			return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
		},
		_position: function() {
			var e = this.uiDialog.is(":visible");
			if (!e) {
				this.uiDialog.show()
			}
			this.uiDialog.position(this.options.position);
			if (!e) {
				this.uiDialog.hide()
			}
		},
		_setOptions: function(g) {
			var h = this,
				f = false,
				e = {};
			c.each(g, function(i, j) {
				h._setOption(i, j);
				if (i in a) {
					f = true
				}
				if (i in b) {
					e[i] = j
				}
			});
			if (f) {
				this._size();
				this._position()
			}
			if (this.uiDialog.is(":data(ui-resizable)")) {
				this.uiDialog.resizable("option", e)
			}
		},
		_setOption: function(g, h) {
			var f, i, e = this.uiDialog;
			if (g === "dialogClass") {
				e.removeClass(this.options.dialogClass).addClass(h)
			}
			if (g === "disabled") {
				return
			}
			this._super(g, h);
			if (g === "appendTo") {
				this.uiDialog.appendTo(this._appendTo())
			}
			if (g === "buttons") {
				this._createButtons()
			}
			if (g === "closeText") {
				this.uiDialogTitlebarClose.button({
					label: "" + h
				})
			}
			if (g === "draggable") {
				f = e.is(":data(ui-draggable)");
				if (f && !h) {
					e.draggable("destroy")
				}
				if (!f && h) {
					this._makeDraggable()
				}
			}
			if (g === "position") {
				this._position()
			}
			if (g === "resizable") {
				i = e.is(":data(ui-resizable)");
				if (i && !h) {
					e.resizable("destroy")
				}
				if (i && typeof h === "string") {
					e.resizable("option", "handles", h)
				}
				if (!i && h !== false) {
					this._makeResizable()
				}
			}
			if (g === "title") {
				this._title(this.uiDialogTitlebar.find(".ui-dialog-title"))
			}
		},
		_size: function() {
			var e, g, h, f = this.options;
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			});
			if (f.minWidth > f.width) {
				f.width = f.minWidth
			}
			e = this.uiDialog.css({
				height: "auto",
				width: f.width
			}).outerHeight();
			g = Math.max(0, f.minHeight - e);
			h = typeof f.maxHeight === "number" ? Math.max(0, f.maxHeight - e) : "none";
			if (f.height === "auto") {
				this.element.css({
					minHeight: g,
					maxHeight: h,
					height: "auto"
				})
			} else {
				this.element.height(Math.max(0, f.height - e))
			}
			if (this.uiDialog.is(":data(ui-resizable)")) {
				this.uiDialog.resizable("option", "minHeight", this._minHeight())
			}
		},
		_blockFrames: function() {
			this.iframeBlocks = this.document.find("iframe").map(function() {
				var e = c(this);
				return c("<div>").css({
					position: "absolute",
					width: e.outerWidth(),
					height: e.outerHeight()
				}).appendTo(e.parent()).offset(e.offset())[0]
			})
		},
		_unblockFrames: function() {
			if (this.iframeBlocks) {
				this.iframeBlocks.remove();
				delete this.iframeBlocks
			}
		},
		_allowInteraction: function(e) {
			if (c(e.target).closest(".ui-dialog").length) {
				return true
			}
			return !!c(e.target).closest(".ui-datepicker").length
		},
		_createOverlay: function() {
			if (!this.options.modal) {
				return
			}
			var f = this,
				e = this.widgetFullName;
			if (!c.ui.dialog.overlayInstances) {
				this._delay(function() {
					if (c.ui.dialog.overlayInstances) {
						this.document.bind("focusin.dialog", function(g) {
							if (!f._allowInteraction(g)) {
								g.preventDefault();
								c(".ui-dialog:visible:last .ui-dialog-content").data(e)._focusTabbable()
							}
						})
					}
				})
			}
			this.overlay = c("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
			this._on(this.overlay, {
				mousedown: "_keepFocus"
			});
			c.ui.dialog.overlayInstances++
		},
		_destroyOverlay: function() {
			if (!this.options.modal) {
				return
			}
			if (this.overlay) {
				c.ui.dialog.overlayInstances--;
				if (!c.ui.dialog.overlayInstances) {
					this.document.unbind("focusin.dialog")
				}
				this.overlay.remove();
				this.overlay = null
			}
		}
	});
	c.ui.dialog.overlayInstances = 0;
	if (c.uiBackCompat !== false) {
		c.widget("ui.dialog", c.ui.dialog, {
			_position: function() {
				var f = this.options.position,
					g = [],
					h = [0, 0],
					e;
				if (f) {
					if (typeof f === "string" || (typeof f === "object" && "0" in f)) {
						g = f.split ? f.split(" ") : [f[0], f[1]];
						if (g.length === 1) {
							g[1] = g[0]
						}
						c.each(["left", "top"], function(k, j) {
							if (+g[k] === g[k]) {
								h[k] = g[k];
								g[k] = j
							}
						});
						f = {
							my: g[0] + (h[0] < 0 ? h[0] : "+" + h[0]) + " " + g[1] + (h[1] < 0 ? h[1] : "+" + h[1]),
							at: g.join(" ")
						}
					}
					f = c.extend({}, c.ui.dialog.prototype.options.position, f)
				} else {
					f = c.ui.dialog.prototype.options.position
				}
				e = this.uiDialog.is(":visible");
				if (!e) {
					this.uiDialog.show()
				}
				this.uiDialog.position(f);
				if (!e) {
					this.uiDialog.hide()
				}
			}
		})
	}
}(jQuery));
(function(a, b) {
	a.widget("ui.menu", {
		version: "1.10.4",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-carat-1-e"
			},
			menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element;
			this.mouseHandled = false;
			this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
				role: this.options.role,
				tabIndex: 0
			}).bind("click" + this.eventNamespace, a.proxy(function(c) {
				if (this.options.disabled) {
					c.preventDefault()
				}
			}, this));
			if (this.options.disabled) {
				this.element.addClass("ui-state-disabled").attr("aria-disabled", "true")
			}
			this._on({
				"mousedown .ui-menu-item > a": function(c) {
					c.preventDefault()
				},
				"click .ui-state-disabled > a": function(c) {
					c.preventDefault()
				},
				"click .ui-menu-item:has(a)": function(c) {
					var d = a(c.target).closest(".ui-menu-item");
					if (!this.mouseHandled && d.not(".ui-state-disabled").length) {
						this.select(c);
						if (!c.isPropagationStopped()) {
							this.mouseHandled = true
						}
						if (d.has(".ui-menu").length) {
							this.expand(c)
						} else {
							if (!this.element.is(":focus") && a(this.document[0].activeElement).closest(".ui-menu").length) {
								this.element.trigger("focus", [true]);
								if (this.active && this.active.parents(".ui-menu").length === 1) {
									clearTimeout(this.timer)
								}
							}
						}
					}
				},
				"mouseenter .ui-menu-item": function(c) {
					var d = a(c.currentTarget);
					d.siblings().children(".ui-state-active").removeClass("ui-state-active");
					this.focus(c, d)
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(e, c) {
					var d = this.active || this.element.children(".ui-menu-item").eq(0);
					if (!c) {
						this.focus(e, d)
					}
				},
				blur: function(c) {
					this._delay(function() {
						if (!a.contains(this.element[0], this.document[0].activeElement)) {
							this.collapseAll(c)
						}
					})
				},
				keydown: "_keydown"
			});
			this.refresh();
			this._on(this.document, {
				click: function(c) {
					if (!a(c.target).closest(".ui-menu").length) {
						this.collapseAll(c)
					}
					this.mouseHandled = false
				}
			})
		},
		_destroy: function() {
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
			this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
				var c = a(this);
				if (c.data("ui-menu-submenu-carat")) {
					c.remove()
				}
			});
			this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
		},
		_keydown: function(i) {
			var d, h, j, g, f, c = true;

			function e(k) {
				return k.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
			}
			switch (i.keyCode) {
			case a.ui.keyCode.PAGE_UP:
				this.previousPage(i);
				break;
			case a.ui.keyCode.PAGE_DOWN:
				this.nextPage(i);
				break;
			case a.ui.keyCode.HOME:
				this._move("first", "first", i);
				break;
			case a.ui.keyCode.END:
				this._move("last", "last", i);
				break;
			case a.ui.keyCode.UP:
				this.previous(i);
				break;
			case a.ui.keyCode.DOWN:
				this.next(i);
				break;
			case a.ui.keyCode.LEFT:
				this.collapse(i);
				break;
			case a.ui.keyCode.RIGHT:
				if (this.active && !this.active.is(".ui-state-disabled")) {
					this.expand(i)
				}
				break;
			case a.ui.keyCode.ENTER:
			case a.ui.keyCode.SPACE:
				this._activate(i);
				break;
			case a.ui.keyCode.ESCAPE:
				this.collapse(i);
				break;
			default:
				c = false;
				h = this.previousFilter || "";
				j = String.fromCharCode(i.keyCode);
				g = false;
				clearTimeout(this.filterTimer);
				if (j === h) {
					g = true
				} else {
					j = h + j
				}
				f = new RegExp("^" + e(j), "i");
				d = this.activeMenu.children(".ui-menu-item").filter(function() {
					return f.test(a(this).children("a").text())
				});
				d = g && d.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : d;
				if (!d.length) {
					j = String.fromCharCode(i.keyCode);
					f = new RegExp("^" + e(j), "i");
					d = this.activeMenu.children(".ui-menu-item").filter(function() {
						return f.test(a(this).children("a").text())
					})
				}
				if (d.length) {
					this.focus(i, d);
					if (d.length > 1) {
						this.previousFilter = j;
						this.filterTimer = this._delay(function() {
							delete this.previousFilter
						}, 1000)
					} else {
						delete this.previousFilter
					}
				} else {
					delete this.previousFilter
				}
			}
			if (c) {
				i.preventDefault()
			}
		},
		_activate: function(c) {
			if (!this.active.is(".ui-state-disabled")) {
				if (this.active.children("a[aria-haspopup='true']").length) {
					this.expand(c)
				} else {
					this.select(c)
				}
			}
		},
		refresh: function() {
			var e, d = this.options.icons.submenu,
				c = this.element.find(this.options.menus);
			this.element.toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length);
			c.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var h = a(this),
					g = h.prev("a"),
					f = a("<span>").addClass("ui-menu-icon ui-icon " + d).data("ui-menu-submenu-carat", true);
				g.attr("aria-haspopup", "true").prepend(f);
				h.attr("aria-labelledby", g.attr("id"))
			});
			e = c.add(this.element);
			e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
				tabIndex: -1,
				role: this._itemRole()
			});
			e.children(":not(.ui-menu-item)").each(function() {
				var f = a(this);
				if (!/[^\-\u2014\u2013\s]/.test(f.text())) {
					f.addClass("ui-widget-content ui-menu-divider")
				}
			});
			e.children(".ui-state-disabled").attr("aria-disabled", "true");
			if (this.active && !a.contains(this.element[0], this.active[0])) {
				this.blur()
			}
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(c, d) {
			if (c === "icons") {
				this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(d.submenu)
			}
			this._super(c, d)
		},
		focus: function(d, c) {
			var f, e;
			this.blur(d, d && d.type === "focus");
			this._scrollIntoView(c);
			this.active = c.first();
			e = this.active.children("a").addClass("ui-state-focus");
			if (this.options.role) {
				this.element.attr("aria-activedescendant", e.attr("id"))
			}
			this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
			if (d && d.type === "keydown") {
				this._close()
			} else {
				this.timer = this._delay(function() {
					this._close()
				}, this.delay)
			}
			f = c.children(".ui-menu");
			if (f.length && d && (/^mouse/.test(d.type))) {
				this._startOpening(f)
			}
			this.activeMenu = c.parent();
			this._trigger("focus", d, {
				item: c
			})
		},
		_scrollIntoView: function(f) {
			var i, e, g, c, d, h;
			if (this._hasScroll()) {
				i = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0;
				e = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0;
				g = f.offset().top - this.activeMenu.offset().top - i - e;
				c = this.activeMenu.scrollTop();
				d = this.activeMenu.height();
				h = f.height();
				if (g < 0) {
					this.activeMenu.scrollTop(c + g)
				} else {
					if (g + h > d) {
						this.activeMenu.scrollTop(c + g - d + h)
					}
				}
			}
		},
		blur: function(d, c) {
			if (!c) {
				clearTimeout(this.timer)
			}
			if (!this.active) {
				return
			}
			this.active.children("a").removeClass("ui-state-focus");
			this.active = null;
			this._trigger("blur", d, {
				item: this.active
			})
		},
		_startOpening: function(c) {
			clearTimeout(this.timer);
			if (c.attr("aria-hidden") !== "true") {
				return
			}
			this.timer = this._delay(function() {
				this._close();
				this._open(c)
			}, this.delay)
		},
		_open: function(d) {
			var c = a.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer);
			this.element.find(".ui-menu").not(d.parents(".ui-menu")).hide().attr("aria-hidden", "true");
			d.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
		},
		collapseAll: function(d, c) {
			clearTimeout(this.timer);
			this.timer = this._delay(function() {
				var e = c ? this.element : a(d && d.target).closest(this.element.find(".ui-menu"));
				if (!e.length) {
					e = this.element
				}
				this._close(e);
				this.blur(d);
				this.activeMenu = e
			}, this.delay)
		},
		_close: function(c) {
			if (!c) {
				c = this.active ? this.active.parent() : this.element
			}
			c.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
		},
		collapse: function(d) {
			var c = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			if (c && c.length) {
				this._close();
				this.focus(d, c)
			}
		},
		expand: function(d) {
			var c = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
			if (c && c.length) {
				this._open(c.parent());
				this._delay(function() {
					this.focus(d, c)
				})
			}
		},
		next: function(c) {
			this._move("next", "first", c)
		},
		previous: function(c) {
			this._move("prev", "last", c)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(f, d, e) {
			var c;
			if (this.active) {
				if (f === "first" || f === "last") {
					c = this.active[f === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1)
				} else {
					c = this.active[f + "All"](".ui-menu-item").eq(0)
				}
			}
			if (!c || !c.length || !this.active) {
				c = this.activeMenu.children(".ui-menu-item")[d]()
			}
			this.focus(e, c)
		},
		nextPage: function(e) {
			var d, f, c;
			if (!this.active) {
				this.next(e);
				return
			}
			if (this.isLastItem()) {
				return
			}
			if (this._hasScroll()) {
				f = this.active.offset().top;
				c = this.element.height();
				this.active.nextAll(".ui-menu-item").each(function() {
					d = a(this);
					return d.offset().top - f - c < 0
				});
				this.focus(e, d)
			} else {
				this.focus(e, this.activeMenu.children(".ui-menu-item")[!this.active ? "first" : "last"]())
			}
		},
		previousPage: function(e) {
			var d, f, c;
			if (!this.active) {
				this.next(e);
				return
			}
			if (this.isFirstItem()) {
				return
			}
			if (this._hasScroll()) {
				f = this.active.offset().top;
				c = this.element.height();
				this.active.prevAll(".ui-menu-item").each(function() {
					d = a(this);
					return d.offset().top - f + c > 0
				});
				this.focus(e, d)
			} else {
				this.focus(e, this.activeMenu.children(".ui-menu-item").first())
			}
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(c) {
			this.active = this.active || a(c.target).closest(".ui-menu-item");
			var d = {
				item: this.active
			};
			if (!this.active.has(".ui-menu").length) {
				this.collapseAll(c, true)
			}
			this._trigger("select", c, d)
		}
	})
}(jQuery));
(function(c, e) {
	var a = 0,
		f = /#.*$/;

	function d() {
		return ++a
	}
	function b(g) {
		g = g.cloneNode(false);
		return g.hash.length > 1 && decodeURIComponent(g.href.replace(f, "")) === decodeURIComponent(location.href.replace(f, ""))
	}
	c.widget("ui.tabs", {
		version: "1.10.4",
		delay: 300,
		options: {
			active: null,
			collapsible: false,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_create: function() {
			var h = this,
				g = this.options;
			this.running = false;
			this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", g.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(i) {
				if (c(this).is(".ui-state-disabled")) {
					i.preventDefault()
				}
			}).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
				if (c(this).closest("li").is(".ui-state-disabled")) {
					this.blur()
				}
			});
			this._processTabs();
			g.active = this._initialActive();
			if (c.isArray(g.disabled)) {
				g.disabled = c.unique(g.disabled.concat(c.map(this.tabs.filter(".ui-state-disabled"), function(i) {
					return h.tabs.index(i)
				}))).sort()
			}
			if (this.options.active !== false && this.anchors.length) {
				this.active = this._findActive(g.active)
			} else {
				this.active = c()
			}
			this._refresh();
			if (this.active.length) {
				this.load(g.active)
			}
		},
		_initialActive: function() {
			var h = this.options.active,
				g = this.options.collapsible,
				i = location.hash.substring(1);
			if (h === null) {
				if (i) {
					this.tabs.each(function(j, k) {
						if (c(k).attr("aria-controls") === i) {
							h = j;
							return false
						}
					})
				}
				if (h === null) {
					h = this.tabs.index(this.tabs.filter(".ui-tabs-active"))
				}
				if (h === null || h === -1) {
					h = this.tabs.length ? 0 : false
				}
			}
			if (h !== false) {
				h = this.tabs.index(this.tabs.eq(h));
				if (h === -1) {
					h = g ? false : 0
				}
			}
			if (!g && h === false && this.anchors.length) {
				h = 0
			}
			return h
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: !this.active.length ? c() : this._getPanelForTab(this.active)
			}
		},
		_tabKeydown: function(i) {
			var h = c(this.document[0].activeElement).closest("li"),
				g = this.tabs.index(h),
				j = true;
			if (this._handlePageNav(i)) {
				return
			}
			switch (i.keyCode) {
			case c.ui.keyCode.RIGHT:
			case c.ui.keyCode.DOWN:
				g++;
				break;
			case c.ui.keyCode.UP:
			case c.ui.keyCode.LEFT:
				j = false;
				g--;
				break;
			case c.ui.keyCode.END:
				g = this.anchors.length - 1;
				break;
			case c.ui.keyCode.HOME:
				g = 0;
				break;
			case c.ui.keyCode.SPACE:
				i.preventDefault();
				clearTimeout(this.activating);
				this._activate(g);
				return;
			case c.ui.keyCode.ENTER:
				i.preventDefault();
				clearTimeout(this.activating);
				this._activate(g === this.options.active ? false : g);
				return;
			default:
				return
			}
			i.preventDefault();
			clearTimeout(this.activating);
			g = this._focusNextTab(g, j);
			if (!i.ctrlKey) {
				h.attr("aria-selected", "false");
				this.tabs.eq(g).attr("aria-selected", "true");
				this.activating = this._delay(function() {
					this.option("active", g)
				}, this.delay)
			}
		},
		_panelKeydown: function(g) {
			if (this._handlePageNav(g)) {
				return
			}
			if (g.ctrlKey && g.keyCode === c.ui.keyCode.UP) {
				g.preventDefault();
				this.active.focus()
			}
		},
		_handlePageNav: function(g) {
			if (g.altKey && g.keyCode === c.ui.keyCode.PAGE_UP) {
				this._activate(this._focusNextTab(this.options.active - 1, false));
				return true
			}
			if (g.altKey && g.keyCode === c.ui.keyCode.PAGE_DOWN) {
				this._activate(this._focusNextTab(this.options.active + 1, true));
				return true
			}
		},
		_findNextTab: function(h, i) {
			var g = this.tabs.length - 1;

			function j() {
				if (h > g) {
					h = 0
				}
				if (h < 0) {
					h = g
				}
				return h
			}
			while (c.inArray(j(), this.options.disabled) !== -1) {
				h = i ? h + 1 : h - 1
			}
			return h
		},
		_focusNextTab: function(g, h) {
			g = this._findNextTab(g, h);
			this.tabs.eq(g).focus();
			return g
		},
		_setOption: function(g, h) {
			if (g === "active") {
				this._activate(h);
				return
			}
			if (g === "disabled") {
				this._setupDisabled(h);
				return
			}
			this._super(g, h);
			if (g === "collapsible") {
				this.element.toggleClass("ui-tabs-collapsible", h);
				if (!h && this.options.active === false) {
					this._activate(0)
				}
			}
			if (g === "event") {
				this._setupEvents(h)
			}
			if (g === "heightStyle") {
				this._setupHeightStyle(h)
			}
		},
		_tabId: function(g) {
			return g.attr("aria-controls") || "ui-tabs-" + d()
		},
		_sanitizeSelector: function(g) {
			return g ? g.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var h = this.options,
				g = this.tablist.children(":has(a[href])");
			h.disabled = c.map(g.filter(".ui-state-disabled"), function(i) {
				return g.index(i)
			});
			this._processTabs();
			if (h.active === false || !this.anchors.length) {
				h.active = false;
				this.active = c()
			} else {
				if (this.active.length && !c.contains(this.tablist[0], this.active[0])) {
					if (this.tabs.length === h.disabled.length) {
						h.active = false;
						this.active = c()
					} else {
						this._activate(this._findNextTab(Math.max(0, h.active - 1), false))
					}
				} else {
					h.active = this.tabs.index(this.active)
				}
			}
			this._refresh()
		},
		_refresh: function() {
			this._setupDisabled(this.options.disabled);
			this._setupEvents(this.options.event);
			this._setupHeightStyle(this.options.heightStyle);
			this.tabs.not(this.active).attr({
				"aria-selected": "false",
				tabIndex: -1
			});
			this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			});
			if (!this.active.length) {
				this.tabs.eq(0).attr("tabIndex", 0)
			} else {
				this.active.addClass("ui-tabs-active ui-state-active").attr({
					"aria-selected": "true",
					tabIndex: 0
				});
				this._getPanelForTab(this.active).show().attr({
					"aria-expanded": "true",
					"aria-hidden": "false"
				})
			}
		},
		_processTabs: function() {
			var g = this;
			this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
			this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
				role: "tab",
				tabIndex: -1
			});
			this.anchors = this.tabs.map(function() {
				return c("a", this)[0]
			}).addClass("ui-tabs-anchor").attr({
				role: "presentation",
				tabIndex: -1
			});
			this.panels = c();
			this.anchors.each(function(n, l) {
				var h, j, m, k = c(l).uniqueId().attr("id"),
					o = c(l).closest("li"),
					p = o.attr("aria-controls");
				if (b(l)) {
					h = l.hash;
					j = g.element.find(g._sanitizeSelector(h))
				} else {
					m = g._tabId(o);
					h = "#" + m;
					j = g.element.find(h);
					if (!j.length) {
						j = g._createPanel(m);
						j.insertAfter(g.panels[n - 1] || g.tablist)
					}
					j.attr("aria-live", "polite")
				}
				if (j.length) {
					g.panels = g.panels.add(j)
				}
				if (p) {
					o.data("ui-tabs-aria-controls", p)
				}
				o.attr({
					"aria-controls": h.substring(1),
					"aria-labelledby": k
				});
				j.attr("aria-labelledby", k)
			});
			this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
		},
		_getList: function() {
			return this.tablist || this.element.find("ol,ul").eq(0)
		},
		_createPanel: function(g) {
			return c("<div>").attr("id", g).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", true)
		},
		_setupDisabled: function(j) {
			if (c.isArray(j)) {
				if (!j.length) {
					j = false
				} else {
					if (j.length === this.anchors.length) {
						j = true
					}
				}
			}
			for (var h = 0, g;
			(g = this.tabs[h]); h++) {
				if (j === true || c.inArray(h, j) !== -1) {
					c(g).addClass("ui-state-disabled").attr("aria-disabled", "true")
				} else {
					c(g).removeClass("ui-state-disabled").removeAttr("aria-disabled")
				}
			}
			this.options.disabled = j
		},
		_setupEvents: function(h) {
			var g = {
				click: function(i) {
					i.preventDefault()
				}
			};
			if (h) {
				c.each(h.split(" "), function(j, i) {
					g[i] = "_eventHandler"
				})
			}
			this._off(this.anchors.add(this.tabs).add(this.panels));
			this._on(this.anchors, g);
			this._on(this.tabs, {
				keydown: "_tabKeydown"
			});
			this._on(this.panels, {
				keydown: "_panelKeydown"
			});
			this._focusable(this.tabs);
			this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(g) {
			var i, h = this.element.parent();
			if (g === "fill") {
				i = h.height();
				i -= this.element.outerHeight() - this.element.height();
				this.element.siblings(":visible").each(function() {
					var k = c(this),
						j = k.css("position");
					if (j === "absolute" || j === "fixed") {
						return
					}
					i -= k.outerHeight(true)
				});
				this.element.children().not(this.panels).each(function() {
					i -= c(this).outerHeight(true)
				});
				this.panels.each(function() {
					c(this).height(Math.max(0, i - c(this).innerHeight() + c(this).height()))
				}).css("overflow", "auto")
			} else {
				if (g === "auto") {
					i = 0;
					this.panels.each(function() {
						i = Math.max(i, c(this).height("").height())
					}).height(i)
				}
			}
		},
		_eventHandler: function(g) {
			var p = this.options,
				k = this.active,
				l = c(g.currentTarget),
				j = l.closest("li"),
				n = j[0] === k[0],
				h = n && p.collapsible,
				i = h ? c() : this._getPanelForTab(j),
				m = !k.length ? c() : this._getPanelForTab(k),
				o = {
					oldTab: k,
					oldPanel: m,
					newTab: h ? c() : j,
					newPanel: i
				};
			g.preventDefault();
			if (j.hasClass("ui-state-disabled") || j.hasClass("ui-tabs-loading") || this.running || (n && !p.collapsible) || (this._trigger("beforeActivate", g, o) === false)) {
				return
			}
			p.active = h ? false : this.tabs.index(j);
			this.active = n ? c() : j;
			if (this.xhr) {
				this.xhr.abort()
			}
			if (!m.length && !i.length) {
				c.error("jQuery UI Tabs: Mismatching fragment identifier.")
			}
			if (i.length) {
				this.load(this.tabs.index(j), g)
			}
			this._toggle(g, o)
		},
		_toggle: function(m, l) {
			var k = this,
				g = l.newPanel,
				j = l.oldPanel;
			this.running = true;

			function i() {
				k.running = false;
				k._trigger("activate", m, l)
			}
			function h() {
				l.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
				if (g.length && k.options.show) {
					k._show(g, k.options.show, i)
				} else {
					g.show();
					i()
				}
			}
			if (j.length && this.options.hide) {
				this._hide(j, this.options.hide, function() {
					l.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
					h()
				})
			} else {
				l.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
				j.hide();
				h()
			}
			j.attr({
				"aria-expanded": "false",
				"aria-hidden": "true"
			});
			l.oldTab.attr("aria-selected", "false");
			if (g.length && j.length) {
				l.oldTab.attr("tabIndex", -1)
			} else {
				if (g.length) {
					this.tabs.filter(function() {
						return c(this).attr("tabIndex") === 0
					}).attr("tabIndex", -1)
				}
			}
			g.attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			});
			l.newTab.attr({
				"aria-selected": "true",
				tabIndex: 0
			})
		},
		_activate: function(h) {
			var g, i = this._findActive(h);
			if (i[0] === this.active[0]) {
				return
			}
			if (!i.length) {
				i = this.active
			}
			g = i.find(".ui-tabs-anchor")[0];
			this._eventHandler({
				target: g,
				currentTarget: g,
				preventDefault: c.noop
			})
		},
		_findActive: function(g) {
			return g === false ? c() : this.tabs.eq(g)
		},
		_getIndex: function(g) {
			if (typeof g === "string") {
				g = this.anchors.index(this.anchors.filter("[href$='" + g + "']"))
			}
			return g
		},
		_destroy: function() {
			if (this.xhr) {
				this.xhr.abort()
			}
			this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
			this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
			this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
			this.tabs.add(this.panels).each(function() {
				if (c.data(this, "ui-tabs-destroy")) {
					c(this).remove()
				} else {
					c(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
				}
			});
			this.tabs.each(function() {
				var g = c(this),
					h = g.data("ui-tabs-aria-controls");
				if (h) {
					g.attr("aria-controls", h).removeData("ui-tabs-aria-controls")
				} else {
					g.removeAttr("aria-controls")
				}
			});
			this.panels.show();
			if (this.options.heightStyle !== "content") {
				this.panels.css("height", "")
			}
		},
		enable: function(g) {
			var h = this.options.disabled;
			if (h === false) {
				return
			}
			if (g === e) {
				h = false
			} else {
				g = this._getIndex(g);
				if (c.isArray(h)) {
					h = c.map(h, function(i) {
						return i !== g ? i : null
					})
				} else {
					h = c.map(this.tabs, function(i, j) {
						return j !== g ? j : null
					})
				}
			}
			this._setupDisabled(h)
		},
		disable: function(g) {
			var h = this.options.disabled;
			if (h === true) {
				return
			}
			if (g === e) {
				h = true
			} else {
				g = this._getIndex(g);
				if (c.inArray(g, h) !== -1) {
					return
				}
				if (c.isArray(h)) {
					h = c.merge([g], h).sort()
				} else {
					h = [g]
				}
			}
			this._setupDisabled(h)
		},
		load: function(i, m) {
			i = this._getIndex(i);
			var l = this,
				j = this.tabs.eq(i),
				h = j.find(".ui-tabs-anchor"),
				g = this._getPanelForTab(j),
				k = {
					tab: j,
					panel: g
				};
			if (b(h[0])) {
				return
			}
			this.xhr = c.ajax(this._ajaxSettings(h, m, k));
			if (this.xhr && this.xhr.statusText !== "canceled") {
				j.addClass("ui-tabs-loading");
				g.attr("aria-busy", "true");
				this.xhr.success(function(n) {
					setTimeout(function() {
						g.html(n);
						l._trigger("load", m, k)
					}, 1)
				}).complete(function(o, n) {
					setTimeout(function() {
						if (n === "abort") {
							l.panels.stop(false, true)
						}
						j.removeClass("ui-tabs-loading");
						g.removeAttr("aria-busy");
						if (o === l.xhr) {
							delete l.xhr
						}
					}, 1)
				})
			}
		},
		_ajaxSettings: function(g, j, i) {
			var h = this;
			return {
				url: g.attr("href"),
				beforeSend: function(l, k) {
					return h._trigger("beforeLoad", j, c.extend({
						jqXHR: l,
						ajaxSettings: k
					}, i))
				}
			}
		},
		_getPanelForTab: function(g) {
			var h = c(g).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + h))
		}
	})
})(jQuery);
(function(b) {
	b.tools = b.tools || {
		version: "@VERSION"
	};
	b.tools.scrollable = {
		conf: {
			activeClass: "active",
			circular: false,
			clonedClass: "cloned",
			disabledClass: "disabled",
			easing: "swing",
			initialIndex: 0,
			item: "> *",
			items: ".items",
			keyboard: true,
			mousewheel: false,
			next: ".next",
			prev: ".prev",
			size: 1,
			speed: 400,
			vertical: false,
			touch: true,
			wheelSpeed: 0
		}
	};

	function d(i, g) {
		var f = parseInt(i.css(g), 10);
		if (f) {
			return f
		}
		var h = i[0].currentStyle;
		return h && h.width && parseInt(h.width, 10)
	}
	function e(f, h) {
		var g = b(h);
		return g.length < 2 ? g : f.parent().find(h)
	}
	var c;

	function a(q, o) {
		var r = this,
			g = q.add(r),
			f = q.children(),
			m = 0,
			i = o.vertical;
		if (!c) {
			c = r
		}
		if (f.length > 1) {
			f = b(o.items, q)
		}
		if (o.size > 1) {
			o.circular = false
		}
		b.extend(r, {
			getConf: function() {
				return o
			},
			getIndex: function() {
				return m
			},
			getSize: function() {
				return r.getItems().size()
			},
			getNaviButtons: function() {
				return h.add(k)
			},
			getRoot: function() {
				return q
			},
			getItemWrap: function() {
				return f
			},
			getItems: function() {
				return f.find(o.item).not("." + o.clonedClass)
			},
			move: function(t, s) {
				return r.seekTo(m + t, s)
			},
			next: function(s) {
				return r.move(o.size, s)
			},
			prev: function(s) {
				return r.move(-o.size, s)
			},
			begin: function(s) {
				return r.seekTo(0, s)
			},
			end: function(s) {
				return r.seekTo(r.getSize() - 1, s)
			},
			focus: function() {
				c = r;
				return r
			},
			addItem: function(s) {
				s = b(s);
				if (!o.circular) {
					f.append(s);
					k.removeClass("disabled")
				} else {
					f.children().last().before(s);
					f.children().first().replaceWith(s.clone().addClass(o.clonedClass))
				}
				g.trigger("onAddItem", [s]);
				return r
			},
			seekTo: function(s, x, u) {
				if (!s.jquery) {
					s *= 1
				}
				if (o.circular && s === 0 && m == -1 && x !== 0) {
					return r
				}
				if (!o.circular && s < 0 || s > r.getSize() || s < -1) {
					return r
				}
				var v = s;
				if (s.jquery) {
					s = r.getItems().index(s)
				} else {
					v = r.getItems().eq(s)
				}
				var w = b.Event("onBeforeSeek");
				if (!u) {
					g.trigger(w, [s, x]);
					if (w.isDefaultPrevented() || !v.length) {
						return r
					}
				}
				var t = i ? {
					top: -v.position().top
				} : {
					left: -v.position().left
				};
				m = s;
				c = r;
				if (x === undefined) {
					x = o.speed
				}
				f.animate(t, x, o.easing, u ||
				function() {
					g.trigger("onSeek", [s])
				});
				return r
			}
		});
		b.each(["onBeforeSeek", "onSeek", "onAddItem"], function(t, s) {
			if (b.isFunction(o[s])) {
				b(r).on(s, o[s])
			}
			r[s] = function(u) {
				if (u) {
					b(r).on(s, u)
				}
				return r
			}
		});
		if (o.circular) {
			var n = r.getItems().slice(-1).clone().prependTo(f),
				l = r.getItems().eq(1).clone().appendTo(f);
			n.add(l).addClass(o.clonedClass);
			r.onBeforeSeek(function(u, s, t) {
				if (u.isDefaultPrevented()) {
					return
				}
				if (s == -1) {
					r.seekTo(n, t, function() {
						r.end(0)
					});
					return u.preventDefault()
				} else {
					if (s == r.getSize()) {
						r.seekTo(l, t, function() {
							r.begin(0)
						})
					}
				}
			});
			var p = q.parents().add(q).filter(function() {
				if (b(this).css("display") === "none") {
					return true
				}
			});
			if (p.length) {
				p.show();
				r.seekTo(0, 0, function() {});
				p.hide()
			} else {
				r.seekTo(0, 0, function() {})
			}
		}
		var h = e(q, o.prev).click(function(s) {
			s.stopPropagation();
			r.prev()
		}),
			k = e(q, o.next).click(function(s) {
				s.stopPropagation();
				r.next()
			});
		if (!o.circular) {
			r.onBeforeSeek(function(t, s) {
				setTimeout(function() {
					if (!t.isDefaultPrevented()) {
						h.toggleClass(o.disabledClass, s <= 0);
						k.toggleClass(o.disabledClass, s >= r.getSize() - 1)
					}
				}, 1)
			});
			if (!o.initialIndex) {
				h.addClass(o.disabledClass)
			}
		}
		if (r.getSize() < 2) {
			h.add(k).addClass(o.disabledClass)
		}
		if (o.mousewheel && b.fn.mousewheel) {
			q.mousewheel(function(s, t) {
				if (o.mousewheel) {
					r.move(t < 0 ? 1 : -1, o.wheelSpeed || 50);
					return false
				}
			})
		}
		if (o.touch) {
			var j = {};
			f[0].ontouchstart = function(u) {
				var s = u.touches[0];
				j.x = s.clientX;
				j.y = s.clientY
			};
			f[0].ontouchmove = function(w) {
				if (w.touches.length == 1 && !f.is(":animated")) {
					var v = w.touches[0],
						u = j.x - v.clientX,
						s = j.y - v.clientY;
					r[i && s > 0 || !i && u > 0 ? "next" : "prev"]();
					w.preventDefault()
				}
			}
		}
		if (o.keyboard) {
			b(document).on("keydown.scrollable", function(s) {
				if (!o.keyboard || s.altKey || s.ctrlKey || s.metaKey || b(s.target).is(":input")) {
					return
				}
				if (o.keyboard != "static" && c != r) {
					return
				}
				var t = s.keyCode;
				if (i && (t == 38 || t == 40)) {
					r.move(t == 38 ? -1 : 1);
					return s.preventDefault()
				}
				if (!i && (t == 37 || t == 39)) {
					r.move(t == 37 ? -1 : 1);
					return s.preventDefault()
				}
			})
		}
		if (o.initialIndex) {
			r.seekTo(o.initialIndex, 0, function() {})
		}
	}
	b.fn.scrollable = function(f) {
		var g = this.data("scrollable");
		if (g) {
			return g
		}
		f = b.extend({}, b.tools.scrollable.conf, f);
		this.each(function() {
			g = new a(b(this), f);
			b(this).data("scrollable", g)
		});
		return f.api ? g : this
	}
})(jQuery);
$.fn.center = function(e) {
	var d = $(window),
		f = d.scrollTop();
	return this.each(function() {
		var a = $(this),
			b = $.extend({
				against: "window",
				top: false,
				topPercentage: 0.5
			}, e),
			c = function() {
				var k, l, j;
				if (b.against === "window") {
					k = d
				} else {
					if (b.against === "parent") {
						k = a.parent();
						f = 0
					} else {
						k = a.parents(against);
						f = 0
					}
				}
				l = ((k.width()) - (a.outerWidth())) * 0.5;
				j = ((k.height()) - (a.outerHeight())) * b.topPercentage + f;
				if (b.top) {
					j = b.top + f
				}
				a.css({
					left: l,
					top: j
				})
			};
		c();
		d.resize(c)
	})
};
/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(a) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], a)
	} else {
		a(jQuery)
	}
}(function(f) {
	var a = /\+/g;

	function d(i) {
		return b.raw ? i : encodeURIComponent(i)
	}
	function g(i) {
		return b.raw ? i : decodeURIComponent(i)
	}
	function h(i) {
		return d(b.json ? JSON.stringify(i) : String(i))
	}
	function c(i) {
		if (i.indexOf('"') === 0) {
			i = i.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
		}
		try {
			i = decodeURIComponent(i.replace(a, " "))
		} catch (j) {
			return
		}
		try {
			return b.json ? JSON.parse(i) : i
		} catch (j) {}
	}
	function e(j, i) {
		var k = b.raw ? j : c(j);
		return f.isFunction(i) ? i(k) : k
	}
	var b = f.cookie = function(q, p, v) {
			if (p !== undefined && !f.isFunction(p)) {
				v = f.extend({}, b.defaults, v);
				if (typeof v.expires === "number") {
					var r = v.expires,
						u = v.expires = new Date();
					u.setDate(u.getDate() + r)
				}
				return (document.cookie = [d(q), "=", h(p), v.expires ? "; expires=" + v.expires.toUTCString() : "", v.path ? "; path=" + v.path : "", v.domain ? "; domain=" + v.domain : "", v.secure ? "; secure" : ""].join(""))
			}
			var w = q ? undefined : {};
			var s = document.cookie ? document.cookie.split("; ") : [];
			for (var o = 0, m = s.length; o < m; o++) {
				var n = s[o].split("=");
				var j = g(n.shift());
				var k = n.join("=");
				if (q && q === j) {
					w = e(k, p);
					break
				}
				if (!q && (k = e(k)) !== undefined) {
					w[j] = k
				}
			}
			return w
		};
	b.defaults = {};
	f.removeCookie = function(j, i) {
		if (f.cookie(j) !== undefined) {
			f.cookie(j, "", f.extend({}, i, {
				expires: -1
			}));
			return true
		}
		return false
	}
}));
(function(b, c) {
	var a;
	b.rails = a = {
		linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
		inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
		formSubmitSelector: "form",
		formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
		disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
		enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
		requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
		fileInputSelector: "input:file",
		linkDisableSelector: "a[data-disable-with]",
		CSRFProtection: function(e) {
			var d = b('meta[name="csrf-token"]').attr("content");
			if (d) {
				e.setRequestHeader("X-CSRF-Token", d)
			}
		},
		fire: function(g, d, f) {
			var e = b.Event(d);
			g.trigger(e, f);
			return e.result !== false
		},
		confirm: function(d) {
			return confirm(d)
		},
		ajax: function(d) {
			return b.ajax(d)
		},
		handleRemote: function(h) {
			var k, f, j, i = h.data("cross-domain") || null,
				d = h.data("type") || (b.ajaxSettings && b.ajaxSettings.dataType),
				e;
			if (a.fire(h, "ajax:before")) {
				if (h.is("form")) {
					k = h.attr("method");
					f = h.attr("action");
					j = h.serializeArray();
					var g = h.data("ujs:submit-button");
					if (g) {
						j.push(g);
						h.data("ujs:submit-button", null)
					}
				} else {
					if (h.is(a.inputChangeSelector)) {
						k = h.data("method");
						f = h.data("url");
						j = h.serialize();
						if (h.data("params")) {
							j = j + "&" + h.data("params")
						}
					} else {
						k = h.data("method");
						f = h.attr("href");
						j = h.data("params") || null
					}
				}
				e = {
					type: k || "GET",
					data: j,
					dataType: d,
					crossDomain: i,
					beforeSend: function(m, l) {
						if (l.dataType === c) {
							m.setRequestHeader("accept", "*/*;q=0.5, " + l.accepts.script)
						}
						return a.fire(h, "ajax:beforeSend", [m, l])
					},
					success: function(m, l, n) {
						h.trigger("ajax:success", [m, l, n])
					},
					complete: function(m, l) {
						h.trigger("ajax:complete", [m, l])
					},
					error: function(n, l, m) {
						h.trigger("ajax:error", [n, l, m])
					}
				};
				if (f) {
					e.url = f
				}
				return a.ajax(e)
			} else {
				return false
			}
		},
		handleMethod: function(h) {
			var e = h.attr("href"),
				k = h.data("method"),
				i = h.attr("target"),
				f = b("meta[name=csrf-token]").attr("content"),
				j = b("meta[name=csrf-param]").attr("content"),
				g = b('<form method="post" action="' + e + '"></form>'),
				d = '<input name="_method" value="' + k + '" type="hidden" />';
			if (j !== c && f !== c) {
				d += '<input name="' + j + '" value="' + f + '" type="hidden" />'
			}
			if (i) {
				g.attr("target", i)
			}
			g.hide().append(d).appendTo("body");
			g.submit()
		},
		disableFormElements: function(d) {
			d.find(a.disableSelector).each(function() {
				var e = b(this),
					f = e.is("button") ? "html" : "val";
				e.data("ujs:enable-with", e[f]());
				e[f](e.data("disable-with"));
				e.prop("disabled", true)
			})
		},
		enableFormElements: function(d) {
			d.find(a.enableSelector).each(function() {
				var e = b(this),
					f = e.is("button") ? "html" : "val";
				if (e.data("ujs:enable-with")) {
					e[f](e.data("ujs:enable-with"))
				}
				e.prop("disabled", false)
			})
		},
		allowAction: function(d) {
			var e = d.data("confirm"),
				f = false,
				g;
			if (!e) {
				return true
			}
			if (a.fire(d, "confirm")) {
				f = a.confirm(e);
				g = a.fire(d, "confirm:complete", [f])
			}
			return f && g
		},
		blankInputs: function(i, f, h) {
			var e = b(),
				g, d = f || "input,textarea";
			i.find(d).each(function() {
				g = b(this);
				if (h ? g.val() : !g.val()) {
					e = e.add(g)
				}
			});
			return e.length ? e : false
		},
		nonBlankInputs: function(e, d) {
			return a.blankInputs(e, d, true)
		},
		stopEverything: function(d) {
			b(d.target).trigger("ujs:everythingStopped");
			d.stopImmediatePropagation();
			return false
		},
		callFormSubmitBindings: function(f, e) {
			var d = f.data("events"),
				g = true;
			if (d !== c && d.submit !== c) {
				b.each(d.submit, function(h, j) {
					if (typeof j.handler === "function") {
						return g = j.handler(e)
					}
				})
			}
			return g
		},
		disableElement: function(d) {
			d.data("ujs:enable-with", d.html());
			d.html(d.data("disable-with"));
			d.bind("click.railsDisable", function(f) {
				return a.stopEverything(f)
			})
		},
		enableElement: function(d) {
			if (d.data("ujs:enable-with") !== c) {
				d.html(d.data("ujs:enable-with"));
				d.data("ujs:enable-with", false)
			}
			d.unbind("click.railsDisable")
		}
	};
	b.ajaxPrefilter(function(d, f, e) {
		if (!d.crossDomain) {
			a.CSRFProtection(e)
		}
	});
	b(document).delegate(a.linkDisableSelector, "ajax:complete", function() {
		a.enableElement(b(this))
	});
	b(document).delegate(a.linkClickSelector, "click.rails", function(g) {
		var d = b(this),
			h = d.data("method"),
			f = d.data("params");
		if (!a.allowAction(d)) {
			return a.stopEverything(g)
		}
		if (d.is(a.linkDisableSelector)) {
			a.disableElement(d)
		}
		if (d.data("remote") !== c) {
			if ((g.metaKey || g.ctrlKey) && (!h || h === "GET") && !f) {
				return true
			}
			if (a.handleRemote(d) === false) {
				a.enableElement(d)
			}
			return false
		} else {
			if (d.data("method")) {
				a.handleMethod(d);
				return false
			}
		}
	});
	b(document).delegate(a.inputChangeSelector, "change.rails", function(f) {
		var d = b(this);
		if (!a.allowAction(d)) {
			return a.stopEverything(f)
		}
		a.handleRemote(d);
		return false
	});
	b(document).delegate(a.formSubmitSelector, "submit.rails", function(i) {
		var g = b(this),
			h = g.data("remote") !== c,
			f = a.blankInputs(g, a.requiredInputSelector),
			d = a.nonBlankInputs(g, a.fileInputSelector);
		if (!a.allowAction(g)) {
			return a.stopEverything(i)
		}
		if (f && g.attr("novalidate") == c && a.fire(g, "ajax:aborted:required", [f])) {
			return a.stopEverything(i)
		}
		if (h) {
			if (d) {
				return a.fire(g, "ajax:aborted:file", [d])
			}
			if (!b.support.submitBubbles && b().jquery < "1.7" && a.callFormSubmitBindings(g, i) === false) {
				return a.stopEverything(i)
			}
			a.handleRemote(g);
			return false
		} else {
			setTimeout(function() {
				a.disableFormElements(g)
			}, 13)
		}
	});
	b(document).delegate(a.formInputClickSelector, "click.rails", function(f) {
		var e = b(this);
		if (!a.allowAction(e)) {
			return a.stopEverything(f)
		}
		var d = e.attr("name"),
			g = d ? {
				name: d,
				value: e.val()
			} : null;
		e.closest("form").data("ujs:submit-button", g)
	});
	b(document).delegate(a.formSubmitSelector, "ajax:beforeSend.rails", function(d) {
		if (this == d.target) {
			a.disableFormElements(b(this))
		}
	});
	b(document).delegate(a.formSubmitSelector, "ajax:complete.rails", function(d) {
		if (this == d.target) {
			a.enableFormElements(b(this))
		}
	})
})(jQuery);
(function(a) {
	a.widget("ui.selectmenu", {
		options: {
			appendTo: "body",
			typeAhead: 1000,
			style: "dropdown",
			positionOptions: null,
			width: null,
			menuWidth: null,
			handleWidth: 26,
			maxHeight: null,
			icons: null,
			format: null,
			escapeHtml: false,
			bgImage: function() {}
		},
		_create: function() {
			var b = this,
				e = this.options;
			var d = this.element.uniqueId().attr("id");
			this.ids = [d, d + "-button", d + "-menu"];
			this._safemouseup = true;
			this.isOpen = false;
			this.widgetBaseClass = "ui-selectmenu";
			this.newelement = a("<a />", {
				"class": "ui-selectmenu ui-widget ui-state-default ui-corner-all",
				id: this.ids[1],
				role: "button",
				href: "#nogo",
				tabindex: this.element.attr("disabled") ? 1 : 0,
				"aria-haspopup": true,
				"aria-owns": this.ids[2]
			});
			this.newelementWrap = a("<span />").append(this.newelement).insertAfter(this.element);
			var c = this.element.attr("tabindex");
			if (c) {
				this.newelement.attr("tabindex", c)
			}
			this.newelement.data("selectelement", this.element);
			this.selectmenuIcon = a('<span class="ui-selectmenu-icon ui-icon"></span>').prependTo(this.newelement);
			this.newelement.prepend('<span class="ui-selectmenu-status" />');
			this.element.bind({
				"click.selectmenu": function(f) {
					b.newelement.focus();
					f.preventDefault()
				}
			});
			this.newelement.bind("mousedown.selectmenu", function(f) {
				b._toggle(f, true);
				if (e.style == "popup") {
					b._safemouseup = false;
					setTimeout(function() {
						b._safemouseup = true
					}, 300)
				}
				f.preventDefault()
			}).bind("click.selectmenu", function(f) {
				f.preventDefault()
			}).bind("keydown.selectmenu", function(g) {
				var f = false;
				switch (g.keyCode) {
				case a.ui.keyCode.ENTER:
					f = true;
					break;
				case a.ui.keyCode.SPACE:
					b._toggle(g);
					break;
				case a.ui.keyCode.UP:
					if (g.altKey) {
						b.open(g)
					} else {
						b._moveSelection(-1)
					}
					break;
				case a.ui.keyCode.DOWN:
					if (g.altKey) {
						b.open(g)
					} else {
						b._moveSelection(1)
					}
					break;
				case a.ui.keyCode.LEFT:
					b._moveSelection(-1);
					break;
				case a.ui.keyCode.RIGHT:
					b._moveSelection(1);
					break;
				case a.ui.keyCode.TAB:
					f = true;
					break;
				case a.ui.keyCode.PAGE_UP:
				case a.ui.keyCode.HOME:
					b.index(0);
					break;
				case a.ui.keyCode.PAGE_DOWN:
				case a.ui.keyCode.END:
					b.index(b._optionLis.length);
					break;
				default:
					f = true
				}
				return f
			}).bind("keypress.selectmenu", function(f) {
				if (f.which > 0) {
					b._typeAhead(f.which, "mouseup")
				}
				return true
			}).bind("mouseover.selectmenu", function() {
				if (!e.disabled) {
					a(this).addClass("ui-state-hover")
				}
			}).bind("mouseout.selectmenu", function() {
				if (!e.disabled) {
					a(this).removeClass("ui-state-hover")
				}
			}).bind("focus.selectmenu", function() {
				if (!e.disabled) {
					a(this).addClass("ui-state-focus")
				}
			}).bind("blur.selectmenu", function() {
				if (!e.disabled) {
					a(this).removeClass("ui-state-focus")
				}
			});
			a(document).bind("mousedown.selectmenu-" + this.ids[0], function(f) {
				if (b.isOpen && !a(f.target).closest("#" + b.ids[1]).length) {
					b.close(f)
				}
			});
			this.element.bind("click.selectmenu", function() {
				b._refreshValue()
			}).bind("focus.selectmenu", function() {
				if (b.newelement) {
					b.newelement[0].focus()
				}
			});
			if (!e.width) {
				e.width = this.element.outerWidth()
			}
			this.newelement.width(e.width);
			this.element.hide();
			this.list = a("<ul />", {
				"class": "ui-widget ui-widget-content",
				"aria-hidden": true,
				role: "listbox",
				"aria-labelledby": this.ids[1],
				id: this.ids[2]
			});
			this.listWrap = a("<div />", {
				"class": "ui-selectmenu-menu"
			}).append(this.list).appendTo(e.appendTo);
			this.list.bind("keydown.selectmenu", function(g) {
				var f = false;
				switch (g.keyCode) {
				case a.ui.keyCode.UP:
					if (g.altKey) {
						b.close(g, true)
					} else {
						b._moveFocus(-1)
					}
					break;
				case a.ui.keyCode.DOWN:
					if (g.altKey) {
						b.close(g, true)
					} else {
						b._moveFocus(1)
					}
					break;
				case a.ui.keyCode.LEFT:
					b._moveFocus(-1);
					break;
				case a.ui.keyCode.RIGHT:
					b._moveFocus(1);
					break;
				case a.ui.keyCode.HOME:
					b._moveFocus(":first");
					break;
				case a.ui.keyCode.PAGE_UP:
					b._scrollPage("up");
					break;
				case a.ui.keyCode.PAGE_DOWN:
					b._scrollPage("down");
					break;
				case a.ui.keyCode.END:
					b._moveFocus(":last");
					break;
				case a.ui.keyCode.ENTER:
				case a.ui.keyCode.SPACE:
					b.close(g, true);
					a(g.target).parents("li:eq(0)").trigger("mouseup");
					break;
				case a.ui.keyCode.TAB:
					f = true;
					b.close(g, true);
					a(g.target).parents("li:eq(0)").trigger("mouseup");
					break;
				case a.ui.keyCode.ESCAPE:
					b.close(g, true);
					break;
				default:
					f = true
				}
				return f
			}).bind("keypress.selectmenu", function(f) {
				if (f.which > 0) {
					b._typeAhead(f.which, "focus")
				}
				return true
			}).bind("mousedown.selectmenu mouseup.selectmenu", function() {
				return false
			});
			a(window).bind("resize.selectmenu-" + this.ids[0], a.proxy(b.close, this))
		},
		_init: function() {
			var s = this,
				e = this.options;
			var b = [];
			this.element.find("option").each(function() {
				var i = a(this);
				b.push({
					value: i.attr("value"),
					text: s._formatText(i.text(), i),
					selected: i.attr("selected"),
					disabled: i.attr("disabled"),
					classes: i.attr("class"),
					typeahead: i.attr("typeahead"),
					parentOptGroup: i.parent("optgroup"),
					bgImage: e.bgImage.call(i)
				})
			});
			var m = (s.options.style == "popup") ? " ui-state-active" : "";
			this.list.html("");
			if (b.length) {
				for (var k = 0; k < b.length; k++) {
					var f = {
						role: "presentation"
					};
					if (b[k].disabled) {
						f["class"] = "ui-state-disabled"
					}
					var t = {
						html: b[k].text || "&nbsp;",
						href: "#nogo",
						tabindex: -1,
						role: "option",
						"aria-selected": false
					};
					if (b[k].disabled) {
						t["aria-disabled"] = true
					}
					if (b[k].typeahead) {
						t.typeahead = b[k].typeahead
					}
					var r = a("<a/>", t).bind("focus.selectmenu", function() {
						a(this).parent().mouseover()
					}).bind("blur.selectmenu", function() {
						a(this).parent().mouseout()
					});
					var d = a("<li/>", f).append(r).data("index", k).addClass(b[k].classes).data("optionClasses", b[k].classes || "").bind("mouseup.selectmenu", function(i) {
						if (s._safemouseup && !s._disabled(i.currentTarget) && !s._disabled(a(i.currentTarget).parents("ul > li.ui-selectmenu-group "))) {
							s.index(a(this).data("index"));
							s.select(i);
							s.close(i, true)
						}
						return false
					}).bind("click.selectmenu", function() {
						return false
					}).bind("mouseover.selectmenu", function(i) {
						if (!a(this).hasClass("ui-state-disabled") && !a(this).parent("ul").parent("li").hasClass("ui-state-disabled")) {
							i.optionValue = s.element[0].options[a(this).data("index")].value;
							s._trigger("hover", i, s._uiHash());
							s._selectedOptionLi().addClass(m);
							s._focusedOptionLi().removeClass("ui-selectmenu-item-focus ui-state-hover");
							a(this).removeClass("ui-state-active").addClass("ui-selectmenu-item-focus ui-state-hover")
						}
					}).bind("mouseout.selectmenu", function(i) {
						if (a(this).is(s._selectedOptionLi())) {
							a(this).addClass(m)
						}
						i.optionValue = s.element[0].options[a(this).data("index")].value;
						s._trigger("blur", i, s._uiHash());
						a(this).removeClass("ui-selectmenu-item-focus ui-state-hover")
					});
					if (b[k].parentOptGroup.length) {
						var l = "ui-selectmenu-group-" + this.element.find("optgroup").index(b[k].parentOptGroup);
						if (this.list.find("li." + l).length) {
							this.list.find("li." + l + ":last ul").append(d)
						} else {
							a('<li role="presentation" class="ui-selectmenu-group ' + l + (b[k].parentOptGroup.attr("disabled") ? ' ui-state-disabled" aria-disabled="true"' : '"') + '><span class="ui-selectmenu-group-label">' + b[k].parentOptGroup.attr("label") + "</span><ul></ul></li>").appendTo(this.list).find("ul").append(d)
						}
					} else {
						d.appendTo(this.list)
					}
					if (e.icons) {
						for (var h in e.icons) {
							if (d.is(e.icons[h].find)) {
								d.data("optionClasses", b[k].classes + " ui-selectmenu-hasIcon").addClass("ui-selectmenu-hasIcon");
								var p = e.icons[h].icon || "";
								d.find("a:eq(0)").prepend('<span class="ui-selectmenu-item-icon ui-icon ' + p + '"></span>');
								if (b[k].bgImage) {
									d.find("span").css("background-image", b[k].bgImage)
								}
							}
						}
					}
				}
			} else {
				a('<li role="presentation"><a href="#nogo" tabindex="-1" role="option"></a></li>').appendTo(this.list)
			}
			var c = (e.style == "dropdown");
			this.newelement.toggleClass("ui-selectmenu-dropdown", c).toggleClass("ui-selectmenu-popup", !c);
			this.list.toggleClass("ui-selectmenu-menu-dropdown ui-corner-bottom", c).toggleClass("ui-selectmenu-menu-popup ui-corner-all", !c).find("li:first").toggleClass("ui-corner-top", !c).end().find("li:last").addClass("ui-corner-bottom");
			this.selectmenuIcon.toggleClass("ui-icon-triangle-1-s", c).toggleClass("ui-icon-triangle-2-n-s", !c);
			if (e.style == "dropdown") {
				this.list.width(e.menuWidth ? e.menuWidth : e.width)
			} else {
				this.list.width(e.menuWidth ? e.menuWidth : e.width - e.handleWidth)
			}
			if (!navigator.userAgent.match(/Android 2/)) {
				var n = this.listWrap.height();
				var g = a(window).height();
				var q = e.maxHeight ? Math.min(e.maxHeight, g) : g / 3;
				if (n > q) {
					this.list.height(q)
				}
			}
			this._optionLis = this.list.find("li:not(.ui-selectmenu-group)");
			if (this.element.attr("disabled")) {
				this.disable()
			} else {
				this.enable()
			}
			this._refreshValue();
			this._selectedOptionLi().addClass("ui-selectmenu-item-focus");
			clearTimeout(this.refreshTimeout);
			this.refreshTimeout = window.setTimeout(function() {
				s._refreshPosition()
			}, 200)
		},
		destroy: function() {
			this.element.removeData(this.widgetName).removeClass("ui-selectmenu-disabled ui-state-disabled").removeAttr("aria-disabled").unbind(".selectmenu");
			a(window).unbind(".selectmenu-" + this.ids[0]);
			a(document).unbind(".selectmenu-" + this.ids[0]);
			this.newelementWrap.remove();
			this.listWrap.remove();
			this.element.unbind(".selectmenu").show();
			a.Widget.prototype.destroy.apply(this, arguments)
		},
		_typeAhead: function(e, f) {
			var l = this,
				k = String.fromCharCode(e).toLowerCase(),
				d = null,
				j = null;
			if (l._typeAhead_timer) {
				window.clearTimeout(l._typeAhead_timer);
				l._typeAhead_timer = undefined
			}
			l._typeAhead_chars = (l._typeAhead_chars === undefined ? "" : l._typeAhead_chars).concat(k);
			if (l._typeAhead_chars.length < 2 || (l._typeAhead_chars.substr(-2, 1) === k && l._typeAhead_cycling)) {
				l._typeAhead_cycling = true;
				d = k
			} else {
				l._typeAhead_cycling = false;
				d = l._typeAhead_chars
			}
			var g = (f !== "focus" ? this._selectedOptionLi().data("index") : this._focusedOptionLi().data("index")) || 0;
			for (var h = 0; h < this._optionLis.length; h++) {
				var b = this._optionLis.eq(h).text().substr(0, d.length).toLowerCase();
				if (b === d) {
					if (l._typeAhead_cycling) {
						if (j === null) {
							j = h
						}
						if (h > g) {
							j = h;
							break
						}
					} else {
						j = h
					}
				}
			}
			if (j !== null) {
				this._optionLis.eq(j).find("a").trigger(f)
			}
			l._typeAhead_timer = window.setTimeout(function() {
				l._typeAhead_timer = undefined;
				l._typeAhead_chars = undefined;
				l._typeAhead_cycling = undefined
			}, l.options.typeAhead)
		},
		_uiHash: function() {
			var b = this.index();
			return {
				index: b,
				option: a("option", this.element).get(b),
				value: this.element[0].value
			}
		},
		open: function(e) {
			if (this.newelement.attr("aria-disabled") != "true") {
				var b = this,
					f = this.options,
					c = this._selectedOptionLi(),
					d = c.find("a");
				b._closeOthers(e);
				b.newelement.addClass("ui-state-active");
				b.list.attr("aria-hidden", false);
				b.listWrap.addClass("ui-selectmenu-open");
				if (f.style == "dropdown") {
					b.newelement.removeClass("ui-corner-all").addClass("ui-corner-top")
				} else {
					this.list.css("left", -5000).scrollTop(this.list.scrollTop() + c.position().top - this.list.outerHeight() / 2 + c.outerHeight() / 2).css("left", "auto")
				}
				b._refreshPosition();
				if (d.length) {
					d[0].focus()
				}
				b.isOpen = true;
				b._trigger("open", e, b._uiHash())
			}
		},
		close: function(c, b) {
			if (this.newelement.is(".ui-state-active")) {
				this.newelement.removeClass("ui-state-active");
				this.listWrap.removeClass("ui-selectmenu-open");
				this.list.attr("aria-hidden", true);
				if (this.options.style == "dropdown") {
					this.newelement.removeClass("ui-corner-top").addClass("ui-corner-all")
				}
				if (b) {
					this.newelement.focus()
				}
				this.isOpen = false;
				this._trigger("close", c, this._uiHash())
			}
		},
		change: function(b) {
			this.element.trigger("change");
			this._trigger("change", b, this._uiHash())
		},
		select: function(b) {
			if (this._disabled(b.currentTarget)) {
				return false
			}
			this._trigger("select", b, this._uiHash())
		},
		widget: function() {
			return this.listWrap.add(this.newelementWrap)
		},
		_closeOthers: function(b) {
			a(".ui-selectmenu.ui-state-active").not(this.newelement).each(function() {
				a(this).data("selectelement").selectmenu("close", b)
			});
			a(".ui-selectmenu.ui-state-hover").trigger("mouseout")
		},
		_toggle: function(c, b) {
			if (this.isOpen) {
				this.close(c, b)
			} else {
				this.open(c)
			}
		},
		_formatText: function(c, b) {
			if (this.options.format) {
				c = this.options.format(c, b)
			} else {
				if (this.options.escapeHtml) {
					c = a("<div />").text(c).html()
				}
			}
			return c
		},
		_selectedIndex: function() {
			return this.element[0].selectedIndex
		},
		_selectedOptionLi: function() {
			return this._optionLis.eq(this._selectedIndex())
		},
		_focusedOptionLi: function() {
			return this.list.find(".ui-selectmenu-item-focus")
		},
		_moveSelection: function(e, b) {
			if (!this.options.disabled) {
				var d = parseInt(this._selectedOptionLi().data("index") || 0, 10);
				var c = d + e;
				if (c < 0) {
					c = 0
				}
				if (c > this._optionLis.size() - 1) {
					c = this._optionLis.size() - 1
				}
				if (c === b) {
					return false
				}
				if (this._optionLis.eq(c).hasClass("ui-state-disabled")) {
					(e > 0) ? ++e : --e;
					this._moveSelection(e, c)
				} else {
					this._optionLis.eq(c).trigger("mouseover").trigger("mouseup")
				}
			}
		},
		_moveFocus: function(f, b) {
			if (!isNaN(f)) {
				var e = parseInt(this._focusedOptionLi().data("index") || 0, 10);
				var d = e + f
			} else {
				var d = parseInt(this._optionLis.filter(f).data("index"), 10)
			}
			if (d < 0) {
				d = 0
			}
			if (d > this._optionLis.size() - 1) {
				d = this._optionLis.size() - 1
			}
			if (d === b) {
				return false
			}
			var c = "ui-selectmenu-item-" + Math.round(Math.random() * 1000);
			this._focusedOptionLi().find("a:eq(0)").attr("id", "");
			if (this._optionLis.eq(d).hasClass("ui-state-disabled")) {
				(f > 0) ? ++f : --f;
				this._moveFocus(f, d)
			} else {
				this._optionLis.eq(d).find("a:eq(0)").attr("id", c).focus()
			}
			this.list.attr("aria-activedescendant", c)
		},
		_scrollPage: function(c) {
			var b = Math.floor(this.list.outerHeight() / this._optionLis.first().outerHeight());
			b = (c == "up" ? -b : b);
			this._moveFocus(b)
		},
		_setOption: function(b, c) {
			this.options[b] = c;
			if (b == "disabled") {
				if (c) {
					this.close()
				}
				this.element.add(this.newelement).add(this.list)[c ? "addClass" : "removeClass"]("ui-selectmenu-disabled ui-state-disabled").attr("aria-disabled", c).attr("tabindex", c ? 1 : 0)
			}
		},
		disable: function(b, c) {
			if (typeof(b) == "undefined") {
				this._setOption("disabled", true)
			} else {
				this._toggleEnabled((c || "option"), b, false)
			}
		},
		enable: function(b, c) {
			if (typeof(b) == "undefined") {
				this._setOption("disabled", false)
			} else {
				this._toggleEnabled((c || "option"), b, true)
			}
		},
		_disabled: function(b) {
			return a(b).hasClass("ui-state-disabled")
		},
		_toggleEnabled: function(e, c, b) {
			var d = this.element.find(e).eq(c),
				f = (e === "optgroup") ? this.list.find("li.ui-selectmenu-group-" + c) : this._optionLis.eq(c);
			if (f) {
				f.toggleClass("ui-state-disabled", !b).attr("aria-disabled", !b);
				if (b) {
					d.removeAttr("disabled")
				} else {
					d.attr("disabled", "disabled")
				}
			}
		},
		index: function(b) {
			if (arguments.length) {
				if (!this._disabled(a(this._optionLis[b])) && b != this._selectedIndex()) {
					this.element[0].selectedIndex = b;
					this._refreshValue();
					this.change()
				} else {
					return false
				}
			} else {
				return this._selectedIndex()
			}
		},
		value: function(b) {
			if (arguments.length && b != this.element[0].value) {
				this.element[0].value = b;
				this._refreshValue();
				this.change()
			} else {
				return this.element[0].value
			}
		},
		_refreshValue: function() {
			var d = (this.options.style == "popup") ? " ui-state-active" : "";
			var c = "ui-selectmenu-item-" + Math.round(Math.random() * 1000);
			this.list.find(".ui-selectmenu-item-selected").removeClass("ui-selectmenu-item-selected" + d).find("a").attr("aria-selected", "false").attr("id", "");
			this._selectedOptionLi().addClass("ui-selectmenu-item-selected" + d).find("a").attr("aria-selected", "true").attr("id", c);
			var b = (this.newelement.data("optionClasses") ? this.newelement.data("optionClasses") : "");
			var e = (this._selectedOptionLi().data("optionClasses") ? this._selectedOptionLi().data("optionClasses") : "");
			this.newelement.removeClass(b).data("optionClasses", e).addClass(e).find(".ui-selectmenu-status").html(this._selectedOptionLi().find("a:eq(0)").html());
			this.list.attr("aria-activedescendant", c)
		},
		_refreshPosition: function() {
			var d = this.options,
				c = {
					of: this.newelement,
					my: "left top",
					at: "left bottom",
					collision: "flip"
				};
			if (d.style == "popup") {
				var b = this._selectedOptionLi();
				c.my = "left top" + (this.list.offset().top - b.offset().top - (this.newelement.outerHeight() + b.outerHeight()) / 2);
				c.collision = "fit"
			}
			this.listWrap.removeAttr("style").zIndex(this.element.zIndex() + 2).position(a.extend(c, d.positionOptions))
		}
	})
})(jQuery);
/*!
    SPREECAST ENGINEERS
    there are fixes made to this file according to this:
    https://github.com/pvdspek/jquery.autoellipsis/issues/15

    e.g.
    function removeLastEmptyElements(element) {
       while (_removeLastEmptyElements(element)) { }
      }
    }
    function _removeLastEmptyElements(element) {
    // old code of removeLastEmptyElements
*/
;
/*!

    Copyright (c) 2011 Peter van der Spek

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

 */
(function(e) {
	var l = {};
	var n;
	var k = false;
	var i = {
		ellipsis: "...",
		setTitle: "never",
		live: false
	};
	e.fn.ellipsis = function(o, p) {
		var r, q;
		r = e(this);
		if (typeof o !== "string") {
			p = o;
			o = undefined
		}
		q = e.extend({}, i, p);
		q.selector = o;
		r.each(function() {
			var s = e(this);
			j(s, q)
		});
		if (q.live) {
			h(r.selector, q)
		} else {
			g(r.selector)
		}
		return this
	};

	function j(w, p) {
		var t = w.data("jqae");
		if (!t) {
			t = {}
		}
		var x = t.wrapperElement;
		if (!x) {
			x = w.wrapInner("<div/>").find(">div");
			x.css({
				margin: 0,
				padding: 0,
				border: 0
			})
		}
		var r = x.data("jqae");
		if (!r) {
			r = {}
		}
		var s = r.originalContent;
		if (s) {
			x = r.originalContent.clone(true).data("jqae", {
				originalContent: s
			}).replaceAll(x)
		} else {
			x.data("jqae", {
				originalContent: x.clone(true)
			})
		}
		w.data("jqae", {
			wrapperElement: x,
			containerWidth: w.width(),
			containerHeight: w.height()
		});
		var v = w.height();
		var o = (parseInt(w.css("padding-top"), 10) || 0) + (parseInt(w.css("border-top-width"), 10) || 0) - (x.offset().top - w.offset().top);
		var u = false;
		var q = x;
		if (p.selector) {
			q = e(x.find(p.selector).get().reverse())
		}
		q.each(function() {
			var A = e(this),
				z = A.text(),
				y = false;
			if (x.innerHeight() - A.innerHeight() > v + o) {
				A.remove()
			} else {
				d(A);
				if (A.contents().length) {
					if (u) {
						a(A).get(0).nodeValue += p.ellipsis;
						u = false
					}
					while (x.innerHeight() > v + o) {
						y = f(A);
						if (y) {
							d(A);
							if (A.contents().length) {
								a(A).get(0).nodeValue += p.ellipsis
							} else {
								u = true;
								A.remove();
								break
							}
						} else {
							u = true;
							A.remove();
							break
						}
					}
					if (((p.setTitle == "onEllipsis") && y) || (p.setTitle == "always")) {
						A.attr("title", z)
					} else {
						if (p.setTitle != "never") {
							A.removeAttr("title")
						}
					}
				}
			}
		})
	}
	function f(p) {
		var o = a(p);
		if (o.length) {
			var q = o.get(0).nodeValue;
			var r = q.lastIndexOf(" ");
			if (r > -1) {
				q = e.trim(q.substring(0, r));
				o.get(0).nodeValue = q
			} else {
				o.get(0).nodeValue = ""
			}
			return true
		}
		return false
	}
	function a(o) {
		if (o.contents().length) {
			var q = o.contents();
			var p = q.eq(q.length - 1);
			if (p.filter(c).length) {
				return p
			} else {
				return a(p)
			}
		} else {
			o.append("");
			var q = o.contents();
			return q.eq(q.length - 1)
		}
	}
	function d(o) {
		while (m(o)) {}
	}
	function m(o) {
		if (o.contents().length) {
			var q = o.contents();
			var p = q.eq(q.length - 1);
			if (p.filter(c).length) {
				var r = p.get(0).nodeValue;
				r = e.trim(r);
				if (r == "") {
					p.remove();
					return true
				} else {
					return false
				}
			} else {
				while (d(p)) {}
				if (p.contents().length) {
					return false
				} else {
					p.remove();
					return true
				}
			}
		}
		return false
	}
	function c() {
		return this.nodeType === 3
	}
	function h(p, o) {
		l[p] = o;
		if (!n) {
			n = window.setInterval(function() {
				b()
			}, 200)
		}
	}
	function g(o) {
		if (l[o]) {
			delete l[o];
			if (!l.length) {
				if (n) {
					window.clearInterval(n);
					n = undefined
				}
			}
		}
	}
	function b() {
		if (!k) {
			k = true;
			for (var o in l) {
				e(o).each(function() {
					var q, p;
					q = e(this);
					p = q.data("jqae");
					if ((p.containerWidth != q.width()) || (p.containerHeight != q.height())) {
						j(q, l[o])
					}
				})
			}
			k = false
		}
	}
})(jQuery);
/*!
	SPREECAST ENGINEERS:
	We changed this to replace text via the html() function, not text() as in the original plugin. This allows us to insert HTML for the ellipsis.
	We changed this to insert a title attribute containing the original text.
	We changed a parameter name from a reserved word to 'ellipsis_html'.
*/
(function(a) {
	var b = {
		row: 2,
		onlyFullWords: false,
		ellipsis_html: "&hellip;",
		callback: function() {},
		position: "tail"
	};
	a.fn.itemToggle = function() {
		var f = this;
		var e = " and MM More";
		var c = f.text();
		var d = function() {
				var m = f.data("count");
				var h = f.text().split(e)[0].trim();
				f.empty();
				if (h.substr(-1) === ",") {
					h = h.substring(0, h.length - 1)
				}
				var k = function(n) {
						var o = n.length - 1;
						_.each(n, function(r, p) {
							var q = r;
							if (p != o) {
								q += ", "
							}
							f.append(a('<li class="single-tag"><a href="/searches?tag=' + r + '">' + q + "</a></li>"))
						})
					};
				var g = h.split(", "),
					i = g.length;
				k(g);
				var j = (m - i);
				if (j > 0) {
					var l = a('<a class="single-tag" data-more="' + j + '">and </a>');
					l.click(function() {
						l.remove();
						f.empty();
						var n = c.split(", ");
						k(n);
						var o = a('<a class="single-tag" data-less="' + i + '">show less</a>');
						o.click(function() {
							o.remove();
							f.itemToggle()
						});
						f.append(o)
					});
					f.append(l)
				}
			};
		f.multiLine({
			row: 1,
			ellipsis_html: e,
			onlyFullWords: true,
			callback: d
		})
	};
	a.fn.multiLineToggle = function(d) {
		var c = jQuery.extend(true, {}, b);
		d = a.extend(c, d);
		d.ellipsis_html = ('&hellip;<span class="toggle-content" data-lines="' + d.row + '" data-state="more">&nbsp;&nbsp;&nbsp;show</span>');
		return this.multiLine(d)
	};
	a.fn.multiLine = function(d) {
		var c = jQuery.extend(true, {}, b);
		d = a.extend(c, d);
		this.each(function() {
			var n = a(this);
			var q = n.html();
			var j = q;
			var l = n.text();
			var h = j.length;
			var r = n.height();
			n.text("a");
			var p = parseFloat(n.css("lineHeight"), 10);
			var e = n.height();
			var t = p > e ? (p - e) : 0;
			var k = t * (d.row - 1) + e * d.row;
			if (r <= k) {
				n.html(q);
				d.callback.call(this);
				return
			}
			var f = 1,
				g = 0;
			var i = q.length;
			if (d.position === "tail") {
				while (f < i) {
					g = Math.ceil((f + i) / 2);
					n.html(q.slice(0, g) + d.ellipsis_html);
					if (n.height() <= k) {
						f = g
					} else {
						i = g - 1
					}
				}
				q = q.slice(0, f);
				if (d.onlyFullWords) {
					q = q.replace(/[\u00AD\w\uac00-\ud7af]+$/, "")
				}
				q += d.ellipsis_html
			} else {
				if (d.position === "middle") {
					var s = 0;
					while (f < i) {
						g = Math.ceil((f + i) / 2);
						s = Math.max(h - g, 0);
						n.html(j.slice(0, Math.floor((h - s) / 2)) + d.ellipsis_html + j.slice(Math.floor((h + s) / 2), h));
						if (n.height() <= k) {
							f = g
						} else {
							i = g - 1
						}
					}
					s = Math.max(h - f, 0);
					var o = j.slice(0, Math.floor((h - s) / 2));
					var m = j.slice(Math.floor((h + s) / 2), h);
					if (d.onlyFullWords) {
						o = o.replace(/[\u00AD\w\uac00-\ud7af]+$/, "")
					}
					q = o + d.ellipsis_html + m
				}
			}
			n.attr("title", l);
			n.html(q);
			d.callback.call(this)
		});
		return this
	}
})(jQuery);
!
function(a) {
	a(function() {
		a.support.transition = (function() {
			var b = (function() {
				var e = document.createElement("bootstrap"),
					d = {
						WebkitTransition: "webkitTransitionEnd",
						MozTransition: "transitionend",
						OTransition: "oTransitionEnd otransitionend",
						transition: "transitionend"
					},
					c;
				for (c in d) {
					if (e.style[c] !== undefined) {
						return d[c]
					}
				}
			}());
			return b && {
				end: b
			}
		})()
	})
}(window.jQuery);
!
function(b) {
	var a = function(d, c) {
			this.options = c;
			this.$element = b(d).delegate('[data-dismiss="modal"]', "click.dismiss.modal", b.proxy(this.hide, this));
			this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
		};
	a.prototype = {
		constructor: a,
		toggle: function() {
			return this[!this.isShown ? "show" : "hide"]()
		},
		show: function() {
			var c = this,
				d = b.Event("show");
			this.$element.trigger(d);
			if (this.isShown || d.isDefaultPrevented()) {
				return
			}
			this.isShown = true;
			this.escape();
			this.backdrop(function() {
				var e = b.support.transition && c.$element.hasClass(c.options.easein);
				if (!c.$element.parent().length) {
					c.$element.appendTo(document.body)
				}
				c.$element.show();
				if (e) {
					c.$element[0].offsetWidth
				}
				c.$element.removeClass(c.options.easeout).addClass("animated " + c.options.easein).attr("aria-hidden", false);
				e ? c.$element.one(b.support.transition.end, function() {
					c.$element.focus().trigger("shown")
				}) : c.$element.focus().trigger("shown")
			})
		},
		hide: function(d) {
			d && d.preventDefault();
			var c = this;
			d = b.Event("hide");
			this.$element.trigger(d);
			if (!this.isShown || d.isDefaultPrevented()) {
				return
			}
			this.isShown = false;
			this.escape();
			b(document).off("focusin.modal");
			this.$element.attr("aria-hidden", true);
			b.support.transition && this.$element.hasClass(c.options.easein) ? this.hideWithTransition() : this.hideModal()
		},
		enforceFocus: function() {
			var c = this;
			b(document).on("focusin.modal", function(d) {
				if (c.$element[0] !== d.target && !c.$element.has(d.target).length) {
					c.$element.focus()
				}
			})
		},
		escape: function() {
			var c = this;
			if (this.isShown && this.options.keyboard) {
				this.$element.on("keyup.dismiss.modal", function(d) {
					d.which == 27 && c.hide()
				})
			} else {
				if (!this.isShown) {
					this.$element.off("keyup.dismiss.modal")
				}
			}
		},
		hideWithTransition: function() {
			var c = this,
				d = setTimeout(function() {
					c.$element.off(b.support.transition.end);
					c.hideModal()
				}, 100);
			c.$element.removeClass(c.options.easein).addClass("animated " + c.options.easeout);
			this.$element.one(b.support.transition.end, function() {
				clearTimeout(d);
				c.hideModal()
			})
		},
		hideModal: function(c) {
			this.$element.hide().trigger("hidden");
			this.backdrop()
		},
		removeBackdrop: function() {
			this.$backdrop.remove();
			this.$backdrop = null
		},
		backdrop: function(f) {
			var e = this,
				d = this.$element.hasClass(e.options.easein) ? "fade" : "";
			if (this.isShown && this.options.backdrop) {
				var c = b.support.transition && d;
				this.$backdrop = b('<div class="modal-backdrop ' + d + '" />').appendTo(document.body);
				this.$backdrop.click(this.options.backdrop == "static" ? b.proxy(this.$element[0].focus, this.$element[0]) : b.proxy(this.hide, this));
				if (c) {
					this.$backdrop[0].offsetWidth
				}
				this.$backdrop.addClass("in");
				c ? this.$backdrop.one(b.support.transition.end, f) : f()
			} else {
				if (!this.isShown && this.$backdrop) {
					this.$backdrop.removeClass("in");
					b.support.transition && this.$element.hasClass(e.options.easein) ? this.$backdrop.one(b.support.transition.end, b.proxy(this.removeBackdrop, this)) : this.removeBackdrop()
				} else {
					if (f) {
						f()
					}
				}
			}
		}
	};
	b.fn.modal = function(c) {
		return this.each(function() {
			var f = b(this),
				e = f.data("modal"),
				d = b.extend({}, b.fn.modal.defaults, f.data(), typeof c == "object" && c);
			if (!e) {
				f.data("modal", (e = new a(this, d)))
			}
			if (typeof c == "string") {
				e[c]()
			} else {
				if (d.show) {
					e.show()
				}
			}
		})
	};
	b.fn.modal.defaults = {
		backdrop: true,
		keyboard: true,
		show: true,
		easein: "",
		easeout: ""
	};
	b.fn.modal.Constructor = a;
	b(document).on("click.modal.data-api", '[data-toggle="modal"]', function(h) {
		var g = b(this),
			d = g.attr("href"),
			c = b(g.attr("data-target") || (d && d.replace(/.*(?=#[^\s]+$)/, ""))),
			f = c.data("modal") ? "toggle" : b.extend({
				remote: !/#/.test(d) && d
			}, c.data(), g.data());
		h.preventDefault();
		c.modal(f).one("hide", function() {
			g.focus()
		})
	})
}(window.jQuery);
window.Modernizr = (function(o, u, j) {
	var f = "2.7.2",
		m = {},
		E = u.documentElement,
		F = "modernizr",
		C = u.createElement(F),
		p = C.style,
		g, x = {}.toString,
		z = " -webkit- -moz- -o- -ms- ".split(" "),
		d = "Webkit Moz O ms",
		H = d.split(" "),
		q = d.toLowerCase().split(" "),
		k = {},
		e = {},
		v = {},
		B = [],
		w = B.slice,
		b, A = function(R, T, L, S) {
			var K, Q, N, O, J = u.createElement("div"),
				P = u.body,
				M = P || u.createElement("body");
			if (parseInt(L, 10)) {
				while (L--) {
					N = u.createElement("div");
					N.id = S ? S[L] : F + (L + 1);
					J.appendChild(N)
				}
			}
			K = ["&#173;", '<style id="s', F, '">', R, "</style>"].join("");
			J.id = F;
			(P ? J : M).innerHTML += K;
			M.appendChild(J);
			if (!P) {
				M.style.background = "";
				M.style.overflow = "hidden";
				O = E.style.overflow;
				E.style.overflow = "hidden";
				E.appendChild(M)
			}
			Q = T(J, R);
			if (!P) {
				M.parentNode.removeChild(M);
				E.style.overflow = O
			} else {
				J.parentNode.removeChild(J)
			}
			return !!Q
		},
		c = function(L) {
			var K = o.matchMedia || o.msMatchMedia;
			if (K) {
				return K(L).matches
			}
			var J;
			A("@media " + L + " { #" + F + " { position: absolute; } }", function(M) {
				J = (o.getComputedStyle ? getComputedStyle(M, null) : M.currentStyle)["position"] == "absolute"
			});
			return J
		},
		t = (function() {
			var K = {
				select: "input",
				change: "input",
				submit: "form",
				reset: "form",
				error: "img",
				load: "img",
				abort: "img"
			};

			function J(L, N) {
				N = N || u.createElement(K[L] || "div");
				L = "on" + L;
				var M = L in N;
				if (!M) {
					if (!N.setAttribute) {
						N = u.createElement("div")
					}
					if (N.setAttribute && N.removeAttribute) {
						N.setAttribute(L, "");
						M = l(N[L], "function");
						if (!l(N[L], "undefined")) {
							N[L] = j
						}
						N.removeAttribute(L)
					}
				}
				N = null;
				return M
			}
			return J
		})(),
		s = ({}).hasOwnProperty,
		D;
	if (!l(s, "undefined") && !l(s.call, "undefined")) {
		D = function(J, K) {
			return s.call(J, K)
		}
	} else {
		D = function(J, K) {
			return ((K in J) && l(J.constructor.prototype[K], "undefined"))
		}
	}
	if (!Function.prototype.bind) {
		Function.prototype.bind = function I(L) {
			var M = this;
			if (typeof M != "function") {
				throw new TypeError()
			}
			var J = w.call(arguments, 1),
				K = function() {
					if (this instanceof K) {
						var P = function() {};
						P.prototype = M.prototype;
						var O = new P();
						var N = M.apply(O, J.concat(w.call(arguments)));
						if (Object(N) === N) {
							return N
						}
						return O
					} else {
						return M.apply(L, J.concat(w.call(arguments)))
					}
				};
			return K
		}
	}
	function r(J) {
		p.cssText = J
	}
	function i(K, J) {
		return r(z.join(K + ";") + (J || ""))
	}
	function l(K, J) {
		return typeof K === J
	}
	function n(K, J) {
		return !!~ ("" + K).indexOf(J)
	}
	function G(L, J) {
		for (var K in L) {
			var M = L[K];
			if (!n(M, "-") && p[M] !== j) {
				return J == "pfx" ? M : true
			}
		}
		return false
	}
	function y(K, N, M) {
		for (var J in K) {
			var L = N[K[J]];
			if (L !== j) {
				if (M === false) {
					return K[J]
				}
				if (l(L, "function")) {
					return L.bind(M || N)
				}
				return L
			}
		}
		return false
	}
	function a(N, J, M) {
		var K = N.charAt(0).toUpperCase() + N.slice(1),
			L = (N + " " + H.join(K + " ") + K).split(" ");
		if (l(J, "string") || l(J, "undefined")) {
			return G(L, J)
		} else {
			L = (N + " " + (q).join(K + " ") + K).split(" ");
			return y(L, J, M)
		}
	}
	k.flexbox = function() {
		return a("flexWrap")
	};
	k.flexboxlegacy = function() {
		return a("boxDirection")
	};
	k.hsla = function() {
		r("background-color:hsla(120,40%,100%,.5)");
		return n(p.backgroundColor, "rgba") || n(p.backgroundColor, "hsla")
	};
	for (var h in k) {
		if (D(k, h)) {
			b = h.toLowerCase();
			m[b] = k[h]();
			B.push((m[b] ? "" : "no-") + b)
		}
	}
	m.addTest = function(K, L) {
		if (typeof K == "object") {
			for (var J in K) {
				if (D(K, J)) {
					m.addTest(J, K[J])
				}
			}
		} else {
			K = K.toLowerCase();
			if (m[K] !== j) {
				return m
			}
			L = typeof L == "function" ? L() : L;
			if (typeof enableClasses !== "undefined" && enableClasses) {
				E.className += " " + (L ? "" : "no-") + K
			}
			m[K] = L
		}
		return m
	};
	r("");
	C = g = null;
	m._version = f;
	m._prefixes = z;
	m._domPrefixes = q;
	m._cssomPrefixes = H;
	m.mq = c;
	m.hasEvent = t;
	m.testProp = function(J) {
		return G([J])
	};
	m.testAllProps = a;
	m.testStyles = A;
	m.prefixed = function(L, K, J) {
		if (!K) {
			return a(L, "pfx")
		} else {
			return a(L, K, J)
		}
	};
	return m
})(this, this.document);
Modernizr.addTest("mediaqueries", Modernizr.mq("only all"));
Modernizr.addTest("cssvhunit", function() {
	var a;
	Modernizr.testStyles("#modernizr { height: 50vh; }", function(d, e) {
		var b = parseInt(window.innerHeight / 2, 10),
			c = parseInt((window.getComputedStyle ? getComputedStyle(d, null) : d.currentStyle)["height"], 10);
		if (c == b) {
			a = true
		} else {
			if (b == 0) {
				a = false
			} else {
				delta = Math.abs(c - b);
				error = delta / b;
				if (error < 0.05) {
					a = true
				} else {
					a = false
				}
			}
		}
	});
	return a
});
Modernizr.addTest("cssvmaxunit", function() {
	var a;
	Modernizr.testStyles("#modernizr { width: 50vmax; }", function(d, e) {
		var c = window.innerWidth / 100,
			f = window.innerHeight / 100,
			b = parseInt((window.getComputedStyle ? getComputedStyle(d, null) : d.currentStyle)["width"], 10);
		a = (parseInt(Math.max(c, f) * 50, 10) == b)
	});
	return a
});
Modernizr.addTest("cssvminunit", function() {
	var a;
	Modernizr.testStyles("#modernizr { width: 50vmin; }", function(d, e) {
		var c = window.innerWidth / 100,
			f = window.innerHeight / 100,
			b = parseInt((window.getComputedStyle ? getComputedStyle(d, null) : d.currentStyle)["width"], 10);
		a = (parseInt(Math.min(c, f) * 50, 10) == b)
	});
	return a
});
Modernizr.addTest("cssvwunit", function() {
	var a;
	Modernizr.testStyles("#modernizr { width: 50vw; }", function(d, e) {
		var c = parseInt(window.innerWidth / 2, 10),
			b = parseInt((window.getComputedStyle ? getComputedStyle(d, null) : d.currentStyle)["width"], 10);
		a = (b == c)
	});
	return a
});
(function() {
	var au = this,
		af = au._,
		ak = {},
		ah = Array.prototype,
		ap = Object.prototype,
		ag = Function.prototype,
		aj = ah.push,
		ae = ah.slice,
		ay = ah.concat,
		at = ah.unshift,
		am = ap.toString,
		aw = ap.hasOwnProperty,
		aq = ah.forEach,
		ai = ah.map,
		av = ah.reduce,
		ad = ah.reduceRight,
		al = ah.filter,
		ar = ah.every,
		aa = ah.some,
		ax = ah.indexOf,
		ac = ah.lastIndexOf,
		V = Array.isArray,
		z = Object.keys,
		ab = ag.bind,
		q = function(a) {
			if (a instanceof q) {
				return a
			}
			if (!(this instanceof q)) {
				return new q(a)
			}
			this._wrapped = a
		};
	typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = q), exports._ = q) : au._ = q, q.VERSION = "1.4.2";
	var J = q.each = q.forEach = function(f, b, d) {
			if (f == null) {
				return
			}
			if (aq && f.forEach === aq) {
				f.forEach(b, d)
			} else {
				if (f.length === +f.length) {
					for (var a = 0, c = f.length; a < c; a++) {
						if (b.call(d, f[a], a, f) === ak) {
							return
						}
					}
				} else {
					for (var g in f) {
						if (q.has(f, g) && b.call(d, f[g], g, f) === ak) {
							return
						}
					}
				}
			}
		};
	q.map = q.collect = function(c, a, d) {
		var b = [];
		return c == null ? b : ai && c.map === ai ? c.map(a, d) : (J(c, function(h, f, g) {
			b[b.length] = a.call(d, h, f, g)
		}), b)
	}, q.reduce = q.foldl = q.inject = function(d, b, f, c) {
		var a = arguments.length > 2;
		d == null && (d = []);
		if (av && d.reduce === av) {
			return c && (b = q.bind(b, c)), a ? d.reduce(b, f) : d.reduce(b)
		}
		J(d, function(h, g, i) {
			a ? f = b.call(c, f, h, g, i) : (f = h, a = !0)
		});
		if (!a) {
			throw new TypeError("Reduce of empty array with no initial value")
		}
		return f
	}, q.reduceRight = q.foldr = function(f, b, h, d) {
		var a = arguments.length > 2;
		f == null && (f = []);
		if (ad && f.reduceRight === ad) {
			return d && (b = q.bind(b, d)), arguments.length > 2 ? f.reduceRight(b, h) : f.reduceRight(b)
		}
		var c = f.length;
		if (c !== +c) {
			var g = q.keys(f);
			c = g.length
		}
		J(f, function(i, e, j) {
			e = g ? g[--c] : --c, a ? h = b.call(d, h, f[e], e, j) : (h = f[e], a = !0)
		});
		if (!a) {
			throw new TypeError("Reduce of empty array with no initial value")
		}
		return h
	}, q.find = q.detect = function(c, a, d) {
		var b;
		return X(c, function(h, f, g) {
			if (a.call(d, h, f, g)) {
				return b = h, !0
			}
		}), b
	}, q.filter = q.select = function(c, a, d) {
		var b = [];
		return c == null ? b : al && c.filter === al ? c.filter(a, d) : (J(c, function(h, f, g) {
			a.call(d, h, f, g) && (b[b.length] = h)
		}), b)
	}, q.reject = function(c, a, d) {
		var b = [];
		return c == null ? b : (J(c, function(h, f, g) {
			a.call(d, h, f, g) || (b[b.length] = h)
		}), b)
	}, q.every = q.all = function(d, b, c) {
		b || (b = q.identity);
		var a = !0;
		return d == null ? a : ar && d.every === ar ? d.every(b, c) : (J(d, function(g, f, h) {
			if (!(a = a && b.call(c, g, f, h))) {
				return ak
			}
		}), !! a)
	};
	var X = q.some = q.any = function(d, b, c) {
			b || (b = q.identity);
			var a = !1;
			return d == null ? a : aa && d.some === aa ? d.some(b, c) : (J(d, function(g, f, h) {
				if (a || (a = b.call(c, g, f, h))) {
					return ak
				}
			}), !! a)
		};
	q.contains = q.include = function(b, a) {
		var c = !1;
		return b == null ? c : ax && b.indexOf === ax ? b.indexOf(a) != -1 : (c = X(b, function(d) {
			return d === a
		}), c)
	}, q.invoke = function(b, a) {
		var c = ae.call(arguments, 2);
		return q.map(b, function(d) {
			return (q.isFunction(a) ? a : d[a]).apply(d, c)
		})
	}, q.pluck = function(b, a) {
		return q.map(b, function(c) {
			return c[a]
		})
	}, q.where = function(b, a) {
		return q.isEmpty(a) ? [] : q.filter(b, function(c) {
			for (var d in a) {
				if (a[d] !== c[d]) {
					return !1
				}
			}
			return !0
		})
	}, q.max = function(c, a, d) {
		if (!a && q.isArray(c) && c[0] === +c[0] && c.length < 65535) {
			return Math.max.apply(Math, c)
		}
		if (!a && q.isEmpty(c)) {
			return -Infinity
		}
		var b = {
			computed: -Infinity
		};
		return J(c, function(h, f, g) {
			var j = a ? a.call(d, h, f, g) : h;
			j >= b.computed && (b = {
				value: h,
				computed: j
			})
		}), b.value
	}, q.min = function(c, a, d) {
		if (!a && q.isArray(c) && c[0] === +c[0] && c.length < 65535) {
			return Math.min.apply(Math, c)
		}
		if (!a && q.isEmpty(c)) {
			return Infinity
		}
		var b = {
			computed: Infinity
		};
		return J(c, function(h, f, g) {
			var j = a ? a.call(d, h, f, g) : h;
			j < b.computed && (b = {
				value: h,
				computed: j
			})
		}), b.value
	}, q.shuffle = function(c) {
		var a, d = 0,
			b = [];
		return J(c, function(f) {
			a = q.random(d++), b[d - 1] = b[a], b[a] = f
		}), b
	};
	var an = function(a) {
			return q.isFunction(a) ? a : function(b) {
				return b[a]
			}
		};
	q.sortBy = function(c, a, d) {
		var b = an(a);
		return q.pluck(q.map(c, function(h, g, f) {
			return {
				value: h,
				index: g,
				criteria: b.call(d, h, g, f)
			}
		}).sort(function(h, f) {
			var i = h.criteria,
				g = f.criteria;
			if (i !== g) {
				if (i > g || i === void 0) {
					return 1
				}
				if (i < g || g === void 0) {
					return -1
				}
			}
			return h.index < f.index ? -1 : 1
		}), "value")
	};
	var Q = function(f, b, g, d) {
			var a = {},
				c = an(b);
			return J(f, function(h, i) {
				var e = c.call(g, h, i, f);
				d(a, e, h)
			}), a
		};
	q.groupBy = function(b, a, c) {
		return Q(b, a, c, function(f, d, g) {
			(q.has(f, d) ? f[d] : f[d] = []).push(g)
		})
	}, q.countBy = function(b, a, c) {
		return Q(b, a, c, function(f, d, g) {
			q.has(f, d) || (f[d] = 0), f[d]++
		})
	}, q.sortedIndex = function(g, c, j, f) {
		j = j == null ? q.identity : an(j);
		var b = j.call(f, c),
			d = 0,
			h = g.length;
		while (d < h) {
			var a = d + h >>> 1;
			j.call(f, g[a]) < b ? d = a + 1 : h = a
		}
		return d
	}, q.toArray = function(a) {
		return a ? a.length === +a.length ? ae.call(a) : q.values(a) : []
	}, q.size = function(a) {
		return a.length === +a.length ? a.length : q.keys(a).length
	}, q.first = q.head = q.take = function(b, a, c) {
		return a != null && !c ? ae.call(b, 0, a) : b[0]
	}, q.initial = function(b, a, c) {
		return ae.call(b, 0, b.length - (a == null || c ? 1 : a))
	}, q.last = function(b, a, c) {
		return a != null && !c ? ae.call(b, Math.max(b.length - a, 0)) : b[b.length - 1]
	}, q.rest = q.tail = q.drop = function(b, a, c) {
		return ae.call(b, a == null || c ? 1 : a)
	}, q.compact = function(a) {
		return q.filter(a, function(b) {
			return !!b
		})
	};
	var Z = function(b, a, c) {
			return J(b, function(d) {
				q.isArray(d) ? a ? aj.apply(c, d) : Z(d, a, c) : c.push(d)
			}), c
		};
	q.flatten = function(b, a) {
		return Z(b, a, [])
	}, q.without = function(a) {
		return q.difference(a, ae.call(arguments, 1))
	}, q.uniq = q.unique = function(f, b, h, d) {
		var a = h ? q.map(f, h, d) : f,
			c = [],
			g = [];
		return J(a, function(i, e) {
			if (b ? !e || g[g.length - 1] !== i : !q.contains(g, i)) {
				g.push(i), c.push(f[e])
			}
		}), c
	}, q.union = function() {
		return q.uniq(ay.apply(ah, arguments))
	}, q.intersection = function(b) {
		var a = ae.call(arguments, 1);
		return q.filter(q.uniq(b), function(c) {
			return q.every(a, function(d) {
				return q.indexOf(d, c) >= 0
			})
		})
	}, q.difference = function(b) {
		var a = ay.apply(ah, ae.call(arguments, 1));
		return q.filter(b, function(c) {
			return !q.contains(a, c)
		})
	}, q.zip = function() {
		var c = ae.call(arguments),
			a = q.max(q.pluck(c, "length")),
			d = new Array(a);
		for (var b = 0; b < a; b++) {
			d[b] = q.pluck(c, "" + b)
		}
		return d
	}, q.object = function(d, b) {
		var f = {};
		for (var c = 0, a = d.length; c < a; c++) {
			b ? f[d[c]] = b[c] : f[d[c][0]] = d[c][1]
		}
		return f
	}, q.indexOf = function(d, b, f) {
		if (d == null) {
			return -1
		}
		var c = 0,
			a = d.length;
		if (f) {
			if (typeof f != "number") {
				return c = q.sortedIndex(d, b), d[c] === b ? c : -1
			}
			c = f < 0 ? Math.max(0, a + f) : f
		}
		if (ax && d.indexOf === ax) {
			return d.indexOf(b, f)
		}
		for (; c < a; c++) {
			if (d[c] === b) {
				return c
			}
		}
		return -1
	}, q.lastIndexOf = function(d, b, f) {
		if (d == null) {
			return -1
		}
		var c = f != null;
		if (ac && d.lastIndexOf === ac) {
			return c ? d.lastIndexOf(b, f) : d.lastIndexOf(b)
		}
		var a = c ? f : d.length;
		while (a--) {
			if (d[a] === b) {
				return a
			}
		}
		return -1
	}, q.range = function(f, b, g) {
		arguments.length <= 1 && (b = f || 0, f = 0), g = arguments[2] || 1;
		var d = Math.max(Math.ceil((b - f) / g), 0),
			a = 0,
			c = new Array(d);
		while (a < d) {
			c[a++] = f, f += g
		}
		return c
	};
	var I = function() {};
	q.bind = function(b, d) {
		var c, a;
		if (b.bind === ab && ab) {
			return ab.apply(b, ae.call(arguments, 1))
		}
		if (!q.isFunction(b)) {
			throw new TypeError
		}
		return a = ae.call(arguments, 2), c = function() {
			if (this instanceof c) {
				I.prototype = b.prototype;
				var g = new I,
					f = b.apply(g, a.concat(ae.call(arguments)));
				return Object(f) === f ? f : g
			}
			return b.apply(d, a.concat(ae.call(arguments)))
		}
	}, q.bindAll = function(b) {
		var a = ae.call(arguments, 1);
		return a.length == 0 && (a = q.functions(b)), J(a, function(c) {
			b[c] = q.bind(b[c], b)
		}), b
	}, q.memoize = function(b, a) {
		var c = {};
		return a || (a = q.identity), function() {
			var d = a.apply(this, arguments);
			return q.has(c, d) ? c[d] : c[d] = b.apply(this, arguments)
		}
	}, q.delay = function(b, a) {
		var c = ae.call(arguments, 2);
		return setTimeout(function() {
			return b.apply(null, c)
		}, a)
	}, q.defer = function(a) {
		return q.delay.apply(q, [a, 1].concat(ae.call(arguments, 1)))
	}, q.throttle = function(g, k) {
		var d, b, f, l, c, j, h = q.debounce(function() {
			c = l = !1
		}, k);
		return function() {
			d = this, b = arguments;
			var a = function() {
					f = null, c && (j = g.apply(d, b)), h()
				};
			return f || (f = setTimeout(a, k)), l ? c = !0 : (l = !0, j = g.apply(d, b)), h(), j
		}
	}, q.debounce = function(d, b, f) {
		var c, a;
		return function() {
			var h = this,
				i = arguments,
				g = function() {
					c = null, f || (a = d.apply(h, i))
				},
				e = f && !c;
			return clearTimeout(c), c = setTimeout(g, b), e && (a = d.apply(h, i)), a
		}
	}, q.once = function(b) {
		var a = !1,
			c;
		return function() {
			return a ? c : (a = !0, c = b.apply(this, arguments), b = null, c)
		}
	}, q.wrap = function(b, a) {
		return function() {
			var c = [b];
			return aj.apply(c, arguments), a.apply(this, c)
		}
	}, q.compose = function() {
		var a = arguments;
		return function() {
			var b = arguments;
			for (var c = a.length - 1; c >= 0; c--) {
				b = [a[c].apply(this, b)]
			}
			return b[0]
		}
	}, q.after = function(b, a) {
		return b <= 0 ? a() : function() {
			if (--b < 1) {
				return a.apply(this, arguments)
			}
		}
	}, q.keys = z ||
	function(b) {
		if (b !== Object(b)) {
			throw new TypeError("Invalid object")
		}
		var a = [];
		for (var c in b) {
			q.has(b, c) && (a[a.length] = c)
		}
		return a
	}, q.values = function(b) {
		var a = [];
		for (var c in b) {
			q.has(b, c) && a.push(b[c])
		}
		return a
	}, q.pairs = function(b) {
		var a = [];
		for (var c in b) {
			q.has(b, c) && a.push([c, b[c]])
		}
		return a
	}, q.invert = function(b) {
		var a = {};
		for (var c in b) {
			q.has(b, c) && (a[b[c]] = c)
		}
		return a
	}, q.functions = q.methods = function(b) {
		var a = [];
		for (var c in b) {
			q.isFunction(b[c]) && a.push(c)
		}
		return a.sort()
	}, q.extend = function(a) {
		return J(ae.call(arguments, 1), function(b) {
			for (var c in b) {
				a[c] = b[c]
			}
		}), a
	}, q.pick = function(b) {
		var a = {},
			c = ay.apply(ah, ae.call(arguments, 1));
		return J(c, function(d) {
			d in b && (a[d] = b[d])
		}), a
	}, q.omit = function(c) {
		var b = {},
			d = ay.apply(ah, ae.call(arguments, 1));
		for (var a in c) {
			q.contains(d, a) || (b[a] = c[a])
		}
		return b
	}, q.defaults = function(a) {
		return J(ae.call(arguments, 1), function(b) {
			for (var c in b) {
				a[c] == null && (a[c] = b[c])
			}
		}), a
	}, q.clone = function(a) {
		return q.isObject(a) ? q.isArray(a) ? a.slice() : q.extend({}, a) : a
	}, q.tap = function(b, a) {
		return a(b), b
	};
	var K = function(k, v, g, b) {
			if (k === v) {
				return k !== 0 || 1 / k == 1 / v
			}
			if (k == null || v == null) {
				return k === v
			}
			k instanceof q && (k = k._wrapped), v instanceof q && (v = v._wrapped);
			var h = am.call(k);
			if (h != am.call(v)) {
				return !1
			}
			switch (h) {
			case "[object String]":
				return k == String(v);
			case "[object Number]":
				return k != +k ? v != +v : k == 0 ? 1 / k == 1 / v : k == +v;
			case "[object Date]":
			case "[object Boolean]":
				return +k == +v;
			case "[object RegExp]":
				return k.source == v.source && k.global == v.global && k.multiline == v.multiline && k.ignoreCase == v.ignoreCase
			}
			if (typeof k != "object" || typeof v != "object") {
				return !1
			}
			var w = g.length;
			while (w--) {
				if (g[w] == k) {
					return b[w] == v
				}
			}
			g.push(k), b.push(v);
			var d = 0,
				p = !0;
			if (h == "[object Array]") {
				d = k.length, p = d == v.length;
				if (p) {
					while (d--) {
						if (!(p = K(k[d], v[d], g, b))) {
							break
						}
					}
				}
			} else {
				var m = k.constructor,
					j = v.constructor;
				if (m !== j && !(q.isFunction(m) && m instanceof m && q.isFunction(j) && j instanceof j)) {
					return !1
				}
				for (var l in k) {
					if (q.has(k, l)) {
						d++;
						if (!(p = q.has(v, l) && K(k[l], v[l], g, b))) {
							break
						}
					}
				}
				if (p) {
					for (l in v) {
						if (q.has(v, l) && !(d--)) {
							break
						}
					}
					p = !d
				}
			}
			return g.pop(), b.pop(), p
		};
	q.isEqual = function(b, a) {
		return K(b, a, [], [])
	}, q.isEmpty = function(b) {
		if (b == null) {
			return !0
		}
		if (q.isArray(b) || q.isString(b)) {
			return b.length === 0
		}
		for (var a in b) {
			if (q.has(b, a)) {
				return !1
			}
		}
		return !0
	}, q.isElement = function(a) {
		return !!a && a.nodeType === 1
	}, q.isArray = V ||
	function(a) {
		return am.call(a) == "[object Array]"
	}, q.isObject = function(a) {
		return a === Object(a)
	}, J(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
		q["is" + a] = function(b) {
			return am.call(b) == "[object " + a + "]"
		}
	}), q.isArguments(arguments) || (q.isArguments = function(a) {
		return !!a && !! q.has(a, "callee")
	}), typeof / . / != "function" && (q.isFunction = function(a) {
		return typeof a == "function"
	}), q.isFinite = function(a) {
		return q.isNumber(a) && isFinite(a)
	}, q.isNaN = function(a) {
		return q.isNumber(a) && a != +a
	}, q.isBoolean = function(a) {
		return a === !0 || a === !1 || am.call(a) == "[object Boolean]"
	}, q.isNull = function(a) {
		return a === null
	}, q.isUndefined = function(a) {
		return a === void 0
	}, q.has = function(b, a) {
		return aw.call(b, a)
	}, q.noConflict = function() {
		return au._ = af, this
	}, q.identity = function(a) {
		return a
	}, q.times = function(c, a, d) {
		for (var b = 0; b < c; b++) {
			a.call(d, b)
		}
	}, q.random = function(b, a) {
		return a == null && (a = b, b = 0), b + (0 | Math.random() * (a - b + 1))
	};
	var az = {
		escape: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"/": "&#x2F;"
		}
	};
	az.unescape = q.invert(az.escape);
	var W = {
		escape: new RegExp("[" + q.keys(az.escape).join("") + "]", "g"),
		unescape: new RegExp("(" + q.keys(az.unescape).join("|") + ")", "g")
	};
	q.each(["escape", "unescape"], function(a) {
		q[a] = function(b) {
			return b == null ? "" : ("" + b).replace(W[a], function(c) {
				return az[a][c]
			})
		}
	}), q.result = function(b, a) {
		if (b == null) {
			return null
		}
		var c = b[a];
		return q.isFunction(c) ? c.call(b) : c
	}, q.mixin = function(a) {
		J(q.functions(a), function(b) {
			var c = q[b] = a[b];
			q.prototype[b] = function() {
				var d = [this._wrapped];
				return aj.apply(d, arguments), U.call(this, c.apply(q, d))
			}
		})
	};
	var G = 0;
	q.uniqueId = function(b) {
		var a = G++;
		return b ? b + a : a
	}, q.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var R = /(.)^/,
		Y = {
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		ao = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	q.template = function(g, k, d) {
		d = q.defaults({}, d, q.templateSettings);
		var b = new RegExp([(d.escape || R).source, (d.interpolate || R).source, (d.evaluate || R).source].join("|") + "|$", "g"),
			f = 0,
			l = "__p+='";
		g.replace(b, function(e, p, i, m, a) {
			l += g.slice(f, a).replace(ao, function(n) {
				return "\\" + Y[n]
			}), l += p ? "'+\n((__t=(" + p + "))==null?'':_.escape(__t))+\n'" : i ? "'+\n((__t=(" + i + "))==null?'':__t)+\n'" : m ? "';\n" + m + "\n__p+='" : "", f = a + e.length
		}), l += "';\n", d.variable || (l = "with(obj||{}){\n" + l + "}\n"), l = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + l + "return __p;\n";
		try {
			var c = new Function(d.variable || "obj", "_", l)
		} catch (j) {
			throw j.source = l, j
		}
		if (k) {
			return c(k, q)
		}
		var h = function(a) {
				return c.call(this, a, q)
			};
		return h.source = "function(" + (d.variable || "obj") + "){\n" + l + "}", h
	}, q.chain = function(a) {
		return q(a).chain()
	};
	var U = function(a) {
			return this._chain ? q(a).chain() : a
		};
	q.mixin(q), J(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(b) {
		var a = ah[b];
		q.prototype[b] = function() {
			var c = this._wrapped;
			return a.apply(c, arguments), (b == "shift" || b == "splice") && c.length === 0 && delete c[0], U.call(this, c)
		}
	}), J(["concat", "join", "slice"], function(b) {
		var a = ah[b];
		q.prototype[b] = function() {
			return U.call(this, a.apply(this._wrapped, arguments))
		}
	}), q.extend(q.prototype, {
		chain: function() {
			return this._chain = !0, this
		},
		value: function() {
			return this._wrapped
		}
	})
}).call(this);
/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
;
var Handlebars = (function() {
	var a = (function() {
		var m;

		function n(o) {
			this.string = o
		}
		n.prototype.toString = function() {
			return "" + this.string
		};
		m = n;
		return m
	})();
	var k = (function(v) {
		var w = {};
		var p = v;
		var x = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"`": "&#x60;"
		};
		var m = /[&<>"'`]/g;
		var q = /[&<>"'`]/;

		function y(z) {
			return x[z] || "&amp;"
		}
		function u(B, A) {
			for (var z in A) {
				if (Object.prototype.hasOwnProperty.call(A, z)) {
					B[z] = A[z]
				}
			}
		}
		w.extend = u;
		var o = Object.prototype.toString;
		w.toString = o;
		var n = function(z) {
				return typeof z === "function"
			};
		if (n(/x/)) {
			n = function(z) {
				return typeof z === "function" && o.call(z) === "[object Function]"
			}
		}
		var n;
		w.isFunction = n;
		var t = Array.isArray ||
		function(z) {
			return (z && typeof z === "object") ? o.call(z) === "[object Array]" : false
		};
		w.isArray = t;

		function s(z) {
			if (z instanceof p) {
				return z.toString()
			} else {
				if (!z && z !== 0) {
					return ""
				}
			}
			z = "" + z;
			if (!q.test(z)) {
				return z
			}
			return z.replace(m, y)
		}
		w.escapeExpression = s;

		function r(z) {
			if (!z && z !== 0) {
				return true
			} else {
				if (t(z) && z.length === 0) {
					return true
				} else {
					return false
				}
			}
		}
		w.isEmpty = r;
		return w
	})(a);
	var d = (function() {
		var n;
		var o = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

		function m(t, s) {
			var q;
			if (s && s.firstLine) {
				q = s.firstLine;
				t += " - " + q + ":" + s.firstColumn
			}
			var r = Error.prototype.constructor.call(this, t);
			for (var p = 0; p < o.length; p++) {
				this[o[p]] = r[o[p]]
			}
			if (q) {
				this.lineNumber = q;
				this.column = s.firstColumn
			}
		}
		m.prototype = new Error();
		n = m;
		return n
	})();
	var i = (function(x, A) {
		var z = {};
		var v = x;
		var t = A;
		var C = "1.3.0";
		z.VERSION = C;
		var n = 4;
		z.COMPILER_REVISION = n;
		var q = {
			1: "<= 1.0.rc.2",
			2: "== 1.0.0-rc.3",
			3: "== 1.0.0-rc.4",
			4: ">= 1.0.0"
		};
		z.REVISION_CHANGES = q;
		var u = v.isArray,
			p = v.isFunction,
			o = v.toString,
			m = "[object Object]";

		function s(E, D) {
			this.helpers = E || {};
			this.partials = D || {};
			w(this)
		}
		z.HandlebarsEnvironment = s;
		s.prototype = {
			constructor: s,
			logger: y,
			log: r,
			registerHelper: function(E, F, D) {
				if (o.call(E) === m) {
					if (D || F) {
						throw new t("Arg not supported with multiple helpers")
					}
					v.extend(this.helpers, E)
				} else {
					if (D) {
						F.not = D
					}
					this.helpers[E] = F
				}
			},
			registerPartial: function(D, E) {
				if (o.call(D) === m) {
					v.extend(this.partials, D)
				} else {
					this.partials[D] = E
				}
			}
		};

		function w(D) {
			D.registerHelper("helperMissing", function(E) {
				if (arguments.length === 2) {
					return undefined
				} else {
					throw new t("Missing helper: '" + E + "'")
				}
			});
			D.registerHelper("blockHelperMissing", function(G, F) {
				var E = F.inverse ||
				function() {}, H = F.fn;
				if (p(G)) {
					G = G.call(this)
				}
				if (G === true) {
					return H(this)
				} else {
					if (G === false || G == null) {
						return E(this)
					} else {
						if (u(G)) {
							if (G.length > 0) {
								return D.helpers.each(G, F)
							} else {
								return E(this)
							}
						} else {
							return H(G)
						}
					}
				}
			});
			D.registerHelper("each", function(E, M) {
				var K = M.fn,
					G = M.inverse;
				var I = 0,
					J = "",
					H;
				if (p(E)) {
					E = E.call(this)
				}
				if (M.data) {
					H = B(M.data)
				}
				if (E && typeof E === "object") {
					if (u(E)) {
						for (var F = E.length; I < F; I++) {
							if (H) {
								H.index = I;
								H.first = (I === 0);
								H.last = (I === (E.length - 1))
							}
							J = J + K(E[I], {
								data: H
							})
						}
					} else {
						for (var L in E) {
							if (E.hasOwnProperty(L)) {
								if (H) {
									H.key = L;
									H.index = I;
									H.first = (I === 0)
								}
								J = J + K(E[L], {
									data: H
								});
								I++
							}
						}
					}
				}
				if (I === 0) {
					J = G(this)
				}
				return J
			});
			D.registerHelper("if", function(F, E) {
				if (p(F)) {
					F = F.call(this)
				}
				if ((!E.hash.includeZero && !F) || v.isEmpty(F)) {
					return E.inverse(this)
				} else {
					return E.fn(this)
				}
			});
			D.registerHelper("unless", function(F, E) {
				return D.helpers["if"].call(this, F, {
					fn: E.inverse,
					inverse: E.fn,
					hash: E.hash
				})
			});
			D.registerHelper("with", function(F, E) {
				if (p(F)) {
					F = F.call(this)
				}
				if (!v.isEmpty(F)) {
					return E.fn(F)
				}
			});
			D.registerHelper("log", function(F, E) {
				var G = E.data && E.data.level != null ? parseInt(E.data.level, 10) : 1;
				D.log(G, F)
			})
		}
		var y = {
			methodMap: {
				0: "debug",
				1: "info",
				2: "warn",
				3: "error"
			},
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 3,
			log: function(F, D) {
				if (y.level <= F) {
					var E = y.methodMap[F];
					if (typeof console !== "undefined" && console[E]) {
						console[E].call(console, D)
					}
				}
			}
		};
		z.logger = y;

		function r(E, D) {
			y.log(E, D)
		}
		z.log = r;
		var B = function(D) {
				var E = {};
				v.extend(E, D);
				return E
			};
		z.createFrame = B;
		return z
	})(k, d);
	var g = (function(v, z, p) {
		var x = {};
		var u = v;
		var s = z;
		var o = p.COMPILER_REVISION;
		var r = p.REVISION_CHANGES;

		function n(C) {
			var B = C && C[0] || 1,
				E = o;
			if (B !== E) {
				if (B < E) {
					var A = r[E],
						D = r[B];
					throw new s("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + A + ") or downgrade your runtime to an older version (" + D + ").")
				} else {
					throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + C[1] + ").")
				}
			}
		}
		x.checkRevision = n;

		function w(A, D) {
			if (!D) {
				throw new s("No environment passed to template")
			}
			var C = function(F, H, J, K, I, L) {
					var E = D.VM.invokePartial.apply(this, arguments);
					if (E != null) {
						return E
					}
					if (D.compile) {
						var G = {
							helpers: K,
							partials: I,
							data: L
						};
						I[H] = D.compile(F, {
							data: L !== undefined
						}, D);
						return I[H](J, G)
					} else {
						throw new s("The partial " + H + " could not be compiled when running in runtime-only mode")
					}
				};
			var B = {
				escapeExpression: u.escapeExpression,
				invokePartial: C,
				programs: [],
				program: function(F, G, H) {
					var E = this.programs[F];
					if (H) {
						E = t(F, G, H)
					} else {
						if (!E) {
							E = this.programs[F] = t(F, G)
						}
					}
					return E
				},
				merge: function(G, F) {
					var E = G || F;
					if (G && F && (G !== F)) {
						E = {};
						u.extend(E, F);
						u.extend(E, G)
					}
					return E
				},
				programWithDepth: D.VM.programWithDepth,
				noop: D.VM.noop,
				compilerInfo: null
			};
			return function(H, F) {
				F = F || {};
				var I = F.partial ? F : D,
					J, G;
				if (!F.partial) {
					J = F.helpers;
					G = F.partials
				}
				var E = A.call(B, I, H, J, G, F.data);
				if (!F.partial) {
					D.VM.checkRevision(B.compilerInfo)
				}
				return E
			}
		}
		x.template = w;

		function q(B, C, D) {
			var A = Array.prototype.slice.call(arguments, 3);
			var E = function(G, F) {
					F = F || {};
					return C.apply(this, [G, F.data || D].concat(A))
				};
			E.program = B;
			E.depth = A.length;
			return E
		}
		x.programWithDepth = q;

		function t(A, B, C) {
			var D = function(F, E) {
					E = E || {};
					return B(F, E.data || C)
				};
			D.program = A;
			D.depth = 0;
			return D
		}
		x.program = t;

		function m(A, C, E, F, D, G) {
			var B = {
				partial: true,
				helpers: F,
				partials: D,
				data: G
			};
			if (A === undefined) {
				throw new s("The partial " + C + " could not be found")
			} else {
				if (A instanceof Function) {
					return A(E, B)
				}
			}
		}
		x.invokePartial = m;

		function y() {
			return ""
		}
		x.noop = y;
		return x
	})(k, d, i);
	var f = (function(w, y, o, s, v) {
		var x;
		var m = w;
		var p = y;
		var r = o;
		var u = s;
		var q = v;
		var t = function() {
				var z = new m.HandlebarsEnvironment();
				u.extend(z, m);
				z.SafeString = p;
				z.Exception = r;
				z.Utils = u;
				z.VM = q;
				z.template = function(A) {
					return q.template(A, z)
				};
				return z
			};
		var n = t();
		n.create = t;
		x = n;
		return x
	})(i, a, d, k, g);
	var j = (function(q) {
		var o;
		var n = q;

		function m(r) {
			r = r || {};
			this.firstLine = r.first_line;
			this.firstColumn = r.first_column;
			this.lastColumn = r.last_column;
			this.lastLine = r.last_line
		}
		var p = {
			ProgramNode: function(t, v, s, u) {
				var r, w;
				if (arguments.length === 3) {
					u = s;
					s = null
				} else {
					if (arguments.length === 2) {
						u = v;
						v = null
					}
				}
				m.call(this, u);
				this.type = "program";
				this.statements = t;
				this.strip = {};
				if (s) {
					w = s[0];
					if (w) {
						r = {
							first_line: w.firstLine,
							last_line: w.lastLine,
							last_column: w.lastColumn,
							first_column: w.firstColumn
						};
						this.inverse = new p.ProgramNode(s, v, r)
					} else {
						this.inverse = new p.ProgramNode(s, v)
					}
					this.strip.right = v.left
				} else {
					if (v) {
						this.strip.left = v.right
					}
				}
			},
			MustacheNode: function(w, v, r, t, s) {
				m.call(this, s);
				this.type = "mustache";
				this.strip = t;
				if (r != null && r.charAt) {
					var u = r.charAt(3) || r.charAt(2);
					this.escaped = u !== "{" && u !== "&"
				} else {
					this.escaped = !! r
				}
				if (w instanceof p.SexprNode) {
					this.sexpr = w
				} else {
					this.sexpr = new p.SexprNode(w, v)
				}
				this.sexpr.isRoot = true;
				this.id = this.sexpr.id;
				this.params = this.sexpr.params;
				this.hash = this.sexpr.hash;
				this.eligibleHelper = this.sexpr.eligibleHelper;
				this.isHelper = this.sexpr.isHelper
			},
			SexprNode: function(w, t, r) {
				m.call(this, r);
				this.type = "sexpr";
				this.hash = t;
				var v = this.id = w[0];
				var u = this.params = w.slice(1);
				var s = this.eligibleHelper = v.isSimple;
				this.isHelper = s && (u.length || t)
			},
			PartialNode: function(r, t, u, s) {
				m.call(this, s);
				this.type = "partial";
				this.partialName = r;
				this.context = t;
				this.strip = u
			},
			BlockNode: function(u, s, r, v, t) {
				m.call(this, t);
				if (u.sexpr.id.original !== v.path.original) {
					throw new n(u.sexpr.id.original + " doesn't match " + v.path.original, this)
				}
				this.type = "block";
				this.mustache = u;
				this.program = s;
				this.inverse = r;
				this.strip = {
					left: u.strip.left,
					right: v.strip.right
				};
				(s || r).strip.left = u.strip.right;
				(r || s).strip.right = v.strip.left;
				if (r && !s) {
					this.isInverse = true
				}
			},
			ContentNode: function(r, s) {
				m.call(this, s);
				this.type = "content";
				this.string = r
			},
			HashNode: function(s, r) {
				m.call(this, r);
				this.type = "hash";
				this.pairs = s
			},
			IdNode: function(x, w) {
				m.call(this, w);
				this.type = "ID";
				var v = "",
					t = [],
					y = 0;
				for (var u = 0, r = x.length; u < r; u++) {
					var s = x[u].part;
					v += (x[u].separator || "") + s;
					if (s === ".." || s === "." || s === "this") {
						if (t.length > 0) {
							throw new n("Invalid path: " + v, this)
						} else {
							if (s === "..") {
								y++
							} else {
								this.isScoped = true
							}
						}
					} else {
						t.push(s)
					}
				}
				this.original = v;
				this.parts = t;
				this.string = t.join(".");
				this.depth = y;
				this.isSimple = x.length === 1 && !this.isScoped && y === 0;
				this.stringModeValue = this.string
			},
			PartialNameNode: function(r, s) {
				m.call(this, s);
				this.type = "PARTIAL_NAME";
				this.name = r.original
			},
			DataNode: function(s, r) {
				m.call(this, r);
				this.type = "DATA";
				this.id = s
			},
			StringNode: function(r, s) {
				m.call(this, s);
				this.type = "STRING";
				this.original = this.string = this.stringModeValue = r
			},
			IntegerNode: function(r, s) {
				m.call(this, s);
				this.type = "INTEGER";
				this.original = this.integer = r;
				this.stringModeValue = Number(r)
			},
			BooleanNode: function(r, s) {
				m.call(this, s);
				this.type = "BOOLEAN";
				this.bool = r;
				this.stringModeValue = r === "true"
			},
			CommentNode: function(s, r) {
				m.call(this, r);
				this.type = "comment";
				this.comment = s
			}
		};
		o = p;
		return o
	})(d);
	var b = (function() {
		var n;
		var m = (function() {
			var v = {
				trace: function r() {},
				yy: {},
				symbols_: {
					error: 2,
					root: 3,
					statements: 4,
					EOF: 5,
					program: 6,
					simpleInverse: 7,
					statement: 8,
					openInverse: 9,
					closeBlock: 10,
					openBlock: 11,
					mustache: 12,
					partial: 13,
					CONTENT: 14,
					COMMENT: 15,
					OPEN_BLOCK: 16,
					sexpr: 17,
					CLOSE: 18,
					OPEN_INVERSE: 19,
					OPEN_ENDBLOCK: 20,
					path: 21,
					OPEN: 22,
					OPEN_UNESCAPED: 23,
					CLOSE_UNESCAPED: 24,
					OPEN_PARTIAL: 25,
					partialName: 26,
					partial_option0: 27,
					sexpr_repetition0: 28,
					sexpr_option0: 29,
					dataName: 30,
					param: 31,
					STRING: 32,
					INTEGER: 33,
					BOOLEAN: 34,
					OPEN_SEXPR: 35,
					CLOSE_SEXPR: 36,
					hash: 37,
					hash_repetition_plus0: 38,
					hashSegment: 39,
					ID: 40,
					EQUALS: 41,
					DATA: 42,
					pathSegments: 43,
					SEP: 44,
					"$accept": 0,
					"$end": 1
				},
				terminals_: {
					2: "error",
					5: "EOF",
					14: "CONTENT",
					15: "COMMENT",
					16: "OPEN_BLOCK",
					18: "CLOSE",
					19: "OPEN_INVERSE",
					20: "OPEN_ENDBLOCK",
					22: "OPEN",
					23: "OPEN_UNESCAPED",
					24: "CLOSE_UNESCAPED",
					25: "OPEN_PARTIAL",
					32: "STRING",
					33: "INTEGER",
					34: "BOOLEAN",
					35: "OPEN_SEXPR",
					36: "CLOSE_SEXPR",
					40: "ID",
					41: "EQUALS",
					42: "DATA",
					44: "SEP"
				},
				productions_: [0, [3, 2],
					[3, 1],
					[6, 2],
					[6, 3],
					[6, 2],
					[6, 1],
					[6, 1],
					[6, 0],
					[4, 1],
					[4, 2],
					[8, 3],
					[8, 3],
					[8, 1],
					[8, 1],
					[8, 1],
					[8, 1],
					[11, 3],
					[9, 3],
					[10, 3],
					[12, 3],
					[12, 3],
					[13, 4],
					[7, 2],
					[17, 3],
					[17, 1],
					[31, 1],
					[31, 1],
					[31, 1],
					[31, 1],
					[31, 1],
					[31, 3],
					[37, 1],
					[39, 3],
					[26, 1],
					[26, 1],
					[26, 1],
					[30, 2],
					[21, 1],
					[43, 3],
					[43, 1],
					[27, 0],
					[27, 1],
					[28, 0],
					[28, 2],
					[29, 0],
					[29, 1],
					[38, 1],
					[38, 2]
				],
				performAction: function q(w, z, A, D, C, y, B) {
					var x = y.length - 1;
					switch (C) {
					case 1:
						return new D.ProgramNode(y[x - 1], this._$);
						break;
					case 2:
						return new D.ProgramNode([], this._$);
						break;
					case 3:
						this.$ = new D.ProgramNode([], y[x - 1], y[x], this._$);
						break;
					case 4:
						this.$ = new D.ProgramNode(y[x - 2], y[x - 1], y[x], this._$);
						break;
					case 5:
						this.$ = new D.ProgramNode(y[x - 1], y[x], [], this._$);
						break;
					case 6:
						this.$ = new D.ProgramNode(y[x], this._$);
						break;
					case 7:
						this.$ = new D.ProgramNode([], this._$);
						break;
					case 8:
						this.$ = new D.ProgramNode([], this._$);
						break;
					case 9:
						this.$ = [y[x]];
						break;
					case 10:
						y[x - 1].push(y[x]);
						this.$ = y[x - 1];
						break;
					case 11:
						this.$ = new D.BlockNode(y[x - 2], y[x - 1].inverse, y[x - 1], y[x], this._$);
						break;
					case 12:
						this.$ = new D.BlockNode(y[x - 2], y[x - 1], y[x - 1].inverse, y[x], this._$);
						break;
					case 13:
						this.$ = y[x];
						break;
					case 14:
						this.$ = y[x];
						break;
					case 15:
						this.$ = new D.ContentNode(y[x], this._$);
						break;
					case 16:
						this.$ = new D.CommentNode(y[x], this._$);
						break;
					case 17:
						this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
						break;
					case 18:
						this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
						break;
					case 19:
						this.$ = {
							path: y[x - 1],
							strip: o(y[x - 2], y[x])
						};
						break;
					case 20:
						this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
						break;
					case 21:
						this.$ = new D.MustacheNode(y[x - 1], null, y[x - 2], o(y[x - 2], y[x]), this._$);
						break;
					case 22:
						this.$ = new D.PartialNode(y[x - 2], y[x - 1], o(y[x - 3], y[x]), this._$);
						break;
					case 23:
						this.$ = o(y[x - 1], y[x]);
						break;
					case 24:
						this.$ = new D.SexprNode([y[x - 2]].concat(y[x - 1]), y[x], this._$);
						break;
					case 25:
						this.$ = new D.SexprNode([y[x]], null, this._$);
						break;
					case 26:
						this.$ = y[x];
						break;
					case 27:
						this.$ = new D.StringNode(y[x], this._$);
						break;
					case 28:
						this.$ = new D.IntegerNode(y[x], this._$);
						break;
					case 29:
						this.$ = new D.BooleanNode(y[x], this._$);
						break;
					case 30:
						this.$ = y[x];
						break;
					case 31:
						y[x - 1].isHelper = true;
						this.$ = y[x - 1];
						break;
					case 32:
						this.$ = new D.HashNode(y[x], this._$);
						break;
					case 33:
						this.$ = [y[x - 2], y[x]];
						break;
					case 34:
						this.$ = new D.PartialNameNode(y[x], this._$);
						break;
					case 35:
						this.$ = new D.PartialNameNode(new D.StringNode(y[x], this._$), this._$);
						break;
					case 36:
						this.$ = new D.PartialNameNode(new D.IntegerNode(y[x], this._$));
						break;
					case 37:
						this.$ = new D.DataNode(y[x], this._$);
						break;
					case 38:
						this.$ = new D.IdNode(y[x], this._$);
						break;
					case 39:
						y[x - 2].push({
							part: y[x],
							separator: y[x - 1]
						});
						this.$ = y[x - 2];
						break;
					case 40:
						this.$ = [{
							part: y[x]
						}];
						break;
					case 43:
						this.$ = [];
						break;
					case 44:
						y[x - 1].push(y[x]);
						break;
					case 47:
						this.$ = [y[x]];
						break;
					case 48:
						y[x - 1].push(y[x]);
						break
					}
				},
				table: [{
					3: 1,
					4: 2,
					5: [1, 3],
					8: 4,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					1: [3]
				}, {
					5: [1, 16],
					8: 17,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					1: [2, 2]
				}, {
					5: [2, 9],
					14: [2, 9],
					15: [2, 9],
					16: [2, 9],
					19: [2, 9],
					20: [2, 9],
					22: [2, 9],
					23: [2, 9],
					25: [2, 9]
				}, {
					4: 20,
					6: 18,
					7: 19,
					8: 4,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 21],
					20: [2, 8],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					4: 20,
					6: 22,
					7: 19,
					8: 4,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 21],
					20: [2, 8],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					5: [2, 13],
					14: [2, 13],
					15: [2, 13],
					16: [2, 13],
					19: [2, 13],
					20: [2, 13],
					22: [2, 13],
					23: [2, 13],
					25: [2, 13]
				}, {
					5: [2, 14],
					14: [2, 14],
					15: [2, 14],
					16: [2, 14],
					19: [2, 14],
					20: [2, 14],
					22: [2, 14],
					23: [2, 14],
					25: [2, 14]
				}, {
					5: [2, 15],
					14: [2, 15],
					15: [2, 15],
					16: [2, 15],
					19: [2, 15],
					20: [2, 15],
					22: [2, 15],
					23: [2, 15],
					25: [2, 15]
				}, {
					5: [2, 16],
					14: [2, 16],
					15: [2, 16],
					16: [2, 16],
					19: [2, 16],
					20: [2, 16],
					22: [2, 16],
					23: [2, 16],
					25: [2, 16]
				}, {
					17: 23,
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					17: 29,
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					17: 30,
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					17: 31,
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					21: 33,
					26: 32,
					32: [1, 34],
					33: [1, 35],
					40: [1, 28],
					43: 26
				}, {
					1: [2, 1]
				}, {
					5: [2, 10],
					14: [2, 10],
					15: [2, 10],
					16: [2, 10],
					19: [2, 10],
					20: [2, 10],
					22: [2, 10],
					23: [2, 10],
					25: [2, 10]
				}, {
					10: 36,
					20: [1, 37]
				}, {
					4: 38,
					8: 4,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					20: [2, 7],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					7: 39,
					8: 17,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 21],
					20: [2, 6],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					17: 23,
					18: [1, 40],
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					10: 41,
					20: [1, 37]
				}, {
					18: [1, 42]
				}, {
					18: [2, 43],
					24: [2, 43],
					28: 43,
					32: [2, 43],
					33: [2, 43],
					34: [2, 43],
					35: [2, 43],
					36: [2, 43],
					40: [2, 43],
					42: [2, 43]
				}, {
					18: [2, 25],
					24: [2, 25],
					36: [2, 25]
				}, {
					18: [2, 38],
					24: [2, 38],
					32: [2, 38],
					33: [2, 38],
					34: [2, 38],
					35: [2, 38],
					36: [2, 38],
					40: [2, 38],
					42: [2, 38],
					44: [1, 44]
				}, {
					21: 45,
					40: [1, 28],
					43: 26
				}, {
					18: [2, 40],
					24: [2, 40],
					32: [2, 40],
					33: [2, 40],
					34: [2, 40],
					35: [2, 40],
					36: [2, 40],
					40: [2, 40],
					42: [2, 40],
					44: [2, 40]
				}, {
					18: [1, 46]
				}, {
					18: [1, 47]
				}, {
					24: [1, 48]
				}, {
					18: [2, 41],
					21: 50,
					27: 49,
					40: [1, 28],
					43: 26
				}, {
					18: [2, 34],
					40: [2, 34]
				}, {
					18: [2, 35],
					40: [2, 35]
				}, {
					18: [2, 36],
					40: [2, 36]
				}, {
					5: [2, 11],
					14: [2, 11],
					15: [2, 11],
					16: [2, 11],
					19: [2, 11],
					20: [2, 11],
					22: [2, 11],
					23: [2, 11],
					25: [2, 11]
				}, {
					21: 51,
					40: [1, 28],
					43: 26
				}, {
					8: 17,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					20: [2, 3],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					4: 52,
					8: 4,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					20: [2, 5],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					14: [2, 23],
					15: [2, 23],
					16: [2, 23],
					19: [2, 23],
					20: [2, 23],
					22: [2, 23],
					23: [2, 23],
					25: [2, 23]
				}, {
					5: [2, 12],
					14: [2, 12],
					15: [2, 12],
					16: [2, 12],
					19: [2, 12],
					20: [2, 12],
					22: [2, 12],
					23: [2, 12],
					25: [2, 12]
				}, {
					14: [2, 18],
					15: [2, 18],
					16: [2, 18],
					19: [2, 18],
					20: [2, 18],
					22: [2, 18],
					23: [2, 18],
					25: [2, 18]
				}, {
					18: [2, 45],
					21: 56,
					24: [2, 45],
					29: 53,
					30: 60,
					31: 54,
					32: [1, 57],
					33: [1, 58],
					34: [1, 59],
					35: [1, 61],
					36: [2, 45],
					37: 55,
					38: 62,
					39: 63,
					40: [1, 64],
					42: [1, 27],
					43: 26
				}, {
					40: [1, 65]
				}, {
					18: [2, 37],
					24: [2, 37],
					32: [2, 37],
					33: [2, 37],
					34: [2, 37],
					35: [2, 37],
					36: [2, 37],
					40: [2, 37],
					42: [2, 37]
				}, {
					14: [2, 17],
					15: [2, 17],
					16: [2, 17],
					19: [2, 17],
					20: [2, 17],
					22: [2, 17],
					23: [2, 17],
					25: [2, 17]
				}, {
					5: [2, 20],
					14: [2, 20],
					15: [2, 20],
					16: [2, 20],
					19: [2, 20],
					20: [2, 20],
					22: [2, 20],
					23: [2, 20],
					25: [2, 20]
				}, {
					5: [2, 21],
					14: [2, 21],
					15: [2, 21],
					16: [2, 21],
					19: [2, 21],
					20: [2, 21],
					22: [2, 21],
					23: [2, 21],
					25: [2, 21]
				}, {
					18: [1, 66]
				}, {
					18: [2, 42]
				}, {
					18: [1, 67]
				}, {
					8: 17,
					9: 5,
					11: 6,
					12: 7,
					13: 8,
					14: [1, 9],
					15: [1, 10],
					16: [1, 12],
					19: [1, 11],
					20: [2, 4],
					22: [1, 13],
					23: [1, 14],
					25: [1, 15]
				}, {
					18: [2, 24],
					24: [2, 24],
					36: [2, 24]
				}, {
					18: [2, 44],
					24: [2, 44],
					32: [2, 44],
					33: [2, 44],
					34: [2, 44],
					35: [2, 44],
					36: [2, 44],
					40: [2, 44],
					42: [2, 44]
				}, {
					18: [2, 46],
					24: [2, 46],
					36: [2, 46]
				}, {
					18: [2, 26],
					24: [2, 26],
					32: [2, 26],
					33: [2, 26],
					34: [2, 26],
					35: [2, 26],
					36: [2, 26],
					40: [2, 26],
					42: [2, 26]
				}, {
					18: [2, 27],
					24: [2, 27],
					32: [2, 27],
					33: [2, 27],
					34: [2, 27],
					35: [2, 27],
					36: [2, 27],
					40: [2, 27],
					42: [2, 27]
				}, {
					18: [2, 28],
					24: [2, 28],
					32: [2, 28],
					33: [2, 28],
					34: [2, 28],
					35: [2, 28],
					36: [2, 28],
					40: [2, 28],
					42: [2, 28]
				}, {
					18: [2, 29],
					24: [2, 29],
					32: [2, 29],
					33: [2, 29],
					34: [2, 29],
					35: [2, 29],
					36: [2, 29],
					40: [2, 29],
					42: [2, 29]
				}, {
					18: [2, 30],
					24: [2, 30],
					32: [2, 30],
					33: [2, 30],
					34: [2, 30],
					35: [2, 30],
					36: [2, 30],
					40: [2, 30],
					42: [2, 30]
				}, {
					17: 68,
					21: 24,
					30: 25,
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					18: [2, 32],
					24: [2, 32],
					36: [2, 32],
					39: 69,
					40: [1, 70]
				}, {
					18: [2, 47],
					24: [2, 47],
					36: [2, 47],
					40: [2, 47]
				}, {
					18: [2, 40],
					24: [2, 40],
					32: [2, 40],
					33: [2, 40],
					34: [2, 40],
					35: [2, 40],
					36: [2, 40],
					40: [2, 40],
					41: [1, 71],
					42: [2, 40],
					44: [2, 40]
				}, {
					18: [2, 39],
					24: [2, 39],
					32: [2, 39],
					33: [2, 39],
					34: [2, 39],
					35: [2, 39],
					36: [2, 39],
					40: [2, 39],
					42: [2, 39],
					44: [2, 39]
				}, {
					5: [2, 22],
					14: [2, 22],
					15: [2, 22],
					16: [2, 22],
					19: [2, 22],
					20: [2, 22],
					22: [2, 22],
					23: [2, 22],
					25: [2, 22]
				}, {
					5: [2, 19],
					14: [2, 19],
					15: [2, 19],
					16: [2, 19],
					19: [2, 19],
					20: [2, 19],
					22: [2, 19],
					23: [2, 19],
					25: [2, 19]
				}, {
					36: [1, 72]
				}, {
					18: [2, 48],
					24: [2, 48],
					36: [2, 48],
					40: [2, 48]
				}, {
					41: [1, 71]
				}, {
					21: 56,
					30: 60,
					31: 73,
					32: [1, 57],
					33: [1, 58],
					34: [1, 59],
					35: [1, 61],
					40: [1, 28],
					42: [1, 27],
					43: 26
				}, {
					18: [2, 31],
					24: [2, 31],
					32: [2, 31],
					33: [2, 31],
					34: [2, 31],
					35: [2, 31],
					36: [2, 31],
					40: [2, 31],
					42: [2, 31]
				}, {
					18: [2, 33],
					24: [2, 33],
					36: [2, 33],
					40: [2, 33]
				}],
				defaultActions: {
					3: [2, 2],
					16: [2, 1],
					50: [2, 42]
				},
				parseError: function s(x, w) {
					throw new Error(x)
				},
				parse: function u(F) {
					var M = this,
						C = [0],
						V = [null],
						H = [],
						W = this.table,
						x = "",
						G = 0,
						T = 0,
						z = 0,
						E = 2,
						J = 1;
					this.lexer.setInput(F);
					this.lexer.yy = this.yy;
					this.yy.lexer = this.lexer;
					this.yy.parser = this;
					if (typeof this.lexer.yylloc == "undefined") {
						this.lexer.yylloc = {}
					}
					var y = this.lexer.yylloc;
					H.push(y);
					var A = this.lexer.options && this.lexer.options.ranges;
					if (typeof this.yy.parseError === "function") {
						this.parseError = this.yy.parseError
					}
					function L(Y) {
						C.length = C.length - 2 * Y;
						V.length = V.length - Y;
						H.length = H.length - Y
					}
					function K() {
						var Y;
						Y = M.lexer.lex() || 1;
						if (typeof Y !== "number") {
							Y = M.symbols_[Y] || Y
						}
						return Y
					}
					var S, O, B, R, X, I, Q = {},
						N, U, w, D;
					while (true) {
						B = C[C.length - 1];
						if (this.defaultActions[B]) {
							R = this.defaultActions[B]
						} else {
							if (S === null || typeof S == "undefined") {
								S = K()
							}
							R = W[B] && W[B][S]
						}
						if (typeof R === "undefined" || !R.length || !R[0]) {
							var P = "";
							if (!z) {
								D = [];
								for (N in W[B]) {
									if (this.terminals_[N] && N > 2) {
										D.push("'" + this.terminals_[N] + "'")
									}
								}
								if (this.lexer.showPosition) {
									P = "Parse error on line " + (G + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + D.join(", ") + ", got '" + (this.terminals_[S] || S) + "'"
								} else {
									P = "Parse error on line " + (G + 1) + ": Unexpected " + (S == 1 ? "end of input" : "'" + (this.terminals_[S] || S) + "'")
								}
								this.parseError(P, {
									text: this.lexer.match,
									token: this.terminals_[S] || S,
									line: this.lexer.yylineno,
									loc: y,
									expected: D
								})
							}
						}
						if (R[0] instanceof Array && R.length > 1) {
							throw new Error("Parse Error: multiple actions possible at state: " + B + ", token: " + S)
						}
						switch (R[0]) {
						case 1:
							C.push(S);
							V.push(this.lexer.yytext);
							H.push(this.lexer.yylloc);
							C.push(R[1]);
							S = null;
							if (!O) {
								T = this.lexer.yyleng;
								x = this.lexer.yytext;
								G = this.lexer.yylineno;
								y = this.lexer.yylloc;
								if (z > 0) {
									z--
								}
							} else {
								S = O;
								O = null
							}
							break;
						case 2:
							U = this.productions_[R[1]][1];
							Q.$ = V[V.length - U];
							Q._$ = {
								first_line: H[H.length - (U || 1)].first_line,
								last_line: H[H.length - 1].last_line,
								first_column: H[H.length - (U || 1)].first_column,
								last_column: H[H.length - 1].last_column
							};
							if (A) {
								Q._$.range = [H[H.length - (U || 1)].range[0], H[H.length - 1].range[1]]
							}
							I = this.performAction.call(Q, x, T, G, this.yy, R[1], V, H);
							if (typeof I !== "undefined") {
								return I
							}
							if (U) {
								C = C.slice(0, -1 * U * 2);
								V = V.slice(0, -1 * U);
								H = H.slice(0, -1 * U)
							}
							C.push(this.productions_[R[1]][0]);
							V.push(Q.$);
							H.push(Q._$);
							w = W[C[C.length - 2]][C[C.length - 1]];
							C.push(w);
							break;
						case 3:
							return true
						}
					}
					return true
				}
			};

			function o(w, x) {
				return {
					left: w.charAt(2) === "~",
					right: x.charAt(0) === "~" || x.charAt(1) === "~"
				}
			}
			var p = (function() {
				var z = ({
					EOF: 1,
					parseError: function B(E, D) {
						if (this.yy.parser) {
							this.yy.parser.parseError(E, D)
						} else {
							throw new Error(E)
						}
					},
					setInput: function(D) {
						this._input = D;
						this._more = this._less = this.done = false;
						this.yylineno = this.yyleng = 0;
						this.yytext = this.matched = this.match = "";
						this.conditionStack = ["INITIAL"];
						this.yylloc = {
							first_line: 1,
							first_column: 0,
							last_line: 1,
							last_column: 0
						};
						if (this.options.ranges) {
							this.yylloc.range = [0, 0]
						}
						this.offset = 0;
						return this
					},
					input: function() {
						var E = this._input[0];
						this.yytext += E;
						this.yyleng++;
						this.offset++;
						this.match += E;
						this.matched += E;
						var D = E.match(/(?:\r\n?|\n).*/g);
						if (D) {
							this.yylineno++;
							this.yylloc.last_line++
						} else {
							this.yylloc.last_column++
						}
						if (this.options.ranges) {
							this.yylloc.range[1]++
						}
						this._input = this._input.slice(1);
						return E
					},
					unput: function(F) {
						var D = F.length;
						var E = F.split(/(?:\r\n?|\n)/g);
						this._input = F + this._input;
						this.yytext = this.yytext.substr(0, this.yytext.length - D - 1);
						this.offset -= D;
						var H = this.match.split(/(?:\r\n?|\n)/g);
						this.match = this.match.substr(0, this.match.length - 1);
						this.matched = this.matched.substr(0, this.matched.length - 1);
						if (E.length - 1) {
							this.yylineno -= E.length - 1
						}
						var G = this.yylloc.range;
						this.yylloc = {
							first_line: this.yylloc.first_line,
							last_line: this.yylineno + 1,
							first_column: this.yylloc.first_column,
							last_column: E ? (E.length === H.length ? this.yylloc.first_column : 0) + H[H.length - E.length].length - E[0].length : this.yylloc.first_column - D
						};
						if (this.options.ranges) {
							this.yylloc.range = [G[0], G[0] + this.yyleng - D]
						}
						return this
					},
					more: function() {
						this._more = true;
						return this
					},
					less: function(D) {
						this.unput(this.match.slice(D))
					},
					pastInput: function() {
						var D = this.matched.substr(0, this.matched.length - this.match.length);
						return (D.length > 20 ? "..." : "") + D.substr(-20).replace(/\n/g, "")
					},
					upcomingInput: function() {
						var D = this.match;
						if (D.length < 20) {
							D += this._input.substr(0, 20 - D.length)
						}
						return (D.substr(0, 20) + (D.length > 20 ? "..." : "")).replace(/\n/g, "")
					},
					showPosition: function() {
						var D = this.pastInput();
						var E = new Array(D.length + 1).join("-");
						return D + this.upcomingInput() + "\n" + E + "^"
					},
					next: function() {
						if (this.done) {
							return this.EOF
						}
						if (!this._input) {
							this.done = true
						}
						var J, H, E, G, F, D;
						if (!this._more) {
							this.yytext = "";
							this.match = ""
						}
						var K = this._currentRules();
						for (var I = 0; I < K.length; I++) {
							E = this._input.match(this.rules[K[I]]);
							if (E && (!H || E[0].length > H[0].length)) {
								H = E;
								G = I;
								if (!this.options.flex) {
									break
								}
							}
						}
						if (H) {
							D = H[0].match(/(?:\r\n?|\n).*/g);
							if (D) {
								this.yylineno += D.length
							}
							this.yylloc = {
								first_line: this.yylloc.last_line,
								last_line: this.yylineno + 1,
								first_column: this.yylloc.last_column,
								last_column: D ? D[D.length - 1].length - D[D.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + H[0].length
							};
							this.yytext += H[0];
							this.match += H[0];
							this.matches = H;
							this.yyleng = this.yytext.length;
							if (this.options.ranges) {
								this.yylloc.range = [this.offset, this.offset += this.yyleng]
							}
							this._more = false;
							this._input = this._input.slice(H[0].length);
							this.matched += H[0];
							J = this.performAction.call(this, this.yy, this, K[G], this.conditionStack[this.conditionStack.length - 1]);
							if (this.done && this._input) {
								this.done = false
							}
							if (J) {
								return J
							} else {
								return
							}
						}
						if (this._input === "") {
							return this.EOF
						} else {
							return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
								text: "",
								token: null,
								line: this.yylineno
							})
						}
					},
					lex: function w() {
						var D = this.next();
						if (typeof D !== "undefined") {
							return D
						} else {
							return this.lex()
						}
					},
					begin: function x(D) {
						this.conditionStack.push(D)
					},
					popState: function C() {
						return this.conditionStack.pop()
					},
					_currentRules: function A() {
						return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
					},
					topState: function() {
						return this.conditionStack[this.conditionStack.length - 2]
					},
					pushState: function x(D) {
						this.begin(D)
					}
				});
				z.options = {};
				z.performAction = function y(I, E, H, D) {
					function F(K, J) {
						return E.yytext = E.yytext.substr(K, E.yyleng - J)
					}
					var G = D;
					switch (H) {
					case 0:
						if (E.yytext.slice(-2) === "\\\\") {
							F(0, 1);
							this.begin("mu")
						} else {
							if (E.yytext.slice(-1) === "\\") {
								F(0, 1);
								this.begin("emu")
							} else {
								this.begin("mu")
							}
						}
						if (E.yytext) {
							return 14
						}
						break;
					case 1:
						return 14;
						break;
					case 2:
						this.popState();
						return 14;
						break;
					case 3:
						F(0, 4);
						this.popState();
						return 15;
						break;
					case 4:
						return 35;
						break;
					case 5:
						return 36;
						break;
					case 6:
						return 25;
						break;
					case 7:
						return 16;
						break;
					case 8:
						return 20;
						break;
					case 9:
						return 19;
						break;
					case 10:
						return 19;
						break;
					case 11:
						return 23;
						break;
					case 12:
						return 22;
						break;
					case 13:
						this.popState();
						this.begin("com");
						break;
					case 14:
						F(3, 5);
						this.popState();
						return 15;
						break;
					case 15:
						return 22;
						break;
					case 16:
						return 41;
						break;
					case 17:
						return 40;
						break;
					case 18:
						return 40;
						break;
					case 19:
						return 44;
						break;
					case 20:
						break;
					case 21:
						this.popState();
						return 24;
						break;
					case 22:
						this.popState();
						return 18;
						break;
					case 23:
						E.yytext = F(1, 2).replace(/\\"/g, '"');
						return 32;
						break;
					case 24:
						E.yytext = F(1, 2).replace(/\\'/g, "'");
						return 32;
						break;
					case 25:
						return 42;
						break;
					case 26:
						return 34;
						break;
					case 27:
						return 34;
						break;
					case 28:
						return 33;
						break;
					case 29:
						return 40;
						break;
					case 30:
						E.yytext = F(1, 2);
						return 40;
						break;
					case 31:
						return "INVALID";
						break;
					case 32:
						return 5;
						break
					}
				};
				z.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
				z.conditions = {
					mu: {
						rules: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
						inclusive: false
					},
					emu: {
						rules: [2],
						inclusive: false
					},
					com: {
						rules: [3],
						inclusive: false
					},
					INITIAL: {
						rules: [0, 1, 32],
						inclusive: true
					}
				};
				return z
			})();
			v.lexer = p;

			function t() {
				this.yy = {}
			}
			t.prototype = v;
			v.Parser = t;
			return new t
		})();
		n = m;
		return n
	})();
	var l = (function(q, m) {
		var n = {};
		var r = q;
		var o = m;
		n.parser = r;

		function p(s) {
			if (s.constructor === o.ProgramNode) {
				return s
			}
			r.yy = o;
			return r.parse(s)
		}
		n.parse = p;
		return n
	})(b, j);
	var e = (function(r) {
		var q = {};
		var m = r;

		function o() {}
		q.Compiler = o;
		o.prototype = {
			compiler: o,
			disassemble: function() {
				var x = this.opcodes,
					w, u = [],
					z, y;
				for (var v = 0, s = x.length; v < s; v++) {
					w = x[v];
					if (w.opcode === "DECLARE") {
						u.push("DECLARE " + w.name + "=" + w.value)
					} else {
						z = [];
						for (var t = 0; t < w.args.length; t++) {
							y = w.args[t];
							if (typeof y === "string") {
								y = '"' + y.replace("\n", "\\n") + '"'
							}
							z.push(y)
						}
						u.push(w.opcode + " " + z.join(" "))
					}
				}
				return u.join("\n")
			},
			equals: function(t) {
				var s = this.opcodes.length;
				if (t.opcodes.length !== s) {
					return false
				}
				for (var w = 0; w < s; w++) {
					var x = this.opcodes[w],
						u = t.opcodes[w];
					if (x.opcode !== u.opcode || x.args.length !== u.args.length) {
						return false
					}
					for (var v = 0; v < x.args.length; v++) {
						if (x.args[v] !== u.args[v]) {
							return false
						}
					}
				}
				s = this.children.length;
				if (t.children.length !== s) {
					return false
				}
				for (w = 0; w < s; w++) {
					if (!this.children[w].equals(t.children[w])) {
						return false
					}
				}
				return true
			},
			guid: 0,
			compile: function(s, u) {
				this.opcodes = [];
				this.children = [];
				this.depths = {
					list: []
				};
				this.options = u;
				var v = this.options.knownHelpers;
				this.options.knownHelpers = {
					helperMissing: true,
					blockHelperMissing: true,
					each: true,
					"if": true,
					unless: true,
					"with": true,
					log: true
				};
				if (v) {
					for (var t in v) {
						this.options.knownHelpers[t] = v[t]
					}
				}
				return this.accept(s)
			},
			accept: function(u) {
				var t = u.strip || {},
					s;
				if (t.left) {
					this.opcode("strip")
				}
				s = this[u.type](u);
				if (t.right) {
					this.opcode("strip")
				}
				return s
			},
			program: function(u) {
				var t = u.statements;
				for (var v = 0, s = t.length; v < s; v++) {
					this.accept(t[v])
				}
				this.isSimple = s === 1;
				this.depths.list = this.depths.list.sort(function(x, w) {
					return x - w
				});
				return this
			},
			compileProgram: function(u) {
				var s = new this.compiler().compile(u, this.options);
				var v = this.guid++,
					x;
				this.usePartial = this.usePartial || s.usePartial;
				this.children[v] = s;
				for (var w = 0, t = s.depths.list.length; w < t; w++) {
					x = s.depths.list[w];
					if (x < 2) {
						continue
					} else {
						this.addDepth(x - 1)
					}
				}
				return v
			},
			block: function(x) {
				var w = x.mustache,
					t = x.program,
					s = x.inverse;
				if (t) {
					t = this.compileProgram(t)
				}
				if (s) {
					s = this.compileProgram(s)
				}
				var v = w.sexpr;
				var u = this.classifySexpr(v);
				if (u === "helper") {
					this.helperSexpr(v, t, s)
				} else {
					if (u === "simple") {
						this.simpleSexpr(v);
						this.opcode("pushProgram", t);
						this.opcode("pushProgram", s);
						this.opcode("emptyHash");
						this.opcode("blockValue")
					} else {
						this.ambiguousSexpr(v, t, s);
						this.opcode("pushProgram", t);
						this.opcode("pushProgram", s);
						this.opcode("emptyHash");
						this.opcode("ambiguousBlockValue")
					}
				}
				this.opcode("append")
			},
			hash: function(v) {
				var u = v.pairs,
					x, w;
				this.opcode("pushHash");
				for (var t = 0, s = u.length; t < s; t++) {
					x = u[t];
					w = x[1];
					if (this.options.stringParams) {
						if (w.depth) {
							this.addDepth(w.depth)
						}
						this.opcode("getContext", w.depth || 0);
						this.opcode("pushStringParam", w.stringModeValue, w.type);
						if (w.type === "sexpr") {
							this.sexpr(w)
						}
					} else {
						this.accept(w)
					}
					this.opcode("assignToHash", x[0])
				}
				this.opcode("popHash")
			},
			partial: function(s) {
				var t = s.partialName;
				this.usePartial = true;
				if (s.context) {
					this.ID(s.context)
				} else {
					this.opcode("push", "depth0")
				}
				this.opcode("invokePartial", t.name);
				this.opcode("append")
			},
			content: function(s) {
				this.opcode("appendContent", s.string)
			},
			mustache: function(s) {
				this.sexpr(s.sexpr);
				if (s.escaped && !this.options.noEscape) {
					this.opcode("appendEscaped")
				} else {
					this.opcode("append")
				}
			},
			ambiguousSexpr: function(w, u, t) {
				var x = w.id,
					v = x.parts[0],
					s = u != null || t != null;
				this.opcode("getContext", x.depth);
				this.opcode("pushProgram", u);
				this.opcode("pushProgram", t);
				this.opcode("invokeAmbiguous", v, s)
			},
			simpleSexpr: function(s) {
				var t = s.id;
				if (t.type === "DATA") {
					this.DATA(t)
				} else {
					if (t.parts.length) {
						this.ID(t)
					} else {
						this.addDepth(t.depth);
						this.opcode("getContext", t.depth);
						this.opcode("pushContext")
					}
				}
				this.opcode("resolvePossibleLambda")
			},
			helperSexpr: function(v, t, s) {
				var w = this.setupFullMustacheParams(v, t, s),
					u = v.id.parts[0];
				if (this.options.knownHelpers[u]) {
					this.opcode("invokeKnownHelper", w.length, u)
				} else {
					if (this.options.knownHelpersOnly) {
						throw new m("You specified knownHelpersOnly, but used the unknown helper " + u, v)
					} else {
						this.opcode("invokeHelper", w.length, u, v.isRoot)
					}
				}
			},
			sexpr: function(t) {
				var s = this.classifySexpr(t);
				if (s === "simple") {
					this.simpleSexpr(t)
				} else {
					if (s === "helper") {
						this.helperSexpr(t)
					} else {
						this.ambiguousSexpr(t)
					}
				}
			},
			ID: function(v) {
				this.addDepth(v.depth);
				this.opcode("getContext", v.depth);
				var t = v.parts[0];
				if (!t) {
					this.opcode("pushContext")
				} else {
					this.opcode("lookupOnContext", v.parts[0])
				}
				for (var u = 1, s = v.parts.length; u < s; u++) {
					this.opcode("lookup", v.parts[u])
				}
			},
			DATA: function(u) {
				this.options.data = true;
				if (u.id.isScoped || u.id.depth) {
					throw new m("Scoped data references are not supported: " + u.original, u)
				}
				this.opcode("lookupData");
				var v = u.id.parts;
				for (var t = 0, s = v.length; t < s; t++) {
					this.opcode("lookup", v[t])
				}
			},
			STRING: function(s) {
				this.opcode("pushString", s.string)
			},
			INTEGER: function(s) {
				this.opcode("pushLiteral", s.integer)
			},
			BOOLEAN: function(s) {
				this.opcode("pushLiteral", s.bool)
			},
			comment: function() {},
			opcode: function(s) {
				this.opcodes.push({
					opcode: s,
					args: [].slice.call(arguments, 1)
				})
			},
			declare: function(s, t) {
				this.opcodes.push({
					opcode: "DECLARE",
					name: s,
					value: t
				})
			},
			addDepth: function(s) {
				if (s === 0) {
					return
				}
				if (!this.depths[s]) {
					this.depths[s] = true;
					this.depths.list.push(s)
				}
			},
			classifySexpr: function(v) {
				var u = v.isHelper;
				var w = v.eligibleHelper;
				var t = this.options;
				if (w && !u) {
					var s = v.id.parts[0];
					if (t.knownHelpers[s]) {
						u = true
					} else {
						if (t.knownHelpersOnly) {
							w = false
						}
					}
				}
				if (u) {
					return "helper"
				} else {
					if (w) {
						return "ambiguous"
					} else {
						return "simple"
					}
				}
			},
			pushParams: function(u) {
				var s = u.length,
					t;
				while (s--) {
					t = u[s];
					if (this.options.stringParams) {
						if (t.depth) {
							this.addDepth(t.depth)
						}
						this.opcode("getContext", t.depth || 0);
						this.opcode("pushStringParam", t.stringModeValue, t.type);
						if (t.type === "sexpr") {
							this.sexpr(t)
						}
					} else {
						this[t.type](t)
					}
				}
			},
			setupFullMustacheParams: function(u, t, s) {
				var v = u.params;
				this.pushParams(v);
				this.opcode("pushProgram", t);
				this.opcode("pushProgram", s);
				if (u.hash) {
					this.hash(u.hash)
				} else {
					this.opcode("emptyHash")
				}
				return v
			}
		};

		function n(u, v, w) {
			if (u == null || (typeof u !== "string" && u.constructor !== w.AST.ProgramNode)) {
				throw new m("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + u)
			}
			v = v || {};
			if (!("data" in v)) {
				v.data = true
			}
			var t = w.parse(u);
			var s = new w.Compiler().compile(t, v);
			return new w.JavaScriptCompiler().compile(s, v)
		}
		q.precompile = n;

		function p(s, t, u) {
			if (s == null || (typeof s !== "string" && s.constructor !== u.AST.ProgramNode)) {
				throw new m("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + s)
			}
			t = t || {};
			if (!("data" in t)) {
				t.data = true
			}
			var w;

			function v() {
				var z = u.parse(s);
				var y = new u.Compiler().compile(z, t);
				var x = new u.JavaScriptCompiler().compile(y, t, undefined, true);
				return u.template(x)
			}
			return function(y, x) {
				if (!w) {
					w = v()
				}
				return w.call(this, y, x)
			}
		}
		q.compile = p;
		return q
	})(d);
	var h = (function(u, x) {
		var w;
		var m = u.COMPILER_REVISION;
		var q = u.REVISION_CHANGES;
		var r = u.log;
		var s = x;

		function o(z) {
			this.value = z
		}
		function y() {}
		y.prototype = {
			nameLookup: function(C, A) {
				var B, z;
				if (C.indexOf("depth") === 0) {
					B = true
				}
				if (/^[0-9]+$/.test(A)) {
					z = C + "[" + A + "]"
				} else {
					if (y.isValidJavaScriptVariableName(A)) {
						z = C + "." + A
					} else {
						z = C + "['" + A + "']"
					}
				}
				if (B) {
					return "(" + C + " && " + z + ")"
				} else {
					return z
				}
			},
			compilerInfo: function() {
				var A = m,
					z = q[A];
				return "this.compilerInfo = [" + A + ",'" + z + "'];\n"
			},
			appendToBuffer: function(z) {
				if (this.environment.isSimple) {
					return "return " + z + ";"
				} else {
					return {
						appendToBuffer: true,
						content: z,
						toString: function() {
							return "buffer += " + z + ";"
						}
					}
				}
			},
			initializeBuffer: function() {
				return this.quotedString("")
			},
			namespace: "Handlebars",
			compile: function(z, B, D, C) {
				this.environment = z;
				this.options = B || {};
				r("debug", this.environment.disassemble() + "\n\n");
				this.name = this.environment.name;
				this.isChild = !! D;
				this.context = D || {
					programs: [],
					environments: [],
					aliases: {}
				};
				this.preamble();
				this.stackSlot = 0;
				this.stackVars = [];
				this.registers = {
					list: []
				};
				this.hashes = [];
				this.compileStack = [];
				this.inlineStack = [];
				this.compileChildren(z, B);
				var F = z.opcodes,
					E;
				this.i = 0;
				for (var A = F.length; this.i < A; this.i++) {
					E = F[this.i];
					if (E.opcode === "DECLARE") {
						this[E.name] = E.value
					} else {
						this[E.opcode].apply(this, E.args)
					}
					if (E.opcode !== this.stripNext) {
						this.stripNext = false
					}
				}
				this.pushSource("");
				if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
					throw new s("Compile completed with content left on stack")
				}
				return this.createFunctionContext(C)
			},
			preamble: function() {
				var z = [];
				if (!this.isChild) {
					var A = this.namespace;
					var B = "helpers = this.merge(helpers, " + A + ".helpers);";
					if (this.environment.usePartial) {
						B = B + " partials = this.merge(partials, " + A + ".partials);"
					}
					if (this.options.data) {
						B = B + " data = data || {};"
					}
					z.push(B)
				} else {
					z.push("")
				}
				if (!this.environment.isSimple) {
					z.push(", buffer = " + this.initializeBuffer())
				} else {
					z.push("")
				}
				this.lastContext = 0;
				this.source = z
			},
			createFunctionContext: function(D) {
				var F = this.stackVars.concat(this.registers.list);
				if (F.length > 0) {
					this.source[1] = this.source[1] + ", " + F.join(", ")
				}
				if (!this.isChild) {
					for (var C in this.context.aliases) {
						if (this.context.aliases.hasOwnProperty(C)) {
							this.source[1] = this.source[1] + ", " + C + "=" + this.context.aliases[C]
						}
					}
				}
				if (this.source[1]) {
					this.source[1] = "var " + this.source[1].substring(2) + ";"
				}
				if (!this.isChild) {
					this.source[1] += "\n" + this.context.programs.join("\n") + "\n"
				}
				if (!this.environment.isSimple) {
					this.pushSource("return buffer;")
				}
				var G = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
				for (var B = 0, z = this.environment.depths.list.length; B < z; B++) {
					G.push("depth" + this.environment.depths.list[B])
				}
				var E = this.mergeSource();
				if (!this.isChild) {
					E = this.compilerInfo() + E
				}
				if (D) {
					G.push(E);
					return Function.apply(this, G)
				} else {
					var A = "function " + (this.name || "") + "(" + G.join(",") + ") {\n  " + E + "}";
					r("debug", A + "\n\n");
					return A
				}
			},
			mergeSource: function() {
				var D = "",
					B;
				for (var C = 0, z = this.source.length; C < z; C++) {
					var A = this.source[C];
					if (A.appendToBuffer) {
						if (B) {
							B = B + "\n    + " + A.content
						} else {
							B = A.content
						}
					} else {
						if (B) {
							D += "buffer += " + B + ";\n  ";
							B = undefined
						}
						D += A + "\n  "
					}
				}
				return D
			},
			blockValue: function() {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var z = ["depth0"];
				this.setupParams(0, z);
				this.replaceStack(function(A) {
					z.splice(1, 0, A);
					return "blockHelperMissing.call(" + z.join(", ") + ")"
				})
			},
			ambiguousBlockValue: function() {
				this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
				var A = ["depth0"];
				this.setupParams(0, A);
				var z = this.topStack();
				A.splice(1, 0, z);
				this.pushSource("if (!" + this.lastHelper + ") { " + z + " = blockHelperMissing.call(" + A.join(", ") + "); }")
			},
			appendContent: function(z) {
				if (this.pendingContent) {
					z = this.pendingContent + z
				}
				if (this.stripNext) {
					z = z.replace(/^\s+/, "")
				}
				this.pendingContent = z
			},
			strip: function() {
				if (this.pendingContent) {
					this.pendingContent = this.pendingContent.replace(/\s+$/, "")
				}
				this.stripNext = "strip"
			},
			append: function() {
				this.flushInline();
				var z = this.popStack();
				this.pushSource("if(" + z + " || " + z + " === 0) { " + this.appendToBuffer(z) + " }");
				if (this.environment.isSimple) {
					this.pushSource("else { " + this.appendToBuffer("''") + " }")
				}
			},
			appendEscaped: function() {
				this.context.aliases.escapeExpression = "this.escapeExpression";
				this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
			},
			getContext: function(z) {
				if (this.lastContext !== z) {
					this.lastContext = z
				}
			},
			lookupOnContext: function(z) {
				this.push(this.nameLookup("depth" + this.lastContext, z, "context"))
			},
			pushContext: function() {
				this.pushStackLiteral("depth" + this.lastContext)
			},
			resolvePossibleLambda: function() {
				this.context.aliases.functionType = '"function"';
				this.replaceStack(function(z) {
					return "typeof " + z + " === functionType ? " + z + ".apply(depth0) : " + z
				})
			},
			lookup: function(z) {
				this.replaceStack(function(A) {
					return A + " == null || " + A + " === false ? " + A + " : " + this.nameLookup(A, z, "context")
				})
			},
			lookupData: function() {
				this.pushStackLiteral("data")
			},
			pushStringParam: function(z, A) {
				this.pushStackLiteral("depth" + this.lastContext);
				this.pushString(A);
				if (A !== "sexpr") {
					if (typeof z === "string") {
						this.pushString(z)
					} else {
						this.pushStackLiteral(z)
					}
				}
			},
			emptyHash: function() {
				this.pushStackLiteral("{}");
				if (this.options.stringParams) {
					this.push("{}");
					this.push("{}")
				}
			},
			pushHash: function() {
				if (this.hash) {
					this.hashes.push(this.hash)
				}
				this.hash = {
					values: [],
					types: [],
					contexts: []
				}
			},
			popHash: function() {
				var z = this.hash;
				this.hash = this.hashes.pop();
				if (this.options.stringParams) {
					this.push("{" + z.contexts.join(",") + "}");
					this.push("{" + z.types.join(",") + "}")
				}
				this.push("{\n    " + z.values.join(",\n    ") + "\n  }")
			},
			pushString: function(z) {
				this.pushStackLiteral(this.quotedString(z))
			},
			push: function(z) {
				this.inlineStack.push(z);
				return z
			},
			pushLiteral: function(z) {
				this.pushStackLiteral(z)
			},
			pushProgram: function(z) {
				if (z != null) {
					this.pushStackLiteral(this.programExpression(z))
				} else {
					this.pushStackLiteral(null)
				}
			},
			invokeHelper: function(D, A, z) {
				this.context.aliases.helperMissing = "helpers.helperMissing";
				this.useRegister("helper");
				var B = this.lastHelper = this.setupHelper(D, A, true);
				var E = this.nameLookup("depth" + this.lastContext, A, "context");
				var C = "helper = " + B.name + " || " + E;
				if (B.paramsInit) {
					C += "," + B.paramsInit
				}
				this.push("(" + C + ",helper ? helper.call(" + B.callParams + ") : helperMissing.call(" + B.helperMissingParams + "))");
				if (!z) {
					this.flushInline()
				}
			},
			invokeKnownHelper: function(B, z) {
				var A = this.setupHelper(B, z);
				this.push(A.name + ".call(" + A.callParams + ")")
			},
			invokeAmbiguous: function(z, D) {
				this.context.aliases.functionType = '"function"';
				this.useRegister("helper");
				this.emptyHash();
				var A = this.setupHelper(0, z, D);
				var B = this.lastHelper = this.nameLookup("helpers", z, "helper");
				var E = this.nameLookup("depth" + this.lastContext, z, "context");
				var C = this.nextStack();
				if (A.paramsInit) {
					this.pushSource(A.paramsInit)
				}
				this.pushSource("if (helper = " + B + ") { " + C + " = helper.call(" + A.callParams + "); }");
				this.pushSource("else { helper = " + E + "; " + C + " = typeof helper === functionType ? helper.call(" + A.callParams + ") : helper; }")
			},
			invokePartial: function(z) {
				var A = [this.nameLookup("partials", z, "partial"), "'" + z + "'", this.popStack(), "helpers", "partials"];
				if (this.options.data) {
					A.push("data")
				}
				this.context.aliases.self = "this";
				this.push("self.invokePartial(" + A.join(", ") + ")")
			},
			assignToHash: function(A) {
				var C = this.popStack(),
					z, B;
				if (this.options.stringParams) {
					B = this.popStack();
					z = this.popStack()
				}
				var D = this.hash;
				if (z) {
					D.contexts.push("'" + A + "': " + z)
				}
				if (B) {
					D.types.push("'" + A + "': " + B)
				}
				D.values.push("'" + A + "': (" + C + ")")
			},
			compiler: y,
			compileChildren: function(z, C) {
				var E = z.children,
					G, F;
				for (var D = 0, A = E.length; D < A; D++) {
					G = E[D];
					F = new this.compiler();
					var B = this.matchExistingProgram(G);
					if (B == null) {
						this.context.programs.push("");
						B = this.context.programs.length;
						G.index = B;
						G.name = "program" + B;
						this.context.programs[B] = F.compile(G, C, this.context);
						this.context.environments[B] = G
					} else {
						G.index = B;
						G.name = "program" + B
					}
				}
			},
			matchExistingProgram: function(C) {
				for (var B = 0, A = this.context.environments.length; B < A; B++) {
					var z = this.context.environments[B];
					if (z && z.equals(C)) {
						return B
					}
				}
			},
			programExpression: function(A) {
				this.context.aliases.self = "this";
				if (A == null) {
					return "self.noop"
				}
				var F = this.environment.children[A],
					E = F.depths.list,
					D;
				var C = [F.index, F.name, "data"];
				for (var B = 0, z = E.length; B < z; B++) {
					D = E[B];
					if (D === 1) {
						C.push("depth0")
					} else {
						C.push("depth" + (D - 1))
					}
				}
				return (E.length === 0 ? "self.program(" : "self.programWithDepth(") + C.join(", ") + ")"
			},
			register: function(z, A) {
				this.useRegister(z);
				this.pushSource(z + " = " + A + ";")
			},
			useRegister: function(z) {
				if (!this.registers[z]) {
					this.registers[z] = true;
					this.registers.list.push(z)
				}
			},
			pushStackLiteral: function(z) {
				return this.push(new o(z))
			},
			pushSource: function(z) {
				if (this.pendingContent) {
					this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
					this.pendingContent = undefined
				}
				if (z) {
					this.source.push(z)
				}
			},
			pushStack: function(A) {
				this.flushInline();
				var z = this.incrStack();
				if (A) {
					this.pushSource(z + " = " + A + ";")
				}
				this.compileStack.push(z);
				return z
			},
			replaceStack: function(G) {
				var B = "",
					C = this.isInline(),
					F, A, D;
				if (C) {
					var E = this.popStack(true);
					if (E instanceof o) {
						F = E.value;
						D = true
					} else {
						A = !this.stackSlot;
						var z = !A ? this.topStackName() : this.incrStack();
						B = "(" + this.push(z) + " = " + E + "),";
						F = this.topStack()
					}
				} else {
					F = this.topStack()
				}
				var H = G.call(this, F);
				if (C) {
					if (!D) {
						this.popStack()
					}
					if (A) {
						this.stackSlot--
					}
					this.push("(" + B + H + ")")
				} else {
					if (!/^stack/.test(F)) {
						F = this.nextStack()
					}
					this.pushSource(F + " = (" + B + H + ");")
				}
				return F
			},
			nextStack: function() {
				return this.pushStack()
			},
			incrStack: function() {
				this.stackSlot++;
				if (this.stackSlot > this.stackVars.length) {
					this.stackVars.push("stack" + this.stackSlot)
				}
				return this.topStackName()
			},
			topStackName: function() {
				return "stack" + this.stackSlot
			},
			flushInline: function() {
				var B = this.inlineStack;
				if (B.length) {
					this.inlineStack = [];
					for (var A = 0, z = B.length; A < z; A++) {
						var C = B[A];
						if (C instanceof o) {
							this.compileStack.push(C)
						} else {
							this.pushStack(C)
						}
					}
				}
			},
			isInline: function() {
				return this.inlineStack.length
			},
			popStack: function(z) {
				var B = this.isInline(),
					A = (B ? this.inlineStack : this.compileStack).pop();
				if (!z && (A instanceof o)) {
					return A.value
				} else {
					if (!B) {
						if (!this.stackSlot) {
							throw new s("Invalid stack pop")
						}
						this.stackSlot--
					}
					return A
				}
			},
			topStack: function(A) {
				var z = (this.isInline() ? this.inlineStack : this.compileStack),
					B = z[z.length - 1];
				if (!A && (B instanceof o)) {
					return B.value
				} else {
					return B
				}
			},
			quotedString: function(z) {
				return '"' + z.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
			},
			setupHelper: function(D, B, A) {
				var C = [],
					E = this.setupParams(D, C, A);
				var z = this.nameLookup("helpers", B, "helper");
				return {
					params: C,
					paramsInit: E,
					name: z,
					callParams: ["depth0"].concat(C).join(", "),
					helperMissingParams: A && ["depth0", this.quotedString(B)].concat(C).join(", ")
				}
			},
			setupOptions: function(B, A) {
				var H = [],
					E = [],
					G = [],
					z, C, F;
				H.push("hash:" + this.popStack());
				if (this.options.stringParams) {
					H.push("hashTypes:" + this.popStack());
					H.push("hashContexts:" + this.popStack())
				}
				C = this.popStack();
				F = this.popStack();
				if (F || C) {
					if (!F) {
						this.context.aliases.self = "this";
						F = "self.noop"
					}
					if (!C) {
						this.context.aliases.self = "this";
						C = "self.noop"
					}
					H.push("inverse:" + C);
					H.push("fn:" + F)
				}
				for (var D = 0; D < B; D++) {
					z = this.popStack();
					A.push(z);
					if (this.options.stringParams) {
						G.push(this.popStack());
						E.push(this.popStack())
					}
				}
				if (this.options.stringParams) {
					H.push("contexts:[" + E.join(",") + "]");
					H.push("types:[" + G.join(",") + "]")
				}
				if (this.options.data) {
					H.push("data:data")
				}
				return H
			},
			setupParams: function(C, B, A) {
				var z = "{" + this.setupOptions(C, B).join(",") + "}";
				if (A) {
					this.useRegister("options");
					B.push("options");
					return "options=" + z
				} else {
					B.push(z);
					return ""
				}
			}
		};
		var n = ("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield").split(" ");
		var v = y.RESERVED_WORDS = {};
		for (var t = 0, p = n.length; t < p; t++) {
			v[n[t]] = true
		}
		y.isValidJavaScriptVariableName = function(z) {
			if (!y.RESERVED_WORDS[z] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(z)) {
				return true
			}
			return false
		};
		w = y;
		return w
	})(i, d);
	var c = (function(v, A, n, r, u) {
		var x;
		var m = v;
		var t = A;
		var q = n.parser;
		var p = n.parse;
		var w = r.Compiler;
		var z = r.compile;
		var o = r.precompile;
		var B = u;
		var y = m.create;
		var s = function() {
				var C = y();
				C.compile = function(D, E) {
					return z(D, E, C)
				};
				C.precompile = function(D, E) {
					return o(D, E, C)
				};
				C.AST = t;
				C.Compiler = w;
				C.JavaScriptCompiler = B;
				C.Parser = q;
				C.parse = p;
				return C
			};
		m = s();
		m.create = s;
		x = m;
		return x
	})(f, j, l, e, h);
	return c
})();
var SitePref = {};
SitePref.cookieName = "preferences";
SitePref._getPrefsObject = function() {
	var a = $.cookie(SitePref.cookieName);
	return a ? JSON.parse(a) : {}
};
SitePref._setPrefsObject = function(a) {
	$.cookie(SitePref.cookieName, JSON.stringify(a), {
		path: "/",
		expires: 365
	})
};
SitePref.get = function(a) {
	return SitePref._getPrefsObject()[a]
};
SitePref.set = function(b, c) {
	var a = SitePref._getPrefsObject();
	a[b] = c;
	SitePref._setPrefsObject(a)
};
SitePref.shouldShowPrompt = function(c, a) {
	var b = SitePref._getPrefsObject();
	if (a !== undefined) {
		if (!b.prompts) {
			b.prompts = {}
		}
		b.prompts[c] = a;
		SitePref._setPrefsObject(b)
	}
	return (b.prompts && b.prompts[c] === false) ? false : true
};
(function(a) {
	a.fn.removeTooltip = function() {
		a(this).find(".tooltip").remove();
		return this
	};
	a.fn.setTooltip = function() {
		var j = a(this);
		var d = j.find(".tooltip");
		if (d.length == 0) {
			return this
		}
		var g = j.offset();
		g.top -= a(window).scrollTop();
		g.left -= a(window).scrollLeft();
		var f = d.outerWidth(true);
		var b = d.outerHeight(true);
		var i = j.outerWidth(true);
		var e = j.outerHeight(true);
		var c = Math.floor((i / 2) - (f / 2));
		var h = Math.floor((e / 2) - (b / 2));
		if ((g.top - b) > TOOLTIP_WINDOW_PADDING) {
			d.css({
				left: c,
				top: -b
			});
			d.addClass("top")
		} else {
			if (a(window).height() - (g.top + e + b) > TOOLTIP_WINDOW_PADDING) {
				d.css({
					left: c,
					top: "100%"
				});
				d.addClass("bottom")
			} else {
				if ((g.left - f) > TOOLTIP_WINDOW_PADDING) {
					d.css({
						left: -f,
						top: h
					});
					d.addClass("left")
				} else {
					d.css({
						left: "100%",
						top: h
					});
					d.addClass("right")
				}
			}
		}
		return this
	};
	a.fn.tooltip = function() {
		var c = a(this);
		c.removeTooltip();
		var b = spree.hbTemplate("tooltip");
		setTimeout(function() {
			b.addClass("is-active")
		}, 500);
		c.append(b);
		c.setTooltip();
		return this
	}
})(jQuery);
var TOOLTIP_WINDOW_PADDING = 10;
$(document).on("mouseover", ".has-tooltip", function(a) {
	a.stopImmediatePropagation();
	a.stopPropagation();
	$(this).tooltip()
});
$(document).on("mouseout", ".has-tooltip", function(a) {
	a.stopImmediatePropagation();
	a.stopPropagation();
	$(this).removeTooltip()
});
var ModalManager = Class.extend({
	init: function() {},
	bindEnterKeySubmit: function(c, b) {
		var a = b.find("input[type=text], input[type=password], input[type=email]");
		if (a.length == 1) {
			b.append("<input type='text' style='display:none;'/>")
		}
		_.each(a, function(d) {
			$(d).keyup(function(f) {
				if (f.which == 10 || f.which == 13) {
					f.preventDefault();
					b.submit()
				}
			})
		})
	},
	bindPreventDuplicateSubmit: function(b, a) {
		var c = b.find("input[type=submit]");
		a.submit(function(d) {
			if (c.attr("disabled")) {
				return false
			} else {
				if (a.attr("data-remote") == "true" && !a.attr("client-validation")) {
					c.attr("disabled", true);
					a.on("ajax:complete", function(g, f) {
						c.attr("disabled", false)
					})
				}
			}
		})
	},
	bindErrorChecking: function(b, a) {
		a.submit(function(d) {
			var c = false;
			_.each(a.find("input[type=text][data-required=true], input[type=email][data-required=true], input[type=password][data-required=true], textarea[data-required=true]"), function(f) {
				var e = $("#" + f.id + "_error");
				if ($(f).val().trim() === "") {
					e.text("Required Field").show();
					c = true
				} else {
					e.text("").hide()
				}
			});
			return !c
		})
	},
	bindSubmitButton: function(b, a) {
		b.find("input[type=submit]").click(function(c) {
			a.submit()
		})
	},
	preventSubmittingPlaceholderText: function(a) {
		a.submit(function(b) {
			_.each(a.find("input[type=text], input[type=email], textarea"), function(c) {
				if ($(c).attr("placeholder") == $(c).val()) {
					$(c).val("")
				}
			})
		})
	},
	bindFormEvents: function(b) {
		var a = b.find("form");
		this.bindSubmitButton(b, a);
		this.bindEnterKeySubmit(b, a);
		this.bindPreventDuplicateSubmit(b, a);
		this.bindErrorChecking(b, a);
		this.preventSubmittingPlaceholderText(a)
	},
	create: function(h, d, c, a) {
		var i = this;
		if (!a) {
			a = {}
		}
		a.modalId = h;
		var g = $(Handlebars.helpers.modal(h, a));
		g.on("hidden", function() {
			if (spree.event && spree.device === "ipad") {
				$("#spreecast_video").attr("controls", true);
				if ((h === "signup" || h === "login") && spree.spreecast && spree.spreecast.mobilePlayer) {
					spree.spreecast.mobilePlayer.player.load()
				}
			}
			$(".modal-backdrop").remove();
			$(this).remove()
		});
		if (c) {
			$.get(c, function(j) {
				g.find(".modal-body").html(j);
				i.bindFormEvents(g);
				if (d) {
					d(g)
				}
			})
		} else {
			i.bindFormEvents(g);
			if (d) {
				var f = g.hasClass("flyin");
				if (f) {
					performAfterAnimation(g, function() {
						d(g)
					})
				} else {
					d(g)
				}
			}
		}
		if (spree.event && spree.device === "ipad") {
			$("#spreecast_video").attr("controls", false)
		}
		var b = spree.is_embed ? 2 : 10;
		g.css("top", (($(window).scrollTop() / $(window).height()) * 100) + b + "%");
		$("body").append(g);
		var e = (a && a.hasOwnProperty("noEscape") && a.noEscape === true) ? "static" : true;
		g.modal({
			backdrop: e
		});
		if (a && a.hasOwnProperty("noBackdrop") && a.noBackdrop === true) {
			$(".modal-backdrop").remove()
		}
		return g
	},
	hide: function(b) {
		var a = ".modal";
		if (b && b !== "") {
			a = "#" + b
		}
		$(a).modal("hide")
	},
	showNext: function(c, a) {
		var b = this;
		$(".modal").on("hidden", function() {
			if (c === "signup") {
				spree.loginMgr.showSignup("login")
			} else {
				if (c === "login") {
					LoginManager.showLogin()
				} else {
					if (c === "email-signup") {
						spree.loginMgr.showEmailSignup()
					} else {
						b.create(c)
					}
				}
			}
		});
		this.hide(a)
	}
});
var Banner = Class.extend({
	init: function(b) {
		this.$div = b;
		this.type = this.$div.data("type");
		var c = this;
		this.$div.on("click.close", ".close-icon, .close-large-icon", function() {
			c.closeCallback()
		});
		this.callbacks = ["destroy", "hide", "hidden", "show", "shown"];
		for (var d = 0, a = this.callbacks.length; d < a; d++) {
			(function(e) {
				c.$div.on(e, function() {
					c[e + "Callback"]()
				})
			})(this.callbacks[d])
		}
	},
	showBorder: function() {
		this.$div.css("border-bottom", "1px solid #cccccc")
	},
	hideBorder: function() {
		this.$div.css("border-bottom", "none")
	},
	dispose: function() {
		this.$div.off("click.close");
		var a = this;
		_.forEach(this.callbacks, function(b) {
			a.$div.off(b)
		})
	},
	closeCallback: function() {
		spree.bannerMgr.hide(this.type);
		SitePref.shouldShowPrompt(this.type, false)
	},
	hiddenCallback: function() {
		this.dispose()
	},
	hideCallback: function() {},
	destroyCallback: function() {},
	shownCallback: function() {},
	showCallback: function() {}
});
var FeatureAlertBanner = Banner.extend({
	hiddenCallback: function() {
		this._super();
		$("#watch-nav").removeClass("prompting")
	},
	showCallback: function() {
		this._super();
		$("#watch-nav").addClass("prompting")
	}
});
var WatchMenuBanner = Banner.extend({
	init: function(a) {
		this._super(a);
		this.leftOff = -400;
		this.rightOff = 2060;
		this.LEFT = -1;
		this.RIGHT = 1;
		this.perPage = spree.event ? 2 : 3;
		this.bubbleWidth = this.perPage === 3 ? 290 : 303
	},
	showCallback: function() {
		this._super();
		this.showBorder();
		$("#watch-nav").addClass("active");
		$("#nav-watch-link").removeClass("nav-down-caret-icon").addClass("nav-up-caret-icon");
		if (spree.bucket_manager.serviceEnabled("mixpanel")) {
			mixpanel.track("header", {
				item: "watch",
				"page type": spree.mixpanelPageType
			})
		}
	},
	isHeaderOffscreen: function(a) {
		var b = a.getTranslation().x;
		return (b == this.leftOff || b == this.rightOff)
	},
	moveHeader: function(a, c, b) {
		if (b === undefined) {
			b = true
		}
		if (!b) {
			a.removeClass("animated")
		}
		a.translate(c + "px", 0, 0);
		if (!b) {
			a[0].offsetHeight;
			a.addClass("animated")
		}
	},
	positionHeaderOffscreen: function(a, b) {
		if (b == this.RIGHT) {
			this.moveHeader(a, this.rightOff, false)
		} else {
			this.moveHeader(a, this.leftOff, false)
		}
	},
	animateHeaders: function(d) {
		var a = this;
		var e = this.$div.find(".scroll-items").children().eq(this.currentPage + d);
		var c = {};
		var b = 0;
		_.forEach(e.children(), function(g) {
			var f = $(g).data("status");
			if (c[f] === undefined) {
				c[f] = b
			}
			b++
		});
		_.forEach(this.$div.find(".listing-header"), function(i) {
			var g = $(i);
			var f = g.data("status");
			if (a.isHeaderOffscreen(g)) {
				a.positionHeaderOffscreen(g, d)
			}
			if (c[f] === undefined && !a.isHeaderOffscreen(g)) {
				if (d == a.RIGHT) {
					a.moveHeader(g, a.leftOff)
				} else {
					a.moveHeader(g, a.rightOff)
				}
			} else {
				if (c[f] !== undefined) {
					var h = 40 + (c[f] * a.bubbleWidth);
					if (c[f] != 0) {
						h += 10
					}
					a.moveHeader(g, h, d !== 0)
				}
			}
		})
	},
	shownCallback: function() {
		this._super();
		var b = this;
		this.currentPage = 0;
		var a = $("#watch-menu");
		$.ajax({
			url: "/live_popular",
			type: "GET",
			data: {
				per_page: this.perPage
			},
			success: function(d, e, c) {
				a.removeClass("center").html(d);
				b.animateHeaders(0);
				a.find(".event-name").ellipsis();
				b.$div.find(".scrollable.horizontal").scrollable();
				Time.localizeDOM("#watch-menu");
				b.$div.find(".next").click(function() {
					b.animateHeaders(b.RIGHT);
					b.currentPage++
				});
				b.$div.find(".prev").click(function() {
					b.animateHeaders(b.LEFT);
					b.currentPage--
				});
				if (spree.bucket_manager.serviceEnabled("mixpanel")) {
					mixpanel.track_links("#watch-menu a", "live & popular", function(f) {
						if ($(f).parent().hasClass("see-all")) {
							return {
								"page type": spree.mixpanelPageType,
								action: "header",
								position: "see all"
							}
						}
						return {
							position: $(f).parents("[data-position]").data("position"),
							"page type": spree.mixpanelPageType,
							action: "header"
						}
					})
				}
			}
		})
	},
	hideCallback: function() {
		this._super();
		$("#watch-nav").removeClass("active");
		$("#nav-watch-link").removeClass("nav-up-caret-icon").addClass("nav-down-caret-icon")
	},
	hiddenCallback: function() {
		this.hideBorder()
	},
	closeCallback: function() {
		spree.bannerMgr.hide(this.type, false)
	}
});
var BannerManager = Class.extend({
	init: function() {
		var a = this;
		this.banners = {}
	},
	create: function(b) {
		var a = $("[data-type=" + b + "]");
		this.banners[b] = new window[b](a)
	},
	show: function(b) {
		if (!this.banners[b]) {
			this.create(b)
		}
		var a = $("[data-type=" + b + "]");
		performAfterTransition(a, function() {
			a.trigger("shown")
		});
		a.removeClass("hidden");
		a.trigger("show")
	},
	hide: function(e, a) {
		var d = (a === undefined) ? true : a;
		var b = this;
		var c = $("[data-type=" + e + "]");
		performAfterTransition(c, function() {
			c.trigger("hidden");
			if (d) {
				b._destroy(e)
			}
		});
		c.addClass("hidden");
		c.trigger("hide")
	},
	_destroy: function(b) {
		var a = $("[data-type=" + b + "]");
		a.trigger("destroy");
		a.remove()
	}
});
var UrlUtils = Class.extend();
UrlUtils._parseParamString = function(c) {
	if (!c) {
		return null
	}
	var a = c.split("&");
	if (a.length === 0) {
		return null
	}
	var b = {};
	_.each(a, function(e) {
		var d = e.split("=");
		b[d[0]] = d[1]
	});
	return b
};
UrlUtils._parseURLParams = function(e) {
	var f = {};
	if (!e) {
		return f
	}
	var d = e.split("?")[1];
	var b = (!d) ? e.split("#")[1] : d.split("#")[1];
	if (d) {
		d = d.split("#")[0]
	}
	var c = this._parseParamString(d);
	if (c) {
		f.query = c
	}
	var a = this._parseParamString(b);
	if (a) {
		f.hash = a
	}
	return f
};
UrlUtils.getBaseURL = function(a) {
	var c = a.indexOf("?");
	var b = a.indexOf("#");
	if (c >= 0) {
		return a.substring(0, c)
	} else {
		if (b >= 0) {
			return a.substring(0, b)
		} else {
			return a
		}
	}
};
UrlUtils.getShortenedUrl = function(a, b) {
	return $.ajax({
		url: "//api.awe.sm/url.json",
		data: {
			v: 3,
			url: a,
			key: spree.awesm.key,
			tool: spree.awesm.tool,
			channel: "twitter"
		},
		dataType: "jsonp",
		crossDomain: true,
		error: function() {
			console.log("awesm shorturl error", arguments);
			return b()
		},
		success: function(d) {
			var c = d && d.awesm_url;
			if (c && c.length) {
				return b(c)
			}
			return b()
		}
	})
};
UrlUtils.getParams = function(a) {
	var a = typeof(a) !== "undefined" ? a : window.location.href;
	return this._parseURLParams(a)
};
UrlUtils.addParams = function(c, d, g) {
	var b = this.getParams(c);
	var e = (b.query) ? _.extend(b.query, d) : ((d) ? d : null);
	var h = e ? ("?" + decodeURIComponent($.param(e))) : "";
	var a = (b.hash) ? _.extend(b.hash, g) : ((g) ? g : null);
	var f = a ? ("#" + decodeURIComponent($.param(a))) : "";
	return this.getBaseURL(c) + h + f
};
UrlUtils.removeParams = function(c, h, j) {
	var d = this.getParams(c);
	var g = d.query;
	if (h) {
		for (var f = 0; f < h.length; f++) {
			delete g[h[f]]
		}
	}
	var b = (g && !_.isEmpty(g)) ? ("?" + decodeURIComponent($.param(g))) : "";
	var a = d.hash;
	if (j) {
		for (var f = 0; f < j.length; f++) {
			delete a[j[f]]
		}
	}
	var e = (a && !_.isEmpty(a)) ? ("#" + decodeURIComponent($.param(a))) : "";
	return this.getBaseURL(c) + b + e
};
UrlUtils.relativePath = function() {
	return window.location.href.replace(window.location.origin, "")
};
String.prototype.truncate = function(a) {
	if (this.length > a) {
		return this.slice(0, a - 3) + "..."
	} else {
		return this
	}
};
String.prototype.trim = function() {
	return this.replace(/^\s+/, "").replace(/\s+$/, "")
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(c, d) {
		for (var b = (d || 0), a = this.length; b < a; b++) {
			if (this[b] === c) {
				return b
			}
		}
		return -1
	}
}
$.fn.shrinkToFit = function() {
	return this.each(function() {
		var b = $(this),
			g = parseInt(b.attr("data-max-size") || b.parent().css("font-size") || 40),
			f = parseInt(b.attr("data-min-size") || 11),
			e = b.parent().width(),
			d = b.parent().height(),
			a = b.height(),
			c = b.width();
		do {
			b.css("font-size", g--);
			a = b.height();
			c = b.width()
		} while ((a > d || c > e) && g > f)
	})
};
$.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	return this
};
$.fn.translate = function(a, c, b) {
	this.css({
		msTransform: "translate(" + a + "," + c + "," + b + ")",
		oTransform: "translate3d(" + a + "," + c + "," + b + ")",
		mozTransform: "translate3d(" + a + "," + c + "," + b + ")",
		webkitTransform: "translate3d(" + a + "," + c + "," + b + ")",
		transform: "translate3d(" + a + "," + c + "," + b + ")"
	})
};
$.fn.getTranslation = function() {
	var b = this.css("transform");
	var f = this.css("-ms-transform");
	var e = this.css("-moz-transform");
	var c = this.css("-webkit-transform");
	var d = c.length ? c : e.length ? e : f.length ? f : b;
	var a = d.substring(d.indexOf("(") + 1, d.indexOf(")")).split(",");
	var g = {
		x: 0,
		y: 0,
		z: 0
	};
	if (a.length == (2 * 3)) {
		g.x = a[4];
		g.y = a[5]
	} else {
		if (a.length == (4 * 4)) {
			g.x = a[12];
			g.y = a[13];
			g.z = a[14]
		}
	}
	return {
		x: parseInt(g.x),
		y: parseInt(g.y),
		z: parseInt(g.z)
	}
};
var vendorize = function(b) {
		var d = ["webkit", "MS", "moz"];
		var c = [b.toLowerCase()];
		for (var a = 0; a < d.length; a++) {
			c.push(d[a] + b)
		}
		return c.join(" ")
	};
var animationend = vendorize("AnimationEnd");
var transitionend = vendorize("TransitionEnd");
var namespaceEvent = function(d) {
		var c = Math.floor(Math.random() * 1000000000);
		var b = d.split(" ");
		for (var a = 0; a < b.length; a++) {
			b[a] = (b[a] + "." + c)
		}
		return b.join(" ")
	};
var performAfterAnimation = function(c, d, b) {
		var a = namespaceEvent(animationend);
		c.on(a, function(e) {
			if (!b || (b && (b == e.originalEvent.propertyName))) {
				$(this).off(a);
				d()
			}
		})
	};
var performAfterTransition = function(c, d, b) {
		var a = namespaceEvent(transitionend);
		c.on(a, function(e) {
			if (!b || b == e.originalEvent.propertyName) {
				$(this).off(a);
				d()
			}
		})
	};

function getHashParams() {
	var c = {};
	var h, b = /\+/g,
		f = /([^&;=]+)=?([^&;]*)/g,
		i = function(a) {
			return decodeURIComponent(a.replace(b, " "))
		},
		g = window.location.hash.substring(1);
	while (h = f.exec(g)) {
		c[i(h[1])] = i(h[2])
	}
	return c
}
function validURL(b) {
	var a = /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[\(\)-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/gi;
	return (a.test(b))
}
function numberWithCommas(a) {
	return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
var Spree = Class.extend({
	init: function(d) {
		if (d && d.embed_preload) {
			return
		}
		var b = this;
		this.analytics = new SpreeAnalytics();
		this.error = d.error;
		window.spree = this;
		this.login_trap_pct = d.login_trap_pct;
		this.fb_follow_all_pct = d.fb_follow_all_pct;
		b.scm_env = d.user_data.scm_env;
		var a = d.user_profile;
		if (a && (typeof a.name !== "undefined") && d.user_data && d.user_data.user) {
			delete d.user_data.user.last_name;
			delete d.user_profile;
			_.each(a, function(h, g) {
				d.user_data.user[g] = h
			});
			d.user_data.user.is_admin = a.admin;
			d.user_data.user.profile_photo = a.profile_photo_thumb_url;
			d.user_data.user.confirmEmailId = a.confirm_email_id;
			d.user_data.user.first_name = a.name;
			d.user_data.user.photoUrl = a.profile_photo_thumb_url;
			d.user_data.user.alt = a.s3_id;
			d.user_data.user.following = d.following
		}
		if (d != null) {
			d.channels = [];
			var e = $("#site-channels");
			if (e.length > 0) {
				var c = e.data("user-channel");
				if (c.length > 0) {
					d.channels.push({
						channel: c,
						last_message_id: e.data("user-channel-last-message-id"),
						type: "global",
						im: true
					})
				}
				d.channels.push({
					channel: e.data("everyone-channel"),
					last_message_id: e.data("everyone-channel-last-message-id"),
					type: "global"
				})
			}
			this.device = d.device;
			this.serverResponse = d;
			if (d.user_data.event && !window.eventLanding && (d.user_data.event.status != 2 || !this.serverResponse.digest.stitch_urls.archive_rtmp)) {
				var f = $("#event-channels");
				if (f.length > 0) {
					var c = f.data("user-channel");
					if (c.length > 0) {
						d.channels.push({
							channel: c,
							last_message_id: f.data("user-channel-last-message-id"),
							type: "event"
						})
					}
					d.channels.push({
						channel: f.data("everyone-channel"),
						last_message_id: this.serverResponse.digest.last_message_id,
						type: "event"
					})
				}
			}
			_.each(d.buddy_list, function(g) {
				g.online = _.has(d.online_buddies, g.alt);
				g.capabilities = d.online_buddies[g.alt];
				g.idle = _.contains(d.idle_buddies, g.alt)
			});
			this.channel_embed = d.channel_embed;
			this.site_notification = d.site_notification
		}
		_.each(d.user_data, function(h, g) {
			b[g] = h
		});
		this.search = new SpreeSearch();
		this.bucket_manager = new BucketManager(d.bucket_json);
		if (!spree.event && !spree.profile) {
			this.pageController = new PageController()
		}
		this.eventMgr = new EventManager();
		if ((typeof(gapi) != "undefined") && ($("#plusone-container").length)) {
			gapi.plusone.render("plusone-container", {
				size: "medium",
				annotation: "bubble"
			})
		}
		this.setBodyClass();
		this.baseTitle = $("title").text().trim();
		if (!this.serverResponse.user_data.event) {
			this.setupEcma()
		}
		if (d.needs_to_confirm_email && !$.cookie("shown_email_block")) {
			spree.blockWithConfirmEmail();
			$.cookie("shown_email_block", 1)
		}
		this.firebase_queue = []
	},
	eventIsLive: function() {
		return (this.event.status == 1)
	},
	eventIsScheduledOrLive: function() {
		return (this.event.status == 0 || this.event.status == 1)
	},
	eventIsFinished: function() {
		return (this.event.status == 2 || this.event.status == 4)
	},
	isMobile: function() {
		return (this.device === "iphone" || this.device === "android")
	},
	isTablet: function() {
		return (this.device === "ipad" || this.device === "android_t")
	},
	displayIM: function() {
		return !spree.is_embed && !spree.error && !(spree.user === undefined || spree.user.has_been_authenticated == false)
	},
	setupEcma: function() {
		var b = this;
		this.ecma = {};
		EcmaGlobals.env = spree.scm_env;
		if (getHashParams()["capture_messages"]) {
			EcmaGlobals.CAPTURE_MESSAGES = true
		}
		this.ecma.ecma = new Ecma(0, spree.serverResponse.digest ? spree.device : null);
		var e = this.serverResponse.user_data.event ? this.serverResponse.user_data.event.friendly_id : null;
		var d = this.serverResponse.user_data.event ? this.serverResponse.user_data.event.event_id : null;
		var a = this.serverResponse.channels ? this.serverResponse.channels : [];
		var c = (spree.isMobile() && spree.event && spree.eventIsScheduledOrLive()) ? 15000 : 0;
		this.ecma.messageController = new MessageController(this.ecma.ecma, e, d, a, c, null, function(g) {
			spree.ecma.siteNotificationController = new SiteNotificationController(spree.ecma.ecma, g, spree.site_notification, function(i) {
				i.subscribe(i.signals.ON, function(j) {
					console.log("Got a new site notification: ", j)
				});
				i.subscribe(i.signals.OFF, function(j) {
					console.log("Got a signal to remove a site notification")
				})
			});
			g.subscribe(g.signals.READY, function() {
				window.deferLoad.trigger("optimizely");
				window.deferLoad.trigger("googleanalytics");
				window.deferLoad.trigger("firebase");
				window.deferLoad.trigger("chartbeat");
				window.deferLoad.trigger("awesm");
				window.deferLoad.trigger("facebook");
				window.deferLoad.trigger("facebook_analytics");
				window.deferLoad.trigger("twitter");
				window.deferLoad.trigger("twitterbox");
				window.deferLoad.trigger("linkedin");
				window.deferLoad.trigger("googleplus");
				window.deferLoad.trigger("filepicker")
			});
			if (b.serverResponse.digest) {
				var h = b.eventIsScheduledOrLive();
				var f = ["onair", "producer", "viewer"];
				if (spree.user.producer) {
					f.splice(f.indexOf("viewer"), 0, "cameraqueue")
				}
				spree.ecma.eventController = new EventController(spree.ecma.ecma, g, spree.serverResponse.user_data.event.friendly_id, spree.serverResponse, function(q) {
					if (spree.isTablet() || spree.isMobile()) {
						var j = $("#spreecast_video")[0];
						if (j && j.length !== 0) {
							spree.spreecast.mobilePlayer = new MobilePlayer(j, q)
						}
					}
					q.subscribe(q.signals.STITCH_AVAILABLE, function(y) {
						if (y && y.archive_rtmp) {
							if (!spree.event.stitch_urls.archive_rtmp && !spree.event_just_ended) {
								setTimeout(function() {
									window.location.reload(true)
								}, Math.random() * 60000)
							}
						}
						if ((spree.isMobile() || spree.isTablet())) {
							var x = $("#spreecast_video")[0];
							spree.event.stitch_urls = y;
							if (x && spree.spreecast.mobilePlayer) {
								spree.spreecast.mobilePlayer.reloadUrls()
							} else {
								$("#video_container").html("<video id='spreecast_video' controls='controls' " + (spree.device === "iphone" ? "type='application/x-mpegURL' webkit-playsinline" : "") + "poster='" + spree.event.image_url + "'></video>");
								x = $("#spreecast_video")[0];
								spree.spreecast.mobilePlayer = new MobilePlayer(x, q)
							}
						}
					});
					var o = b.user.producer ? $("#producers-viewer-list") : $("#user-viewer-list");
					if (o.length > 0) {
						b.spreecast.viewerRail = new ViewerRail(o, b.user.producer, f)
					}
					var u = spree.spreecast.faceblock = new Faceblock();
					spree.ecma.userController = new UserController(spree.ecma.ecma, q);
					q.messageController().subscribe(q.messageController().signals.MESSAGE, function(y) {
						var x = ["chat", "instant_message", "media_item", "personalization", "presence", "votes", "friendship"];
						if (!_.contains(x, y.type)) {
							Spreecast.socketMethods.message(y);
							if ((h || spree.event_just_ended) && window.document.broadcast) {
								if (!spree.stopProcessingMessages) {
									window.document.broadcast.message(y)
								}
							}
						}
					});
					if (spree.isMobile()) {
						return
					}
					if (typeof(ChatBuilder) !== "undefined") {
						this.chatListener = new ChatBuilder(q);
						spree.spreecast.receiveDigestChats()
					}
					var k = q.chatController();
					if (spree.user.producer) {
						var i = function(y) {
								if (spree.spreecast.facecardContainer.isOpen()) {
									var x = spree.spreecast.facecardContainer.facecard.user;
									if ((x.id() === y.user().id()) || (x.id() === y.recipientId())) {
										spree.spreecast.facecardContainer.controls.chat.receiveEcmaChat(y)
									}
								} else {
									if (spree.spreecast.viewerRail) {
										spree.spreecast.viewerRail.showNotification();
										spree.spreecast.viewerRail.showChatNotification(y.user())
									}
								}
							};
						k.subscribe(k.signals.PRIVATE_CHAT, function(x) {
							i(x)
						});
						k.subscribe(k.signals.MODERATOR_CHAT, function(x) {
							i(x)
						})
					} else {
						var m = function(x) {
								if (spree.user.id == x.user().id() || spree.user.id == x.recipientId()) {
									spree.moderatorChat.receiveEcmaChat(x)
								}
							};
						k.subscribe(k.signals.PRIVATE_CHAT, function(x) {
							m(x)
						});
						k.subscribe(k.signals.MODERATOR_CHAT, function(x) {
							m(x)
						})
					}
					if (spree.user.producer) {
						k.subscribe(k.signals.PRODUCER_CHAT, function(x) {
							spree.producerChat.receiveEcmaChat(x)
						})
					}
					k.subscribe(k.signals.INSERT, function(y) {
						var x = h ? spree.liveViewerChat : spree.archiveViewerChat;
						if (x) {
							x.receiveEcmaChat(y.data)
						}
					});
					k.subscribe(k.signals.REMOVE, function(y) {
						var x = h ? spree.liveViewerChat : spree.archiveViewerChat;
						if (x) {
							x.removeEcmaChat(y.id)
						}
					});
					k.subscribe(k.signals.FORBIDDEN, function() {
						var x = h ? spree.liveViewerChat : spree.archiveViewerChat;
						x.notifyError()
					});
					if (spree.spreecast.viewerRail && spree.user.producer && spree.eventIsScheduledOrLive()) {
						spree.spreecast.viewerRail.openProducerRail()
					}
					var r = q.questionController();
					if (!spree.is_embed && !spree.isMobile()) {
						b.spreecast.ticker = new QuestionTicker(q);
						b.spreecast.screenQueue = new ScreenQueue(q)
					} else {
						if (spree.is_embed) {
							b.spreecast.questions = new Questions(q)
						}
					}
					var n = spree.spreecast.screenQueue,
						l = b.spreecast.questions,
						t = b.spreecast.ticker;
					r.subscribe(r.signals.INSERT, function(x) {
						if (spree.is_embed) {
							l.insert(x)
						} else {
							n.insert(x);
							t.updateMessage(n.questionCount())
						}
					});
					r.subscribe(r.signals.UPDATE, function(x) {
						if (spree.is_embed) {
							l.update(x)
						} else {
							n.update(x)
						}
					});
					r.subscribe(r.signals.REMOVE, function(x) {
						if (spree.is_embed) {
							l.remove(x)
						} else {
							n.remove(x);
							t.updateMessage(n.questionCount())
						}
					});
					r.subscribe(r.signals.ON_AIR, function(x) {
						if (spree.is_embed) {
							l.onAir(x)
						} else {
							t.onAir(x)
						}
					});
					r.subscribe(r.signals.OFF_AIR, function(x) {
						if (spree.is_embed) {
							l.offAir(x)
						} else {
							t.offAir(x)
						}
					});
					r.subscribe(r.signals.ALLOWED, function(x) {
						l.allowed(x)
					});
					q.subscribe(q.signals.DISPLAY_QUESTIONS, function(x) {
						spree.spreecast.producer.filterQuestions(x)
					});
					q.subscribe(q.signals.BROADCASTERS_ALLOWED, function(x) {
						spree.spreecast.producer.broadcastersAllowed(x)
					});
					q.subscribe(q.signals.QUESTIONS_ALLOWED, function(x) {
						spree.spreecast.producer.questionsAllowed(x)
					});
					if (!spree.is_embed && spree.eventIsScheduledOrLive()) {
						var s = q.voteController();
						s.subscribe(s.signals.UPDATE, function(x) {
							spree.spreecast.screenQueue.performScoreUpdates(x)
						})
					}
					if (!spree.event.ads_enabled || !spree.event.event_enabled) {
						spree.ad_finished = true
					}
					var w = function(x) {
							return spree.eventIsScheduledOrLive() && spree.spreecast.facecardContainer.facecard && x == spree.spreecast.facecardContainer.facecard.user.alt()
						};
					var v = q.producerController();
					v.subscribe(v.signals.QUESTIONS_ENABLED, function(x) {
						spree.spreecast.producer.questionsEnabled(x)
					});
					v.subscribe(v.signals.BROADCASTERS_ENABLED, function(x) {
						spree.spreecast.producer.broadcastersEnabled(x)
					});
					v.subscribe(v.signals.STREAM_QUALITY, function(x) {
						spree.streamQualities = x;
						if (spree.spreecast.facecardContainer.facecard) {
							var z = spree.spreecast.facecardContainer.facecard.user.alt();
							spree.spreecast.facecardContainer.updateQualityScore(spree.streamQualities[z])
						}
						if (h && spree.spreecast.viewerRail) {
							for (var y in spree.streamQualities) {
								spree.spreecast.viewerRail.updateQualityScore(spree.streamQualities[y])
							}
						}
					});
					q.subscribe(q.signals.EVENT_PARTICIPATION, function(x) {
						if (q.user().id() === x.user().id()) {
							return
						}
						if (x.user().producer() && !spree.event.producer_tab_enabled) {
							spree.event.producer_tab_enabled = true;
							$("#chat-type").show()
						}
						if (w(x.user().alt())) {
							spree.spreecast.facecardContainer.updatePreviewVisibility(x.user())
						}
					});
					spree.ecma.visibleUsersController = q.visibleUsersController();
					var p = null;
					if (spree.spreecast.viewerRail) {
						p = spree.spreecast.viewerRail
					}
					spree.ecma.visibleUsersController.subscribe(spree.ecma.visibleUsersController.signals.USER_INSERT, function(x) {
						u.insert(x);
						if (h && p) {
							p.insert(x)
						}
					});
					spree.ecma.visibleUsersController.subscribe(spree.ecma.visibleUsersController.signals.USER_MOVE, function(x) {
						u.move(x);
						if (w(x.user().alt())) {
							spree.spreecast.facecardContainer.update(x.user())
						}
						if (h && p) {
							p.move(x)
						}
					});
					spree.ecma.visibleUsersController.subscribe(spree.ecma.visibleUsersController.signals.USER_UPDATE, function(x) {
						u.update(x.user());
						if (w(x.user().alt())) {
							spree.spreecast.facecardContainer.update(x.user())
						}
						if (h && p) {
							p.update(x.user())
						}
					});
					spree.ecma.visibleUsersController.subscribe(spree.ecma.visibleUsersController.signals.USER_DELETE, function(x) {
						u.remove(x);
						if (h && p) {
							p.remove(x)
						}
					});
					spree.ecma.visibleUsersController.subscribe(spree.ecma.visibleUsersController.signals.USER_SET_LIST, function(x) {
						u.set(x);
						for (var y = 0; y < x.length; y++) {
							if (w(x[y].user().alt())) {
								spree.spreecast.facecardContainer.update(x[y].user())
							}
						}
						if (h && p) {
							p.set(x);
							for (var z in spree.streamQualities) {
								p.updateQualityScore(spree.streamQualities[z])
							}
						}
					});
					if (h) {
						spree.spreecast.updateViewerCount(b.serverResponse.digest.current_viewers_count)
					}
				}, h, false, f)
			} else {
				spree.ecma.userController = new UserController(spree.ecma.ecma)
			}
		})
	},
	resetAdCookie: function() {
		if (spree.event) {
			window.document.broadcast.resetAd("preroll" + spree.event.event_id)
		}
	},
	generateProfilePhotoAddress: function(b, d) {
		var c = {
			small: "30",
			medium: "70",
			large: "100",
			largest: "150",
			"default": "100"
		};
		var f = (d in c) ? c[d] : c["default"];
		var g;
		if (!b.hasBeenAuthenticated()) {
			g = "/profile_photos/tile_" + f + "x" + f + "/visitor.png"
		} else {
			if ((b.profilePhotoThumbUrl().indexOf("noprofile") > -1) || (b.profilePhotoThumbUrl().indexOf("nopic") > -1)) {
				g = "/profile_photos/tile_" + f + "x" + f + "/noprofile.png"
			} else {
				var a = b.alt();
				var e = Math.random() * 100000000000000000;
				g = "//spreecast-photos.s3.amazonaws.com/" + spree.scm_env + "/users/" + a + "/tile_" + f + "x" + f + "/" + a + "_photo.jpg?" + e
			}
		}
		return g
	},
	binarySearch: function(g, f, b) {
		var a = 0,
			e = g.length - 1,
			c, d;
		if (b == null) {
			b = function(i, h) {
				return i - h
			}
		}
		d = b(f, g[e]);
		if (d > 0) {
			return g.length
		}
		while (a <= e) {
			c = Math.floor((a + e) / 2);
			d = b(g[c], f);
			if (d < 0) {
				a = c + 1;
				continue
			}
			if (d > 0) {
				e = c - 1;
				continue
			}
			return c
		}
		return a
	},
	blockWithConfirmEmail: function() {
		new GeneralConfirm({
			question: "Please check your email and confirm your Spreecast account",
			confirmText: "Ok, I'm checking my email",
			text: 'Open the email in your inbox called "Please confirm your Spreecast account." Click the link to confirm. <a href=\'/users/' + spree.user.user_id + "/email_addresses/" + spree.user.confirmEmailId + "/resend' data-method='post'>Resend it to me.</a>",
			dialogClass: "block"
		})
	},
	blockWithTakeCameraRequestsDisabled: function() {
		new GeneralConfirm({
			question: "The producers are not taking requests to join on camera at this time.",
			confirmText: "OK",
			text: "The producers may take requests again later in the spreecast.",
			dialogClass: "block"
		})
	},
	showThrottledNotice: function(a, c) {
		if (!spree.user.producer) {
			return
		}
		if (a != "questions" && a != "camera") {
			return
		}
		if (spree.spreecast.request_maxed_message_shown[a] && !c) {
			return
		}
		spree.spreecast.request_maxed_message_shown[a] = true;
		var b = [];
		if (a == "questions") {
			b = ["You must free up space in the question queue.", "Click Bring Question On Air, Star or Delete."]
		} else {
			b = ["You have too many outstanding broadcast requests.", "Star approved users, or disable their cameras to clear space."]
		}
		new GeneralConfirm({
			question: 'You\'re <span class="red">maxed!</span>',
			confirmText: "OK",
			text: "<p>" + b[0] + "</p><p>" + b[1] + "</p>",
			dialogClass: "block"
		})
	},
	genericBlocker: function(a) {
		new GeneralConfirm({
			question: "Oops!",
			confirmText: "OK",
			text: a,
			dialogClass: "block"
		})
	},
	blockWithTakeQuestionsCommentsDisabled: function() {
		new GeneralConfirm({
			question: "Want to ask a question or make a comment?",
			confirmText: "OK",
			text: "We're not fielding them this way right now. Please join us in the chat room.",
			dialogClass: "block"
		})
	},
	cancelEmbed: function(a) {
		if ((a.keyCode ? a.keyCode : a.which) == 27) {
			$("#embed-container").hide()
		}
	},
	closeAuthPopin: function() {
		if (!spree.authPopin) {
			spree.authPopin = "auth"
		}
		$("#" + spree.authPopin + "_popin").dialog("close")
	},
	closeModal: function() {},
	createModal: function(c, f, e, a, g, d) {
		e = e ? e : "";
		f = (f ? f : 578) + "px";
		var b = this;
		$("#popin_content").html(c);
		$("#popin").dialog({
			id: "keith",
			open: function() {
				setTimeout(function() {
					$(document).off("mousedown.dialog-overlay", "mouseup.dialog-overlay")
				}, 100)
			},
			close: function() {
				b.closeModal()
			},
			modal: !d,
			position: (a) ? a : ["center"],
			draggable: (g) ? false : true,
			resizable: false,
			width: f,
			height: "auto",
			dialogClass: e,
			closeOnEscape: !e.match(/no-escape/)
		});
		$(".ui-dialog-title").hide();
		$(".ui-dialog :button").blur()
	},
	createGenericModal: function(b) {
		var d = "<header class='modal-header'><h2>Spreecast Message</h2></header>";
		var a = "<div class='general-modal-body'>" + b + "</div>";
		var c = "<footer class='modal-footer'></footer>";
		spree.createModal(d + a + c)
	},
	createTextModal: function(a) {
		spree.createGenericModal("<p class='center'>" + a + "</p>")
	},
	enterKey: function(a, c, b) {
		$(a).on("keypress", function(d) {
			if (d.keyCode == 13) {
				c(d)
			}
		});
		if (b) {
			$(a).on("keydown", function(d) {
				if (d.keyCode == 27) {
					b(d)
				}
			})
		}
	},
	eventResize: function() {
		var a = $("body").width(),
			b = $("#main-content").width(),
			c = a - b
	},
	flashTitleBar: function(a) {
		var b = this;
		this.showBaseTitle = true;
		this.titleInterval = setInterval(function() {
			$("title").text(b.showBaseTitle ? b.baseTitle : [a, b.baseTitle].join(" - "));
			b.showBaseTitle = !b.showBaseTitle
		}, 700)
	},
	flashTitleBarOff: function() {
		clearInterval(this.titleInterval);
		delete this.titleInterval;
		$("title").text(this.baseTitle)
	},
	addFriend: function(f) {
		if (!spree.user || !spree.user.has_been_authenticated) {
			var l = "friend";
			var d = {};
			d.action = "friends";
			return spree.loginMgr.showSignup(l, true, d, {
				signUpText: "Sign up or log in to add users as friends"
			})
		}
		var g = '[data-button-id="' + f + '"]';
		var p = $(g);
		var o = p.attr("data-friend-target-id");
		var m = p.attr("data-friend-state");
		var k = p.attr("data-clicked-state");
		var c = p.parents(".friend-request").find(".friend-status-wrapper");
		var i = "";
		if (p.length && !p.hasClass("disabled")) {
			p.addClass("disabled");
			var e = [];
			var j = "";
			var n = "";
			var h = "";
			if (p.hasClass("profile-social")) {
				e.push("profile-social");
				i = "profile_"
			} else {
				if (p.hasClass("facecard-social")) {
					e.push("facecard-social");
					i = "facecard_"
				}
			}
			var b = "/friendships";
			var a = "POST";
			$.ajax({
				url: b,
				type: a,
				data: {
					user_id: o,
					state: m
				},
				success: function(v, q, w) {
					var s = v.friendship_id;
					if (k === "request_friend") {
						e.push("friend-req-sent-btn");
						i = i + "retract_friend_" + s;
						j = "retract";
						n = "add_friend";
						h = ""
					} else {
						if (k === "friend_blocked") {
							e.push("friend-block-btn");
							i = i + "unblock_friend_" + s;
							j = "unblock";
							n = "add_friend";
							h = "has been blocked."
						} else {
							return
						}
					}
					var r = spree.hbTemplate("friend-action-button", {
						classes: e.join(" "),
						friendId: s,
						targetId: o,
						friendButtonId: i,
						friendState: j,
						clickedState: n,
						onClick: "spree.handleFriendAction('" + i + "');"
					});
					var u = p.parent(".friend-action");
					p.remove();
					u.append(r);
					var t = spree.hbTemplate("friend-status", {
						classes: "friend-status",
						friendId: s,
						friendState: j,
						hasText: h !== "",
						text: h
					});
					c.html(t)
				},
				complete: function() {
					p.removeClass("disabled")
				}
			})
		}
	},
	handleFriendAction: function(e) {
		var g = '[data-button-id="' + e + '"]';
		var p = $(g);
		var l = p.attr("data-friend-state");
		var k = p.attr("data-clicked-state");
		var f = p.attr("data-friend-id");
		var o = p.attr("data-friend-target-id");
		var c = p.parents(".friend-request").find(".friend-status-wrapper");
		var i = "";
		var d = [];
		if (p.hasClass("profile-social")) {
			d.push("profile-social");
			i = "profile_"
		} else {
			if (p.hasClass("facecard-social")) {
				d.push("facecard-social");
				i = "facecard_"
			}
		}
		if (p.length && !p.hasClass("disabled")) {
			p.addClass("disabled");
			var j = "";
			var n = "";
			var h = "";
			var m = "";
			var b = "/friendships/" + f + "/" + l;
			var a = "PUT";
			$.ajax({
				url: b,
				type: a,
				success: function(v, r, w) {
					if (k === "add_friend") {
						d.push("add-friend-btn");
						i = i + "add_friend_" + o;
						j = "requested";
						n = "request_friend";
						h = "";
						m = "spree.addFriend('" + i + "');"
					} else {
						if (k === "friend_accept") {
							d.push("friend-accept-btn");
							i = i + "unfriend_friend_" + f;
							j = "unfriend";
							n = "add_friend";
							h = "and you are now friends.";
							m = "spree.handleFriendAction('" + i + "');"
						} else {
							if (k === "request_block") {
								d.push("block-friend-btn");
								i = i + "block_friend_" + o;
								j = "blocked";
								n = "friend_blocked";
								h = "Friend request ignored.";
								m = "spree.addFriend('" + i + "');"
							} else {
								return
							}
						}
					}
					if (p.hasClass("facecard-social")) {
						var q = p.parents(".facecard-wrapper").find(".private-message");
						if (k === "friend_accept") {
							q.removeClass("disabled")
						} else {
							if (!q.hasClass("disabled")) {
								q.addClass("disabled has-tooltip")
							}
						}
					}
					var s = spree.hbTemplate("friend-action-button", {
						classes: d.join(" "),
						friendId: f,
						targetId: o,
						friendButtonId: i,
						friendState: j,
						clickedState: n,
						onClick: m
					});
					var u = p.parent(".friend-action");
					u.html(s);
					var t = spree.hbTemplate("friend-status", {
						classes: "friend-status",
						friendId: f,
						friendState: j,
						hasText: h !== "",
						text: h
					});
					c.html(t)
				},
				complete: function() {
					p.removeClass("disabled")
				}
			})
		}
	},
	clickFollowItem: function(b) {
		if (spree.bucket_manager.serviceEnabled("mixpanel")) {
			var a = $('[data-button-id="' + b + '"]');
			if ((!$("#follow-prompt-banner").hasClass("hidden") && a.parents("#event-header-user-meta").length > 0) || a.parents("#embed-follow-prompt").length > 0) {
				mixpanel.track("follow", {
					action: "trigger",
					"page type": spree.mixpanelPageType,
					number: 1
				})
			}
		}
		this.toggleFollowItem(b, false, 0)
	},
	toggleFollowItem: function(g, l, b) {
		b = b || 0;
		var h = '[data-button-id="' + g + '"]',
			o = $(h),
			n = o.attr("data-item");
		if (!spree.user || !spree.user.has_been_authenticated) {
			var k = "follow";
			var f = "Sign up or log in to follow users";
			var j = {};
			if (n === "Event") {
				j.action = "events";
				j.rsvp = 1;
				k = "rsvp";
				f = "Sign up or log in to set a reminder"
			} else {
				j.action = "profile"
			}
			return spree.loginMgr.showSignup(k, true, j, {
				signUpText: f
			})
		}
		if (o.length && !o.hasClass("disabled")) {
			o.addClass("disabled");
			var c = "/following",
				a = "POST",
				i = o.attr("data-following") == "true",
				e = parseInt($(".number-of-followers").text().split(",").join("")) || parseInt($("#display-recommended-users").attr("data-follow-count")) || 0,
				m = parseInt($(".number-of-following").text()),
				d = o.attr("data-id");
			if (i && !l) {
				c = "/unfollow"
			}
			$.ajax({
				url: c,
				type: a,
				data: {
					item: n,
					id: d,
					source: b
				},
				success: function(t, q, u) {
					spree.toggleFollowButton(h, !i || l);
					if (t.error || (n != "Event" && n != "User")) {
						return
					}
					if (i && !l) {
						if (n == "Event") {
							spree.spreecast.cancelRsvp()
						} else {
							if (n == "User") {
								var r = spree.user.following.indexOf(o.attr("data-item-id"));
								spree.user.following.splice(r, 1)
							}
						}
						if (spree.profile && spree.profile.user_id === spree.user.user_id) {
							m--
						} else {
							if (spree.profile && spree.profile.user_id != d) {} else {
								e--
							}
						}
					} else {
						if (n == "Event") {
							spree.spreecast.rsvp()
						} else {
							if (n == "User") {
								spree.user.following.push(parseInt(o.attr("data-item-id")))
							}
						}
						if (spree.profile && spree.profile.user_id === spree.user.user_id) {
							m++
						} else {
							if (spree.profile && spree.profile.user_id != d) {} else {
								e++
							}
						}
					}
					var s = Math.max(0, e);
					$(".number-of-followers").html(s);
					var p = Math.max(0, m);
					$(".number-of-following").html(p);
					$("#display-recommended-users").attr("data-follow-count", s)
				},
				complete: function() {
					o.removeClass("disabled")
				}
			})
		}
	},
	toggleFollowButton: function(a, c) {
		var b = $(a);
		if (c) {
			b.addClass("following").attr("data-following", "true").text(b.attr("data-off-text"))
		} else {
			b.removeClass("following").attr("data-following", "false").text(b.attr("data-on-text"))
		}
	},
	formErrors: function(d, a) {
		if (d.responseText) {
			d = JSON.parse(d.responseText)
		}
		$("form .error").empty().removeClass("error");
		for (var c in d) {
			var b = c.replace(/_/g, " "),
				e = d[c][0];
			if (c == "about") {
				b = "Description"
			}
			if (c == "top") {
				b = "";
				e = d[c]
			}
			if (c == "terms") {
				b = ""
			}
			if (c == "reset") {
				b = "";
				e = "Invalid email address or no matching password found"
			}
			$("#" + c + "_error").addClass("error").html(spree.toTitleCase(b + " " + e))
		}
	},
	hbTemplate: function(e, b) {
		var a = $("#hb-" + e);
		b = (typeof(b) !== "undefined") ? b : {};
		if (a != null) {
			var d = a.html();
			if (d != null) {
				var c = Handlebars.compile(d);
				return $(c(b))
			}
		} else {
			return null
		}
	},
	logFacebook: function(b, a) {
		$.ajax({
			url: "/fbinvite",
			type: "POST",
			data: {
				user_id: spree.user.alt,
				invitees: b,
				source: a
			}
		})
	},
	nowBroadcasting: function() {
		return (this.event && this.event.now_broadcasting)
	},
	QUESTIONS: {
		ALL: 0,
		STARRED: 1,
		NONE: 2
	},
	decodeBase62: function(f) {
		var e, h, g;
		for (e = h = (f === (/\W|_|^$/.test(f += "") || f)) - 1; g = f.charCodeAt(h++);) {
			e = e * 62 + g - [, 48, 29, 87][g >> 5]
		}
		return e
	},
	appendNodeAfter: function(b, a) {
		if (b.nextSibling) {
			b.parentNode.insertBefore(a, b.nextSibling)
		} else {
			b.parentNode.appendChild(a)
		}
	},
	replaceNode: function(a, b) {
		this.appendNodeAfter(a, b);
		$(a).remove()
	},
	depthFirstTraverse: function(b) {
		var a = [b];
		for (var c = 0; c < b.children.length; c++) {
			a = a.concat(this.depthFirstTraverse(b.children[c]))
		}
		return a
	},
	stringHashCode: function(d) {
		var b = 0;
		if (d.length == 0) {
			return b
		}
		for (var a = 0; a < d.length; a++) {
			var e = d.charCodeAt(a);
			b = ((b << 5) - b) + e;
			b = b & b
		}
		return b
	},
	registerListeners: function(c, b) {
		this.registeredListeners = b || ["chat", "event", "flash", "log", "media", "snapshot", "user", "video-control"];
		var a = this;
		$(document).on("listener:loaded", function(f, d) {
			if (a.registeredListeners.indexOf(d) == -1) {
				return
			}
			a.registeredListeners = _.without(a.registeredListeners, d);
			if (a.registeredListeners.length == 0) {
				new Spreecast(c)
			}
		})
	},
	signOut: function() {
		if (!$.cookie("noannoy")) {
			if (spree.user && spree.user.fb_id && (typeof FB != "undefined") && FB.logout && FB.getAuthResponse()) {
				return FB.logout(function(a) {
					window.location.href = "/member/logout"
				})
			}
		}
		window.location.href = "/member/logout"
	},
	hasSpreecastUserCookie: function() {
		var a = $.cookie("coollive_user");
		return !!a
	},
	shareId: function(a) {
		if (!this.share_ids) {
			this.share_ids = {}
		}
		if (!this.share_ids[a]) {
			this.share_ids[a] = new Date().getTime().toString(16) + Math.floor(Math.random() * 65536).toString(16) + Math.floor(Math.random() * 65536).toString(16)
		}
		return this.share_ids[a]
	},
	registerShare: function(a, b, d) {
		var e = this.shareId(b);
		var c = {
			uuid: e,
			shared_url: a,
			social_network: b,
			state: d
		};
		$.ajax({
			type: "POST",
			url: "/shares/register",
			data: c
		})
	},
	logHTMLPlaybackStart: function(a) {
		spree.ecma.eventController.loggingController().logMessage({
			operation_name: "client.view.start",
			user_id: spree.ecma.eventController.user().alt(),
			spreecast_id: spree.ecma.eventController.event().id(),
			source_host_id: "client.mobile"
		})
	},
	showHeader: function() {
		var e = this;
		var d = this.hasSpreecastUserCookie() ? spree.user : null;
		if (d && d.admin) {
			d.content_mod = true;
			$("body").addClass("admin")
		}
		if (!spree.error) {
			var b;
			if (d) {
				b = {
					id: d.user_id,
					name: d.name,
					profile_thumb_url: d.profile_photo_medium_url,
					admin: d.admin,
					content_mod: d.content_mod,
					thumbnailClass: "small-circle-avatar"
				};
				if (!spree.isMobile()) {
					var a = spree.hbTemplate("friend-notification-nav", {
						user: b
					});
					$("#friend-notification-nav-wrapper").html(a)
				}
			}
			var c = spree.hbTemplate("site-header", {
				user: b,
				is_mobile: (spree.isMobile() || spree.isTablet())
			});
			$("#nav_parent").html(c);
			c.find("#header-signout").click(function() {
				spree.signOut()
			});
			e.$navMenu = $("#nav-menu");
			$(document).on("click", "#nav-menu", function() {
				if (!e.$navMenu.hasClass("selected")) {
					$(window).on("click", function(f) {
						if (e.$navMenu.hasClass("selected")) {
							if ($(f.target).parents("#nav-menu").length <= 0) {
								$(this).off(f);
								e.$navMenu.toggleClass("selected")
							}
						}
					})
				}
				$(this).toggleClass("selected")
			});
			$(document).on("touchmove", "#header-signout", function(f) {
				e.signOutDragging = true
			});
			$(document).on("touchstart", "#header-signout", function(f) {
				e.signOutDragging = false
			});
			$(document).on("touchend", "#header-signout", function() {
				if (e.signOutDragging) {
					return
				}
				e.signOutDragging = false;
				spree.signOut()
			})
		}
		if ($("body").hasClass("medium")) {
			$("#event_stage div.header .wrapper").append($("<div>", {
				id: "medium-embed-menu",
				title: "View in larger window to interact"
			}).text(""))
		}
	},
	showMore: function(b) {
		var a = this;
		_.each(b, function(e, d) {
			a[d] = e
		});
		var c = parseInt(a.$el.attr("data-page")) + 1;
		this.data.page = c;
		$.ajax({
			url: a.url,
			data: a.data,
			dataType: "html",
			success: function(d) {
				if (a.success) {
					a.success(d)
				} else {
					a.$el.parents(".section").find("table tbody").append($(d).find("tr"))
				}
				a.$el.attr("data-page", c);
				if (c >= parseInt(a.$el.attr("data-total-pages"))) {
					a.$el.remove()
				}
			}
		})
	},
	serialize: function(a) {
		return _.map(a, function(b) {
			return b.outerHTML
		}).join(" ")
	},
	stringifyTime: function(d, b) {
		var d = (parseInt(d) / 1000),
			g = d % 1,
			f, c, e, a;
		d -= g;
		f = d % 60;
		d = (d - f) / 60;
		c = d % 60;
		d = (d - c) / 60;
		e = d % 60;
		a = "" + ((e >= 1) ? e + "h " : "") + ((c >= 1) ? c + "m " : "");
		if (e < 1) {
			a += f + (b ? "." + (g.toString().split(".")[1] || "0").slice(0, b) : "") + "s"
		}
		return a
	},
	toTitleCase: function(a) {
		return a.replace(/\w\S*/g, function(b) {
			return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
		}).trim()
	},
	unregisterListeners: function() {
		$(document).off("listener:loaded")
	},
	validateEmail: function(a) {
		return !!a.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
	},
	setBodyClass: function() {
		if (!this.event) {
			return
		}
		if (spree.user.owner) {
			$("body").addClass("event_owner")
		}
		if (this.eventIsFinished()) {
			$("body").removeClass("event_live event_prestart pending").addClass(this.event.status == 2 ? "event_archive" : "event_extended")
		} else {
			if (this.event.status == 1) {
				$("body").removeClass("event_prestart event_archive event_extended pending").addClass("event_live")
			} else {
				$("body").removeClass("event_archive event_extended event_prestart").addClass("event_prestart")
			}
		}
	},
	saveEmbedShareURL: function() {
		$.ajax({
			type: "PUT",
			dataType: "json",
			data: {
				id: spree.event.event_id,
				embed_share_url: $("#embed_share_url").val()
			},
			url: "/events/" + spree.event.event_id + "/update_embed_share_url"
		})
	},
	shrinkToFit: function() {
		$(".shrink_to_fit").shrinkToFit()
	}
});
Spree.VISIBILITY = {
	0: "PUBLIC",
	1: "PRIVATE",
	2: "UNLISTED"
};
Spree.shouldBlockUser = function() {
	return ((!spree.user || !spree.user.has_been_authenticated) || spree.user.needs_to_confirm_email)
};
Spree.blockUser = function(b, a) {
	if (!spree.user || !spree.user.has_been_authenticated) {
		spree.loginMgr.showSignup(b, true, null, {
			signUpText: a
		})
	} else {
		if (spree.user.needs_to_confirm_email) {
			spree.blockWithConfirmEmail()
		}
	}
};
var EventManager = Class.extend({
	init: function() {
		this.type = "create";
		this.formSelector = "form#event_form";
		this.bindEvents()
	},
	bindEvents: function() {
		var a = this;
		$(document).on("change", "input[name='event[starts_now]']", function(b) {
			$("#broadcast_schedule").toggleClass("goodbye")
		});
		$(document).on("change", "#event_visibility", function(b) {
			$this = $(this);
			if ($this.val() == "0") {
				$(".select-category").show()
			} else {
				$(".select-category").hide()
			}
			$ppv = $("#ppv");
			if ($this.val() == "1") {
				if ($ppv.find("input[name=pricing]:checked").val() === "ppv") {
					$("#event_price").val(null);
					$ppv.find("#event_pricing_free").prop("checked", true).change()
				}
				$ppv.hide();
				a.originalUpsellText = $(".upsell-text").html();
				$(".upsell-text").html('If you are looking to have a private video call with 4 or less people and do not need it to be recorded, then check out <a href="https://room.co" target="_blank">Room</a>.')
			} else {
				$ppv.show();
				$(".upsell-text").html(a.originalUpsellText)
			}
		});
		$(document).on("change", "input[name=pricing]", function(b) {
			if ($(this).val() === "free") {
				$("#event_price").val(null)
			}
			$(".set-price").toggleClass("hide");
			if ($(this).val() === "ppv") {
				$("#edit_embed_medium_preload").hide()
			} else {
				$("#edit_embed_medium_preload").show()
			}
		})
	},
	bindForm: function(c) {
		var b = this,
			a = $(this.formSelector);
		$("input#event_name").focus();
		a.off("ajax:error", "ajax:success");
		a.on({
			submit: function(d) {
				c.find("input[type=submit]").attr("disabled", true);
				if (spree.bucket_manager.serviceEnabled("mixpanel")) {
					mixpanel.track("event_create", {
						action: "created",
						"page type": spree.mixpanelPageType
					})
				}
			},
			"ajax:error": function(e, g, j, i) {
				c.find("input[type=submit]").removeAttr("disabled");
				var d = (g && g.status == 200 ? "Success" : "Failure"),
					h;
				try {
					h = JSON.parse(g.responseText)
				} catch (f) {
					console.log("Error parsing JSON", f)
				}
				b[b.type + d](h)
			},
			"ajax:success": function(d, f, g, e) {
				c.hide();
				spree.eventId = f.event_id;
				b[b.type + "Success"](f)
			}
		})
	},
	createFailure: function(a) {
		if (_.keys(a).join() == "channel") {
			window.begin_broadcast = true;
			spree.loginMgr.showSignup(undefined)
		} else {
			spree.formErrors(a);
			this.validateEmails()
		}
		spree.analytics.log({
			category: "event_create",
			action: "done_" + a.visibility,
			label: "from_error",
			value: 0
		})
	},
	createSuccess: function(a) {
		var b = "error";
		if (a.visibility == "private") {
			b = "invite"
		} else {
			if (a.from == "update") {
				b = "details"
			} else {
				if (a.from == "create") {
					b = "main"
				}
			}
		}
		spree.analytics.log({
			category: "event_create",
			action: "done_" + a.visibility,
			label: "from_" + b,
			value: 0
		});
		window.location = "/events/" + a.event_id
	},
	editFailure: function(a) {
		spree.formErrors(a);
		this.validateEmails()
	},
	editSuccess: function(a) {
		if (a.reload) {
			window.location = "/events/" + a.event_id
		} else {
			$("#popin").dialog("close");
			$("#" + this.partial + "_to_replace").html(a)
		}
	},
	showEmailInvites: function(b, e) {
		if (Spree.shouldBlockUser()) {
			Spree.blockUser("email share");
			return
		}
		var a = this;
		this.inviteType = b;
		this.inviteId = e;
		var c = this.inviteType == "event" ? "Invite friends to this Spreecast" : ("Promote this " + this.inviteType);
		var d = this.inviteType == "event" ? "be part of this Spreecast." : ("this " + this.inviteType + "'s page.");
		spree.modalMgr.create("email-share", function(f) {
			f.find("input[type=submit]").click(function() {
				var g = spree.inviteMgr.getEmailsInTextarea(f.find("textarea"));
				a.checkEmailInvites(g)
			})
		}, null, {
			header_text: c,
			copy: d
		})
	},
	checkEmailInvites: function(c) {
		$("#email_shares_error").hide();
		if (c.length) {
			var b = [];
			$.each(c, function(e, d) {
				d = d.trim();
				if (!spree.validateEmail(d)) {
					b.push(d)
				}
			});
			if (b.length) {
				var a = "Please correct the address" + (b.length > 1 ? "es" : "") + ": " + b.join(", ");
				$("#email_shares_error").addClass("error").html(a)
			} else {
				this.sendEmailInvites(c)
			}
		} else {
			$("#email_shares_error").show().html("Please enter a valid email.")
		}
	},
	sendEmailInvites: function(b) {
		var c = this.inviteType == "event" ? spree.event.event_id : this.inviteId;
		var a = this.inviteType == "event" ? "/invitations" : ("/" + this.inviteType + "s/" + c + "/send_invitations");
		if (b.length) {
			$.ajax({
				type: "POST",
				url: a,
				data: {
					addresses: b,
					id: c
				},
				success: function(e) {
					var d = $("#email-share");
					d.find(".modal-body").html("<h3>Invitations Sent!</h3><p>Invitations sent to " + b.length + " email address" + (b.length == 1 ? "." : "es."));
					setTimeout(function() {
						d.modal("hide")
					}, 2000)
				}
			})
		} else {
			spree.closeModal()
		}
	},
	validateEmails: function() {
		if ($("#event_email_list").length > 0) {
			var a = $("#event_email_list").val().trim();
			if (a.length > 0) {
				$("#email_shares_error").append($.map(a.split(/[,\s]+/), function(c, b) {
					if (!spree.validateEmail(c.trim())) {
						return c.trim()
					}
				}).join(", "))
			}
		}
	}
});
$(document).one("spree:init", function() {
	if (spree.bucket_manager.serviceEnabled("mixpanel")) {
		mixpanel.track_links(".promo-unit a", "promo unit", function(a) {
			return {
				position: $(a).parents("[data-rotate]").data("rotate"),
				"page type": "home"
			}
		});
		mixpanel.track_links("#upcoming-guide a", "guide", function(a) {
			return {
				position: $(a).parents("[data-position]").data("position"),
				"page type": "home"
			}
		});
		mixpanel.track_links(".upcoming-all", "live & upcoming text", {
			"page type": "home"
		});
		mixpanel.track_links(".featured-all", "popular & trending text", {
			"page type": "home"
		});
		mixpanel.track_links(".recommended-users a", "recommended users", function(a) {
			return {
				position: $(a).parents("[data-position]").data("position"),
				"page type": "home"
			}
		});
		mixpanel.track_links(".popular-home a", "popular & trending", function(a) {
			return {
				position: $(a).parents("[data-position]").data("position"),
				"page type": "home"
			}
		});
		mixpanel.track_links(".recommended-clips a", "recommended clips", function(a) {
			return {
				position: $(a).parents("[data-position]").data("position"),
				"page type": "home"
			}
		});
		mixpanel.track_links(".event-previews a", "popular & trending", function(a) {
			return {
				position: $(a).parents("[data-position]").data("position"),
				"page type": "home"
			}
		});
		mixpanel.track_links(".home-show-more", "show more", {
			"page type": "home"
		})
	}
});
$(document).on("click", "#producer-nav", function(a) {
	a.preventDefault();
	spree.pageController.toggleProducerControls()
});
$(document).on("click", "#watch-nav", function(a) {
	a.preventDefault();
	spree.pageController.toggleWatchMenu()
});
$(document).on("click", ".toggle-content", function(f) {
	var c = $(this);
	var g = c.parent();
	var d = g[0].childNodes[0];
	if (c.attr("data-state") === "more") {
		c.detach();
		c.attr("data-state", "less");
		g.html(g.siblings(".full-description").html());
		g.append(c)
	} else {
		var a = g.attr("data-shortened-description");
		if (typeof a !== typeof undefined && a !== false) {
			g.html(g.attr("data-shortened-description"))
		} else {
			var b = c.data("lines");
			c.remove();
			g.multiLineToggle({
				row: b
			});
			g.attr("data-shortened-description", g.html())
		}
	}
});
$(document).on("click", "[data-registration-required=true]", function(b) {
	var a = $(b.target).data().registrationRequiredReason;
	if (!$(this).hasClass("following_button") && Spree.shouldBlockUser()) {
		Spree.blockUser(a)
	}
});
$(document).on("spree:loaded spree:unavailable", function() {
	_gaq.push(["_setCustomVar", 1, "authenticated", !! (spree && spree.user && spree.user.has_been_authenticated), 2]);
	spree.showHeader();
	$(document).trigger("spree:needs-email");
	var a = $("#flash_container");
	if ((a).is(":visible")) {
		a.delay(3000).slideUp("slow")
	}
	spree.shrinkToFit();
	$("ul.submenu.invitations li .main").on("click", function() {
		window.location.href = "/events/" + $(this).attr("data-event-id")
	});
	if (spree.user && (spree.user.producer || (spree.user.onAir && spree.user.onAir()))) {
		$(".subhead .links a").attr("target", "_new")
	}
	$(".section[data-section=current]").on("click", function() {
		window.location.href = "http://www.spreecast.com/about/election"
	});
	$(document).on("fb:init", function() {
		var c = spree.hasSpreecastUserCookie() ? spree.user : null;
		FB.getLoginStatus(function(e) {
			if (e.status == "connected") {
				if (spree.event) {
					var d = UrlUtils.getParams().fb_req;
					if (d) {
						FB.api(d, "delete", function() {
							console.log("deleted FB request ", d)
						})
					}
				}
			}
		})
	});
	$(document).on("focus, click", "textarea#popin_embed_code", function() {
		$(this).select()
	});
	$(document).on("change", "input[name=popin_embed_size]", function() {
		$("textarea#popin_embed_code").val($(this).attr("data-embed-code"))
	});
	$(".subhead .invite").on("click", function() {
		var d = {
			category: "invite_click",
			label: "",
			value: 0
		};
		if (!spree.user || !spree.user.has_been_authenticated) {
			spree.loginMgr.showSignup(undefined, true)
		} else {
			if (spree.user.needs_to_confirm_email) {
				spree.blockWithConfirmEmail();
				spree.analytics.log(_.extend(d, {
					action: "email_block"
				}))
			} else {
				var c = $(this).attr("data-experiment-3");
				spree.analytics.log(_.extend(d, {
					action: "show_invite",
					variation: c
				}));
				if (spree.user && (spree.user.onAir && spree.user.onAir() || spree.user.producer)) {
					return window.open("/invite")
				}
				window.location.href = "/invite"
			}
		}
	});
	$(document).on("change", "select[data-field]", function() {
		var c = $("body .refreshable-content"),
			e = {
				filter: {
					get: true
				}
			},
			d = function() {
				if ($("body").hasClass("invitations_index")) {
					return "/invitations"
				}
				if ($("body").hasClass("events_upcoming")) {
					return "/upcoming"
				}
				if ($("body").hasClass("events_history")) {
					return "/history"
				}
			}();
		_.each($(this).parent().children("select[data-field]"), function(f) {
			if ($(f).selectmenu("value").length) {
				e.filter[$(f).attr("data-field")] = $(f).selectmenu("value")
			}
		});
		if (d) {
			$.ajax({
				url: d,
				type: "GET",
				data: e,
				success: function(f) {
					c.replaceWith(f)
				},
				error: function() {
					c.html($("<i>").text("No matching records found"))
				}
			})
		}
	});
	$(document).on("click", "ul.invitations li .dismiss", function(d) {
		d.preventDefault();
		var c = $(this).parents("ul.invitations"),
			g = $(this).attr("data-invitation-id"),
			f = c.find("li[data-invitation-id=" + g + "]");
		f.remove();
		if (c.find("li").length == 0) {
			$(".pending-invitations").hide()
		}
		$.ajax({
			type: "PUT",
			url: "/invitations/" + g + "/dismiss"
		})
	});
	$(".auto_tab_link").on("click", function(d) {
		d.preventDefault();
		var c = $(this).attr("data-url");
		spree.event ? window.open(c) : window.location = c
	});
	$(".rapper").on("click", ".spreecast_now", function(f) {
		var d = $(this);
		if (!(spree.user && spree.user.can_create_spreecast)) {
            spree.modalMgr.create("live-contact", function() {
                $("#contact-live-form").submit(function(g) {
                    g.preventDefault();
                    $.ajax({
                        url: "/user/events/create",
                        type: "POST",
                        data: {
                            title: $("#title-contact").val(),
                            pic_name: $("#pic_name").val(),
                            category: $("#category-contact").val(),
                            starttime: $("#start-time-contact").val(),
                            endtime: $("#end-time-contact").val(),
                            privacy: $('input[name="privacy"]:checked').val(),
                            desc: $("#desc-contact").val()
                        },
                        success: function(ret) {
                            if(ret.ret) {
                                window.location.href = "/users/live/"+ret.pid;
                            }else {
                                spree.modalMgr.showNext("live-thank-you", "live-contact")
                            }
                        },
                        error: function(i, e, h) {
                            $("#top_error").text(JSON.parse(i.responseText).response)
                        }
                    })
                })
            }, null, {
                header: "发布一个直播预告",
                bodyText: "我要开始直播啦! 与朋友们一起分享."
            })

            /*
			spree.modalMgr.create("demo-contact", function() {
				$("#contact-demo-form").submit(function(g) {
					g.preventDefault();
					$.ajax({
						url: "/users/demo",
						type: "POST",
						data: {
							full_name: $("#full-name-contact").val(),
							company: $("#company-contact").val(),
							email: $("#email-contact").val(),
							phone: $("#phone-contact").val(),
							website: $("#website-contact").val(),
							twitter: $("#twitter-contact").val(),
							info: $("#info-contact").val()
						},
						success: function() {
							spree.modalMgr.showNext("demo-thank-you", "demo-contact")
						},
						error: function(i, e, h) {
							$("#top_error").text(JSON.parse(i.responseText).response)
						}
					})
				})
			}, null, {
				header: "试试酷播?",
				bodyText: "尝试一下，我们会告诉你直播是如此的简单。"
			})
           */
		} else {
			if (spree.user.needs_to_confirm_email) {
				spree.blockWithConfirmEmail();
				spree.analytics.log({
					category: "event_create",
					action: "email_block",
					label: "",
					value: 0
				})
			} else {
				d.attr("disabled", true);
				var c = spree.modalMgr.create("create-spreecast", function(e) {
					var g = new PhotoUploader({
						type: "event",
						ratio: "4:3",
						$button: $("#logo-upload-button"),
						$image: $("#logo-preview"),
						$delete: $("#logo-delete"),
						$progress: $("#logo-progress"),
						$input: $("#image_url")
					});
					$("#date_picker").datepicker({
						minDate: 0,
						maxDate: 90
					});
					_.each({
						channel: 366,
						visibility: 366,
						start_time: 85,
						time_zone: 178,
						category: 366
					}, function(h, i) {
						$("#event_" + i).selectmenu({
							style: "dropdown",
							width: h
						})
					});
					spree.eventMgr.bindForm(e);
					spree.analytics.log({
						category: "event_create",
						action: "main_dialog",
						label: "",
						value: 0
					})
				}, "/events/new", {
					noEscape: false,
					submitId: "spreecastcreate_formdone"
				});
				c.on("hidden", function() {
					d.attr("disabled", false)
				})
			}
		}
	});
	$(".rapper").on("click", ".request-demo-btn", function(c) {
		if (spree.bucket_manager.serviceEnabled("mixpanel")) {
			mixpanel.track("demo", {
				action: "request modal",
				"page type": spree.mixpanelPageType
			})
		}
		spree.modalMgr.create("demo-contact", function() {
			$("#contact-demo-form").submit(function(d) {
				d.preventDefault();
				$.ajax({
					url: "/subscriptions/demo_contact",
					type: "POST",
					data: {
						full_name: $("#full-name-contact").val(),
						company: $("#company-contact").val(),
						email: $("#email-contact").val(),
						phone: $("#phone-contact").val(),
						website: $("#website-contact").val(),
						twitter: $("#twitter-contact").val(),
						info: $("#info-contact").val()
					},
					success: function() {
						if (spree.bucket_manager.serviceEnabled("mixpanel")) {
							mixpanel.track("demo", {
								action: "request complete",
								"page type": spree.mixpanelPageType
							})
						}
						spree.modalMgr.showNext("demo-thank-you", "demo-contact")
					},
					error: function(g, e, f) {
						$("#top_error").text(JSON.parse(g.responseText).response)
					}
				})
			})
		}, null, {
			header: "Request a demo",
			bodyText: "We'll contact you to schedule a demo and price quote."
		})
	});
	$(document).on("click", ".new_tab_link", function() {
		window.open($(this).attr("data-url"))
	});
	$("#popin_closer, #auth_closer").on("click", function() {
		$(this).parent().hide()
	});
	$("#address_submit").on("click", function() {
		$("#popin").dialog("close")
	});
	$(".external_login").on("click", function(c) {
		c.preventDefault();
		window.open($(this).attr("href"), "Authenticate", "height=600")
	});
	$("#terms_popup").on("click", function(c) {
		c.preventDefault();
		window.open($(this).attr("href"), "Terms of Service", "width = 600,height=600")
	});
	$("#edit_profile_anchor").on("ajax:complete", function(c, d) {
		spree.createModal(d.responseText)
	});
	$(".participant_notifications_links").on("ajax:complete", function(c, d) {
		spree.createModal(d.responseText)
	});
	$(document).on("ajax:complete", "#user_notifications_form", function(c, d) {
		d = jQuery.parseJSON(xhr.responseText);
		if (d.response == "ok") {
			$("#popin_content").html("Notification successfully sent!");
			setTimeout(function() {
				$("#popin").dialog("close")
			}, 1000)
		}
	});
	$(".notice .ui-icon-close").on("click", function() {
		$(this).parents(".notice").slideToggle("slow")
	});
	$("#edit_privacy").on({
		"ajax:beforeSend": function() {
			_.each($(".error"), function(c) {
				c.innerHTML = ""
			})
		},
		"ajax:complete": function(c, d) {
			if (d.status == 401) {
				$("#top_error").html("You must be logged in to edit your privacy settings")
			} else {
				data = jQuery.parseJSON(d.responseText);
				if (data.response == "ok") {
					$("#popin").dialog("close")
				} else {
					spree.formErrors(data)
				}
			}
		}
	});
	$("#edit_profile").on({
		"ajax:beforeSend": function() {
			_.each($(".error"), function(c) {
				c.innerHTML = ""
			})
		},
		"ajax:complete": function(c, d) {
			if (d.status == 401) {
				$("#top_error").html("You must be logged in to edit your profile")
			} else {
				data = jQuery.parseJSON(d.responseText);
				if (data.response == "ok") {
					$("#popin").dialog("close");
					window.location = $("#edit_profile").attr("success_url")
				} else {
					spree.formErrors(data)
				}
			}
		}
	});
	$(".upcoming_timer").each(function(d, f) {
		var e = parseInt($(f).attr("minutes"));
		var c = setInterval(function() {
			e--;
			if (e <= 0) {
				clearInterval(c);
				$(f).text("Starting NOW!");
				return
			}
			$(f).text(e == 1 ? "In 1 minute" : "In " + e + " minutes")
		}, 60000)
	});
	$(".section[data-section=trending] .categories select#category").on("change", function() {
		var c = $(this).val().toString();
		if (!c.length) {
			c = "all"
		}
		$.ajax({
			url: "/categories?partial=true&category=" + c,
			method: "GET",
			dataType: "html",
			success: function(d) {
				$(".section[data-section=trending] .events table.spree_table").replaceWith(d)
			}
		})
	});
	$(".section .select").not("selected").on("click", function() {
		var c = $(this),
			e = c.attr("data-select-option"),
			d = $("[data-select-list=" + e + "]");
		c.siblings("span.select").removeClass("selected").addClass("link");
		c.addClass("selected").removeClass("link");
		d.siblings("[data-select-list]").removeClass("selected");
		d.addClass("selected")
	});
	if ($(".slider-wrapper").length > 0) {
		new SpreeSlider(".slider-wrapper")
	}
	$(".scrollable.horizontal").scrollable();
	$(".scrollable.vertical").scrollable({
		vertical: true,
		mousewheel: true
	});
	$("[click_on_load='true']").click();
	$(document).on("change", "input[type=checkbox][data-content-node]", function() {
		var c = $(this).attr("checked");
		if ($(this).attr("data-hide-on-check")) {
			c = !c
		}
		$("#" + $(this).attr("data-content-node"))[c ? "show" : "hide"]().find("input, textarea, select").attr("disabled", !c)
	});
	$(document).on("click", ".spree_dropdown > .selected", function(c) {
		c.stopPropagation();
		var d = $(this).parents(".spree_dropdown");
		d.find("ul").toggle();
		$(".spree_dropdown").not(d).find("ul").hide()
	});
	$(document).on("click", ".spree_dropdown ul li", function(d) {
		d.stopPropagation();
		if ($(this).hasClass("disabled")) {
			return
		}
		var f = $(this).parents(".spree_dropdown");
		f.find("ul li").removeClass("selected");
		f.find("> .selected div").text($(this).text());
		f.find("ul").hide();
		$(this).addClass("selected");
		if ($(this).hasClass("no_value")) {
			f.find('input[type="hidden"]').removeAttr("value");
			document.trigger("dropdown:" + f.attr("data-trigger"), d, {
				value: null
			})
		} else {
			var c = $(this).attr("data-value");
			f.find("input").attr("value", c);
			$(document).trigger("dropdown:" + f.attr("data-trigger"), {
				value: c
			})
		}
	});
	$(document).on("click", ".spree_menu li", function(i) {
		var g = $(this);
		if (g.hasClass("selected")) {
			return
		}
		var h = g.parents(".spree_menu ul");
		if (h.attr("disabled")) {
			return
		}
		var f = h.attr("data-class");
		var d = h.attr("data-section");
		var c = g.attr("data-selector");
		h.children("li").removeClass("selected").removeClass(f);
		g.addClass("selected").addClass(f);
		$(d).hide();
		$(d).filter(c).show();
		$(document).trigger(d.replace(/\./g, "_") + ":" + c.replace(".", "_", "g") + ":selected");
		$(document).trigger(d.replace(/\./g, "_"), {
			selected: c
		})
	});
	$(document).on("click", function(c) {
		$(".spree_dropdown ul").hide()
	});
	$(document).on("click", ".profile_page .stats > div, .profile_page .header_info .channels .channels", function(c) {
		$('.profile_page .profile_menu li[data-selector=".' + $(this).attr("class") + '"]').click()
	});
	$(document).bind("_spreecasts_page", function(d, c) {
		$(".spreecasts_menu li, .spreecasts_counts li").removeClass("selected").filter('[data-selector="' + c.selected + '"]').addClass("selected")
	});
	$(document).on("click", ".hide_from_profile", function(h) {
		var g = $(this).parents(".profile-grid-tab[data-action]").attr("data-action");
		var d = $(this).parent().attr("data-type");
		var i = $(this).parent().attr("data-id");
		var c = $(this).parents(".bubble");
		var f = $(this).parents(".action");
		$.ajax({
			url: "/users/hide_from_profile",
			type: "POST",
			data: {
				activity: g,
				obj_id: i,
				type: d
			},
			success: function() {
				c.remove();
				if (f.find(".bubble").length == 0) {
					f.find(".profile-content").show()
				}
			}
		})
	});
	$(document).on("click", "tr.show_more .load", function() {
		if (window.___loading_spreecasts) {
			return
		}
		window.___loading_spreecasts = true;
		var e = $(this).parents("tr.show_more");
		var h = parseInt(e.attr("data-page"));
		var f = e.attr("data-type");
		var i = e.attr("data-owner-type");
		var c = e.attr("data-owner-id");
		var d = e.attr("data-per-page");
		e.find("td.load").addClass("loading");
		var g = {
			page: h,
			per_page: d,
			row_only: true,
			type: f
		};
		g[i] = c;
		$.ajax({
			url: "/events",
			data: g,
			dataType: "html",
			success: function(k) {
				k = jQuery.trim(k);
				var j = $(k);
				e.attr("data-page", h + 1).before(j);
				e.find("td.load").removeClass("loading");
				if (j.find("td").length < parseInt(d)) {
					e.remove()
				}
				window.___loading_spreecasts = false
			}
		})
	});
	$(document).on("click", ".profile_page .stats > div, .profile_page .header_info .channels .channels", function(c) {
		$('.profile_page .profile_menu li[data-selector=".' + $(this).attr("class") + '"]').click()
	});
	$(document).bind("_spreecasts_page", function(d, c) {
		$(".spreecasts_menu li, .spreecasts_counts li").removeClass("selected").filter('[data-selector="' + c.selected + '"]').addClass("selected")
	});
	$(document).on("click.defaultLoad", "tr.show_more .load", function() {
		if (window.___loading_spreecasts) {
			return
		}
		window.___loading_spreecasts = true;
		var e = $(this).parents("tr.show_more");
		var h = parseInt(e.attr("data-page"));
		var f = e.attr("data-type");
		var i = e.attr("data-owner-type");
		var c = e.attr("data-owner-id");
		var d = e.attr("data-per-page");
		e.find("td.load").addClass("loading");
		var g = {
			page: h,
			per_page: d,
			row_only: true,
			type: f
		};
		g[i] = c;
		$.ajax({
			url: "/events",
			data: g,
			dataType: "html",
			success: function(k) {
				k = jQuery.trim(k);
				var j = $(k);
				e.attr("data-page", h + 1).before(j);
				e.find("td.load").removeClass("loading");
				if (j.find("td").length < parseInt(d)) {
					e.remove()
				}
				window.___loading_spreecasts = false
			}
		})
	});
	$(document).on("dropdown:event[channel_id]", function(d, c) {
		$(".logo-preview").removeClass("selected").filter("[data-channel-id=" + c.value + "]").addClass("selected")
	});
	$(".profile.followers, .profile.following").on("click", ".load_more_button", function(c) {
		$(this).siblings(".more").show();
		$(this).hide()
	});
	if ($("body").hasClass("channel-embed")) {
		$(document).on({
			"spree:loaded": function() {
				spree.playNextInChannel = function() {
					spree.channelTimer = setTimeout(function() {
						$("#current-playlist-item").next().click()
					}, 5000)
				};
				spree.cancelPlayNext = function() {
					clearTimeout(spree.channelTimer);
					delete spree.channelTimer
				}
			}
		})
	}
	if ($("body").hasClass("channels_show")) {
		var b = $("#channel_embed_code_button").attr("data-url");
		$(document).on("click", ".twitter_channel_share_button", function() {
			window.open("http://www.twitter.com/share?text=" + b, "twitterShare", "width=500,height=400")
		});
		$(document).on("click", ".linkedin_channel_share_button", function() {
			window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURI(b), "linkedinShare", "width=500,height=400")
		});
		$(document).on("click", ".gplus_channel_share_button", function() {
			window.open("https://plus.google.com/share?url=" + b, "gplusShare", "width=500,height=400")
		});
		$(document).on("click", ".email_channel_share_button", function() {
			spree.eventMgr.showEmailInvites("channel", $("#channel_embed_code_button").attr("data-id"))
		})
	}
	$("#channel_embed_code_button").click(function() {
		spree.modalMgr.create("embed-channel");
		var c = $("#channel_embed_code_button").attr("data-url");
		$(".embed-size-option").click(function(f) {
			var d = this;
			if ($(this).hasClass("selector")) {
				return
			}
			$(".embed-size-selector .selector").animate({
				left: $(this).position().left,
				width: $(this).width() + 10
			}, null, null, function() {
				$("textarea.embed-channel").val($(d).attr("data-embed-code"))
			})
		})
	});
	$("#main-nav").click(function() {
		var c = $("#post-hamburger-nav");
		if (c.hasClass("engaged")) {
			c.removeClass("engaged")
		} else {
			c.addClass("engaged")
		}
	});
	$("#hamburger-backdrop, #post-hamburger-nav .close-large-icon").click(function() {
		$("#post-hamburger-nav").removeClass("engaged")
	})
});
var LoginManager = Class.extend({
	init: function() {
		if (this.hideCloseLink()) {
			this.noLoginTrapClose = true
		}
		this.setOriginPageType();
		this.bindListeners();
		this.checkStepFinished()
	},
	stepIndex: function(b, a) {
		return LoginManager.SIGNUP_PATHS[b].indexOf(a)
	},
	finishStep: function(f, e) {
		var d = $.cookie("signup_step_finished");
		if (d) {
			var c = JSON.parse(d);
			if (c.path == f && c.step == e) {
				$.removeCookie("signup_step_finished")
			}
		}
		var b = this.stepIndex(f, e);
		if (b < 0) {
			return
		}
		if ((b + 1) < LoginManager.SIGNUP_PATHS[f].length) {
			var a = LoginManager.SIGNUP_PATHS[f][b + 1];
			this[a](f)
		} else {
			$.removeCookie("signup_origin_page", {
				path: "/"
			});
			if (spree.bucket_manager.serviceEnabled("mixpanel")) {
				mixpanel.track("account created", {
					"auth type": f,
					"page type": this.sourcePageType
				})
			}
		}
	},
	setOriginPageType: function() {
		var a = $.cookie("signup_origin_page");
		if (a) {
			this.sourcePageType = a
		} else {
			this.sourcePageType = spree.mixpanelPageType
		}
	},
	finishStepOnRefresh: function(b, a) {
		$.cookie("signup_step_finished", JSON.stringify({
			path: b,
			step: a
		}), {
			expires: 7
		})
	},
	bindListeners: function() {
		var a = this;
		$(document).on("click", ".auth_link", function() {
			var b = $(this).attr("data-site"),
				c = {
					category: "account",
					action: "method_oauth_" + b
				};
			spree.analytics.log(c);
			a.openOauthSite($(this))
		});
		$(document).on("ajax:complete", "#new_user", function(b, c) {
			$.cookie("signup_origin_page", spree.mixpanelPageType, {
				path: "/"
			});
			a.handleUserRedirect(c)
		})
	},
	handleUserRedirect: function(a) {
		if (a.status == 200) {
			if (this.intent == "email_create") {
				this.finishStepOnRefresh("email", "showForm");
				this.handleLogin(true)
			} else {
				this.handleLogin(false)
			}
		} else {
			var b = JSON.parse(a.responseText);
			spree.formErrors(b)
		}
	},
	showEmailSignup: function() {
		var a = this;
		spree.modalMgr.create("email-signup", function(c) {
			var b = c.find("form");
			var e = c.find("#user_join_submit");
			var d = b.find("#user_tos_version");
			b.on("ajax:complete", function(f, g) {
				a.intent = LoginManager.INTENTS["email-signup"];
				a.handleUserRedirect(g)
			});
			d.change(function() {
				e.attr("disabled", !d.prop("checked"))
			})
		})
	},
	showSignup: function(e, d, b, c, a) {
		if (!c) {
			c = {}
		}
		c.ppv = window.ppvLanding;
		if (spree.bucket_manager.serviceEnabled("mixpanel")) {
			mixpanel.track("signup modal", {
				action: e,
				"page type": this.sourcePageType
			})
		}
		if (d) {
			spree.analytics.log({
				category: "account",
				action: "entry_interaction"
			})
		}
		spree.analytics.log({
			category: "account",
			action: "modal-signup"
		});
		if (b) {
			this.signInRedirectParams = b
		}
		if (a) {
			this.signInRedirectUrl = a
		}
		if (spree.isMobile()) {
			window.location.href = "/signup"
		} else {
			spree.modalMgr.create("signup", null, null, c)
		}
	},
	handleLogin: function(a) {
		$.cookie("analytics", "account/" + a ? "outcome_create" : "outcome_signin");
		if (this.signInRedirectParams) {
			var b = window.location.pathname;
			if (b === "/") {
				b += "home"
			}
			if (this.signInRedirectUrl) {
				b = this.signInRedirectUrl
			}
			var c = UrlUtils.addParams(b, this.signInRedirectParams);
			window.location.href = c || "/home"
		} else {
			window.location.reload(true)
		}
	},
	followSpreecastUsers: function(a) {
		if (_.any(a)) {
			$.ajax({
				type: "POST",
				url: "/users/friend_all",
				data: {
					ids: a
				}
			})
		}
	},
	autofollowFbFriends: function() {
		if (spree.isMobile()) {
			a.finishStep("facebook", "autofollowFbFriends");
			return
		}
		var a = this;
		$.ajax({
			url: "/users/facebook_friends",
			type: "GET",
			dataType: "json",
			error: function(b) {
				if (JSON.parse(b.responseText).reason === "permission_denied") {
					a.finishStep("facebook", "autofollowFbFriends");
					return
				} else {
					a.finishStepOnRefresh("facebook", "showForm");
					window.location.reload
				}
			},
			success: function(e, g, d) {
				var c = [];
				_.each(e, function(h) {
					if (h.user_id) {
						c.push(h)
					}
				});
				a.followSpreecastUsers(_.pluck(c, "user_id"));
				var b = {
					friends: c.slice(0, 7)
				};
				if (_.any(b.friends)) {
					var f = c.length - 7;
					if (f > 0) {
						b.description_of_undisplayed_friends = "... and " + f + " other" + (f > 1 ? "s" : "")
					}
				} else {
					b.description_of_undisplayed_friends = "You don't have any friends on Spreecast yet."
				}
				spree.modalMgr.create("auto-follow-fbfriends", function(h) {
					h.find(".modal-footer .btn-blue, .modal-header .nu-close").click(function() {
						spree.modalMgr.hide("auto-follow-fbfriends");
						c = [];
						a.finishStep("facebook", "autofollowFbFriends")
					})
				}, null, b)
			}
		})
	},
	hideCloseLink: function() {
		var d = $.cookie("spreekey"),
			b = {
				category: "account"
			},
			c, a;
		if (!d) {
			b.action = "entry_spreecast_nospreekey";
			spree.analytics.log(b);
			return false
		}
		c = spree.stringHashCode(d);
		a = ((c % 100) + 100) % 100;
		if (a < spree.login_trap_pct) {
			b.action = "entry_spreecast_noclose";
			spree.analytics.log(b);
			return true
		} else {
			b.action = "entry_spreecast_close";
			spree.analytics.log(b);
			return false
		}
	},
	displayAffiliateDialog: function(e) {
		var b = this;
		if (!spree.event || !spree.is_embed || !spree.event.host.is_affiliate || spree.isMobile()) {
			this.finishStep(e, "displayAffiliateDialog");
			return
		}
		var f = new UserModel(spree.event.host),
			c = f.name(),
			d = spree.generateProfilePhotoAddress(f, "large"),
			a = spree.event.host.alt;
		new GeneralConfirm({
			question: "Would you like to receive exclusive updates and information from " + c + "?",
			confirmText: "Yes",
			confirmCB: function() {
				$.ajax({
					url: "/users/" + spree.user.id + "/set_affiliation",
					type: "POST",
					data: {
						affiliate_id: a
					},
					success: function() {
						b.finishStep(e, "displayAffiliateDialog")
					}
				})
			},
			cancelCB: function() {
				b.finishStep(e, "displayAffiliateDialog")
			},
			cancelText: "No, thanks",
			wrapperClass: "affiliate_dialog"
		})
	},
	closePrompt: function() {
		$("#popin").dialog("close")
	},
	openOauthSite: function(c) {
		var b = c.attr("data-site"),
			a = "/auth_throttle?site=" + b,
			d = ["spreecast", b, parseInt(new Date().valueOf() / 1000)].join("_");
		c.addClass("active");
		window.open(a, d, "height=750, width=1050")
	},
	checkStepFinished: function() {
		var b = $.cookie("signup_step_finished");
		if (b) {
			var c = JSON.parse(b);
			var a = this;
			if (c.path == "facebook") {
				if (window.FB) {
					this.finishStep(c.path, c.step)
				} else {
					$(document).on("fb:init", function() {
						a.finishStep(c.path, c.step)
					})
				}
			} else {
				this.finishStep(c.path, c.step)
			}
		}
	},
	needsEmailDialog: function(b) {
		var a = this;
		this.finishStepOnRefresh(b, "needsEmailDialog");
		if (!spree.user.email) {
			if (spree.isMobile()) {
				a.finishStep(b, "needsEmailDialog")
			} else {
				AccountManager.addEmailAddress(spree.user.user_id, {
					noEscape: true,
					signup: true
				}, function() {
					a.finishStep(b, "needsEmailDialog")
				})
			}
		} else {
			a.finishStep(b, "needsEmailDialog")
		}
	},
	displayRecommendedUsers: function(d) {
		var b = this;
		var c = UrlUtils.getParams().query;
		if (window.ppvLanding) {
			$(document).on("spree:init", function() {
				var e = "Do you want to follow " + spree.event.host.first_name;
				if (spree.event.host.last_name != "" && spree.event.host.last_name != null) {
					e += " " + spree.event.host.last_name
				}
				spree.modalMgr.create("ppv-recommended-user", function(f) {
					f.find(".recommended-user-desc").ellipsis();
					f.on("hidden", function() {
						b.finishStep(d, "displayRecommendedUsers")
					})
				}, null, {
					hostname: e,
					host: spree.event.host
				})
			})
		} else {
			if (spree.isMobile() || window.skipSocialSignUp || (c && c.skipSocialSignUp)) {
				b.finishStep(d, "displayRecommendedUsers")
			} else {
				var a = {
					recommended_users: spree.recommended_users
				};
				_.each(a.recommended_users, function(e, f) {
					if (spree.user.following.indexOf(e.id) > 0) {
						a.recommended_users[f].following = true
					}
				});
				spree.modalMgr.create("display-recommended-users", function(e) {
					e.attr("data-follow-count", 0);
					if (spree.event) {
						spree.toggleFollowItem("follow_button_User_" + a.recommended_users[0].cached_slug, true)
					}
					e.on("hidden", function() {
						if (spree.bucket_manager.serviceEnabled("mixpanel")) {
							var f = {
								number: e.attr("data-follow-count"),
								action: "signup",
								"page type": b.sourcePageType
							};
							if (spree.event) {
								f.visibility = Spree.VISIBILITY[spree.event.visibility].toLowerCase()
							}
							mixpanel.track("recommended users followed", f)
						}
						b.finishStep(d, "displayRecommendedUsers")
					})
				}, null, a)
			}
		}
	}
});
LoginManager.INTENTS = {
	"email-signup": "email_create",
	"email-signin": "email_signin"
};
LoginManager.SIGNUP_PATHS = {
	email: ["showForm", "displayAffiliateDialog", "displayRecommendedUsers"],
	twitter: ["showForm", "needsEmailDialog", "displayAffiliateDialog", "displayRecommendedUsers"],
	facebook: ["showForm", "needsEmailDialog", "autofollowFbFriends", "displayAffiliateDialog", "displayRecommendedUsers"],
	linkedin: ["showForm", "displayAffiliateDialog", "displayRecommendedUsers"]
};
LoginManager.showLogin = function(c, a, b) {
	if (!b) {
		b = {}
	}
	b.ppv = window.ppvLanding;
	if (c) {
		spree.analytics.log({
			category: "account",
			action: "entry_interaction"
		})
	}
	spree.analytics.log({
		category: "account",
		action: "modal-login"
	});
	if (a) {
		this.signInRedirectParams = a
	}
	if (spree.isMobile()) {
		window.location.href = "/login"
	} else {
		spree.modalMgr.create("login", null, null, b)
	}
};
LoginManager.logoutUserAndShowLogin = function(a) {
	$.get("/users/sign_out", function() {
		LoginManager.showLogin("login")
	})
};
var Presence = Class.extend({
	init: function(a) {
		if (spree.channel_embed) {
			return
		}
		this.user = a.user();
		this.enabled = this.user.isPresenceEnabled();
		this.visible = false;
		this.presenceController = a;
		this.originalTitle = document.title;
		this.createContainer();
		this.$container = $("#im_container");
		this.$presenceBox = $("#presence_box");
		this.$presenceBoxHeader = this.$presenceBox.find("> .im-header");
		this.$presenceBoxMain = this.$presenceBox.find("> .main");
		this.$presenceBoxUserList = this.$presenceBoxMain.find("> .friends-list");
		this.$settingsIcon = this.$presenceBoxHeader.find(".settings-wrapper");
		this.$settingsMenu = this.$presenceBoxHeader.find(".menu");
		this.$presenceOnButton = this.$presenceBoxMain.find(".disabled input");
		this.$emptyInfo = this.$presenceBox.find(".emptyInf");
		this.$goToUpcomingButton = this.$presenceBox.find(".no_friends input");
		this.$userCount = this.$presenceBoxHeader.find("span.count");
		this.bindListeners();
		this.determineEmptyInfo();
		this.$sound = $("<audio>", {
			src: "/im_notification.wav",
			autostart: false,
			width: 1,
			height: 1,
			enablejavascript: true
		});
		$("body").append(this.$sound)
	},
	notify: function() {
		try {
			this.$sound[0].play()
		} catch (a) {
			console.log("Could not play IM notification", a)
		}
	},
	bindListeners: function() {
		var a = this;
		this.presenceController.subscribe(this.presenceController.signals.BUDDY_LIST_INSERT, function(d) {
			var c = d.data;
			var b = d.position;
			a.$presenceBoxUserList.find("li[data-id=" + c.alt() + "]").remove();
			if (c.online()) {
				var e = spree.hbTemplate("presence-user", {
					id: c.alt(),
					name: c.name(),
					pic: c.profilePhotoThumbUrl(),
					idle: c.idle() ? "true" : "false",
					online: "true"
				});
				if (b == 0) {
					a.$presenceBoxUserList.prepend(e)
				} else {
					a.$presenceBoxUserList.find("li:nth-child(" + b + ")").after(e)
				}
			}
			a.updateUserCount();
			a.determineEmptyInfo()
		});
		this.presenceController.subscribe(this.presenceController.signals.BUDDY_LIST_MY_USER_IS_ACTIVE, function(b) {
			a.$presenceBox.attr("data-idle", !b)
		});
		this.presenceController.subscribe(this.presenceController.signals.OFF, function() {
			a.enabled = false;
			a.user.setPresenceEnabled(false);
			a.$presenceBox.attr("data-enabled", "false");
			a.$presenceBoxUserList.empty().hide();
			a.toggle();
			a.$emptyInfo.hide();
			a.updateUserCount()
		});
		this.presenceController.subscribe(this.presenceController.signals.ON, function() {
			a.enabled = true;
			a.user.setPresenceEnabled(true);
			a.$presenceBox.attr("data-enabled", "true");
			a.$presenceBoxUserList.show();
			a.determineEmptyInfo();
			a.updateUserCount()
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.INSERT, function(h) {
			var d = h.position;
			var i = h.data;
			var c = a.presenceController.instantMessageController().otherUser(i);
			var g = i.fromUserAlt();
			var e = (spree.user.alt == g) ? a.presenceController.user() : a.presenceController.lookupUserByAlt(g);
			var b = a.findChatbox(c.alt());
			b.find(".main").show();
			if (i.type() === "room_invite") {
				var f = spree.hbTemplate("presence-im-room-invite", {
					imageUrl: spree.generateProfilePhotoAddress(e, "medium"),
					name: e.name(),
					roomLink: i.roomLink(),
					isRoomCapable: a.isRoomCapable(c),
					time: i.timestamp()
				})
			} else {
				var f = spree.hbTemplate("presence-im", {
					imageUrl: spree.generateProfilePhotoAddress(e, "medium"),
					body: i.body(),
					time: i.timestamp()
				})
			}
			Time.localizeTime(f.find(".timestamp"));
			b.find(".chat_content").append(f);
			b.find(".scroller").scrollTop(100000);
			if (i.type() === "room_invite" && spree.bucket_manager.serviceEnabled("mixpanel")) {
				mixpanel.track_links(".join-room", "room", {
					action: "join",
					"page type": "spree.mixpanelPageType"
				});
				mixpanel.track_links(".discover-room", "room", {
					action: "discover",
					"page type": "spree.mixpanelPageType"
				})
			}
			if (spree.user.alt !== g) {
				if (!document.hasFocus()) {
					document.title = e.firstName() + " says...";
					a.notify()
				}
			}
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.OPEN, function(c) {
			var b = $("#im_container > .tall").length;
			var d = (b + 1) * (210 + 10);
			if (d > $(window).width()) {
				$("#im_container .chatboxContainer").last().find(".im-header .close-icon").click()
			}
			a.createChatbox(c.user);
			if (c.userInitiated) {
				a.chatboxFocus(c.user.alt())
			}
			if (!c.user.online()) {
				a.disableChatbox(c.user.alt())
			}
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.CLOSE, function(b) {
			a.findChatbox(b.alt()).remove()
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.SHOW, function() {
			$("#im_container .chatboxContainer").show()
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.HIDE, function(b) {
			$("#im_container .chatboxContainer").hide()
		});
		this.presenceController.instantMessageController().subscribe(this.presenceController.instantMessageController().signals.USER_UPDATE, function(b) {
			var d = a.findChatbox(b.alt()).find(".chatbox");
			d.attr("data-idle", b.idle());
			if (!b.online()) {
				a.disableChatbox(b.alt())
			} else {
				if (b.online()) {
					a.enableChatbox(b.alt())
				}
			}
			d.attr("data-online", b.online());
			var c = d.find(".room");
			if (a.isRoomCapable(b)) {
				c.removeClass("disabled")
			} else {
				if (!c.hasClass("disabled")) {
					c.addClass("disabled")
				}
			}
		});
		$(document).on("keypress", "#im_container .chatbox input", function(b) {
			if (b.which == 13) {
				b.stopPropagation();
				b.preventDefault();
				var d = $(this).parents(".chatboxContainer").attr("data-id");
				var c = $(this).val();
				if ($.trim(c) == "") {
					return
				}
				a.presenceController.instantMessageController().submit(d, "text", c);
				$(this).val("")
			}
		});
		$(document).on("click", "#im_container .chatbox .close-icon", function(b) {
			b.stopPropagation();
			a.presenceController.instantMessageController().close($(this).parents(".chatboxContainer").attr("data-id"))
		});
		$(document).on("click", "#im_container .chatbox .im-header", function(b) {
			$(this).parents(".chatbox").find(".main").toggle()
		});
		$(document).on("click", "#im_container .chatbox .room", function(b) {
			b.preventDefault();
			b.stopPropagation();
			if (!$(this).hasClass("disabled")) {
				var c = $(this).parents(".chatboxContainer").attr("data-id");
				a.presenceController.instantMessageController().submit(c, "room_invite", null);
				if (spree.bucket_manager.serviceEnabled("mixpanel")) {
					mixpanel.track("room", {
						action: "invite",
						"page type": spree.mixpanelPageType
					})
				}
			}
		});
		this.$presenceBoxHeader.on("click", function() {
			a.toggle()
		});
		$(window).on("focus", function() {
			document.title = a.originalTitle
		});
		this.$settingsMenu.add(this.$presenceOnButton).on("click", function(b) {
			b.stopPropagation();
			a.presenceController.setPresence(!a.presenceController.getPresenceStatus())
		});
		this.$goToUpcomingButton.on("click", function() {
			window.open("/events?upcoming_all=all", "_blank")
		});
		$(document).on("click", ".private-message", function() {
			var d = $(this);
			if (d.hasClass("disabled")) {
				return
			}
			var c = $(this).attr("data-user-id");
			var b = a.findChatbox(c).find("input");
			if (b.length > 0) {
				a.chatboxFocus(c)
			} else {
				spree.ecma.presenceController.instantMessageController().open(c, true, null)
			}
		});
		$(document).on("click", "#presence_box .main ul li", function() {
			var c = $(this).attr("data-id");
			var b = a.findChatbox(c).find("input");
			if (b.length > 0) {
				a.chatboxFocus(c)
			} else {
				spree.ecma.presenceController.instantMessageController().open(c, true, null)
			}
		});
		this.$settingsIcon.click(function(b) {
			b.stopPropagation();
			a.$settingsMenu.toggle()
		})
	},
	appendOfflineMessage: function(b, a) {
		b.append("<div class='offline'>" + a.name() + " is now offline and will not receive your message</div>")
	},
	chatboxFocus: function(a) {
		this.findChatbox(a).find("input").focus()
	},
	createChatbox: function(b, a) {
		if (this.findChatbox(b.alt()).length > 0) {
			return
		}
		var d = spree.hbTemplate("im-container", {
			alt: b.alt(),
			name: b.name(),
			idle: b.idle() ? "true" : "false",
			online: b.online() ? "true" : "false",
			placeholderText: "Send a message..."
		});
		if (!b.online) {
			this.appendOfflineMessage(d.find("td"))
		}
		var c = d.find(".room");
		if (this.isRoomCapable(b)) {
			c.removeClass("disabled")
		}
		this.$container.append(d);
		if (a) {
			d.find("input").focus()
		}
	},
	createContainer: function() {
		$("body").append(spree.hbTemplate("presence-container", {
			enabled: !! this.enabled,
			noFriends: true
		}))
	},
	disableChatbox: function(b) {
		var c = this.findChatbox(b).find("input");
		c.prop("disabled", true);
		c.prop("placeholder", "This user is offline");
		var a = this.findChatbox(b).find(".room");
		if (!a.hasClass("disabled")) {
			a.addClass("disabled")
		}
	},
	determineEmptyInfo: function() {
		if (this.presenceController.getOnlineUserCount() > 0) {
			this.$emptyInfo.hide()
		} else {
			this.$emptyInfo.show()
		}
	},
	enableChatbox: function(a) {
		var b = this.findChatbox(a).find("input");
		b.prop("disabled", false);
		b.prop("placeholder", "")
	},
	isRoomCapable: function(a) {
		return spree.capabilities.room && a.capabilities() && a.capabilities().room
	},
	findChatbox: function(a) {
		return $(".chatboxContainer[data-id=" + a + "]")
	},
	toggle: function() {
		if (this.visible) {
			this.$presenceBoxMain.hide();
			this.$settingsMenu.hide();
			this.$settingsIcon.hide();
			this.visible = false
		} else {
			this.$presenceBoxMain.show();
			this.$settingsIcon.show();
			this.visible = true
		}
	},
	updateUserCount: function() {
		this.$userCount.text(this.enabled ? this.presenceController.getOnlineUserCount() : "-")
	}
});
var FriendRequest = Class.extend({
	init: function(a) {
		this.friendshipController = a;
		this.friendRequestList = [];
		this.friendAcceptList = [];
		this.numNotifications = 0;
		this.$requestList = [];
		this.$acceptList = [];
		this.originalTitle = document.title;
		this.$friendsTab = $("#friend-notification-nav");
		this.$notificationCount = this.$friendsTab.find(".notification-count");
		this.buildFriendshipContainer();
		this.$friendsNotificationBox = $("#friend-notification-box");
		this.$friendRequestList = this.$friendsNotificationBox.find(".friend-requests");
		this.$friendAcceptList = this.$friendsNotificationBox.find(".friend-accepts");
		this.$goToFriendsButton = this.$friendsNotificationBox.find(".go-to-friends");
		this.bindListeners()
	},
	bindListeners: function() {
		var a = this;
		this.friendshipController.subscribe(this.friendshipController.signals.UPDATE_FRIEND_LISTS, function(b) {
			a.friendRequestList = b.friendRequests;
			a.friendAcceptList = b.friendAccepts
		});
		this.friendshipController.subscribe(this.friendshipController.signals.UPDATE_FRIEND_NOTIFICATION, function(b) {
			a.numNotifications = b.notificationCount;
			if (!a.$friendsTab.hasClass("selected")) {
				a.updateNotificationDisplay()
			}
		});
		this.$friendsTab.on("click", function(b) {
			if (!$(this).hasClass("selected")) {
				a.buildFriendshipBox();
				a.markFriendshipsSeen()
			} else {
				a.updateNotificationDisplay()
			}
			$(this).toggleClass("selected");
			a.$friendsNotificationBox.toggleClass("hidden")
		});
		this.$goToFriendsButton.on("click", function() {
			window.open("/users/" + spree.user.user_id + "?tab=friends", "_blank")
		})
	},
	buildFriendshipBox: function() {
		var c = this;
		this.$requestList = [];
		this.$acceptList = [];
		$(window).on("click", function(g) {
			if (c.$friendsTab.hasClass("selected")) {
				if ($(g.target).parents("#friend-notification-nav-wrapper").length <= 0) {
					$(this).off(g);
					c.updateNotificationDisplay();
					c.$friendsTab.toggleClass("selected");
					c.$friendsNotificationBox.toggleClass("hidden")
				}
			}
		});
		var f = this.friendshipController.getNumFriendRequests();
		var a = this.friendshipController.getNumFriendAccepts();
		$("#friend-requests-header").html(spree.hbTemplate("friend-notifications-header", {
			headerText: "Friend requests",
			numNotifications: f,
			headerUrl: "/users/" + spree.user.user_id + "?tab=friends",
			hasSettings: !(spree.isMobile() || spree.isTablet()),
			settingsUrl: "/users/" + spree.user.user_id + "/edit?tab=settings&tab_action=privacy"
		}));
		if (this.friendRequestList.length > 0) {
			for (var d = 0; d < this.friendRequestList.length; d++) {
				var b = this.friendRequestList[d].user();
				var e = spree.hbTemplate("friend-request-user", {
					id: b.alt(),
					name: b.name(),
					pic: b.profilePhotoThumbUrl_100x100(),
					profile_link: "/users/" + b.id(),
					friendId: this.friendRequestList[d].id(),
					hasUserSeen: this.friendRequestList[d].has_user_seen().toString(),
					time: this.friendRequestList[d].timestamp()
				});
				this.$requestList.push(e)
			}
			this.$friendRequestList.html(this.$requestList)
		} else {
			this.$friendRequestList.html(spree.hbTemplate("no-friend-requests", {}))
		}
		if (this.friendAcceptList.length > 0) {
			$("#friend-accepts-header").html(spree.hbTemplate("friend-notifications-header", {
				headerText: "New friends",
				numNotifications: a,
				headerUrl: "/users/" + spree.user.user_id + "?tab=friends",
				hasSettings: false
			}));
			for (var d = 0; d < this.friendAcceptList.length; d++) {
				var b = this.friendAcceptList[d].user();
				var e = spree.hbTemplate("friend-accept-user", {
					id: b.alt(),
					name: b.name(),
					pic: b.profilePhotoThumbUrl_100x100(),
					profile_link: "/users/" + b.id(),
					friendId: this.friendAcceptList[d].id(),
					hasUserSeen: this.friendAcceptList[d].has_user_seen().toString(),
					time: this.friendAcceptList[d].timestamp(),
					isOnline: b.online()
				});
				this.$acceptList.push(e)
			}
			this.$friendAcceptList.html(this.$acceptList)
		}
		Time.localizeFriendshipNotifications("#friend-notification-box")
	},
	buildFriendshipContainer: function() {
		$("#friend-notification-container").html(spree.hbTemplate("friend-notification-container", {}))
	},
	friendshipSeen: function(e) {
		var d = $(e);
		var c = d.attr("data-friend-id");
		var b = d.attr("data-user-seen");
		if (b === "false") {
			var a = "/friendships/" + c + "/was_seen";
			var f = "PUT";
			$.ajax({
				url: a,
				type: f
			})
		}
	},
	markFriendshipsSeen: function() {
		for (var a = 0; a < this.$requestList.length; a++) {
			this.friendshipSeen(this.$requestList[a])
		}
		for (var a = 0; a < this.$acceptList.length; a++) {
			this.friendshipSeen(this.$acceptList[a])
		}
	},
	updateNotificationDisplay: function() {
		if (this.numNotifications === 0) {
			this.$friendsTab.removeClass("has-notification");
			this.$notificationCount.removeAttr("data-notification-count");
			document.title = this.originalTitle
		} else {
			if (!this.$friendsTab.hasClass("has-notification")) {
				this.$friendsTab.addClass("has-notification")
			}
			this.$notificationCount.attr("data-notification-count", this.numNotifications);
			document.title = "(" + this.numNotifications + ") " + document.title
		}
	}
});
var Time = {};
Time.defaults = {
	time: true,
	date: true,
	timezone: true
};
Time.getTimezone = function() {
	var b = new Date();
	var c = b.toString();
	var a = (c.match(/\(([^\)]+)\)$/) || c.match(/([A-Z]+) [\d]{4}$/));
	if (a) {
		a = a[1].match(/[A-Z]/g).join("")
	}
	return a
};
Time.timestampToWords = function(c, a, b) {
	if (a == 2) {
		if (b.time && !b.date) {
			return Time.formatStartDate(c, 2, b)
		} else {
			return Time.timeAgoInWords(c)
		}
	} else {
		return Time.formatUpcomingUTC(c, b)
	}
};
Time.localizeBillingDate = function(a) {
	_.forEach($(a), function(d) {
		var e = Number($(d).text());
		if (!isNaN(e)) {
			var c = moment(e);
			var b = Time.formatBillingDate(c);
			$(d).text(b).removeClass("invisible")
		}
	})
};
Time.localizeDateTime = function(a) {
	_.forEach($(a), function(e) {
		var f = Number($(e).text());
		if (!isNaN(f)) {
			var b = "";
			var d = moment(f);
			var c = $(e).parents("[data-status]").data("status");
			if (c === 2) {
				b = d.format("MMM DD, YYYY")
			} else {
				b = d.format("MMM DD, YYYY - h:mm a")
			}
			$(e).text(b).removeClass("invisible")
		}
	})
};
Time.localizeTime = function(c) {
	var e = Number($(c).text());
	if (!isNaN(e)) {
		var a = "";
		var b = moment(e);
		var d = moment();
		if (d.date() !== b.date()) {
			a = b.format("MMM DD, YYYY h:mma")
		} else {
			a = b.format("h:mma")
		}
		$(c).text(a).removeClass("invisible")
	}
};
Time.localizeFriendshipNotifications = function(a, b) {
	var c = _.defaults(b ? b : {}, Time.defaults);
	_.forEach($(a + " .friendship-notification-time"), function(e) {
		var f = Number($(e).text());
		if (!isNaN(f)) {
			var d = Time.timeAgoInWords(f * 1000);
			$(e).text(d).removeClass("invisible")
		}
	})
};
Time.localizeDOM = function(a, b) {
	var c = _.defaults(b ? b : {}, Time.defaults);
	_.forEach($(a + " .start-date"), function(f) {
		var g = Number($(f).text());
		if (!isNaN(g)) {
			var e = $(f).parents("[data-status]").data("status");
			var d = Time.timestampToWords(g, e, c);
			$(f).text(d).removeClass("invisible")
		}
	})
};
Time.formatStartDate = function(d, a, c) {
	var e = _.defaults(c ? c : {}, Time.defaults);
	var b = moment(d);
	var f = [];
	if (e.date) {
		if (a != 2) {
			f.push(b.format("dddd"))
		}
		f.push(b.format("MMM D, YYYY"))
	}
	if (e.time) {
		f.push(b.format("h:mma"))
	}
	if (e.timezone) {
		f.push(Time.getTimezone())
	}
	return f.join(" ")
};
Time.formatUpcomingUTC = function(f, d) {
	var g = _.defaults(d ? d : {}, Time.defaults);
	var c = moment(f);
	var b = moment();
	var e = Math.floor((c - b) / 60000);
	if (e <= 1) {
		return "Starting Shortly..."
	} else {
		if (e <= 60) {
			return "In " + e + " minutes"
		}
	}
	var a = "";
	if (g.date) {
		if (c.year() == b.year() && c.month() == b.month()) {
			if (c.date() == b.date()) {
				a = "Today"
			} else {
				if (c.date() == (b.date() + 1)) {
					a = "Tomorrow"
				} else {
					a = Time.formatGuideDate(c)
				}
			}
		} else {
			a = Time.formatGuideDate(c)
		}
		if (g.time) {
			a += " at "
		}
	}
	if (g.time) {
		a += Time.formatGuideTime(c)
	}
	return a
};
Time.timeAgoInWords = function(f) {
	var a = " ago";
	var c = Math.abs((new Date - f) / 1000);
	var g = c / 60;
	var d = g / 60;
	var e = d / 24;
	var k = e / 30;
	var b = k / 12;
	if (g < 1) {
		return "less than a minute" + a
	} else {
		if (Math.floor(g) == 1) {
			return "a minute" + a
		} else {
			if (Math.abs(d - 1) < 0.2) {
				return "about an hour" + a
			} else {
				if (Math.abs(e - 1) < 0.2) {
					return "about a day" + a
				} else {
					if (Math.abs(k - 1) < 0.2) {
						return "about a month" + a
					} else {
						if (Math.abs(b - 1) < 0.2) {
							return "about a year" + a
						}
					}
				}
			}
		}
	}
	var j, i;
	if (d < 1) {
		j = "minute";
		i = Math.floor(g)
	} else {
		if (e < 1) {
			j = "hour";
			i = Math.floor(d)
		} else {
			if (k < 1) {
				j = "day";
				i = Math.floor(e)
			} else {
				if (b < 1) {
					j = "month";
					i = Math.floor(k)
				} else {
					j = "year";
					i = Math.floor(b)
				}
			}
		}
	}
	var h = "";
	if (j == "year") {
		h += "over "
	}
	h += (i + " " + j);
	if (i > 1) {
		h += "s"
	}
	h += a;
	return h
};
Time.formatGuideTime = function(a) {
	return a.format("h:mma")
};
Time.formatGuideDate = function(a) {
	return a.format("ddd, MMM D")
};
Time.formatBillingDate = function(a) {
	return a.format("YYYY/MM/DD")
};
Time.formatDuration = function(d) {
	var b = "";
	var a = d;
	var c = Math.floor(a / 3600000);
	if (c > 0) {
		b += c + ":";
		a -= c * 3600000
	}
	var e = Math.floor(a / 60000);
	if (e > 0) {
		if (e < 10 && c > 0) {
			b += "0" + e + ":"
		} else {
			b += e + ":"
		}
		a -= e * 60000
	} else {
		if (c > 0) {
			b += "00:"
		} else {
			b += "0:"
		}
	}
	var f = Math.floor(a / 1000);
	if (f > 0) {
		if (f < 10) {
			b += "0" + f
		} else {
			b += f
		}
	} else {
		if (c > 0 || e > 0) {
			b += "00"
		} else {
			b += "01"
		}
	}
	return b
};
Time.getCalendarDate = function(d) {
	var b = moment(d);
	var a = b.date();
	var c = b.year();
	if (c < 2000) {
		c = c + 1900
	}
	return b.format("MMM D, YYYY")
};
Time.getClockTime = function(d) {
	var b = moment(d);
	var a = b.hour();
	var c = "am";
	if (a > 11) {
		c = "pm"
	}
	return b.format("h:mm") + c
};
Time.upcomingTimeFor = function(d) {
	var b = moment(d);
	var c, a;
	if ((c = moment().add("seconds", 60)).isAfter(b)) {
		a = "Starting Shortly..."
	} else {
		if ((c = moment().add("minutes", 60)).isAfter(b)) {
			var e = b.diff(moment(), "minutes");
			a = "In " + e + (e == "1" ? " minute" : " minutes")
		} else {
			if (c = moment().startOf("day").add("days", 2).isAfter(b)) {
				a = b.calendar()
			} else {
				a = b.format("ddd MMM Do, h:mma")
			}
		}
	}
	return a
};
var SpreeSlider = Class.extend({
	init: function(a, d, c) {
		c = c || 50;
		d = d || 5;
		var e = $(a),
			b = this;
		e.find(".slider-button").on({
			mouseenter: function() {
				var i = $(this),
					g = e.find("ul:visible"),
					f = g.find("li:last-child"),
					h = f.width() - i.width();
				if (b.sliding) {
					return
				}
				b.sliding = setInterval(function() {
					var j = parseInt(g.css("left"));
					if (i.hasClass("left")) {
						if (g.position().left >= 0) {
							return b.clear()
						}
						j += d
					} else {
						if (f.offset().left <= i.offset().left - h) {
							return b.clear()
						}
						j -= d
					}
					g.css("left", j)
				}, c)
			},
			mouseleave: function() {
				b.clear()
			}
		})
	},
	clear: function() {
		clearInterval(this.sliding);
		delete this.sliding
	}
});
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(c) {
		var a = "";
		var k, h, f, j, g, e, d;
		var b = 0;
		c = Base64._utf8_encode(c);
		while (b < c.length) {
			k = c.charCodeAt(b++);
			h = c.charCodeAt(b++);
			f = c.charCodeAt(b++);
			j = k >> 2;
			g = ((k & 3) << 4) | (h >> 4);
			e = ((h & 15) << 2) | (f >> 6);
			d = f & 63;
			if (isNaN(h)) {
				e = d = 64
			} else {
				if (isNaN(f)) {
					d = 64
				}
			}
			a = a + this._keyStr.charAt(j) + this._keyStr.charAt(g) + this._keyStr.charAt(e) + this._keyStr.charAt(d)
		}
		return a
	},
	decode: function(c) {
		var a = "";
		var k, h, f;
		var j, g, e, d;
		var b = 0;
		c = c.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (b < c.length) {
			j = this._keyStr.indexOf(c.charAt(b++));
			g = this._keyStr.indexOf(c.charAt(b++));
			e = this._keyStr.indexOf(c.charAt(b++));
			d = this._keyStr.indexOf(c.charAt(b++));
			k = (j << 2) | (g >> 4);
			h = ((g & 15) << 4) | (e >> 2);
			f = ((e & 3) << 6) | d;
			a = a + String.fromCharCode(k);
			if (e != 64) {
				a = a + String.fromCharCode(h)
			}
			if (d != 64) {
				a = a + String.fromCharCode(f)
			}
		}
		a = Base64._utf8_decode(a);
		return a
	},
	_utf8_encode: function(b) {
		b = b.replace(/\r\n/g, "\n");
		var a = "";
		for (var e = 0; e < b.length; e++) {
			var d = b.charCodeAt(e);
			if (d < 128) {
				a += String.fromCharCode(d)
			} else {
				if ((d > 127) && (d < 2048)) {
					a += String.fromCharCode((d >> 6) | 192);
					a += String.fromCharCode((d & 63) | 128)
				} else {
					a += String.fromCharCode((d >> 12) | 224);
					a += String.fromCharCode(((d >> 6) & 63) | 128);
					a += String.fromCharCode((d & 63) | 128)
				}
			}
		}
		return a
	},
	_utf8_decode: function(a) {
		var b = "";
		var d = 0;
		var e = c1 = c2 = 0;
		while (d < a.length) {
			e = a.charCodeAt(d);
			if (e < 128) {
				b += String.fromCharCode(e);
				d++
			} else {
				if ((e > 191) && (e < 224)) {
					c2 = a.charCodeAt(d + 1);
					b += String.fromCharCode(((e & 31) << 6) | (c2 & 63));
					d += 2
				} else {
					c2 = a.charCodeAt(d + 1);
					c3 = a.charCodeAt(d + 2);
					b += String.fromCharCode(((e & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					d += 3
				}
			}
		}
		return b
	}
};
var SpreeSearch = Class.extend({
	init: function() {
		var a = this;
		this.$searchField = $("#search input[type=text]");
		this.$searchButton = $("#search input[type=submit]");
		this.$searchIcon = $("#search .search-icon");
		this.placeHolder = this.$searchField.attr("placeholder");
		this.$searchResults = $("#searchResults");
		this.$searchField.on({
			keyup: function(b) {
				clearTimeout(a.timer);
				if (b.keyCode == 13) {
					b.stopPropagation();
					a.fullSearch()
				}
			},
			click: function(b) {
				b.stopPropagation()
			}
		});
		$(document).on({
			click: function(b) {
				a.empty()
			},
			keyup: function(b) {
				if (b.keyCode == 27) {
					a.empty()
				}
			}
		});
		this.$searchResults.click(function(b) {
			b.stopPropagation()
		});
		this.$searchButton.click(function(b) {
			b.stopPropagation();
			a.fullSearch()
		});
		this.$searchIcon.click(function(b) {
			b.stopPropagation();
			a.fullSearch()
		})
	},
	empty: function() {
		this.$searchField.blur().val("").attr("placeholder", this.placeHolder);
		this.$searchResults.empty().hide()
	},
	fullSearch: function() {
		var a = "/searches?search_term=" + this.$searchField.val();
		if (spree.bucket_manager.serviceEnabled("mixpanel")) {
			mixpanel.track("search", {
				"page type": spree.mixpanelPageType,
				term: this.$searchField.val()
			})
		}
		spree.nowBroadcasting() ? window.open(a) : window.location.href = a
	},
	render: function(d) {
		var a = this,
			c = d.Event;
		this.$searchResults.empty();
		if (c && c.length) {
			for (var b in c) {
				var e = c[b];
				this.$searchResults.append($("<div>")).append($("<a>", {
					href: "/events/" + e.event_id,
					"class": "clear",
					target: spree.nowBroadcasting() ? "_blank" : null
				}).html(e.name))
			}
		} else {
			this.$searchResults.html("No results found").show()
		}
		a.$searchResults.show()
	}
});
SpreeHomePageScroll = Class.extend({
	init: function(a) {
		this.data = a;
		this.selector = ".subsection[data-subsection=upcoming]";
		this.$div = $(this.selector);
		this.$list = this.$div.find("ul");
		this.$item = $(".subsection ul li:nth-child(1)");
		this.bindEvents();
		this.populateBubbles()
	},
	atBottom: function() {
		return ((this.$list.offset().top + this.$list.height()) <= (this.$div.offset().top + this.$div.height()))
	},
	atTop: function() {
		return (this.$list.position().top >= 0)
	},
	bindEvents: function() {
		var a = this;
		this.$div.on({
			mousemove: function(c) {
				var b = c.pageY - a.$div.position().top;
				if ((b < 45) && (!a.atTop())) {
					$("[data-direction=up]").show()
				} else {
					if ((b > 280) && (!a.atBottom())) {
						$("[data-direction=down]").show()
					} else {
						$("[data-direction]").hide()
					}
				}
			},
			mouseout: function() {
				$("[data-direction]").hide()
			}
		});
		$(".event-reminder-button").on("click.guide", function() {
			var b = $(this),
				c = b.attr("data-event-id");
			$.ajax({
				url: "/following",
				type: "POST",
				data: {
					item: "Event",
					id: c
				},
				complete: function() {
					b.off("click.guide");
					var d = parseInt(b.data("rsvps").trim().split(/\s/)[0]) + 1;
					if (b.parents(".event-listing").length !== 0) {
						if (spree.bucket_manager.serviceEnabled("mixpanel")) {
							mixpanel.track("guide", {
								position: b.parents("[data-position]").data("position"),
								"page type": "home"
							})
						}
					}
					b.removeClass("btn-blue").text("" + d + " RSVP" + (d > 1 ? "s" : "")).css("border", "none").css("background", "none")
				}
			})
		});
		this.$div.find("[data-direction]").on({
			click: function(b) {
				b.preventDefault();
				clearInterval(a.scrollInterval);
				delete a.scrollInterval;
				a.scroll($(this).attr("data-direction"), 100)
			},
			mouseenter: function() {
				var b = $(this).attr("data-direction");
				a.scrollInterval = setInterval(function() {
					a.scroll(b, 10)
				}, 100)
			},
			mouseleave: function() {
				clearInterval(a.scrollInterval);
				delete a.scrollInterval
			}
		});
		_.each(["mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], function(b) {
			var d = a.$div[0],
				c = function(h) {
					h.preventDefault();
					h.stopPropagation();
					var f = $(document.elementFromPoint(h.pageX, h.pageY)).parents("*").andSelf().filter("li[data-event-id]").attr("data-event-id"),
						g = $("li.hover").attr("data-event-id");
					if (!(f === g)) {
						$("li.hover").trigger("mouseleave");
						$("li[data-event-id=" + f + "]").trigger("mouseenter")
					}
					a.scroll(h.detail ? (h.detail * -1) : h.wheelDeltaY)
				};
			if (d.addEventListener) {
				d.addEventListener(b, c, true)
			} else {
				if (d.attachEvent) {
					d.attachEvent(b, c)
				}
			}
		})
	},
	getBubble: function(a) {
		return $(".upcoming-bubble[data-event-id=" + a + "]")
	},
	getListItem: function(a) {
		return this.$list.find("li[data-event-id=" + a + "]")
	},
	populateBubbles: function() {
		var a = this;
		_.each(this.data, function(c) {
			if (c.live.length) {
				var b = a.getBubble(c.event_id).find(".preview-faceblock");
				_.each(c.live, function(d) {
					$div = $("<div>", {
						"class": "user-on-air"
					}).text("On Air").append($("<img>", {
						src: spree.generateProfilePhotoAddress(new UserModel(d), "medium"),
						alt: d.name
					}));
					b.append($div)
				})
			}
		});
		this.moveBubbles()
	},
	moveBubbles: function() {
		var a = this;
		_.each(this.$list.find("li"), function(b) {
			var c = $(b).offset();
			a.getBubble($(b).attr("data-event-id")).css({
				top: c.top - 30,
				left: c.left - 220
			})
		})
	},
	scroll: function(a, b) {
		b = b ? b : 5;
		if (a == "up") {
			a = 1
		}
		if (a == "down") {
			a = -1
		}
		var c = this.$list.position().top;
		if (a < 0) {
			if (this.atBottom()) {
				return
			}
			this.$div.find("ul").css("top", (c - b))
		} else {
			if (a > 0) {
				if (this.atTop()) {
					return
				}
				this.$div.find("ul").css("top", (c + b))
			}
		}
		this.updateBanner();
		this.moveBubbles()
	},
	updateBanner: function() {
		var b = $(".banner");
		var b = $(".banner");
		if (!b) {
			return
		}
		var c = this.$list.find("li"),
			a = spree.binarySearch(_.map(c, function(e) {
				return $(e).offset().top
			}), (b.offset().top + b.width() / 2));
		a = Math.max(1, a);
		a = Math.min(a, c.length);
		this.$item = this.$list.find("li:nth-child(" + a + ")");
		var d = this.$item.find(".date span");
		b.find("span").text(d.length > 0 ? d.text() : "Live")
	}
});
var URLActionsManager = Class.extend({
	init: function() {
		var a = UrlUtils.getParams().query;
		$(document).one("spree:init spree:unavailable", function() {
			if (a && a.login) {
				spree.loginMgr.showSignup(undefined)
			}
		})
	},
	getActions: function() {
		var b = UrlUtils.getParams().query;
		var c = {};
		if (b) {
			if (b.hasOwnProperty("action") || b.hasOwnProperty("email_action")) {
				var a = b.email_action || b.action;
				c[a] = {};
				if (b.hasOwnProperty("email_recipient")) {
					c[a]["email_recipient"] = b.email_recipient
				}
				if (b.hasOwnProperty("rsvp") || b.hasOwnProperty("email_rsvp")) {
					c[a]["rsvp"] = b.rsvp || b.email_rsvp
				}
				if (b.hasOwnProperty("add_email")) {
					var d = {};
					if (b.hasOwnProperty("blocking")) {
						d.blocking = (b.blocking === "true")
					}
					c[a]["add_email"] = d
				}
			}
		}
		return c
	},
	markActionsComplete: function(a) {
		if (a == "profile") {
			window.location.href = UrlUtils.removeParams(window.location.href, ["action", "email_recipient"])
		} else {
			if (a == "events") {
				window.location.href = UrlUtils.removeParams(window.location.href, ["action", "rsvp"])
			}
		}
	}
});
var PageController = Class.extend({
	init: function() {
		var a = this;
		this.urlActionsMgr = new URLActionsManager();
		$(window).load(function() {
			a.performRenderActions()
		});
		var b = this.getActions();
		this.correctLoginStatus(b)
	},
	correctLoginStatus: function(f) {
		var a = this;
		if (!_.isEmpty(f)) {
			if (!spree.user) {
				LoginManager.showLogin()
			} else {
				var c = true;
				for (var b in f) {
					var d = f[b];
					if (d.email_recipient && spree.user.user_id != d.email_recipient) {
						c = false;
						var e = function() {
								$.get("/users/sign_out").complete(function() {
									spree.showHeader();
									var g = d;
									g.action = d;
									LoginManager.showLogin(true, g)
								})
							};
						new GeneralConfirm({
							confirmText: "Ok",
							confirmCB: e,
							text: "Please log in with the account associated to the <br/> email address where you received the notification."
						});
						$(".ui-dialog-titlebar-close").click(function(g) {
							a.urlActionsMgr.markActionsComplete([b])
						})
					}
				}
				if (c) {
					a.performActions(f)
				}
			}
		}
	},
	toggleWatchMenu: function() {
		var a = $("#watch-nav");
		if (a.hasClass("active")) {
			spree.bannerMgr.hide("WatchMenuBanner", false)
		} else {
			spree.bannerMgr.show("WatchMenuBanner")
		}
	},
	performRenderActions: function() {},
	getActions: function() {
		return this.urlActionsMgr.getActions()
	},
	performActions: function(b) {
		if (b.global) {
			for (var a in b.global) {
				if (a === "add_email") {
					if (spree.user) {
						AccountManager.addEmailAddress(spree.user.user_id, {
							noEscape: b.global.add_email.blocking
						})
					}
				}
			}
		}
	}
});
var SpreeProfile = PageController.extend({
	init: function(a, b) {
		this.user_id = a;
		this._super();
		this.tabs = ["spreecasts", "channels", "followers", "following", "friends"];
		this.actions = ["watched", "created", "produced", "was_on_camera", "commented", "attended"];
		this.bindEvents();
		this.selectTab(b);
		spree.profile = spree.pageController = this;
		$(".about-me").multiLineToggle({
			row: 3
		})
	},
	bindEvents: function() {
		var a = this;
		$(".stats, .profile-tabs-container").on("click", "[data-tab]", function() {
			a.selectTab($(this).data("tab"))
		});
		$("[data-tab=spreecasts]").on("click", "[data-action]", function() {
			a.selectAction($(this).data("action"))
		});
		$(document).on("click", ".show-more", function() {
			var g = $(this);
			g.attr("disabled", true);
			var f = $("[data-action][data-selected=true]").attr("data-action");
			var c = $("ul.owner-categories [data-selected=true]").attr("data-tab");
			var e = parseInt(g.attr("data-page")) + 1;
			var d = "/users/" + a.user_id;
			var b = {};
			if (c == "spreecasts") {
				d += "/event_actions";
				b = {
					page: e,
					event_action: f
				}
			} else {
				d += "/" + c;
				b = {
					page: e
				}
			}
			$.ajax({
				url: d,
				data: b,
				dataType: "html",
				complete: function(h) {
					g.attr("disabled", false)
				},
				success: function(i) {
					g.remove();
					var h = "";
					if (c == "spreecasts") {
						h = ".profile-grid [data-action=" + f + "] .profile-content";
						$(h).append($(i))
					} else {
						h = ".current-followers";
						$(h).append($(i).find(".all-followers"))
					}
					Time.localizeDOM(h)
				}
			})
		})
	},
	selectTab: function(c) {
		if (this.tabDisabled || (!(_.include(this.tabs, c)))) {
			return
		}
		var b = this;
		$(".stats").find("[data-tab]").removeAttr("data-selected").find("i").removeClass("tab-selected");
		$(".stats [data-tab=" + c + "]").attr("data-selected", true).find("i").addClass("tab-selected");
		$(".profile-tabs-container").find("[data-tab]").removeAttr("data-selected").find("i").removeClass("tab-selected");
		$(".profile-tabs-container [data-tab=" + c + "]").attr("data-selected", true).find("i").addClass("tab-selected");
		var d = $("section[data-tab=" + c + "]");
		d.attr("data-selected", true).siblings().removeAttr("data-selected");
		var e = "/users/" + b.user_id + "/" + c;
		var a = {};
		if (!d.is("[data-loaded]")) {
			if (c === "friends") {
				e = "/friendships/profile";
				a = {
					user_id: b.user_id
				}
			}
			b.tabDisabled = true;
			$.ajax({
				url: e,
				data: a,
				dataType: "html",
				success: function(f) {
					d.attr("data-loaded", true).html(f)
				},
				complete: function() {
					b.tabDisabled = false;
					spree.shrinkToFit()
				}
			})
		}
	},
	selectAction: function(c) {
		if (this.actionDisabled || (!(_.include(this.actions, c)))) {
			return
		}
		var b = this;
		$(".profile-stats").find("[data-action]").removeAttr("data-selected");
		$(".profile-stats [data-action=" + c + "]").attr("data-selected", true);
		var a = ".profile-grid .profile-grid-tab[data-action=" + c + "]";
		var d = $(a);
		d.attr("data-selected", true).siblings().removeAttr("data-selected");
		if (!d.is("[data-loaded]")) {
			b.actionDisabled = true;
			$.ajax({
				url: "/users/" + b.user_id + "/event_actions",
				data: {
					event_action: c
				},
				dataType: "html",
				success: function(e) {
					d.attr("data-loaded", true).find(".profile-content").html(e);
					Time.localizeDOM(a)
				},
				complete: function() {
					b.actionDisabled = false;
					spree.shrinkToFit()
				}
			})
		}
	},
	performActions: function(a) {
		this._super(a);
		if (a) {
			if (a.profile) {
				spree.toggleFollowItem("follow_button_User_" + this.user_id, true, 2)
			} else {
				if (a.friends) {
					spree.addFriend("profile_add_friend_" + this.user_id)
				}
			}
		}
	}
});
var FriendsList = Class.extend({
	init: function() {
		if (spree.user && spree.user.has_been_authenticated && spree.profile && spree.user.user_id === spree.pageController.user_id) {
			this.markFriendshipsSeen()
		}
		this.bindListeners()
	},
	bindListeners: function() {
		var a = this;
		$("#friendships-list").on("click", ".page", function() {
			var c = $(this);
			var g = c.data("page-num");
			var d = c.data("page-size");
			var h = $("." + c.parents("#pagination").data("paginate-list"));
			var b = c.parents("#pagination").data("paginate-route");
			var e = spree.pageController.user_id;
			var f = {
				page: g,
				pagesize: d,
				user_id: e
			};
			$.ajax({
				url: b,
				data: f,
				type: "GET",
				dataType: "html",
				success: function(i) {
					h.html(i)
				}
			})
		})
	},
	markFriendshipsSeen: function() {
		var a = "/friendships/mark_all_seen";
		var b = "PUT";
		$.ajax({
			url: a,
			data: {
				user_id: spree.pageController.user_id
			},
			type: b
		})
	}
});
var SpreeAccount = PageController.extend({
	init: function(a, f, g, e) {
		this.user_id = a;
		this._super();
		this.tabs = ["spreecasts", "upcoming", "settings"];
		this.userActions = ["personal", "notifications", "privacy", "blocking", "payments", "ppv", "ads"];
		this.eventActions = ["created", "purchased", "upcoming"];
		this.bindEvents();
		var d = f || this.tabs[0];
		var b = g || "/my_spreecasts";
		var c = {
			tab_action: e || this.eventActions[0]
		};
		this.selectTab(d, b, c);
		spree.account = spree.pageController = this
	},
	bindEvents: function() {
		var a = this;
		$(".tabs-container").on("click", "[data-tab]", function() {
			$(".payment-processing-overlay").attr("data-processing", true);
			a.selectTab($(this).data("tab"), $(this).data("tab-url"))
		});
		$("[data-tab=settings]").on("click", ".account-options-tab", function() {
			$(".payment-processing-overlay").attr("data-processing", true);
			a.selectUserAction($(this).data("action"), $(this).data("action-url"))
		});
		$("[data-tab=spreecasts]").on("click", ".account-options-tab", function() {
			$(".payment-processing-overlay").attr("data-processing", true);
			a.selectEventAction($(this).data("action"), $(this).data("action-url"))
		});
		$(document).on("click", ".spreecast-account-show-more", function() {
			var g = $(this);
			g.attr("disabled", true);
			var f = $("ul.account-event-options [data-selected=true]").data("action");
			var d = $("ul.account-event-options [data-selected=true]").data("action-url");
			var b = parseInt(g.data("page"));
			var e = b + 1;
			var c = g.data("event-type");
			params = {
				event_type: c,
				page: e
			};
			$.ajax({
				url: d,
				data: params,
				dataType: "html",
				complete: function(h) {
					g.attr("disabled", false)
				},
				success: function(i) {
					g.remove();
					var h = $(".account-settings-tab[data-action=" + f + "] ." + c + "." + b);
					h.after($(i))
				}
			})
		});
		$(document).on("click", ".expired-upgrade", function() {
			if (spree.account) {
				spree.account.selectTab("settings", "/users/edit", {
					tab_action: "payments"
				})
			}
		})
	},
	selectTab: function(b, e, c) {
		if (this.disabled || (!(_.include(this.tabs, b)))) {
			return
		}
		var a = this;
		$(".owner-categories").find("[data-tab]").removeAttr("data-selected").removeClass("tab-selected");
		$(".owner-categories [data-tab=" + b + "]").attr("data-selected", true).addClass("tab-selected");
		$(".tabs-container").find("[data-tab]").removeAttr("data-selected").removeClass("tab-selected");
		$(".tabs-container [data-tab=" + b + "]").attr("data-selected", true).addClass("tab-selected");
		if (!c) {
			c = {}
		}
		c.partial = b;
		var d = $("section[data-tab=" + b + "]");
		d.attr("data-selected", true).siblings().removeAttr("data-selected");
		if (!d.is("[data-loaded]")) {
			a.disabled = true;
			$.ajax({
				url: e,
				data: c,
				dataType: "html",
				success: function(f) {
					$(".payment-processing-overlay").removeAttr("data-processing");
					d.attr("data-loaded", true).html(f)
				},
				complete: function() {
					a.disabled = false;
					spree.shrinkToFit()
				}
			})
		} else {
			if (c && c.tab_action) {
				if (b === "spreecasts") {
					this.selectEventAction(c.tab_action)
				} else {
					this.selectUserAction(c.tab_action)
				}
			} else {
				$(".payment-processing-overlay").removeAttr("data-processing")
			}
		}
	},
	selectUserAction: function(f, e, d) {
		if (!(_.include(this.userActions, f))) {
			return
		}
		var c = this;
		$(".account-user-options").find("[data-action]").removeAttr("data-selected");
		$(".account-user-options [data-action=" + f + "]").attr("data-selected", true);
		if (!d) {
			d = {}
		}
		d.partial = f;
		d.user_id = c.user_id;
		var b = e;
		if (!b) {
			if (f === "personal") {
				b = "/users/edit"
			} else {
				if (f === "notifications") {
					b = "/users/edit"
				} else {
					if (f === "privacy") {
						b = "/users/edit"
					} else {
						if (f === "blocking") {
							b = "/friendships/blocking"
						} else {
							if (f === "payments") {
								b = "/subscriptions/show"
							} else {
								if (f === "ads") {
									b = "/subscriptions/get_settings"
								} else {
									if (f === "ppv") {
										b = "/users/edit"
									} else {
										b = "/subscriptions/show"
									}
								}
							}
						}
					}
				}
			}
		}
		var a = ".account-user-settings-container .account-settings-tab[data-action=" + f + "]";
		var g = $(a);
		g.attr("data-selected", true).siblings().removeAttr("data-selected");
		if (!g.is("[data-loaded]") || f === "payments") {
			c.disabled = true;
			$.ajax({
				url: b,
				data: d,
				dataType: "html",
				success: function(h) {
					$(".payment-processing-overlay").removeAttr("data-processing");
					g.attr("data-loaded", true).find(".account-settings-content").html(h)
				},
				complete: function() {
					$(".payment-processing-overlay").removeAttr("data-processing");
					c.disabled = false;
					spree.shrinkToFit()
				}
			})
		} else {
			$(".payment-processing-overlay").removeAttr("data-processing")
		}
	},
	selectEventAction: function(f, e, d) {
		if (!(_.include(this.eventActions, f))) {
			return
		}
		var c = this;
		$(".account-event-options").find("[data-action]").removeAttr("data-selected");
		$(".account-event-options [data-action=" + f + "]").attr("data-selected", true);
		if (!d) {
			d = {}
		}
		d.partial = f;
		var b = e;
		if (!b) {
			if (f === "purchased") {
				b = "/my_purchased"
			} else {
				if (f === "upcoming") {
					b = "/my_upcoming"
				} else {
					b = "/my_created"
				}
			}
		}
		var a = ".account-event-settings-container .account-settings-tab[data-action=" + f + "]";
		var g = $(a);
		g.attr("data-selected", true).siblings().removeAttr("data-selected");
		if (!g.is("[data-loaded]") || f === "payments") {
			c.disabled = true;
			$.ajax({
				url: b,
				data: d,
				dataType: "html",
				success: function(h) {
					$(".payment-processing-overlay").removeAttr("data-processing");
					g.attr("data-loaded", true).find(".account-settings-content").html(h)
				},
				complete: function() {
					$(".payment-processing-overlay").removeAttr("data-processing");
					c.disabled = false;
					spree.shrinkToFit()
				}
			})
		} else {
			$(".payment-processing-overlay").removeAttr("data-processing")
		}
	}
});
var Payment = Class.extend({
	init: function() {
		this.checkAutoFill();
		this.bindEvents()
	},
	bindErrorEvents: function(b) {
		var a = this;
		$("#card-billing").blur(function() {
			a.cardValid = false;
			$this = $(this);
			if ($this.data("has-card") === true && !$this.val()) {
				b ? $this.removeClass("billing-field-error") : $(".card-error").attr("hidden", true);
				a.cardValid = true
			} else {
				if (!$this.val()) {
					b ? $this.addClass("billing-field-error") : $(".card-error").removeAttr("hidden").text("Card number is required")
				} else {
					if (!Stripe.card.validateCardNumber($this.val())) {
						b ? $this.addClass("billing-field-error") : $(".card-error").removeAttr("hidden").text("Invalid credit card")
					} else {
						b ? $this.removeClass("billing-field-error") : $(".card-error").attr("hidden", true);
						a.cardValid = true
					}
				}
			}
			a.checkValidSubmit()
		});
		$("#cvc-billing").blur(function() {
			a.cvcValid = false;
			$this = $(this);
			if ($this.data("has-card") === true && !$this.val()) {
				b ? $this.removeClass("billing-field-error") : $(".cvc-error").attr("hidden", true);
				a.cvcValid = true
			} else {
				if (!$this.val()) {
					b ? $this.addClass("billing-field-error") : $(".cvc-error").removeAttr("hidden").text("CVC is required")
				} else {
					if (!Stripe.card.validateCVC($this.val())) {
						b ? $this.addClass("billing-field-error") : $(".cvc-error").removeAttr("hidden").text("Invalid CVC")
					} else {
						b ? $this.removeClass("billing-field-error") : $(".cvc-error").attr("hidden", true);
						a.cvcValid = true
					}
				}
			}
			a.checkValidSubmit()
		});
		$("#expiration-month-billing, #expiration-year-billing").blur(function() {
			a.expValid = false;
			var e = $("#expiration-month-billing");
			var d = $("#expiration-year-billing");
			var g = e.val();
			var f = d.val();
			var c = g && f;
			if ($(this).data("has-card") === true && !(g || f)) {
				if (b) {
					e.removeClass("billing-field-error");
					d.removeClass("billing-field-error")
				} else {
					$(".expiry-error").attr("hidden", true)
				}
				a.expValid = true
			} else {
				if (!(g || f)) {
					if (b) {
						e.addClass("billing-field-error");
						d.addClass("billing-field-error")
					} else {
						$(".expiry-error").removeAttr("hidden").text("Expiration date is required")
					}
				} else {
					if (c && !Stripe.card.validateExpiry(g, f)) {
						if (b) {
							e.addClass("billing-field-error");
							d.addClass("billing-field-error")
						} else {
							$(".expiry-error").removeAttr("hidden").text("Invalid expiration date")
						}
					} else {
						if (b) {
							e.removeClass("billing-field-error");
							d.removeClass("billing-field-error")
						} else {
							$(".expiry-error").attr("hidden", true)
						}
						a.expValid = true
					}
				}
			}
			a.checkValidSubmit()
		});
		$("#full-name-billing").blur(function() {
			$this = $(this);
			var c = $this.val();
			a.nameValid = false;
			if ($(this).data("billing-type") === "stripe" && !c) {
				b ? $this.removeClass("billing-field-error") : $(".name-error").attr("hidden", true);
				a.nameValid = true
			} else {
				if (!c) {
					b ? $this.addClass("billing-field-error") : $(".name-error").removeAttr("hidden").text("Name is required")
				} else {
					if (c.length < 3) {
						b ? $this.addClass("billing-field-error") : $(".name-error").removeAttr("hidden").text("Name must be at least 3 characters")
					} else {
						b ? $this.removeClass("billing-field-error") : $(".name-error").attr("hidden", true);
						a.nameValid = true
					}
				}
			}
			a.checkValidSubmit()
		});
		$("#email-billing").blur(function() {
			$this = $(this);
			var c = $this.val();
			a.emailValid = false;
			if ($this.data("billing-type") === "stripe" && !c) {
				b ? $this.removeClass("billing-field-error") : $(".email-error").attr("hidden", true);
				a.emailValid = true
			} else {
				if (!c) {
					b ? $this.addClass("billing-field-error") : $(".email-error").removeAttr("hidden").text("E-mail is required")
				} else {
					if (!spree.validateEmail(c)) {
						b ? $this.addClass("billing-field-error") : $(".email-error").removeAttr("hidden").text("E-mail is invalid")
					} else {
						b ? $this.removeClass("billing-field-error") : $(".email-error").attr("hidden", true);
						a.emailValid = true
					}
				}
			}
			a.checkValidSubmit()
		})
	},
	checkAutoFill: function() {
		var a = this;
		if (a.hasExistingCard = $("#card-billing").data("has-card")) {
			a.cardValid = true;
			a.cvcValid = true;
			$("#submit-payment-billing").removeAttr("disabled")
		}
		if ($("#full-name-billing").val()) {
			a.nameValid = true
		}
		if ($("#email-billing").val()) {
			a.emailValid = true
		}
		if ($("#expiration-month-billing").val() && $("#expiration-year-billing").val()) {
			a.expValid = true
		}
	},
	checkValidSubmit: function() {
		var a = this;
		$(".stripe-errors").attr("hidden", true);
		if (a.nameValid && a.emailValid && a.cardValid && a.cvcValid && a.expValid) {
			$("#submit-payment-billing").removeAttr("disabled");
			return true
		} else {
			$("#submit-payment-billing").attr("disabled", true);
			return false
		}
	}
});
var Subscription = Class.extend({
	init: function() {
		this.bindEvents()
	},
	bindEvents: function() {
		var a = this;
		$(".plan").on("click", ".subscription", function(g) {
			var f = $(this);
			var d = f.data("stripe-id");
			var b = f.data("plan-name");
			var h = f.data("plan-action");
			if (b === "Basic") {
				if (h === "Downgrade") {
					new GeneralConfirm({
						question: "A friendly warning!",
						confirmText: "Downgrade",
						confirmCB: function() {
							if (spree.account) {
								$(".payment-processing-overlay").attr("data-processing", true);
								$(".accounts-main").removeAttr("data-loaded");
								$(".account-user-settings-container .account-settings-tab").removeAttr("data-loaded")
							}
							$.ajax({
								url: "/subscriptions/update_subscription",
								type: "POST",
								data: {
									plan_name: b
								},
								success: function() {
									if (spree.account) {
										spree.account.selectUserAction("payments", "/subscriptions/show")
									} else {
										window.location.href = "/home"
									}
								},
								error: function(j, e, i) {
									$(".payment-processing-overlay").removeAttr("data-processing")
								}
							})
						},
						cancelText: "Cancel",
						text: "You will immediately lose access to the features of your current plan."
					})
				} else {
					window.location.href = "/get_started"
				}
			} else {
				if (spree.account) {
					var c = {
						stripe_plan_id: d,
						plan_name: b
					};
					$(".payment-processing-overlay").attr("data-processing", true);
					spree.account.selectUserAction("payments", "/subscriptions/payment", c)
				} else {
					window.location.href = "/subscriptions/payment?stripe_plan_id=" + d + "&plan_name=" + b
				}
			}
		});
		$("#contact-platinum").on("click", function(b) {
			spree.modalMgr.create("platinum-contact", function() {
				$("#contact-platinum-form").submit(function(c) {
					c.preventDefault();
					$.ajax({
						url: "/subscriptions/platinum_contact",
						type: "POST",
						data: {
							full_name: $("#full-name-contact").val(),
							email: $("#email-contact").val(),
							phone: $("#phone-contact").val()
						},
						success: function() {
							spree.modalMgr.showNext("platinum-thank-you", "platinum-contact")
						},
						error: function(f, d, e) {
							$("#top_error").text(JSON.parse(f.responseText).response)
						}
					})
				})
			})
		});
		$("#cancel-plan").on("click", function(b) {
			new GeneralConfirm({
				question: "A friendly warning!",
				confirmText: "Cancel my plan",
				confirmCB: function() {
					if (spree.account) {
						$(".payment-processing-overlay").attr("data-processing", true);
						$(".accounts-main").removeAttr("data-loaded");
						$(".account-user-settings-container .account-settings-tab").removeAttr("data-loaded")
					}
					$.ajax({
						url: "/subscriptions/cancel_subscription",
						type: "POST",
						success: function() {
							if (spree.account) {
								spree.account.selectUserAction("payments", "/subscriptions/show")
							} else {
								window.location.href = "/home"
							}
						},
						error: function(e, c, d) {
							$(".payment-processing-overlay").removeAttr("data-processing")
						}
					})
				},
				cancelText: "Return to billing",
				text: "You will immediately lose access to the features of your current plan."
			})
		});
		$("#request-features").on("click", function(b) {
			spree.modalMgr.create("feature-request", function() {
				$("#feature-request-form").submit(function(c) {
					c.preventDefault();
					$.ajax({
						url: "/subscriptions/info_contact",
						type: "POST",
						data: {
							info: $("#info-contact").val()
						},
						success: function() {
							spree.modalMgr.showNext("feature-request-thank-you", "feature-request")
						},
						error: function(f, d, e) {
							$("#top_error").text(JSON.parse(f.responseText).response)
						}
					})
				})
			}, null, {
				header: "Request a change to my plan",
				bodyText: "Let us know what you're interested in and we will get in touch with you shortly."
			})
		});
		$(".plan").on("click", "#see-plan-details", function() {
			if (spree.account) {
				$(".payment-processing-overlay").attr("data-processing", true);
				spree.account.selectUserAction("payments", "/subscriptions/show_plans_detailed")
			} else {
				window.location.href = "/subscriptions/plans/details"
			}
		});
		$("#view-invoices, #invoices-return").on("click", function() {
			if (spree.account) {
				$(".payment-processing-overlay").attr("data-processing", true);
				spree.account.selectUserAction("payments", "/subscriptions/get_invoices")
			}
		});
		$("#plan-return").on("click", function() {
			if (spree.account) {
				$(".payment-processing-overlay").attr("data-processing", true);
				spree.account.selectUserAction("payments", "/subscriptions/show")
			} else {
				window.location.href = "/plans"
			}
		});
		$(".invoice-details-btn, .invoice-details").on("click", function() {
			if (spree.account) {
				var b = {
					invoice: $(this).data("invoice")
				};
				$(".payment-processing-overlay").attr("data-processing", true);
				spree.account.selectUserAction("payments", "/subscriptions/get_invoice", b)
			}
		});
		$("#print-invoice").on("click", function() {
			window.print()
		});
		$("#edit-payments").on("click", function() {
			if (spree.account) {
				$(".payment-processing-overlay").attr("data-processing", true);
				spree.account.selectUserAction("payments", "/subscriptions/edit_payment")
			}
		});
		$(".ad-setting-header").on("change", ".on-off-switch-checkbox", function() {
			var b = this.checked;
			$.ajax({
				url: "/subscriptions/set_ad_settings",
				type: "PUT",
				data: {
					wants_ads: b
				},
				success: function() {
					if ($provisioning = $(".vast-not-provisioned")) {
						$provisioning.toggleClass("invisible", !b)
					}
					$(".vast-tag-field, .submit-vast-tag").attr("disabled", !b)
				},
				error: function(e, c, d) {
					console.log("Error", d)
				}
			})
		})
	}
});
var PlanPayment = Payment.extend({
	init: function(a, b) {
		this.planName = a;
		this.stripePlanId = b;
		this.checkAutoFill();
		this.bindErrorEvents(false);
		this.bindEvents()
	},
	bindEvents: function() {
		var a = this;
		$("#cancel-billing").on("click", function(b) {
			$form = $("#purchase-form");
			opts = {
				question: "Cancel purchase?",
				confirm: "Yes, cancel purchase",
				cancel: "No, return to payment",
				text: "Would you like to cancel your purchase?"
			};
			if ($(this).data("payment-status") === "edit") {
				opts.question = "Cancel your changes?";
				opts.confirm = "Yes, cancel changes";
				opts.cancel = "No, keep editing";
				opts.text = "Would you like to cancel changes <br /> made to your payment information?"
			}
			new GeneralConfirm({
				question: opts.question,
				confirmText: opts.confirm,
				confirmCB: function() {
					$form.get(0).reset();
					if (spree.account) {
						$(".payment-processing-overlay").attr("data-processing", true);
						spree.account.selectUserAction("payments", "/subscriptions/show")
					} else {
						window.location.href = "/plans"
					}
				},
				cancelText: opts.cancel,
				text: opts.text
			})
		});
		$("#purchase-form").submit(function(c) {
			c.preventDefault();
			var b = $(this).data("payment-status");
			a.purchaseSubscription(b)
		})
	},
	updateUserSubscription: function(b, a, c) {
		if (b && b.error) {
			$(".stripe-errors").removeAttr("hidden").text(b.error.message);
			$(".payment-processing-overlay").removeAttr("data-processing")
		} else {
			params = {
				name: $("#full-name-billing").val(),
				email: $("#email-billing").val(),
				plan_name: a,
				stripe_plan_id: c
			};
			if (phone = $("#phone-billing").val()) {
				params.phone = phone
			}
			if (b && b.id) {
				params.cc_token = b.id
			}
			$.ajax({
				type: "POST",
				url: "/subscriptions/update_subscription",
				data: params,
				success: function(e, f, d) {
					if (spree.account) {
						$(".payment-processing-overlay").removeAttr("data-processing");
						$(".accounts-main").removeAttr("data-loaded");
						$(".account-user-settings-container .account-settings-tab").removeAttr("data-loaded")
					}
					new GeneralConfirm({
						question: "Plan purchased",
						confirmText: spree.account ? "Back to plans" : "Get started",
						confirmCB: function() {
							if (spree.account) {
								$(".payment-processing-overlay").attr("data-processing", true);
								spree.account.selectUserAction("payments", "/subscriptions/show")
							} else {
								window.location.href = "/get_started"
							}
						},
						text: "Your plan was successfully purchased."
					})
				},
				error: function(f, d, e) {
					$(".payment-processing-overlay").removeAttr("data-processing");
					$(".stripe-errors").removeAttr("hidden").text(JSON.parse(f.responseText).response)
				}
			})
		}
	},
	updatePaymentInfo: function(a) {
		if (a && a.error) {
			$(".stripe-errors").removeAttr("hidden").text(a.error.message);
			$(".payment-processing-overlay").removeAttr("data-processing")
		} else {
			params = {};
			if (name = $("#full-name-billing").val()) {
				params.name = name
			}
			if (email = $("#email-billing").val()) {
				params.email = email
			}
			if (phone = $("#phone-billing").val()) {
				params.phone = phone
			}
			if (a && a.id) {
				params.cc_token = a.id
			}
			$.ajax({
				type: "POST",
				url: "/subscriptions/update_payment",
				data: params,
				success: function(c, d, b) {
					if (spree.account) {
						$(".payment-processing-overlay").removeAttr("data-processing");
						$(".accounts-main").removeAttr("data-loaded");
						$(".account-user-settings-container .account-settings-tab").removeAttr("data-loaded")
					}
					new GeneralConfirm({
						question: "Payment information saved",
						confirmText: spree.account ? "Back to plans" : "Get started",
						confirmCB: function() {
							if (spree.account) {
								$(".payment-processing-overlay").attr("data-processing", true);
								spree.account.selectUserAction("payments", "/subscriptions/show")
							} else {
								window.location.href = "/get_started"
							}
						},
						text: "Your payment information was successfully saved."
					})
				},
				error: function(d, b, c) {
					$(".payment-processing-overlay").removeAttr("data-processing");
					$(".stripe-errors").removeAttr("hidden").text(JSON.parse(d.responseText).response)
				}
			})
		}
	},
	purchaseSubscription: function(b) {
		var a = this;
		$(".payment-processing-overlay").attr("data-processing", true);
		if ($("#card-billing").data("has-card") && !$("#card-billing").val()) {
			if (b === "edit") {
				a.updatePaymentInfo()
			} else {
				a.updateUserSubscription(null, a.planName, a.stripePlanId)
			}
		} else {
			Stripe.createToken({
				name: $("#full-name-billing").val(),
				number: $("#card-billing").val(),
				cvc: $("#cvc-billing").val(),
				exp_month: $("#expiration-month-billing").val(),
				exp_year: $("#expiration-year-billing").val()
			}, function(c, d) {
				if (b === "edit") {
					a.updatePaymentInfo(d)
				} else {
					a.updateUserSubscription(d, a.planName, a.stripePlanId)
				}
			})
		}
	}
});
var SpreeAnalytics = Class.extend({
	init: function() {
		window._gaq = window._gaq || [];
		if ($.cookie("analytics")) {
			var a = $.cookie("analytics").split("/");
			var b = a[0];
			var c = a[1];
			console.log("Logging from cookie ", b, c);
			this.log({
				category: b,
				action: c
			});
			$.removeCookie("analytics")
		}
	},
	log: function(b) {
		if (b) {
			console.log("LOGGING", JSON.stringify(b));
			var a = {
				A: "ga.counts",
				a: b.category,
				b: b.action
			};
			this.send(a);
			window._gaq.push(["_trackEvent", b.category, b.action, b.label, b.value, b.noninteract])
		}
	},
	send: function(a) {
		$.ajax({
			type: "POST",
			url: "/log/transaction",
			data: {
				data: JSON.stringify(a)
			}
		})
	}
});
var FbSharer = Class.extend({
	init: function(b) {
		this.url = b.url;
		this.name = b.name;
		this.imageUrl = b.imageUrl;
		this.description = b.description;
		this.$count = b.$count;
		this.$button = b.$button;
		this.id = Math.random();
		if (window.FB) {
			this.setup()
		} else {
			var a = this;
			$(document).on("fb:init", function() {
				a.setup()
			})
		}
	},
	setup: function() {
		var a = this;
		$(this.$button).on("click", function() {
			var c = a.url + "?share=facebook";
			spree.registerShare(c, "facebook", 0);
			var b = a.imageUrl.indexOf("http") != 0 ? ("http:" + a.imageUrl) : a.imageUrl;
			FB.ui({
				method: "feed",
				link: c,
				picture: b,
				caption: "Spreecast",
				name: a.name,
				description: a.description
			}, function(d) {
				if (d && d.post_id) {
					spree.registerShare(a.url, "facebook", 1)
				}
			})
		})
	}
});
var PhotoUploader = Class.extend({
	init: function(b) {
		this.type = b.type;
		this.id = b.id;
		this.ratio = b.ratio;
		this.$image = b.$image;
		this.$button = b.$button;
		this.$progress = b.$progress;
		this.$input = b.$input;
		this.$delete = b.$delete;
		if (this.$image) {
			this.originalSrc = this.$image.attr("src")
		}
		var a = this;
		if (this.$delete) {
			this.$delete.on("click", function() {
				if (confirm("Are you sure you want to delete this image?")) {
					if (a.$input) {
						a.$input.val(null);
						a.$image.attr("src", a.originalSrc);
						a.$delete.hide()
					} else {
						$.ajax({
							url: "/" + a.type + "s/" + a.id + "/delete_image",
							type: "PUT",
							data: {
								type: a.type,
								id: a.id
							},
							success: function() {
								window.location.reload(true)
							}
						})
					}
				}
			})
		}
		this.$button.click(function() {
			var d = {
				extension: [".jpg", ".jpeg", ".png", ".gif"],
				services: ["COMPUTER", "FACEBOOK", "INSTAGRAM", "FLICKR", "PICASA", "URL", "DROPBOX", "GOOGLE_DRIVE", "GMAIL"]
			};
			filepicker.pick(d, function(e) {
				a.showProgress();
				$.ajax({
					url: "/uploads",
					type: "POST",
					dataType: "JSON",
					data: _.extend(e, {
						type: a.type
					}),
					success: function(f) {
						a.hideProgress();
						a.launch(_.extend(f, {
							filename: e.filename
						}))
					}
				})
			})
		});
		var c = ("https:" == document.location.protocol ? "https://dme0ih8comzn4.cloudfront.net/js/feather.js" : "http://feather.aviary.com/js/feather.js");
		$.getScript(c, function() {
			a.featherEditor = new Aviary.Feather({
				apiKey: "usqwLzthskSaD2MzoSjcYQ",
				apiVersion: 2,
				tools: "crop",
				initTool: "crop",
				appendTo: "",
				cropPresets: [a.ratio],
				cropPresetsStrict: true,
				maxSize: 1280,
				onSave: function(e, f) {
					a.showProgress();
					a.featherEditor.disableControls();
					a.featherEditor.showWaitIndicator();
					var d = a.id ? ("/" + a.type + "s/" + a.id + "/save_image") : "/uploads/save";
					$.ajax({
						url: d,
						type: "PUT",
						data: {
							key: a.filename,
							url: f,
							type: a.type
						},
						success: function(g) {
							a.$image.attr("src", g);
							a.featherEditor.hideWaitIndicator();
							a.featherEditor.enableControls();
							a.featherEditor.close();
							a.hideProgress();
							if (!a.id) {
								a.$input.attr("value", g)
							}
						},
						error: function(g) {
							a.featherEditor.enableControls();
							a.featherEditor.hideWaitIndicator()
						}
					})
				},
				onError: function(d) {
					console.log("Aviary error:", d)
				}
			})
		})
	},
	launch: function(b) {
		var a = b.url;
		this.filename = b.filename;
		$("<img/>", {
			id: "uploader_placeholder_image",
			src: a,
			style: "display:none"
		}).appendTo($("body"));
		this.featherEditor.launch({
			image: "uploader_placeholder_image",
			url: a
		})
	},
	hideProgress: function() {
		this.$image.show();
		this.$progress.hide()
	},
	showProgress: function() {
		this.$image.hide();
		this.$progress.show()
	}
});
var GeneralConfirm = Class.extend({
	init: function(a) {
		var b = spree.hbTemplate("general-confirm", a);
		spree.createModal(b, a.width || 430, modalClass = ["general-confirm", a.dialogClass].join(" "));
		_.each(["confirm", "cancel"], function(d) {
			var c = d + "CB";
			$(b).find("input." + d).on("click", function() {
				spree.closeModal = function() {};
				$("#popin").dialog("close");
				if (a[c]) {
					a[c]()
				}
			})
		})
	}
});
var AccountManager = Class.extend({
	init: function() {
		this.bindEvents()
	},
	bindEvents: function() {
		var a = this;
		$(".toggle-details").on("click", function(c) {
			var b = $(this);
			b.siblings(".details").toggleClass("hide");
			b.find(".edit").toggleClass("up")
		});
		$("[data-section=email]").on("click", "[data-action]", function() {
			var b = $(this);
			var c = b.attr("data-email-type"),
				d = b.attr("data-action"),
				e = b.attr("data-email-id");
			if (c == "alternate") {
				return new GeneralConfirm({
					question: "Remove email address",
					buttonList: ["confirm", "cancel"],
					confirmClass: "default-button",
					confirmText: "Yes, delete it.",
					text: "Are you sure you want to remove this email address?",
					confirmCB: function() {
						$.ajax({
							type: "DELETE",
							url: "/users/" + spree.user.user_id + "/email_addresses/" + e,
							success: function(f) {
								a.reloadAccountInfo()
							}
						})
					},
					buttonColor: "",
					cancelClass: "default-button",
					cancelText: "No, keep it.",
					defaultButton: "confirm",
					defaultColor: ""
				})
			}
			if (d == "add") {
				AccountManager.addEmailAddress(spree.user.user_id, null, null, a.reloadAccountInfo)
			} else {
				if (d == "resend") {
					$.ajax({
						url: "/users/" + spree.user.user_id + "/email_addresses/" + e + "/resend",
						type: "POST",
						complete: function(f) {
							b.attr("disabled", true).text("Confirmation resent")
						}
					})
				}
			}
		});
		$("[data-section=email]").on("click", ".make-primary", function() {
			$newPrimaryEmail = $(this);
			email = $newPrimaryEmail.data("email-id");
			console.log("Make Primary Email", email);
			$.ajax({
				url: "/users/" + spree.user.user_id + "/email_addresses/update_primary",
				type: "PUT",
				data: {
					primary_email_address: email
				},
				success: function(b) {
					$newPrimaryEmail.parents(".email-addresses").find(".email-status.primary").removeClass("primary");
					$newPrimaryEmail.parents(".email-address").find(".email-status").addClass("primary")
				}
			})
		});
		$("#password-form").submit(function(b) {
			a.updatePassword(a.reloadAccountInfo)
		});
		$("[data-section=accounts]").on("click", "[data-action]", function() {
			var b = $(this).attr("data-provider");
			$.ajax({
				url: "/authentications/" + $(this).attr("data-auth-id"),
				type: "DELETE",
				complete: function(c) {
					a.reloadAccountInfo()
				}
			})
		});
		$("#deactivate-account, #delete-account").on("click", function() {
			var b = $(this),
				f = spree.user.alt,
				c = b.data("locked-state"),
				d = c.substring(0, 1).toUpperCase() + c.substring(1);
			b.attr("disabled", true);
			var e = "Are you sure you want to " + c + " your account?";
			if (c === "delete") {
				e += " All spreecasts created with your account will be deleted. This action can not be undone."
			}
			new GeneralConfirm({
				question: d + " Account",
				confirmText: d,
				confirmCB: function() {
					a.lockUser(c, b)
				},
				cancelCB: function() {
					b.attr("disabled", false)
				},
				cancelText: "Cancel",
				text: e
			})
		})
	},
	lockUser: function(a, b) {
		$.ajax({
			url: "/users/" + spree.user.alt + "/lock_account",
			type: "POST",
			data: {
				locked_state: a
			},
			complete: function(c) {
				window.location.reload()
			},
			error: function() {
				new GeneralConfirm({
					question: "An error occurred",
					confirmText: "Ok",
					confirmCB: function() {
						b.attr("disabled", false)
					},
					text: "An error occurred processing your request. Please try again later."
				})
			}
		})
	},
	reloadAccountInfo: function() {
		var a = ".account-user-settings-container .account-settings-tab[data-action=personal]";
		$(a).removeAttr("data-loaded");
		spree.account.selectUserAction("personal")
	},
	updatePassword: function(b) {
		var a = $("#password-form");
		a.on("ajax:error", function(d, c) {
			spree.formErrors(c)
		});
		a.on("ajax:success", function(d, c) {
			$("form .error").empty().removeClass("error");
			a.get(0).reset();
			$("#set-password").attr("disabled", true);
			$("#password-success").toggleClass("hide");
			setTimeout(b, 2000)
		})
	}
});
AccountManager.addMobileEmailAddress = function(a, b) {
	$.ajax({
		url: "/users/" + spree.user.user_id + "/email_addresses",
		type: "GET",
		dataType: "json",
		error: function() {},
		success: function(c) {
			params = {
				partial: "add_email"
			};
			$.ajax({
				url: "/signup",
				data: params,
				dataType: "html",
				success: function(e) {
					var f = $("#mobile-registrations");
					f.html(e);
					var d = $(".add-email-form").find("form");
					d.attr("action", "/users/" + spree.user.user_id + "/email_addresses");
					d.submit(function(i) {
						var g = d.find("#email_address_email").val();
						var h = {
							"email_address[email]": g
						};
						if (d.find("input[name=follow_spreecast_input]").prop("checked")) {
							d.append("<input type='hidden' id='follow_spreecast' name='follow_spreecast' value='true'/>")
						}
					});
					d.on("ajax:error", function(h, g) {
						spree.formErrors(g)
					});
					d.on("ajax:success", function(h, g) {
						if (b) {
							b(h, g)
						}
					})
				}
			})
		}
	})
};
AccountManager.addEmailAddress = function(b, c, d, a) {
	c = c || {};
	$.ajax({
		url: "/users/" + spree.user.user_id + "/email_addresses",
		type: "GET",
		dataType: "json",
		error: function() {},
		success: function(e) {
			spree.modalMgr.create("add-email-address", function(g) {
				g.on("hidden", function() {
					if (d) {
						d()
					}
				});
				var f = g.find("form");
				f.attr("action", "/users/" + spree.user.user_id + "/email_addresses");
				f.submit(function(j) {
					var h = f.find("#email_address_email").val();
					var i = {
						"email_address[email]": h
					};
					if (f.find("input[name=follow_spreecast_input]").prop("checked")) {
						f.append("<input type='hidden' id='follow_spreecast' name='follow_spreecast' value='true'/>")
					}
				});
				f.on("ajax:error", function(i, h) {
					spree.formErrors(h)
				});
				f.on("ajax:success", function(i, h) {
					g.modal("hide");
					if (a) {
						a(i, h)
					}
				})
			}, null, _.extend(c, {
				promptFollowSpreecast: e.promptFollowSpreecast
			}))
		}
	})
};
var BucketManager = Class.extend({
	init: function(a) {
		this.bucket_info_json = a
	},
	serviceEnabled: function(a) {
		var d = $.cookie("spreekey");
		if (!d) {
			return false
		}
		var c = spree.decodeBase62(d.substring(d.length - 5, d.length));
		var b = (c % this.bucket_info_json[a]["bucket_count"]) < this.bucket_info_json[a]["allowed_buckets"];
		return b
	}
});
var FirebaseManager = Class.extend({
	init: function(c, b) {
		this.initialized = false;
		this.shouldWritePresence = false;
		if (!(spree.event && spree.eventIsScheduledOrLive()) && !(spree.user && spree.user.has_been_authenticated)) {
			return
		}
		this.app = b;
		this.root_url = "https://" + c + ".firebaseio.com/";
		this.connection_db = new Firebase(this.root_url + "/.info/connected");
		this.db = new Firebase(this.root_url + window.scm_env);
		this.token = $("#firebase-token-replacement").attr("data-token");
		this.imsLoaded = false;
		this.presence_db = null;
		if (spree.user && spree.user.has_been_authenticated) {
			this.shouldWritePresence = true
		}
		var a = this;
		this.db.auth(this.token, function(d) {
			if (d) {
				spree.ecma.ecma.loggingController().logIncident("", "firebase", "authentication", d)
			} else {
				a.initializeFirebase();
				a.initMessaging()
			}
		})
	},
	eventAction: function(b) {
		if (this.initialized && this.shouldWritePresence) {
			var a = {
				action: b,
				ts: Firebase.ServerValue.TIMESTAMP
			};
			this.presence_db.child("events").push(a)
		} else {
			spree.firebase_queue.push(b)
		}
	},
	moveEventToSite: function() {
		if (this.initialized && this.shouldWritePresence) {
			var a = this;
			this.presence_db.once("value", function(b) {
				a.presence_db.remove();
				a.initGlobal(spree.ecma.ecma.sessionId());
				a.presence_db.set(b.val());
				a.initDisconnect()
			})
		}
	},
	channelKey: function(b) {
		var a = "messages_for";
		a += ("/" + (b.type == "event" ? spree.event.event_id : "global"));
		a += ("/" + b.channel);
		return a
	},
	displayIM: function() {
		return !this.app && spree.displayIM()
	},
	initDisconnect: function() {
		if (this.shouldWritePresence) {
			this.presence_db.onDisconnect().update({
				disconnectedAt: Firebase.ServerValue.TIMESTAMP
			})
		}
	},
	initEvent: function(a) {
		if (this.shouldWritePresence) {
			this.presence_db = this.db.child("/events/" + spree.event.event_id + "/" + a)
		}
	},
	initFriendshipNotifications: function() {
		if (this.displayIM()) {
			spree.ecma.friendshipController = new FriendshipController(spree.ecma.ecma, spree.ecma.messageController, spree.serverResponse.buddy_list, spree.serverResponse.friend_requests, spree.serverResponse.friend_accepts, spree.user, function(a) {
				spree.friendRequest = new FriendRequest(a)
			})
		}
	},
	initGlobal: function(a) {
		if (this.shouldWritePresence) {
			this.presence_db = this.db.child("/global/" + a)
		}
	},
	initIM: function(a) {
		if (this.displayIM()) {
			spree.ecma.presenceController = new PresenceController(spree.ecma.ecma, spree.ecma.messageController, a, spree.serverResponse.buddy_list, spree.user, function(b) {
				spree.presence = new Presence(b)
			})
		}
	},
	initMessaging: function() {
		var b = this;
		var a = [];
		$.each(spree.serverResponse.channels, function(c, e) {
			var d = b.channelKey(e);
			if (b.displayIM() && e.im && !b.imsLoaded) {
				b.db.child(d).limit(50).once("value", function(f) {
					var g = f.val();
					if (g) {
						$.each(g, function(h, i) {
							a.push(JSON.parse(Base64.decode(i.m)))
						})
					}
					b.initIM(a);
					b.initFriendshipNotifications();
					b.imsLoaded = true
				})
			}
			b.db.child(d).limit(20).on("child_added", function(f) {
				var g = f.val();
				if (g) {
					if ((e.im && b.imsLoaded) || (!g.n) || (g.n > e.last_message_id)) {
						b.submitMessage(e.channel, g.m)
					}
				}
			})
		})
	},
	initializeFirebase: function() {
		var a = this;
		var b = spree.ecma.ecma.sessionId();
		if (spree.event && spree.eventIsScheduledOrLive()) {
			this.initEvent(b)
		} else {
			this.initGlobal(b)
		}
		if (this.shouldWritePresence) {
			this.presence_db.set(this.userData())
		}
		this.initDisconnect();
		this.initialized = true;
		if (spree.firebase_queue) {
			$.each(spree.firebase_queue, function(c, d) {
				a.eventAction(d)
			})
		}
		this.connection_db.on("value", function(d) {
			if (d.val() === true) {
				var e = spree.ecma.messageController.heartbeater();
				e.subscribe(e.signals.REFRESH, function() {
					window.location.reload()
				});
				e.subscribe(e.signals.REDIRECT, function(f) {
					window.location.assign(f)
				});
				var c = e.subscribe(e.signals.SESSION_CAPABILITIES, function(f) {
					spree.capabilities = f;
					e.unsubscribe(e.signals.SESSION_CAPABILITIES, c)
				});
				e.sendHeartbeat(true);
				e.setConnected()
			}
		})
	},
	submitMessage: function(c, a) {
		var b = Base64.decode(a);
		spree.ecma.messageController.inputMessage(c, b)
	},
	userData: function() {
		var a = {
			createdAt: Firebase.ServerValue.TIMESTAMP,
			referer: document.referrer,
			currentPage: UrlUtils.relativePath(),
			ip: $("#ip-address-replacement").attr("data-ip-address"),
			spreekey: $.cookie("spreekey"),
			userAgent: navigator.userAgent
		};
		if (spree.event) {
			a.eventId = spree.event.event_id
		}
		if (spree.user && spree.user.has_been_authenticated) {
			a.userId = spree.user.alt
		}
		return a
	}
});
var FloatingContent = {
	getLeftOffset: function(b) {
		var a = this.$div.width();
		var d = $(window).scrollLeft();
		var c = $(window).width();
		if ((b + a + d) > c) {
			return (c - a)
		}
		return b
	},
	getTopOffset: function(g, f) {
		var i = this.$div.height();
		var c = $(window).scrollTop();
		var a = $(window).height();
		var h = c;
		if (g < h) {
			return h
		}
		var b = a + c;
		var e = b - i;
		var d = g + i;
		if (d > b) {
			return e
		}
		return g
	},
	computePosition: function(a) {
		var c = this.getLeftOffset(a.x);
		var b = this.getTopOffset(a.y);
		return {
			left: c,
			top: b
		}
	},
	computeRailPosition: function(d, e) {
		var a = this.$div.width();
		var c;
		if (d == "chat" || d == "viewer" || d == "faceblock") {
			c = $("#right-rail").offset().left - a
		} else {
			if (d == "producer") {
				c = $("#producers-viewer-list").offset().left - a
			}
		}
		c -= 10;
		var b = this.getTopOffset(e);
		return {
			left: c,
			top: b
		}
	}
};
var jstz = {};
jstz.HEMISPHERE_SOUTH = "SOUTH";
jstz.HEMISPHERE_NORTH = "NORTH";
jstz.HEMISPHERE_UNKNOWN = "N/A";
jstz.olson = {};
jstz.TimeZone = function(c, b, a) {
	this.utc_offset = c;
	this.olson_tz = b;
	this.uses_dst = a
};
jstz.TimeZone.prototype.display = function() {
	this.ambiguity_check();
	var a = "<b>UTC-offset</b>: " + this.utc_offset + "<br/>";
	a += "<b>Zoneinfo key</b>: " + this.olson_tz + "<br/>";
	a += "<b>Zone uses DST</b>: " + (this.uses_dst ? "yes" : "no") + "<br/>";
	return a
};
jstz.TimeZone.prototype.ambiguity_check = function() {
	var a, c, b, d;
	a = jstz.olson.ambiguity_list[this.olson_tz];
	if (typeof(a) === "undefined") {
		return
	}
	c = a.length;
	b = 0;
	for (; b < c; b += 1) {
		d = a[b];
		if (jstz.date_is_dst(jstz.olson.dst_start_dates[d])) {
			this.olson_tz = d;
			return
		}
	}
};
jstz.date_is_dst = function(b) {
	var a, c;
	c = ((b.getMonth() > 5 ? jstz.get_june_offset() : jstz.get_january_offset()));
	a = jstz.get_date_offset(b);
	return (c - a) !== 0
};
jstz.get_date_offset = function(a) {
	return -a.getTimezoneOffset()
};
jstz.get_timezone_info = function() {
	var a, b, c;
	a = jstz.get_january_offset();
	b = jstz.get_june_offset();
	c = a - b;
	if (c < 0) {
		return {
			utc_offset: a,
			dst: 1,
			hemisphere: jstz.HEMISPHERE_NORTH
		}
	} else {
		if (c > 0) {
			return {
				utc_offset: b,
				dst: 1,
				hemisphere: jstz.HEMISPHERE_SOUTH
			}
		}
	}
	return {
		utc_offset: a,
		dst: 0,
		hemisphere: jstz.HEMISPHERE_UNKNOWN
	}
};
jstz.get_january_offset = function() {
	return jstz.get_date_offset(new Date(2011, 0, 1, 0, 0, 0, 0))
};
jstz.get_june_offset = function() {
	return jstz.get_date_offset(new Date(2011, 5, 1, 0, 0, 0, 0))
};
jstz.determine_timezone = function() {
	var c, b, a;
	c = jstz.get_timezone_info();
	b = "";
	if (c.hemisphere === jstz.HEMISPHERE_SOUTH) {
		b = ",s"
	}
	a = c.utc_offset + "," + c.dst + b;
	return {
		timezone: jstz.olson.timezones[a],
		key: a
	}
};
jstz.olson.timezones = {
	"-720,0": new jstz.TimeZone("-12:00", "Etc/GMT+12", false),
	"-660,0": new jstz.TimeZone("-11:00", "Pacific/Pago_Pago", false),
	"-600,1": new jstz.TimeZone("-11:00", "America/Adak", true),
	"-660,1,s": new jstz.TimeZone("-11:00", "Pacific/Apia", true),
	"-600,0": new jstz.TimeZone("-10:00", "Pacific/Honolulu", false),
	"-570,0": new jstz.TimeZone("-10:30", "Pacific/Marquesas", false),
	"-540,0": new jstz.TimeZone("-09:00", "Pacific/Gambier", false),
	"-540,1": new jstz.TimeZone("-09:00", "America/Anchorage", true),
	"-480,1": new jstz.TimeZone("-08:00", "America/Los_Angeles", true),
	"-480,0": new jstz.TimeZone("-08:00", "Pacific/Pitcairn", false),
	"-420,0": new jstz.TimeZone("-07:00", "America/Phoenix", false),
	"-420,1": new jstz.TimeZone("-07:00", "America/Denver", true),
	"-360,0": new jstz.TimeZone("-06:00", "America/Guatemala", false),
	"-360,1": new jstz.TimeZone("-06:00", "America/Chicago", true),
	"-360,1,s": new jstz.TimeZone("-06:00", "Pacific/Easter", true),
	"-300,0": new jstz.TimeZone("-05:00", "America/Bogota", false),
	"-300,1": new jstz.TimeZone("-05:00", "America/New_York", true),
	"-270,0": new jstz.TimeZone("-04:30", "America/Caracas", false),
	"-240,1": new jstz.TimeZone("-04:00", "America/Halifax", true),
	"-240,0": new jstz.TimeZone("-04:00", "America/Santo_Domingo", false),
	"-240,1,s": new jstz.TimeZone("-04:00", "America/Asuncion", true),
	"-210,1": new jstz.TimeZone("-03:30", "America/St_Johns", true),
	"-180,1": new jstz.TimeZone("-03:00", "America/Godthab", true),
	"-180,0": new jstz.TimeZone("-03:00", "America/Argentina/Buenos_Aires", false),
	"-180,1,s": new jstz.TimeZone("-03:00", "America/Montevideo", true),
	"-120,0": new jstz.TimeZone("-02:00", "America/Noronha", false),
	"-120,1": new jstz.TimeZone("-02:00", "Etc/GMT+2", true),
	"-60,1": new jstz.TimeZone("-01:00", "Atlantic/Azores", true),
	"-60,0": new jstz.TimeZone("-01:00", "Atlantic/Cape_Verde", false),
	"0,0": new jstz.TimeZone("00:00", "Etc/UTC", false),
	"0,1": new jstz.TimeZone("00:00", "Europe/London", true),
	"60,1": new jstz.TimeZone("+01:00", "Europe/Berlin", true),
	"60,0": new jstz.TimeZone("+01:00", "Africa/Lagos", false),
	"60,1,s": new jstz.TimeZone("+01:00", "Africa/Windhoek", true),
	"120,1": new jstz.TimeZone("+02:00", "Asia/Beirut", true),
	"120,0": new jstz.TimeZone("+02:00", "Africa/Johannesburg", false),
	"180,1": new jstz.TimeZone("+03:00", "Europe/Moscow", true),
	"180,0": new jstz.TimeZone("+03:00", "Asia/Baghdad", false),
	"210,1": new jstz.TimeZone("+03:30", "Asia/Tehran", true),
	"240,0": new jstz.TimeZone("+04:00", "Asia/Dubai", false),
	"240,1": new jstz.TimeZone("+04:00", "Asia/Yerevan", true),
	"270,0": new jstz.TimeZone("+04:30", "Asia/Kabul", false),
	"300,1": new jstz.TimeZone("+05:00", "Asia/Yekaterinburg", true),
	"300,0": new jstz.TimeZone("+05:00", "Asia/Karachi", false),
	"330,0": new jstz.TimeZone("+05:30", "Asia/Kolkata", false),
	"345,0": new jstz.TimeZone("+05:45", "Asia/Kathmandu", false),
	"360,0": new jstz.TimeZone("+06:00", "Asia/Dhaka", false),
	"360,1": new jstz.TimeZone("+06:00", "Asia/Omsk", true),
	"390,0": new jstz.TimeZone("+06:30", "Asia/Rangoon", false),
	"420,1": new jstz.TimeZone("+07:00", "Asia/Krasnoyarsk", true),
	"420,0": new jstz.TimeZone("+07:00", "Asia/Jakarta", false),
	"480,0": new jstz.TimeZone("+08:00", "Asia/Shanghai", false),
	"480,1": new jstz.TimeZone("+08:00", "Asia/Irkutsk", true),
	"525,0": new jstz.TimeZone("+08:45", "Australia/Eucla", true),
	"525,1,s": new jstz.TimeZone("+08:45", "Australia/Eucla", true),
	"540,1": new jstz.TimeZone("+09:00", "Asia/Yakutsk", true),
	"540,0": new jstz.TimeZone("+09:00", "Asia/Tokyo", false),
	"570,0": new jstz.TimeZone("+09:30", "Australia/Darwin", false),
	"570,1,s": new jstz.TimeZone("+09:30", "Australia/Adelaide", true),
	"600,0": new jstz.TimeZone("+10:00", "Australia/Brisbane", false),
	"600,1": new jstz.TimeZone("+10:00", "Asia/Vladivostok", true),
	"600,1,s": new jstz.TimeZone("+10:00", "Australia/Sydney", true),
	"630,1,s": new jstz.TimeZone("+10:30", "Australia/Lord_Howe", true),
	"660,1": new jstz.TimeZone("+11:00", "Asia/Kamchatka", true),
	"660,0": new jstz.TimeZone("+11:00", "Pacific/Noumea", false),
	"690,0": new jstz.TimeZone("+11:30", "Pacific/Norfolk", false),
	"720,1,s": new jstz.TimeZone("+12:00", "Pacific/Auckland", true),
	"720,0": new jstz.TimeZone("+12:00", "Pacific/Tarawa", false),
	"765,1,s": new jstz.TimeZone("+12:45", "Pacific/Chatham", true),
	"780,0": new jstz.TimeZone("+13:00", "Pacific/Tongatapu", false),
	"840,0": new jstz.TimeZone("+14:00", "Pacific/Kiritimati", false)
};
jstz.olson.dst_start_dates = {
	"America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0),
	"America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0),
	"America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0),
	"America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0),
	"Atlantic/Stanley": new Date(2011, 8, 4, 7, 0, 0, 0),
	"America/Asuncion": new Date(2011, 9, 2, 3, 0, 0, 0),
	"America/Santiago": new Date(2011, 9, 9, 3, 0, 0, 0),
	"America/Campo_Grande": new Date(2011, 9, 16, 5, 0, 0, 0),
	"America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0),
	"America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0),
	"America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0),
	"America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0),
	"America/Havana": new Date(2011, 2, 13, 2, 0, 0, 0),
	"America/New_York": new Date(2011, 2, 13, 7, 0, 0, 0),
	"Asia/Gaza": new Date(2011, 2, 26, 23, 0, 0, 0),
	"Asia/Beirut": new Date(2011, 2, 27, 1, 0, 0, 0),
	"Europe/Minsk": new Date(2011, 2, 27, 3, 0, 0, 0),
	"Europe/Istanbul": new Date(2011, 2, 27, 7, 0, 0, 0),
	"Asia/Damascus": new Date(2011, 3, 1, 2, 0, 0, 0),
	"Asia/Jerusalem": new Date(2011, 3, 1, 6, 0, 0, 0),
	"Africa/Cairo": new Date(2011, 3, 29, 4, 0, 0, 0),
	"Asia/Yerevan": new Date(2011, 2, 27, 4, 0, 0, 0),
	"Asia/Baku": new Date(2011, 2, 27, 8, 0, 0, 0),
	"Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0),
	"Pacific/Fiji": new Date(2010, 11, 29, 23, 0, 0, 0),
	"America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0),
	"America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0),
	"America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0),
	"America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0)
};
jstz.olson.ambiguity_list = {
	"America/Denver": ["America/Denver", "America/Mazatlan"],
	"America/Chicago": ["America/Chicago", "America/Mexico_City"],
	"America/Asuncion": ["Atlantic/Stanley", "America/Asuncion", "America/Santiago", "America/Campo_Grande"],
	"America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"],
	"Asia/Beirut": ["Asia/Gaza", "Asia/Beirut", "Europe/Minsk", "Europe/Istanbul", "Asia/Damascus", "Asia/Jerusalem", "Africa/Cairo"],
	"Asia/Yerevan": ["Asia/Yerevan", "Asia/Baku"],
	"Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"],
	"America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"],
	"America/New_York": ["America/Havana", "America/New_York"],
	"America/Halifax": ["America/Goose_Bay", "America/Halifax"],
	"America/Godthab": ["America/Miquelon", "America/Godthab"]
};
(function(a) {
	a.fn.set_timezone = function(b) {
		this.val(this.get_timezone(b));
		return this
	};
	a.fn.get_timezone = function(b) {
		var d = {
			debug: false,
			"default": "America/New_York"
		};
		if (b) {
			a.extend(d, b)
		}
		var c = jstz.determine_timezone();
		var e = c.timezone;
		if (e != "undefined") {
			e.ambiguity_check();
			return e.olson_tz
		} else {
			if (d.debug) {
				alert("no timezone to be found. using default.")
			}
			return d["default"]
		}
	}
})(jQuery);
/*! Embedly jQuery - v3.1.1 - 2013-06-05
 * https://github.com/embedly/embedly-jquery
 * Copyright (c) 2013 Sean Creeley
 * Licensed BSD
 */
(function(f) {
	var e = {
		key: null,
		endpoint: "oembed",
		secure: null,
		query: {},
		method: "replace",
		addImageStyles: true,
		wrapElement: "div",
		className: "embed",
		batch: 20,
		urlRe: null
	};
	var i = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	var k = function(l) {
			return l === null || l === undefined
		};
	var g = function(m, l) {
			var o = [],
				n = [];
			f.each(m, function(p, q) {
				n.push(q);
				if (n.length === l) {
					o.push(n);
					n = []
				}
			});
			if (n.length !== 0) {
				o.push(n)
			}
			return o
		};
	var j = function(l) {
			if (k(l)) {
				return []
			} else {
				if (!f.isArray(l)) {
					return [l]
				}
			}
			return l
		};
	var c = function(l) {
			return f.map(l[0], function(m, n) {
				return [f.map(l, function(o) {
					return o[n]
				})]
			})
		};
	var d = function(l, m, n) {
			this.init(l, m, n)
		};
	d.prototype = {
		init: function(l) {
			this.urls = l;
			this.count = 0;
			this.results = {};
			this._deferred = f.Deferred()
		},
		notify: function(l) {
			this.results[l.original_url] = l;
			this.count++;
			this._deferred.notify.apply(this._deferred, [l]);
			if (this.count === this.urls.length) {
				var m = this;
				var n = f.map(this.urls, function(o) {
					return m.results[o]
				});
				this._deferred.resolve(n)
			}
			return this
		},
		state: function() {
			return this._deferred.state.apply(this._deferred, arguments)
		}
	};
	window.Keeper = d;
	var b = function() {};
	b.prototype = {
		defaults: {},
		log: function(m, l) {
			if (!k(window.console) && !k(window.console[m])) {
				window.console[m].apply(window.console, [l])
			}
		},
		build: function(q, p, l) {
			l = k(l) ? {} : l;
			var o = l.secure;
			if (k(o)) {
				o = window.location.protocol === "https:" ? true : false
			}
			var n = (o ? "https" : "http") + "://api.embed.ly/" + (q === "objectify" ? "2/" : "1/") + q;
			var m = k(l.query) ? {} : l.query;
			m.key = l.key;
			n += "?" + f.param(m);
			n += "&urls=" + f.map(p, encodeURIComponent).join(",");
			return n
		},
		ajax: function(l, p, t) {
			t = f.extend({}, e, f.embedly.defaults, typeof t === "object" && t);
			if (k(t.key)) {
				this.log("error", "Embedly jQuery requires an API Key. Please sign up for one at http://embed.ly");
				return null
			}
			p = j(p);
			var r = new d(p);
			var s = [],
				o = [],
				m;
			f.each(p, function(v, u) {
				m = false;
				if (i.test(u)) {
					m = true;
					if (t.urlRe !== null && t.urlRe.test && !t.urlRe.test(u)) {
						m = false
					}
				}
				if (m === true) {
					s.push(u)
				} else {
					o.push({
						url: u,
						original_url: u,
						error: true,
						invalid: true,
						type: "error",
						error_message: 'Invalid URL "' + u + '"'
					})
				}
			});
			var n = g(s, t.batch),
				q = this;
			f.each(n, function(v, u) {
				f.ajax({
					url: q.build(l, u, t),
					dataType: "jsonp",
					success: function(w) {
						f.each(c([u, w]), function(y, z) {
							var x = z[1];
							x.original_url = z[0];
							x.invalid = false;
							r.notify(x)
						})
					}
				})
			});
			if (o.length) {
				setTimeout(function() {
					f.each(o, function(u, v) {
						r.notify(v)
					})
				}, 1)
			}
			return r._deferred
		},
		oembed: function(m, l) {
			return this.ajax("oembed", m, l)
		},
		preview: function(m, l) {
			return this.ajax("preview", m, l)
		},
		objectify: function(m, l) {
			return this.ajax("objectify", m, l)
		},
		extract: function(m, l) {
			return this.ajax("extract", m, l)
		}
	};
	var h = function() {};
	h.prototype = {
		build: function(q, m, l) {
			l = f.extend({}, f.embedly.defaults, typeof l === "object" && l);
			var p = l.secure;
			if (k(p)) {
				p = window.location.protocol === "https:" ? true : false
			}
			var o = (p ? "https" : "http") + "://i.embed.ly/" + (q === "display" ? "1/" : "1/display/") + q;
			var n = k(l.query) ? {} : l.query;
			n.key = l.key;
			o += "?" + f.param(n);
			o += "&url=" + encodeURIComponent(m);
			return o
		},
		display: function(m, l) {
			return this.build("display", m, l)
		},
		resize: function(m, l) {
			return this.build("resize", m, l)
		},
		fill: function(m, l) {
			return this.build("fill", m, l)
		},
		crop: function(m, l) {
			return this.build("crop", m, l)
		}
	};
	var a = function(n, m, l) {
			this.init(n, m, l)
		};
	a.prototype = {
		init: function(n, o, m) {
			this.elem = n;
			this.$elem = f(n);
			this.original_url = o;
			this.options = m;
			this.loaded = f.Deferred();
			var l = this;
			this.loaded.done(function() {
				l.$elem.trigger("loaded", [l])
			});
			this.$elem.trigger("initialized", [this])
		},
		progress: function(l) {
			f.extend(this, l);
			console.log("here", this.options);
			if (this.options.display) {
				this.options.display.apply(this.elem, [this, this.elem])
			} else {
				if (this.options.endpoint === "oembed") {
					console.log("here2");
					this.display()
				}
			}
			this.loaded.resolve(this)
		},
		imageStyle: function() {
			var m = [],
				l;
			if (this.options.addImageStyles) {
				if (this.options.query.maxwidth) {
					l = isNaN(parseInt(this.options.query.maxwidth, 10)) ? "" : "px";
					m.push("max-width: " + (this.options.query.maxwidth) + l)
				}
				if (this.options.query.maxheight) {
					l = isNaN(parseInt(this.options.query.maxheight, 10)) ? "" : "px";
					m.push("max-height: " + (this.options.query.maxheight) + l)
				}
			}
			return m.join(";")
		},
		display: function() {
			if (this.type === "error") {
				return false
			}
			this.style = this.imageStyle();
			var l;
			if (this.type === "photo") {
				l = "<a href='" + this.original_url + "' target='_blank'>";
				l += "<img style='" + this.style + "' src='" + this.url + "' alt='" + this.title + "' /></a>"
			} else {
				if (this.type === "video" || this.type === "rich") {
					l = this.html
				} else {
					this.title = this.title || this.url;
					l = this.thumbnail_url ? "<img src='" + this.thumbnail_url + "' class='thumb' style='" + this.style + "'/>" : "";
					l += "<a href='" + this.original_url + "'>" + this.title + "</a>";
					l += this.provider_name ? "<a href='" + this.provider_url + "' class='provider'>" + this.provider_name + "</a>" : "";
					l += this.description ? '<div class="description">' + this.description + "</div>" : ""
				}
			}
			if (this.options.wrapElement) {
				l = "<" + this.options.wrapElement + ' class="' + this.options.className + '">' + l + "</" + this.options.wrapElement + ">"
			}
			this.code = l;
			console.log("html", l);
			if (this.options.method === "replace") {
				this.$elem.replaceWith(this.code)
			} else {
				if (this.options.method === "after") {
					this.$elem.after(this.code)
				} else {
					if (this.options.method === "afterParent") {
						this.$elem.parent().after(this.code)
					} else {
						if (this.options.method === "replaceParent") {
							this.$elem.parent().replaceWith(this.code)
						}
					}
				}
			}
			this.$elem.trigger("displayed", [this])
		}
	};
	f.embedly = new b();
	f.embedly.display = new h();
	f.fn.embedly = function(o) {
		if (o === undefined || typeof o === "object") {
			o = f.extend({}, e, f.embedly.defaults, typeof o === "object" && o);
			if (k(o.key)) {
				f.embedly.log("error", "Embedly jQuery requires an API Key. Please sign up for one at http://embed.ly");
				return this.each(f.noop)
			}
			var n = {};
			var p = function(s) {
					if (!f.data(f(s), "embedly")) {
						var q = f(s).attr("href");
						var r = new a(s, q, o);
						f.data(s, "embedly", r);
						if (n.hasOwnProperty(q)) {
							n[q].push(r)
						} else {
							n[q] = [r]
						}
					}
				};
			var m = this.each(function() {
				if (!k(f(this).attr("href"))) {
					p(this)
				} else {
					f(this).find("a").each(function() {
						if (!k(f(this).attr("href"))) {
							p(this)
						}
					})
				}
			});
			var l = f.embedly.ajax(o.endpoint, f.map(n, function(r, q) {
				return q
			}), o).progress(function(q) {
				f.each(n[q.original_url], function(r, s) {
					s.progress(q)
				})
			});
			if (o.progress) {
				l.progress(o.progress)
			}
			if (o.done) {
				l.done(o.done)
			}
			return m
		}
	};
	f.expr[":"].embedly = function(l) {
		return !k(f(l).data("embedly"))
	};
	f.fn.display = function(p, n) {
		if (k(p)) {
			p = "display"
		}
		if (n === undefined || typeof n === "object") {
			n = f.extend({}, e, f.embedly.defaults, typeof n === "object" && n);
			if (k(n.key)) {
				f.embedly.log("error", "Embedly jQuery requires an API Key. Please sign up for one at http://embed.ly/display");
				return this.each(f.noop)
			}
			var o = function(t) {
					var q = f(t);
					if (!q.data("display")) {
						var r = q.data("src") || q.attr("href");
						var u = {
							original_url: r,
							url: f.embedly.display.build(p, r, n)
						};
						q.data("display", u);
						q.trigger("initialized", [t]);
						console.log("here html");
						var s = "<img src='" + u.url + "' />";
						if (q.is("a")) {
							q.append(s)
						} else {
							q.replaceWith(s)
						}
					}
				};
			var m = function(q) {
					if (k(f(q).data("src")) && k(f(q).attr("href"))) {
						return false
					}
					return true
				};
			var l = this.each(function() {
				if (m(this)) {
					o(this)
				} else {
					f(this).find("img,a").each(function() {
						if (m(this)) {
							o(this)
						}
					})
				}
			});
			return l
		}
	};
	f.expr[":"].display = function(l) {
		return !k(f(l).data("display"))
	}
}(jQuery, window));
(function(a3) {
	function al(b, a) {
		return function(c) {
			return aX(b.call(this, c), a)
		}
	}
	function an(a) {
		return function(b) {
			return this.lang().ordinal(a.call(this, b))
		}
	}
	function a8() {}
	function ay(a) {
		at(this, a)
	}
	function ak(j) {
		var m = this._data = {},
			d = j.years || j.year || j.y || 0,
			b = j.months || j.month || j.M || 0,
			g = j.weeks || j.week || j.w || 0,
			p = j.days || j.day || j.d || 0,
			c = j.hours || j.hour || j.h || 0,
			l = j.minutes || j.minute || j.m || 0,
			k = j.seconds || j.second || j.s || 0,
			h = j.milliseconds || j.millisecond || j.ms || 0;
		this._milliseconds = h + k * 1000 + l * 60000 + c * 3600000, this._days = p + g * 7, this._months = b + d * 12, m.milliseconds = h % 1000, k += aA(h / 1000), m.seconds = k % 60, l += aA(k / 60), m.minutes = l % 60, c += aA(l / 60), m.hours = c % 24, p += aA(c / 24), p += g * 7, m.days = p % 30, b += aA(p / 30), m.months = b % 12, d += aA(b / 12), m.years = d
	}
	function at(b, a) {
		for (var c in a) {
			a.hasOwnProperty(c) && (b[c] = a[c])
		}
		return b
	}
	function aA(a) {
		return a < 0 ? Math.ceil(a) : Math.floor(a)
	}
	function aX(b, a) {
		var c = b + "";
		while (c.length < a) {
			c = "0" + c
		}
		return c
	}
	function aw(f, b, h) {
		var d = b._milliseconds,
			a = b._days,
			c = b._months,
			g;
		d && f._d.setTime(+f + d * h), a && f.date(f.date() + a * h), c && (g = f.date(), f.date(1).month(f.month() + c * h).date(Math.min(g, f.daysInMonth())))
	}
	function ar(a) {
		return Object.prototype.toString.call(a) === "[object Array]"
	}
	function aO(f, b) {
		var g = Math.min(f.length, b.length),
			d = Math.abs(f.length - b.length),
			a = 0,
			c;
		for (c = 0; c < g; c++) {~~f[c] !== ~~b[c] && a++
		}
		return a + d
	}
	function ai(b, a) {
		return a.abbr = b, aM[b] || (aM[b] = new a8), aM[b].set(a), aM[b]
	}
	function af(a) {
		return a ? (!aM[a] && aR && require("./lang/" + a), aM[a]) : aL.fn._lang
	}
	function aF(a) {
		return a.match(/\[.*\]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
	}
	function ad(c) {
		var a = c.match(a7),
			d, b;
		for (d = 0, b = a.length; d < b; d++) {
			aB[a[d]] ? a[d] = aB[a[d]] : a[d] = aF(a[d])
		}
		return function(e) {
			var f = "";
			for (d = 0; d < b; d++) {
				f += typeof a[d].call == "function" ? a[d].call(e, c) : a[d]
			}
			return f
		}
	}
	function ac(c, a) {
		function b(e) {
			return c.lang().longDateFormat(e) || e
		}
		var d = 5;
		while (d-- && a1.test(a)) {
			a = a.replace(a1, b)
		}
		return az[a] || (az[a] = ad(a)), az[a](c)
	}
	function ae(a) {
		switch (a) {
		case "DDDD":
			return aP;
		case "YYYY":
			return a4;
		case "YYYYY":
			return aJ;
		case "S":
		case "SS":
		case "SSS":
		case "DDD":
			return aZ;
		case "MMM":
		case "MMMM":
		case "dd":
		case "ddd":
		case "dddd":
		case "a":
		case "A":
			return aT;
		case "X":
			return a6;
		case "Z":
		case "ZZ":
			return a0;
		case "T":
			return aG;
		case "MM":
		case "DD":
		case "YY":
		case "HH":
		case "hh":
		case "mm":
		case "ss":
		case "M":
		case "D":
		case "d":
		case "H":
		case "h":
		case "m":
		case "s":
			return a5;
		default:
			return new RegExp(a.replace("\\", ""))
		}
	}
	function aE(f, b, g) {
		var d, a, c = g._a;
		switch (f) {
		case "M":
		case "MM":
			c[1] = b == null ? 0 : ~~b - 1;
			break;
		case "MMM":
		case "MMMM":
			d = af(g._l).monthsParse(b), d != null ? c[1] = d : g._isValid = !1;
			break;
		case "D":
		case "DD":
		case "DDD":
		case "DDDD":
			b != null && (c[2] = ~~b);
			break;
		case "YY":
			c[0] = ~~b + (~~b > 68 ? 1900 : 2000);
			break;
		case "YYYY":
		case "YYYYY":
			c[0] = ~~b;
			break;
		case "a":
		case "A":
			g._isPm = (b + "").toLowerCase() === "pm";
			break;
		case "H":
		case "HH":
		case "h":
		case "hh":
			c[3] = ~~b;
			break;
		case "m":
		case "mm":
			c[4] = ~~b;
			break;
		case "s":
		case "ss":
			c[5] = ~~b;
			break;
		case "S":
		case "SS":
		case "SSS":
			c[6] = ~~ (("0." + b) * 1000);
			break;
		case "X":
			g._d = new Date(parseFloat(b) * 1000);
			break;
		case "Z":
		case "ZZ":
			g._useUTC = !0, d = (b + "").match(aH), d && d[1] && (g._tzh = ~~d[1]), d && d[2] && (g._tzm = ~~d[2]), d && d[0] === "+" && (g._tzh = -g._tzh, g._tzm = -g._tzm)
		}
		b == null && (g._isValid = !1)
	}
	function aq(c) {
		var a, d, b = [];
		if (c._d) {
			return
		}
		for (a = 0; a < 7; a++) {
			c._a[a] = b[a] = c._a[a] == null ? a === 2 ? 1 : 0 : c._a[a]
		}
		b[3] += c._tzh || 0, b[4] += c._tzm || 0, d = new Date(0), c._useUTC ? (d.setUTCFullYear(b[0], b[1], b[2]), d.setUTCHours(b[3], b[4], b[5], b[6])) : (d.setFullYear(b[0], b[1], b[2]), d.setHours(b[3], b[4], b[5], b[6])), c._d = d
	}
	function ap(d) {
		var b = d._f.match(a7),
			f = d._i,
			c, a;
		d._a = [];
		for (c = 0; c < b.length; c++) {
			a = (ae(b[c]).exec(f) || [])[0], a && (f = f.slice(f.indexOf(a) + a.length)), aB[b[c]] && aE(b[c], a, d)
		}
		d._isPm && d._a[3] < 12 && (d._a[3] += 12), d._isPm === !1 && d._a[3] === 12 && (d._a[3] = 0), aq(d)
	}
	function aj(g) {
		var c, j, f, b = 99,
			d, h, a;
		while (g._f.length) {
			c = at({}, g), c._f = g._f.pop(), ap(c), j = new ay(c);
			if (j.isValid()) {
				f = j;
				break
			}
			a = aO(c._a, j.toArray()), a < b && (b = a, f = j)
		}
		at(g, f)
	}
	function av(b) {
		var a, c = b._i;
		if (aI.exec(c)) {
			b._f = "YYYY-MM-DDT";
			for (a = 0; a < 4; a++) {
				if (ah[a][1].exec(c)) {
					b._f += ah[a][0];
					break
				}
			}
			a0.exec(c) && (b._f += " Z"), ap(b)
		} else {
			b._d = new Date(c)
		}
	}
	function ab(a) {
		var c = a._i,
			b = aK.exec(c);
		c === a3 ? a._d = new Date : b ? a._d = new Date(+b[1]) : typeof c == "string" ? av(a) : ar(c) ? (a._a = c.slice(0), aq(a)) : a._d = c instanceof Date ? new Date(+c) : new Date(c)
	}
	function aa(d, b, f, c, a) {
		return a.relativeTime(b || 1, !! f, d, c)
	}
	function aQ(h, l, c) {
		var d = aN(Math.abs(h) / 1000),
			m = aN(d / 60),
			b = aN(m / 60),
			k = aN(b / 24),
			j = aN(k / 365),
			g = d < 45 && ["s", d] || m === 1 && ["m"] || m < 45 && ["mm", m] || b === 1 && ["h"] || b < 22 && ["hh", b] || k === 1 && ["d"] || k <= 25 && ["dd", k] || k <= 45 && ["M"] || k < 345 && ["MM", aN(k / 30)] || j === 1 && ["y"] || ["yy", j];
		return g[2] = l, g[3] = h > 0, g[4] = c, aa.apply({}, g)
	}
	function a2(d, f, c) {
		var a = c - f,
			b = c - d.day();
		return b > a && (b -= 7), b < a - 7 && (b += 7), Math.ceil(aL(d).add("d", b).dayOfYear() / 7)
	}
	function aW(b) {
		var c = b._i,
			a = b._f;
		return c === null || c === "" ? null : (typeof c == "string" && (b._i = c = af().preparse(c)), aL.isMoment(c) ? (b = at({}, c), b._d = new Date(+c._d)) : a ? ar(a) ? aj(b) : ap(b) : ab(b), new ay(b))
	}
	function aD(a, b) {
		aL.fn[a] = aL.fn[a + "s"] = function(d) {
			var c = this._isUTC ? "UTC" : "";
			return d != null ? (this._d["set" + c + b](d), this) : this._d["get" + c + b]()
		}
	}
	function aC(a) {
		aL.duration.fn[a] = function() {
			return this._data[a]
		}
	}
	function au(a, b) {
		aL.duration.fn["as" + a] = function() {
			return +this / b
		}
	}
	var aL, aS = "2.0.0",
		aN = Math.round,
		aY, aM = {},
		aR = typeof module != "undefined" && module.exports,
		aK = /^\/?Date\((\-?\d+)/i,
		a7 = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,
		a1 = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,
		aU = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,
		a5 = /\d\d?/,
		aZ = /\d{1,3}/,
		aP = /\d{3}/,
		a4 = /\d{1,4}/,
		aJ = /[+\-]?\d{1,6}/,
		aT = /[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,
		a0 = /Z|[\+\-]\d\d:?\d\d/i,
		aG = /T/i,
		a6 = /[\+\-]?\d+(\.\d{1,3})?/,
		aI = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,
		ax = "YYYY-MM-DDTHH:mm:ssZ",
		ah = [
			["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
			["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
			["HH:mm", /(T| )\d\d:\d\d/],
			["HH", /(T| )\d\d/]
		],
		aH = /([\+\-]|\d\d)/gi,
		ag = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
		am = {
			Milliseconds: 1,
			Seconds: 1000,
			Minutes: 60000,
			Hours: 3600000,
			Days: 86400000,
			Months: 2592000000,
			Years: 31536000000
		},
		az = {},
		aV = "DDD w W M D d".split(" "),
		ao = "M D H h m s w W".split(" "),
		aB = {
			M: function() {
				return this.month() + 1
			},
			MMM: function(a) {
				return this.lang().monthsShort(this, a)
			},
			MMMM: function(a) {
				return this.lang().months(this, a)
			},
			D: function() {
				return this.date()
			},
			DDD: function() {
				return this.dayOfYear()
			},
			d: function() {
				return this.day()
			},
			dd: function(a) {
				return this.lang().weekdaysMin(this, a)
			},
			ddd: function(a) {
				return this.lang().weekdaysShort(this, a)
			},
			dddd: function(a) {
				return this.lang().weekdays(this, a)
			},
			w: function() {
				return this.week()
			},
			W: function() {
				return this.isoWeek()
			},
			YY: function() {
				return aX(this.year() % 100, 2)
			},
			YYYY: function() {
				return aX(this.year(), 4)
			},
			YYYYY: function() {
				return aX(this.year(), 5)
			},
			a: function() {
				return this.lang().meridiem(this.hours(), this.minutes(), !0)
			},
			A: function() {
				return this.lang().meridiem(this.hours(), this.minutes(), !1)
			},
			H: function() {
				return this.hours()
			},
			h: function() {
				return this.hours() % 12 || 12
			},
			m: function() {
				return this.minutes()
			},
			s: function() {
				return this.seconds()
			},
			S: function() {
				return ~~ (this.milliseconds() / 100)
			},
			SS: function() {
				return aX(~~ (this.milliseconds() / 10), 2)
			},
			SSS: function() {
				return aX(this.milliseconds(), 3)
			},
			Z: function() {
				var b = -this.zone(),
					a = "+";
				return b < 0 && (b = -b, a = "-"), a + aX(~~ (b / 60), 2) + ":" + aX(~~b % 60, 2)
			},
			ZZ: function() {
				var b = -this.zone(),
					a = "+";
				return b < 0 && (b = -b, a = "-"), a + aX(~~ (10 * b / 6), 4)
			},
			X: function() {
				return this.unix()
			}
		};
	while (aV.length) {
		aY = aV.pop(), aB[aY + "o"] = an(aB[aY])
	}
	while (ao.length) {
		aY = ao.pop(), aB[aY + aY] = al(aB[aY], 2)
	}
	aB.DDDD = al(aB.DDD, 3), a8.prototype = {
		set: function(b) {
			var a, c;
			for (c in b) {
				a = b[c], typeof a == "function" ? this[c] = a : this["_" + c] = a
			}
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function(a) {
			return this._months[a.month()]
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function(a) {
			return this._monthsShort[a.month()]
		},
		monthsParse: function(d) {
			var f, c, a, b;
			this._monthsParse || (this._monthsParse = []);
			for (f = 0; f < 12; f++) {
				this._monthsParse[f] || (c = aL([2000, f]), a = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""), this._monthsParse[f] = new RegExp(a.replace(".", ""), "i"));
				if (this._monthsParse[f].test(d)) {
					return f
				}
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function(a) {
			return this._weekdays[a.day()]
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function(a) {
			return this._weekdaysShort[a.day()]
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function(a) {
			return this._weekdaysMin[a.day()]
		},
		_longDateFormat: {
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D YYYY",
			LLL: "MMMM D YYYY LT",
			LLLL: "dddd, MMMM D YYYY LT"
		},
		longDateFormat: function(b) {
			var a = this._longDateFormat[b];
			return !a && this._longDateFormat[b.toUpperCase()] && (a = this._longDateFormat[b.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(c) {
				return c.slice(1)
			}), this._longDateFormat[b] = a), a
		},
		meridiem: function(b, a, c) {
			return b > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
		},
		_calendar: {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[last] dddd [at] LT",
			sameElse: "L"
		},
		calendar: function(b, a) {
			var c = this._calendar[b];
			return typeof c == "function" ? c.apply(a) : c
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function(d, b, f, c) {
			var a = this._relativeTime[f];
			return typeof a == "function" ? a(d, b, f, c) : a.replace(/%d/i, d)
		},
		pastFuture: function(b, a) {
			var c = this._relativeTime[b > 0 ? "future" : "past"];
			return typeof c == "function" ? c(a) : c.replace(/%s/i, a)
		},
		ordinal: function(a) {
			return this._ordinal.replace("%d", a)
		},
		_ordinal: "%d",
		preparse: function(a) {
			return a
		},
		postformat: function(a) {
			return a
		},
		week: function(a) {
			return a2(a, this._week.dow, this._week.doy)
		},
		_week: {
			dow: 0,
			doy: 6
		}
	}, aL = function(b, a, c) {
		return aW({
			_i: b,
			_f: a,
			_l: c,
			_isUTC: !1
		})
	}, aL.utc = function(b, a, c) {
		return aW({
			_useUTC: !0,
			_isUTC: !0,
			_l: c,
			_i: b,
			_f: a
		})
	}, aL.unix = function(a) {
		return aL(a * 1000)
	}, aL.duration = function(d, g) {
		var c = aL.isDuration(d),
			a = typeof d == "number",
			b = c ? d._data : a ? {} : d,
			f;
		return a && (g ? b[g] = d : b.milliseconds = d), f = new ak(b), c && d.hasOwnProperty("_lang") && (f._lang = d._lang), f
	}, aL.version = aS, aL.defaultFormat = ax, aL.lang = function(b, c) {
		var a;
		if (!b) {
			return aL.fn._lang._abbr
		}
		c ? ai(b, c) : aM[b] || af(b), aL.duration.fn._lang = aL.fn._lang = af(b)
	}, aL.langData = function(a) {
		return a && a._lang && a._lang._abbr && (a = a._lang._abbr), af(a)
	}, aL.isMoment = function(a) {
		return a instanceof ay
	}, aL.isDuration = function(a) {
		return a instanceof ak
	}, aL.fn = ay.prototype = {
		clone: function() {
			return aL(this)
		},
		valueOf: function() {
			return +this._d
		},
		unix: function() {
			return Math.floor(+this._d / 1000)
		},
		toString: function() {
			return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate: function() {
			return this._d
		},
		toJSON: function() {
			return aL.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray: function() {
			var a = this;
			return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
		},
		isValid: function() {
			return this._isValid == null && (this._a ? this._isValid = !aO(this._a, (this._isUTC ? aL.utc(this._a) : aL(this._a)).toArray()) : this._isValid = !isNaN(this._d.getTime())), !! this._isValid
		},
		utc: function() {
			return this._isUTC = !0, this
		},
		local: function() {
			return this._isUTC = !1, this
		},
		format: function(a) {
			var b = ac(this, a || aL.defaultFormat);
			return this.lang().postformat(b)
		},
		add: function(b, c) {
			var a;
			return typeof b == "string" ? a = aL.duration(+c, b) : a = aL.duration(b, c), aw(this, a, 1), this
		},
		subtract: function(b, c) {
			var a;
			return typeof b == "string" ? a = aL.duration(+c, b) : a = aL.duration(b, c), aw(this, a, -1), this
		},
		diff: function(f, h, d) {
			var b = this._isUTC ? aL(f).utc() : aL(f).local(),
				c = (this.zone() - b.zone()) * 60000,
				g, a;
			return h && (h = h.replace(/s$/, "")), h === "year" || h === "month" ? (g = (this.daysInMonth() + b.daysInMonth()) * 43200000, a = (this.year() - b.year()) * 12 + (this.month() - b.month()), a += (this - aL(this).startOf("month") - (b - aL(b).startOf("month"))) / g, h === "year" && (a /= 12)) : (g = this - b - c, a = h === "second" ? g / 1000 : h === "minute" ? g / 60000 : h === "hour" ? g / 3600000 : h === "day" ? g / 86400000 : h === "week" ? g / 604800000 : g), d ? a : aA(a)
		},
		from: function(a, b) {
			return aL.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)
		},
		fromNow: function(a) {
			return this.from(aL(), a)
		},
		calendar: function() {
			var a = this.diff(aL().startOf("day"), "days", !0),
				b = a < -6 ? "sameElse" : a < -1 ? "lastWeek" : a < 0 ? "lastDay" : a < 1 ? "sameDay" : a < 2 ? "nextDay" : a < 7 ? "nextWeek" : "sameElse";
			return this.format(this.lang().calendar(b, this))
		},
		isLeapYear: function() {
			var a = this.year();
			return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
		},
		isDST: function() {
			return this.zone() < aL([this.year()]).zone() || this.zone() < aL([this.year(), 5]).zone()
		},
		day: function(b) {
			var a = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return b == null ? a : this.add({
				d: b - a
			})
		},
		startOf: function(a) {
			a = a.replace(/s$/, "");
			switch (a) {
			case "year":
				this.month(0);
			case "month":
				this.date(1);
			case "week":
			case "day":
				this.hours(0);
			case "hour":
				this.minutes(0);
			case "minute":
				this.seconds(0);
			case "second":
				this.milliseconds(0)
			}
			return a === "week" && this.day(0), this
		},
		endOf: function(a) {
			return this.startOf(a).add(a.replace(/s?$/, "s"), 1).subtract("ms", 1)
		},
		isAfter: function(a, b) {
			return b = typeof b != "undefined" ? b : "millisecond", +this.clone().startOf(b) > +aL(a).startOf(b)
		},
		isBefore: function(a, b) {
			return b = typeof b != "undefined" ? b : "millisecond", +this.clone().startOf(b) < +aL(a).startOf(b)
		},
		isSame: function(a, b) {
			return b = typeof b != "undefined" ? b : "millisecond", +this.clone().startOf(b) === +aL(a).startOf(b)
		},
		zone: function() {
			return this._isUTC ? 0 : this._d.getTimezoneOffset()
		},
		daysInMonth: function() {
			return aL.utc([this.year(), this.month() + 1, 0]).date()
		},
		dayOfYear: function(a) {
			var b = aN((aL(this).startOf("day") - aL(this).startOf("year")) / 86400000) + 1;
			return a == null ? b : this.add("d", a - b)
		},
		isoWeek: function(b) {
			var a = a2(this, 1, 4);
			return b == null ? a : this.add("d", (b - a) * 7)
		},
		week: function(b) {
			var a = this.lang().week(this);
			return b == null ? a : this.add("d", (b - a) * 7)
		},
		lang: function(a) {
			return a === a3 ? this._lang : (this._lang = af(a), this)
		}
	};
	for (aY = 0; aY < ag.length; aY++) {
		aD(ag[aY].toLowerCase().replace(/s$/, ""), ag[aY])
	}
	aD("year", "FullYear"), aL.fn.days = aL.fn.day, aL.fn.weeks = aL.fn.week, aL.fn.isoWeeks = aL.fn.isoWeek, aL.duration.fn = ak.prototype = {
		weeks: function() {
			return aA(this.days() / 7)
		},
		valueOf: function() {
			return this._milliseconds + this._days * 86400000 + this._months * 2592000000
		},
		humanize: function(b) {
			var a = +this,
				c = aQ(a, !b, this.lang());
			return b && (c = this.lang().pastFuture(a, c)), this.lang().postformat(c)
		},
		lang: aL.fn.lang
	};
	for (aY in am) {
		am.hasOwnProperty(aY) && (au(aY, am[aY]), aC(aY.toLowerCase()))
	}
	au("Weeks", 604800000), aL.lang("en", {
		ordinal: function(b) {
			var a = b % 10,
				c = ~~ (b % 100 / 10) === 1 ? "th" : a === 1 ? "st" : a === 2 ? "nd" : a === 3 ? "rd" : "th";
			return b + c
		}
	}), aR && (module.exports = aL), typeof ender == "undefined" && (this.moment = aL), typeof define == "function" && define.amd && define("moment", [], function() {
		return aL
	})
}).call(this);
(function(d) {
	function e(h, g, f) {
		if (h.addEventListener) {
			return h.addEventListener(g, f, false)
		}
		if (h.attachEvent) {
			return h.attachEvent("on" + g, f)
		}
	}
	function c(g, j) {
		var h, f;
		for (h = 0, f = g.length; h < f; h++) {
			if (g[h] === j) {
				return true
			}
		}
		return false
	}
	function b(h, g) {
		var f;
		if (h.createTextRange) {
			f = h.createTextRange();
			f.move("character", g);
			f.select()
		} else {
			if (h.selectionStart) {
				h.focus();
				h.setSelectionRange(g, g)
			}
		}
	}
	function a(g, f) {
		try {
			g.type = f;
			return true
		} catch (h) {
			return false
		}
	}
	d.Placeholders = {
		Utils: {
			addEventListener: e,
			inArray: c,
			moveCaret: b,
			changeType: a
		}
	}
}(this));
(function(c) {
	var M = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
		u = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
		t = "#ccc",
		J = "placeholdersjs",
		z = new RegExp("(?:^|\\s)" + J + "(?!\\S)"),
		A, o, D = "data-placeholder-value",
		O = "data-placeholder-active",
		k = "data-placeholder-type",
		B = "data-placeholder-submit",
		p = "data-placeholder-bound",
		h = "data-placeholder-focus",
		Q = "data-placeholder-live",
		l = "data-placeholder-maxlength",
		m = document.createElement("input"),
		s = document.getElementsByTagName("head")[0],
		E = document.documentElement,
		y = c.Placeholders,
		P = y.Utils,
		F, a, j, n, g, G, I, K, R, v, S;

	function T() {}
	function r(X, W) {
		var V, i, U = ( !! W && X.value !== W),
			Y = (X.value === X.getAttribute(D));
		if ((U || Y) && X.getAttribute(O) === "true") {
			X.setAttribute(O, "false");
			X.value = X.value.replace(X.getAttribute(D), "");
			X.className = X.className.replace(z, "");
			i = X.getAttribute(l);
			if (i) {
				X.setAttribute("maxLength", i);
				X.removeAttribute(l)
			}
			V = X.getAttribute(k);
			if (V) {
				X.type = V
			}
			return true
		}
		return false
	}
	function N(V) {
		var U, i, W = V.getAttribute(D);
		if (V.value === "" && W) {
			V.setAttribute(O, "true");
			V.value = W;
			V.className += " " + J;
			i = V.getAttribute(l);
			if (!i) {
				V.setAttribute(l, V.maxLength);
				V.removeAttribute("maxLength")
			}
			U = V.getAttribute(k);
			if (U) {
				V.type = "text"
			} else {
				if (V.type === "password") {
					if (P.changeType(V, "text")) {
						V.setAttribute(k, "password")
					}
				}
			}
			return true
		}
		return false
	}
	function H(Y, aa) {
		var W, Z, X, U, V;
		if (Y && Y.getAttribute(D)) {
			aa(Y)
		} else {
			W = Y ? Y.getElementsByTagName("input") : A;
			Z = Y ? Y.getElementsByTagName("textarea") : o;
			for (V = 0, U = W.length + Z.length; V < U; V++) {
				X = V < W.length ? W[V] : Z[V - W.length];
				aa(X)
			}
		}
	}
	function C(i) {
		H(i, r)
	}
	function f(i) {
		H(i, N)
	}
	function b(i) {
		return function() {
			if (F && i.value === i.getAttribute(D) && i.getAttribute(O) === "true") {
				P.moveCaret(i, 0)
			} else {
				r(i)
			}
		}
	}
	function x(i) {
		return function() {
			N(i)
		}
	}
	function e(i) {
		return function(U) {
			j = i.value;
			if (i.getAttribute(O) === "true") {
				if (j === i.getAttribute(D) && P.inArray(u, U.keyCode)) {
					if (U.preventDefault) {
						U.preventDefault()
					}
					return false
				}
			}
		}
	}
	function L(i) {
		return function() {
			r(i, j);
			if (i.value === "") {
				i.blur();
				P.moveCaret(i, 0)
			}
		}
	}
	function d(i) {
		return function() {
			if (i === document.activeElement && i.value === i.getAttribute(D) && i.getAttribute(O) === "true") {
				P.moveCaret(i, 0)
			}
		}
	}
	function q(i) {
		return function() {
			C(i)
		}
	}
	function w(i) {
		if (i.form) {
			K = i.form;
			if (!K.getAttribute(B)) {
				P.addEventListener(K, "submit", q(K));
				K.setAttribute(B, "true")
			}
		}
		P.addEventListener(i, "focus", b(i));
		P.addEventListener(i, "blur", x(i));
		if (F) {
			P.addEventListener(i, "keydown", e(i));
			P.addEventListener(i, "keyup", L(i));
			P.addEventListener(i, "click", d(i))
		}
		i.setAttribute(p, "true");
		i.setAttribute(D, G);
		N(i)
	}
	y.nativeSupport = m.placeholder !== void 0;
	if (!y.nativeSupport) {
		A = document.getElementsByTagName("input");
		o = document.getElementsByTagName("textarea");
		F = E.getAttribute(h) === "false";
		a = E.getAttribute(Q) !== "false";
		n = document.createElement("style");
		n.type = "text/css";
		g = document.createTextNode("." + J + " { color:" + t + "; }");
		if (n.styleSheet) {
			n.styleSheet.cssText = g.nodeValue
		} else {
			n.appendChild(g)
		}
		s.insertBefore(n, s.firstChild);
		for (S = 0, v = A.length + o.length; S < v; S++) {
			R = S < A.length ? A[S] : o[S - A.length];
			G = R.attributes.placeholder;
			if (G) {
				G = G.nodeValue;
				if (G && P.inArray(M, R.type)) {
					w(R)
				}
			}
		}
		I = setInterval(function() {
			for (S = 0, v = A.length + o.length; S < v; S++) {
				R = S < A.length ? A[S] : o[S - A.length];
				G = R.attributes.placeholder;
				if (G) {
					G = G.nodeValue;
					if (G && P.inArray(M, R.type)) {
						if (!R.getAttribute(p)) {
							w(R)
						}
						if (G !== R.getAttribute(D) || (R.type === "password" && !R.getAttribute(k))) {
							if (R.type === "password" && !R.getAttribute(k) && P.changeType(R, "text")) {
								R.setAttribute(k, "password")
							}
							if (R.value === R.getAttribute(D)) {
								R.value = G
							}
							R.setAttribute(D, G)
						}
					}
				}
			}
			if (!a) {
				clearInterval(I)
			}
		}, 100)
	}
	y.disable = y.nativeSupport ? T : C;
	y.enable = y.nativeSupport ? T : f
}(this));