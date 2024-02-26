(()=>{var e,t,r={505:(e,t,r)=>{e.exports=r(15)},592:(e,t,r)=>{"use strict";var n=r(516),o=r(522),s=r(948),i=r(106),a=r(615),u=r(631),c=r(202),l=r(763);e.exports=function(e){return new Promise((function(t,r){var f=e.data,p=e.headers,d=e.responseType;n.isFormData(f)&&delete p["Content-Type"];var h=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",g=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";p.Authorization="Basic "+btoa(m+":"+g)}var b=a(e.baseURL,e.url);function v(){if(h){var n="getAllResponseHeaders"in h?u(h.getAllResponseHeaders()):null,s={data:d&&"text"!==d&&"json"!==d?h.response:h.responseText,status:h.status,statusText:h.statusText,headers:n,config:e,request:h};o(t,r,s),h=null}}if(h.open(e.method.toUpperCase(),i(b,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,"onloadend"in h?h.onloadend=v:h.onreadystatechange=function(){h&&4===h.readyState&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))&&setTimeout(v)},h.onabort=function(){h&&(r(l("Request aborted",e,"ECONNABORTED",h)),h=null)},h.onerror=function(){r(l("Network Error",e,null,h)),h=null},h.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",h)),h=null},n.isStandardBrowserEnv()){var y=(e.withCredentials||c(b))&&e.xsrfCookieName?s.read(e.xsrfCookieName):void 0;y&&(p[e.xsrfHeaderName]=y)}"setRequestHeader"in h&&n.forEach(p,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete p[t]:h.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(h.withCredentials=!!e.withCredentials),d&&"json"!==d&&(h.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){h&&(h.abort(),r(e),h=null)})),f||(f=null),h.send(f)}))}},15:(e,t,r)=>{"use strict";var n=r(516),o=r(12),s=r(155),i=r(343);function a(e){var t=new s(e),r=o(s.prototype.request,t);return n.extend(r,s.prototype,t),n.extend(r,t),r}var u=a(r(987));u.Axios=s,u.create=function(e){return a(i(u.defaults,e))},u.Cancel=r(928),u.CancelToken=r(191),u.isCancel=r(864),u.all=function(e){return Promise.all(e)},u.spread=r(980),u.isAxiosError=r(19),e.exports=u,e.exports.default=u},928:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},191:(e,t,r)=>{"use strict";var n=r(928);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},864:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},155:(e,t,r)=>{"use strict";var n=r(516),o=r(106),s=r(471),i=r(490),a=r(343),u=r(841),c=u.validators;function l(e){this.defaults=e,this.interceptors={request:new s,response:new s}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&u.assertOptions(t,{silentJSONParsing:c.transitional(c.boolean,"1.0.0"),forcedJSONParsing:c.transitional(c.boolean,"1.0.0"),clarifyTimeoutError:c.transitional(c.boolean,"1.0.0")},!1);var r=[],n=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(n=n&&t.synchronous,r.unshift(t.fulfilled,t.rejected))}));var o,s=[];if(this.interceptors.response.forEach((function(e){s.push(e.fulfilled,e.rejected)})),!n){var l=[i,void 0];for(Array.prototype.unshift.apply(l,r),l=l.concat(s),o=Promise.resolve(e);l.length;)o=o.then(l.shift(),l.shift());return o}for(var f=e;r.length;){var p=r.shift(),d=r.shift();try{f=p(f)}catch(e){d(e);break}}try{o=i(f)}catch(e){return Promise.reject(e)}for(;s.length;)o=o.then(s.shift(),s.shift());return o},l.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,r){return this.request(a(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,r,n){return this.request(a(n||{},{method:e,url:t,data:r}))}})),e.exports=l},471:(e,t,r)=>{"use strict";var n=r(516);function o(){this.handlers=[]}o.prototype.use=function(e,t,r){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!r&&r.synchronous,runWhen:r?r.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},615:(e,t,r)=>{"use strict";var n=r(137),o=r(680);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},763:(e,t,r)=>{"use strict";var n=r(449);e.exports=function(e,t,r,o,s){var i=new Error(e);return n(i,t,r,o,s)}},490:(e,t,r)=>{"use strict";var n=r(516),o=r(881),s=r(864),i=r(987);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||i.adapter)(e).then((function(t){return a(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return s(t)||(a(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},449:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},343:(e,t,r)=>{"use strict";var n=r(516);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],s=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function u(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function c(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=u(void 0,e[o])):r[o]=u(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=u(void 0,t[e]))})),n.forEach(s,c),n.forEach(i,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=u(void 0,e[o])):r[o]=u(void 0,t[o])})),n.forEach(a,(function(n){n in t?r[n]=u(e[n],t[n]):n in e&&(r[n]=u(void 0,e[n]))}));var l=o.concat(s).concat(i).concat(a),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(f,c),r}},522:(e,t,r)=>{"use strict";var n=r(763);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},881:(e,t,r)=>{"use strict";var n=r(516),o=r(987);e.exports=function(e,t,r){var s=this||o;return n.forEach(r,(function(r){e=r.call(s,e,t)})),e}},987:(e,t,r)=>{"use strict";var n=r(516),o=r(18),s=r(449),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var u,c={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(u=r(592)),u),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,r){if(n.isString(e))try{return(0,JSON.parse)(e),n.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional,r=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,i=!r&&"json"===this.responseType;if(i||o&&n.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(i){if("SyntaxError"===e.name)throw s(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c},12:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},106:(e,t,r)=>{"use strict";var n=r(516);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var s;if(r)s=r(t);else if(n.isURLSearchParams(t))s=t.toString();else{var i=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))})))})),s=i.join("&")}if(s){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}},680:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},948:(e,t,r)=>{"use strict";var n=r(516);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),n.isString(o)&&a.push("path="+o),n.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},137:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},19:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},202:(e,t,r)=>{"use strict";var n=r(516);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},18:(e,t,r)=>{"use strict";var n=r(516);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},631:(e,t,r)=>{"use strict";var n=r(516),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,s,i={};return e?(n.forEach(e.split("\n"),(function(e){if(s=e.indexOf(":"),t=n.trim(e.substr(0,s)).toLowerCase(),r=n.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([r]):i[t]?i[t]+", "+r:r}})),i):i}},980:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},841:(e,t,r)=>{"use strict";var n=r(198),o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}}));var s={},i=n.version.split(".");function a(e,t){for(var r=t?t.split("."):i,n=e.split("."),o=0;o<3;o++){if(r[o]>n[o])return!0;if(r[o]<n[o])return!1}return!1}o.transitional=function(e,t,r){var o=t&&a(t);function i(e,t){return"[Axios v"+n.version+"] Transitional option '"+e+"'"+t+(r?". "+r:"")}return function(r,n,a){if(!1===e)throw new Error(i(n," has been removed in "+t));return o&&!s[n]&&(s[n]=!0,console.warn(i(n," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(r,n,a)}},e.exports={isOlderVersion:a,assertOptions:function(e,t,r){if("object"!=typeof e)throw new TypeError("options must be an object");for(var n=Object.keys(e),o=n.length;o-- >0;){var s=n[o],i=t[s];if(i){var a=e[s],u=void 0===a||i(a,s,e);if(!0!==u)throw new TypeError("option "+s+" must be "+u)}else if(!0!==r)throw Error("Unknown option "+s)}},validators:o}},516:(e,t,r)=>{"use strict";var n=r(12),o=Object.prototype.toString;function s(e){return"[object Array]"===o.call(e)}function i(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function u(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function c(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:u,isUndefined:i,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:c,isStream:function(e){return a(e)&&c(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):s(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)l(arguments[n],r);return t},extend:function(e,t,r){return l(t,(function(t,o){e[o]=r&&"function"==typeof t?n(t,r):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},376:(e,t,r)=>{"use strict";const n=r(505),o={poll:{maxSockets:500},timeout:5e3},s={GOOGLE:"google",OPENLIBRARY:"openlibrary",WORLDCAT:"worldcat",ISBNDB:"isbndb"},i=[s.GOOGLE,s.OPENLIBRARY,s.WORLDCAT,s.ISBNDB],a={[s.GOOGLE]:function(e,t){const r=Object.assign({},o,t,{url:`https://www.googleapis.com/books/v1/volumes?q=isbn:${e}`});return n.request(r).then((({status:t,data:r})=>{if(200!==t)throw new Error(`wrong response code: ${t}`);const n=r;if(!n.totalItems)throw new Error(`no books found with isbn: ${e}`);if(!n.items||0===n.items.length)throw new Error(`no volume info found for book with isbn: ${e}`);return n.items[0].volumeInfo}))},[s.OPENLIBRARY]:function(e,t){const r=Object.assign({},o,t,{url:`https://openlibrary.org/api/books?bibkeys=ISBN:${e}&format=json&jscmd=details`});return n.request(r).then((({status:t,data:r})=>{if(200!==t)throw new Error(`wrong response code: ${t}`);const n=r[`ISBN:${e}`];if(!n)throw new Error(`no books found with isbn: ${e}`);return function(e){const t={title:e.details.title,publishedDate:e.details.publish_date,authors:[],description:e.details.subtitle,industryIdentifiers:[],pageCount:e.details.number_of_pages,printType:"BOOK",categories:[],imageLinks:{smallThumbnail:e.thumbnail_url,thumbnail:e.thumbnail_url},previewLink:e.preview_url,infoLink:e.info_url};return e.details.publishers?t.publisher=e.details.publishers[0]:t.publisher="",e.details.authors&&e.details.authors.forEach((({name:e})=>{t.authors.push(e)})),e.details.languages?e.details.languages.forEach((({key:e})=>{switch(e){case"/languages/eng":t.language="en";break;case"/languages/spa":t.language="es";break;case"/languages/fre":t.language="fr";break;default:t.language="unknown"}})):t.language="unknown",t}(n)}))},[s.WORLDCAT]:function(e,t){const r=Object.assign({},o,t,{url:`http://xisbn.worldcat.org/webservices/xid/isbn/${e}?method=getMetadata&fl=*&format=json`});return n.request(r).then((({status:t,statusCode:r,data:n})=>{if(200!==t)throw new Error(`wrong response code: ${r}`);const o=n;if("ok"!==o.stat)throw new Error(`no books found with isbn: ${e}`);return function(e){const t={title:e.title,publishedDate:e.year,authors:[],description:null,industryIdentifiers:[],pageCount:null,printType:"BOOK",categories:[],imageLinks:{},publisher:e.publisher};switch(e.author&&t.authors.push(e.author),e.lang){case"eng":t.language="en";break;case"spa":t.language="es";break;case"fre":t.language="fr";break;default:t.language="unknown"}return t}(o.list[0])}))},[s.ISBNDB]:function(e,t){const r=Object.assign({},o,t,{url:`https://api2.isbndb.com/book/${e}`,headers:{Authorization:process.env.ISBNDB_API_KEY||""}});return n.request(r).then((({status:t,statusCode:r,data:n})=>{if(200!==t)throw new Error(`wrong response code: ${r}`);const o=n;if(!o.book)throw new Error(`no books found with isbn: ${e}`);return{title:(s=o.book).title_long,publishedDate:s.date_published,authors:s.authors,description:s.overview,industryIdentifiers:[s.isbn,s.isbn13,s.dewey_decimal].filter((e=>!!e)),pageCount:s.pages,printType:"BOOK",categories:s.subjects,imageLinks:{smallThumbnail:s.image,thumbnail:s.image},publisher:s.publisher,language:s.language};var s}))}};e.exports=new class{constructor(){this.PROVIDER_NAMES=s,this._resetProviders()}_resetProviders(){this._providers=i}provider(e){if(!Array.isArray(e))throw new Error("`providers` must be an array.");if(!e.length)return this;if(!(e=[...new Set(e)]).reduce(((e,t)=>e&&i.includes(t)),!0))throw new Error("Please pass in supported providers.");return this._providers=e,this}resolve(e){const{options:t,callback:r}=function(e){let t=null,r=null;if(1===e.length)t=null,r=null;else if(2===e.length){const n="function"==typeof e[1];t=n?null:e[1],r=n?e[1]:null}else 3===e.length&&(t=e[1],r=e[2]);return{options:t,callback:r}}(Array.from(arguments)),n=function(e,t,r){const[n,...o]=e,s=a[n](t,r);return o.length?o.reduce(((e,n)=>e.catch((e=>a[n](t,r)))),s):s}(this._providers,e,t).then((e=>{if("function"!=typeof r)return e;r(null,e)})).catch((e=>{if("function"!=typeof r)throw e;r(e,null)}));if(this._resetProviders(),"function"!=typeof r)return n}}},198:e=>{"use strict";e.exports=JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')}},n={};e=function e(t){var o=n[t];if(void 0!==o)return o.exports;var s=n[t]={exports:{}};return r[t](s,s.exports,e),s.exports}(376),t=1,document.getElementById("button").onclick=function(){var r;r=document.getElementById("myISBN").value,e.provider(["google","openlibrary"]).resolve(r,(function(e,r){if(e)console.log("Book not found",e),alert("Book not found!");else{console.log("Book found",r);var n=document.getElementById("myTable").insertRow(-1),o=n.insertCell(0),s=n.insertCell(1),i=n.insertCell(1),a=n.insertCell(1),u=n.insertCell(1);o.innerHTML=t,s.innerHTML=r.publishedDate,i.innerHTML=r.publisher,a.innerHTML=r.title,u.innerHTML=r.authors,t+=1}}))},document.getElementById("dlbutton").onclick=function(){let e=[],t=document.getElementsByTagName("tr");for(let r=0;r<t.length;r++){let n=t[r].querySelectorAll("td,th"),o=[];for(let e=0;e<n.length;e++)o.push(n[e].innerHTML);e.push(o.join(";"))}e=e.join("\n"),function(e){CSVFile=new Blob([e],{type:"text/csv"});let t=document.createElement("a");t.download="isbn.csv";let r=window.URL.createObjectURL(CSVFile);t.href=r,t.style.display="none",document.body.appendChild(t),t.click(),document.body.removeChild(t)}(e)},document.getElementById("buttoncam").onclick=function(){camera()}})();