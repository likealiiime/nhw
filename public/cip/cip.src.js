/*! 1.3.276 */
//MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2009 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:"1.2.2",build:"f0491d62fbb7e906789aa3733d6a67d43e5af7c9"};var Native=function(k){k=k||{};var a=k.name;var i=k.legacy;var b=k.protect;
var c=k.implement;var h=k.generics;var f=k.initialize;var g=k.afterImplement||function(){};var d=f||i;h=h!==false;d.constructor=Native;d.$family={name:"native"};
if(i&&f){d.prototype=i.prototype;}d.prototype.constructor=d;if(a){var e=a.toLowerCase();d.prototype.$family={name:e};Native.typize(d,e);}var j=function(n,l,o,m){if(!b||m||!n.prototype[l]){n.prototype[l]=o;
}if(h){Native.genericize(n,l,b);}g.call(n,l,o);return n;};d.alias=function(n,l,o){if(typeof n=="string"){if((n=this.prototype[n])){return j(this,l,n,o);
}}for(var m in n){this.alias(m,n[m],l);}return this;};d.implement=function(m,l,o){if(typeof m=="string"){return j(this,m,l,o);}for(var n in m){j(this,n,m[n],l);
}return this;};if(c){d.implement(c);}return d;};Native.genericize=function(b,c,a){if((!a||!b[c])&&typeof b.prototype[c]=="function"){b[c]=function(){var d=Array.prototype.slice.call(arguments);
return b.prototype[c].apply(d.shift(),d);};}};Native.implement=function(d,c){for(var b=0,a=d.length;b<a;b++){d[b].implement(c);}};Native.typize=function(a,b){if(!a.type){a.type=function(c){return($type(c)===b);
};}};(function(){var a={Array:Array,Date:Date,Function:Function,Number:Number,RegExp:RegExp,String:String};for(var h in a){new Native({name:h,initialize:a[h],protect:true});
}var d={"boolean":Boolean,"native":Native,object:Object};for(var c in d){Native.typize(d[c],c);}var f={Array:["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf"],String:["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]};
for(var e in f){for(var b=f[e].length;b--;){Native.genericize(window[e],f[e][b],true);}}})();var Hash=new Native({name:"Hash",initialize:function(a){if($type(a)=="hash"){a=$unlink(a.getClean());
}for(var b in a){this[b]=a[b];}return this;}});Hash.implement({forEach:function(b,c){for(var a in this){if(this.hasOwnProperty(a)){b.call(c,this[a],a,this);
}}},getClean:function(){var b={};for(var a in this){if(this.hasOwnProperty(a)){b[a]=this[a];}}return b;},getLength:function(){var b=0;for(var a in this){if(this.hasOwnProperty(a)){b++;
}}return b;}});Hash.alias("forEach","each");Array.implement({forEach:function(c,d){for(var b=0,a=this.length;b<a;b++){c.call(d,this[b],b,this);}}});Array.alias("forEach","each");
function $A(b){if(b.item){var a=b.length,c=new Array(a);while(a--){c[a]=b[a];}return c;}return Array.prototype.slice.call(b);}function $arguments(a){return function(){return arguments[a];
};}function $chk(a){return !!(a||a===0);}function $clear(a){clearTimeout(a);clearInterval(a);return null;}function $defined(a){return(a!=undefined);}function $each(c,b,d){var a=$type(c);
((a=="arguments"||a=="collection"||a=="array")?Array:Hash).each(c,b,d);}function $empty(){}function $extend(c,a){for(var b in (a||{})){c[b]=a[b];}return c;
}function $H(a){return new Hash(a);}function $lambda(a){return(typeof a=="function")?a:function(){return a;};}function $merge(){var a=Array.slice(arguments);
a.unshift({});return $mixin.apply(null,a);}function $mixin(e){for(var d=1,a=arguments.length;d<a;d++){var b=arguments[d];if($type(b)!="object"){continue;
}for(var c in b){var g=b[c],f=e[c];e[c]=(f&&$type(g)=="object"&&$type(f)=="object")?$mixin(f,g):$unlink(g);}}return e;}function $pick(){for(var b=0,a=arguments.length;
b<a;b++){if(arguments[b]!=undefined){return arguments[b];}}return null;}function $random(b,a){return Math.floor(Math.random()*(a-b+1)+b);}function $splat(b){var a=$type(b);
return(a)?((a!="array"&&a!="arguments")?[b]:b):[];}var $time=Date.now||function(){return +new Date;};function $try(){for(var b=0,a=arguments.length;b<a;
b++){try{return arguments[b]();}catch(c){}}return null;}function $type(a){if(a==undefined){return false;}if(a.$family){return(a.$family.name=="number"&&!isFinite(a))?false:a.$family.name;
}if(a.nodeName){switch(a.nodeType){case 1:return"element";case 3:return(/\S/).test(a.nodeValue)?"textnode":"whitespace";}}else{if(typeof a.length=="number"){if(a.callee){return"arguments";
}else{if(a.item){return"collection";}}}}return typeof a;}function $unlink(c){var b;switch($type(c)){case"object":b={};for(var e in c){b[e]=$unlink(c[e]);
}break;case"hash":b=new Hash(c);break;case"array":b=[];for(var d=0,a=c.length;d<a;d++){b[d]=$unlink(c[d]);}break;default:return c;}return b;}var Browser=$merge({Engine:{name:"unknown",version:0},Platform:{name:(window.orientation!=undefined)?"ipod":(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase()},Features:{xpath:!!(document.evaluate),air:!!(window.runtime),query:!!(document.querySelector)},Plugins:{},Engines:{presto:function(){return(!window.opera)?false:((arguments.callee.caller)?960:((document.getElementsByClassName)?950:925));
},trident:function(){return(!window.ActiveXObject)?false:((window.XMLHttpRequest)?5:4);},webkit:function(){return(navigator.taintEnabled)?false:((Browser.Features.xpath)?((Browser.Features.query)?525:420):419);
},gecko:function(){return(document.getBoxObjectFor==undefined)?false:((document.getElementsByClassName)?19:18);}}},Browser||{});Browser.Platform[Browser.Platform.name]=true;
Browser.detect=function(){for(var b in this.Engines){var a=this.Engines[b]();if(a){this.Engine={name:b,version:a};this.Engine[b]=this.Engine[b+a]=true;
break;}}return{name:b,version:a};};Browser.detect();Browser.Request=function(){return $try(function(){return new XMLHttpRequest();},function(){return new ActiveXObject("MSXML2.XMLHTTP");
});};Browser.Features.xhr=!!(Browser.Request());Browser.Plugins.Flash=(function(){var a=($try(function(){return navigator.plugins["Shockwave Flash"].description;
},function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");})||"0 r0").match(/\d+/g);return{version:parseInt(a[0]||0+"."+a[1],10)||0,build:parseInt(a[2],10)||0};
})();function $exec(b){if(!b){return b;}if(window.execScript){window.execScript(b);}else{var a=document.createElement("script");a.setAttribute("type","text/javascript");
a[(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerText":"text"]=b;document.head.appendChild(a);document.head.removeChild(a);}return b;}Native.UID=1;
var $uid=(Browser.Engine.trident)?function(a){return(a.uid||(a.uid=[Native.UID++]))[0];}:function(a){return a.uid||(a.uid=Native.UID++);};var Window=new Native({name:"Window",legacy:(Browser.Engine.trident)?null:window.Window,initialize:function(a){$uid(a);
if(!a.Element){a.Element=$empty;if(Browser.Engine.webkit){a.document.createElement("iframe");}a.Element.prototype=(Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{};
}a.document.window=a;return $extend(a,Window.Prototype);},afterImplement:function(b,a){window[b]=Window.Prototype[b]=a;}});Window.Prototype={$family:{name:"window"}};
new Window(window);var Document=new Native({name:"Document",legacy:(Browser.Engine.trident)?null:window.Document,initialize:function(a){$uid(a);a.head=a.getElementsByTagName("head")[0];
a.html=a.getElementsByTagName("html")[0];if(Browser.Engine.trident&&Browser.Engine.version<=4){$try(function(){a.execCommand("BackgroundImageCache",false,true);
});}if(Browser.Engine.trident){a.window.attachEvent("onunload",function(){a.window.detachEvent("onunload",arguments.callee);a.head=a.html=a.window=null;
});}return $extend(a,Document.Prototype);},afterImplement:function(b,a){document[b]=Document.Prototype[b]=a;}});Document.Prototype={$family:{name:"document"}};
new Document(document);Array.implement({every:function(c,d){for(var b=0,a=this.length;b<a;b++){if(!c.call(d,this[b],b,this)){return false;}}return true;
},filter:function(d,e){var c=[];for(var b=0,a=this.length;b<a;b++){if(d.call(e,this[b],b,this)){c.push(this[b]);}}return c;},clean:function(){return this.filter($defined);
},indexOf:function(c,d){var a=this.length;for(var b=(d<0)?Math.max(0,a+d):d||0;b<a;b++){if(this[b]===c){return b;}}return -1;},map:function(d,e){var c=[];
for(var b=0,a=this.length;b<a;b++){c[b]=d.call(e,this[b],b,this);}return c;},some:function(c,d){for(var b=0,a=this.length;b<a;b++){if(c.call(d,this[b],b,this)){return true;
}}return false;},associate:function(c){var d={},b=Math.min(this.length,c.length);for(var a=0;a<b;a++){d[c[a]]=this[a];}return d;},link:function(c){var a={};
for(var e=0,b=this.length;e<b;e++){for(var d in c){if(c[d](this[e])){a[d]=this[e];delete c[d];break;}}}return a;},contains:function(a,b){return this.indexOf(a,b)!=-1;
},extend:function(c){for(var b=0,a=c.length;b<a;b++){this.push(c[b]);}return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[$random(0,this.length-1)]:null;
},include:function(a){if(!this.contains(a)){this.push(a);}return this;},combine:function(c){for(var b=0,a=c.length;b<a;b++){this.include(c[b]);}return this;
},erase:function(b){for(var a=this.length;a--;a){if(this[a]===b){this.splice(a,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var d=[];
for(var b=0,a=this.length;b<a;b++){var c=$type(this[b]);if(!c){continue;}d=d.concat((c=="array"||c=="collection"||c=="arguments")?Array.flatten(this[b]):this[b]);
}return d;},hexToRgb:function(b){if(this.length!=3){return null;}var a=this.map(function(c){if(c.length==1){c+=c;}return c.toInt(16);});return(b)?a:"rgb("+a+")";
},rgbToHex:function(d){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!d){return"transparent";}var b=[];for(var a=0;a<3;a++){var c=(this[a]-0).toString(16);
b.push((c.length==1)?"0"+c:c);}return(d)?b:"#"+b.join("");}});Function.implement({extend:function(a){for(var b in a){this[b]=a[b];}return this;},create:function(b){var a=this;
b=b||{};return function(d){var c=b.arguments;c=(c!=undefined)?$splat(c):Array.slice(arguments,(b.event)?1:0);if(b.event){c=[d||window.event].extend(c);
}var e=function(){return a.apply(b.bind||null,c);};if(b.delay){return setTimeout(e,b.delay);}if(b.periodical){return setInterval(e,b.periodical);}if(b.attempt){return $try(e);
}return e();};},run:function(a,b){return this.apply(b,$splat(a));},pass:function(a,b){return this.create({bind:b,arguments:a});},bind:function(b,a){return this.create({bind:b,arguments:a});
},bindWithEvent:function(b,a){return this.create({bind:b,arguments:a,event:true});},attempt:function(a,b){return this.create({bind:b,arguments:a,attempt:true})();
},delay:function(b,c,a){return this.create({bind:c,arguments:a,delay:b})();},periodical:function(c,b,a){return this.create({bind:b,arguments:a,periodical:c})();
}});Number.implement({limit:function(b,a){return Math.min(a,Math.max(b,this));},round:function(a){a=Math.pow(10,a||0);return Math.round(this*a)/a;},times:function(b,c){for(var a=0;
a<this;a++){b.call(c,a,this);}},toFloat:function(){return parseFloat(this);},toInt:function(a){return parseInt(this,a||10);}});Number.alias("times","each");
(function(b){var a={};b.each(function(c){if(!Number[c]){a[c]=function(){return Math[c].apply(null,[this].concat($A(arguments)));};}});Number.implement(a);
})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);String.implement({test:function(a,b){return((typeof a=="string")?new RegExp(a,b):a).test(this);
},contains:function(a,b){return(b)?(b+this+b).indexOf(b+a+b)>-1:this.indexOf(a)>-1;},trim:function(){return this.replace(/^\s+|\s+$/g,"");},clean:function(){return this.replace(/\s+/g," ").trim();
},camelCase:function(){return this.replace(/-\D/g,function(a){return a.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/[A-Z]/g,function(a){return("-"+a.charAt(0).toLowerCase());
});},capitalize:function(){return this.replace(/\b[a-z]/g,function(a){return a.toUpperCase();});},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");
},toInt:function(a){return parseInt(this,a||10);},toFloat:function(){return parseFloat(this);},hexToRgb:function(b){var a=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
return(a)?a.slice(1).hexToRgb(b):null;},rgbToHex:function(b){var a=this.match(/\d{1,3}/g);return(a)?a.rgbToHex(b):null;},stripScripts:function(b){var a="";
var c=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){a+=arguments[1]+"\n";return"";});if(b===true){$exec(a);}else{if($type(b)=="function"){b(a,c);
}}return c;},substitute:function(a,b){return this.replace(b||(/\\?\{([^{}]+)\}/g),function(d,c){if(d.charAt(0)=="\\"){return d.slice(1);}return(a[c]!=undefined)?a[c]:"";
});}});Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(b){for(var a in this){if(this.hasOwnProperty(a)&&this[a]===b){return a;}}return null;
},hasValue:function(a){return(Hash.keyOf(this,a)!==null);},extend:function(a){Hash.each(a,function(c,b){Hash.set(this,b,c);},this);return this;},combine:function(a){Hash.each(a,function(c,b){Hash.include(this,b,c);
},this);return this;},erase:function(a){if(this.hasOwnProperty(a)){delete this[a];}return this;},get:function(a){return(this.hasOwnProperty(a))?this[a]:null;
},set:function(a,b){if(!this[a]||this.hasOwnProperty(a)){this[a]=b;}return this;},empty:function(){Hash.each(this,function(b,a){delete this[a];},this);
return this;},include:function(a,b){if(this[a]==undefined){this[a]=b;}return this;},map:function(b,c){var a=new Hash;Hash.each(this,function(e,d){a.set(d,b.call(c,e,d,this));
},this);return a;},filter:function(b,c){var a=new Hash;Hash.each(this,function(e,d){if(b.call(c,e,d,this)){a.set(d,e);}},this);return a;},every:function(b,c){for(var a in this){if(this.hasOwnProperty(a)&&!b.call(c,this[a],a)){return false;
}}return true;},some:function(b,c){for(var a in this){if(this.hasOwnProperty(a)&&b.call(c,this[a],a)){return true;}}return false;},getKeys:function(){var a=[];
Hash.each(this,function(c,b){a.push(b);});return a;},getValues:function(){var a=[];Hash.each(this,function(b){a.push(b);});return a;},toQueryString:function(a){var b=[];
Hash.each(this,function(f,e){if(a){e=a+"["+e+"]";}var d;switch($type(f)){case"object":d=Hash.toQueryString(f,e);break;case"array":var c={};f.each(function(h,g){c[g]=h;
});d=Hash.toQueryString(c,e);break;default:d=e+"="+encodeURIComponent(f);}if(f!=undefined){b.push(d);}});return b.join("&");}});Hash.alias({keyOf:"indexOf",hasValue:"contains"});
var Event=new Native({name:"Event",initialize:function(a,f){f=f||window;var k=f.document;a=a||f.event;if(a.$extended){return a;}this.$extended=true;var j=a.type;
var g=a.target||a.srcElement;while(g&&g.nodeType==3){g=g.parentNode;}if(j.test(/key/)){var b=a.which||a.keyCode;var m=Event.Keys.keyOf(b);if(j=="keydown"){var d=b-111;
if(d>0&&d<13){m="f"+d;}}m=m||String.fromCharCode(b).toLowerCase();}else{if(j.match(/(click|mouse|menu)/i)){k=(!k.compatMode||k.compatMode=="CSS1Compat")?k.html:k.body;
var i={x:a.pageX||a.clientX+k.scrollLeft,y:a.pageY||a.clientY+k.scrollTop};var c={x:(a.pageX)?a.pageX-f.pageXOffset:a.clientX,y:(a.pageY)?a.pageY-f.pageYOffset:a.clientY};
if(j.match(/DOMMouseScroll|mousewheel/)){var h=(a.wheelDelta)?a.wheelDelta/120:-(a.detail||0)/3;}var e=(a.which==3)||(a.button==2);var l=null;if(j.match(/over|out/)){switch(j){case"mouseover":l=a.relatedTarget||a.fromElement;
break;case"mouseout":l=a.relatedTarget||a.toElement;}if(!(function(){while(l&&l.nodeType==3){l=l.parentNode;}return true;}).create({attempt:Browser.Engine.gecko})()){l=false;
}}}}return $extend(this,{event:a,type:j,page:i,client:c,rightClick:e,wheel:h,relatedTarget:l,target:g,code:b,key:m,shift:a.shiftKey,control:a.ctrlKey,alt:a.altKey,meta:a.metaKey});
}});Event.Keys=new Hash({enter:13,up:38,down:40,left:37,right:39,esc:27,space:32,backspace:8,tab:9,"delete":46});Event.implement({stop:function(){return this.stopPropagation().preventDefault();
},stopPropagation:function(){if(this.event.stopPropagation){this.event.stopPropagation();}else{this.event.cancelBubble=true;}return this;},preventDefault:function(){if(this.event.preventDefault){this.event.preventDefault();
}else{this.event.returnValue=false;}return this;}});function Class(b){if(b instanceof Function){b={initialize:b};}var a=function(){Object.reset(this);if(a._prototyping){return this;
}this._current=$empty;var c=(this.initialize)?this.initialize.apply(this,arguments):this;delete this._current;delete this.caller;return c;}.extend(this);
a.implement(b);a.constructor=Class;a.prototype.constructor=a;return a;}Function.prototype.protect=function(){this._protected=true;return this;};Object.reset=function(a,c){if(c==null){for(var e in a){Object.reset(a,e);
}return a;}delete a[c];switch($type(a[c])){case"object":var d=function(){};d.prototype=a[c];var b=new d;a[c]=Object.reset(b);break;case"array":a[c]=$unlink(a[c]);
break;}return a;};new Native({name:"Class",initialize:Class}).extend({instantiate:function(b){b._prototyping=true;var a=new b;delete b._prototyping;return a;
},wrap:function(a,b,c){if(c._origin){c=c._origin;}return function(){if(c._protected&&this._current==null){throw new Error('The method "'+b+'" cannot be called.');
}var e=this.caller,f=this._current;this.caller=f;this._current=arguments.callee;var d=c.apply(this,arguments);this._current=f;this.caller=e;return d;}.extend({_owner:a,_origin:c,_name:b});
}});Class.implement({implement:function(a,d){if($type(a)=="object"){for(var e in a){this.implement(e,a[e]);}return this;}var f=Class.Mutators[a];if(f){d=f.call(this,d);
if(d==null){return this;}}var c=this.prototype;switch($type(d)){case"function":if(d._hidden){return this;}c[a]=Class.wrap(this,a,d);break;case"object":var b=c[a];
if($type(b)=="object"){$mixin(b,d);}else{c[a]=$unlink(d);}break;case"array":c[a]=$unlink(d);break;default:c[a]=d;}return this;}});Class.Mutators={Extends:function(a){this.parent=a;
this.prototype=Class.instantiate(a);this.implement("parent",function(){var b=this.caller._name,c=this.caller._owner.parent.prototype[b];if(!c){throw new Error('The method "'+b+'" has no parent.');
}return c.apply(this,arguments);}.protect());},Implements:function(a){$splat(a).each(function(b){if(b instanceof Function){b=Class.instantiate(b);}this.implement(b);
},this);}};var Chain=new Class({$chain:[],chain:function(){this.$chain.extend(Array.flatten(arguments));return this;},callChain:function(){return(this.$chain.length)?this.$chain.shift().apply(this,arguments):false;
},clearChain:function(){this.$chain.empty();return this;}});var Events=new Class({$events:{},addEvent:function(c,b,a){c=Events.removeOn(c);if(b!=$empty){this.$events[c]=this.$events[c]||[];
this.$events[c].include(b);if(a){b.internal=true;}}return this;},addEvents:function(a){for(var b in a){this.addEvent(b,a[b]);}return this;},fireEvent:function(c,b,a){c=Events.removeOn(c);
if(!this.$events||!this.$events[c]){return this;}this.$events[c].each(function(d){d.create({bind:this,delay:a,"arguments":b})();},this);return this;},removeEvent:function(b,a){b=Events.removeOn(b);
if(!this.$events[b]){return this;}if(!a.internal){this.$events[b].erase(a);}return this;},removeEvents:function(c){var d;if($type(c)=="object"){for(d in c){this.removeEvent(d,c[d]);
}return this;}if(c){c=Events.removeOn(c);}for(d in this.$events){if(c&&c!=d){continue;}var b=this.$events[d];for(var a=b.length;a--;a){this.removeEvent(d,b[a]);
}}return this;}});Events.removeOn=function(a){return a.replace(/^on([A-Z])/,function(b,c){return c.toLowerCase();});};var Options=new Class({setOptions:function(){this.options=$merge.run([this.options].extend(arguments));
if(!this.addEvent){return this;}for(var a in this.options){if($type(this.options[a])!="function"||!(/^on[A-Z]/).test(a)){continue;}this.addEvent(a,this.options[a]);
delete this.options[a];}return this;}});var Element=new Native({name:"Element",legacy:window.Element,initialize:function(a,b){var c=Element.Constructors.get(a);
if(c){return c(b);}if(typeof a=="string"){return document.newElement(a,b);}return $(a).set(b);},afterImplement:function(a,b){Element.Prototype[a]=b;if(Array[a]){return;
}Elements.implement(a,function(){var c=[],g=true;for(var e=0,d=this.length;e<d;e++){var f=this[e][a].apply(this[e],arguments);c.push(f);if(g){g=($type(f)=="element");
}}return(g)?new Elements(c):c;});}});Element.Prototype={$family:{name:"element"}};Element.Constructors=new Hash;var IFrame=new Native({name:"IFrame",generics:false,initialize:function(){var e=Array.link(arguments,{properties:Object.type,iframe:$defined});
var c=e.properties||{};var b=$(e.iframe)||false;var d=c.onload||$empty;delete c.onload;c.id=c.name=$pick(c.id,c.name,b.id,b.name,"IFrame_"+$time());b=new Element(b||"iframe",c);
var a=function(){var f=$try(function(){return b.contentWindow.location.host;});if(f&&f==window.location.host){var g=new Window(b.contentWindow);new Document(b.contentWindow.document);
$extend(g.Element.prototype,Element.Prototype);}d.call(b.contentWindow,b.contentWindow.document);};(window.frames[c.id])?a():b.addListener("load",a);return b;
}});var Elements=new Native({initialize:function(f,b){b=$extend({ddup:true,cash:true},b);f=f||[];if(b.ddup||b.cash){var g={},e=[];for(var c=0,a=f.length;
c<a;c++){var d=$.element(f[c],!b.cash);if(b.ddup){if(g[d.uid]){continue;}g[d.uid]=true;}e.push(d);}f=e;}return(b.cash)?$extend(f,this):f;}});Elements.implement({filter:function(a,b){if(!a){return this;
}return new Elements(Array.filter(this,(typeof a=="string")?function(c){return c.match(a);}:a,b));}});Document.implement({newElement:function(a,b){if(Browser.Engine.trident&&b){["name","type","checked"].each(function(c){if(!b[c]){return;
}a+=" "+c+'="'+b[c]+'"';if(c!="checked"){delete b[c];}});a="<"+a+">";}return $.element(this.createElement(a)).set(b);},newTextNode:function(a){return this.createTextNode(a);
},getDocument:function(){return this;},getWindow:function(){return this.window;}});Window.implement({$:function(b,c){if(b&&b.$family&&b.uid){return b;}var a=$type(b);
return($[a])?$[a](b,c,this.document):null;},$$:function(a){if(arguments.length==1&&typeof a=="string"){return this.document.getElements(a);}var f=[];var c=Array.flatten(arguments);
for(var d=0,b=c.length;d<b;d++){var e=c[d];switch($type(e)){case"element":f.push(e);break;case"string":f.extend(this.document.getElements(e,true));}}return new Elements(f);
},getDocument:function(){return this.document;},getWindow:function(){return this;}});$.string=function(c,b,a){c=a.getElementById(c);return(c)?$.element(c,b):null;
};$.element=function(a,d){$uid(a);if(!d&&!a.$family&&!(/^object|embed$/i).test(a.tagName)){var b=Element.Prototype;for(var c in b){a[c]=b[c];}}return a;
};$.object=function(b,c,a){if(b.toElement){return $.element(b.toElement(a),c);}return null;};$.textnode=$.whitespace=$.window=$.document=$arguments(0);
Native.implement([Element,Document],{getElement:function(a,b){return $(this.getElements(a,true)[0]||null,b);},getElements:function(a,d){a=a.split(",");
var c=[];var b=(a.length>1);a.each(function(e){var f=this.getElementsByTagName(e.trim());(b)?c.extend(f):c=f;},this);return new Elements(c,{ddup:b,cash:!d});
}});(function(){var h={},f={};var i={input:"checked",option:"selected",textarea:(Browser.Engine.webkit&&Browser.Engine.version<420)?"innerHTML":"value"};
var c=function(l){return(f[l]||(f[l]={}));};var g=function(n,l){if(!n){return;}var m=n.uid;if(Browser.Engine.trident){if(n.clearAttributes){var q=l&&n.cloneNode(false);
n.clearAttributes();if(q){n.mergeAttributes(q);}}else{if(n.removeEvents){n.removeEvents();}}if((/object/i).test(n.tagName)){for(var o in n){if(typeof n[o]=="function"){n[o]=$empty;
}}Element.dispose(n);}}if(!m){return;}h[m]=f[m]=null;};var d=function(){Hash.each(h,g);if(Browser.Engine.trident){$A(document.getElementsByTagName("object")).each(g);
}if(window.CollectGarbage){CollectGarbage();}h=f=null;};var j=function(n,l,s,m,p,r){var o=n[s||l];var q=[];while(o){if(o.nodeType==1&&(!m||Element.match(o,m))){if(!p){return $(o,r);
}q.push(o);}o=o[l];}return(p)?new Elements(q,{ddup:false,cash:!r}):null;};var e={html:"innerHTML","class":"className","for":"htmlFor",text:(Browser.Engine.trident||(Browser.Engine.webkit&&Browser.Engine.version<420))?"innerText":"textContent"};
var b=["compact","nowrap","ismap","declare","noshade","checked","disabled","readonly","multiple","selected","noresize","defer"];var k=["value","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","maxLength","readOnly","rowSpan","tabIndex","useMap"];
b=b.associate(b);Hash.extend(e,b);Hash.extend(e,k.associate(k.map(String.toLowerCase)));var a={before:function(m,l){if(l.parentNode){l.parentNode.insertBefore(m,l);
}},after:function(m,l){if(!l.parentNode){return;}var n=l.nextSibling;(n)?l.parentNode.insertBefore(m,n):l.parentNode.appendChild(m);},bottom:function(m,l){l.appendChild(m);
},top:function(m,l){var n=l.firstChild;(n)?l.insertBefore(m,n):l.appendChild(m);}};a.inside=a.bottom;Hash.each(a,function(l,m){m=m.capitalize();Element.implement("inject"+m,function(n){l(this,$(n,true));
return this;});Element.implement("grab"+m,function(n){l($(n,true),this);return this;});});Element.implement({set:function(o,m){switch($type(o)){case"object":for(var n in o){this.set(n,o[n]);
}break;case"string":var l=Element.Properties.get(o);(l&&l.set)?l.set.apply(this,Array.slice(arguments,1)):this.setProperty(o,m);}return this;},get:function(m){var l=Element.Properties.get(m);
return(l&&l.get)?l.get.apply(this,Array.slice(arguments,1)):this.getProperty(m);},erase:function(m){var l=Element.Properties.get(m);(l&&l.erase)?l.erase.apply(this):this.removeProperty(m);
return this;},setProperty:function(m,n){var l=e[m];if(n==undefined){return this.removeProperty(m);}if(l&&b[m]){n=!!n;}(l)?this[l]=n:this.setAttribute(m,""+n);
return this;},setProperties:function(l){for(var m in l){this.setProperty(m,l[m]);}return this;},getProperty:function(m){var l=e[m];var n=(l)?this[l]:this.getAttribute(m,2);
return(b[m])?!!n:(l)?n:n||null;},getProperties:function(){var l=$A(arguments);return l.map(this.getProperty,this).associate(l);},removeProperty:function(m){var l=e[m];
(l)?this[l]=(l&&b[m])?false:"":this.removeAttribute(m);return this;},removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this;
},hasClass:function(l){return this.className.contains(l," ");},addClass:function(l){if(!this.hasClass(l)){this.className=(this.className+" "+l).clean();
}return this;},removeClass:function(l){this.className=this.className.replace(new RegExp("(^|\\s)"+l+"(?:\\s|$)"),"$1");return this;},toggleClass:function(l){return this.hasClass(l)?this.removeClass(l):this.addClass(l);
},adopt:function(){Array.flatten(arguments).each(function(l){l=$(l,true);if(l){this.appendChild(l);}},this);return this;},appendText:function(m,l){return this.grab(this.getDocument().newTextNode(m),l);
},grab:function(m,l){a[l||"bottom"]($(m,true),this);return this;},inject:function(m,l){a[l||"bottom"](this,$(m,true));return this;},replaces:function(l){l=$(l,true);
l.parentNode.replaceChild(this,l);return this;},wraps:function(m,l){m=$(m,true);return this.replaces(m).grab(m,l);},getPrevious:function(l,m){return j(this,"previousSibling",null,l,false,m);
},getAllPrevious:function(l,m){return j(this,"previousSibling",null,l,true,m);},getNext:function(l,m){return j(this,"nextSibling",null,l,false,m);},getAllNext:function(l,m){return j(this,"nextSibling",null,l,true,m);
},getFirst:function(l,m){return j(this,"nextSibling","firstChild",l,false,m);},getLast:function(l,m){return j(this,"previousSibling","lastChild",l,false,m);
},getParent:function(l,m){return j(this,"parentNode",null,l,false,m);},getParents:function(l,m){return j(this,"parentNode",null,l,true,m);},getSiblings:function(l,m){return this.getParent().getChildren(l,m).erase(this);
},getChildren:function(l,m){return j(this,"nextSibling","firstChild",l,true,m);},getWindow:function(){return this.ownerDocument.window;},getDocument:function(){return this.ownerDocument;
},getElementById:function(o,n){var m=this.ownerDocument.getElementById(o);if(!m){return null;}for(var l=m.parentNode;l!=this;l=l.parentNode){if(!l){return null;
}}return $.element(m,n);},getSelected:function(){return new Elements($A(this.options).filter(function(l){return l.selected;}));},getComputedStyle:function(m){if(this.currentStyle){return this.currentStyle[m.camelCase()];
}var l=this.getDocument().defaultView.getComputedStyle(this,null);return(l)?l.getPropertyValue([m.hyphenate()]):null;},toQueryString:function(){var l=[];
this.getElements("input, select, textarea",true).each(function(m){if(!m.name||m.disabled){return;}var n=(m.tagName.toLowerCase()=="select")?Element.getSelected(m).map(function(o){return o.value;
}):((m.type=="radio"||m.type=="checkbox")&&!m.checked)?null:m.value;$splat(n).each(function(o){if(typeof o!="undefined"){l.push(m.name+"="+encodeURIComponent(o));
}});});return l.join("&");},clone:function(o,l){o=o!==false;var r=this.cloneNode(o);var n=function(v,u){if(!l){v.removeAttribute("id");}if(Browser.Engine.trident){v.clearAttributes();
v.mergeAttributes(u);v.removeAttribute("uid");if(v.options){var w=v.options,s=u.options;for(var t=w.length;t--;){w[t].selected=s[t].selected;}}}var x=i[u.tagName.toLowerCase()];
if(x&&u[x]){v[x]=u[x];}};if(o){var p=r.getElementsByTagName("*"),q=this.getElementsByTagName("*");for(var m=p.length;m--;){n(p[m],q[m]);}}n(r,this);return $(r);
},destroy:function(){Element.empty(this);Element.dispose(this);g(this,true);return null;},empty:function(){$A(this.childNodes).each(function(l){Element.destroy(l);
});return this;},dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this;},hasChild:function(l){l=$(l,true);if(!l){return false;
}if(Browser.Engine.webkit&&Browser.Engine.version<420){return $A(this.getElementsByTagName(l.tagName)).contains(l);}return(this.contains)?(this!=l&&this.contains(l)):!!(this.compareDocumentPosition(l)&16);
},match:function(l){return(!l||(l==this)||(Element.get(this,"tag")==l));}});Native.implement([Element,Window,Document],{addListener:function(o,n){if(o=="unload"){var l=n,m=this;
n=function(){m.removeListener("unload",n);l();};}else{h[this.uid]=this;}if(this.addEventListener){this.addEventListener(o,n,false);}else{this.attachEvent("on"+o,n);
}return this;},removeListener:function(m,l){if(this.removeEventListener){this.removeEventListener(m,l,false);}else{this.detachEvent("on"+m,l);}return this;
},retrieve:function(m,l){var o=c(this.uid),n=o[m];if(l!=undefined&&n==undefined){n=o[m]=l;}return $pick(n);},store:function(m,l){var n=c(this.uid);n[m]=l;
return this;},eliminate:function(l){var m=c(this.uid);delete m[l];return this;}});window.addListener("unload",d);})();Element.Properties=new Hash;Element.Properties.style={set:function(a){this.style.cssText=a;
},get:function(){return this.style.cssText;},erase:function(){this.style.cssText="";}};Element.Properties.tag={get:function(){return this.tagName.toLowerCase();
}};Element.Properties.html=(function(){var c=document.createElement("div");var a={table:[1,"<table>","</table>"],select:[1,"<select>","</select>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"]};
a.thead=a.tfoot=a.tbody;var b={set:function(){var e=Array.flatten(arguments).join("");var f=Browser.Engine.trident&&a[this.get("tag")];if(f){var g=c;g.innerHTML=f[1]+e+f[2];
for(var d=f[0];d--;){g=g.firstChild;}this.empty().adopt(g.childNodes);}else{this.innerHTML=e;}}};b.erase=b.set;return b;})();if(Browser.Engine.webkit&&Browser.Engine.version<420){Element.Properties.text={get:function(){if(this.innerText){return this.innerText;
}var a=this.ownerDocument.newElement("div",{html:this.innerHTML}).inject(this.ownerDocument.body);var b=a.innerText;a.destroy();return b;}};}Element.Properties.events={set:function(a){this.addEvents(a);
}};Native.implement([Element,Window,Document],{addEvent:function(e,g){var h=this.retrieve("events",{});h[e]=h[e]||{keys:[],values:[]};if(h[e].keys.contains(g)){return this;
}h[e].keys.push(g);var f=e,a=Element.Events.get(e),c=g,i=this;if(a){if(a.onAdd){a.onAdd.call(this,g);}if(a.condition){c=function(j){if(a.condition.call(this,j)){return g.call(this,j);
}return true;};}f=a.base||f;}var d=function(){return g.call(i);};var b=Element.NativeEvents[f];if(b){if(b==2){d=function(j){j=new Event(j,i.getWindow());
if(c.call(i,j)===false){j.stop();}};}this.addListener(f,d);}h[e].values.push(d);return this;},removeEvent:function(c,b){var a=this.retrieve("events");if(!a||!a[c]){return this;
}var f=a[c].keys.indexOf(b);if(f==-1){return this;}a[c].keys.splice(f,1);var e=a[c].values.splice(f,1)[0];var d=Element.Events.get(c);if(d){if(d.onRemove){d.onRemove.call(this,b);
}c=d.base||c;}return(Element.NativeEvents[c])?this.removeListener(c,e):this;},addEvents:function(a){for(var b in a){this.addEvent(b,a[b]);}return this;
},removeEvents:function(a){var c;if($type(a)=="object"){for(c in a){this.removeEvent(c,a[c]);}return this;}var b=this.retrieve("events");if(!b){return this;
}if(!a){for(c in b){this.removeEvents(c);}this.eliminate("events");}else{if(b[a]){while(b[a].keys[0]){this.removeEvent(a,b[a].keys[0]);}b[a]=null;}}return this;
},fireEvent:function(d,b,a){var c=this.retrieve("events");if(!c||!c[d]){return this;}c[d].keys.each(function(e){e.create({bind:this,delay:a,"arguments":b})();
},this);return this;},cloneEvents:function(d,a){d=$(d);var c=d.retrieve("events");if(!c){return this;}if(!a){for(var b in c){this.cloneEvents(d,b);}}else{if(c[a]){c[a].keys.each(function(e){this.addEvent(a,e);
},this);}}return this;}});Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
(function(){var a=function(b){var c=b.relatedTarget;if(c==undefined){return true;}if(c===false){return false;}return($type(this)!="document"&&c!=this&&c.prefix!="xul"&&!this.hasChild(c));
};Element.Events=new Hash({mouseenter:{base:"mouseover",condition:a},mouseleave:{base:"mouseout",condition:a},mousewheel:{base:(Browser.Engine.gecko)?"DOMMouseScroll":"mousewheel"}});
})();Element.Properties.styles={set:function(a){this.setStyles(a);}};Element.Properties.opacity={set:function(a,b){if(!b){if(a==0){if(this.style.visibility!="hidden"){this.style.visibility="hidden";
}}else{if(this.style.visibility!="visible"){this.style.visibility="visible";}}}if(!this.currentStyle||!this.currentStyle.hasLayout){this.style.zoom=1;}if(Browser.Engine.trident){this.style.filter=(a==1)?"":"alpha(opacity="+a*100+")";
}this.style.opacity=a;this.store("opacity",a);},get:function(){return this.retrieve("opacity",1);}};Element.implement({setOpacity:function(a){return this.set("opacity",a,true);
},getOpacity:function(){return this.get("opacity");},setStyle:function(b,a){switch(b){case"opacity":return this.set("opacity",parseFloat(a));case"float":b=(Browser.Engine.trident)?"styleFloat":"cssFloat";
}b=b.camelCase();if($type(a)!="string"){var c=(Element.Styles.get(b)||"@").split(" ");a=$splat(a).map(function(e,d){if(!c[d]){return"";}return($type(e)=="number")?c[d].replace("@",Math.round(e)):e;
}).join(" ");}else{if(a==String(Number(a))){a=Math.round(a);}}this.style[b]=a;return this;},getStyle:function(g){switch(g){case"opacity":return this.get("opacity");
case"float":g=(Browser.Engine.trident)?"styleFloat":"cssFloat";}g=g.camelCase();var a=this.style[g];if(!$chk(a)){a=[];for(var f in Element.ShortStyles){if(g!=f){continue;
}for(var e in Element.ShortStyles[f]){a.push(this.getStyle(e));}return a.join(" ");}a=this.getComputedStyle(g);}if(a){a=String(a);var c=a.match(/rgba?\([\d\s,]+\)/);
if(c){a=a.replace(c[0],c[0].rgbToHex());}}if(Browser.Engine.presto||(Browser.Engine.trident&&!$chk(parseInt(a,10)))){if(g.test(/^(height|width)$/)){var b=(g=="width")?["left","right"]:["top","bottom"],d=0;
b.each(function(h){d+=this.getStyle("border-"+h+"-width").toInt()+this.getStyle("padding-"+h).toInt();},this);return this["offset"+g.capitalize()]-d+"px";
}if((Browser.Engine.presto)&&String(a).test("px")){return a;}if(g.test(/(border(.+)Width|margin|padding)/)){return"0px";}}return a;},setStyles:function(b){for(var a in b){this.setStyle(a,b[a]);
}return this;},getStyles:function(){var a={};Array.each(arguments,function(b){a[b]=this.getStyle(b);},this);return a;}});Element.Styles=new Hash({left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@"});
Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};["Top","Right","Bottom","Left"].each(function(g){var f=Element.ShortStyles;
var b=Element.Styles;["margin","padding"].each(function(h){var i=h+g;f[h][i]=b[i]="@px";});var e="border"+g;f.border[e]=b[e]="@px @ rgb(@, @, @)";var d=e+"Width",a=e+"Style",c=e+"Color";
f[e]={};f.borderWidth[d]=f[e][d]=b[d]="@px";f.borderStyle[a]=f[e][a]=b[a]="@";f.borderColor[c]=f[e][c]=b[c]="rgb(@, @, @)";});(function(){Element.implement({scrollTo:function(h,i){if(b(this)){this.getWindow().scrollTo(h,i);
}else{this.scrollLeft=h;this.scrollTop=i;}return this;},getSize:function(){if(b(this)){return this.getWindow().getSize();}return{x:this.offsetWidth,y:this.offsetHeight};
},getScrollSize:function(){if(b(this)){return this.getWindow().getScrollSize();}return{x:this.scrollWidth,y:this.scrollHeight};},getScroll:function(){if(b(this)){return this.getWindow().getScroll();
}return{x:this.scrollLeft,y:this.scrollTop};},getScrolls:function(){var i=this,h={x:0,y:0};while(i&&!b(i)){h.x+=i.scrollLeft;h.y+=i.scrollTop;i=i.parentNode;
}return h;},getOffsetParent:function(){var h=this;if(b(h)){return null;}if(!Browser.Engine.trident){return h.offsetParent;}while((h=h.parentNode)&&!b(h)){if(d(h,"position")!="static"){return h;
}}return null;},getOffsets:function(){if(Browser.Engine.trident){var l=this.getBoundingClientRect(),j=this.getDocument().documentElement;var m=d(this,"position")=="fixed";
return{x:l.left+((m)?0:j.scrollLeft)-j.clientLeft,y:l.top+((m)?0:j.scrollTop)-j.clientTop};}var i=this,h={x:0,y:0};if(b(this)){return h;}while(i&&!b(i)){h.x+=i.offsetLeft;
h.y+=i.offsetTop;if(Browser.Engine.gecko){if(!f(i)){h.x+=c(i);h.y+=g(i);}var k=i.parentNode;if(k&&d(k,"overflow")!="visible"){h.x+=c(k);h.y+=g(k);}}else{if(i!=this&&Browser.Engine.webkit){h.x+=c(i);
h.y+=g(i);}}i=i.offsetParent;}if(Browser.Engine.gecko&&!f(this)){h.x-=c(this);h.y-=g(this);}return h;},getPosition:function(k){if(b(this)){return{x:0,y:0};
}var l=this.getOffsets(),i=this.getScrolls();var h={x:l.x-i.x,y:l.y-i.y};var j=(k&&(k=$(k)))?k.getPosition():{x:0,y:0};return{x:h.x-j.x,y:h.y-j.y};},getCoordinates:function(j){if(b(this)){return this.getWindow().getCoordinates();
}var h=this.getPosition(j),i=this.getSize();var k={left:h.x,top:h.y,width:i.x,height:i.y};k.right=k.left+k.width;k.bottom=k.top+k.height;return k;},computePosition:function(h){return{left:h.x-e(this,"margin-left"),top:h.y-e(this,"margin-top")};
},position:function(h){return this.setStyles(this.computePosition(h));}});Native.implement([Document,Window],{getSize:function(){if(Browser.Engine.presto||Browser.Engine.webkit){var i=this.getWindow();
return{x:i.innerWidth,y:i.innerHeight};}var h=a(this);return{x:h.clientWidth,y:h.clientHeight};},getScroll:function(){var i=this.getWindow(),h=a(this);
return{x:i.pageXOffset||h.scrollLeft,y:i.pageYOffset||h.scrollTop};},getScrollSize:function(){var i=a(this),h=this.getSize();return{x:Math.max(i.scrollWidth,h.x),y:Math.max(i.scrollHeight,h.y)};
},getPosition:function(){return{x:0,y:0};},getCoordinates:function(){var h=this.getSize();return{top:0,left:0,bottom:h.y,right:h.x,height:h.y,width:h.x};
}});var d=Element.getComputedStyle;function e(h,i){return d(h,i).toInt()||0;}function f(h){return d(h,"-moz-box-sizing")=="border-box";}function g(h){return e(h,"border-top-width");
}function c(h){return e(h,"border-left-width");}function b(h){return(/^(?:body|html)$/i).test(h.tagName);}function a(h){var i=h.getDocument();return(!i.compatMode||i.compatMode=="CSS1Compat")?i.html:i.body;
}})();Native.implement([Window,Document,Element],{getHeight:function(){return this.getSize().y;},getWidth:function(){return this.getSize().x;},getScrollTop:function(){return this.getScroll().y;
},getScrollLeft:function(){return this.getScroll().x;},getScrollHeight:function(){return this.getScrollSize().y;},getScrollWidth:function(){return this.getScrollSize().x;
},getTop:function(){return this.getPosition().y;},getLeft:function(){return this.getPosition().x;}});Native.implement([Document,Element],{getElements:function(h,g){h=h.split(",");
var c,e={};for(var d=0,b=h.length;d<b;d++){var a=h[d],f=Selectors.Utils.search(this,a,e);if(d!=0&&f.item){f=$A(f);}c=(d==0)?f:(c.item)?$A(c).concat(f):c.concat(f);
}return new Elements(c,{ddup:(h.length>1),cash:!g});}});Element.implement({match:function(b){if(!b||(b==this)){return true;}var d=Selectors.Utils.parseTagAndID(b);
var a=d[0],e=d[1];if(!Selectors.Filters.byID(this,e)||!Selectors.Filters.byTag(this,a)){return false;}var c=Selectors.Utils.parseSelector(b);return(c)?Selectors.Utils.filter(this,c,{}):true;
}});var Selectors={Cache:{nth:{},parsed:{}}};Selectors.RegExps={id:(/#([\w-]+)/),tag:(/^(\w+|\*)/),quick:(/^(\w+|\*)$/),splitter:(/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),combined:(/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)};
Selectors.Utils={chk:function(b,c){if(!c){return true;}var a=$uid(b);if(!c[a]){return c[a]=true;}return false;},parseNthArgument:function(h){if(Selectors.Cache.nth[h]){return Selectors.Cache.nth[h];
}var e=h.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!e){return false;}var g=parseInt(e[1],10);var d=(g||g===0)?g:1;var f=e[2]||false;var c=parseInt(e[3],10)||0;
if(d!=0){c--;while(c<1){c+=d;}while(c>=d){c-=d;}}else{d=c;f="index";}switch(f){case"n":e={a:d,b:c,special:"n"};break;case"odd":e={a:2,b:0,special:"n"};
break;case"even":e={a:2,b:1,special:"n"};break;case"first":e={a:0,special:"index"};break;case"last":e={special:"last-child"};break;case"only":e={special:"only-child"};
break;default:e={a:(d-1),special:"index"};}return Selectors.Cache.nth[h]=e;},parseSelector:function(e){if(Selectors.Cache.parsed[e]){return Selectors.Cache.parsed[e];
}var d,h={classes:[],pseudos:[],attributes:[]};while((d=Selectors.RegExps.combined.exec(e))){var i=d[1],g=d[2],f=d[3],b=d[5],c=d[6],j=d[7];if(i){h.classes.push(i);
}else{if(c){var a=Selectors.Pseudo.get(c);if(a){h.pseudos.push({parser:a,argument:j});}else{h.attributes.push({name:c,operator:"=",value:j});}}else{if(g){h.attributes.push({name:g,operator:f,value:b});
}}}}if(!h.classes.length){delete h.classes;}if(!h.attributes.length){delete h.attributes;}if(!h.pseudos.length){delete h.pseudos;}if(!h.classes&&!h.attributes&&!h.pseudos){h=null;
}return Selectors.Cache.parsed[e]=h;},parseTagAndID:function(b){var a=b.match(Selectors.RegExps.tag);var c=b.match(Selectors.RegExps.id);return[(a)?a[1]:"*",(c)?c[1]:false];
},filter:function(f,c,e){var d;if(c.classes){for(d=c.classes.length;d--;d){var g=c.classes[d];if(!Selectors.Filters.byClass(f,g)){return false;}}}if(c.attributes){for(d=c.attributes.length;
d--;d){var b=c.attributes[d];if(!Selectors.Filters.byAttribute(f,b.name,b.operator,b.value)){return false;}}}if(c.pseudos){for(d=c.pseudos.length;d--;d){var a=c.pseudos[d];
if(!Selectors.Filters.byPseudo(f,a.parser,a.argument,e)){return false;}}}return true;},getByTagAndID:function(b,a,d){if(d){var c=(b.getElementById)?b.getElementById(d,true):Element.getElementById(b,d,true);
return(c&&Selectors.Filters.byTag(c,a))?[c]:[];}else{return b.getElementsByTagName(a);}},search:function(o,h,t){var b=[];var c=h.trim().replace(Selectors.RegExps.splitter,function(k,j,i){b.push(j);
return":)"+i;}).split(":)");var p,e,A;for(var z=0,v=c.length;z<v;z++){var y=c[z];if(z==0&&Selectors.RegExps.quick.test(y)){p=o.getElementsByTagName(y);
continue;}var a=b[z-1];var q=Selectors.Utils.parseTagAndID(y);var B=q[0],r=q[1];if(z==0){p=Selectors.Utils.getByTagAndID(o,B,r);}else{var d={},g=[];for(var x=0,w=p.length;
x<w;x++){g=Selectors.Getters[a](g,p[x],B,r,d);}p=g;}var f=Selectors.Utils.parseSelector(y);if(f){e=[];for(var u=0,s=p.length;u<s;u++){A=p[u];if(Selectors.Utils.filter(A,f,t)){e.push(A);
}}p=e;}}return p;}};Selectors.Getters={" ":function(h,g,j,a,e){var d=Selectors.Utils.getByTagAndID(g,j,a);for(var c=0,b=d.length;c<b;c++){var f=d[c];if(Selectors.Utils.chk(f,e)){h.push(f);
}}return h;},">":function(h,g,j,a,f){var c=Selectors.Utils.getByTagAndID(g,j,a);for(var e=0,d=c.length;e<d;e++){var b=c[e];if(b.parentNode==g&&Selectors.Utils.chk(b,f)){h.push(b);
}}return h;},"+":function(c,b,a,e,d){while((b=b.nextSibling)){if(b.nodeType==1){if(Selectors.Utils.chk(b,d)&&Selectors.Filters.byTag(b,a)&&Selectors.Filters.byID(b,e)){c.push(b);
}break;}}return c;},"~":function(c,b,a,e,d){while((b=b.nextSibling)){if(b.nodeType==1){if(!Selectors.Utils.chk(b,d)){break;}if(Selectors.Filters.byTag(b,a)&&Selectors.Filters.byID(b,e)){c.push(b);
}}}return c;}};Selectors.Filters={byTag:function(b,a){return(a=="*"||(b.tagName&&b.tagName.toLowerCase()==a));},byID:function(a,b){return(!b||(a.id&&a.id==b));
},byClass:function(b,a){return(b.className&&b.className.contains(a," "));},byPseudo:function(a,d,c,b){return d.call(a,c,b);},byAttribute:function(c,d,b,e){var a=Element.prototype.getProperty.call(c,d);
if(!a){return(b=="!=");}if(!b||e==undefined){return true;}switch(b){case"=":return(a==e);case"*=":return(a.contains(e));case"^=":return(a.substr(0,e.length)==e);
case"$=":return(a.substr(a.length-e.length)==e);case"!=":return(a!=e);case"~=":return a.contains(e," ");case"|=":return a.contains(e,"-");}return false;
}};Selectors.Pseudo=new Hash({checked:function(){return this.checked;},empty:function(){return !(this.innerText||this.textContent||"").length;},not:function(a){return !Element.match(this,a);
},contains:function(a){return(this.innerText||this.textContent||"").contains(a);},"first-child":function(){return Selectors.Pseudo.index.call(this,0);},"last-child":function(){var a=this;
while((a=a.nextSibling)){if(a.nodeType==1){return false;}}return true;},"only-child":function(){var b=this;while((b=b.previousSibling)){if(b.nodeType==1){return false;
}}var a=this;while((a=a.nextSibling)){if(a.nodeType==1){return false;}}return true;},"nth-child":function(g,e){g=(g==undefined)?"n":g;var c=Selectors.Utils.parseNthArgument(g);
if(c.special!="n"){return Selectors.Pseudo[c.special].call(this,c.a,e);}var f=0;e.positions=e.positions||{};var d=$uid(this);if(!e.positions[d]){var b=this;
while((b=b.previousSibling)){if(b.nodeType!=1){continue;}f++;var a=e.positions[$uid(b)];if(a!=undefined){f=a+f;break;}}e.positions[d]=f;}return(e.positions[d]%c.a==c.b);
},index:function(a){var b=this,c=0;while((b=b.previousSibling)){if(b.nodeType==1&&++c>a){return false;}}return(c==a);},even:function(b,a){return Selectors.Pseudo["nth-child"].call(this,"2n+1",a);
},odd:function(b,a){return Selectors.Pseudo["nth-child"].call(this,"2n",a);},selected:function(){return this.selected;}});Element.Events.domready={onAdd:function(a){if(Browser.loaded){a.call(this);
}}};(function(){var b=function(){if(Browser.loaded){return;}Browser.loaded=true;window.fireEvent("domready");document.fireEvent("domready");};if(Browser.Engine.trident){var a=document.createElement("div");
(function(){($try(function(){a.doScroll("left");return $(a).inject(document.body).set("html","temp").dispose();}))?b():arguments.callee.delay(50);})();
}else{if(Browser.Engine.webkit&&Browser.Engine.version<525){(function(){(["loaded","complete"].contains(document.readyState))?b():arguments.callee.delay(50);
})();}else{window.addEvent("load",b);document.addEvent("DOMContentLoaded",b);}}})();var JSON=new Hash({$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(a){return JSON.$specialChars[a]||"\\u00"+Math.floor(a.charCodeAt()/16).toString(16)+(a.charCodeAt()%16).toString(16);
},encode:function(b){switch($type(b)){case"string":return'"'+b.replace(/[\x00-\x1f\\"]/g,JSON.$replaceChars)+'"';case"array":return"["+String(b.map(JSON.encode).filter($defined))+"]";
case"object":case"hash":var a=[];Hash.each(b,function(e,d){var c=JSON.encode(e);if(c){a.push(JSON.encode(d)+":"+c);}});return"{"+a+"}";case"number":case"boolean":return String(b);
case false:return"null";}return null;},decode:function(string,secure){if($type(string)!="string"||!string.length){return null;}if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){return null;
}return eval("("+string+")");}});Native.implement([Hash,Array,String,Number],{toJSON:function(){return JSON.encode(this);}});var Cookie=new Class({Implements:Options,options:{path:false,domain:false,duration:false,secure:false,document:document},initialize:function(b,a){this.key=b;
this.setOptions(a);},write:function(b){b=encodeURIComponent(b);if(this.options.domain){b+="; domain="+this.options.domain;}if(this.options.path){b+="; path="+this.options.path;
}if(this.options.duration){var a=new Date();a.setTime(a.getTime()+this.options.duration*24*60*60*1000);b+="; expires="+a.toGMTString();}if(this.options.secure){b+="; secure";
}this.options.document.cookie=this.key+"="+b;return this;},read:function(){var a=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.escapeRegExp()+"=([^;]*)");
return(a)?decodeURIComponent(a[1]):null;},dispose:function(){new Cookie(this.key,$merge(this.options,{duration:-1})).write("");return this;}});Cookie.write=function(b,c,a){return new Cookie(b,a).write(c);
};Cookie.read=function(a){return new Cookie(a).read();};Cookie.dispose=function(b,a){return new Cookie(b,a).dispose();};var Swiff=new Class({Implements:[Options],options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:"high",allowScriptAccess:"always",wMode:"transparent",swLiveConnect:true},callBacks:{},vars:{}},toElement:function(){return this.object;
},initialize:function(l,m){this.instance="Swiff_"+$time();this.setOptions(m);m=this.options;var b=this.id=m.id||this.instance;var a=$(m.container);Swiff.CallBacks[this.instance]={};
var e=m.params,g=m.vars,f=m.callBacks;var h=$extend({height:m.height,width:m.width},m.properties);var k=this;for(var d in f){Swiff.CallBacks[this.instance][d]=(function(n){return function(){return n.apply(k.object,arguments);
};})(f[d]);g[d]="Swiff.CallBacks."+this.instance+"."+d;}e.flashVars=Hash.toQueryString(g);if(Browser.Engine.trident){h.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
e.movie=l;}else{h.type="application/x-shockwave-flash";h.data=l;}var j='<object id="'+b+'"';for(var i in h){j+=" "+i+'="'+h[i]+'"';}j+=">";for(var c in e){if(e[c]){j+='<param name="'+c+'" value="'+e[c]+'" />';
}}j+="</object>";this.object=((a)?a.empty():new Element("div")).set("html",j).firstChild;},replaces:function(a){a=$(a,true);a.parentNode.replaceChild(this.toElement(),a);
return this;},inject:function(a){$(a,true).appendChild(this.toElement());return this;},remote:function(){return Swiff.remote.apply(Swiff,[this.toElement()].extend(arguments));
}});Swiff.CallBacks={};Swiff.remote=function(obj,fn){var rs=obj.CallFunction('<invoke name="'+fn+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+"</invoke>");
return eval(rs);};var Fx=new Class({Implements:[Chain,Events,Options],options:{fps:50,unit:false,duration:500,link:"ignore"},initialize:function(a){this.subject=this.subject||this;
this.setOptions(a);this.options.duration=Fx.Durations[this.options.duration]||this.options.duration.toInt();var b=this.options.wait;if(b===false){this.options.link="cancel";
}},getTransition:function(){return function(a){return -(Math.cos(Math.PI*a)-1)/2;};},step:function(){var a=$time();if(a<this.time+this.options.duration){var b=this.transition((a-this.time)/this.options.duration);
this.set(this.compute(this.from,this.to,b));}else{this.set(this.compute(this.from,this.to,1));this.complete();}},set:function(a){return a;},compute:function(c,b,a){return Fx.compute(c,b,a);
},check:function(){if(!this.timer){return true;}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.bind(this,arguments));
return false;}return false;},start:function(b,a){if(!this.check(b,a)){return this;}this.from=b;this.to=a;this.time=0;this.transition=this.getTransition();
this.startTimer();this.onStart();return this;},complete:function(){if(this.stopTimer()){this.onComplete();}return this;},cancel:function(){if(this.stopTimer()){this.onCancel();
}return this;},onStart:function(){this.fireEvent("start",this.subject);},onComplete:function(){this.fireEvent("complete",this.subject);if(!this.callChain()){this.fireEvent("chainComplete",this.subject);
}},onCancel:function(){this.fireEvent("cancel",this.subject).clearChain();},pause:function(){this.stopTimer();return this;},resume:function(){this.startTimer();
return this;},stopTimer:function(){if(!this.timer){return false;}this.time=$time()-this.time;this.timer=$clear(this.timer);return true;},startTimer:function(){if(this.timer){return false;
}this.time=$time()-this.time;this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);return true;}});Fx.compute=function(c,b,a){return(b-c)*a+c;
};Fx.Durations={"short":250,normal:500,"long":1000};Fx.CSS=new Class({Extends:Fx,prepare:function(d,e,b){b=$splat(b);var c=b[1];if(!$chk(c)){b[1]=b[0];
b[0]=d.getStyle(e);}var a=b.map(this.parse);return{from:a[0],to:a[1]};},parse:function(a){a=$lambda(a)();a=(typeof a=="string")?a.split(" "):$splat(a);
return a.map(function(c){c=String(c);var b=false;Fx.CSS.Parsers.each(function(f,e){if(b){return;}var d=f.parse(c);if($chk(d)){b={value:d,parser:f};}});
b=b||{value:c,parser:Fx.CSS.Parsers.String};return b;});},compute:function(d,c,b){var a=[];(Math.min(d.length,c.length)).times(function(e){a.push({value:d[e].parser.compute(d[e].value,c[e].value,b),parser:d[e].parser});
});a.$family={name:"fx:css:value"};return a;},serve:function(c,b){if($type(c)!="fx:css:value"){c=this.parse(c);}var a=[];c.each(function(d){a=a.concat(d.parser.serve(d.value,b));
});return a;},render:function(a,d,c,b){a.setStyle(d,this.serve(c,b));},search:function(a){if(Fx.CSS.Cache[a]){return Fx.CSS.Cache[a];}var b={};Array.each(document.styleSheets,function(e,d){var c=e.href;
if(c&&c.contains("://")&&!c.contains(document.domain)){return;}var f=e.rules||e.cssRules;Array.each(f,function(j,g){if(!j.style){return;}var h=(j.selectorText)?j.selectorText.replace(/^\w+/,function(i){return i.toLowerCase();
}):null;if(!h||!h.test("^"+a+"$")){return;}Element.Styles.each(function(k,i){if(!j.style[i]||Element.ShortStyles[i]){return;}k=String(j.style[i]);b[i]=(k.test(/^rgb/))?k.rgbToHex():k;
});});});return Fx.CSS.Cache[a]=b;}});Fx.CSS.Cache={};Fx.CSS.Parsers=new Hash({Color:{parse:function(a){if(a.match(/^#[0-9a-f]{3,6}$/i)){return a.hexToRgb(true);
}return((a=a.match(/(\d+),\s*(\d+),\s*(\d+)/)))?[a[1],a[2],a[3]]:false;},compute:function(c,b,a){return c.map(function(e,d){return Math.round(Fx.compute(c[d],b[d],a));
});},serve:function(a){return a.map(Number);}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(b,a){return(a)?b+a:b;}},String:{parse:$lambda(false),compute:$arguments(1),serve:$arguments(0)}});
Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=$(b);this.parent(a);},set:function(b,a){if(arguments.length==1){a=b;
b=this.property||this.options.property;}this.render(this.element,b,a,this.options.unit);return this;},start:function(c,e,d){if(!this.check(c,e,d)){return this;
}var b=Array.flatten(arguments);this.property=this.options.property||b.shift();var a=this.prepare(this.element,this.property,b);return this.parent(a.from,a.to);
}});Element.Properties.tween={set:function(a){var b=this.retrieve("tween");if(b){b.cancel();}return this.eliminate("tween").store("tween:options",$extend({link:"cancel"},a));
},get:function(a){if(a||!this.retrieve("tween")){if(a||!this.retrieve("tween:options")){this.set("tween",a);}this.store("tween",new Fx.Tween(this,this.retrieve("tween:options")));
}return this.retrieve("tween");}};Element.implement({tween:function(a,c,b){this.get("tween").start(arguments);return this;},fade:function(c){var e=this.get("tween"),d="opacity",a;
c=$pick(c,"toggle");switch(c){case"in":e.start(d,1);break;case"out":e.start(d,0);break;case"show":e.set(d,1);break;case"hide":e.set(d,0);break;case"toggle":var b=this.retrieve("fade:flag",this.get("opacity")==1);
e.start(d,(b)?0:1);this.store("fade:flag",!b);a=true;break;default:e.start(d,arguments);}if(!a){this.eliminate("fade:flag");}return this;},highlight:function(c,a){if(!a){a=this.retrieve("highlight:original",this.getStyle("background-color"));
a=(a=="transparent")?"#fff":a;}var b=this.get("tween");b.start("background-color",c||"#ffff88",a).chain(function(){this.setStyle("background-color",this.retrieve("highlight:original"));
b.callChain();}.bind(this));return this;}});Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(b,a){this.element=this.subject=$(b);this.parent(a);},set:function(a){if(typeof a=="string"){a=this.search(a);
}for(var b in a){this.render(this.element,b,a[b],this.options.unit);}return this;},compute:function(e,d,c){var a={};for(var b in e){a[b]=this.parent(e[b],d[b],c);
}return a;},start:function(b){if(!this.check(b)){return this;}if(typeof b=="string"){b=this.search(b);}var e={},d={};for(var c in b){var a=this.prepare(this.element,c,b[c]);
e[c]=a.from;d[c]=a.to;}return this.parent(e,d);}});Element.Properties.morph={set:function(a){var b=this.retrieve("morph");if(b){b.cancel();}return this.eliminate("morph").store("morph:options",$extend({link:"cancel"},a));
},get:function(a){if(a||!this.retrieve("morph")){if(a||!this.retrieve("morph:options")){this.set("morph",a);}this.store("morph",new Fx.Morph(this,this.retrieve("morph:options")));
}return this.retrieve("morph");}};Element.implement({morph:function(a){this.get("morph").start(a);return this;}});Fx.implement({getTransition:function(){var a=this.options.transition||Fx.Transitions.Sine.easeInOut;
if(typeof a=="string"){var b=a.split(":");a=Fx.Transitions;a=a[b[0]]||a[b[0].capitalize()];if(b[1]){a=a["ease"+b[1].capitalize()+(b[2]?b[2].capitalize():"")];
}}return a;}});Fx.Transition=function(b,a){a=$splat(a);return $extend(b,{easeIn:function(c){return b(c,a);},easeOut:function(c){return 1-b(1-c,a);},easeInOut:function(c){return(c<=0.5)?b(2*c,a)/2:(2-b(2*(1-c),a))/2;
}});};Fx.Transitions=new Hash({linear:$arguments(0)});Fx.Transitions.extend=function(a){for(var b in a){Fx.Transitions[b]=new Fx.Transition(a[b]);}};Fx.Transitions.extend({Pow:function(b,a){return Math.pow(b,a[0]||6);
},Expo:function(a){return Math.pow(2,8*(a-1));},Circ:function(a){return 1-Math.sin(Math.acos(a));},Sine:function(a){return 1-Math.sin((1-a)*Math.PI/2);
},Back:function(b,a){a=a[0]||1.618;return Math.pow(b,2)*((a+1)*b-a);},Bounce:function(f){var e;for(var d=0,c=1;1;d+=c,c/=2){if(f>=(7-4*d)/11){e=c*c-Math.pow((11-6*d-11*f)/4,2);
break;}}return e;},Elastic:function(b,a){return Math.pow(2,10*--b)*Math.cos(20*b*Math.PI*(a[0]||1)/3);}});["Quad","Cubic","Quart","Quint"].each(function(b,a){Fx.Transitions[b]=new Fx.Transition(function(c){return Math.pow(c,[a+2]);
});});var Request=new Class({Implements:[Chain,Events,Options],options:{url:"",data:"",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:true,format:false,method:"post",link:"ignore",isSuccess:null,emulation:true,urlEncoded:true,encoding:"utf-8",evalScripts:false,evalResponse:false,noCache:false},initialize:function(a){this.xhr=new Browser.Request();
this.setOptions(a);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers=new Hash(this.options.headers);},onStateChange:function(){if(this.xhr.readyState!=4||!this.running){return;
}this.running=false;this.status=0;$try(function(){this.status=this.xhr.status;}.bind(this));if(this.options.isSuccess.call(this,this.status)){this.response={text:this.xhr.responseText,xml:this.xhr.responseXML};
this.success(this.response.text,this.response.xml);}else{this.response={text:null,xml:null};this.failure();}this.xhr.onreadystatechange=$empty;},isSuccess:function(){return((this.status>=200)&&(this.status<300));
},processScripts:function(a){if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader("Content-type"))){return $exec(a);}return a.stripScripts(this.options.evalScripts);
},success:function(b,a){this.onSuccess(this.processScripts(b),a);},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain();
},failure:function(){this.onFailure();},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr);},setHeader:function(a,b){this.headers.set(a,b);
return this;},getHeader:function(a){return $try(function(){return this.xhr.getResponseHeader(a);}.bind(this));},check:function(){if(!this.running){return true;
}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.bind(this,arguments));return false;}return false;},send:function(j){if(!this.check(j)){return this;
}this.running=true;var h=$type(j);if(h=="string"||h=="element"){j={data:j};}var d=this.options;j=$extend({data:d.data,url:d.url,method:d.method},j);var f=j.data,b=j.url,a=j.method;
switch($type(f)){case"element":f=$(f).toQueryString();break;case"object":case"hash":f=Hash.toQueryString(f);}if(this.options.format){var i="format="+this.options.format;
f=(f)?i+"&"+f:i;}if(this.options.emulation&&["put","delete"].contains(a)){var g="_method="+a;f=(f)?g+"&"+f:g;a="post";}if(this.options.urlEncoded&&a=="post"){var c=(this.options.encoding)?"; charset="+this.options.encoding:"";
this.headers.set("Content-type","application/x-www-form-urlencoded"+c);}if(this.options.noCache){var e="noCache="+new Date().getTime();f=(f)?e+"&"+f:e;
}if(f&&a=="get"){b=b+(b.contains("?")?"&":"?")+f;f=null;}this.xhr.open(a.toUpperCase(),b,this.options.async);this.xhr.onreadystatechange=this.onStateChange.bind(this);
this.headers.each(function(l,k){try{this.xhr.setRequestHeader(k,l);}catch(m){this.fireEvent("exception",[k,l]);}},this);this.fireEvent("request");this.xhr.send(f);
if(!this.options.async){this.onStateChange();}return this;},cancel:function(){if(!this.running){return this;}this.running=false;this.xhr.abort();this.xhr.onreadystatechange=$empty;
this.xhr=new Browser.Request();this.fireEvent("cancel");return this;}});(function(){var a={};["get","post","put","delete","GET","POST","PUT","DELETE"].each(function(b){a[b]=function(){var c=Array.link(arguments,{url:String.type,data:$defined});
return this.send($extend(c,{method:b.toLowerCase()}));};});Request.implement(a);})();Request.HTML=new Class({Extends:Request,options:{update:false,append:false,evalScripts:true,filter:false},processHTML:function(c){var b=c.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
c=(b)?b[1]:c;var a=new Element("div");return $try(function(){var d="<root>"+c+"</root>",g;if(Browser.Engine.trident){g=new ActiveXObject("Microsoft.XMLDOM");
g.async=false;g.loadXML(d);}else{g=new DOMParser().parseFromString(d,"text/xml");}d=g.getElementsByTagName("root")[0];if(!d){return null;}for(var f=0,e=d.childNodes.length;
f<e;f++){var h=Element.clone(d.childNodes[f],true,true);if(h){a.grab(h);}}return a;})||a.set("html",c);},success:function(d){var c=this.options,b=this.response;
b.html=d.stripScripts(function(e){b.javascript=e;});var a=this.processHTML(b.html);b.tree=a.childNodes;b.elements=a.getElements("*");if(c.filter){b.tree=b.elements.filter(c.filter);
}if(c.update){$(c.update).empty().set("html",b.html);}else{if(c.append){$(c.append).adopt(a.getChildren());}}if(c.evalScripts){$exec(b.javascript);}this.onSuccess(b.tree,b.elements,b.html,b.javascript);
}});Element.Properties.send={set:function(a){var b=this.retrieve("send");if(b){b.cancel();}return this.eliminate("send").store("send:options",$extend({data:this,link:"cancel",method:this.get("method")||"post",url:this.get("action")},a));
},get:function(a){if(a||!this.retrieve("send")){if(a||!this.retrieve("send:options")){this.set("send",a);}this.store("send",new Request(this.retrieve("send:options")));
}return this.retrieve("send");}};Element.Properties.load={set:function(a){var b=this.retrieve("load");if(b){b.cancel();}return this.eliminate("load").store("load:options",$extend({data:this,link:"cancel",update:this,method:"get"},a));
},get:function(a){if(a||!this.retrieve("load")){if(a||!this.retrieve("load:options")){this.set("load",a);}this.store("load",new Request.HTML(this.retrieve("load:options")));
}return this.retrieve("load");}};Element.implement({send:function(a){var b=this.get("send");b.send({data:this,url:a||b.options.url});return this;},load:function(){this.get("load").send(Array.link(arguments,{data:Object.type,url:String.type}));
return this;}});Request.JSON=new Class({Extends:Request,options:{secure:true},initialize:function(a){this.parent(a);this.headers.extend({Accept:"application/json","X-Request":"JSON"});
},success:function(a){this.response.json=JSON.decode(a,this.options.secure);this.onSuccess(this.response.json,a);}});//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

MooTools.More={version:"1.2.2.2"};(function(){var a={language:"en-US",languages:{"en-US":{}},cascades:["en-US"]};var b;MooTools.lang=new Events();$extend(MooTools.lang,{setLanguage:function(c){if(!a.languages[c]){return this;
}a.language=c;this.load();this.fireEvent("langChange",c);return this;},load:function(){var c=this.cascade(this.getCurrentLanguage());b={};$each(c,function(e,d){b[d]=this.lambda(e);
},this);},getCurrentLanguage:function(){return a.language;},addLanguage:function(c){a.languages[c]=a.languages[c]||{};return this;},cascade:function(e){var c=(a.languages[e]||{}).cascades||[];
c.combine(a.cascades);c.erase(e).push(e);var d=c.map(function(f){return a.languages[f];},this);return $merge.apply(this,d);},lambda:function(c){(c||{}).get=function(e,d){return $lambda(c[e]).apply(this,$splat(d));
};return c;},get:function(e,d,c){if(b&&b[e]){return(d?b[e].get(d,c):b[e]);}},set:function(d,e,c){this.addLanguage(d);langData=a.languages[d];if(!langData[e]){langData[e]={};
}$extend(langData[e],c);if(d==this.getCurrentLanguage()){this.load();this.fireEvent("langChange",d);}return this;},list:function(){return Hash.getKeys(a.languages);
}});})();var Log=new Class({log:function(){Log.logger.call(this,arguments);}});Log.logged=[];Log.logger=function(){if(window.console&&console.log){console.log.apply(console,arguments);
}else{Log.logged.push(arguments);}};Class.refactor=function(b,a){$each(a,function(e,d){var c=b.prototype[d];if(c&&(c=c._origin)&&typeof e=="function"){b.implement(d,function(){var f=this.previous;
this.previous=c;var g=e.apply(this,arguments);this.previous=f;return g;});}else{b.implement(d,e);}});return b;};Class.Mutators.Binds=function(a){return a;
};Class.Mutators.initialize=function(a){return function(){$splat(this.Binds).each(function(b){var c=this[b];if(c){this[b]=c.bind(this);}},this);return a.apply(this,arguments);
};};Class.Occlude=new Class({occlude:function(c,b){b=$(b||this.element);var a=b.retrieve(c||this.property);if(a&&!$defined(this.occluded)){this.occluded=a;
}else{this.occluded=false;b.store(c||this.property,this);}return this.occluded;}});Array.implement({min:function(){return Math.min.apply(null,this);},max:function(){return Math.max.apply(null,this);
},average:function(){return this.length?this.sum()/this.length:0;},sum:function(){var a=0,b=this.length;if(b){do{a+=this[--b];}while(b);}return a;},unique:function(){return[].combine(this);
}});(function(){new Native({name:"Date",initialize:Date,protect:true});["now","parse","UTC"].each(function(d){Native.genericize(Date,d,true);});Date.Methods={};
["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds","Time","TimezoneOffset","Week","Timezone","GMTOffset","DayOfYear","LastMonth","UTCDate","UTCDay","UTCFullYear","AMPM","UTCHours","UTCMilliseconds","UTCMinutes","UTCMonth","UTCSeconds"].each(function(d){Date.Methods[d.toLowerCase()]=d;
});$each({ms:"Milliseconds",year:"FullYear",min:"Minutes",mo:"Month",sec:"Seconds",hr:"Hours"},function(e,d){Date.Methods[d]=e;});var c=function(e,d){return"0".repeat(d-e.toString().length)+e;
};Date.implement({set:function(g,e){switch($type(g)){case"object":for(var f in g){this.set(f,g[f]);}break;case"string":g=g.toLowerCase();var d=Date.Methods;
if(d[g]){this["set"+d[g]](e);}}return this;},get:function(e){e=e.toLowerCase();var d=Date.Methods;if(d[e]){return this["get"+d[e]]();}return null;},clone:function(){return new Date(this.get("time"));
},increment:function(d,e){return this.multiply(d,e);},decrement:function(d,e){return this.multiply(d,e,false);},multiply:function(e,j,d){e=e||"day";j=$pick(j,1);
d=$pick(d,true);var k=d?1:-1;var h=this.format("%m").toInt()-1;var f=this.format("%Y").toInt();var g=this.get("time");var i=0;switch(e){case"year":j.times(function(l){if(Date.isLeapYear(f+l)&&h>1&&k>0){l++;
}if(Date.isLeapYear(f+l)&&h<=1&&k<0){l--;}i+=Date.units.year(f+l);});break;case"month":j.times(function(n){if(k<0){n++;}var m=h+(n*k);var l=l;if(m<0){l--;
m=12+m;}if(m>11||m<0){l+=(m/12).toInt()*k;m=m%12;}i+=Date.units.month(m,l);});break;case"day":return this.set("date",this.get("date")+(k*j));default:i=Date.units[e]()*j;
break;}this.set("time",g+(i*k));return this;},isLeapYear:function(){return Date.isLeapYear(this.get("year"));},clearTime:function(){["hr","min","sec","ms"].each(function(d){this.set(d,0);
},this);return this;},diff:function(h,f){f=f||"day";if($type(h)=="string"){h=Date.parse(h);}switch(f){case"year":return h.format("%Y").toInt()-this.format("%Y").toInt();
break;case"month":var e=(h.format("%Y").toInt()-this.format("%Y").toInt())*12;return e+h.format("%m").toInt()-this.format("%m").toInt();break;default:var g=h.get("time")-this.get("time");
if(g<0&&Date.units[f]()>(-1*(g))){return 0;}else{if(g>=0&&g<Date.units[f]()){return 0;}}return((h.get("time")-this.get("time"))/Date.units[f]()).round();
}return null;},getWeek:function(){var d=(new Date(this.get("year"),0,1)).get("date");return Math.round((this.get("dayofyear")+(d>3?d-4:d+3))/7);},getTimezone:function(){return this.toString().replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");
},getGMTOffset:function(){var d=this.get("timezoneOffset");return((d>0)?"-":" + ")+c(Math.floor(Math.abs(d)/60),2)+c(d%60,2);},parse:function(d){this.set("time",Date.parse(d));
return this;},isValid:function(d){return !!(d||this).valueOf();},format:function(e){if(!this.isValid()){return"invalid date";}e=e||"%x %X";e=({db:"%Y-%m-%d %H:%M:%S",compact:"%Y%m%dT%H%M%S",iso8601:"%Y-%m-%dT%H:%M:%S%T",rfc822:"%a, %d %b %Y %H:%M:%S %Z","short":"%d %b %H:%M","long":"%B %d, %Y %H:%M"})[e.toLowerCase()]||e;
var g=this;return e.replace(/\%([aAbBcdHIjmMpSUWwxXyYTZ\%])/g,function(d,f){switch(f){case"a":return Date.getMsg("days")[g.get("day")].substr(0,3);case"A":return Date.getMsg("days")[g.get("day")];
case"b":return Date.getMsg("months")[g.get("month")].substr(0,3);case"B":return Date.getMsg("months")[g.get("month")];case"c":return g.toString();case"d":return c(g.get("date"),2);
case"H":return c(g.get("hr"),2);case"I":return((g.get("hr")%12)||12);case"j":return c(g.get("dayofyear"),3);case"m":return c((g.get("mo")+1),2);case"M":return c(g.get("min"),2);
case"p":return Date.getMsg(g.get("hr")<12?"AM":"PM");case"S":return c(g.get("seconds"),2);case"U":return c(g.get("week"),2);case"W":throw new Error("%W is not supported yet");
case"w":return g.get("day");case"x":return g.format(Date.getMsg("shortDate"));case"X":return g.format(Date.getMsg("shortTime"));case"y":return g.get("year").toString().substr(2);
case"Y":return g.get("year");case"T":return g.get("GMTOffset");case"Z":return g.get("Timezone");case"%":return"%";}return f;});},setAMPM:function(d){d=d.toUpperCase();
if(this.format("%H").toInt()>11&&d=="AM"){return this.decrement("hour",12);}else{if(this.format("%H").toInt()<12&&d=="PM"){return this.increment("hour",12);
}}return this;}});Date.alias("diff","compare");Date.alias("format","strftime");var b=Date.parse;var a=function(e,d){if(Date.isLeapYear(d.toInt())&&e===1){return 29;
}return[31,28,31,30,31,30,31,31,30,31,30,31][e];};$extend(Date,{getMsg:function(e,d){return MooTools.lang.get("Date",e,d);},units:{ms:$lambda(1),second:$lambda(1000),minute:$lambda(60000),hour:$lambda(3600000),day:$lambda(86400000),week:$lambda(608400000),month:function(g,e){var f=new Date();
return a($pick(g,f.format("%m").toInt()),$pick(e,f.format("%Y").toInt()))*86400000;},year:function(d){d=d||new Date().format("%Y").toInt();return Date.isLeapYear(d.toInt())?31622400000:31536000000;
}},isLeapYear:function(d){return new Date(d,1,29).getDate()==29;},fixY2K:function(f){if(!isNaN(f)){var e=new Date(f);if(e.get("year")<2000&&f.toString().indexOf(e.get("year"))<0){e.increment("year",100);
}return e;}else{return f;}},parse:function(f){var e=$type(f);if(e=="number"){return new Date(f);}if(e!="string"){return f;}if(!f.length){return null;}var d;
Date.parsePatterns.each(function(j,g){if(d){return;}var h=j.re.exec(f);if(h){d=j.handler(h);}});return d||new Date(b(f));},parseDay:function(d,g){var f=-1;
switch($type(d)){case"number":f=Date.getMsg("days")[d-1]||false;if(!f){throw new Error("Invalid day index value must be between 1 and 7");}break;case"string":var e=Date.getMsg("days").filter(function(h){return this.test(h);
},new RegExp("^"+d,"i"));if(!e.length){throw new Error("Invalid day string");}if(e.length>1){throw new Error("Ambiguous day");}f=e[0];}return(g)?Date.getMsg("days").indexOf(f):f;
},parseMonth:function(g,f){var e=-1;switch($type(g)){case"object":e=Date.getMsg("months")[g.get("mo")];break;case"number":e=Date.getMsg("months")[g-1]||false;
if(!e){throw new Error("Invalid month index value must be between 1 and 12:"+index);}break;case"string":var d=Date.getMsg("months").filter(function(h){return this.test(h);
},new RegExp("^"+g,"i"));if(!d.length){throw new Error("Invalid month string");}if(d.length>1){throw new Error("Ambiguous month");}e=d[0];}return(f)?Date.getMsg("months").indexOf(e):e;
},parseUTC:function(e){var d=new Date(e);var f=Date.UTC(d.get("year"),d.get("mo"),d.get("date"),d.get("hr"),d.get("min"),d.get("sec"));return new Date(f);
},orderIndex:function(d){return Date.getMsg("dateOrder").indexOf(d)+1;},parsePatterns:[{re:/^(\d{4})[\.\-\/](\d{1,2})[\.\-\/](\d{1,2})$/,handler:function(d){return new Date(d[1],d[2]-1,d[3]);
}},{re:/^(\d{4})[\.\-\/](\d{1,2})[\.\-\/](\d{1,2})\s(\d{1,2}):(\d{1,2})(?:\:(\d{1,2}))?(\w{2})?$/,handler:function(e){var f=new Date(e[1],e[2]-1,e[3]);
f.set("hr",e[4]);f.set("min",e[5]);f.set("sec",e[6]||0);if(e[7]){f.set("ampm",e[7]);}return f;}},{re:/^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})$/,handler:function(e){var f=new Date(e[Date.orderIndex("year")],e[Date.orderIndex("month")]-1,e[Date.orderIndex("date")]);
return Date.fixY2K(f);}},{re:/^(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})\s(\d{1,2})[:\.](\d{1,2})(?:[\:\.](\d{1,2}))?(\w{2})?$/,handler:function(e){var f=new Date(e[Date.orderIndex("year")],e[Date.orderIndex("month")]-1,e[Date.orderIndex("date")]);
f.set("hr",e[4]);f.set("min",e[5]);f.set("sec",e[6]||0);if(e[7]){f.set("ampm",e[7]);}return Date.fixY2K(f);}}]});})();["LastDayOfMonth","Ordinal"].each(function(a){Date.Methods[a.toLowerCase()]=a;
});Date.implement({timeDiffInWords:function(a){return Date.distanceOfTimeInWords(this,a||new Date);},getOrdinal:function(a){return Date.getMsg("ordinal",a||this.get("date"));
},getDayOfYear:function(){return((Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()+1,0,0,0)-Date.UTC(this.getFullYear(),0,1,0,0,0))/Date.units.day());
},getLastDayOfMonth:function(){var a=this.clone();a.setMonth(a.getMonth()+1,0);return a.getDate();}});Date.alias("timeDiffInWords","timeAgoInWords");$extend(Date,{distanceOfTimeInWords:function(b,a){return this.getTimePhrase(((a.getTime()-b.getTime())/1000).toInt(),b,a);
},getTimePhrase:function(d,c,a){var b=function(){var e;if(d>=0){e="Ago";}else{d=d*-1;e="Until";}if(d<60){return Date.getMsg("lessThanMinute"+e,d);}else{if(d<120){return Date.getMsg("minute"+e,d);
}else{if(d<(45*60)){d=(d/60).round();return Date.getMsg("minutes"+e,d);}else{if(d<(90*60)){return Date.getMsg("hour"+e,d);}else{if(d<(24*60*60)){d=(d/3600).round();
return Date.getMsg("hours"+e,d);}else{if(d<(48*60*60)){return Date.getMsg("day"+e,d);}else{d=(d/86400).round();return Date.getMsg("days"+e,d);}}}}}}};return b().substitute({delta:d});
}});Date.parsePatterns.extend([{re:/^(\d{4})(?:-?(\d{2})(?:-?(\d{2})(?:[T ](\d{2})(?::?(\d{2})(?::?(\d{2})(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d{2})(?::?(\d{2}))?)?)?)?)?)?$/,handler:function(a){var c=0;
var b=new Date(a[1],0,1);if(a[3]){b.set("date",a[3]);}if(a[2]){b.set("mo",a[2]-1);}if(a[4]){b.set("hr",a[4]);}if(a[5]){b.set("min",a[5]);}if(a[6]){b.set("sec",a[6]);
}if(a[7]){b.set("ms",("0."+a[7]).toInt()*1000);}if(a[9]){c=(a[9].toInt()*60)+a[10].toInt();c*=((a[8]=="-")?1:-1);}b.setTime((b*1)+(c*60*1000).toInt());
return b;}},{re:/^tod/i,handler:function(){return new Date();}},{re:/^tom/i,handler:function(){return new Date().increment();}},{re:/^yes/i,handler:function(){return new Date().decrement();
}},{re:/^(\d{1,2})(st|nd|rd|th)?$/i,handler:function(a){var b=new Date();b.set("date",a[1].toInt());return b;}},{re:/^(\d{1,2})(?:st|nd|rd|th)? (\w+)$/i,handler:function(a){var b=new Date();
b.set("mo",Date.parseMonth(a[2],true),a[1].toInt());return b;}},{re:/^(\d{1,2})(?:st|nd|rd|th)? (\w+),? (\d{4})$/i,handler:function(a){var b=new Date();
b.set("mo",Date.parseMonth(a[2],true),a[1].toInt());b.setYear(a[3]);return b;}},{re:/^(\w+) (\d{1,2})(?:st|nd|rd|th)?,? (\d{4})$/i,handler:function(a){var b=new Date();
b.set("mo",Date.parseMonth(a[1],true),a[2].toInt());b.setYear(a[3]);return b;}},{re:/^next (\w+)$/i,handler:function(e){var f=new Date();var b=f.getDay();
var c=Date.parseDay(e[1],true);var a=c-b;if(c<=b){a+=7;}f.set("date",f.getDate()+a);return f;}},{re:/^\d+\s[a-zA-z]..\s\d.\:\d.$/,handler:function(b){var c=new Date();
b=b[0].split(" ");c.set("date",b[0]);var a;Date.getMsg("months").each(function(e,d){if(new RegExp("^"+b[1]).test(e)){a=d;}});c.set("mo",a);c.set("hr",b[2].split(":")[0]);
c.set("min",b[2].split(":")[1]);c.set("ms",0);return c;}},{re:/^last (\w+)$/i,handler:function(a){return Date.parse("next "+a[0]).decrement("day",7);}}]);
Hash.implement({getFromPath:function(a){var b=this.getClean();a.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g,function(c){if(!b){return null;}var d=arguments[2]||arguments[1]||arguments[0];
b=(d in b)?b[d]:null;return c;});return b;},cleanValues:function(a){a=a||$defined;this.each(function(c,b){if(!a(c)){this.erase(b);}},this);return this;
},run:function(){var a=arguments;this.each(function(c,b){if($type(c)=="function"){c.run(a);}});}});(function(){var b=["À","à","Á","á","Â","â","Ã","ã","Ä","ä","Å","å","Ă","ă","Ą","ą","Ć","ć","Č","č","Ç","ç","Ď","ď","Đ","đ","È","è","É","é","Ê","ê","Ë","ë","Ě","ě","Ę","ę","Ğ","ğ","Ì","ì","Í","í","Î","î","Ï","ï","Ĺ","ĺ","Ľ","ľ","Ł","ł","Ñ","ñ","Ň","ň","Ń","ń","Ò","ò","Ó","ó","Ô","ô","Õ","õ","Ö","ö","Ø","ø","ő","Ř","ř","Ŕ","ŕ","Š","š","Ş","ş","Ś","ś","Ť","ť","Ť","ť","Ţ","ţ","Ù","ù","Ú","ú","Û","û","Ü","ü","Ů","ů","Ÿ","ÿ","ý","Ý","Ž","ž","Ź","ź","Ż","ż","Þ","þ","Ð","ð","ß","Œ","œ","Æ","æ","µ"];
var a=["A","a","A","a","A","a","A","a","Ae","ae","A","a","A","a","A","a","C","c","C","c","C","c","D","d","D","d","E","e","E","e","E","e","E","e","E","e","E","e","G","g","I","i","I","i","I","i","I","i","L","l","L","l","L","l","N","n","N","n","N","n","O","o","O","o","O","o","O","o","Oe","oe","O","o","o","R","r","R","r","S","s","S","s","S","s","T","t","T","t","T","t","U","u","U","u","U","u","Ue","ue","U","u","Y","y","Y","y","Z","z","Z","z","Z","z","TH","th","DH","dh","ss","OE","oe","AE","ae","u"];
var c={"[\xa0\u2002\u2003\u2009]":" ","\xb7":"*","[\u2018\u2019]":"'","[\u201c\u201d]":'"',"\u2026":"...","\u2013":"-","\u2014":"--","\uFFFD":"&raquo;"};
String.implement({standardize:function(){var d=this;b.each(function(f,e){d=d.replace(new RegExp(f,"g"),a[e]);});return d;},repeat:function(d){return new Array(d+1).join(this);
},pad:function(e,g,d){if(this.length>=e){return this;}g=g||" ";var f=g.repeat(e-this.length).substr(0,e-this.length);if(!d||d=="right"){return this+f;}if(d=="left"){return f+this;
}return f.substr(0,(f.length/2).floor())+this+f.substr(0,(f.length/2).ceil());},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"");},tidy:function(){var d=this.toString();
$each(c,function(f,e){d=d.replace(new RegExp(e,"g"),f);});return d;}});})();String.implement({parseQueryString:function(){var b=this.split(/[&;]/),a={};
if(b.length){b.each(function(g){var c=g.indexOf("="),d=c<0?[""]:g.substr(0,c).match(/[^\]\[]+/g),e=decodeURIComponent(g.substr(c+1)),f=a;d.each(function(j,h){var k=f[j];
if(h<d.length-1){f=f[j]=k||{};}else{if($type(k)=="array"){k.push(e);}else{f[j]=$defined(k)?[k,e]:e;}}});});}return a;},cleanQueryString:function(a){return this.split("&").filter(function(e){var b=e.indexOf("="),c=b<0?"":e.substr(0,b),d=e.substr(b+1);
return a?a.run([c,d]):$chk(d);}).join("&");}});var URI=new Class({Implements:Options,regex:/^(?:(\w+):)?(?:\/\/(?:(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,parts:["scheme","user","password","host","port","directory","file","query","fragment"],schemes:{http:80,https:443,ftp:21,rtsp:554,mms:1755,file:0},initialize:function(b,a){this.setOptions(a);
var c=this.options.base||URI.base;b=b||c;if(b&&b.parsed){this.parsed=$unlink(b.parsed);}else{this.set("value",b.href||b.toString(),c?new URI(c):false);
}},parse:function(c,b){var a=c.match(this.regex);if(!a){return false;}a.shift();return this.merge(a.associate(this.parts),b);},merge:function(b,a){if(!b.scheme&&!a.scheme){return false;
}if(a){this.parts.every(function(c){if(b[c]){return false;}b[c]=a[c]||"";return true;});}b.port=b.port||this.schemes[b.scheme.toLowerCase()];b.directory=b.directory?this.parseDirectory(b.directory,a?a.directory:""):"/";
return b;},parseDirectory:function(b,c){b=(b.substr(0,1)=="/"?"":(c||"/"))+b;if(!b.test(URI.regs.directoryDot)){return b;}var a=[];b.replace(URI.regs.endSlash,"").split("/").each(function(d){if(d==".."&&a.length>0){a.pop();
}else{if(d!="."){a.push(d);}}});return a.join("/")+"/";},combine:function(a){return a.value||a.scheme+"://"+(a.user?a.user+(a.password?":"+a.password:"")+"@":"")+(a.host||"")+(a.port&&a.port!=this.schemes[a.scheme]?":"+a.port:"")+(a.directory||"/")+(a.file||"")+(a.query?"?"+a.query:"")+(a.fragment?"#"+a.fragment:"");
},set:function(b,d,c){if(b=="value"){var a=d.match(URI.regs.scheme);if(a){a=a[1];}if(a&&!$defined(this.schemes[a.toLowerCase()])){this.parsed={scheme:a,value:d};
}else{this.parsed=this.parse(d,(c||this).parsed)||(a?{scheme:a,value:d}:{value:d});}}else{this.parsed[b]=d;}return this;},get:function(a,b){switch(a){case"value":return this.combine(this.parsed,b?b.parsed:false);
case"data":return this.getData();}return this.parsed[a]||undefined;},go:function(){document.location.href=this.toString();},toURI:function(){return this;
},getData:function(c,b){var a=this.get(b||"query");if(!$chk(a)){return c?null:{};}var d=a.parseQueryString();return c?d[c]:d;},setData:function(a,c,b){if($type(arguments[0])=="string"){a=this.getData();
a[arguments[0]]=arguments[1];}else{if(c){a=$merge(this.getData(),a);}}return this.set(b||"query",Hash.toQueryString(a));},clearData:function(a){return this.set(a||"query","");
}});["toString","valueOf"].each(function(a){URI.prototype[a]=function(){return this.get("value");};});URI.regs={endSlash:/\/$/,scheme:/^(\w+):/,directoryDot:/\.\/|\.$/};
URI.base=new URI($$("base[href]").getLast(),{base:document.location});String.implement({toURI:function(a){return new URI(this,a);}});URI=Class.refactor(URI,{combine:function(f,e){if(!e||f.scheme!=e.scheme||f.host!=e.host||f.port!=e.port){return this.previous.apply(this,arguments);
}var a=f.file+(f.query?"?"+f.query:"")+(f.fragment?"#"+f.fragment:"");if(!e.directory){return(f.directory||(f.file?"":"./"))+a;}var d=e.directory.split("/"),c=f.directory.split("/"),g="",h;
var b=0;for(h=0;h<d.length&&h<c.length&&d[h]==c[h];h++){}for(b=0;b<d.length-h-1;b++){g+="../";}for(b=h;b<c.length-1;b++){g+=c[b]+"/";}return(g||(f.file?"":"./"))+a;
},toAbsolute:function(a){a=new URI(a);if(a){a.set("directory","").set("file","");}return this.toRelative(a);},toRelative:function(a){return this.get("value",new URI(a));
}});Element.implement({tidy:function(){this.set("value",this.get("value").tidy());},getTextInRange:function(b,a){return this.get("value").substring(b,a);
},getSelectedText:function(){if(document.selection&&document.selection.createRange){return document.selection.createRange().text;}return this.getTextInRange(this.getSelectionStart(),this.getSelectionEnd());
},getSelectedRange:function(){if($defined(this.selectionStart)){return{start:this.selectionStart,end:this.selectionEnd};}var e={start:0,end:0};var a=this.getDocument().selection.createRange();
if(!a||a.parentElement()!=this){return e;}var c=a.duplicate();if(this.type=="text"){e.start=0-c.moveStart("character",-100000);e.end=e.start+a.text.length;
}else{var b=this.get("value");var d=b.length-b.match(/[\n\r]*$/)[0].length;c.moveToElementText(this);c.setEndPoint("StartToEnd",a);e.end=d-c.text.length;
c.setEndPoint("StartToStart",a);e.start=d-c.text.length;}return e;},getSelectionStart:function(){return this.getSelectedRange().start;},getSelectionEnd:function(){return this.getSelectedRange().end;
},setCaretPosition:function(a){if(a=="end"){a=this.get("value").length;}this.selectRange(a,a);return this;},getCaretPosition:function(){return this.getSelectedRange().start;
},selectRange:function(e,a){if(this.createTextRange){var c=this.get("value");var d=c.substr(e,a-e).replace(/\r/g,"").length;e=c.substr(0,e).replace(/\r/g,"").length;
var b=this.createTextRange();b.collapse(true);b.moveEnd("character",e+d);b.moveStart("character",e);b.select();}else{this.focus();this.setSelectionRange(e,a);
}return this;},insertAtCursor:function(b,a){var d=this.getSelectedRange();var c=this.get("value");this.set("value",c.substring(0,d.start)+b+c.substring(d.end,c.length));
if($pick(a,true)){this.selectRange(d.start,d.start+b.length);}else{this.setCaretPosition(d.start+b.length);}return this;},insertAroundCursor:function(b,a){b=$extend({before:"",defaultMiddle:"",after:""},b);
var c=this.getSelectedText()||b.defaultMiddle;var g=this.getSelectedRange();var f=this.get("value");if(g.start==g.end){this.set("value",f.substring(0,g.start)+b.before+c+b.after+f.substring(g.end,f.length));
this.selectRange(g.start+b.before.length,g.end+b.before.length+c.length);}else{var d=f.substring(g.start,g.end);this.set("value",f.substring(0,g.start)+b.before+d+b.after+f.substring(g.end,f.length));
var e=g.start+b.before.length;if($pick(a,true)){this.selectRange(e,e+d.length);}else{this.setCaretPosition(e+f.length);}}return this;}});Element.implement({measure:function(e){var g=function(h){return !!(!h||h.offsetHeight||h.offsetWidth);
};if(g(this)){return e.apply(this);}var d=this.getParent(),b=[],f=[];while(!g(d)&&d!=document.body){b.push(d.expose());d=d.getParent();}var c=this.expose();
var a=e.apply(this);c();b.each(function(h){h();});return a;},expose:function(){if(this.getStyle("display")!="none"){return $empty;}var a=this.getStyles("display","position","visibility");
return this.setStyles({display:"block",position:"absolute",visibility:"hidden"}).setStyles.pass(a,this);},getDimensions:function(a){a=$merge({computeSize:false},a);
var d={};var c=function(f,e){return(e.computeSize)?f.getComputedSize(e):f.getSize();};if(this.getStyle("display")=="none"){d=this.measure(function(){return c(this,a);
});}else{try{d=c(this,a);}catch(b){}}return $chk(d.x)?$extend(d,{width:d.x,height:d.y}):$extend(d,{x:d.width,y:d.height});},getComputedSize:function(a){a=$merge({styles:["padding","border"],plains:{height:["top","bottom"],width:["left","right"]},mode:"both"},a);
var c={width:0,height:0};switch(a.mode){case"vertical":delete c.width;delete a.plains.width;break;case"horizontal":delete c.height;delete a.plains.height;
break;}var b=[];$each(a.plains,function(g,f){g.each(function(h){a.styles.each(function(i){b.push((i=="border")?i+"-"+h+"-width":i+"-"+h);});});});var e={};
b.each(function(f){e[f]=this.getComputedStyle(f);},this);var d=[];$each(a.plains,function(g,f){var h=f.capitalize();c["total"+h]=0;c["computed"+h]=0;g.each(function(i){c["computed"+i.capitalize()]=0;
b.each(function(k,j){if(k.test(i)){e[k]=e[k].toInt()||0;c["total"+h]=c["total"+h]+e[k];c["computed"+i.capitalize()]=c["computed"+i.capitalize()]+e[k];}if(k.test(i)&&f!=k&&(k.test("border")||k.test("padding"))&&!d.contains(k)){d.push(k);
c["computed"+h]=c["computed"+h]-e[k];}});});});["Width","Height"].each(function(g){var f=g.toLowerCase();if(!$chk(c[f])){return;}c[f]=c[f]+this["offset"+g]+c["computed"+g];
c["total"+g]=c[f]+c["total"+g];delete c["computed"+g];},this);return $extend(e,c);}});(function(){var a=false;window.addEvent("domready",function(){var b=new Element("div").setStyles({position:"fixed",top:0,right:0}).inject(document.body);
a=(b.offsetTop===0);b.dispose();});Element.implement({pin:function(c){if(this.getStyle("display")=="none"){return null;}var d;if(c!==false){d=this.getPosition();
if(!this.retrieve("pinned")){var f={top:d.y-window.getScroll().y,left:d.x-window.getScroll().x};if(a){this.setStyle("position","fixed").setStyles(f);}else{this.store("pinnedByJS",true);
this.setStyles({position:"absolute",top:d.y,left:d.x});this.store("scrollFixer",(function(){if(this.retrieve("pinned")){this.setStyles({top:f.top.toInt()+window.getScroll().y,left:f.left.toInt()+window.getScroll().x});
}}).bind(this));window.addEvent("scroll",this.retrieve("scrollFixer"));}this.store("pinned",true);}}else{var e;if(!Browser.Engine.trident){if(this.getParent().getComputedStyle("position")!="static"){e=this.getParent();
}else{e=this.getParent().getOffsetParent();}}d=this.getPosition(e);this.store("pinned",false);var b;if(a&&!this.retrieve("pinnedByJS")){b={top:d.y+window.getScroll().y,left:d.x+window.getScroll().x};
}else{this.store("pinnedByJS",false);window.removeEvent("scroll",this.retrieve("scrollFixer"));b={top:d.y,left:d.x};}this.setStyles($merge(b,{position:"absolute"}));
}return this.addClass("isPinned");},unpin:function(){return this.pin(false).removeClass("isPinned");},togglepin:function(){this.pin(!this.retrieve("pinned"));
}});})();(function(){var a=Element.prototype.position;Element.implement({position:function(r){if(r&&($defined(r.x)||$defined(r.y))){return a?a.apply(this,arguments):this;
}$each(r||{},function(t,s){if(!$defined(t)){delete r[s];}});r=$merge({relativeTo:document.body,position:{x:"center",y:"center"},edge:false,offset:{x:0,y:0},returnPos:false,relFixedPosition:false,ignoreMargins:false,allowNegative:false},r);
var b={x:0,y:0};var h=false;var c=this.measure(function(){return $(this.getOffsetParent());});if(c&&c!=this.getDocument().body){b=c.measure(function(){return this.getPosition();
});h=true;r.offset.x=r.offset.x-b.x;r.offset.y=r.offset.y-b.y;}var q=function(s){if($type(s)!="string"){return s;}s=s.toLowerCase();var t={};if(s.test("left")){t.x="left";
}else{if(s.test("right")){t.x="right";}else{t.x="center";}}if(s.test("upper")||s.test("top")){t.y="top";}else{if(s.test("bottom")){t.y="bottom";}else{t.y="center";
}}return t;};r.edge=q(r.edge);r.position=q(r.position);if(!r.edge){if(r.position.x=="center"&&r.position.y=="center"){r.edge={x:"center",y:"center"};}else{r.edge={x:"left",y:"top"};
}}this.setStyle("position","absolute");var p=$(r.relativeTo)||document.body;var i=p==document.body?window.getScroll():p.getPosition();var o=i.y;var g=i.x;
if(Browser.Engine.trident){var l=p.getScrolls();o+=l.y;g+=l.x;}var j=this.getDimensions({computeSize:true,styles:["padding","border","margin"]});if(r.ignoreMargins){r.offset.x=r.offset.x-j["margin-left"];
r.offset.y=r.offset.y-j["margin-top"];}var n={};var d=r.offset.y;var e=r.offset.x;var k=window.getSize();switch(r.position.x){case"left":n.x=g+e;break;
case"right":n.x=g+e+p.offsetWidth;break;default:n.x=g+((p==document.body?k.x:p.offsetWidth)/2)+e;break;}switch(r.position.y){case"top":n.y=o+d;break;case"bottom":n.y=o+d+p.offsetHeight;
break;default:n.y=o+((p==document.body?k.y:p.offsetHeight)/2)+d;break;}if(r.edge){var m={};switch(r.edge.x){case"left":m.x=0;break;case"right":m.x=-j.x-j.computedRight-j.computedLeft;
break;default:m.x=-(j.x/2);break;}switch(r.edge.y){case"top":m.y=0;break;case"bottom":m.y=-j.y-j.computedTop-j.computedBottom;break;default:m.y=-(j.y/2);
break;}n.x=n.x+m.x;n.y=n.y+m.y;}n={left:((n.x>=0||h||r.allowNegative)?n.x:0).toInt(),top:((n.y>=0||h||r.allowNegative)?n.y:0).toInt()};if(p.getStyle("position")=="fixed"||r.relFixedPosition){var f=window.getScroll();
n.top=n.top.toInt()+f.y;n.left=n.left.toInt()+f.x;}if(r.returnPos){return n;}else{this.setStyles(n);}return this;}});})();Element.implement({isDisplayed:function(){return this.getStyle("display")!="none";
},toggle:function(){return this[this.isDisplayed()?"hide":"show"]();},hide:function(){var b;try{if("none"!=this.getStyle("display")){b=this.getStyle("display");
}}catch(a){}return this.store("originalDisplay",b||"block").setStyle("display","none");},show:function(a){return this.setStyle("display",a||this.retrieve("originalDisplay")||"block");
},swapClass:function(a,b){return this.removeClass(a).addClass(b);}});var InputValidator=new Class({Implements:[Options],options:{errorMsg:"Validation failed.",test:function(a){return true;
}},initialize:function(b,a){this.setOptions(a);this.className=b;},test:function(b,a){if($(b)){return this.options.test($(b),a||this.getProps(b));}else{return false;
}},getError:function(c,a){var b=this.options.errorMsg;if($type(b)=="function"){b=b($(c),a||this.getProps(c));}return b;},getProps:function(a){if(!$(a)){return{};
}return a.get("validatorProps");}});Element.Properties.validatorProps={set:function(a){return this.eliminate("validatorProps").store("validatorProps",a);
},get:function(a){if(a){this.set(a);}if(this.retrieve("validatorProps")){return this.retrieve("validatorProps");}if(this.getProperty("validatorProps")){try{this.store("validatorProps",JSON.decode(this.getProperty("validatorProps")));
}catch(c){return{};}}else{var b=this.get("class").split(" ").filter(function(d){return d.test(":");});if(!b.length){this.store("validatorProps",{});}else{a={};
b.each(function(d){var f=d.split(":");if(f[1]){try{a[f[0]]=JSON.decode(f[1]);}catch(g){}}});this.store("validatorProps",a);}}return this.retrieve("validatorProps");
}};var FormValidator=new Class({Implements:[Options,Events],Binds:["onSubmit"],options:{fieldSelectors:"input, select, textarea",ignoreHidden:true,useTitles:false,evaluateOnSubmit:true,evaluateFieldsOnBlur:true,evaluateFieldsOnChange:true,serial:true,stopOnFailure:true,warningPrefix:function(){return FormValidator.getMsg("warningPrefix")||"Warning: ";
},errorPrefix:function(){return FormValidator.getMsg("errorPrefix")||"Error: ";}},initialize:function(b,a){this.setOptions(a);this.element=$(b);this.element.store("validator",this);
this.warningPrefix=$lambda(this.options.warningPrefix)();this.errorPrefix=$lambda(this.options.errorPrefix)();if(this.options.evaluateOnSubmit){this.element.addEvent("submit",this.onSubmit);
}if(this.options.evaluateFieldsOnBlur){this.watchFields(this.getFields());}},toElement:function(){return this.element;},getFields:function(){return(this.fields=this.element.getElements(this.options.fieldSelectors));
},watchFields:function(a){a.each(function(b){b.addEvent("blur",this.validationMonitor.pass([b,false],this));if(this.options.evaluateFieldsOnChange){b.addEvent("change",this.validationMonitor.pass([b,true],this));
}},this);},validationMonitor:function(){$clear(this.timer);this.timer=this.validateField.delay(50,this,arguments);},onSubmit:function(a){if(!this.validate(a)&&a){a.preventDefault();
}else{this.reset();}},reset:function(){this.getFields().each(this.resetField,this);return this;},validate:function(b){var a=this.getFields().map(function(c){return this.validateField(c,true);
},this).every(function(c){return c;});this.fireEvent("formValidate",[a,this.element,b]);if(this.options.stopOnFailure&&!a&&b){b.preventDefault();}return a;
},validateField:function(i,a){if(this.paused){return true;}i=$(i);var d=!i.hasClass("validation-failed");var f,h;if(this.options.serial&&!a){f=this.element.getElement(".validation-failed");
h=this.element.getElement(".warning");}if(i&&(!f||a||i.hasClass("validation-failed")||(f&&!this.options.serial))){var c=i.className.split(" ").some(function(j){return this.getValidator(j);
},this);var g=[];i.className.split(" ").each(function(j){if(j&&!this.test(j,i)){g.include(j);}},this);d=g.length===0;if(c&&!i.hasClass("warnOnly")){if(d){i.addClass("validation-passed").removeClass("validation-failed");
this.fireEvent("elementPass",i);}else{i.addClass("validation-failed").removeClass("validation-passed");this.fireEvent("elementFail",[i,g]);}}if(!h){var e=i.className.split(" ").some(function(j){if(j.test("^warn-")||i.hasClass("warnOnly")){return this.getValidator(j.replace(/^warn-/,""));
}else{return null;}},this);i.removeClass("warning");var b=i.className.split(" ").map(function(j){if(j.test("^warn-")||i.hasClass("warnOnly")){return this.test(j.replace(/^warn-/,""),i,true);
}else{return null;}},this);}}return d;},test:function(b,d,e){var a=this.getValidator(b);d=$(d);if(d.hasClass("ignoreValidation")){return true;}e=$pick(e,false);
if(d.hasClass("warnOnly")){e=true;}var c=a?a.test(d):true;if(a&&this.isVisible(d)){this.fireEvent("elementValidate",[c,d,b,e]);}if(e){return true;}return c;
},isVisible:function(a){if(!this.options.ignoreHidden){return true;}while(a!=document.body){if($(a).getStyle("display")=="none"){return false;}a=a.getParent();
}return true;},resetField:function(a){a=$(a);if(a){a.className.split(" ").each(function(b){if(b.test("^warn-")){b=b.replace(/^warn-/,"");}a.removeClass("validation-failed");
a.removeClass("warning");a.removeClass("validation-passed");},this);}return this;},stop:function(){this.paused=true;return this;},start:function(){this.paused=false;
return this;},ignoreField:function(a,b){a=$(a);if(a){this.enforceField(a);if(b){a.addClass("warnOnly");}else{a.addClass("ignoreValidation");}}return this;
},enforceField:function(a){a=$(a);if(a){a.removeClass("warnOnly").removeClass("ignoreValidation");}return this;}});FormValidator.getMsg=function(a){return MooTools.lang.get("FormValidator",a);
};FormValidator.adders={validators:{},add:function(b,a){this.validators[b]=new InputValidator(b,a);if(!this.initialize){this.implement({validators:this.validators});
}},addAllThese:function(a){$A(a).each(function(b){this.add(b[0],b[1]);},this);},getValidator:function(a){return this.validators[a.split(":")[0]];}};$extend(FormValidator,FormValidator.adders);
FormValidator.implement(FormValidator.adders);FormValidator.add("IsEmpty",{errorMsg:false,test:function(a){if(a.type=="select-one"||a.type=="select"){return !(a.selectedIndex>=0&&a.options[a.selectedIndex].value!="");
}else{return((a.get("value")==null)||(a.get("value").length==0));}}});FormValidator.addAllThese([["required",{errorMsg:function(){return FormValidator.getMsg("required");
},test:function(a){return !FormValidator.getValidator("IsEmpty").test(a);}}],["minLength",{errorMsg:function(a,b){if($type(b.minLength)){return FormValidator.getMsg("minLength").substitute({minLength:b.minLength,length:a.get("value").length});
}else{return"";}},test:function(a,b){if($type(b.minLength)){return(a.get("value").length>=$pick(b.minLength,0));}else{return true;}}}],["maxLength",{errorMsg:function(a,b){if($type(b.maxLength)){return FormValidator.getMsg("maxLength").substitute({maxLength:b.maxLength,length:a.get("value").length});
}else{return"";}},test:function(a,b){return(a.get("value").length<=$pick(b.maxLength,10000));}}],["validate-integer",{errorMsg:FormValidator.getMsg.pass("integer"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^-?[1-9]\d*$/).test(a.get("value"));
}}],["validate-numeric",{errorMsg:FormValidator.getMsg.pass("numeric"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/).test(a.get("value"));
}}],["validate-digits",{errorMsg:FormValidator.getMsg.pass("digits"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^[\d() .:\-\+#]+$/.test(a.get("value")));
}}],["validate-alpha",{errorMsg:FormValidator.getMsg.pass("alpha"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^[a-zA-Z]+$/).test(a.get("value"));
}}],["validate-alphanum",{errorMsg:FormValidator.getMsg.pass("alphanum"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||!(/\W/).test(a.get("value"));
}}],["validate-date",{errorMsg:function(a,b){if(Date.parse){var c=b.dateFormat||"%x";return FormValidator.getMsg("dateSuchAs").substitute({date:new Date().format(c)});
}else{return FormValidator.getMsg("dateInFormatMDY");}},test:function(a,b){if(FormValidator.getValidator("IsEmpty").test(a)){return true;}var g;if(Date.parse){var f=b.dateFormat||"%x";
g=Date.parse(a.get("value"));var e=g.format(f);if(e!="invalid date"){a.set("value",e);}return !isNaN(g);}else{var c=/^(\d{2})\/(\d{2})\/(\d{4})$/;if(!c.test(a.get("value"))){return false;
}g=new Date(a.get("value").replace(c,"$1/$2/$3"));return(parseInt(RegExp.$1,10)==(1+g.getMonth()))&&(parseInt(RegExp.$2,10)==g.getDate())&&(parseInt(RegExp.$3,10)==g.getFullYear());
}}}],["validate-email",{errorMsg:FormValidator.getMsg.pass("email"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(a.get("value"));
}}],["validate-url",{errorMsg:FormValidator.getMsg.pass("url"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i).test(a.get("value"));
}}],["validate-currency-dollar",{errorMsg:FormValidator.getMsg.pass("currencyDollar"),test:function(a){return FormValidator.getValidator("IsEmpty").test(a)||(/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(a.get("value"));
}}],["validate-one-required",{errorMsg:FormValidator.getMsg.pass("oneRequired"),test:function(a,b){var c=$(b["validate-one-required"])||a.parentNode;return c.getElements("input").some(function(d){if(["checkbox","radio"].contains(d.get("type"))){return d.get("checked");
}return d.get("value");});}}]]);Element.Properties.validator={set:function(a){var b=this.retrieve("validator");if(b){b.setOptions(a);}return this.store("validator:options");
},get:function(a){if(a||!this.retrieve("validator")){if(a||!this.retrieve("validator:options")){this.set("validator",a);}this.store("validator",new FormValidator(this,this.retrieve("validator:options")));
}return this.retrieve("validator");}};Element.implement({validate:function(a){this.set("validator",a);return this.get("validator",a).validate();}});FormValidator.Inline=new Class({Extends:FormValidator,options:{scrollToErrorsOnSubmit:true,scrollFxOptions:{offset:{y:-20}}},initialize:function(b,a){this.parent(b,a);
this.addEvent("onElementValidate",function(g,f,e,h){var d=this.getValidator(e);if(!g&&d.getError(f)){if(h){f.addClass("warning");}var c=this.makeAdvice(e,f,d.getError(f),h);
this.insertAdvice(c,f);this.showAdvice(e,f);}else{this.hideAdvice(e,f);}});},makeAdvice:function(d,f,c,g){var e=(g)?this.warningPrefix:this.errorPrefix;
e+=(this.options.useTitles)?f.title||c:c;var a=(g)?"warning-advice":"validation-advice";var b=this.getAdvice(d,f);if(b){b=b.clone(true,true).set("html",e).replaces(b);
}else{b=new Element("div",{html:e,styles:{display:"none"},id:"advice-"+d+"-"+this.getFieldId(f)}).addClass(a);}f.store("advice-"+d,b);return b;},getFieldId:function(a){return a.id?a.id:a.id="input_"+a.name;
},showAdvice:function(b,c){var a=this.getAdvice(b,c);if(a&&!c.retrieve(this.getPropName(b))&&(a.getStyle("display")=="none"||a.getStyle("visiblity")=="hidden"||a.getStyle("opacity")==0)){c.store(this.getPropName(b),true);
if(a.reveal){a.reveal();}else{a.setStyle("display","block");}}},hideAdvice:function(b,c){var a=this.getAdvice(b,c);if(a&&c.retrieve(this.getPropName(b))){c.store(this.getPropName(b),false);
if(a.dissolve){a.dissolve();}else{a.setStyle("display","none");}}},getPropName:function(a){return"advice"+a;},resetField:function(a){a=$(a);if(!a){return this;
}this.parent(a);a.className.split(" ").each(function(b){this.hideAdvice(b,a);},this);return this;},getAllAdviceMessages:function(d,c){var b=[];if(d.hasClass("ignoreValidation")&&!c){return b;
}var a=d.className.split(" ").some(function(g){var e=g.test("^warn-")||d.hasClass("warnOnly");if(e){g=g.replace(/^warn-/,"");}var f=this.getValidator(g);
if(!f){return;}b.push({message:f.getError(d),warnOnly:e,passed:f.test(),validator:f});},this);return b;},getAdvice:function(a,b){return b.retrieve("advice-"+a);
},insertAdvice:function(a,c){var b=c.get("validatorProps");if(!b.msgPos||!$(b.msgPos)){if(c.type.toLowerCase()=="radio"){c.getParent().adopt(a);}else{a.inject($(c),"after");
}}else{$(b.msgPos).grab(a);}},validateField:function(h,g){var a=this.parent(h,g);if(this.options.scrollToErrorsOnSubmit&&!a){var c=$(this).getElement(".validation-failed");
var e=$(this).getParent();var b=function(i){return i.getScrollSize().y!=i.getSize().y;};var d;while(e!=document.body&&!b(e)){e=e.getParent();}var f=e.retrieve("fvScroller");
if(!f&&window.Fx&&Fx.Scroll){f=new Fx.Scroll(e,{transition:"quad:out",offset:{y:-20}});e.store("fvScroller",f);}if(c){if(f){f.toElement(c);}else{e.scrollTo(e.getScroll().x,c.getPosition(e).y-20);
}}}return a;}});FormValidator.addAllThese([["validate-enforce-oncheck",{test:function(a,b){if(a.checked){var c=a.getParent("form").retrieve("validator");
if(!c){return true;}(b.toEnforce||$(b.enforceChildrenOf).getElements("input, select, textarea")).map(function(d){c.enforceField(d);});}return true;}}],["validate-ignore-oncheck",{test:function(a,b){if(a.checked){var c=a.getParent("form").retrieve("validator");
if(!c){return true;}(b.toIgnore||$(b.ignoreChildrenOf).getElements("input, select, textarea")).each(function(d){c.ignoreField(d);c.resetField(d);});}return true;
}}],["validate-nospace",{errorMsg:function(){return FormValidator.getMsg("noSpace");},test:function(a,b){return !a.get("value").test(/\s/);}}],["validate-toggle-oncheck",{test:function(b,c){var d=b.getParent("form").retrieve("validator");
if(!d){return true;}var a=c.toToggle||$(c.toToggleChildrenOf).getElements("input, select, textarea");if(!b.checked){a.each(function(e){d.ignoreField(e);
d.resetField(e);});}else{a.each(function(e){d.enforceField(e);});}return true;}}],["validate-reqchk-bynode",{errorMsg:function(){return FormValidator.getMsg("reqChkByNode");
},test:function(a,b){return($(b.nodeId).getElements(b.selector||"input[type=checkbox], input[type=radio]")).some(function(c){return c.checked;});}}],["validate-required-check",{errorMsg:function(a,b){return b.useTitle?a.get("title"):FormValidator.getMsg("requiredChk");
},test:function(a,b){return !!a.checked;}}],["validate-reqchk-byname",{errorMsg:function(a,b){return FormValidator.getMsg("reqChkByName").substitute({label:b.label||a.get("type")});
},test:function(b,d){var c=d.groupName||b.get("name");var a=$$(document.getElementsByName(c)).some(function(g,f){return g.checked;});var e=b.getParent("form").retrieve("validator");
if(a&&e){e.resetField(b);}return a;}}],["validate-match",{errorMsg:function(a,b){return FormValidator.getMsg("match").substitute({matchName:b.matchName||$(b.matchInput).get("name")});
},test:function(b,c){var d=b.get("value");var a=$(c.matchInput)&&$(c.matchInput).get("value");return d&&a?d==a:true;}}],["validate-after-date",{errorMsg:function(a,b){return FormValidator.getMsg("afterDate").substitute({label:b.afterLabel||(b.afterElement?FormValidator.getMsg("startDate"):FormValidator.getMsg("currentDate"))});
},test:function(b,c){var d=$(c.afterElement)?Date.parse($(c.afterElement).get("value")):new Date();var a=Date.parse(b.get("value"));return a&&d?a>=d:true;
}}],["validate-before-date",{errorMsg:function(a,b){return FormValidator.getMsg("beforeDate").substitute({label:b.beforeLabel||(b.beforeElement?FormValidator.getMsg("endDate"):FormValidator.getMsg("currentDate"))});
},test:function(b,c){var d=Date.parse(b.get("value"));var a=$(c.beforeElement)?Date.parse($(c.beforeElement).get("value")):new Date();return a&&d?a>=d:true;
}}],["validate-custom-required",{errorMsg:function(){return FormValidator.getMsg("required");},test:function(a,b){return a.get("value")!=b.emptyValue;}}],["validate-same-month",{errorMsg:function(a,b){var c=$(b.sameMonthAs)&&$(b.sameMonthAs).get("value");
var d=a.get("value");if(d!=""){return FormValidator.getMsg(c?"sameMonth":"startMonth");}},test:function(a,b){var d=Date.parse(a.get("value"));var c=Date.parse($(b.sameMonthAs)&&$(b.sameMonthAs).get("value"));
return d&&c?d.format("%B")==c.format("%B"):true;}}]]);var OverText=new Class({Implements:[Options,Events,Class.Occlude],Binds:["reposition","assert","focus"],options:{element:"label",positionOptions:{position:"upperLeft",edge:"upperLeft",offset:{x:4,y:2}},poll:false,pollInterval:250},property:"OverText",initialize:function(b,a){this.element=$(b);
if(this.occlude()){return this.occluded;}this.setOptions(a);this.attach(this.element);OverText.instances.push(this);if(this.options.poll){this.poll();}return this;
},toElement:function(){return this.element;},attach:function(){var a=this.options.textOverride||this.element.get("alt")||this.element.get("title");if(!a){return;
}this.text=new Element(this.options.element,{"class":"overTxtDiv",styles:{lineHeight:"normal",position:"absolute"},html:a,events:{click:this.hide.pass(true,this)}}).inject(this.element,"after");
if(this.options.element=="label"){this.text.set("for",this.element.get("id"));}this.element.addEvents({focus:this.focus,blur:this.assert,change:this.assert}).store("OverTextDiv",this.text);
window.addEvent("resize",this.reposition.bind(this));this.assert();this.reposition();},startPolling:function(){this.pollingPaused=false;return this.poll();
},poll:function(a){if(this.poller&&!a){return this;}var b=function(){if(!this.pollingPaused){this.assert();}}.bind(this);if(a){$clear(this.poller);}else{this.poller=b.periodical(this.options.pollInterval,this);
}return this;},stopPolling:function(){this.pollingPaused=true;return this.poll(true);},focus:function(){if(!this.text.isDisplayed()||this.element.get("disabled")){return;
}this.hide();},hide:function(){if(this.text.isDisplayed()&&!this.element.get("disabled")){this.text.hide();this.fireEvent("textHide",[this.text,this.element]);
this.pollingPaused=true;try{this.element.fireEvent("focus").focus();}catch(a){}}return this;},show:function(){if(!this.text.isDisplayed()){this.text.show();
this.reposition();this.fireEvent("textShow",[this.text,this.element]);this.pollingPaused=false;}return this;},assert:function(){this[this.test()?"show":"hide"]();
},test:function(){var a=this.element.get("value");return !a;},reposition:function(){try{this.assert();if(!this.element.getParent()||!this.element.offsetHeight){return this.hide();
}if(this.test()){this.text.position($merge(this.options.positionOptions,{relativeTo:this.element}));}}catch(a){}return this;}});OverText.instances=[];OverText.update=function(){return OverText.instances.map(function(a){if(a.element&&a.text){return a.reposition();
}return null;});};if(window.Fx&&Fx.Reveal){Fx.Reveal.implement({hideInputs:Browser.Engine.trident?"select, input, textarea, object, embed, .overTxtDiv":false});
}Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(b,a){this.elements=this.subject=$$(b);this.parent(a);},compute:function(g,h,j){var c={};for(var d in g){var a=g[d],e=h[d],f=c[d]={};
for(var b in a){f[b]=this.parent(a[b],e[b],j);}}return c;},set:function(b){for(var c in b){var a=b[c];for(var d in a){this.render(this.elements[c],d,a[d],this.options.unit);
}}return this;},start:function(c){if(!this.check(c)){return this;}var h={},j={};for(var d in c){var f=c[d],a=h[d]={},g=j[d]={};for(var b in f){var e=this.prepare(this.elements[d],b,f[b]);
a[b]=e.from;g[b]=e.to;}}return this.parent(h,j);}});var Accordion=Fx.Accordion=new Class({Extends:Fx.Elements,options:{display:0,show:false,height:true,width:false,opacity:true,fixedHeight:false,fixedWidth:false,wait:false,alwaysHide:false,trigger:"click",initialDisplayFx:true},initialize:function(){var c=Array.link(arguments,{container:Element.type,options:Object.type,togglers:$defined,elements:$defined});
this.parent(c.elements,c.options);this.togglers=$$(c.togglers);this.container=$(c.container);this.previous=-1;if(this.options.alwaysHide){this.options.wait=true;
}if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}if(this.options.start){this.options.display=false;this.options.show=false;
}this.effects={};if(this.options.opacity){this.effects.opacity="fullOpacity";}if(this.options.width){this.effects.width=this.options.fixedWidth?"fullWidth":"offsetWidth";
}if(this.options.height){this.effects.height=this.options.fixedHeight?"fullHeight":"scrollHeight";}for(var b=0,a=this.togglers.length;b<a;b++){this.addSection(this.togglers[b],this.elements[b]);
}this.elements.each(function(e,d){if(this.options.show===d){this.fireEvent("active",[this.togglers[d],e]);}else{for(var f in this.effects){e.setStyle(f,0);
}}},this);if($chk(this.options.display)){this.display(this.options.display,this.options.initialDisplayFx);}},addSection:function(d,b){d=$(d);b=$(b);var e=this.togglers.contains(d);
this.togglers.include(d);this.elements.include(b);var a=this.togglers.indexOf(d);d.addEvent(this.options.trigger,this.display.bind(this,a));if(this.options.height){b.setStyles({"padding-top":0,"border-top":"none","padding-bottom":0,"border-bottom":"none"});
}if(this.options.width){b.setStyles({"padding-left":0,"border-left":"none","padding-right":0,"border-right":"none"});}b.fullOpacity=1;if(this.options.fixedWidth){b.fullWidth=this.options.fixedWidth;
}if(this.options.fixedHeight){b.fullHeight=this.options.fixedHeight;}b.setStyle("overflow","hidden");if(!e){for(var c in this.effects){b.setStyle(c,0);
}}return this;},display:function(a,b){b=$pick(b,true);a=($type(a)=="element")?this.elements.indexOf(a):a;if((this.timer&&this.options.wait)||(a===this.previous&&!this.options.alwaysHide)){return this;
}this.previous=a;var c={};this.elements.each(function(f,e){c[e]={};var d=(e!=a)||(this.options.alwaysHide&&(f.offsetHeight>0));this.fireEvent(d?"background":"active",[this.togglers[e],f]);
for(var g in this.effects){c[e][g]=d?0:f[this.effects[g]];}},this);return b?this.start(c):this.set(c);}});Fx.Move=new Class({Extends:Fx.Morph,options:{relativeTo:document.body,position:"center",edge:false,offset:{x:0,y:0}},start:function(a){return this.parent(this.element.position($merge(this.options,a,{returnPos:true})));
}});Element.Properties.move={set:function(a){var b=this.retrieve("move");if(b){b.cancel();}return this.eliminate("move").store("move:options",$extend({link:"cancel"},a));
},get:function(a){if(a||!this.retrieve("move")){if(a||!this.retrieve("move:options")){this.set("move",a);}this.store("move",new Fx.Move(this,this.retrieve("move:options")));
}return this.retrieve("move");}};Element.implement({move:function(a){this.get("move").start(a);return this;}});Fx.Reveal=new Class({Extends:Fx.Morph,options:{styles:["padding","border","margin"],transitionOpacity:!Browser.Engine.trident4,mode:"vertical",display:"block",hideInputs:Browser.Engine.trident?"select, input, textarea, object, embed":false},dissolve:function(){try{if(!this.hiding&&!this.showing){if(this.element.getStyle("display")!="none"){this.hiding=true;
this.showing=false;this.hidden=true;var d=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode});var g=(this.element.style.height===""||this.element.style.height=="auto");
this.element.setStyle("display","block");if(this.options.transitionOpacity){d.opacity=1;}var b={};$each(d,function(h,e){b[e]=[h,0];},this);var f=this.element.getStyle("overflow");
this.element.setStyle("overflow","hidden");var a=this.options.hideInputs?this.element.getElements(this.options.hideInputs):null;this.$chain.unshift(function(){if(this.hidden){this.hiding=false;
$each(d,function(h,e){d[e]=h;},this);this.element.setStyles($merge({display:"none",overflow:f},d));if(g){if(["vertical","both"].contains(this.options.mode)){this.element.style.height="";
}if(["width","both"].contains(this.options.mode)){this.element.style.width="";}}if(a){a.setStyle("visibility","visible");}}this.fireEvent("hide",this.element);
this.callChain();}.bind(this));if(a){a.setStyle("visibility","hidden");}this.start(b);}else{this.callChain.delay(10,this);this.fireEvent("complete",this.element);
this.fireEvent("hide",this.element);}}else{if(this.options.link=="chain"){this.chain(this.dissolve.bind(this));}else{if(this.options.link=="cancel"&&!this.hiding){this.cancel();
this.dissolve();}}}}catch(c){this.hiding=false;this.element.setStyle("display","none");this.callChain.delay(10,this);this.fireEvent("complete",this.element);
this.fireEvent("hide",this.element);}return this;},reveal:function(){try{if(!this.showing&&!this.hiding){if(this.element.getStyle("display")=="none"||this.element.getStyle("visiblity")=="hidden"||this.element.getStyle("opacity")==0){this.showing=true;
this.hiding=false;this.hidden=false;var g,d;this.element.measure(function(){g=(this.element.style.height===""||this.element.style.height=="auto");d=this.element.getComputedSize({styles:this.options.styles,mode:this.options.mode});
}.bind(this));$each(d,function(h,e){d[e]=h;});if($chk(this.options.heightOverride)){d.height=this.options.heightOverride.toInt();}if($chk(this.options.widthOverride)){d.width=this.options.widthOverride.toInt();
}if(this.options.transitionOpacity){this.element.setStyle("opacity",0);d.opacity=1;}var b={height:0,display:this.options.display};$each(d,function(h,e){b[e]=0;
});var f=this.element.getStyle("overflow");this.element.setStyles($merge(b,{overflow:"hidden"}));var a=this.options.hideInputs?this.element.getElements(this.options.hideInputs):null;
if(a){a.setStyle("visibility","hidden");}this.start(d);this.$chain.unshift(function(){this.element.setStyle("overflow",f);if(!this.options.heightOverride&&g){if(["vertical","both"].contains(this.options.mode)){this.element.style.height="";
}if(["width","both"].contains(this.options.mode)){this.element.style.width="";}}if(!this.hidden){this.showing=false;}if(a){a.setStyle("visibility","visible");
}this.callChain();this.fireEvent("show",this.element);}.bind(this));}else{this.callChain();this.fireEvent("complete",this.element);this.fireEvent("show",this.element);
}}else{if(this.options.link=="chain"){this.chain(this.reveal.bind(this));}else{if(this.options.link=="cancel"&&!this.showing){this.cancel();this.reveal();
}}}}catch(c){this.element.setStyles({display:this.options.display,visiblity:"visible",opacity:1});this.showing=false;this.callChain.delay(10,this);this.fireEvent("complete",this.element);
this.fireEvent("show",this.element);}return this;},toggle:function(){if(this.element.getStyle("display")=="none"||this.element.getStyle("visiblity")=="hidden"||this.element.getStyle("opacity")==0){this.reveal();
}else{this.dissolve();}return this;}});Element.Properties.reveal={set:function(a){var b=this.retrieve("reveal");if(b){b.cancel();}return this.eliminate("reveal").store("reveal:options",$extend({link:"cancel"},a));
},get:function(a){if(a||!this.retrieve("reveal")){if(a||!this.retrieve("reveal:options")){this.set("reveal",a);}this.store("reveal",new Fx.Reveal(this,this.retrieve("reveal:options")));
}return this.retrieve("reveal");}};Element.Properties.dissolve=Element.Properties.reveal;Element.implement({reveal:function(a){this.get("reveal",a).reveal();
return this;},dissolve:function(a){this.get("reveal",a).dissolve();return this;},nix:function(){var a=Array.link(arguments,{destroy:Boolean.type,options:Object.type});
this.get("reveal",a.options).dissolve().chain(function(){this[a.destroy?"destroy":"dispose"]();}.bind(this));return this;},wink:function(){var b=Array.link(arguments,{duration:Number.type,options:Object.type});
var a=this.get("reveal",b.options);a.reveal().chain(function(){(function(){a.dissolve();}).delay(b.duration||2000);});}});Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(b,a){this.element=this.subject=$(b);
this.parent(a);var d=this.cancel.bind(this,false);if($type(this.element)!="element"){this.element=$(this.element.getDocument().body);}var c=this.element;
if(this.options.wheelStops){this.addEvent("start",function(){c.addEvent("mousewheel",d);},true);this.addEvent("complete",function(){c.removeEvent("mousewheel",d);
},true);}},set:function(){var a=Array.flatten(arguments);this.element.scrollTo(a[0],a[1]);},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);
});},start:function(c,h){if(!this.check(c,h)){return this;}var e=this.element.getSize(),f=this.element.getScrollSize();var b=this.element.getScroll(),d={x:c,y:h};
for(var g in d){var a=f[g]-e[g];if($chk(d[g])){d[g]=($type(d[g])=="number")?d[g].limit(0,a):a;}else{d[g]=b[g];}d[g]+=this.options.offset[g];}return this.parent([b.x,b.y],[d.x,d.y]);
},toTop:function(){return this.start(false,0);},toLeft:function(){return this.start(0,false);},toRight:function(){return this.start("right",false);},toBottom:function(){return this.start(false,"bottom");
},toElement:function(b){var a=$(b).getPosition(this.element);return this.start(a.x,a.y);}});Fx.Slide=new Class({Extends:Fx,options:{mode:"vertical"},initialize:function(b,a){this.addEvent("complete",function(){this.open=(this.wrapper["offset"+this.layout.capitalize()]!=0);
if(this.open&&Browser.Engine.webkit419){this.element.dispose().inject(this.wrapper);}},true);this.element=this.subject=$(b);this.parent(a);var c=this.element.retrieve("wrapper");
this.wrapper=c||new Element("div",{styles:$extend(this.element.getStyles("margin","position"),{overflow:"hidden"})}).wraps(this.element);this.element.store("wrapper",this.wrapper).setStyle("margin",0);
this.now=[];this.open=true;},vertical:function(){this.margin="margin-top";this.layout="height";this.offset=this.element.offsetHeight;},horizontal:function(){this.margin="margin-left";
this.layout="width";this.offset=this.element.offsetWidth;},set:function(a){this.element.setStyle(this.margin,a[0]);this.wrapper.setStyle(this.layout,a[1]);
return this;},compute:function(c,b,a){return[0,1].map(function(d){return Fx.compute(c[d],b[d],a);});},start:function(b,e){if(!this.check(b,e)){return this;
}this[e||this.options.mode]();var d=this.element.getStyle(this.margin).toInt();var c=this.wrapper.getStyle(this.layout).toInt();var a=[[d,c],[0,this.offset]];
var g=[[d,c],[-this.offset,0]];var f;switch(b){case"in":f=a;break;case"out":f=g;break;case"toggle":f=(c==0)?a:g;}return this.parent(f[0],f[1]);},slideIn:function(a){return this.start("in",a);
},slideOut:function(a){return this.start("out",a);},hide:function(a){this[a||this.options.mode]();this.open=false;return this.set([-this.offset,0]);},show:function(a){this[a||this.options.mode]();
this.open=true;return this.set([0,this.offset]);},toggle:function(a){return this.start("toggle",a);}});Element.Properties.slide={set:function(b){var a=this.retrieve("slide");
if(a){a.cancel();}return this.eliminate("slide").store("slide:options",$extend({link:"cancel"},b));},get:function(a){if(a||!this.retrieve("slide")){if(a||!this.retrieve("slide:options")){this.set("slide",a);
}this.store("slide",new Fx.Slide(this,this.retrieve("slide:options")));}return this.retrieve("slide");}};Element.implement({slide:function(d,e){d=d||"toggle";
var b=this.get("slide"),a;switch(d){case"hide":b.hide(e);break;case"show":b.show(e);break;case"toggle":var c=this.retrieve("slide:flag",b.open);b[c?"slideOut":"slideIn"](e);
this.store("slide:flag",!c);a=true;break;default:b.start(d,e);}if(!a){this.eliminate("slide:flag");}return this;}});var SmoothScroll=Fx.SmoothScroll=new Class({Extends:Fx.Scroll,initialize:function(b,c){c=c||document;
this.doc=c.getDocument();var d=c.getWindow();this.parent(this.doc,b);this.links=this.options.links?$$(this.options.links):$$(this.doc.links);var a=d.location.href.match(/^[^#]*/)[0]+"#";
this.links.each(function(f){if(f.href.indexOf(a)!=0){return;}var e=f.href.substr(a.length);if(e){this.useLink(f,e);}},this);if(!Browser.Engine.webkit419){this.addEvent("complete",function(){d.location.hash=this.anchor;
},true);}},useLink:function(c,a){var b;c.addEvent("click",function(d){if(b!==false&&!b){b=$(a)||this.doc.getElement("a[name="+a+"]");}if(b){d.preventDefault();
this.anchor=a;this.toElement(b);c.blur();}}.bind(this));}});Fx.Sort=new Class({Extends:Fx.Elements,options:{mode:"vertical"},initialize:function(b,a){this.parent(b,a);
this.elements.each(function(c){if(c.getStyle("position")=="static"){c.setStyle("position","relative");}});this.setDefaultOrder();},setDefaultOrder:function(){this.currentOrder=this.elements.map(function(b,a){return a;
});},sort:function(e){if($type(e)!="array"){return false;}var i=0;var a=0;var h={};var d=this.options.mode=="vertical";var f=this.elements.map(function(m,j){var l=m.getComputedSize({styles:["border","padding","margin"]});
var n;if(d){n={top:i,margin:l["margin-top"],height:l.totalHeight};i+=n.height-l["margin-top"];}else{n={left:a,margin:l["margin-left"],width:l.totalWidth};
a+=n.width;}var k=d?"top":"left";h[j]={};var o=m.getStyle(k).toInt();h[j][k]=o||0;return n;},this);this.set(h);e=e.map(function(j){return j.toInt();});
if(e.length!=this.elements.length){this.currentOrder.each(function(j){if(!e.contains(j)){e.push(j);}});if(e.length>this.elements.length){e.splice(this.elements.length-1,e.length-this.elements.length);
}}i=0;a=0;var b=0;var c={};e.each(function(l,j){var k={};if(d){k.top=i-f[l].top-b;i+=f[l].height;}else{k.left=a-f[l].left;a+=f[l].width;}b=b+f[l].margin;
c[l]=k;},this);var g={};$A(e).sort().each(function(j){g[j]=c[j];});this.start(g);this.currentOrder=e;return this;},rearrangeDOM:function(a){a=a||this.currentOrder;
var b=this.elements[0].getParent();var c=[];this.elements.setStyle("opacity",0);a.each(function(d){c.push(this.elements[d].inject(b).setStyles({top:0,left:0}));
},this);this.elements.setStyle("opacity",1);this.elements=$$(c);this.setDefaultOrder();return this;},getDefaultOrder:function(){return this.elements.map(function(b,a){return a;
});},forward:function(){return this.sort(this.getDefaultOrder());},backward:function(){return this.sort(this.getDefaultOrder().reverse());},reverse:function(){return this.sort(this.currentOrder.reverse());
},sortByElements:function(a){return this.sort(a.map(function(b){return this.elements.indexOf(b);},this));},swap:function(c,b){if($type(c)=="element"){c=this.elements.indexOf(c);
}if($type(b)=="element"){b=this.elements.indexOf(b);}var a=$A(this.currentOrder);a[this.currentOrder.indexOf(c)]=b;a[this.currentOrder.indexOf(b)]=c;this.sort(a);
}});var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,modifiers:{x:"left",y:"top"}},initialize:function(){var b=Array.link(arguments,{options:Object.type,element:$defined});
this.element=$(b.element);this.document=this.element.getDocument();this.setOptions(b.options||{});var a=$type(this.options.handle);this.handles=((a=="array"||a=="collection")?$$(this.options.handle):$(this.options.handle))||this.element;
this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.Engine.trident)?"selectstart":"mousedown";this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:$lambda(false)};
this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);
return this;},start:function(c){if(this.options.preventDefault){c.preventDefault();}this.mouse.start=c.page;this.fireEvent("beforeStart",this.element);
var a=this.options.limit;this.limit={x:[],y:[]};for(var d in this.options.modifiers){if(!this.options.modifiers[d]){continue;}if(this.options.style){this.value.now[d]=this.element.getStyle(this.options.modifiers[d]).toInt();
}else{this.value.now[d]=this.element[this.options.modifiers[d]];}if(this.options.invert){this.value.now[d]*=-1;}this.mouse.pos[d]=c.page[d]-this.value.now[d];
if(a&&a[d]){for(var b=2;b--;b){if($chk(a[d][b])){this.limit[d][b]=$lambda(a[d][b])();}}}}if($type(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};
}this.document.addEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});this.document.addEvent(this.selection,this.bound.eventStop);},check:function(a){if(this.options.preventDefault){a.preventDefault();
}var b=Math.round(Math.sqrt(Math.pow(a.page.x-this.mouse.start.x,2)+Math.pow(a.page.y-this.mouse.start.y,2)));if(b>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});
this.fireEvent("start",[this.element,a]).fireEvent("snap",this.element);}},drag:function(a){if(this.options.preventDefault){a.preventDefault();}this.mouse.now=a.page;
for(var b in this.options.modifiers){if(!this.options.modifiers[b]){continue;}this.value.now[b]=this.mouse.now[b]-this.mouse.pos[b];if(this.options.invert){this.value.now[b]*=-1;
}if(this.options.limit&&this.limit[b]){if($chk(this.limit[b][1])&&(this.value.now[b]>this.limit[b][1])){this.value.now[b]=this.limit[b][1];}else{if($chk(this.limit[b][0])&&(this.value.now[b]<this.limit[b][0])){this.value.now[b]=this.limit[b][0];
}}}if(this.options.grid[b]){this.value.now[b]-=((this.value.now[b]-this.limit[b][0])%this.options.grid[b]);}if(this.options.style){this.element.setStyle(this.options.modifiers[b],this.value.now[b]+this.options.unit);
}else{this.element[this.options.modifiers[b]]=this.value.now[b];}}this.fireEvent("drag",[this.element,a]);},cancel:function(a){this.document.removeEvent("mousemove",this.bound.check);
this.document.removeEvent("mouseup",this.bound.cancel);if(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.fireEvent("cancel",this.element);
}},stop:function(a){this.document.removeEvent(this.selection,this.bound.eventStop);this.document.removeEvent("mousemove",this.bound.drag);this.document.removeEvent("mouseup",this.bound.stop);
if(a){this.fireEvent("complete",[this.element,a]);}}});Element.implement({makeResizable:function(a){var b=new Drag(this,$merge({modifiers:{x:"width",y:"height"}},a));
this.store("resizer",b);return b.addEvent("drag",function(){this.fireEvent("resize",b);}.bind(this));}});Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:false,precalculate:false,includeMargins:true,checkDroppables:true},initialize:function(c,b){this.parent(c,b);
this.droppables=$$(this.options.droppables);this.container=$(this.options.container);if(this.container&&$type(this.container)!="element"){this.container=$(this.container.getDocument().body);
}var a=this.element.getStyle("position");if(a=="static"){a="absolute";}if([this.element.getStyle("left"),this.element.getStyle("top")].contains("auto")){this.element.position(this.element.getPosition(this.element.offsetParent));
}this.element.setStyle("position",a);this.addEvent("start",this.checkDroppables,true);this.overed=null;},start:function(f){if(this.container){var b=this.container.getCoordinates(this.element.getOffsetParent()),c={},e={};
["top","right","bottom","left"].each(function(g){c[g]=this.container.getStyle("border-"+g).toInt();e[g]=this.element.getStyle("margin-"+g).toInt();},this);
var d=this.element.offsetWidth+e.left+e.right;var a=this.element.offsetHeight+e.top+e.bottom;if(this.options.includeMargins){$each(e,function(h,g){e[g]=0;
});}if(this.container==this.element.getOffsetParent()){this.options.limit={x:[0-e.left,b.right-c.left-c.right-d+e.right],y:[0-e.top,b.bottom-c.top-c.bottom-a+e.bottom]};
}else{this.options.limit={x:[b.left+c.left-e.left,b.right-c.right-d+e.right],y:[b.top+c.top-e.top,b.bottom-c.bottom-a+e.bottom]};}}if(this.options.precalculate){this.positions=this.droppables.map(function(g){return g.getCoordinates();
});}this.parent(f);},checkAgainst:function(c,b){c=(this.positions)?this.positions[b]:c.getCoordinates();var a=this.mouse.now;return(a.x>c.left&&a.x<c.right&&a.y<c.bottom&&a.y>c.top);
},checkDroppables:function(){var a=this.droppables.filter(this.checkAgainst,this).getLast();if(this.overed!=a){if(this.overed){this.fireEvent("leave",[this.element,this.overed]);
}if(a){this.fireEvent("enter",[this.element,a]);}this.overed=a;}},drag:function(a){this.parent(a);if(this.options.checkDroppables&&this.droppables.length){this.checkDroppables();
}},stop:function(a){this.checkDroppables();this.fireEvent("drop",[this.element,this.overed,a]);this.overed=null;return this.parent(a);}});Element.implement({makeDraggable:function(a){var b=new Drag.Move(this,a);
this.store("dragger",b);return b;}});var Slider=new Class({Implements:[Events,Options],Binds:["clickedElement","draggedKnob","scrolledElement"],options:{onTick:function(a){if(this.options.snap){a=this.toPosition(this.step);
}this.knob.setStyle(this.property,a);},snap:false,offset:0,range:false,wheel:false,steps:100,mode:"horizontal"},initialize:function(f,a,e){this.setOptions(e);
this.element=$(f);this.knob=$(a);this.previousChange=this.previousEnd=this.step=-1;var g,b={},d={x:false,y:false};switch(this.options.mode){case"vertical":this.axis="y";
this.property="top";g="offsetHeight";break;case"horizontal":this.axis="x";this.property="left";g="offsetWidth";}this.half=this.knob[g]/2;this.full=this.element[g]-this.knob[g]+(this.options.offset*2);
this.min=$chk(this.options.range[0])?this.options.range[0]:0;this.max=$chk(this.options.range[1])?this.options.range[1]:this.options.steps;this.range=this.max-this.min;
this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;this.stepWidth=this.stepSize*this.full/Math.abs(this.range);this.knob.setStyle("position","relative").setStyle(this.property,-this.options.offset);
d[this.axis]=this.property;b[this.axis]=[-this.options.offset,this.full-this.options.offset];this.bound={clickedElement:this.clickedElement.bind(this),scrolledElement:this.scrolledElement.bindWithEvent(this),draggedKnob:this.draggedKnob.bind(this)};
var c={snap:0,limit:b,modifiers:d,onDrag:this.bound.draggedKnob,onStart:this.bound.draggedKnob,onBeforeStart:(function(){this.isDragging=true;}).bind(this),onComplete:function(){this.isDragging=false;
this.draggedKnob();this.end();}.bind(this)};if(this.options.snap){c.grid=Math.ceil(this.stepWidth);c.limit[this.axis][1]=this.full;}this.drag=new Drag(this.knob,c);
this.attach();},attach:function(){this.element.addEvent("mousedown",this.bound.clickedElement);if(this.options.wheel){this.element.addEvent("mousewheel",this.bound.scrolledElement);
}this.drag.attach();return this;},detach:function(){this.element.removeEvent("mousedown",this.bound.clickedElement);this.element.removeEvent("mousewheel",this.bound.scrolledElement);
this.drag.detach();return this;},set:function(a){if(!((this.range>0)^(a<this.min))){a=this.min;}if(!((this.range>0)^(a>this.max))){a=this.max;}this.step=Math.round(a);
this.checkStep();this.fireEvent("tick",this.toPosition(this.step));this.end();return this;},clickedElement:function(c){if(this.isDragging||c.target==this.knob){return;
}var b=this.range<0?-1:1;var a=c.page[this.axis]-this.element.getPosition()[this.axis]-this.half;a=a.limit(-this.options.offset,this.full-this.options.offset);
this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();this.fireEvent("tick",a);this.end();},scrolledElement:function(a){var b=(this.options.mode=="horizontal")?(a.wheel<0):(a.wheel>0);
this.set(b?this.step-this.stepSize:this.step+this.stepSize);a.stop();},draggedKnob:function(){var b=this.range<0?-1:1;var a=this.drag.value.now[this.axis];
a=a.limit(-this.options.offset,this.full-this.options.offset);this.step=Math.round(this.min+b*this.toStep(a));this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;
this.fireEvent("change",this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent("complete",this.step+"");
}},toStep:function(a){var b=(a+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?Math.round(b-=b%this.stepSize):b;},toPosition:function(a){return(this.full*Math.abs(this.min-a))/(this.steps*this.stepSize)-this.options.offset;
}});var Sortables=new Class({Implements:[Events,Options],options:{snap:4,opacity:1,clone:false,revert:false,handle:false,constrain:false},initialize:function(a,b){this.setOptions(b);
this.elements=[];this.lists=[];this.idle=true;this.addLists($$($(a)||a));if(!this.options.clone){this.options.revert=false;}if(this.options.revert){this.effect=new Fx.Morph(null,$merge({duration:250,link:"cancel"},this.options.revert));
}},attach:function(){this.addLists(this.lists);return this;},detach:function(){this.lists=this.removeLists(this.lists);return this;},addItems:function(){Array.flatten(arguments).each(function(a){this.elements.push(a);
var b=a.retrieve("sortables:start",this.start.bindWithEvent(this,a));(this.options.handle?a.getElement(this.options.handle)||a:a).addEvent("mousedown",b);
},this);return this;},addLists:function(){Array.flatten(arguments).each(function(a){this.lists.push(a);this.addItems(a.getChildren());},this);return this;
},removeItems:function(){return $$(Array.flatten(arguments).map(function(a){this.elements.erase(a);var b=a.retrieve("sortables:start");(this.options.handle?a.getElement(this.options.handle)||a:a).removeEvent("mousedown",b);
return a;},this));},removeLists:function(){return $$(Array.flatten(arguments).map(function(a){this.lists.erase(a);this.removeItems(a.getChildren());return a;
},this));},getClone:function(b,a){if(!this.options.clone){return new Element("div").inject(document.body);}if($type(this.options.clone)=="function"){return this.options.clone.call(this,b,a,this.list);
}return a.clone(true).setStyles({margin:"0px",position:"absolute",visibility:"hidden",width:a.getStyle("width")}).inject(this.list).position(a.getPosition(a.getOffsetParent()));
},getDroppables:function(){var a=this.list.getChildren();if(!this.options.constrain){a=this.lists.concat(a).erase(this.list);}return a.erase(this.clone).erase(this.element);
},insert:function(c,b){var a="inside";if(this.lists.contains(b)){this.list=b;this.drag.droppables=this.getDroppables();}else{a=this.element.getAllPrevious().contains(b)?"before":"after";
}this.element.inject(b,a);this.fireEvent("sort",[this.element,this.clone]);},start:function(b,a){if(!this.idle){return;}this.idle=false;this.element=a;
this.opacity=a.get("opacity");this.list=a.getParent();this.clone=this.getClone(b,a);this.drag=new Drag.Move(this.clone,{snap:this.options.snap,container:this.options.constrain&&this.element.getParent(),droppables:this.getDroppables(),onSnap:function(){b.stop();
this.clone.setStyle("visibility","visible");this.element.set("opacity",this.options.opacity||0);this.fireEvent("start",[this.element,this.clone]);}.bind(this),onEnter:this.insert.bind(this),onCancel:this.reset.bind(this),onComplete:this.end.bind(this)});
this.clone.inject(this.element,"before");this.drag.start(b);},end:function(){this.drag.detach();this.element.set("opacity",this.opacity);if(this.effect){var a=this.element.getStyles("width","height");
var b=this.clone.computePosition(this.element.getPosition(this.clone.offsetParent));this.effect.element=this.clone;this.effect.start({top:b.top,left:b.left,width:a.width,height:a.height,opacity:0.25}).chain(this.reset.bind(this));
}else{this.reset();}},reset:function(){this.idle=true;this.clone.destroy();this.fireEvent("complete",this.element);},serialize:function(){var c=Array.link(arguments,{modifier:Function.type,index:$defined});
var b=this.lists.map(function(d){return d.getChildren().map(c.modifier||function(e){return e.get("id");},this);},this);var a=c.index;if(this.lists.length==1){a=0;
}return $chk(a)&&a>=0&&a<this.lists.length?b[a]:b;}});Request.JSONP=new Class({Implements:[Chain,Events,Options,Log],options:{url:"",data:{},retries:0,timeout:0,link:"ignore",callbackKey:"callback",injectScript:document.head},initialize:function(a){this.setOptions(a);
this.running=false;this.requests=0;this.triesRemaining=[];},check:function(){if(!this.running){return true;}switch(this.options.link){case"cancel":this.cancel();
return true;case"chain":this.chain(this.caller.bind(this,arguments));return false;}return false;},send:function(c){if(!$chk(arguments[1])&&!this.check(c)){return this;
}var e=$type(c),a=this.options,b=$chk(arguments[1])?arguments[1]:this.requests++;if(e=="string"||e=="element"){c={data:c};}c=$extend({data:a.data,url:a.url},c);
if(!$chk(this.triesRemaining[b])){this.triesRemaining[b]=this.options.retries;}var d=this.triesRemaining[b];(function(){var f=this.getScript(c);this.log("JSONP retrieving script with url: "+f.get("src"));
this.fireEvent("request",f);this.running=true;(function(){if(d){this.triesRemaining[b]=d-1;if(f){f.destroy();this.request(c,b);this.fireEvent("retry",this.triesRemaining[b]);
}}else{if(f&&this.options.timeout){f.destroy();this.cancel();this.fireEvent("failure");}}}).delay(this.options.timeout,this);}).delay(Browser.Engine.trident?50:0,this);
return this;},cancel:function(){if(!this.running){return this;}this.running=false;this.fireEvent("cancel");return this;},getScript:function(c){var b=Request.JSONP.counter,d;
Request.JSONP.counter++;switch($type(c.data)){case"element":d=$(c.data).toQueryString();break;case"object":case"hash":d=Hash.toQueryString(c.data);}var e=c.url+(c.url.test("\\?")?"&":"?")+(c.callbackKey||this.options.callbackKey)+"=Request.JSONP.request_map.request_"+b+(d?"&"+d:"");
if(e.length>2083){this.log("JSONP "+e+" will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs");}var a=new Element("script",{type:"text/javascript",src:e});
Request.JSONP.request_map["request_"+b]=function(f){this.success(f,a);}.bind(this);return a.inject(this.options.injectScript);},success:function(b,a){if(a){a.destroy();
}this.running=false;this.log("JSONP successfully retrieved: ",b);this.fireEvent("complete",[b]).fireEvent("success",[b]).callChain();}});Request.JSONP.counter=0;
Request.JSONP.request_map={};Request.Queue=new Class({Implements:[Options,Events],Binds:["attach","request","complete","cancel","success","failure","exception"],options:{stopOnFailure:true,autoAdvance:true,concurrent:1,requests:{}},initialize:function(a){this.setOptions(a);
this.requests=new Hash;this.addRequests(this.options.requests);this.queue=[];this.reqBinders={};},addRequest:function(a,b){this.requests.set(a,b);this.attach(a,b);
return this;},addRequests:function(a){$each(a,function(c,b){this.addRequest(b,c);},this);return this;},getName:function(a){return this.requests.keyOf(a);
},attach:function(a,b){if(b._groupSend){return this;}["request","complete","cancel","success","failure","exception"].each(function(c){if(!this.reqBinders[a]){this.reqBinders[a]={};
}this.reqBinders[a][c]=function(){this["on"+c.capitalize()].apply(this,[a,b].extend(arguments));}.bind(this);b.addEvent(c,this.reqBinders[a][c]);},this);
b._groupSend=b.send;b.send=function(c){this.send(a,c);return b;}.bind(this);return this;},removeRequest:function(b){var a=$type(b)=="object"?this.getName(b):b;
if(!a&&$type(a)!="string"){return this;}b=this.requests.get(a);if(!b){return this;}["request","complete","cancel","success","failure","exception"].each(function(c){b.removeEvent(c,this.reqBinders[a][c]);
},this);b.send=b._groupSend;delete b._groupSend;return this;},getRunning:function(){return this.requests.filter(function(a){return a.running;});},isRunning:function(){return !!this.getRunning().getKeys().length;
},send:function(b,a){var c=function(){this.requests.get(b)._groupSend(a);this.queue.erase(c);}.bind(this);c.name=b;if(this.getRunning().getKeys().length>=this.options.concurrent||(this.error&&this.options.stopOnFailure)){this.queue.push(c);
}else{c();}return this;},hasNext:function(a){return(!a)?!!this.queue.length:!!this.queue.filter(function(b){return b.name==a;}).length;},resume:function(){this.error=false;
(this.options.concurrent-this.getRunning().getKeys().length).times(this.runNext,this);return this;},runNext:function(a){if(!this.queue.length){return this;
}if(!a){this.queue[0]();}else{var b;this.queue.each(function(c){if(!b&&c.name==a){b=true;c();}});}return this;},runAll:function(){this.queue.each(function(a){a();
});return this;},clear:function(a){if(!a){this.queue.empty();}else{this.queue=this.queue.map(function(b){if(b.name!=a){return b;}else{return false;}}).filter(function(b){return b;
});}return this;},cancel:function(a){this.requests.get(a).cancel();return this;},onRequest:function(){this.fireEvent("request",arguments);},onComplete:function(){this.fireEvent("complete",arguments);
},onCancel:function(){if(this.options.autoAdvance&&!this.error){this.runNext();}this.fireEvent("cancel",arguments);},onSuccess:function(){if(this.options.autoAdvance&&!this.error){this.runNext();
}this.fireEvent("success",arguments);},onFailure:function(){this.error=true;if(!this.options.stopOnFailure&&this.options.autoAdvance){this.runNext();}this.fireEvent("failure",arguments);
},onException:function(){this.error=true;if(!this.options.stopOnFailure&&this.options.autoAdvance){this.runNext();}this.fireEvent("exception",arguments);
}});var Asset={javascript:function(f,d){d=$extend({onload:$empty,document:document,check:$lambda(true)},d);var b=new Element("script",{src:f,type:"text/javascript"});
var e=d.onload.bind(b),a=d.check,g=d.document;delete d.onload;delete d.check;delete d.document;b.addEvents({load:e,readystatechange:function(){if(["loaded","complete"].contains(this.readyState)){e();
}}}).set(d);if(Browser.Engine.webkit419){var c=(function(){if(!$try(a)){return;}$clear(c);e();}).periodical(50);}return b.inject(g.head);},css:function(b,a){return new Element("link",$merge({rel:"stylesheet",media:"screen",type:"text/css",href:b},a)).inject(document.head);
},image:function(c,b){b=$merge({onload:$empty,onabort:$empty,onerror:$empty},b);var d=new Image();var a=$(d)||new Element("img");["load","abort","error"].each(function(e){var f="on"+e;
var g=b[f];delete b[f];d[f]=function(){if(!d){return;}if(!a.parentNode){a.width=d.width;a.height=d.height;}d=d.onload=d.onabort=d.onerror=null;g.delay(1,a,a);
a.fireEvent(e,a,1);};});d.src=a.src=c;if(d&&d.complete){d.onload.delay(1);}return a.set(b);},images:function(d,c){c=$merge({onComplete:$empty,onProgress:$empty,onError:$empty},c);
d=$splat(d);var a=[];var b=0;return new Elements(d.map(function(e){return Asset.image(e,{onload:function(){c.onProgress.call(this,b,d.indexOf(e));b++;if(b==d.length){c.onComplete();
}},onerror:function(){c.onError.call(this,b,d.indexOf(e));b++;if(b==d.length){c.onComplete();}}});}));}};var Color=new Native({initialize:function(b,c){if(arguments.length>=3){c="rgb";
b=Array.slice(arguments,0,3);}else{if(typeof b=="string"){if(b.match(/rgb/)){b=b.rgbToHex().hexToRgb(true);}else{if(b.match(/hsb/)){b=b.hsbToRgb();}else{b=b.hexToRgb(true);
}}}}c=c||"rgb";switch(c){case"hsb":var a=b;b=b.hsbToRgb();b.hsb=a;break;case"hex":b=b.hexToRgb(true);break;}b.rgb=b.slice(0,3);b.hsb=b.hsb||b.rgbToHsb();
b.hex=b.rgbToHex();return $extend(b,this);}});Color.implement({mix:function(){var a=Array.slice(arguments);var c=($type(a.getLast())=="number")?a.pop():50;
var b=this.slice();a.each(function(d){d=new Color(d);for(var e=0;e<3;e++){b[e]=Math.round((b[e]/100*(100-c))+(d[e]/100*c));}});return new Color(b,"rgb");
},invert:function(){return new Color(this.map(function(a){return 255-a;}));},setHue:function(a){return new Color([a,this.hsb[1],this.hsb[2]],"hsb");},setSaturation:function(a){return new Color([this.hsb[0],a,this.hsb[2]],"hsb");
},setBrightness:function(a){return new Color([this.hsb[0],this.hsb[1],a],"hsb");}});var $RGB=function(d,c,a){return new Color([d,c,a],"rgb");};var $HSB=function(d,c,a){return new Color([d,c,a],"hsb");
};var $HEX=function(a){return new Color(a,"hex");};Array.implement({rgbToHsb:function(){var b=this[0],c=this[1],j=this[2];var g,f,h;var i=Math.max(b,c,j),e=Math.min(b,c,j);
var k=i-e;h=i/255;f=(i!=0)?k/i:0;if(f==0){g=0;}else{var d=(i-b)/k;var a=(i-c)/k;var l=(i-j)/k;if(b==i){g=l-a;}else{if(c==i){g=2+d-l;}else{g=4+a-d;}}g/=6;
if(g<0){g++;}}return[Math.round(g*360),Math.round(f*100),Math.round(h*100)];},hsbToRgb:function(){var c=Math.round(this[2]/100*255);if(this[1]==0){return[c,c,c];
}else{var a=this[0]%360;var e=a%60;var g=Math.round((this[2]*(100-this[1]))/10000*255);var d=Math.round((this[2]*(6000-this[1]*e))/600000*255);var b=Math.round((this[2]*(6000-this[1]*(60-e)))/600000*255);
switch(Math.floor(a/60)){case 0:return[c,b,g];case 1:return[d,c,g];case 2:return[g,c,b];case 3:return[g,d,c];case 4:return[b,g,c];case 5:return[c,g,d];
}}return false;}});String.implement({rgbToHsb:function(){var a=this.match(/\d{1,3}/g);return(a)?a.rgbToHsb():null;},hsbToRgb:function(){var a=this.match(/\d{1,3}/g);
return(a)?a.hsbToRgb():null;}});var Group=new Class({initialize:function(){this.instances=Array.flatten(arguments);this.events={};this.checker={};},addEvent:function(b,a){this.checker[b]=this.checker[b]||{};
this.events[b]=this.events[b]||[];if(this.events[b].contains(a)){return false;}else{this.events[b].push(a);}this.instances.each(function(c,d){c.addEvent(b,this.check.bind(this,[b,c,d]));
},this);return this;},check:function(c,a,b){this.checker[c][b]=true;var d=this.instances.every(function(f,e){return this.checker[c][e]||false;},this);if(!d){return;
}this.checker[c]={};this.events[c].each(function(e){e.call(this,this.instances,a);},this);}});Hash.Cookie=new Class({Extends:Cookie,options:{autoSave:true},initialize:function(b,a){this.parent(b,a);
this.load();},save:function(){var a=JSON.encode(this.hash);if(!a||a.length>4096){return false;}if(a=="{}"){this.dispose();}else{this.write(a);}return true;
},load:function(){this.hash=new Hash(JSON.decode(this.read(),true));return this;}});Hash.each(Hash.prototype,function(b,a){if(typeof b=="function"){Hash.Cookie.implement(a,function(){var c=b.apply(this.hash,arguments);
if(this.options.autoSave){this.save();}return c;});}});var IframeShim=new Class({Implements:[Options,Events,Class.Occlude],options:{className:"iframeShim",display:false,zIndex:null,margin:0,offset:{x:0,y:0},browsers:(Browser.Engine.trident4||(Browser.Engine.gecko&&!Browser.Engine.gecko19&&Browser.Platform.mac))},property:"IframeShim",initialize:function(b,a){this.element=$(b);
if(this.occlude()){return this.occluded;}this.setOptions(a);this.makeShim();return this;},makeShim:function(){if(this.options.browsers){var c=this.element.getStyle("zIndex").toInt();
if(!c){var b=this.element.getStyle("position");if(b=="static"||!b){this.element.setStyle("position","relative");}this.element.setStyle("zIndex",c||1);}c=($chk(this.options.zIndex)&&c>this.options.zIndex)?this.options.zIndex:c-1;
if(c<0){c=1;}this.shim=new Element("iframe",{src:(window.location.protocol=="https")?"://0":"javascript:void(0)",scrolling:"no",frameborder:0,styles:{zIndex:c,position:"absolute",border:"none",filter:"progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"},"class":this.options.className}).store("IframeShim",this);
var a=(function(){this.shim.inject(this.element,"after");this[this.options.display?"show":"hide"]();this.fireEvent("inject");}).bind(this);if(Browser.Engine.trident&&!IframeShim.ready){window.addEvent("load",a);
}else{a();}}else{this.position=this.hide=this.show=this.dispose=$lambda(this);}},position:function(){if(!IframeShim.ready){return this;}var a=this.element.measure(function(){return this.getSize();
});if($type(this.options.margin)){a.x=a.x-(this.options.margin*2);a.y=a.y-(this.options.margin*2);this.options.offset.x+=this.options.margin;this.options.offset.y+=this.options.margin;
}if(this.shim){this.shim.set({width:a.x,height:a.y}).position({relativeTo:this.element,offset:this.options.offset});}return this;},hide:function(){if(this.shim){this.shim.setStyle("display","none");
}return this;},show:function(){if(this.shim){this.shim.setStyle("display","block");}return this.position();},dispose:function(){if(this.shim){this.shim.dispose();
}return this;},destroy:function(){if(this.shim){this.shim.destroy();}return this;}});window.addEvent("load",function(){IframeShim.ready=true;});var Scroller=new Class({Implements:[Events,Options],options:{area:20,velocity:1,onChange:function(a,b){this.element.scrollTo(a,b);
},fps:50},initialize:function(b,a){this.setOptions(a);this.element=$(b);this.listener=($type(this.element)!="element")?$(this.element.getDocument().body):this.element;
this.timer=null;this.bound={attach:this.attach.bind(this),detach:this.detach.bind(this),getCoords:this.getCoords.bind(this)};},start:function(){this.listener.addEvents({mouseenter:this.bound.attach,mouseleave:this.bound.detach});
},stop:function(){this.listener.removeEvents({mouseenter:this.bound.attach,mouseleave:this.bound.detach});this.timer=$clear(this.timer);},attach:function(){this.listener.addEvent("mousemove",this.bound.getCoords);
},detach:function(){this.listener.removeEvent("mousemove",this.bound.getCoords);this.timer=$clear(this.timer);},getCoords:function(a){this.page=(this.listener.get("tag")=="body")?a.client:a.page;
if(!this.timer){this.timer=this.scroll.periodical(Math.round(1000/this.options.fps),this);}},scroll:function(){var b=this.element.getSize(),a=this.element.getScroll(),f=this.element.getOffsets(),c=this.element.getScrollSize(),e={x:0,y:0};
for(var d in this.page){if(this.page[d]<(this.options.area+f[d])&&a[d]!=0){e[d]=(this.page[d]-this.options.area-f[d])*this.options.velocity;}else{if(this.page[d]+this.options.area>(b[d]+f[d])&&a[d]+b[d]!=c[d]){e[d]=(this.page[d]-b[d]+this.options.area-f[d])*this.options.velocity;
}}}if(e.y||e.x){this.fireEvent("change",[a.x+e.x,a.y+e.y]);}}});var Tips=new Class({Implements:[Events,Options],options:{onShow:function(a){a.setStyle("visibility","visible");
},onHide:function(a){a.setStyle("visibility","hidden");},title:"title",text:function(a){return a.get("rel")||a.get("href");},showDelay:100,hideDelay:100,className:null,offset:{x:16,y:16},fixed:false},initialize:function(){var a=Array.link(arguments,{options:Object.type,elements:$defined});
if(a.options&&a.options.offsets){a.options.offset=a.options.offsets;}this.setOptions(a.options);this.container=new Element("div",{"class":"tip"});this.tip=this.getTip();
if(a.elements){this.attach(a.elements);}},getTip:function(){return new Element("div",{"class":this.options.className,styles:{visibility:"hidden",display:"none",position:"absolute",top:0,left:0}}).adopt(new Element("div",{"class":"tip-top"}),this.container,new Element("div",{"class":"tip-bottom"})).inject(document.body);
},attach:function(b){var a=function(d,c){if(d==null){return"";}return $type(d)=="function"?d(c):c.get(d);};$$(b).each(function(d){var e=a(this.options.title,d);
d.erase("title").store("tip:native",e).retrieve("tip:title",e);d.retrieve("tip:text",a(this.options.text,d));var c=["enter","leave"];if(!this.options.fixed){c.push("move");
}c.each(function(f){d.addEvent("mouse"+f,d.retrieve("tip:"+f,this["element"+f.capitalize()].bindWithEvent(this,d)));},this);},this);return this;},detach:function(a){$$(a).each(function(c){["enter","leave","move"].each(function(d){c.removeEvent("mouse"+d,c.retrieve("tip:"+d)||$empty);
});c.eliminate("tip:enter").eliminate("tip:leave").eliminate("tip:move");if($type(this.options.title)=="string"&&this.options.title=="title"){var b=c.retrieve("tip:native");
if(b){c.set("title",b);}}},this);return this;},elementEnter:function(b,a){$A(this.container.childNodes).each(Element.dispose);["title","text"].each(function(d){var c=a.retrieve("tip:"+d);
if(!c){return;}this[d+"Element"]=new Element("div",{"class":"tip-"+d}).inject(this.container);this.fill(this[d+"Element"],c);},this);this.timer=$clear(this.timer);
this.timer=this.show.delay(this.options.showDelay,this,a);this.tip.setStyle("display","block");this.position((!this.options.fixed)?b:{page:a.getPosition()});
},elementLeave:function(b,a){$clear(this.timer);this.tip.setStyle("display","none");this.timer=this.hide.delay(this.options.hideDelay,this,a);},elementMove:function(a){this.position(a);
},position:function(d){var b=window.getSize(),a=window.getScroll(),e={x:this.tip.offsetWidth,y:this.tip.offsetHeight},c={x:"left",y:"top"},f={};for(var g in c){f[c[g]]=d.page[g]+this.options.offset[g];
if((f[c[g]]+e[g]-a[g])>b[g]){f[c[g]]=d.page[g]-this.options.offset[g]-e[g];}}this.tip.setStyles(f);},fill:function(a,b){if(typeof b=="string"){a.set("html",b);
}else{a.adopt(b);}},show:function(a){this.fireEvent("show",[this.tip,a]);},hide:function(a){this.fireEvent("hide",[this.tip,a]);}});MooTools.lang.set("en-US","Date",{months:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dateOrder:["month","date","year"],shortDate:"%m/%d/%Y",shortTime:"%I:%M%p",AM:"AM",PM:"PM",ordinal:function(a){return(a>3&&a<21)?"th":["th","st","nd","rd","th"][Math.min(a%10,4)];
},lessThanMinuteAgo:"less than a minute ago",minuteAgo:"about a minute ago",minutesAgo:"{delta} minutes ago",hourAgo:"about an hour ago",hoursAgo:"about {delta} hours ago",dayAgo:"1 day ago",daysAgo:"{delta} days ago",lessThanMinuteUntil:"less than a minute from now",minuteUntil:"about a minute from now",minutesUntil:"{delta} minutes from now",hourUntil:"about an hour from now",hoursUntil:"about {delta} hours from now",dayUntil:"1 day from now",daysUntil:"{delta} days from now"});
MooTools.lang.set("en-US","FormValidator",{required:"This field is required.",minLength:"Please enter at least {minLength} characters (you entered {length} characters).",maxLength:"Please enter no more than {maxLength} characters (you entered {length} characters).",integer:"Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.",numeric:'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").',digits:"Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).",alpha:"Please use letters only (a-z) with in this field. No spaces or other characters are allowed.",alphanum:"Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.",dateSuchAs:"Please enter a valid date such as {date}",dateInFormatMDY:'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',email:'Please enter a valid email address. For example "fred@domain.com".',url:"Please enter a valid URL such as http://www.google.com.",currencyDollar:"Please enter a valid $ amount. For example $100.00 .",oneRequired:"Please enter something for at least one of these inputs.",errorPrefix:"Error: ",warningPrefix:"Warning: ",noSpace:"There can be no spaces in this input.",reqChkByNode:"No items are selected.",requiredChk:"This field is required.",reqChkByName:"Please select a {label}.",match:"This field needs to match the {matchName} field",startDate:"the start date",endDate:"the end date",currendDate:"the current date",afterDate:"The date should be the same or after {label}.",beforeDate:"The date should be the same or before {label}.",startMonth:"Please select a start month",sameMonth:"These two dates must be in the same month - you must change one or the other."});
/*

Software License Agreement (BSD License)
http://taffydb.com
Copyright (c) 2008
All rights reserved.
Version 1.6.1


Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

SUMMARY:
TAFFY takes a JavaScript object and returns a set of methods
to search, modify, and manipulate that object.

*/


// Setup TAFFY Function (nameSpace) to return an object with methods. 

if (typeof TAFFY=="undefined"||!TAFFY) {

var TAFFY = function (obj) {
	var conf = {
		template:null
	}, T = TAFFY, raw = (T.isString(obj)) ? T.JSON.parse(obj) : obj, TOb = raw, TIA = [], t = true, f=false;
	
	
	// ****************************************
    // *
    // * Create prvate mergeTemp function
    // * Loop over set of indexes and apply a template to the record
    // *
    // ****************************************
	var mergeTemp = function (rows,tmpl) {
		var tmpl = (TAFFY.isUndefined(tmpl)) ? conf.template : tmpl;
		if (!TAFFY.isNull(tmpl))
		{
			for(var x = 0; x < rows.length; x++) {
           		TOb[rows[x]] = TAFFY.mergeObj(TOb[rows[x]],tmpl);
        	}
		}
	}

	// ****************************************
    // *
    // * Create prvate bTIA function
    // * Loop over every index within the Taffy Object TOb
	// * and populate the Taffy Index Array TIA with the indexes
    // *
    // ****************************************
	var bTIA = function () {
		TIA = [];
		for(var x = 0; x < TOb.length; x++) {
           TIA[TIA.length] = x;
        }
	}
	bTIA();
	
	
	// ****************************************
    // *
    // * Create prvate findTests Object
    // * Collect all possible true/false expression used when
	// * doing lookups via the public find method.
    // * Purpose: Used to house and document all of the
	// * possible ways to match a value to a field with the
	// * TAFFY Object. Each of the contained functions does an
	// * evaluation against a value from the TAFFY Obj and a test
	// * provided by the caller of the find method. If this
	// * evaluation is true then the find method will add
	// * the TAFFY Object record to the results set.
    // *
    // ****************************************
	
							var findTests = {
								
								pickTest:function(Tt)
								{
								var m = (Tt.indexOf("!") === 0) ? f : t;
								if (!m)
								{
									Tt = Tt.substring(1,Tt.length);
								}
								return {test:(Tt == 'equal') ? 'is' : 
									   (Tt == 'notequal') ? 'not' : 
									   (Tt == 'startswith') ? 'starts' : 
									   (Tt == 'endswith') ? 'ends' : 
									   (Tt == 'greaterthan') ? 'gt' : 
									   (Tt == 'lessthan') ? 'lt' : 
									   (Tt == 'regexppass') ? 'regex' :	Tt,mode:(m) ? {s:t,f:f} : {s:f,f:t}};
								},
								run:function(s,mvalue,mtest,b) {
									return ((s=="regex") ? (mtest.test(mvalue)) :
									(s=="lt") ? (mvalue < mtest) :
									(s=="gt") ? (mvalue > mtest) :
									(s=="starts") ? (mvalue.indexOf(mtest) === 0) :
									(s=="ends") ? (mvalue.substring((mvalue.length - mtest.length)) == mtest) :
									(s=="like") ? (mvalue.indexOf(mtest) >= 0) :
									(s=="is") ? (mvalue == mtest) :
									(s=="has") ? (T.has(mvalue,mtest)) :
									(s=="hasAll") ? (T.hasAll(mvalue,mtest)) :
									(s=="length") ? (findTests.length(mvalue,mtest,b)) :
									findTests[s](mvalue,mtest)) ? b.s : b.f;
								},
								length:function (mvalue,mtest,b)
								{
									// If a value length exits and meets filter criteria
									var rlen = (!T.isUndefined(mvalue.length)) ? mvalue.length : (!T.isUndefined(mvalue.getLength)) ? mvalue.getLength() : 0;
									if (T.isObject(mtest)) {
										for(var kt in mtest)
										{
											if (mtest.hasOwnProperty(kt))
											{
												var pt = findTests.pickTest(kt);
												return findTests.run(pt.test,rlen,mtest[kt],pt.mode) ? t : f;
											}
										}
									}
									// default return
									return rlen == mtest ? b.s : b.f;
								}								
								};
	
	// Add in isObjectType checks
	(function () {
		for(var z in TAFFY)
		{
			if (TAFFY.hasOwnProperty(z) && z.indexOf("is") === 0)
			{
			(function (y) {
				findTests["is" + y] = function (mvalue,mtest,b) {
					return (TAFFY["is" + y](mvalue) == mtest) ? t : f;
				}
			}(z.substring(2,z.length)))
			}
		}
	} ()); 
	
	// ****************************************
    // *
    // * Create prvate bDexArray method
    // * Return an array of indexes
    // * Purpose: Used to create a variable that is an
	// * array that contains the indexes of the records
	// * that an action should be taken on. If a single
	// * number is passed then an array is created with that
	// * number being in postion 0. If an array is passed
	// * in then that array is returned. If no value is
	// * passed in then an array containing every index
	// * in the TAFFY Obj is returned. If an object is passed
	// * then a call to the find function is made and the
	// * resulting array of indexes returned.
    // *
    // ****************************************
    
    var bDexArray = function (iA,f) {
		var rA = [];
        if (!T.isArray(iA) && TAFFY.isNumber(iA)) 
			{
                rA[rA.length] = iA;
            } 
		else if (T.isArray(iA))
           {
               rA = iA;
                    
           }
		else if (T.isObject(iA))
		   {
				rA = f(iA);			
		   }
		else if (!T.isArray(iA) && !T.isNumber(iA))
           {
                rA = TIA;
        	}
		 return rA;
    };
    
	// ****************************************
    // *
    // * Create private toLogicalArray method
    // * return custom array for use in array.sort based on sort obj
    // * argument
    // * Purpose: This is used by the buildSortFunction function in the case
	// * of logical and logicaldesc sort types. This function splits a complex
	// * value into an array so that each array item can be compared against
	// * the item at the index in each value.
	// *
    // ****************************************
	var toLogicalArray = function (value) {
		var rArray = [0],type = "none";
		if (!T.isNull(value) && !T.isUndefined(value)) {
		for(var n = 0;n<value.length;n++)
		{
			var c = value.slice(n,(n+1));
			if (T.isNumeric(c)) {
				if (type != 'number') {
					rArray[rArray.length] = c;
					type = 'number';
				} else {
					rArray[(rArray.length-1)] = rArray[(rArray.length-1)] + "" + c;
				}
			} else {
				if (type != 'string') {
					rArray[rArray.length] = c;
					type = 'string';
				} else {
					rArray[(rArray.length-1)] = rArray[(rArray.length-1)] + c;
				}
			}
			
		}
		for(var n = 0;n<rArray.length;n++)
		{
			if (T.isNumeric(rArray[n])) {
				rArray[n] = parseFloat(rArray[n]);
			}
		}
		} else {
			rArray[rArray.length] = null;
		}
		return rArray;
	};
	
    // ****************************************
    // *
    // * Create private buildSortFunction method
    // * return custom sort function for use in array.sort based on sort obj
    // * argument
    // * Purpose: This is used by the orderBy method to create a custom sort
    // * function for use with array.sort(). This sort function will be unique
    // * based on the field list supplied in the sortobj argument.
    // *
    // ****************************************
    var buildSortFunction = function (sortobj) {
        var custO = [],localO = [];
        
        if (T.isString(sortobj))
        {
		    localO[0] = sortobj;
        } else if (T.isObject(sortobj)) {
			localO = [sortobj];
		} else {
            localO = sortobj;
        }
        
        // create the custO which contains instructions
        // for the returned sort function
        if (T.isArray(localO)) {
            for(var sa = 0; sa < localO.length; sa++) {
                if (T.isString(localO[sa]))
                    {
                    if (T.isString(TOb[0][localO[sa]]))
                        {
                            custO[custO.length] = {sortCol : localO[sa], sortDir : "asc", type : "string"};
                        } else {
                            custO[custO.length] = {sortCol : localO[sa], sortDir : "asc", type : "number"};
                        }
                    } else if (T.isObject(localO[sa])) {
						for(var sc in localO[sa])
						{
							if (localO[sa].hasOwnProperty(sc))
								{
                        	if (T.isString(TOb[0][localO[sa].sortCol]))
                        	{
                            	custO[custO.length] = {sortCol : sc, sortDir : localO[sa][sc], type : "string"};
                        	} else {
                            	custO[custO.length] = {sortCol : sc, sortDir : localO[sa][sc], type : "number"};
                        	}
								}
                        	
						}
                    }
            }
        };
        
        // Return the sort function to the calling object.
        return function (a,b) {
            var returnvar = 0,r1=a,r2=b,x,y;
            
            // loop over the custO and test each sort
            // instruction set against records x and y to see which
            // should appear first in the final array sort
            for(var sa = 0; sa < custO.length; sa++) {
                if (returnvar === 0) {
				
                x = r1[custO[sa]["sortCol"]];
                y = r2[custO[sa]["sortCol"]];
                
                if (custO[sa].type == 'string'){
                    x = (T.isString(x)) ? x.toLowerCase() : x;
                    y = (T.isString(y)) ? y.toLowerCase() : y;
                }
    
                if (custO[sa].sortDir == 'desc')
                {
					if (T.isNull(y) || T.isUndefined(y) || y < x) {
                        returnvar = -1;
                    } else if (T.isNull(x) || T.isUndefined(x) || x < y){
                        returnvar = 1;
                    }
                } else if (custO[sa].sortDir == 'logical') {
					x = toLogicalArray(x);
                    y = toLogicalArray(y);
					
					for(var z = 0;z<y.length;z++)
					{
						if (x[z] < y[z] && z < x.length) {
							returnvar = -1;
							break;
                   		} else if (x[z] > y[z]){
                        	returnvar = 1;
							break;
                    	}
					}
					if (x.length < y.length && returnvar==0)
					{
						returnvar = -1;
					} else if (x.length > y.length && returnvar==0) {
						returnvar = 1;
					}
				} else if (custO[sa].sortDir == 'logicaldesc') {
					x = toLogicalArray(x);
                    y = toLogicalArray(y);
					for(var z = 0;z<y.length;z++)
					{
						if (x[z] > y[z] && z < x.length) {
                        	returnvar = -1;
							break;
                   		} else if (x[z] < y[z]){
                        	returnvar = 1;
							break;
                    	}
					}
					if (x.length < y.length && returnvar==0)
					{
						returnvar = 1;
					} else if (x.length > y.length && returnvar==0) {
						returnvar = -1;
					}
				} else {
					if (T.isNull(x) || T.isUndefined(x) || x < y) {
                        returnvar = -1;
                    } else if (T.isNull(y) || T.isUndefined(y) || x > y){
                        returnvar = 1;
                    }
                }
                
                }
            
            };
            return returnvar;
        
        };
    
    };

	 // ****************************************
    // *
    // * Return Obj containing Methods
    // *
    // ****************************************
    return {
	
	// ****************************************
    // *
    // * This is a simple true flag to identify
	// * the returned collection as being created by
	// * TAFFY()
    // *
    // ****************************************
    TAFFY:true,
	
	// ****************************************
    // *
    // * Get the length of the TAFFY collection.
    // *
    // ****************************************
    getLength:function () {
		return TOb.length;
	},
    
	// ****************************************
    // *
    // * This is the date of the last change
	// * to the TAFFY object.
    // *
    // ****************************************
   	lastModifyDate:new Date(),
	
    // ****************************************
    // *
    // * Create public find method
    // * Returns array of index numbers for matching array values
    // * Purpose: This takes an obj that defines a set of match
    // * cases for use against the TOb. Matching indexes are
    // * added to an array and then returned to the user. This is the
    // * primary "lookup" feature of TAFFY and is how you find individual
    // * or sets of records for use in update, remove, get, etc.
    // *
    // ****************************************
    find : function (matchObj,findFilter) {
	
	
        // define findMatches array and findMatchesLoaded flag
        var findIndex = 0;
        
			// if findFilter is provided use findFilter to start findMatches array
			// otherwise use TIA which contains all indexes of the TOb 
					if (T.isArray(findFilter)) {
						var findMatches = findFilter;
					} else  {
                    	var findMatches = TIA;
					
                }
		
       // if matchObject is a function run it against every item in findMatches
		if (T.isFunction(matchObj))
		{
			var thisMatchArray = [];
                    // loop over every element in the findMatches
	                   for(var d = 0; d < findMatches.length; d++) {
					   		  // add to matched item list if function returns true
							  if (matchObj(TOb[d],d)) {
								  thisMatchArray[thisMatchArray.length] = findMatches[d];  
	                          } 
						}
			findMatches = thisMatchArray;		
		}
		else {
		 // loop over attributes in matchObj
        for (var mi in matchObj){ 
        
            // default matchType, matchValue, matchField
            var matchType = 'is',matchValue = '',matchField = mi,matchMode = {s:t,f:f},pt = {};
			
            // If the matchObj attribute is an object
            if (T.isObject(matchObj[mi]))
            {
                // loop over match field attributes
                for (var fi in matchObj[mi]){ 
                    
                    // switch over attributes, extract data
					pt = findTests.pickTest(fi);
					matchType = pt.test;
					matchMode = pt.mode;
					
      				matchValue = matchObj[mi][fi];
                }
            }
            // If the matchObj attribute is not an object
             else
            {
                // set the match value to the value provided
                matchValue = matchObj[mi];
            }                
                
                //define thisMatchArray for this find method
                var thisMatchArray = [];
                
                    // loop over every element in the findMatches
                       for(var d = 0; d < findMatches.length; d++) {
					   	
                                    // if the value is an array of values, loop rather than do 1 to 1
                                    if (T.isArray(matchValue) && matchType != 'isSameArray' && matchType != 'hasAll')
                                    {
										// call the correct filter based on matchType and add the record if the filter returns true
                                        for(var md = 0; md < matchValue.length; md++) {
                                            if (findTests.run(matchType,TOb[findMatches[d]][matchField],matchValue[md],matchMode)) {
                                                thisMatchArray[thisMatchArray.length] = findMatches[d];
                                                
                                            }
                                        }
                                    } 
									// if the value is a function call function and append index if it returns true
                                    else if (T.isFunction(matchValue) && matchValue(TOb[findMatches[d]][matchField],d)) {
										thisMatchArray[thisMatchArray.length] = findMatches[d];
									}
									// if the value is not an array but a single value
                                    // If an exact match is found then add it to the array
                                    
									else if (findTests.run(matchType,TOb[findMatches[d]][matchField],matchValue,matchMode))
                                    {
										thisMatchArray[thisMatchArray.length] = findMatches[d];
                                        
                                    }				
                    }
                
               findMatches = thisMatchArray;
        };
        }
		// Garther only unique finds
		findMatches = T.gatherUniques(findMatches);

        return findMatches;
    },
    
    // ****************************************
    // *
    // * Create public remove method
    // * Purpose: This is used to remove a record from
    // * the TOb by an index or an array of indexes.
    // *
    // ****************************************
    remove : function (dex) {
        	
            var removeIndex = bDexArray(dex,this.find);
			
            // loop over removeIndex and set each record to remove
            // this is done so all records are flagged for remove
            // before the size of the array changes do to the splice
            // function below
            for(var di = 0; di < removeIndex.length; di++) {
				if (this.onRemove != null)
				{
					this.onRemove(TOb[removeIndex[di]]);
				}
                TOb[removeIndex[di]] = 'remove';
            }
			
			// nested function find delete
			var removeRemaining = function () {
				for(var tdi = 0; tdi < TOb.length; tdi++) {
           		 	if (TOb[tdi] === 'remove') {
                    	return t;
             		}
            	}
				return f;
			};
            
            // loop over TOb and remove all rows set to remove
            while (removeRemaining()) {
				for(var tdi = 0; tdi < TOb.length; tdi++) {
	                if (TOb[tdi] === 'remove') {
	                    TOb.splice(tdi,1);
						// update lastModifyDate
						this.lastModifyDate = new Date();
	                }
	            }
			}

			// populate TIA
			bTIA();
            return removeIndex;
    } ,
    

    
    
    // ****************************************
    // *
    // * Create public insert method
    // * Purpose: this takes an obj and inserts it into
    // * the TAFFY Obj array
    // *
    // ****************************************    
    insert : function (newRecordObj) {
        
		if (this.onInsert != null)
			{
				 this.onInsert(newRecordObj);
			} 
		
		
        // Do insert
        TOb[TOb.length] = (TAFFY.isNull(conf.template)) ? newRecordObj : TAFFY.mergeObj(conf.template,newRecordObj);
		
		// update lastModifyDate
		this.lastModifyDate = new Date();

		// populate TIA
		TIA[TIA.length] = TOb.length-1;
		return [TOb.length-1];
    } ,
    
    // ****************************************
    // *
    // * Create public update method
    // * Purpose: This takes an obj of name/value
    // * pairs and then a set of 1 or more indexes
    // * and updates those records with in the TOb
    // *
    // ****************************************    
    update : function (updateObj,dex) {
        	
            var updateIndex = bDexArray(dex,this.find), updateCount=0;
			
            for(var d = 0; d < updateIndex.length; d++) {
              // set the updatedex
              var updateDex = updateIndex[d];
              
			  if (this.onUpdate != null)
				{
					this.onUpdate(updateObj,TOb[updateDex]);
				}
			            
              // Merge Objects
			  TOb[updateDex] = T.mergeObj(TOb[updateDex],updateObj);
                        
              // add the updaecount
              updateCount++;
			  
              }
        
			return updateIndex;
        } ,
        
        
    // ****************************************
    // *
    // * Create public get method
    // * Purpose: This return an array containing
    // * the rows for a set of indexes. Used to get
    // * a record set with the help of the find
    // * function. Returns an empty array if
	// * no records are found.
    // *
    // ****************************************
    
    get : function (dex) {
        
         var nT = [];
            
         var getIndex = bDexArray(dex,this.find);
                
                // loop over all of the indexes
                for(var d = 0; d < getIndex.length; d++) {
                    
                    // add the TOb to the newTAFFYArray array
                    nT[nT.length] = TOb[getIndex[d]];
                }
        return nT;
    },
	
	// ****************************************
    // *
    // * Create public first method
    // * Purpose: This returns the first row
	// * from a set of indexes. Used to get
    // * a record with the help of the find
    // * function. Returns false if no records
	// * are found.
    // *
    // ****************************************
    
    first : function (dex) {
            
         var getIndex = bDexArray(dex,this.find);
                
         return (getIndex.length > 0) ? TOb[getIndex[0]] : false;
					
    },
	
	// ****************************************
    // *
    // * Create public last method
    // * Purpose: This returns the last row
	// * from a set of indexes. Used to get
    // * a record with the help of the find
    // * function. Returns false if no records
	// * are found.
    // *
    // ****************************************
    
    last : function (dex) {
        
         var getIndex = bDexArray(dex,this.find);
                
         return (getIndex.length > 0) ? TOb[getIndex[(getIndex.length - 1)]] : false;
    },
	
	// ****************************************
    // *
    // * Create public stringify method
    // * Purpose: This returns a string JSON array
	// * from a set of indexes. Used to get records
	// * for handling by AJAX or other langauges.
    // *
    // ****************************************
    
    stringify : function (dex) {
        
        return T.JSON.stringify(this.get(dex));
    },
    
    // ****************************************
    // *
    // * Create public orderBy method
    // * Purpose: Reorder the array according
    // * to a list of fields. Very useful for
    // * ordering tables or other types of
    // * sorting.
    // *
    // ****************************************
    orderBy : function (Obj) {
        
		// Only attempt to sort if there is a length
		// to the TAFFY array
		if (TOb.length > 0) {
        // Use the private buildSortFunction method
        // to create a custom sort function
		
        var customSort = buildSortFunction(Obj);
        
        // Call JavaScript's array.sort with the custom
        // sort function
        TOb.sort(customSort);
		
		// update lastModifyDate
		this.lastModifyDate = new Date();
        
		
		}
        },
        
    // ****************************************
    // *
    // * Create public forEach method
    // * Purpose: Loop over every item in a TOb
    // * (or at least the ones passed in the forIndex)
    // * and call the provided user created function.
    // *
    // ****************************************
    forEach : function (func2call,dex) {
        
        var forIndex = bDexArray(dex,this.find);
			
        var row;
        // loop over all of the indexes
            for(var fe = 0; fe < forIndex.length; fe++) {
                // get this row from the TOb
                 row = TOb[forIndex[fe]];
                // call the function passed in to the method
				var nr = func2call(row,forIndex[fe]);
				
				// If nr is an object then set the row equal to the new object
				if (T.isObject(nr))
				{
					if (TAFFY.isSameObject(nr,TAFFY.EXIT)) {
						break;
					} else {
						this.update(nr,forIndex[fe])
					}
				}
            };
        
        },
		
	
	// ****************************************
    // *
    // * config variable object
    // *
    // ****************************************
		config:{
			// ****************************************
		    // *
		    // * Create public set method
		    // * Purpose: Set a config value
		    // *
		    // ****************************************
			set:function (n,v) {
				conf[n] = v;
				if (n == 'template' && !TAFFY.isNull(v)) {
					mergeTemp(TIA,v);
				}
			},
			// ****************************************
		    // *
		    // * Create public get method
		    // * Purpose: Get a config value
		    // *
		    // ****************************************
			get:function (n) {
				return conf[n];
			}
		},
	
	// ****************************************
    // *
    // * Create public stringify method
    // * Purpose: This returns a string JSON array
	// * from a set of indexes. Used to get records
	// * for handling by AJAX or other langauges.
    // *
    // ****************************************
    
    applyTemplate : function (tmp,dex) {
         var getIndex = bDexArray(dex,this.find);
                
         mergeTemp(getIndex,tmp);
    },
	// ****************************************
    // *
    // * Empty On Update Event - This can be replaced with a function
	// * to call a custom action as each record is updated.
    // *
    // ****************************************
		onUpdate:null,
	
	// ****************************************
    // *
    // * Empty On Remove Event - This can be replaced with a function
	// * to call a custom action as each record is removed.
    // *
    // ****************************************
		onRemove:null,
		
	// ****************************************
    // *
    // * Empty On Insert Event - This can be replaced with a function
	// * to call a custom action as each record is inserted.
    // *
    // ****************************************
		onInsert:null
    
    };
    
};
	
	// ****************************************
    // *
    // * TAFFY Public Utilities
	// * Accessed via TAFFY[methodname]()
    // *
    // ****************************************
	
	
	// ****************************************
    // *
    // * typeOf Fixed in JavaScript as public utility
    // *
    // ****************************************
	TAFFY.typeOf = function (v) {
    var s = typeof v;
    if (s === 'object') {
        if (v) {
            if (typeof v.length === 'number' &&
                    !(v.propertyIsEnumerable('length')) &&
                    typeof v.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
	};
	
	
	// ****************************************
    // *
    // * JSON Object Handler / public utility
    // * See http://www.JSON.org/js.html
    // * The following JSON Object is Public Domain
	// * No warranty expressed or implied. Use at your own risk.
    // *
    // ****************************************
	
	    TAFFY.JSON = function () {
	
	        function f(n) {
	            return n < 10 ? '0' + n : n;
	        }
	
	        Date.prototype.toJSON = function () {
	
	            return this.getUTCFullYear()   + '-' +
	                 f(this.getUTCMonth() + 1) + '-' +
	                 f(this.getUTCDate())      + 'T' +
	                 f(this.getUTCHours())     + ':' +
	                 f(this.getUTCMinutes())   + ':' +
	                 f(this.getUTCSeconds())   + 'Z';
	        };
	
	
	        var m = { 
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        };
	
	        function stringify(value, whitelist) {
	            var a,i,k,l, r = /["\\\x00-\x1f\x7f-\x9f]/g,v;
	
	            switch (typeof value) {
	            case 'string':
	
	                return r.test(value) ?
	                    '"' + value.replace(r, function (a) {
	                        var c = m[a];
	                        if (c) {
	                            return c;
	                        }
	                        c = a.charCodeAt();
	                        return '\\u00' + Math.floor(c / 16).toString(16) +
	                                                   (c % 16).toString(16);
	                    }) + '"' :
	                    '"' + value + '"';
	
	            case 'number':
	
	                return isFinite(value) ? String(value) : 'null';
	
	            case 'boolean':
	            case 'null':
	                return String(value);
	
	            case 'object':
	
	                if (!value) {
	                    return 'null';
	                }
	
	                if (typeof value.toJSON === 'function') {
	                    return stringify(value.toJSON());
	                }
	                a = [];
	                if (typeof value.length === 'number' &&
	                        !(value.propertyIsEnumerable('length'))) {
	
	                    l = value.length;
	                    for (i = 0; i < l; i += 1) {
	                        a.push(stringify(value[i], whitelist) || 'null');
	                    }
	
	                    return '[' + a.join(',') + ']';
	                }
	                if (whitelist) {
	
	                    l = whitelist.length;
	                    for (i = 0; i < l; i += 1) {
	                        k = whitelist[i];
	                        if (typeof k === 'string') {
	                            v = stringify(value[k], whitelist);
	                            if (v) {
	                                a.push(stringify(k) + ':' + v);
	                            }
	                        }
	                    }
	                } else {
	
	                    for (k in value) {
	                        if (typeof k === 'string') {
	                            v = stringify(value[k], whitelist);
	                            if (v) {
	                                a.push(stringify(k) + ':' + v);
	                            }
	                        }
	                    }
	                }
	
	                return '{' + a.join(',') + '}';
	            }
				return "";
	        }
	
	        return {
	            stringify: stringify,
	            parse: function (text, filter) {
	                var j;
	
	                function walk(k, v) {
	                    var i, n;
	                    if (v && typeof v === 'object') {
	                        for (i in v) {
	                            if (Object.prototype.hasOwnProperty.apply(v, [i])) {
	                                n = walk(i, v[i]);
	                                if (n !== undefined) {
	                                    v[i] = n;
	                                } else {
	                                    delete v[i];
	                                }
	                            }
	                        }
	                    }
	                    return filter(k, v);
	                }
	
	
	                if (/^[\],:{}\s]*$/.test(text.replace(/\\./g, '@').
	replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
	replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	
	                    j = eval('(' + text + ')');
	
	                    return typeof filter === 'function' ? walk('', j) : j;
	                }
	
	                throw new SyntaxError('parseJSON');
	            }
	        };
	    }();
		
	
	// ****************************************
    // *
    // * End JSON Code Object Handler
    // *
    // ****************************************       
	
	// ****************************************
    // *
    // * Create public utility mergeObj method
    // * Return a new object where items from obj2
	// * have replaced or been added to the items in
	// * obj1
    // * Purpose: Used to combine objs
    // *
    // ****************************************   
	TAFFY.mergeObj = function (ob1,ob2) {
		var c = {};
		for(var n in ob1)
		{
			if (ob1.hasOwnProperty(n))
			c[n] = ob1[n];
		}
		for(var n in ob2)
		{
			if (ob2.hasOwnProperty(n))
			c[n] = ob2[n];
		}
		return c;
	};
	
	// ****************************************
    // *
    // * Create public utility getObjectKeys method
    // * Returns an array of an objects keys
    // * Purpose: Used to get the keys for an object
    // *
    // ****************************************   
	TAFFY.getObjectKeys = function (ob) {
		var kA = [];
		for(var n in ob)
		{
			if (ob.hasOwnProperty(n))
			{
				kA[kA.length] = n;
			}
		}
		kA.sort();
		return kA;
	};
	
	// ****************************************
    // *
    // * Create public utility isSameArray
    // * Returns an array of an objects keys
    // * Purpose: Used to get the keys for an object
    // *
    // ****************************************   
	TAFFY.isSameArray = function (ar1,ar2) {
		return (TAFFY.isArray(ar1) && TAFFY.isArray(ar2) && ar1.join(",") == ar2.join(",")) ? true : false;
	};
	
	// ****************************************
    // *
    // * Create public utility isSameObject method
    // * Returns true if objects contain the same
	// * material or false if they do not
    // * Purpose: Used to comare objects
    // *
    // ****************************************   
	TAFFY.isSameObject = function (ob1,ob2) {
		var T = TAFFY;
		if (T.isObject(ob1) && T.isObject(ob2)) {		
		if (T.isSameArray(T.getObjectKeys(ob1),T.getObjectKeys(ob2))) {
			for(var n in ob1)
			{
				if (ob1.hasOwnProperty(n))
				{
					if ((T.isObject(ob1[n]) && T.isObject(ob2[n]) && T.isSameObject(ob1[n],ob2[n]))
						|| (T.isArray(ob1[n]) && T.isArray(ob2[n]) && T.isSameArray(ob1[n],ob2[n]))
						|| (ob1[n] == ob2[n])) {						
					} else {
						return false;
					}
				} 
			}
		} else {
			return false;
		}
		} else {
			return false;
		}
		return true;
	};
	
	// ****************************************
    // *
    // * Create public utility has method
    // * Returns true if a complex object, array
	// * or taffy collection contains the material
	// * provided in the second argument
    // * Purpose: Used to comare objects
    // *
    // ****************************************
	TAFFY.has = function(var1, var2){
		var T = TAFFY;
		var re = true;
		if (T.isTAFFY(var1)) {
			re = var1.find(var2);
			if (re.length > 0)
			{
				return true;
			} else {
				return false;
			}
		}
		else {
			switch (T.typeOf(var1)) {
				case "object":
					if (T.isObject(var2)) {
						for (var x in var2) {
							if (re == true && var2.hasOwnProperty(x) && !T.isUndefined(var1[x]) && var1.hasOwnProperty(x)) {
								re = T.has(var1[x], var2[x]);
							} else {
								return false;
							}
						}
						return re;
					}
					else 
						if (T.isArray(var2)) {
						for (var x = 0; x < var2.length; x++) {
							re = T.has(var1, var2[x]);
							if (re == true) {
								return true;
							}
						}
						}
						else 
							if (T.isString(var2) && var1[var2] != undefined) {
								return true;
							}
					break;
				case "array":
					if (T.isObject(var2)) {
						for (var n = 0; n < var1.length; n++) {
							re = T.has(var1[n], var2);
							if (re == true) {
								return true;
							}
						}
					}
					else 
						if (T.isArray(var2)) {
						for (var x = 0; x < var2.length; x++) {
							for (var n = 0; n < var1.length; n++) {
								re = T.has(var1[n], var2[x]);
								if (re == true) {
									return true;
								}
							}						}
						}
						else 
							if (T.isString(var2)) {
								for (var n = 0; n < var1.length; n++) {
									re = T.has(var1[n], var2);
									if (re == true) {
										return true;
									}
								}
							}
					break;
				case "string":
					if (T.isString(var2) && var2 == var1) {
						return true;
					}
					break;
				default:
					if (T.typeOf(var1) == T.typeOf(var2) && var1 == var2) {
						return true;
					}
					break;
			}
		}
		return false;
	}
		
	// ****************************************
    // *
    // * Create public utility hasAll method
    // * Returns true if a complex object, array
	// * or taffy collection contains the material
	// * provided in the call - for arrays it must
	// * contain all the material in each array item
    // * Purpose: Used to comare objects
    // *
    // ****************************************
		
		TAFFY.hasAll = function (var1,var2) {
			var T = TAFFY;
			if (T.isArray(var2)) {
				var ar = true;
				for(var i = 0;i<var2.length;i++)
				{
					ar = T.has(var1,var2[i]);
					if(ar == false)
					{
						return ar;
					}
				}
				return true;
			} else {
				return T.has(var1,var2);
			}
		}
		
		// ****************************************
		// *
		// * Create public utility gatherUniques method
		// * Return a new array with only unique
		// * values from the passed array
		// * Purpose: Used to get unique indexes for find
		// *
		// ****************************************   
		TAFFY.gatherUniques = function(a){
			var uniques = [];
			for (var z = 0; z < a.length; z++) {
				var d = true;
				for (var c = 0; c < uniques.length; c++) {
					if (uniques[c] == a[z]) 
						d = false;
				}
				if (d == true) 
					uniques[uniques.length] = a[z];
			}
			return uniques;
		};
		
		// ****************************************
		// *
		// * Create public utility is[DataType] methods
		// * Return true if obj is datatype, false otherwise
		// * Purpose: Used to determine if arguments are of certain data type
		// *
		// ****************************************
		
		(function(ts){
			for (var z = 0; z < ts.length; z++) {
				(function(y){
					TAFFY["is" + y] = function(c){
						return (TAFFY.typeOf(c) == y.toLowerCase()) ? true : false;
					}
				}
(ts[z]))
			}
		}
(["String", "Number", "Object", "Array", "Boolean", "Null", "Function", "Undefined"]));
		
		// ****************************************
		// *
		// * Create public utility isNumeric method
		// * Return ture if text of sT is made up solely of numbers, false otherwise
		// * Purpose: Used to determine if arguments are numbers
		// *
		// ****************************************
		TAFFY.isNumeric = function(sT){
			var vC = "0123456789";
			var IsN = true;
			for (var i = 0; i < sT.length && IsN == true; i++) {
				if (vC.indexOf(sT.charAt(i)) == -1) 
					return false;
			}
			return IsN;
			
		};
		
		// ****************************************
		// *
		// * Create public utility isTAFFY method
		// * Return ture if obj is created by TAFFY()
		// * Purpose: Used to change behavior if oB is a TAFFY collection
		// *
		// ****************************************
		TAFFY.isTAFFY = function(oB){
			return (TAFFY.isObject(oB) && oB.TAFFY) ? true : false;
			
		};
		
		// ****************************************
		// *
		// * Create public utility EXIT object
		// * Static value
		// * Purpose: Return in a forEach function to break out of the loop
		// *
		// ****************************************
		TAFFY.EXIT = {EXIT:true};
		
}
/*
	File: cip.js
	The main CIP file
*/

/*
	Class: CIApplication
	CIApplication is a global object holding objects pertaining to both the CIP framework and its application.
	If it is used to hold application data, the data should not change from page to page. CIPage is designed for this.
 */
// TODO create CIApplication class
var CIApplication = {
	/* Function: onDomReady()
		CIApplication's onDomReady is called when CIP's onDomReady handler on the window is fired.
		It is called before <CIPage.onDomReady()>. The name of the browser's rendering engine is added to <body>'s css class attribute.
		
		See Also:
			<CIPage.onDomReady()>
		*/
	onDomReady: null
};

/* Section: Utility functions */

/* 
	Function: $S(string)
	Tests to see if the object (usually a String) is not null and is not empty
	
	Parameters:
		string - String to test
		
	Returns:
		true or false
*/
// TODO make static method of String
function $S(s) { return s != null && s.toString().length > 0 }

Number.implement({
	toInteger: function() { x = parseInt(this); return x == NaN ? null : x; }
});
String.implement({
	toInteger: function() { x = parseInt(this); return x == NaN ? null : x; }
});
String.implement({
	withEntityCharsDecoded: function() {
		var s = this.toString();
		if (!$S(s)) return '';
		s = s.replace(/&amp;/g, '&');
		s = s.replace(/&lt;/g, '<');
		s = s.replace(/&gt;/g, '>');
		s = s.replace(/&quot;/g, '"');
		return s;
	},
	withEntityCharsEncoded: function() {
		var s = this.toString();
		if (!$S(s)) return '';
		s = s.toString();
		s = s.replace(/&/g, '&amp;');
		s = s.replace(/"/g, '&quot;');
		s = s.replace(/</g, '&lt;');
		s = s.replace(/>/g, '&gt;');
		return s;
	}
});/*
	Class: CIEvent
	CIEvent is a class of static constants that define the events used in CIP.

	Constants: Events
	GotData - When data is received using GET
	PostedData - When data is received using POST
	RequestFailed - When a request for data fails, regardless of method
	Clicked - When an object is clicked
	DoubleClicked - When an object is double-clicked
	MousedOver - When the mouse passes over an object
	MousedOut - When the mouse leaves an object
	AddedToDom - When a view's structure is added to the DOM. Automatically fired after <CIObject.element>
	Entered - When the enter/return key is pressed in/on an object
	EnterPressed - Same as Entered
	EscapePressed - When the escape key is pressed in/on an object
	Shown - When an object becomes visible to the user
	Hiding - When an object begins to hide; fired before Hidden
	Hidden - When an object is hidden from the user
	PropertyChanged - When an object's property has changed: property, newValue[, oldValue]
	Changed - When an object's state has changed
	Selected - When an object's state has changed and has been clicked. Usually fired after Clicked and Changed
	RemovingFromDom - When an object's element is about to be removed from the DOM
	RemovedFromDom - When an object's element is removed from the DOM
	DragEntered - When a dragged object enters an object
	DragStarted - When an object is dragged
	Rendered - When a view has laid itself out
*/
var CIEvent = {
	'RequestedData': 'RequestedData',
	'GotData': 'GotData',
	'PostedData': 'PostedData',
	'DeletedData': 'DeletedData',
	'PutData': 'PutData',
	'RequestFailed': 'RequestFailed',
	'Clicked': 'Clicked',
	'DoubleClicked': 'DoubleClicked',
	'MousedOver': 'MousedOver',
	'MousedOut': 'MousedOut',
	'AddedToDom': 'AddedToDom',
	'EnterPressed': 'EnterPressed',
	'EscapePressed': 'EscapePressed',
	'Shown': 'Shown',
	'Hiding': 'Hiding',
	'Hidden': 'Hidden',	// TextMate indicates Hidden may be a keyword
	'PropertyChanging': 'PropertyChanging',
	'PropertyChanged': 'PropertyChanged',
	'Changed': 'Changed',
	'Selected': 'Selected',
	'Deselected': 'Deselected',
	'Unselected': 'Deselected',
	'RemovingFromDom': 'RemovingFromDom',
	'RemovedFromDom': 'RemovedFromDom',
	'DragEntered': 'DragEntered',
	'DragStarted': 'DragStarted',
	'Rendered': 'Rendered',
	'Unrendered': 'Unrendered',
	'Resized': 'Resized'
};/*
	Class: CIObject
	The base class from which all CIP components and classes inherit. Handles basic
	style processing, handles, events, etc.
	
	Properties:
		isCIObject - Boolean. Should remain true
		objectId - Integer. The internal id number. Should not be modified
		id - String. CIObject_#. Should be overwritten by subclasses
		cssClass - String. CSS Classes to give the element
		cssStyles - Hash. The result of <CIObject.interpretStyles>
		handle - String. Handle by which to access the object
	
	Events:
		- AddedToDom
*/
var CIObject = new Class({
	Implements: Events,
	
	/*
		Constructor: initialize
		Accepts a configuration Hash. All configurations are optional.
		
		Configuration:
			cssClass - String. CSS Classes to give the element
			cssStyles - Hash. CSS Styles to give the element. Automatically passed to <CIObject.interpretStyles>
			handle - String. Handle by which to access the object. See <CIApplication.handles>
			<CIEvent> - String. The constant name of the CIEvent for which to listen.
			
		Example:
		(start code)
		new CIObject({
			cssClass: 'small anotherClass',
			cssStyles: { display: 'none', 'background-color': 'red' },
			handle: 'myObject',
			Clicked: function(event) { ... }
		});
		(end)
	*/
	initialize: function(options) {
		this.isCIObject = true;
		this.objectId = CIObject.nextId();
		this.__family = ['CIObject'];
		this.__properties = [];
		this.isA('CIObject');
		
		if ($type(options) != 'object') options = null;
		options = options || {};
		$H(options).each(function(value, key) {
			if (CIEvent[key] && $type(value) == 'function')
				this.addEvent(key, value.bind(this));
		}.bind(this));
	},
	
	/*
		Function: element(parent)
		Returns the Element implementation for the CIObject. It operates in three modes, depending on the parameters:
		- *No parameters* - looks for the Element in the DOM with id of <CIObject.id> using $(<CIObject.id>) and returns that Element or null
		- *String or Element* - looks for the Element in the DOM using $(String/Element) and passes it to CIObject._makeElement() as the parent, returning an Element. Fires AddedToDom
		- *No parameters, no Element found* - returns null
	*/
	element: function(parent) {
		//console.log('Looking for ' + this.id);
		var elem = $(this.id);
		if (elem != null) {
			//console.log ('  - Found ' + this.id);
			return elem;
		} else if (parent) {
			if (parent.isCIObject) parent = parent.element();
			//console.log('  - Could not find ' + this.id + ' in DOM, creating...')
			// _makeElement returns one element, therefore
			// all components must be contained within one element only!
			var e = this._makeElement($(parent));
			this.fireEvent(CIEvent.AddedToDom, [e, parent])
			return e;
		} else {
			//console.log("  - Could not find " + this.id + " in DOM and will not create");
			return null;
		}
	},
	
	toObject: function() {
		object = {};
		// TODO Make sure this doesn't cause any dependencies on
		// account of references. Deep copy?
		this.__properties.each(function(property) {
			object[property] = this[property];
		}.bind(this));
		return object;
	},
	
	synthesize: function(theProperties, configuration) {
		var propertiesToSynthesize = new Hash();
		if ($type(theProperties) == 'array') {
			theProperties.each(function(p) { propertiesToSynthesize.set(p, null); });
		} else {
			propertiesToSynthesize = new Hash(theProperties);
		}
		configuration = configuration || {};
		if (configuration.isCIObject) configuration = configuration.toObject();
		propertiesToSynthesize.each(function(defaultValue, property) {
			if (!this.__properties.contains(property)) this.__properties.push(property);
			
			if (configuration[property] == null || configuration[property] == undefined)
				this[property] = defaultValue;
			else
				this[property] = configuration[property];
			
			// The descendent's accessors take precedence
			var setter = 'set' + property.capitalize();
			if (!this[setter]) this[setter] = function(newProperty) { return this.set(property, newProperty); }.bind(this);
			var getter = 'get' + property.capitalize();
			if (!this[getter]) this[getter] = function() { return this[property]; }.bind(this);
		}.bind(this));
		return this;
	},
	
	isA: function(type) {
		this.__className = type;
		this.id = this.__className + '_' + this.objectId;
		this.__family.push(this.__className);
	},
	isOfClass: function(type) {
		return this.__className == type;
	},
	
	/*
		Function: set(property, newValue)
		First checks to see if the newValue is different. If it is, fires <CIEvent.PropertyChanged> passing
		the property name, newValue, and the current (about to be old) value of property, in that order. Then
		sets the property to newValue
		
		Parameters:
			property - String. The property to set
			newValue - Anything. The new value
		
		Returns:
			This CIObject
	*/
	set: function(property, newValue) {
		if (this[property] == newValue) return;
		var oldValue = this[property];
		this.fireEvent(CIEvent.PropertyChanging, [property, newValue, oldValue]);
		this[property] = newValue;
		this.fireEvent(CIEvent.PropertyChanged, [property, newValue, this[property]]);
		return this;
	},
	
	hasIntegerProperty: function(property) {
		if (this[property] == null) return false;
		return this[property].toString().match(/^\d+?$/) != null;
	}
});

/* The internal counter used to number CIObjects uniquely */
CIObject._idCounter = 0;

/*
 	Function: CIObject.nextId()
	Increment and return the internal id counter. Should not be called directly, use <CIObject.objectId> instead.
	
	Returns:
		Number
 */
CIObject.nextId = function() { return ++CIObject._idCounter };

/*
	Function: CIObject.interpretStyles(styles)
	Process special CIP styles to CSS styles. Called automatically by CIObject on its cssStyles config option
	
	CIP Styles:
		CIFirmWidth - Value/Percentage. Sets min-, max- and width to the specified value.
		CIFirmHeight - Value/Percentage. Sets min-, max- and height to the specified value.
	
	Returns:
		Hash
	
	Example:
	(start code)
		{ CIFirmWidth: 100, CIFirmHeight: '10%' } =>
		{
			'min-width': 100, 'max-width': 100, 'width': 100,
			'min-height': '10%', 'max-height': '10%', 'height': '10%'
		}
	(end)
*/
CIObject.interpretStyles = function(styles) {
	styles = styles || {};
	if (styles.getKeys) styles = styles.getClean();
	var firmWidth = styles['CIFirmWidth'];
	if (firmWidth) {
		delete styles['CIFirmWidth'];
		styles['min-width'] = firmWidth;
		styles['max-width'] = firmWidth;
		styles['width'] = firmWidth;
	}
	var firmHeight = styles['CIFirmHeight'];
	if (firmHeight) {
		delete styles['CIFirmHeight'];
		styles['min-height'] = firmHeight;
		styles['max-height'] = firmHeight;
		styles['height'] = firmHeight;
	}
	var scrollAtHeight = styles['CIScrollAtHeight'];
	if (scrollAtHeight) {
		delete styles['CIScrollAtHeight'];
		styles['max-height'] = scrollAtHeight;
		styles['overflow'] = 'auto';
	}
	return styles;
};/*
	Class: CIRequest
	A general request that wraps Mootools.Request.JSON using CIRequestable so it incorporates CIApplication.baseParams.
	This is a non-visual component and will throw an error if element() is called on it
	
	Properties:
		See <CIRequestable>
	
	Events:
		- <CIEvent.RequestFailed>
		- <CIEvent.GotData>
		- <CIEvent.PostedData>
*/
var CIRequest = new Class({
	Extends: CIObject,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIRequest');
		$H(options).each(function(config, method) {
			if (method == 'destroy') method = 'delete';
			if (!CIRequest.isValidHTTPMethod(method)) return;
			if ($type(config) == 'string')
				config = { url: config, params: {} };
			this[method+'URLFn'] = $lambda(config.urlFn || config.url);
			this[method+'ParamsFn'] = $lambda(config.params || config.paramsFn || {});
			this[method] = function(moreParams, argsObject) { this.send(method, moreParams, argsObject); }.bind(this);
			if (method == 'delete') this['destroy'] = this['delete'];
			this['can'+method.capitalize()] = true;
		}.bind(this));
		this.forwarders = [];
	},
	
	bindToIndicator: function(indicator) {
		this.indicator = indicator;
	},
	
	forwardEventsTo: function(target) {
		if (!this.forwarders.contains(target)) this.forwarders.push(target);
	},
	
	fireAndForward: function(event, args) {
		this.fireEvent(event, args);
		this.forwarders.clean();
		for (var i = 0; i < this.forwarders.length; i++)
			this.forwarders[i].fireEvent(event, args)
	},
	
	/*
		Funtion: send([method='get', moreParams={}, argsObject={}])
		Make the specified request, passing in more parameters. CIApplication.baseParams overrides paramsFn overrides moreParams.
		Fires <CIEvent.GotData>, <CIEvent.PostedData>, <CIEvent.RequestFailed>
		
		Returns:
			This CIRequest
	*/
	send: function(method, moreParams, argsObject) {
		method = method || 'get';
		var params = $H(moreParams);
		params.extend(this[method+'ParamsFn'](argsObject)).extend(CIApplication.baseParams);
		if (this.indicator) this.indicator.show();
		new Request.JSON({
			method: method,
			url: this[method+'URLFn'](argsObject),
			data: params.getClean(),
			onFailure: function(xhr) {
				if (this.indicator) this.indicator.hide();
				this.fireEvent(CIEvent.RequestFailed, [xhr]);
			}.bind(this), 
			onSuccess: function(response, json) {
				if (method == 'get')
					this.fireAndForward(CIEvent.GotData, [response, json])
				else if (method == 'post')
					this.fireAndForward(CIEvent.PostedData, [response, json]);
				else if (method == 'delete')
					this.fireAndForward(CIEvent.DeletedData, [response, json]);
				else if (method == 'put')
					this.fireAndForward(CIEvent.PutData, [response, json]);
			}.bind(this),
			onComplete: function(xhr) {
				if (this.indicator) this.indicator.hide();
				this.fireAndForward(CIEvent.RequestedData, [xhr])
			}.bind(this)
		}).send();
		return this;
	},
	
	_makeElement: function(parent) {
		throw new Error('CIRequest is not a visible component');
		return null;
	}
});
CIRequest.isValidHTTPMethod = function(method) {
	return ['get','post','put','head','delete'].contains(method);
};var CIRect = new Class({
	Extends: CIObject,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIRect');
		this.synthesize(['width','height','x','y','framedView'], configuration);
		this.synthesize({
			clip: CIRect.Clip
		}, configuration);
	},
	
	toCssStylesObject: function(css, superview) {
		this.superview = superview;
		
		var styles = css || {};
		if (this.width != null)
			styles['min-width'] = styles['max-width'] = styles['width'] = this.width.toInteger(this.superview);
		if (this.height != null)
			styles['min-height'] = styles['max-height'] = styles['height'] = this.height.toInteger(this.superview);
		
		if (CIRect.ClipBehaviors.contains(this.clip)) styles['overflow'] = this.clip;
		
		if (this.hasOrigin()) {
			styles.position = 'absolute';
			styles.top = this.y;
			styles.left = this.x;
		}
		return styles;
	},
	
	isEmpty: function() {
		return this.isEmptySize() & this.isEmptyPoint();
	},
	
	isEmptySize: function() {
		return this.width == null && this.height == null;
	},
	
	isEmptyPoint: function() {
		return this.x == null && this.y == null;
	},
	
	hasOrigin: function() { return this.x != null && this.y != null },
	
	getHeight: function() { return this.height.toInteger(this.superview); },
	getWidth: function() { return this.width.toInteger(this.superview); },
	getX: function() { return this.x.toInteger(); },
	getY: function() { return this.y.toInteger(); }
});
CIRect.AutoScroll = 'auto';
CIRect.Clip = 'hidden';
CIRect.Scroll = 'scroll';
CIRect.DoNotClip = 'visible';
CIRect.ClipBehaviors = [CIRect.AutoScroll, CIRect.Clip, CIRect.Scroll, CIRect.DoNotClip];
CIRect.WidthOfWindow = function() { return new CIResizeBehavior({ action: 'getWidth', target: window }) };
CIRect.HeightOfWindow = function() { return new CIResizeBehavior({ action: 'getHeight', target: window }) };
CIRect.WidthOfSuperview = function() { return new CIResizeBehavior({ action: 'getWidth', willReceiveView: true }); };
CIRect.HeightOfSuperview = function() { return new CIResizeBehavior({ action: 'getHeight', willReceiveView: true }); };/*
	Interface: CIOffsettable
	Provides functions and variables to define how an object is to be offset from a point or an element
	
	Function: _makeOffsettable()
	Called in the object's constructor. It looks for the offset property, which may be defined as:
	
	Variable: offset
	dx - The relative horizontal distance to offset
	dy - The relative vertical distance to offset
	left - The origin horizontal position
	top - The origin vertical position
	from - An <Element> that defines the origin left and top from which to offset
*/
// TODO store offset in _offset
// TODO use implementor's Offset config
var CIOffsettable = new Class({
	_makeOffsettable: function() {
		this.offsetStyles = { dx: 20, dy: 20, left: 0, top: 0 };
		if (this.offset) {
			$extend(this.offsetStyles, this.offset);
			if (this.offset.from) {
				this.offsetStyles.left = $(this.offset.from).getPosition().x;
				this.offsetStyles.top  = $(this.offset.from).getPosition().y;
			}
		}
	}
});var CIRequestable = new Class({
	_makeRequestable: function(configuration, allowedMethods) {
		allowedMethods = $splat(allowedMethods);
		if (allowedMethods.length == 0) allowedMethods = ['get', 'post', 'delete', 'put', 'destroy'];
		
		var config = {};
		allowedMethods.each(function(method) {
			// TODO need type check: $isa(configuration[method], CIRequest)
			if (!configuration[method]) return;
			
			if (configuration[method].isCIObject)
				this._request = configuration[method];
			else
				config[method] = configuration[method];
		}.bind(this));
		if (!this._request) this._request = new CIRequest(config);
		
		// Pass the events through to the implementing object
		this._request.addEvent(CIEvent.RequestedData, function(xhr) { this.fireEvent(CIEvent.RequestedData, [xhr]); }.bind(this));
		this._request.addEvent(CIEvent.RequestFailed, function(xhr) { this.fireEvent(CIEvent.RequestFailed, [xhr]); }.bind(this));
		this._request.addEvent(CIEvent.GotData, function(o,j) { this.fireEvent(CIEvent.GotData, [o,j]); }.bind(this));
		this._request.addEvent(CIEvent.PostedData, function(o,j) { this.fireEvent(CIEvent.PostedData, [o,j]); }.bind(this));
		this._request.addEvent(CIEvent.DeletedData, function(o,j) { this.fireEvent(CIEvent.DeletedData, [o,j]); }.bind(this));
		this._request.addEvent(CIEvent.PutData, function(o,j) { this.fireEvent(CIEvent.PutData, [o,j]); }.bind(this));
	}
});var CIStyle = new Class({
	Extends: CIObject,
	
	initialize: function(style) {
		this.parent();
		this.isA('CIStyle');
		this.synthesize(['style']);
		this.style = $H(style);
	},
	
	get: function(key) { return this.style.get(key); },
	
	override: function(newStyleObject) {
		var newStyle = new CIStyle();
		// Make a shallow copy of the base styles
		this.style.each(function(value, style) {
			newStyle.style.set(style, value);
		});
		newStyle.style.extend(newStyleObject);
		
		return newStyle;
	},
	
	applyBordersOntoElement: function(borderStyle, element) {
		element.setStyle('border-width', this.get('borderSize') || 0);
		element.setStyle('border-color', this.get('borderColor') || CIStyle.BorderColor);
		this.interpolateBorderStyleMaskOntoElement(borderStyle, element);
	},
	
	interpolateBorderStyleMaskOntoElement: function(borderStyle, element) {
		var mask = this.get(borderStyle+'Borders');
		['Top', 'Left', 'Right', 'Bottom'].each(function(side) {
			if ((mask & CIStyle[side]) != 0) element.setStyle('border-'+side.toLowerCase()+'-style', borderStyle);
		});
	},
	
	strokeElementSide: function(style, element, side) {
		var sideName = CIStyle.SideNames[side];
		var styles = {};
		// We still check against the mask because otherwise it would always override overridden styles
		if ((this.get(style+'Borders') & side) != 0) {
			styles['border-' + sideName + '-style'] = style;
			styles['border-' + sideName + '-width'] = this.getInt('borderSize');
			styles['border-' + sideName + '-color'] = this.get('borderColor');
			element.setStyles(styles);
		}
	},
	
	roundElementCorner: function(element, corner) {
		var radius = this.getInt('roundedCornerRadius').toString() + 'px';
		var cornerName = CIStyle.CornerNames[corner];
		if ((this.get('roundedCorners') & corner) != 0) {
			element.style['-webkit-border-' + cornerName + '-radius'] = radius;
			element.setStyle('-moz-border-radius-' + cornerName.replace('-',''), radius);
			element.style['border-' + cornerName.toLowerCase() + '-radius', radius];
		}
	},
	
	interpolateRoundedCornerMaskOntoElement: function(element) {
		var mask = this.get('roundedCorners');
		var radius = this.getInt('roundedCornerRadius').toString() + 'px';
		['Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'].each(function(corner) {
			if ((mask & CIStyle[corner.replace('-', '')]) != 0) {
				element.style['-webkit-border-'+corner.toLowerCase()+'-radius'] = radius;
				element.setStyle('-moz-border-radius-'+corner.toLowerCase().replace('-',''), radius);
				element.style['border-'+corner.toLowerCase()+'-radius', radius];
			}
		});
	},
	
	getInt: function(key) {
		var value = this.get(key);
		return value ? value.toInt() : 0;
	}
});

/*
	Class: CISelectionStyle
	CISelectionStyle is a class of static functions that sets the background images of components, usually cells.
*/
// TODO Move into CIStyle
var CISelectionStyle = {
	determineBackgroundHeight: function(element) {
		var elemHeight = element.getSize().y;
		if (elemHeight > 19 && elemHeight <= 22)
			return 22;
		else if (elemHeight > 22 && elemHeight <= 25)
			return 25;
		else if (elemHeight > 25 && elemHeight <= 35)
			return 35;
		else
			return 150;
	},
	stashAndAddClasses: function(element, cssClass, auxClass) {
		auxClass = auxClass || cssClass.split('Skin')[0];
		element.addClass(auxClass);
		element.store('CISelectionStyleCssClass', cssClass);
		element.addClass(cssClass);
	},
	unstashAndRemoveClasses: function(element, auxClass) {
		element.removeClass(auxClass);
		element.removeClass(element.retrieve('CISelectionStyleCssClass'));
	},
	
	/*
		Function: select(element, options)
		Apply the CISelectedSkin style to the element. Remembers the element's style
		
		Parameters:
			element - Element. The element to which to apply the styles
			options - Hash. Specify inverse: true to apply the inversed style. Default {}
	*/
	select: function(element, options) {
		if (!element) throw new Error('CISelectionStyle could not select non-existent element');
		options = options || {};
		var bgHeight = CISelectionStyle.determineBackgroundHeight(element);
		
		if (options.inverse) { bgHeight += '_inverse'; }
		
		var selectedClass = 'CISelectedSkin_' + bgHeight;
		element.addClass('CISelected');
		element.store('CISelectionStyle_selectedClass', selectedClass);
		element.addClass(selectedClass);
	},
	
	/*
		Function: unselect(element)
		Remove the CISelectedSkin styles from the element
		
		Parameters:
			element - Element. The element from which to remove the styles
	*/
	unselect: function(element) {
		if (!element) if (!element) throw new Error('CISelectionStyle could not unselect non-existent element');
		element.removeClass('CISelected');
		element.removeClass(element.retrieve('CISelectionStyle_selectedClass'));
	},
	
	/*
		Function: set(element, style)
		Apply the specified style to the element
		
		Parameters:
			element - Element. The element to which to apply the styles
			style - String. The name of the style to apply. So far, only 'selected' and 'editing' are supported
	*/
	set: function(element, style) {
		var auxClass = 'CI' + style.capitalize().camelCase();
		var bgHeight = CISelectionStyle.determineBackgroundHeight(element);
		CISelectionStyle.stashAndAddClasses(element, auxClass + 'Skin_' + bgHeight, auxClass);
	},
	
	/*
		Function: unset(element, style)
		Remove the specified style from the element
		
		Parameters:
			element - Element. The element from which to remove the styles
			style - String. The name of the style to remove. So far, only 'selected' and 'editing' are support
	*/
	unset: function(element, style) {
		var auxClass = 'CI' + style.capitalize().camelCase();
		CISelectionStyle.unstashAndRemoveClasses(element, auxClass);
	}
};

CIStyle.BorderColor = '#CCCCCC';
CIStyle.TextColor	= '#333333';
CIStyle.BackgroundColor = '#F9F9F9';
CIStyle.OddColor = '#F0F0F0';
CIStyle.SourceBackgroundColor = '#EBEFFC';
CIStyle.DividerColor = '#B0B7D4';

CIStyle.NoCorners = 0;
CIStyle.TopLeft = 1;
CIStyle.TopRight = CIStyle.TopLeft << 1;
CIStyle.BottomLeft = CIStyle.TopRight << 1;
CIStyle.BottomRight = CIStyle.BottomLeft << 1;
CIStyle.AllCorners = CIStyle.TopRight | CIStyle.BottomRight | CIStyle.BottomLeft | CIStyle.TopLeft;
CIStyle.CornerNames = ['none', 'top-left', 'top-right', 'none', 'bottom-left', 'none', 'none', 'none', 'bottom-right'];

CIStyle.NoSides = 0;
CIStyle.Top = 1;
CIStyle.Left = CIStyle.Top << 1;
CIStyle.Right = CIStyle.Left << 1;
CIStyle.Bottom = CIStyle.Right << 1;
CIStyle.AllSides = CIStyle.Top | CIStyle.Right | CIStyle.Bottom | CIStyle.Left;
CIStyle.SideNames = ['none', 'top', 'left', 'none', 'right', 'none', 'none', 'none', 'bottom'];

CIStyle.NoImage = null;

CIStyle.HiddenStyle = new CIStyle({ hidden: true });var CIResizeBehavior = new Class({
	Extends: CIObject,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIResizeBehavior');
		this.synthesize(['action', 'target'], configuration);
		//this.target = this._lambdaCreator(this.target);
		this.synthesize({
			additions: [],
			subtractions: [],
			willReceiveView: false
		}, configuration);
		this.additions = $splat(this.additions).map(this._lambdaCreator);
		this.subtractions = $splat(this.subtractions).map(this._lambdaCreator);
	},
	
	_lambdaCreator: function(y) {
		if ($type(y) != 'function')
			return $lambda(y);
		else
			return y; // Can't use $lambda on functions because it breaks the this reference, even if you re-bind it
	},
	
	targetValue: function() {
		if (this.target == null) return null;
		if ($type(this.target[this.action]) == 'function')
			return this.target[this.action]();
		else
			return this.target[this.action];
	},
	plus: function(x) { this.additions.push(this._lambdaCreator(x)); return this; },
	minus: function(x) { this.subtractions.push(this._lambdaCreator(x)); return this; },
	
	toInteger: function(view) {
		if (this.willReceiveView && view) this.target = view;
		var x = this.targetValue();
		if (x == null) return null;
		
		this.additions.each(function(addition) { x += addition().toInt(); });
		this.subtractions.each(function(subtraction) { x -= subtraction().toInt(); });
		return x;
	}
});var CIView = new Class({
	Extends: CIObject,
	
	initialize: function(configuration) {
		configuration = configuration || {}
		this.parent(configuration);
		this.isA('CIView');
		this.synthesize({
			frame: new CIRect(),
			subviews: [],
			scrolls: false,
			style: CIView.Style,
			resizable: false
		}, configuration);
		this.frame.framedView = this;
		this.setResizable(this.resizable);
		this.frame = new CIRect(configuration.frame);
		this.subviews = $splat(configuration.subviews);
		this.cssClass = configuration.cssClass || '';
		this.cssStyles = CIObject.interpretStyles(configuration.cssStyles);
		this.style = configuration.style;
	},
	
	setResizable: function(isResizable) {
		// this._windowResized is not defined at construction
		if (!this._boundWindowResizedFunction) this._boundWindowResizedFunction = this._windowResized.bind(this)
		this.set('resizable', isResizable);
		// We manage the event for performance
		if (this.resizable) {
			window.addEvent('resize', this._boundWindowResizedFunction);
		} else {
			window.removeEvent('resize', this._boundWindowResizedFunction);
		}
	},
	
	_windowResized: function(event) {
		this.fireEvent(CIEvent.Resized, [event]);
		this._viewResized();
	},
	
	_viewResized: function(superview) {
		if (!this.element()) return;
		var newSize = this.frame.toCssStylesObject({}, superview);
		//console.log(this.id, 'has been told to resize to width of', newSize.width);
		
		this.element().setStyles(newSize);
		// subviews can be any subclass of Enumerable. Loop needs to be optimized
		if (this.subviews != null) this.subviews.each(function(view) { view._viewResized(this); }.bind(this));
	},
	
	/* 
		Function: show(display)
		Show the CIObject's element using the specified mode. If no node is provided and it cannot find the stored mode, uses 'block'.
		
		Parameters:
			display - String. The CSS display mode to use
		
		Returns:
			This CIObject
	*/
	show: function(display) {
		var elem = $(this.id);
		if (elem) {
			if (display == null) display = elem.retrieve('showHideDisplay');
			elem.setStyle('display', display || 'block');
		}
		return this;
	},
	
	/* 
		Function: hide()
		Hide the CIObject. Remembers the object's element's display mode
		
		Returns:
			This CIObject
	*/
	hide: function() {
		var elem = $(this.id);
		if (elem) {
			elem.store('showHideDisplay', elem.getStyle('display'));
			elem.setStyle('display', 'none');
		}
		return this;
	},
	
	/* 
		Function: toggle()
		Toggle the display of the CIObject's element using <CIObject.show> and <CIObject.hide>
		
		Returns:
			This CIObject
	*/
	toggle: function() {
		var elem = $(this.id);
		if (elem && (elem.getStyle('display') == 'none'))
			return this.show();
		else if (elem)
			return this.hide();
	},
	
	_makeElement: function(parent) {
		styles = this.frame.toCssStylesObject();
		styles.position = 'relative';
		
		var view = new Element('div', {
			id: this.id,
			'class': 'CIView',
			'styles': styles
		});
		parent.adopt(view);
		
		this.applyStyle();
		this.render();
		return view;
	},
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style || CIView.Style;
		var view = this.element();
		if (!view) return;
		
		view.setStyles({
			'background-color': style.get('backgroundColor')
		});
		style.applyBordersOntoElement('solid', view);
		style.interpolateBorderStyleMaskOntoElement('dotted', view);
		style.interpolateRoundedCornerMaskOntoElement(view);
	},
	
	unrender: function(oldViews) {
		if (!this.element()) return null;
		/*if (oldViews && oldViews.length > 0) {
			oldViews.each(function(view) {
				if (view.element()) view.element.destroy();
			});
		} else {*/
			this.element().empty();
		//}
		this.fireEvent(CIEvent.Unrendered);
		return this;
	},
	
	render: function(newViews) {
		if (!this.element()) return null;
		this.subviews.each(function(view) {
			view.superview = this;
			view.element(this.element());
		}.bind(this));
		this._viewResized();
		this.fireEvent(CIEvent.Rendered);
	},
	
	getWidth: function() { return this.frame.getWidth(); },
	getHeight: function() { return this.frame.height == null ? this.element().getHeight() : this.frame.getHeight(); }
});
CIView.Style = new CIStyle({});

/*
	Class: CIElement
	A wrapper around Mootools' Element that provides _makeElement for use within CIP. Has exact
	same constructor as Element.
	
	Properties:
		tag - String. The HTML tag
		id - String like CIElement_#
		config - Hash. The HTML configuration
*/
var CIElement = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize
		
		Parameters:
			tag - String. The HTML tag
			config - Hash. The HTML configuration passed to Element
	*/
	initialize: function(tag, config) {
		this.parent(config);
		this.isA('CIElement');
		this.tag = tag;
		this.config = $extend({ id: this.id }, config || {});
	},
	
	/*
		Function: _makeElement(parent)
		Parent adopts the Element
	*/
	_makeElement: function(parent) {
		var elem = $H(this.config).getLength() > 0 ? new Element(this.tag, this.config) : new Element(this.tag);
		parent.adopt(elem);
		return elem;
	}
});
// Do a check for html here because if the html property is defined,
// the resulting HTML will be <tag></tag> instead of just <tag/> which
// will create DOM errors for elements like <br/> which cannot have even
// null children/innerHTML
CIElement.make = function(tag, html) { return new CIElement(tag, html ? { html: html } : {}); };

/*
	Function: $E(tag, html)
	Create a CIElement of tag containing html
	
	Parameters:
		tag - String HTML tag
		html - String that will become the innerHTML
		
	Example:
	$E('span', 'Hello, World!') 	=> <span>Hello World!</span>
	$E('br') 						=> <br/>
	
	Returns:
		CIElement
*/
function $E(tag, html) { return CIElement.make(tag, html); }/*
	Class: CIButton
	The button component of CIP. Implements CIRequestable. By default, makes a get request
	when clicked. If post is provided, will make a post request. 
	
	Properties:
		id - String like CILink_#
		
		*See configuration for others*
	
	Events:
		- Clicked
		- GotData
		- PostedData
		- RequestFailed
*/
var CIButton = new Class({
	Extends: CIView,
	Implements: CIRequestable,

	/*
		Constructor: initialize(configuration)
		
		Configuration:
			label - String. The text to display inside the button
			icon - String. The URL to an icon to display to the left of the label
			get - String or Hash. See <CIRequestable>
			post - String or Hash. See <CIRequestable>
			disabled - Boolean. Whether the button is clickable. Default false
			doNotRequestOnClick - Boolean. Whether the button will send get/post requests. Default false
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIButton');
		this._makeRequestable(options);
		this.style = options.style || CIButton.Style;
		this.label = options.label || '';
		this.iconSrc = options.iconSrc;
		this.disabled = options.disabled;
		this.doNotRequestOnClick = options.doNotRequestOnClick;
		return this;
	},
	
	_onClick: function(event) {
		if (this.disabled) return;
		
		this.fireEvent(CIEvent.Clicked, [event]);
		if (this.doNotRequestOnClick) {
			event.stop();
			return false;
		} else {
			this.requestData();
		}
	},
	
	/*
		Function: requestData()
		Fire the get or post request. Defaults to get unless a post is found.
		Fires GotData, PostedData, or RequestFailed
	*/
	requestData: function(moreParams) {
		if (this._request.canGet)
			this._request.get(moreParams);
		else if (this._request.canPost)
			this._request.post(moreParams);
		return this;
	},
	
	getData: function(moreParams) {
		if (this._request.canGet) this._request.get(moreParams);
		return this;
	},
	
	postData: function(moreParams) {
		if (this._request.canPost) this._request.post(moreParams);
		return this;
	},
	
	/*  Function: _makeElement(parent)
		Parent adopts Element */
	_makeElement: function(parent) {
		var button = this;
		
		var elem = new Element('div', {
			id: this.id,
			'class': 'CIButton ' + (this.disabled ? 'CIDisabledButton' : '') + ' ' + this.cssClass,
			styles: this.cssStyles
		});
		parent.adopt(elem);
		elem.adopt(new Element('div', {
			'class': 'CIButtonLeftCap'
		})).adopt(new Element('div', {
			'class': 'CIButtonMiddle HasText',
			html: this.label
		})).adopt(new Element('div', {
			'class': 'CIButtonRightCap'
		}));
		
		if (this.iconSrc) {
			new Element('div', {
				'class': 'CIButtonMiddle',
				html: '<img src="' + this.iconSrc + '" alt="' + this.label + '" title="' + this.label + '"/>'
			}).inject(elem.getFirst(), 'after');
		}
		
		elem.addEvent('mousedown', function() {
			if (!button.disabled && this.style.get('capsImage') && this.style.get('middleActiveImage')) {
				var style = this.style;
				var height = (style.get('height') || 18).toInt();
				var capWidth = (style.get('capWidth') || 10).toInt();
				this.leftCapElement().setStyle('background-position', '0 ' + (height * -1) + 'px');
				this.rightCapElement().setStyle('background-position', (capWidth * -1).toString() + 'px ' + (height * -1) + 'px');
				this.middleElements().each(function(e) {
					e.setStyle('background-image', 'url(' + style.get('middleActiveImage') + ')');
				});
			}
		}.bind(this));
		elem.addEvent('mouseup', function() {
			if (!button.disabled) {
				var style = this.style;
				var height = (style.get('height') || 18).toInt();
				var capWidth = (style.get('capWidth') || 10).toInt();
				this.leftCapElement().setStyle('background-position', '0 0');
				this.rightCapElement().setStyle('background-position', (capWidth * -1).toString() + 'px 0');
				this.middleElements().each(function(e) {
					e.setStyle('background-image', 'url(' + style.get('middleImage') + ')');
				});
			}
		}.bind(this));
		elem.addEvent('click', this._onClick.bind(this));
		
		this._applyStyles();
		return elem;
	},
	leftCapElement: function() {
		return this.element() ? this.element().getChildren('.CIButtonLeftCap')[0] : null;
	},
	rightCapElement: function() {
		return this.element() ? this.element().getChildren('.CIButtonRightCap')[0] : null;
	},
	middleElements: function() {
		return this.element() ? this.element().getChildren('.CIButtonMiddle') : null;
	},
	_applyStyles: function(newStyle) {
		var style = newStyle || this.style;
		var elem = this.element();
		var height = (style.get('height') || 18).toInt(), capWidth = (style.get('capWidth') || 10).toInt();
		if (!elem) return;
		
		elem.setStyles({
			height: style.get('height') || height,
			color: style.get('textColor') || CIStyle.TextColor
		});
		this.leftCapElement().setStyles({
			height: style.get('height') || height,
			width: style.get('capWidth') || capWidth
		});
		elem.getChildren('.CIButtonMiddle').each(function(e) { e.setStyle('height', height); });
		this.rightCapElement().setStyles({
			height: style.get('height') || height,
			width: style.get('capWidth') || capWidth
		});
		if (style.get('capsImage')) {
			this.leftCapElement().setStyles({
				'background-image': 'url(' + style.get('capsImage') + ')',
				'background-position': '0 0'
			});
			this.rightCapElement().setStyles({
				'background-image': 'url(' + style.get('capsImage') + ')',
				'background-position': (capWidth * -1).toString() + 'px 0'
			});
		}
		if (style.get('middleImage')) {
			this.middleElements().each(function(e) {
				e.setStyles({
					'background-image': 'url(' + style.get('middleImage') + ')',
					'background-repeat': 'repeat-x'
				});
			});
		}
	},
	
	/*
		Function: setLabel(newLabel)
		Set the text label
		
		Paramters:
			newLabel - String. The new label
		
		Returns:
			This CILink
	*/
	setLabel: function(newLabel) {
		this.set('label', newLabel);
		if (this.element()) this.element().getChildren('.HasText').set('html', this.label);
		return this;
	},
	
	/*
		Function: enable()
		Enables the CILink to clicking
		
		Returns:
			This CILink
	*/
	enable: function(newLabel) {
		this.setDisabled(false);
		if (newLabel) this.setLabel(newLabel);
		return this;
	},
	
	/*
		Function: disable()
		Disables the CILink to clicking
		
		Returns:
			This CILink
	*/
	disable: function(newLabel) {
		this.setDisabled(true);
		if (newLabel) this.setLabel(newLabel);
		return this;
	},
	
	setDisabled: function(isDisabled) {
		this.set('disabled', isDisabled);
		if (this.disabled)
			this.element().addClass('CIDisabledButton');
		else
			this.element().removeClass('CIDisabledButton');
		return this;
	}
});
var CILink = CIButton;

/*
	Class: CIImageLink
	Represents a clickable image. *Incomplete implementation*
*/
var CIImageButton = new Class({
	Extends: CIButton,
	
	initialize: function(options) {
		this.parent(options);
		this.isA('CIImageButton');
		this.setSrc(options.src);
		this.alt = options.alt;
	},
	setSrc: function(newSrc) {
		this.set('src', newSrc);
		if (this.imageElement()) this.imageElement().src = this.src;
	},
	imageElement: function() { return this.element(); },
	_makeElement: function(parent) {
		var img = new Element('img', {
			id: this.id,
			src: this.src,
			alt: this.alt,
			title: this.alt,
			styles: this.cssStyles,
			'class': 'CIImageButton ' + this.cssClass
		});
		img.addEvent('click', this._onClick.bind(this));
		
		parent.adopt(img);
		return img;
	}
});
var CIImageLink = CIImageButton;/*
	Class: CISourceList
	Represents a 1-column list of items. Commonly used to select source. Implements CIRequestable only for get.
	
	Properties:
		id - String like CISourceList_#
		collection - Array. The collection of objects in the CISourceList. Set on each get, but can be set in config
		selected - Object. The currently selected object
		selectedElement - Element. The Element representing the currently selected object in the CISourceList
		
		*See configuration for others*
	
	Events:
		- CIClicked
		- CISelected
*/
// TODO create a CICell class for CISourceList, CITable, CIMenu and CIAutocomplete
var CISourceList = new Class({
	Extends: CIView,
	Implements: CIRequestable,
	
	/*
		Constructor: initialize(options)
		
		Configuration:
			get - String or Hash. See <CIRequestable>
			title - String. The title for the CISourceList. Displayed above the toolbar
			toolbar - Hash. The configuration for the toolbar to appear below the title and above the list. Default {}
			labelProperty - String. The property on the received objects to display. Default 'label'
			collection - Array. The collection of objects in the CISourceList. Default []
			identifyBy - String. The property by which to _uniquely_ identify each object in the collection. Default 'id'
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CISourceList');
		
		this._makeRequestable(options, 'get');
		this._request.addEvent(CIEvent.GotData, this._onGotData.bind(this));
		this.synthesize({
			noun: null,
			selected: null,
			selectedIndex: null,
			selectedElement: null,
			renderer: null,
			labelProperty: 'label',
			identifyBy: 'id',
			title: 'title',
			style: CISourceList.Style
		}, options);
		
		this.toolbar = new CIToolbar(options.toolbar);
		this.collection = $splat(options.collection);
		this.collectionLength = this.collection.length;
		
		this.addEvent(CIEvent.AddedToDom, this.render);
	},
	
	_makeElement: function(parent) {
		var sourceList = new Element('div', {
			id: this.id,
			'class': 'CISourceList ' + this.cssClass,
			styles: this.frame.toCssStylesObject()
		});
		parent.adopt(sourceList);
		
		var titleContainer = new Element('div', {
			id: this.id + '_CISourceListTitleContainer',
			'class': 'CISourceListTitleContainer'
		});
		sourceList.adopt(titleContainer);
		
		this._title = $type(this.title) == 'string' ? new CITitle({ title: this.title }) : this.title;
		this._title.element(titleContainer);
		this._request.bindToIndicator(this._title.indicator);
		
		this.toolbar.element(titleContainer);
		
		sourceList.adopt(new Element('div', {
			id: this.id + '_CISourceListCellContainer',
			'class': 'CISourceListCellContainer'
		}));
		
		this.applyStyle();
		return sourceList;
	},
	
	cellContainerElement: function() { return $(this.id + '_CISourceListCellContainer'); },
	titleContainerElement: function() { return $(this.id + '_CISourceListTitleContainer'); },
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style;
		var container = this.cellContainerElement();
		style.applyBordersOntoElement('solid', container);
	},
	
	removeCells: function() {
		var elems = this.element().getElements('.CISourceListCell');
		for (var i = 0; i < elems.length; i++) elems[i].destroy();
		return this;
	},
	
	setCollection: function(newCollection) {
		this.set('collection', $splat(newCollection));
		this.set('collectionLength', this.collection.length)
	},
	
	_onCellClick: function(event) {
		this.fireEvent(CIEvent.Clicked, [event]);
		var element = event.target.getParent('.CISourceListCell') || event.target;
		if (this.selectedElement) CISelectionStyle.unselect(this.selectedElement);
		this._selectElement(element);
	},
	
	_selectElement: function(element) {
		this.deselect();
		this.set('selectedElement', element);
		this.set('selectedIndex', element.retrieve('CISourceListIndex'));
		this.set('selected', this.collection[this.selectedIndex]);
		
		CISelectionStyle.select(this.selectedElement);
		this.fireEvent(CIEvent.Selected, [this.selected]);
		this.fireEvent(CIEvent.Changed);
	},
	
	_viewResized: function(superview) {
		if (!this.element()) return;
		
		var newSize = this.frame.toCssStylesObject({}, superview);
		this.element().setStyles(newSize);
		this.cellContainerElement().setStyles({
			overflow: 'auto',
			height: newSize.height - this.titleContainerElement().getSize().y
		});
	},
	
	render: function() {
		var container = this.cellContainerElement();
		this.removeCells();
		
		if (this.collection.length == 0) {
			var cell = new Element('div', {
				'class': 'CISourceListEmptyListCell CISourceListCell',
				html: 'No Data'
			});
			container.adopt(cell);
			return this;
		}
		
		for (var counter = 0; counter < this.collection.length; counter++) {
			var item = this.collection[counter];
			var backgroundColor = counter % 2 == 0 ? this.style.get('evenBackgroundColor') : this.style.get('oddBackgroundColor')
			var cell = new Element('div', {
				styles: { 'background-color': backgroundColor },
				'class': 'CISourceListCell'
			});
			cell.store('CISourceListIndex', counter);
			cell.addEvent('click', this._onCellClick.bind(this));
			container.adopt(cell);
			
			var value = $type(item) == 'string' ? item : item[this.labelProperty];
			if (this.renderer) {
				var view = this.renderer(value, item, this);
				view.element(cell);
			} else {
				cell.set('html', value);
			}
			if (this.selected && (this.selected[this.identifyBy] === item[this.identifyBy]))
				this._selectElement(cell);
		}
		this._viewResized(this.superview);
		this.fireEvent(CIEvent.Rendered);
		return this;
	},
	
	_onGotData: function(collection, json) {
		this.setCollection(collection);
		this.render();
	},
	
	reload: function(moreParams) {
		this._request.get();
	},
	
	getData: function(moreParams) { this.reload(moreParams); },
	
	deselect: function() {
		if (this.selectedElement) CISelectionStyle.unselect(this.selectedElement);
		this.selectedElement = null;
		this.selectedIndex = null;
		this.selected = null;
		this.fireEvent(CIEvent.Deselected);
	},
	
	hasObjectWithValue: function(value) {
		for (var i = 0; i < this.collection.length; i++)
			if (this.collection[i][this.identifyBy] == value) return true
			
		return false;
	},
	
	selectByProperty: function(value) {
		for (var i = 0; i < this.collection.length; i++) {
			if (this.collection[i][this.identifyBy] == value) {
				this._selectElement(this.element().getElements('.CISourceListCell')[i]);
				break;
			}
		}
		return this;
	},
	
	selectByIndex: function(index) {
		var elems = this.element().getElements('.CISourceListCell');
		if (elems[index]) this._selectElement(elems[index]);
		return this;
	}
});

CISourceList.Style = new CIStyle({
	evenBackgroundColor: '#FFFFFF',
	oddBackgroundColor: CIStyle.OddColor,
	solidBorders: CIStyle.Left | CIStyle.Right | CIStyle.Bottom,
	borderColor: CIStyle.BorderColor,
	borderSize: 1
});/*
	Class: CIFormField
	Represents a form field. Usually used inside a CIForm, but works just as well alone. It can show a label, padding or spacing, and text before, after and below the field.
	
	Properties:
		id - String like CIFormField_#
		options - The options for type select.
		field - The HTML <input>, <textarea>, or <select> Element
		
		*See configuration for others*
	
	Events:
		- Changed
		- EnterPressed
		- EscapePressed
*/
// TODO Better coverage of Changed
// TODO fire Clicked and GotFocus and LostFocus
var CIFormField = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			name - String. The HTTP parameter name to be sent for this field. Default property
			size - Number. The number of characters to show. Only affects types text and password. Default unknown
			property - String. The property on the source object corresponding to this field. Each field must represent a different property.
			type - String. The type of field. Possible values are 'text', 'file', 'password', 'textarea', 'select', 'label', 'checkbox'. Default 'text'
			label - String. The label to display to the left of the field
			value - Mixed. The value to which to set the field
			values - Hash. The values for type checkbox. Default { checked: 'true', unchecked: 'false' }
			form - CIForm. The parent form
			note - String. The text to display underneath the field
			noteBeforeField - String. The text to display to the left of the field, to the right of the label
			noteAfterField - String. The text to display to the right of the field
			options - Hash or Function. The options for type select. Pass a Function to dynamically change the options. Default {}. Specified like: { labelHTML: value }
			rows - Number. The rows attribute for type textarea
			cols - Number. The cols attribute for type textarea
			labelStyles - Hash. The CSS styles to apply to the label. If this CIFormField is a child of a CIForm, the CIForm's labelStyles override. Interpreted by <CIObject.interpretStyles>
			padding - Number. The padding inside each cell. Default 0
			spacing - Number. The spacing inside each cell. Default 5
			autocomplete - CIAutocomplete. The configuration, or CIAutocomplete to use on this text field
	*/
	// TODO implement title type
	initialize: function(options) {
		this.parent(options);
		this.isA('CIFormField');
		
		this.synthesize([
			'name', 'size', 'property', 'label', 'value', 'form', 'note', 'noteBeforeField',
			'noteAfterField', 'field', 'rows', 'cols', 'autocomplete', 'renderer', 'labelStyles',
			'placeholderText'
			], options
		);
		this.synthesize({
			type: 'text',
			values: { checked: 'true', unchecked: 'false' },
			'options': {},
			padding: 0,
			spacing: 5
		}, options);
		this.labelStyles = CIObject.interpretStyles(options.labelStyles);
	},
	/*
		Function: giveFocus()
		Place cursor focus inside this field's field
		
		Returns:
			This CIFormField
	*/
	giveFocus: function() { if (this.field && (this.type != 'custom')) this.field.focus(); return this; },
	
	/*
		Function: setValue(newValue)
		Set the value of this CIFormField, depending on type. Fires <CIEvent.Changed>
		
		Parameters:
			newValue - Mixed. The new value
		
		Returns:
			This CIFormField
	*/
	setValue: function(newValue, object) {
		if (this.type == 'custom') {
			this.field.empty();
			var result = this.renderer(newValue, object);
			if ($type(result) == 'string') result = new CIText(result);
			result.element(this.field);
			return this;
		}
		var htmlValue = this.type == 'label' ? 'html' : 'value';
		var oldValue = this.field.get(htmlValue); // Hopefully this returns a clone
		if (this.type == 'checkbox') {
			this.field.checked = (newValue || '').toString() == this.values.checked;
		} else {
			this.field.set(htmlValue, newValue);
		}
		this.fireEvent(CIEvent.Changed, [newValue, oldValue]);
		return this;
	},
	
	/*
		Function: getValue()
		Retrieves the value of this CIFormField, depending on type.
		
		Returns:
			Mixed, usually String
	*/
	getValue: function() {
		if (this.type == 'checkbox') {
			if (this.field.checked)
				return this.values['checked'];
			else
				return this.values['unchecked'];
		} else if (this.type == 'label') {
			return this.field.get('html');
		} else if (this.type == 'custom') {
			return null;
		} else {
			return this.field.get('value');
		}
	},
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	// TODO return <tr> if parent is <table>, otherwise return <div>
	_makeElement: function(parent) {
		this.field = this._makeField();
		
		var tr = new Element('tr', { id: this.id });
		var labelTd = new Element('td', {
			'class': 'CIFormLabel',
			html: this.label || '&nbsp;',
			styles: this.form ? $extend(this.form.labelStyles, this.labelStyles) : this.labelStyles,
			valign: this.note || this.type == 'textarea' ? 'top' : ''
		});
		var fieldTd = new Element('td');
		
		// Add the note before the field element in the field TD
		if (this.noteBeforeField) {
			fieldTd.adopt(new Element('span', {
				'class': 'CIFormFieldNote',
				html: this.noteBeforeField + '&nbsp;'
			}));
		}
		// Add the field
		fieldTd.adopt(this.field);
		if (this.type == 'custom') {
			var result = this.renderer(this.form ? this.form.object : null);
			if ($type(result) == 'string') result = new CIText(result);
			result.element(this.field);
		}
		
		// Add the note after the field
		if (this.noteAfterField) {
			fieldTd.adopt(new Element('span', {
				'class': 'CIFormFieldNote',
				html: '&nbsp;' + this.noteAfterField
			}));
		}
		// Add the note after a line break
		if (this.note) {
			labelTd.setStyle('padding-top', 8);
			fieldTd.adopt(new Element('br')).adopt(new Element('span', {
				'class': 'CIFormFieldNote',
				html: this.note
			}));
		}
		// Adopt both <td>s into the <tr>, then the <tr> into the parent
		tr.adopt(labelTd).adopt(fieldTd);
		if (parent.get('tag') == 'table')
			parent.adopt(tr);
		else {
			var table = new Element('table', {
				cellpadding: this.padding,
				cellspacing: this.spacing,
				styles: { border: 'none' }
			});
			parent.adopt(table.adopt(tr));
		}
		
		return tr;
	},
	
	_makeField: function() {
		var field = null;
		
		switch (this.type) {
		case 'custom':
			field = new Element('div');
		break;
		
		case 'text':
			field = new Element('input', {
				type: 'text',
				'class': 'CIFormField',
				name: this.name,
				size: this.size,
				value: this.value || this.placeholderText
			});
			// Text field specific events:
			field.addEvent('keypress', function(event) {
				//this.fireEvent(CIEvent.KeyPressed, [event]);
				this.fireEvent(CIEvent.Changed);
				if (event.key == 'enter') {
					this.fireEvent(CIEvent.EnterPressed, [event]);
				} else if (event.key == 'esc') {
					this.fireEvent(CIEvent.EscapePressed, [event]);
				}
			}.bind(this));
			if (this.autocomplete) {
				this.autocomplete = this.autocomplete.isCIObject ? this.autocomplete : new CIAutocomplete(this.autocomplete);
				this.autocomplete.bindTo(this);
			}
		break;
		
		case 'textarea':
			field = new Element('textarea', {
				'class': 'CIFormField',
				name: this.name,
				rows: this.rows,
				cols: this.cols,
				value: this.value
			});
		break;
		
		case 'file':
			field = new Element('input', {
				type: 'file',
				'class': 'CIFormField',
				name: this.name,
				size: this.size
			});
		break;

		case 'password':
			field = new Element('input', {
				type: 'password',
				'class': 'CIFormField',
				name: this.name,
				size: this.size,
				value: this.value
			});
		break;

		case 'select':
			field = new Element('select', {
				name: this.name,
				size: this.size,
				'class': 'CIFormField'
			});
			if ($type(this.options) == 'object') this.options = $lambda(this.options);
			new Hash(this.options()).each(function(value, html) {
				field.adopt(new Element('option', { value: value, html: html }));
			}.bind(this));
			field.addEvent('change', function() { this.fireEvent(CIEvent.Changed); }.bind(this));
		break;

		case 'label':
			field = new Element('span', {
				'class': 'CIFormLabelField',
				html: this.value
			});
		break;

		case 'checkbox':
			field = new Element('input', {
				type: 'checkbox',
				name: this.name,
				'class': 'CIFormField'
			});
		break;
		}; // end switch
		
		return field;
	} // end function
});/*
	Class: CIForm
	Represents a form that can make requests and set itself from those requests. Extends CIFormBase
	
	Properties:
		id - String like CIForm_#
		object - Object. The source object. Default null
		submitButton - Element. The 
		*See configuration for others*
		
	Events:
		- GotData
		- PostedData
*/
// TODO rename object to source
// TODO fire Changed
var CIForm = new Class({
	Extends: CIView,
	Implements: CIRequestable,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			submittingLabel - String. The label of the submit button while submitting data. Default 'Saving...'
			title - String. The title at the top of the form
			padding - Number. The padding inside each cell. Default 0
			spacing - Number. The spacing between each cell. Default 5
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIForm');
		this._makeRequestable(options);
		this.indicator = new CIIndicator({ cssStyles: { 'float': 'right' }});
		this._request.bindToIndicator(this.indicator);
		this.addEvent(CIEvent.GotData, function(o,j) { this.use(o); });
		this.addEvent(CIEvent.RequestedData, function() { this.submitButton.setLabel(this.submitLabel); });
		
		this.synthesize({
			object: {},
			hideSubmitButton: false,
			submitLabel: 'Save',
			submittingLabel: 'Saving...',
			title: null,
			padding: 0,
			spacing: 5,
		}, options);
		this.fields = $splat(options.fields);
		this.labelStyles = CIObject.interpretStyles(options.labelStyles || {});
		this._fieldsTable = new Hash();
	},
	
	/*
		Function: setTitle(newTitle)
		Set the first title on the form
		
		Parameters:
			newTitle - String. The new title
		
		Returns:
			This CIForm
	*/
	setTitle: function(newTitle) {
		this.set('title', newTitle);
		if (this.element()) $splat(this.element().getChildren('tr'))[0].getChildren('.CIFormTitle').set('html', this.title);
		return this;
	},
	
	/*
		Function: toObject()
		Outputs this form's fields and values as an Object. Uses <CIFormField.name> as keys. Excludes fields without name set and fields of type label
	
		Returns:
			Object
	*/
	toObject: function() {
		var params = {};
		this._fieldsTable.each(function(field, property) {
			if (property && field.name && field.type != 'label') params[field.name] = field.getValue();
		});
		return params;
	},
	
	/*
		Function: getData()
		Makes an HTTP request using its get parameters, then populates the form fields using the result
		
		Returns:
			This CIForm
	*/
	getData: function(moreParams) {
		this._request.get(moreParams);
		return this;
	},
	
	_onGotData: function(object, json) {
		this.use(object);
	},
	
	use: function(object) {
		this.setObject(object);
		this.populate();
	},
	
	/*
		Function: populate(object)
		Populate this form's fields using object and <CIFormField.setValue>.
		If object is not provided, use <CIForm.object>. The keys of object must correspond to
		each field's property, not its name
		
		Returns:
			This CIForm
	*/
	populate: function(object) {
		object = object || this.object || {};
		if (this.responseWrapsObject) object = object[this.responseWrapsObject];
		this._fieldsTable.each(function(field, property) {
			if (field.type == 'select') {
				var newElem = field._makeField();
				newElem.replaces(field.field);
				field.field = newElem;
			}
			field.setValue(object[property], object);
		});
		return this;
	},
	
	/*
		Function: clear()
		Clear all of this form's fields
		
		Returns:
			This CIForm
	*/
	clear: function() {
		this._fieldsTable.each(function(field, property) {
			switch (field.type) {
				case 'checkbox':
					field.checked = false;
					field.setValue('value', field.values.unchecked);
				break;
				
				default:
					field.setValue('');
				break;
			}
		});
		return this;
	},
	
	/*
		Function: submit()
		Submit this form's fields via the post configuration.
		Changes the submit button's label to submittingLabel, then back to submitLabel when finished. Fires <CIEvent.PostedData>
	
		Returns:
			This CIForm
	*/
	submit: function() {
		if (!this._request.canPost) return;
		if (this.submitButton) this.submitButton.setLabel(this.submittingLabel);
		this._request.post(this.toObject());
		return this;
	},
	
	/*
		Function: removeField(property)
		Remove the CIFormField relating to the specified property from the DOM and the CIForm
		
		Parameters:
			property - String. The property relating to the CIFormField
		
		Returns:
			The removed CIFormField or null if no field found
	*/
	removeField: function(property) {
		var field = this.getField(property);
		if (field) {
			field.element().destroy();
			this._fieldsTable.erase(property);
		}
		return field;
	},
	
	/*
		Function: getField(property)
		Retrieve the CIFormField relating to the specified property
		
		Parameters:
			property - String. The property relating to the CIFormField
		
		Returns:
			The CIFormField or null if no field found
	*/
	getField: function(property) {
		return this._fieldsTable.get(property);
	},
	
	/*
		Function: getValue(property)
		Retrieve the value from the CIFormField relating to the specified property
		
		Parameters:
			property - String. The property relating to the CIFormField
		
		Returns:
			The CIFormField's value or null if no field found
	*/
	getValue: function(property) {
		var field = this.getField(property);
		return field ? field.getValue() : null;
	},

	// TODO rename render()
	_adoptFieldsInto: function(parent) {
		this.fields.each(function(fieldObject) {
			/*
				This is a dirty little secret for when dynamically populating a page using Rails
				or something, and you are building a form in a loop. Consider the fields:
					fields: [...
					<% @coverage_options.each do |cvg| %>
					{ label: "<%=cvg%>", type: 'checkbox', fieldName: 'coverages[<%=cvg.id%>]' },
					<% end %>
					null]
				Without the null, you would have to figure out which item is the last one and remove the
				comma from the end of the line so the parser doesn't complain. By null-terminating the array,
				you can be saved a headache.
			*/
			if (fieldObject == null) return;
			
			fieldObject.form = this;
			var field = fieldObject.isCIObject ? fieldObject : new CIFormField(fieldObject);
			field.element(parent);
			
			// In the internal table, each key is the name of the field as it is going to be
			// received from the server. They correspond to the <input> objects they represent.
			this._fieldsTable.set(field.property || field.name, field);
		}.bind(this));

		// Append the dangling submit button
		if (!this.hideSubmitButton) {
			var labelTd = new Element('td', { html: '', styles: { 'text-align': 'right' } })
			var tr = new Element('tr');
			var td = new Element('td');
			this.submitButton = new CIButton({
				label: this.submitLabel,
				Clicked: this.submit.bind(this),
				cssClass: 'CIFormSubmitButton'
			});
			parent.adopt(tr.adopt(labelTd).adopt(td));
			this.indicator.element(labelTd);
			this.submitButton.element(td);
		}
		return parent;
	},
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	_makeElement: function(parent) {
		var table = new Element('table', {
			id: this.id,
			'class': 'CIForm',
			cellpadding: this.padding,
			cellspacing: this.spacing,
			styles: this.cssStyles
		});
		parent.adopt(table);
		if (this.title) {
			var tr = new Element('tr');
			table.adopt(tr);
			tr.adopt(new Element('td', { html: '&nbsp;' }));
			tr.adopt(new Element('td', {
				'class': 'CIFormTitle',
				html: this.title
			}))
		}
		this._adoptFieldsInto(table);
		
		return table;
	}
});/* 
	Class: CITabPanel
	Represents tabs that hide and show content. The tab labels can be toggled in response to events

	Properties:
		id - String like CITabPanel_#
		_tabs - Array. An array of tab objects. Properties are: item, element, label
		selectedTabItem - Object. The selected item
		selectedTabElement - Object. The Element containing the selected item
		
		*See configuration for others*
	
	Events:
*/
// TODO fire Clicked, Changed, Selected
// TODO create CITab to encapsulate each tab
// TODO create tabForIndex(Number)
var CITabPanel = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			selectedTab - Number. The index of the tab to select upon creation
			tabs - Hash. The hash of tab labels as keys, and content as values
			tabBodyStyles - Hash. The CSS styles to apply to the container of the tab items
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CITabPanel');
		this.synthesize({
			subviews: {},
			style: CITabPanel.Style,
			selectedIndex: null,
			selectedSubviewElement: null,
		}, options);
		this.selectedTab = options.selectedTab;
		// Hopefully this isn't a circular dependency
		this.setSubviews(this.subviews);
		
		if (options.selectTab != undefined) {
			this.addEvent(CIEvent.AddedToDom, function() {
				this.selectTab(options.selectTab);
			}.bind(this));
		}
	},
	
	setSubviews: function(tabs) {
		return this.set('subviews', new Hash(tabs));
	},
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	_makeElement: function(parent) {
		var tabPanel = new Element('div', {
			id: this.id,
			'class': 'CITabPanel',
			styles: this.frame.toCssStylesObject()
		});
		parent.adopt(tabPanel);
		var table = new Element('table', {
			id: this.id + '_TableElement',
			cellspacing: 0,
			cellpadding: 0,
			border: 0,
			'class': 'CITabPanelTableElement',
			styles: this.frame.toCssStylesObject()
		});
		tabPanel.adopt(table);
		var tabsTr = new Element('tr', { id: this.id + '_TabRowElement' });
		table.adopt(tabsTr);
		
		var bodyTr = new Element('tr', { id: this.id + '_SubviewsRowElement' });
		table.adopt(bodyTr);
		
		this.render();
		return tabPanel;
	},
	
	tableElement: function() { return $(this.id + '_TableElement'); },
	tabRowElement: function() { return $(this.id + '_TabRowElement'); },
	subviewsRowElement: function() { return $(this.id + '_SubviewsRowElement'); },
	subviewsContainerElement: function() { return $(this.id + '_SubviewsContainerElement'); },
	
	unrender: function() {
		if (!this.element()) return;
		this.tabRowElement().empty();
		this.subviewsRowElement().empty();
		this.fireEvent(CIEvent.Unrendered);
	},
	
	render: function() {
		this.unrender();
		
		var subviewsContainer = new Element('td', {
			id: this.id + '_SubviewsContainerElement',
			'class': 'CITabPanelSubviewsContainerElement',
			colspan: this.subviews.getLength(),
			valign: 'top', styles: { 'vertical-align': 'top' }
		});
		this.subviewsRowElement().adopt(subviewsContainer);
		// Render the tabs
		var width = 100.0 / this.subviews.getLength().toFloat();
		var i = 0;
		this.subviews.each(function(subview, label) {
			var styles = { width: width + '%' };
			if (i > 0) styles['border-left'] = '1px solid white';
			if (i < this.subviews.getLength() - 1) styles['border-right'] = '1px solid #AAA';
			
			var tab = new Element('td', {
				'class': 'CITabPanelTab', html: label, styles: styles
			});
			tab.store('CITabPanelTabIndex', i);
			this.tabRowElement().adopt(tab);
			tab.addEvent('click', this._tabClicked.bind(this));
			
			subview.element(subviewsContainer).hide();
			i++;
		}.bind(this));
		
		this._viewResized();
		this.applyStyle();
		this.fireEvent(CIEvent.Rendered);
	},
	
	_viewResized: function(superview) {
		if (!this.element()) return;
		this.tableElement().setStyles(this.frame.toCssStylesObject({}, superview));
		this.parent(superview);
		return this;
	},
	
	_tabClicked: function(event) {
		this.fireEvent(CIEvent.Clicked, [event]);
		var index = 0;
		if ($type(event.target) == 'number') {
			index = event.target;
		} else {
			index = (event.target.hasClass('CITabPanelTab') ? event.target : event.target.getParent('.CITabPanelTab')).retrieve('CITabPanelTabIndex');
		}
		
		if (this.selectedSubviewElement) {
			CISelectionStyle.unselect(this.selectedTabElement());
			this.selectedSubviewElement.hide();
		}
		this.setSelectedIndex(index);
		CISelectionStyle.select(this.selectedTabElement(), { inverse: true });
		this.setSelectedSubviewElement(this.subviewForIndex(index).element());
		this.selectedSubviewElement.show();
		this.fireEvent(CIEvent.Selected, [this.selectedIndex, this.selectedSubviewElement]);
	},
	
	selectedTabElement: function() { return this.tabRowElement().getChildren()[this.selectedIndex]; },
	subviewForIndex: function(index) { return this.subviews.get(this.subviews.getKeys()[index]); },
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style || CITabPanel.Style;
		var tabs = this.tabRowElement().getChildren();
		tabs.each(function(td, index) {
			if (index == 0) {
				style.strokeElementSide('solid', td, CIStyle.Top);
				style.strokeElementSide('solid', td, CIStyle.Left);
				style.strokeElementSide('solid', td, CIStyle.Bottom);
				style.roundElementCorner(td, CIStyle.TopLeft);
				style.roundElementCorner(td, CIStyle.BottomLeft);
			} else if (index == tabs.length - 1) {
				style.strokeElementSide('solid', td, CIStyle.Top);
				style.strokeElementSide('solid', td, CIStyle.Right);
				style.strokeElementSide('solid', td, CIStyle.Bottom);
				style.roundElementCorner(td, CIStyle.TopRight);
				style.roundElementCorner(td, CIStyle.BottomRight);
			} else {
				style.strokeElementSide('solid', td, CIStyle.Top);
				style.strokeElementSide('solid', td, CIStyle.Bottom);
			}
		});
	},
	
	/*
		Function: selectTab(tab)
		Select and show the specified tab
		
		Parameters:
			tab - Number or tab Object. If a Number, the index of the tab in _tabs, otherwise the tab object to choose
	
		Returns:
			This CITabPanel
	*/
	selectTab: function(index) {
		this._tabClicked({ target: index });
	}
});

CITabPanel.Style = new CIStyle({
	padding: 10,
	roundedCorners: CIStyle.AllCorners,
	solidBorders: CIStyle.AllSides,
	borderColor: CIStyle.BorderColor,
	borderSize: 1,
	roundedCornerRadius: 3
});/*
	Class: CIPanelBase
	The abstract base for CIVPanel and CIHPanel
	
	Properties:
		id - String like CIPanelBase_#. Should be overwritten by subclass
		children - Array. The content of the panel. See content configuration
		*See configuration for others*
*/
// TODO rename children to content
// TODO add cssClass to inner childrenn
var CIPanelBase = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		May be an Array of content, nothing, or a Hash
		
		Configuration:
			content - Array. The content of the panel. Each item in the array may be the CIObject to add, or a Hash with keys: cssStyles, cssClass, valign, and content, with content being the CIObject. Default []
			padding - Number. The padding inside each child. Default 0
			spacing - Number. The spacing between each child. Default 0
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIPanelBase');
		
		if ($type(options) == 'object') {
			this.children = options.children || options.content || [];
			this.padding = options.padding || 0;
			this.spacing = options.spacing || 0;
			return this;
		} else if ($type(options) == 'array')
			this.children = $splat(options);
		else
			this.children = [];
			
		this.padding = 0;
		this.spacing = 0;
	},
	_makeElement: function(parent) {
		console.error('Cannot add a CIPanelBase to the DOM; it is abstract.');
		return null;
	}
});

/*
	Class: CIHPanel
	A panel with content oriented horizontally, right to left. Extends CIPanelBase
	
	Properties:
		id - String like CIHPanel_#
		
		*See <CIPanelBase.initialize()> and configuration below for others*
*/
var CIHPanel = new Class({
	Extends: CIPanelBase,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			valign - String. The vertical alignment of the content: 'top', 'middle', or 'bottom'. Default 'top'
			
		See:
			<CIPanelBase.initialize()>
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIHPanel');
		this.valign = options ? options.valign : 'top';
	},
	
	_makeElement: function(parent) {
		var table = new Element('table', {
			id: this.id,
			'class': 'CIPanelBase CIHBox ' + this.cssClass,
			cellpadding: this.padding,
			cellspacing: this.spacing,
			styles: this.frame.toCssStylesObject()
		});
		parent.adopt(table);
		var tr = new Element('tr');
		table.adopt(tr);
		this.children.each(function(child) {
			if (child.objectId) child = { content: child };
			var td = new Element('td', {
				valign: child.valign || this.valign || 'top',
				styles: CIObject.interpretStyles(child.cssStyles)
			});
			tr.adopt(td);
			child.content.superview = this;
			child.content.element(td);
		}.bind(this));
		
		return table;
	}
});

/*
	Class: CIVPanel
	A panel with content oriented vertically, top to bottom. Extends CIPanelBase
	
	Properties:
		id - String like CIVPanel_#
		
		*See <CIPanelBase.initialize()> and configuration below for others*
*/
var CIVPanel = new Class({
	Extends: CIPanelBase,
	
	/*
		Constructor: initialize(configuration)
		
		See:
			<CIPanelBase.initialize()>
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIVPanel');
	},
	
	_makeElement: function(parent) {
		var table = new Element('table', {
			id: this.id,
			'class': 'CIPanelBase CIVBox ' + this.cssClass,
			cellpadding: this.padding,
			cellspacing: this.spacing,
			styles: this.cssStyles
		});
		parent.adopt(table);
		this.children.each(function(child) {
			if (child.objectId) child = { content: child };
			var tr = new Element('tr');
			table.adopt(tr);
			var td = new Element('td', {
				valign: child.valign || 'top',
				styles: CIObject.interpretStyles(child.cssStyles)
			});
			tr.adopt(td);
			child.content.element(td);
		});
		
		return table;
	}
});

var CIVFlow = new Class({
	Extends: CIView,
	
	initialize: function(options) {
		this.parent(options);
		this.isA('CIVFlow');
		this.synthesize({
			style: null,
			subviews: []
		}, options);
		this.subviews = $splat(this.subviews);
	},
	
	/*_viewResized: function(superview) {
		if (!this.element()) return;
		var newSize = this.frame.toCssStylesObject({}, superview);
		console.log(this.id, 'has been told to resize to height of', newSize.height);
		
		this.element().setStyles(newSize);
		// subviews can be any subclass of Enumerable. Loop needs to be optimized
		console.log(this.subviews);
		if (this.subviews != null) this.subviews.each(function(view) { view._viewResized(this); }.bind(this));
	},*/
	
	_makeElement: function(parent) {
		var table = new Element('table', {
			id: this.id,
			'class': 'CIVFlow',
			styles: this.frame.toCssStylesObject()
		});
		parent.adopt(table);

		this.render();
		return table;
	},
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style || CIVFlow.Style;
		var table = this.element();
		if (!table) return;
		table.set({
			cellpadding: style.get('padding'),
			cellspacing: style.get('spacing'),
		});
	},
	
	unrender: function() {
		if (!this.element()) return null;
		this.element().empty();
		this.fireEvent(CIEvent.Unrendered);
		return this;
	},
	
	render: function() {
		if (!this.element()) return null;
		this.unrender();
		
		var table = this.element();
		this.applyStyle();
		this.subviews.each(function(view) {
			var tr = new Element('tr');
			table.adopt(tr);
			var td = new Element('td', {
				valign: (this.style || CIVFlow.Style).get('valign')
			});
			tr.adopt(td);
			view.superview = this;
			view.element(td);
		}.bind(this));
		
		this.fireEvent(CIEvent.Rendered);
		return this;
	}
});
CIVFlow.Style = new CIStyle({
	padding: 0,
	spacing: 0,
	valign: 'top'
});/*
	Class: CICurtainPanel
	A sliding panel with a 'curtain' and a 'drawer.' The drawer slides under the curtain.
	
	Properties:
		id - String like CICurtainPanel_#
		_contentEl - Element. The drawer Element
		
		*See configuration for others*
		
	Events:
		
*/
// TODO rename to CIDrawerPanel?
// TODO support Clicked, Showing, Shown, Hiding, Hidden, Changed
// TODO refactor 'content' concept to 'drawer'
var CICurtainPanel = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		label - String. The HTML to show on the curtain. Default 'Click to reveal.'
		content - CIObject. The content of the drawer
		contentClass - String. The CSS class to apply to the drawer container
		contentStyles - Hash. The CSS styles to apply to the drawer container
		openState - String. How the curtain should start out. Accepts 'reveal' or 'conceal'. Default 'conceal'
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CICurtainPanel');
		this.label = options.label || 'Click to reveal.';
		this.content = options.content;
		this.aggressive = options.aggressive || false;
		this.contentClass = options.contentClass || '';
		this.contentStyles = CIObject.interpretStyles(options.contentStyles);
		this.openState = options.openState;
		this.addEvent(CIEvent.AddedToDom, function(element) {
			if (this.openState) this[this.openState]();
		}.bind(this));
	},
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	_makeElement: function(parent) {
		var panel = new Element('div', {
			id: this.id,
			'class': 'CICurtainPanel ' + this.cssClass,
			// panelStyles override styles set here
			styles: new Hash({
				width: this.width || 150
			}).extend(this.cssStyles).getClean()
		});
		
		parent.adopt(panel);
		// Create the curtain
		var text = new Element('p', {
			html: this.label,
			'class': 'CICurtainPanelLabel'
		});
		text.addEvent('click', function() {
			this.toggle();
		}.bind(this));
		panel.adopt(text);
		
		// Add the content, which must be a single CIObject
		this._contentEl = new Element('div', {
			'class': 'CICurtainPanelBody ' + this.contentClass,
			styles: this.contentStyles
		});
		panel.adopt(this._contentEl);
		this.content.element(this._contentEl);
		this._contentEl.set('slide', { duration: 300, transition: Fx.Transitions.Back.easeOut });
		this._contentEl.slide('hide');
		
		return panel;
	},
	
	/*
		Function: reveal()
		Reveal the drawer
		
		Returns:
			This CICurtainPanel
	*/
	reveal: function() {
		this._contentEl.slide('in');
		return this;
	},
	
	/*
		Function: conceal()
		Conceal the drawer
		
		Returns:
			This CICurtainPanel
	*/
	conceal: function() {
		this._contentEl.slide('out');
		return this;
	},
	
	/*
		Function: toggle()
		Toggle the drawer
		
		Returns:
			This CICurtainPanel
	*/
	toggle: function() {
		this._contentEl.slide('toggle');
		return this;
	},
	
	/*
		Funtion: setLabel(newLabel)
		Set the curtain's label
		
		Returns:
			This CICurtainPanel
	*/
	setLabel: function(newLabel) {
		this.label = newLabel;
		var p = this.element().getChildren('.CICurtainPanelLabel')[0];
		p.set('html', this.label);
	},
	
	/*
		Function: contentElement()
		Retrieve the drawer container element
		
		Returns:
			Element
	*/
	contentElement: function() {
		return this._contentEl;
	}
});/*
	Class: CIToolbar
	Represents a toolbar attached to another component
	
	Properties
	 	id - String like CIToolbar_#
		content - Array. The CIObjects in the toolbar
*/
var CIToolbar = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		Accepts an array of items to render inside the toolbar
	*/
	initialize: function(configuration) {
		this.parent();
		this.isA('CIToolbar');
		this.synthesize(['style', 'content']);
		if ($type(configuration) == 'array') {
			this.style = CIToolbar.Style;
			this.content = $splat(configuration);
		} else {
			this.synthesize({
				style: CIToolbar.Style,
				content: []
			}, configuration);
		}
	},
	
	/*
		Function: isEmpty()
		Returns whether this toolbar contains any items or not
		
		Returns:
			Boolean
	*/
	isEmpty: function() { return this.content.length == 0; },
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	_makeElement: function(parent) {
		var styles = {};
		if (this.isEmpty()) { styles['display'] = 'none'; };
		
		var container = new Element('div', {
			id: this.id,
			'class': 'CIToolbar ' + this.cssClass,
			styles: styles
		});
		parent.adopt(container);
		this.content.each(function(item) {
			item.element(container);
		});
		
		this._applyStyle();
		return container;
	},
	
	_applyStyle: function(style) {
		var style = style || this.style;
		var elem = this.element();
		if (!elem) return;
		elem.setStyles({
			'background-color': style.get('backgroundColor'),
			'padding': (style.get('padding') || 0).toInt()
		});
		elem.setStyle('height', (style.get('height') || 18).toInt());
		style.applyBordersOntoElement('solid', elem);
		style.applyBordersOntoElement('dotted', elem);
	},
	
	/*
		Function: addItemToLeft(item)
		Adds item as the first index to CIToolbar's content array and renders it
		
		Returns:
			This CIToolbar
	*/
	addItemToLeft: function(item) {
		this.content.unshift(item);
		item.element(this.element());
		return this;
	}
});/* Options:
	- cssStyles: (See CIObject)
	- cssClass: String
	+ get: { url: String, paramsFn: Mixed or Function } or String
	- post: { url: String, paramsFn: Mixed or Function } or String
		When called for params for submitting editor data for
			a default editor renderer, the paramsFn is called
			with the signature: function(value, record, data)
	- data: Array
	+ columns: { "Header": { property: String, }, ... }
		+ property: String
		- cssStyles: { }
		- renderer: function(propertyValue, record, taffyDB, table) => String, CIObject, or Element
			The html property of the returned data will be used for the default editor's value
		- editor: Object
			+ fieldName: String
			- renderer: Function
	- padding: Number (Default 5)
	- toolbar: { CIToolbar config (See CIToolbar) }
	- tableHeight: Mixed (Default "auto")
	- label: String
*/ 

var CIColumn = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIColumn');
		this.synthesize({
			header: '',
			property: 'id',
			width: null,
			renderer: null,
			editor: null,
			dontEncodeEntitiyChars: false,
			truncateAfter: null
		}, configuration);
	},
	
	getHeader: function() { return (this.header || '').toString(); }
});
/*
	Class: CITable
	Represents a table of information. Implements CIRequestable. It uses get to retreive the data
	for the cells, and post to send updated data back. Capable of custom renderes and editors. The editor
	is shown in a <CIHud> and the 'editing' style is applied to the cell
	
	Properties:
		id - String like CITable_#
		selected - Object. The currently selected row's object
		selectedRowElement - Element. The currently selected row's Element
		
		*See configuration for others*
		
	Events:
		- GotData
		- DragEntered
		- DragLeft
		- Clicked
		- Selected
		- Changed
*/
var CITable = new Class({
	Extends: CIView,
	Implements: CIRequestable,

	/*
		Constructor: initialize(configuration)
		
		Configuration:
			get - String or Hash. The configuration to use when requesting data to populate the table. See <CIRequestable>
			post - String or Hash. The configuration to user when requesting a change to data. *The request must respond with the newly updated record.* If using the Hash form, the params function provides the currently editing record as a parameter. See <CIRequestable>
			label - String. The title of the table
			columns - Hash. The columns that make up the table. The keys become the header labels and must be unique. Default {}
			data - Array. An array of objects representing the rows of data in the table. The objects' properties represent possible columns. See <Column Configuration>. Default []
			padding - Number. The amount of padding inside each cell. Default 5
			paginator - Hash. Configuration for the paginator to use on this table
			toolbar - Array. Items to display in this table's toolbar
			selectable - Boolean. Enable row selection. Default false
			useArray - Boolean. Whether to back the table with an Array instead of TaffyDB object. Default false
			hideHeader - Boolean. Whether to hide the header row. Default false
			acceptsDrop - Boolean. Whether this table acceptsDrops. Default false
			
		Column Configuration:
			property - String. The property on the object to use that represents the column. Need not be unique across columns
			dontEncodeEntityChars - Boolean. Whether to skip encoding HTML entity character codes when not using a renderer. Default false
			editor - Hash. The configuration for the column editor. See <Editor Configuration>
			renderer - Function. A function that returns the appropriate CIObject for the cell.
			Has a method signature of: *propertyValue, recordObject, ciTable, dataArray, tdElement, trElement*.
			If the renderer returns a string, it becomes a <span>. Otherwise, the renderer may return an Element or CIObject
			
		Editor Configuration:
			value - String or Number. The value to which to set the editor's field. Default the innerHTML of the first child in the <td>
			padding - Number. The padding between the editor field and button. Default 0
			spacing - Number. The spacing around the editor field and button. Default 0
			type - String. The type of editor. Accepts 'textarea' or 'text.' Default 'text'

			*The editor configuration is used to create a <CIFormField>. See <CIFormField.initialize> for the full configuration*
	*/
	// TODO change label to title
	// TODO use array instead of hash for columns
	// TODO create CITableColumn
	// TODO rename data collection
	initialize: function(options) {
		this.parent(options);
		this.isA('CITable');
		this._makeRequestable(options);
		
		this.synthesize({
			title: '',
			selectable: false,
			selected: null,
			hideHeader: false,
			deletePrompt: null,
			getAfterResourceChange: false,
			noDataText: 'No data to display',
			doNotSetDataAfterGet: false,
			style: CITable.Style,
			padding: 5
		}, options);
		
		this._title = null;
		this.setCollection(options.collection);
		this.columns = $splat(options.columns);
		this.paginator = options.paginator ? new CIPaginator($extend(options.paginator, {paginates: this})) : null;
		this.toolbar = new CIToolbar(options.toolbar);
		
		this.addEvent(CIEvent.PropertyChanged, function(property,newValue, oldValue) {
			if (property == 'collection') this.render();
		}.bind(this));
		if (this._request.canPut)
			this.addEvent(CIEvent.PutData, this._onPostedData);
		else
			this.addEvent(CIEvent.PostedData, this._onPostedData);
		this.addEvent(CIEvent.GotData, function(newCollection) { if (!this.doNotSetDataAfterGet) this.setCollection(newCollection); }.bind(this));
		if (this.getAfterResourceChange) {
			this.addEvent(CIEvent.DeletedData, this._onGetAfterResourceChange);
			this.addEvent(CIEvent.PostedData, this._onGetAfterResourceChange);
			this.addEvent(CIEvent.PutData, this._onGetAfterResourceChange);
		}
	},
	
	_onGetAfterResourceChange: function() { this.getData(); },
	
	/*	Function: _makeElement(parent)
		Parent adopts Element
	*/
	_makeElement: function(parent) {
		var container = new Element('div', {
			id: this.id,
			'class': 'CITableContainer ' + this.cssClass,
			styles: this.cssStyles
		});
		parent.adopt(container);

		// Make title
		this._title = $type(this.title) == 'string' ? new CITitle({ title: this.title }) : this.title;
		this._title.element(container);
		this._request.bindToIndicator(this._title.indicator);
		
		// Make CIToolbar
		this.toolbar.element(container);
		
		// Make table
		var innerHeight = 'auto';
		// If the height is explicitly set in cssStyles, do some math to figure out what the container size should be
		if ($H(this.cssStyles).some(function(value, key) { return key.contains('eight'); })) {
			innerHeight = container.getStyle('height').toInt() -
						  this._title.element().getStyle('height').toInt() -
						  this.toolbar.element().getStyle('height').toInt();
		}
		
		var innerContainer = new Element('div', {
			'class': 'CITableInnerContainer',
			id: this.id + '_innerContainer',
			styles: { height: innerHeight }
		});
		container.adopt(innerContainer);
		var table = new Element('table', {
			id: this.id + '_table',
			cellpadding: this.padding,
			cellspacing: 0,
			styles: { width: '100%' }
		});
		table.store('CITable', this);
		container.adopt(innerContainer.adopt(table));
		
		// Make Header Row
		this._makeHeader();
		this.setCollection(this.collection);
		
		this._applyStyle();
		return container;
	},
	
	_applyStyle: function(newStyle) {
		var style = newStyle || this.style;
		var container = this.element();
		if (style.get('hidden')) container.setStyle('display', 'none');
		// Size
		container.setStyle('width', style.get('width') || '100%');
		// Background Color
		container.setStyle('background-color', style.get('backgroundColor'));
		// TODO Need to hide header row here
		// Borders
		style.applyBordersOntoElement('solid', container.getChildren('.CITableInnerContainer')[0]);
		style.interpolateRoundedCornerMaskOntoElement(container.getChildren('.CITableInnerContainer')[0]);
	},
	
	/*
		Function: tableElement()
		Returns the Element representing the body of the table
		
		Returns:
			Element
	*/
	tableElement: function() {
		return $(this.id + '_table');
	},
	
	/*
		Function: getData(moreParams)
		Makes the get request to retreive table data, using moreParams which are overridden by getParams(), which are overriden by CIApplication.baseParams
		Fires <CIEvent.GotData> or <CIEvent.RequestFailed>
		
		Returns:
			This CITable
	*/
	getData: function(moreParams) {
		this._request.get(moreParams);
		return this;
	},
	
	getRecords: function(record, moreParams) {
		this._request.get(moreParams, record);
		return this;
	},
	
	postRecord: function(record, moreParams) {
		this._request.post(moreParams, record);
		return this;
	},
	
	putRecord: function(record, moreParams) {
		this._request.put(moreParams, record);
		return this;
	},
	
	deleteRecord: function(record, moreParams) {
		if (this.deletePrompt) {
			var sheet = CISheet.prompt(
				'Confirm Delete', this.deletePrompt,
				{ label: 'Delete', Clicked: function() {
					sheet.hide();
					this._request.destroy(moreParams || {}, record);
				}.bind(this) },
				{ label: 'Don&rsquo;t Delete' }
			);
		} else {
			this._request.destroy(moreParams || {}, record);
		}
		
		return this;
	},
	_makeHeader: function() {
		if (this.hideHeader) return;
		
		var headerTr = new Element('tr', { 'class': 'CITableHeaderRow' });
		this.tableElement().adopt(headerTr);
		
		for (var columnCounter = 0; columnCounter < this.columns.length; columnCounter++) {
			var column = this.columns[columnCounter];
			var classes = ' ';
			if (columnCounter > 0) classes += 'CITableHeaderColumnLeftBorder';
			if (columnCounter < this.columns.length - 1) classes += ' CITableHeaderColumnRightBorder';
			
			var td = new Element('td', {
				html: column.header || '',
				'class': 'CITableHeaderColumn' + classes
			});
			headerTr.adopt(td);
		}
	},
	
	/*
		Function: clear()
		Removes all rows and cells from the table. Does not clear the data
		
		Returns:
			This CITable
	*/
	clear: function() {
		$$('table#'+this.tableElement().id+' tr.CITableRow').each(function(row) {
			row.destroy();
		});
		return this;
	},
	
	innerContainerElement: function() {
		return $(this.id + '_innerContainer');
	},
	
	setCollection: function(newCollection) {
		if (this.paginator) newCollection = newCollection['CIPaginatorCollection'];
		this.set('collection', $splat(newCollection).clean());
	},
	
	getCollection: function() { return this.collection; },
		
	render: function() {
		if (!this.element()) return;
		
		this.clear();
		this.data = new TAFFY(this.collection);
		this.data.onUpdate = this._onTaffyUpdate.bind(this);
		
		if (this.collection.length == 0) {
			this.clear();
			var td = new Element('td', {
				colspan: this.columns.length,
				'class': 'CITableNoDataColumn',
				html: this.noDataText || 'No data to display.'
			});
			this.tableElement().adopt(new Element('tr', {'class':'CITableRow'}).adopt(td));
		}

		this.data.forEach(function(record, index) {
			record.__rowIndex = index;
			var paritySkin = (index % 2) == 0 ? 'CIEvenSkin' : 'CIOddSkin';
			var tr = new Element('tr', {
				id: this.id + '_row_' + index,
				'class': 'CITableRow CIHoverableSkin ' + paritySkin
			});
			tr.store('CITableRowIndex', index);
			this.tableElement().adopt(tr);
			this._makeCellsInRowUsingRecord(tr, record, index);
		}.bind(this));
		this.fireEvent(CIEvent.Rendered);
	},
	
	/*
		Function: removeSelection()
		Removes the selection and selected row. Fires <CIEvent.Changed>
		
		Returns:
			This CITable
	*/
	removeSelection: function() {
		if (this.selectedRowElement) CISelectionStyle.unselect(this.selectedRowElement);
		this.set('selectedRowElement', null);
		this.set('selectedRowIndex', null);
		this.set('selected', null);
		this.fireEvent(CIEvent.Changed);
		return this;
	},
	
	selectRow: function(indexOrTR, suppressSelectedEvent) {
		this.removeSelection();
		
		var tr = indexOrTR;
		if ($type(indexOrTR) == 'number') tr = $(this.id + '_row_' + indexOrTR);
		this.set('selectedRowElement', tr);
		this.set('selectedRowIndex', this.selectedRowElement.retrieve('CITableRowIndex'));
		this.set('selected', this.data.get(this.selectedRowIndex)[0]);
		this.fireEvent(CIEvent.Changed);
		
		CISelectionStyle.select(this.selectedRowElement);
		//var container = $(this.id + '_innerContainer');
		//container.scrollTo(this.selectedRowElement.getPosition(container).x, this.selectedRowElement.getPosition(container).y);
		if (!suppressSelectedEvent) this.fireEvent(CIEvent.Selected, [this.selected]);
		
		return this;
	},
	
	_onSelectRow: function(event) {
		this.fireEvent(CIEvent.Clicked, [event]);
		this.selectRow(event.target.getParent('.CITableRow'));
	},
	
	_makeColumnsHashIntoArray: function(hash) {
		var columns = [];
		hash.each(function(col, header) {
			col.header = col.header || header;
			columns.push(col)
		});
		return columns;
	},
	
	_viewResized: function(superview) {
		if (!this.element()) return;
		var newSize = this.frame.toCssStylesObject({}, superview);
		//console.log(this.id, 'has been told to resize to width of', newSize.width);
		
		//this.element().setStyles(newSize);
		//this.subviews.each(function(view) { view._viewResized(this); }.bind(this));
	},
	
	_makeCellsInRowUsingRecord: function(tr, record, index) {
		for (var columnCounter = 0; columnCounter < this.columns.length; columnCounter++) {
			var column = this.columns[columnCounter];
			
			var styles = column.cssStyles;
			if (column.width) styles['CIFirmWidth'] = column.width;
			
			if (columnCounter < this.columns.length - 1) styles['border-right'] = '1px solid #CCC';
			
			var editable = column.editor != null && !this.useArray;
			if (editable) {
				column.editor.editableIf = column.editor.editableIf || $lambda(true);
				editable = editable && column.editor.editableIf(record[column.property], record);
			}
			var cssClass = column.cssClass || '';
			if (editable) {
				cssClass += ' CITableEditableCell';
				if (index < this.collection.length - 1) styles['border-bottom'] = '1px dotted #CCC';
			}
			
			var td = new Element('td', {
				styles: CIObject.interpretStyles(styles),
				'class': 'CITableCell ' + cssClass
			});
			if (this.selectable && !editable) {
				tr.addClass('CISelectableTableRow');
				td.addEvent('click', this._onSelectRow.bind(this));
			}
			if (editable) {
				column.editor.type = column.editor.type || 'text';
				td.addEvent('click', this._onEditCell.bind(this));
				td.store('CITableColumnEditorConfig', column.editor);
			}
			
			td.store('CITableColumnProperty', column.property);
			td.store('CITableRowIndex', index);
			
			tr.adopt(td);
			if (column.renderer) {
				var content = column.renderer(record[column.property], record, this, this.data, td, tr);
				if (content != null) {
					if ($type(content) == 'string')
						// Wrapped in a <span> because Element.getChildren will not return text nodes
						td.adopt(new Element('span', { html: content }));
					else if (content.objectId)	// CIObject
						content.element(td);
					else					// Element
						td.adopt(content);
				}
			} else {
				var value = (record[column.property] || '').toString();
				var html = column.dontEncodeEntityChars ? value : value.withEntityCharsEncoded();
				html = column.truncateAfter && html.length > column.truncateAfter.toInt() ? html.substr(0, column.truncateAfter.toInt()) + '...' : html;
				td.adopt(new Element('span', { html: html }));
			}
		}
	},
	
	_onTaffyUpdate: function(newRecord, oldRecord) {
		newRecord.__rowIndex = oldRecord.__rowIndex;
		var tr = $(this.id+'_row_'+oldRecord.__rowIndex);
		this._makeCellsInRowUsingRecord(tr.empty(), newRecord, newRecord.__rowIndex);
	},
	
	_onEditCell: function(event) {
		var td = event.target;
		if (td.get('tag') != 'td') td = event.target.getParent('td');
		 
		var config 	= td.retrieve('CITableColumnEditorConfig');
		var content = $splat(td.getChildren());
		var value 	=  '';
		var input, field, editingHudContent;
		var buttonHPanel = new CIHPanel({
			spacing: 5, valign: 'middle',
			cssStyles: { CIFirmWidth: 200 },
			content: [
				new CILink({
					label: 'Cancel',
					Clicked: this.stopEditing.bind(this)
				}),
				new CILink({
					label: 'Save',
					Clicked: this.commitChanges.bind(this)
				})
			]
		});
		
		if (config.useRecordProperty) {
			var property = td.retrieve('CITableColumnProperty');
			var index = td.retrieve('CITableRowIndex');
			value = this.collection[index][property];
			// Catch null values
			value = value ? value.toString() : '';
		} else {
			value = content.length > 0 ? content[0].get('html') : '';
		}
		if ($type(value) == 'string') config.value = value.withEntityCharsDecoded();
		config.labelStyles = { display: 'none' };
		config.padding = config.padding || 0;
		config.spacing = config.spacing || 0;
		
		if (config.type == 'textarea') {
			config.value = value.replace(/<br\/?>/g, '\n');
			config.cssStyles = config.cssStyles || {};
			config.cols = 32;
			config.rows = 6;
			field = new CIFormField(config);
			editingHudContent = new CIVPanel({
				spacing: 5,
				content: [ field, buttonHPanel ]
			});
		} else {
			field = new CIFormField(config);
			field.addEvent(CIEvent.EnterPressed, this.commitChanges.bind(this));
			field.addEvent(CIEvent.EscapePressed, this.stopEditing.bind(this));
			editingHudContent = new CIHPanel({
				spacing: 5, valign: 'middle',
				content: [ field, buttonHPanel ]
			});
		}
		
		if (this.editingHud) {
			if (this.editingHud._td != td)
				this.stopEditing();
			else
				return;
		}
		
		this.editingHud = new CIHud({
			title: "Editing Cell",
			content: editingHudContent,
			offset: { from: td, dx: 10, dy: 10 },
			hideCloseButton: true,
			Shown: function() { field.setValue(config.value); field.giveFocus(); }
		});
		this.editingHud._td = td;
		CISelectionStyle.set(this.editingHud._td, 'editing');
		this.editingHud.show();
	},
	
	/*
		Function: stopEditing()
		Hides the editor <CIHud> and removes the 'editing' <CISelectionStyle>
	
		Returns:
			This CITable
	*/
	stopEditing: function() {
		if (!this.editingHud) return;
		CISelectionStyle.unset(this.editingHud._td, 'editing');
		this.editingHud.hide();
		this.editingHud = null;
		return this;
	},
	
	_onPostedData: function(newRecord, json) {
		if (!this.editingHud) return;
		
		var index = this.editingHud._td.getParent().retrieve('CITableRowIndex');
		if (this.responseWrapsObject) newRecord = newRecord[this.responseWrapsObject];
		this.stopEditing();
		this.data.update(newRecord, index);
	},
	
	/*
		Function: commitChanges()
		Make the request using the CITable's post. If succesful, the editing HUD is hidden and just the table row is updated using TaffyDB
		
		Returns:
			This CITable
	*/
	commitChanges: function() {
		if (!this.editingHud) return;

		var index = this.editingHud._td.getParent().retrieve('CITableRowIndex');
		var oldRecord = this.data.get(index)[0];
		var field = this.editingHud.content[0].children[0];
		var params = {}; params[field.name] = field.getValue();
		
		if (this._request.canPut)
			this._request.put(params, oldRecord);
		else
			this._request.post(params, oldRecord);
		return this;
	}
});/*
	Class: CIMenu
	Represents a vertical, single-level menu. More like a list. Only exists in the DOM as long as it is on-screen. Implements CIOffsettable
	Its element method should not be called directly. Instead, use toggle(parent), hide(), and show(parent)
	
	Properties:
		id - String like CIMenu_#
		selected - Object. The object representing the selected item
		selectedIndex - Number. The index of the selected item
		
		*See configuration for others*
	
	Events:
		- Clicked
		- Changed
		- Selected
*/
// TODO implement Showing, Shown, Hiding, Hidden, RemovedFromDom
var CIMenu = new Class({
	Extends: CIView,
	Implements: CIOffsettable,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			items - Array. The items to display in the list. See <Item Configuration>. Default []
			offset - Object. The CIOffsettable configuration. See <CIOffsettable>
		
		Item Configuration:
			html - String. The HTML to display for each item
			value - Mixed. The value representing the object
			cssClass - String. The cssClass to apply to each item's Element
	*/
	initialize: function(options) {
		this.parent(options);
		this.offset = options.offset;
		this.isA('CIMenu');
		this.items = $splat(options.items);
		this.offset = options.offset;
		this.selected = null
		this.selectedIndex = null;
	},
	
	_makeElement: function(parent) {
		this._makeOffsettable();
		var menu = new Element('div', {
			id: this.id,
			'class': 'CIMenu',
			// cssStyles' positioning takes precedence over the offset
			styles: $extend(this.offsetStyles, this.cssStyles)
		});
		menu.inject(parent, 'top');
		
		var container = new Element('div', {
			'class': 'CIMenuContentContainer',
			styles: CIObject.interpretStyles({
				CIFirmHeight: menu.getStyle('height'),
				CIFirmWidth: menu.getStyle('width')
			})
		});
		menu.adopt(container);
		
		this.items.each(function(item, index) {
			var cssClass = index % 2 == 0 ? 'CIEvenSkin' : 'CIOddSkin'
			var itemElement = new Element('div', {
				id: this.id + '_CIMenuItem_' + index,
				html: item.html,
				'class': 'CIMenuItem CIHoverableSkin CIClickableSkin ' + cssClass 
			});
			
			itemElement.store('CIMenuItemIndex', index);
			itemElement.addEvent('click', this._onClick.bind(this));
			container.adopt(itemElement);
		}.bind(this));
		
		var closeContainer = new Element('div', {
			'class': 'CIMenuCloseContainer'
		});
		menu.adopt(closeContainer);
		closeContainer.adopt(new Element('span', {
			'class': 'CIMenuCloseContainerText',
			html: 'Close&nbsp;'
		}));
		var closeButton = new Element('img', {
			src: '/cip/images/close.png',
			alt: 'Close Menu'
		});
		closeContainer.adopt(closeButton);
		closeContainer.addEvent('click', this.hide.bind(this));
		
		return menu;
	},
	
	/*
		Function: toggle(parent)
		Toogles the display of the menu, showing it inside the parent element, or document.body if none is provided
		
		Parameters:
			parent - Element or null. The parent into which to create the menu. Default document.body
			
		Returns:
			Mootools.Fx.Morph element
	*/
	toggle: function(parent) {
		if (this.element())
			return this.hide();
		else
			return this.show(parent);
	},
	
	/*
		Function: show(parent)
		Display of the menu, showing it inside the parent element, or document.body if none is provided
		
		Parameters:
			parent - Element or null. The parent into which to create the menu. Default document.body
			
		Returns:
			Mootools.Fx.Morph element
	*/
	show: function(parent) {
		var elem = this.element(parent || document.body);
		elem.fade('hide');
		elem.setStyle('display', 'block');
		return new Fx.Morph(elem, { duration: 150 }).start({
			opacity: [0,1],
			top: [this.offsetStyles.top, this.offsetStyles.top + this.offsetStyles.dy]
		}).chain(function() {
			this.fireEvent(CIEvent.Shown);
			this.element().getChildren('.CIMenuContentContainer')[0].getChildren('.CIMenuItem').each(function(e, i) {
				if (i == this.selectedIndex) CISelectionStyle.select(e);
			}.bind(this));
		}.bind(this));
	},
	
	/*
		Function: hide()
		Hide the menu. This completely removes the element from the DOM
		
		Returns:
			Mootools.Fx.Morph element
	*/
	hide: function() {
		var elem = this.element();
		if (!elem) return;
		var top = elem.getStyle('top').toInt();
		return new Fx.Morph(elem, { duration: 150 }).start({
			opacity: [1,0],
			top: [top, top - 20]
		}).chain(function() {
			elem.destroy(); this.fireEvent(CIEvent.Hidden);
		}.bind(this));
	},
	
	_onClick: function(event) {
		var index;
		if ($type(event) == 'number')
			index = event;
		else
			index = event.target.retrieve('CIMenuItemIndex');
		this.selected = this.items[index];
		this.selectedIndex = index;
		this.fireEvent(CIEvent.Changed, [this.selected.value]);
		if ($type(event) != 'number') this.fireEvent(CIEvent.Clicked, [event, this.selected.value]);
		this.hide();
	},
	
	/*
		Function: getValue()
		Return the value property of the selected object
		
		Returns
			Mixed
	*/
	getValue: function() {
		return this.selected.value;
	},
	
	/*
		Function: select(index)
		Select the item at the specified index
		
		Returns:
			This CIMenu 
	*/
	select: function(i) {
		if (!this.items[i]) return;
		this._onClick(i);
		return this;
	}
});/*
	CIPaginator makes a lot of expectations. It expects:
		- an item count in CIPaginatorItemCount
		- the collection in CIPaginatorCollection
		- the page number in CIPaginatorPage, defaults to 1
	Properties:
		- page: Number, The current page
		- itemCount: Number, The total number of
	Options:
		+ paginates: The object to paginate. It looks for a data property
		- itemsPerPage: Number (Default 30)
*/
/*
	Class: CIPaginator
	A paginator component, usually added to a toolbar. When its element is added to the DOM, it adds a <CIEvent.GotData> handler to
	the target, paginates.
	
	Properties:
		id - String like CIPaginator_#
		page - Number. The current page. Default 1
		itemCount - Number. The total number of items being paginated
		*See configuration for others*
	
	Request Format:
		CIPaginator requests data for pages using the following params:
		CIPaginatorItemsPerPage - Number. The number of items to show on each page
		CIPaginatorPage - Number. The page to show
		
	Response Format:
		CIPaginator expects the get response to have the following format:
		CIPaginatorPage - Number. The page to show
		CIPaginatorItemCount - Number. The total number of items being paged
		CIPaginatorCollection - Array. The actual to show for this page
*/
// TODO better creation of paginator. Maybe CIPaginator.Attached event? CIPageable?
// TODO more event hooks
var CIPaginator = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			paginates - CIObject. The CIObject on which to call getData
			itemsPerPage - Number. The number of items to show per page. Default 30
			type - String. The type of paginator. Accepts 'alpha' or 'numeric'. Default 'numeric'
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIPaginator');
		this.paginates = options.paginates;
		this.itemsPerPage = options.itemsPerPage || 30;
		this.page = 1;
		this.itemCount = 0;
		this.type = options.type || 'numeric';
		this.filters = options.filters;
		if (this.filters) this.filters.paginator = this;
	},
	
	/* 	Function: _makeElement(parent)
		Parent adopts Element and listens for <CIEvent.GotData> on paginates
	*/
	_makeElement: function(parent) {
		var container = new Element('div', {
			id: this.id,
			'class': 'CIPaginator ' + this.cssClass,
			styles: {
				width: 400,
				height: 18,
				margin: '0 auto 0 auto'
			}
		});
		parent.adopt(container);
		// If this._onGotData is not explicitly bound to this, it will be bound to the parent object
		this.paginates.addEvent(CIEvent.GotData, this._onGotData.bind(this));
		
		if (this.filters) this.filters.element(this.paginates._title.contentElement());
		return container;
	},
	
	_onGotData: function(response, json) {
		if (!json) return;
		var container = this.element().empty();
		if (this.type == 'numeric') {
			this.page = (response.CIPaginatorPage || 1).toInt();
			this.itemCount = response.CIPaginatorItemCount.toInt();
			var pages = (this.itemCount / this.itemsPerPage).toInt();
			pages += this.itemCount / this.itemsPerPage - pages == 0 ? 0 : 2;
			
			if (pages < 10) {
				container.setStyle('width', pages * 30);
				pages.times(function(page) {
					if (page == 0) return;
					var link = new CIButton({
						label: page,
						style: this.page == page ? CIButton.SelectedPageStyle : CIButton.PageStyle,
						Clicked: function() { this.selectPage(page) }.bind(this)
					});
					link.element(container);
				}.bind(this));
			} else {
				if (pages <= 99)
					container.setStyle('width', 450);
				else if (pages <= 999)
					container.setStyle('width', 550);
				else
					container.setStyle('width', 650);
					
				var pagesets = [
					{ start: 1, end: 3 },
					{ start: this.page - 2, end: this.page + 2 },
					{ start: pages - 2, end: pages }
				];
				var cssClass, style;
				for (var setIndex = 0; setIndex < pagesets.length; setIndex++) {
					var set = pagesets[setIndex];
					for (var i = set.start; i <= set.end; i++) {
						if (i < 1 || i > pages) continue;
						style = setIndex  != 1 ? CIButton.PageStyle : (this.page == i ? CIButton.SelectedPageStyle : CIButton.PageStyle);
						var e = new CIButton({
							label: i,
							style: style,
							Clicked: this._selectPageUsingEvent.bind(this)
						}).element(container);
						e.store('CIPaginatorPage', i);
					}
					if (setIndex == 0) new CIElement('p', { styles: { 'float': 'left', margin: 0 }, html: '&nbsp;&laquo;&nbsp;&nbsp;'}).element(container);
					if (setIndex == 1) new CIElement('p', { styles: { 'float': 'left', margin: 0 }, html: '&nbsp;&raquo;&nbsp;&nbsp;'}).element(container);
				}
			} 
		} else if (this.type == 'alpha') {
			container.setStyle('width', CIPaginator.alphabet.length * 30);
			this.page = (response.CIPaginatorPage || 'A');
			CIPaginator.alphabet.each(function(letter) {
				var link = new CIButton({
					label: letter.toUpperCase(),
					style: this.page == letter ? CIButton.SelectedPageStyle : CIButton.PageStyle,
					Clicked: function() { this.selectPage(letter); }.bind(this)
				});
				link.element(container);
			}.bind(this));
		}
	},
	
	/*
		Function: selectPage(page)
		Sends a request to retrieve the data for the specified page
		
		Parameters:
			page - Number. The page to show
		
		Returns:
			This CIPaginator
	*/
	selectPage: function(page) {
		var params = {
			CIPaginatorItemsPerPage: this.itemsPerPage,
			CIPaginatorPage: page
		};
		if (this.filters) params[this.filters.name] = this.filters.toParam();
		this.paginates.getData(params);
		return this;
	},
	
	_selectPageUsingEvent: function(event) {
		this.selectPage(event.target.getParent().retrieve('CIPaginatorPage'));
	},
	
	reloadPage: function() {
		this.selectPage(this.page);
		return this;
	}
});
/*
	Constant: CIPaginator.alphabet
	An array of the characters to display for alpha-type paginators.
	First character is '#', then is 'a' through 'z', all lowercase.
*/
CIPaginator.alphabet = ['#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
var CIFilter = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIFilter');
		this.name = configuration.name;
		this.label = configuration.label || this.name;
		this.setSrc(configuration.src);
		this.setActive(configuration.active);
		this.setFilterSet(configuration.filterSet);
	},
	setSrc: function(newSrc) {
		this.src = newSrc;
		var match = this.src.match(/(.+?)\.(\w{3,4})$/);
		this.activeSrc = match[1] + '_active.' + match[2];
	},
	setActive: function(newActive) {
		this.set('active', newActive);
		if (!this._button) return;
		this._button.setSrc(this.active ? this.activeSrc : this.src);
		this.filterSet.reload();
	},
	setFilterSet: function(newFilterSet) {
		this.set('filterSet', newFilterSet);
	},
	toggleActive: function() {
		this.setActive(!this.active);
	},
	_makeElement: function(parent) {
		this._button = new CIImageLink({
			src: this.active ? this.activeSrc : this.src,
			alt: this.label,
			cssStyles: { 'margin-left': 8 },
			Clicked: this.toggleActive.bind(this)
		});
		return this._button.element(parent);
	}
});

var CIFilterSet = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIFilterSet');
		this.name = configuration.name || 'CIFilterActiveFilters';
		this.filters = $splat(configuration.filters);
		this.toParam = configuration.toParam ? configuration.toParam.bind(this) : this.defaultToParam;
		this.filters.each(function(filter) { filter.setFilterSet(this); }.bind(this));
		this.paginator = configuration.paginator;
	},
	defaultToParam: function() {
		return this.filters.map(function(filter) { return filter.active ? filter.name : null; }).clean().join(',');
	},
	reload: function() {
		this.paginator.reloadPage();
	},
	_makeElement: function(parent) {
		var container = new Element('div', {
			id: this.id,
			'class': 'CIFilterSet',
			styles: this.cssStyles
		});
		parent.adopt(container);
		for (var i = 0; i < this.filters.length; i++)
			this.filters[i].element(container);
		
		return container;
	}
});/*
	Class: CIModalLayer
	Represents a modal layer above the window. Content may still be added above the modal layer.
	Its element(parent) should never be called directly, instead use show(). It only exists in the DOM as long as it is visible
	
	Properties:
		id - String like CIModalLayer_#
*/
// TODO fire Showing, Shown, Hiding, Hidden, RemovedFromDom
var CIModalLayer = new Class({
	Extends: CIView,
	
	initialize: function() {
		this.parent();
		this.isA('CIModalLayer');
	},
	
	_makeElement: function(parent) {
		var layer = new Element('div', {
			id: this.id,
			'class': 'CIModalLayer'
		});
		layer.inject($$('body')[0], 'top');
		return layer;
	},
	
	/*
		Function: show()
		Show the modal layer above all other content
		
		Returns:
			Mootools.Fx.Tween
	*/
	show: function() {
		var e = this.element('CIModalLayer'); // This parent is just a dummy -- CIModalLayer always inserts at the top of the body
		e.setStyle('z-index', e.getStyle('z-index').toInt() + CIModalLayer._zIndexCounter++);
		e.fade('hide');
		e.setStyle('display', 'block');
		return new Fx.Tween(e, {
			property: 'opacity',
			duration: 200
		}).start(1.0);
	},
	
	/*
		Function: hide()
		Hide the modal layer
		
		Returns:
			Mootools.Fx.Tween
	*/
	hide: function() {
		var e = this.element();
		return new Fx.Tween(e, {
			property: 'opacity',
			duration: 200
		}).start(0).chain(function() {
			e.destroy();
		});
	}
});
CIModalLayer._zIndexCounter = 1;
CIModalLayer.nextZIndex = function() { return CIModalLayer._zIndexCounter++; }

/*
	Class: CISheet
	Represents a modal dialog component that slides from the top of the window, similar to Mac OS X's sheets. It only exists in the DOM when it is visible.
	Its element(parent) should not be called directly. Instead, call show() and hide()
	
	Properties:
		id - String like CISheet_#
		
		*See configuration for others*
	
	Events:
		- <CIEvent.Hidden>
		- <CIEvent.Shown>
*/
// TODO fire Showing, Hiding, and RemovedFromDom
var CISheet = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			title - String. The title of the sheet
			content - Array or CIObject. The content to show inside the sheet. If an array is provided, content is arranged vertically, top to bottom
			buttons - Array of Hashes or CILinks. The configurations for, or the CILinks to show in the button area beneath the content.
			The buttons are added in the order they are provided. If the buttons do not have an inline <CIEvent.Clicked> handler,
			they will automatically close the sheet when clicked. Default [{label:'OK'}]
			keepInDom - Boolean. Whether to retain the Element in the DOM after hiding. Use if you see positioning or size problems. Default false
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CISheet');
		this.title = options.title || options.label;
		this.content = options.content;
		this.buttons = options.buttons || { 'default': { label: 'OK' } };
		this.keepInDom = options.keepInDom;
	},
	
	_makeElement: function(parent) {
		var sheet = new Element('div', {
			id: this.id,
			'class': 'CISheet ' + this.cssClass,
			styles: this.cssStyles
		});
		parent.adopt(sheet);
		
		new CITitle({
			title: this.title,
			cssClass: 'CISheetTitle'
		}).element(sheet);
		
		var contentDiv = new Element('div', { 'class': 'CISheetContentContainer' });
		sheet.adopt(contentDiv);
		if ($type(this.content) == 'array') this.content = new CIVPanel(this.content);
		this.content.element(contentDiv);
		
		var buttonsDiv = new Element('div', { 'class': 'CISheetButtonsContainer' });
		sheet.adopt(buttonsDiv);
		
		var destructiveButtons = new Element('div', { 'class': 'CISheetDestructiveButtonsContainer' });
		var otherButtons = new Element('div', { 'class': 'CISheetOtherButtonsContainer' });
		buttonsDiv.adopt(destructiveButtons);
		buttonsDiv.adopt(otherButtons);
		
		if (this.buttons.label) {
			if (!this.buttons.isCIObject) {
				this.buttons[CIEvent.Clicked] = this.buttons[CIEvent.Clicked] || this.hide.bind(this);
				this.buttons = new CIButton(this.buttons);
			}
			var wrapper = new Element('div', { 'class': 'CISheetButtonWrapper' });
			otherButtons.adopt(wrapper);
			this.buttons.element(wrapper);
		} else if ($type(this.buttons) == 'array') {
			this.buttons = { other: this.buttons };
		}

		$splat(this.buttons.destructive).each(function(button) {
			if (!button.isCIObject) {
				button[CIEvent.Clicked] = button[CIEvent.Clicked] || this.hide.bind(this);
				button = new CIButton(button);
			}
			var wrapper = new Element('div', { 'class': 'CISheetButtonWrapper' });
			destructiveButtons.adopt(wrapper);
			button.element(wrapper);
		}.bind(this));
		
		$splat(this.buttons.other).each(function(button) {
			if (!button.isCIObject) {
				button[CIEvent.Clicked] = button[CIEvent.Clicked] || this.hide.bind(this);
				button = new CIButton(button);
			}
			var wrapper = new Element('div', { 'class': 'CISheetButtonWrapper' });
			otherButtons.adopt(wrapper);
			button.element(wrapper);
		}.bind(this));
		
		if (this.buttons['default'] && !this.buttons['default'].isCIObject) {
			this.buttons['default'][CIEvent.Clicked] = this.buttons['default'][CIEvent.Clicked] || this.hide.bind(this);
			this.buttons['default'] = new CIButton(this.buttons['default']);
		}
		if (this.buttons['default']) {
			var wrapper = new Element('div', { 'class': 'CISheetButtonWrapper CISheetDefaultButton' });
			otherButtons.adopt(wrapper);
			this.buttons['default'].element(wrapper);
		}
		
		sheet.setStyle('top', sheet.getSize().y * -1);
		
		return sheet;
	},
	
	/*
		Function: hide()
		Hide the sheet, removing it from the DOM unless keepInDom is true. Fires <CIEvent.Hidden>
		
		Returns:
			Mootools.Fx.Tween
	*/
	hide: function() {
		var sheet = this.element();
		if (sheet == null) return;
		var dimensions = sheet.getSize();
		return new Fx.Tween(sheet, {
			property: 'top',
			duration: 300
		}).start(dimensions.y * -1).chain(function() {
			sheet.setStyle('top', dimensions.y * -1);
			if (this.keepInDom)
				sheet.setStyle('display', 'none');
			else
				sheet.destroy();
			this._modalLayer.hide();
			this.fireEvent(CIEvent['Hidden']);
		}.bind(this));
	},
	
	/*
		Function: show()
		Shows a <CIModalLayer>, then the sheet, automatically adding it to the DOM. Fires <CIEvent.Shown>
		
		Returns:
			Mootools.Fx.Tween
	*/
	show: function() {
		var tween;
		this._modalLayer = new CIModalLayer();
		this._modalLayer.show().chain(function() {
			var sheet = this.element(this._modalLayer.element());
			var dimensions = sheet.getSize();
			sheet.setStyle('left', (window.getSize().x / 2) - (dimensions.x / 2));
			sheet.setStyle('display', 'block');
			tween = new Fx.Tween(sheet, {
				property: 'top',
				duration: 200
			}).start(0).chain(function() { this.fireEvent(CIEvent.Shown); }.bind(this));
		}.bind(this));
		return tween;
	}
});

/*
	Function: CISheet.prompt(title, message, affirm, cancel)
	A shortcut to create and show a sheet that displays a message and prompts for a response. The configs for the buttons follow the same rules as buttons for the regular CISheet.
	
	Parameters:
		title - String. The title of the seet
		message - String. The message to display
		affirm - Hash or CILink. The affirmative button. Always on the right
		cancel - Hash or CILink. The cancel button. Always on the left. Default {label:'Cancel'}
	
	Returns:
		The CISheet shown
*/
CISheet.prompt = function(title, message, affirm, cancel) {
	cancel = cancel || { label: 'Cancel' };
	var _sheet = new CISheet({
		title: title,
		buttons: { 'other': cancel, 'default': affirm },
		content: new CIText(message),
		cssStyles: { CIFirmWidth: 500 }
	});
	_sheet.show(); return _sheet;
};
/*
	Function: CISheet.alert(title, message)
	A shortcut to create and show a sheet that displays a message with only an OK button.
	
	Parameters:
		title - String. The title of the seet
		message - String. The message to display
	
	Returns:
		The CISheet shown
*/
CISheet.alert = function(title, message) {
	var _sheet = new CISheet({
		title: title,
		buttons: { 'default': { label: 'OK' } },
		content: new CIText(message),
		cssStyles: { CIFirmWidth: 450 }
	});
	_sheet.show(); return _sheet;
};/*
	Class: CIText
	A simple wrapper class. It wraps a <p> Element
	
	Properties:
		id - String like CIText_#
		html - String. The innerHTML of the Element
*/
var CIText = new Class({
	Extends: CIView,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			CIText may be configured with just a string of the innerHTML or a Hash:
			html - String. The innerHTML to store
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIText');
		
		if ($type(options) == 'string' || ($type(options) == false))
			this.text = options
		else
			this.text = options.html || options.text || '';
	},
	
	setText: function(newText) {
		this.set('text', newText);
		if (this.element()) this.element().set('html', this.text);
	},
	
	/*	Function: _makeElement(parent)
		Parent adopts Element */
	_makeElement: function(parent) {
		var p = new Element('p', {
			id: this.id,
			styles: this.cssStyles,
			'class': 'CIText ' + this.cssClass,
			html: this.text
		});
		parent.adopt(p);
		return p;
	}
});/*
	Class: CIHud
	Represents a floating panel, a _H_eads _U_p _D_isplay. Implements CIOffsettable.
	Tts element(parent) should not be called directly, instead call show(). It exists in the DOM
	only as long as it is visible
	
	Properties:
		id - String like CIHud_#
		dragHandler - Mootools.Drag.Move. The object that allows CIHuds to be freely positionable.
		
		*See configuration for others*
	
	Events:
		- <CIEvent.Shown>
		- <CIEvent.Hiding>
		- <CIEvent.RemovingFromDom>
		- <CIEvent.RemovedFromDom>
		- <CIEvent.Hidden>
*/
var CIHud = new Class({
	Extends: CIView,
	Implements: CIOffsettable,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			offset - Hash. How to offset the CIHud when shown. See <CIOffsettable>
			title - String. The title of the CIHud. Default ''
			content - Array. The content inside the hud, displayed vertically, top to bottom. Default []
			padding - Number. The padding inside the body of the hud. Default 5
			hideCloseButton - Boolean. Whether to hide the close button. Default false
	*/
	initialize: function(options) {
		this.parent(options);
		this.offset = options.offset;
		this.isA('CIHud');
		this.title = options.title || options.label || '';
		this.content = $splat(options.content);
		this.hideCloseButton = options.hideCloseButton;
		this.padding = options.padding; // 0 || 5 == 5
		if (this.padding == null) this.padding = 5;
		this.dragHandler = null;
	},
	
	_makeElement: function(parent) {
		this._makeOffsettable(this.offset);
		
		var hud = new Element('div', {
			id: this.id,
			'class': 'CIHud ' + this.cssClass,
			styles: $extend(this.offsetStyles, this.cssStyles)
		});
		hud.inject(document.body, 'top');
		hud.setStyle('z-index', hud.getStyle('z-index').toInt() + CIModalLayer.nextZIndex());
		
		var titleContainer = new Element('table', {
			'class': 'CIHudTitleContainer',
			styles: { width: '100%' },
			cellpadding: 0, cellspacing: 0
		});
		hud.adopt(titleContainer);
		
		this.dragHandler = new Drag.Move(hud, {
			onStart: function(elem) {
				this.fireEvent(CIEvent.DragStarted, [elem]);
			}.bind(this),
			handle: titleContainer
		});
		
		var titleContainerRow = new Element('tr');
		titleContainer.adopt(titleContainerRow);
		
		var title = new Element('span', { 'class': 'CIHudTitle', html: this.title });
		titleContainerRow.adopt(new Element('td', { styles:{width:'100%'} }).adopt(title));
		if (!this.hideCloseButton) {
			var closeButton = new Element('img', {
				src: '/cip/images/close_white.png',
				alt: 'Close HUD',
				'class': 'CIHudTitleCloseButton'
			});
			closeButton.addEvent('click', this.hide.bind(this));
			titleContainerRow.adopt(new Element('td', { styles:{width:16} }).adopt(closeButton));
		}
		
		var container = new Element('div', {
			'class': 'CIHudContentContainer',
			styles: { padding: this.padding }
		});
		hud.adopt(container);
		
		this.content.each(function(item) {
			item.element(container);
		});
		
		return hud;
	},
	
	/*
		Function: show()
		Show the CIHud. Fires <CIEvent.Shown>
		
		Returns:
			Mootools.Fx.Morph
	*/
	show: function(offset) {
		if (this.element()) return;
		var hud = this.element(document.body);
		hud.setStyle('display', 'block');
		return new Fx.Morph(hud, { duration: 200 }).start({
			top: this.offsetStyles.top + this.offsetStyles.dy,
			left: this.offsetStyles.left + this.offsetStyles.dx,
			opacity: [0, 1]
		}).chain(function() { this.fireEvent(CIEvent.Shown); }.bind(this));
	},
	
	/*
		Function: hide()
		Hide the CIHud and remove its element from the DOM. Fires the following events in order:
		<CIEvent.Hiding> -> <CIEvent.RemovingFromDom> -> (element destroyed) -> <CIEvent.RemovedFromDom> -> <CIEvent.Hidden>
		
		Returns:
			Mootools.Fx.Morph
	*/
	hide: function() {
		var hud = this.element();
		if (!hud) return;
		return new Fx.Morph(hud, { duration: 200 }).start({
			top: this.offsetStyles.top,
			left: this.offsetStyles.left,
			opacity: 0
		}).chain(function() {
			this.fireEvent(CIEvent.Hiding, [hud]);
			this.fireEvent(CIEvent.RemovingFromDom, [hud]);
			hud.destroy();
			this.fireEvent(CIEvent.RemovedFromDom);
			this.fireEvent(CIEvent.Hidden);
		}.bind(this));
	}
});

/*
	Class: CIHUD
	An alternate name for CIHud
*/
var CIHUD = CIHud;/*
	Class: CIAutocomplete
	An basic but efficient textual autocomplete widget applied to a text CIFormField. Implements CIRequestable's get to retrieve the set of data to filter, and post to submit the selected item.
	Note that the get request is only called once, to retrieve the set of data to filter, making it very efficient. Its element(parent) should not be called directly.
	It will be shown when its target fires a <CIEvent.Changed> event
	
	Properties:
		id - String like CIAutocomplete_#
		target - CIObject. The target field to autocomplete. Usually CIFormField. Do not set directly, instead use <CIAutocomplete#bindTo(target)>
		selected - Object. The selected object
		
		*See configuration for others*
		
	Events:
		- <CIEvent.Clicked>
		- <CIEvent.Changed>
		- <CIEvent.Selected>
		- <CIEvent.GotData>
		- <CIEvent.PostedData>
		- <CIEvent.Hiding>
		- <CIEvent.RemovingFromDom>
		- <CIEvent.RemovedFromDom>
		- <CIEvent.Hidden>
*/
// TODO split into CIAutocomplete (being a logic-only controller), and CIAutocompleter which creates the bindings and uses CIMenu
var CIAutocomplete = new Class({
	Extends: CIView,
	Implements: CIRequestable,
	
	/*
		Constructor: initialize(configuration)
		
		Configuration:
			get - String or Hash. The get request to retrieve the set of data to filter. See <CIRequestable>
			post - String or Hash. The post request made when an item is clicked. See <CIRequestable>
			property - String. The textual property on the filtered objects by which to filter results. Default 'label'
			collection - Array. The array of objects to filter
			targetValueFn - Function. A function that returns the value of the target field. Default target.getValue()
			caseSensitive - Boolean. Whether the filter is case sensitive. Default false
	*/
	initialize: function(options) {
		this.parent(options);
		this.isA('CIAutocomplete');
		this._makeRequestable(options);
		this._request.addEvent(CIEvent.GotData, this._gotData.bind(this));
		this._request.addEvent(CIEvent.PostedData, this.hide.bind(this));
		this.property = options.property || 'label';
		this.collection = $splat(options.collection);
		this.target = null;
		this.targetValueFn = options.targetValueFn || function(target) { return target.getValue(); };
		this.caseSensitive = options.caseSensitive;
		this.addEvent(CIEvent.Selected, this.postData);
	},
	
	/*
		Function: bindTo(target)
		Bind this CIAutocomplete to the target and make the get request. When the target fires a <CIEvent.Changed>, it will invoke the autocompleter
		
		Returns:
			This CIAutocomplete
	*/
	// TODO remove the Changed event if already bound
	bindTo: function(target) {
		this.getData();
		this.target = target;
		this.target.addEvent(CIEvent.Changed, this._autocomplete.bind(this));
		return this;
	},
	
	/*
		Function: getData()
		HTTP get the set of data to filter
		
		Returns:
			This CIAutocomplete
	*/
	getData: function(moreParams) {
		this._request.get(moreParams);
		return this;
	},
	_gotData: function(collection, json) {
		this.set('collection', $splat(collection));
	},
	
	/*
		Function: postData()
		HTTP post something. The post paramsFn is passed this.selected
		
		Returns:
			This CIAutocomplete
	*/
	postData: function(moreParams) {
		if (this._request.canPost) {
			this._request.post(moreParams, this.selected);
		}
	},
	
	/*
		Function: hide()
		Hide the autocompleter. Useful when the autocompleter's parent has changed position since autocompleters cannot move.
		Fires the following events in order:
		<CIEvent.Hiding> -> <CIEvent.RemovingFromDom> -> (element destroyed) -> <CIEvent.RemovedFromDom> -> <CIEvent.Hidden>
	
		Returns:
			Mootools.Fx.Tween
	*/
	hide: function() {
		var elem = this.element();
		if (!elem) return;
		return new Fx.Tween(elem, {
			property: 'opacity', duration: 150
		}).start(0).chain(function() {
			this.fireEvent(CIEvent.Hiding, [elem]);
			this.fireEvent(CIEvent.RemovingFromDom, [elem]);
			elem.destroy();
			this.fireEvent(CIEvent.RemovedFromDom);
			this.fireEvent(CIEvent.Hidden);
		}.bind(this));
	},
	
	_autocomplete: function() {
		var overlay = this.element(document.body).empty();
		
		var query = this.targetValueFn(this.target);
		if (!this.caseSensitive) query = query.toLowerCase();
		// Pre-cache for performance
		var i = 0, s = '', index = -1;
		var item = {}, cssClass = '', div = {}, html = '';
		for (i; i < this.collection.length; i++) {
			item = this.collection[i];
			s = item[this.property];
			s = s ? s.toString() : '';
			index = (!this.caseSensitive ? s.toLowerCase() : s).indexOf(query);
			
			if (index > -1) {
				html = s.substring(0, index) + '<span class="CIAutoCompleteHighlight">';
				html += s.substr(index, query.length) + '</span>';
				html += s.substring(index+query.length);
				cssClass = i % 2 == 0 ? 'CIEvenSkin' : 'CIOddSkin';
				div = new Element('div', {
					'class': 'CIAutocompleteResult CIHoverableSkin ' + cssClass,
					html: html
				});
				div.store('CIAutocompleteRecord', item);
				div.addEvent('click', function(event) {
					this.fireEvent(CIEvent.Clicked, [event]);
					this.selected = div.retrieve('CIAutocompleteRecord');
					this.fireEvent(CIEvent.Changed, [this.selected])
					this.fireEvent(CIEvent.Selected);
				}.bind(this));
				overlay.adopt(div);
			}
		}
	},
	
	_makeElement: function(parent) {
		// Setting targetElement needs to be delayed until it's time to
		// show the overlay because we need the target to be in the DOM
		this.targetElement = this.target.isCIObject ? this.target.element() : this.target;
		var dimensions = this.targetElement.getCoordinates();
		var overlay = new Element('div', {
			'class': 'CIAutocomplete',
			id: this.id,
			styles: {
				width: dimensions.width,
				top: dimensions.top + dimensions.height,
				left: dimensions.left
			}
		});
		overlay.inject(document.body, 'top');
		
		return overlay;
	}
});var CIIndicator = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		configuration = configuration || {};
		this.parent(configuration);
		this.isA('CIIndicator');
		this.alt = configuration.alt || 'Working...';
		this.style = configuration.style || CIIndicator.Style;
	},
	
	_makeElement: function(parent) {
		var container = new Element('div', {
			id: this.id,
			'class': 'CIIndicator ' + this.cssClass,
			styles: this.cssStyles
		});
		container.setStyle('display', 'none');
		parent.adopt(container);
		this._imageElement = new Element('img', {
			src: this.style.get('image'),
			alt: this.alt,
			title: this.alt
		});
		container.adopt(this._imageElement);
		
		this._applyStyle();
		return container;
	},
	
	_applyStyle: function(newStyle) {
		if (!this.element()) return;
		var style = newStyle || this.style;
		this._imageElement.src = style.get('image');
		this.element().setStyles({
			width: style.get('width') || 'auto',
			height: style.get('height') || 'auto'
		});
		
		return this;
	}
});/*
	Class: CITitle
	A CITitle just encapsulates a textual title and an adjacent toolbar
*/
var CITitle = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CITitle');
		
		this.synthesize({
			style: CITitle.CapStyle,
			title: '',
			content: [],
			gap: 5,
			alignment: 'right'
		}, configuration);
		this.indicator = new CIIndicator({ cssStyles: { 'float': 'left' }});
	},
	
	setTitle: function(newTitle) {
		this.set('title', newTitle);
		if (this._text) this._text.setText(this.title);
	},
	
	contentElement: function() {
		return this.element() ? this.element().getChildren('.CITitleContent')[0] : null;
	},
	
	textElement: function() {
		return this._text ? this._text.element() : null;
	},
	
	_makeElement: function(parent) {
		var container = new Element('div', {
			id: this.id,
			'class': 'CITitle',
			styles: this.frame.toCssStylesObject()
		});
		parent.adopt(container);
		
		this.indicator.element(container);
		
		this._text = new CIText({
			cssClass: 'CITitleText',
			text: this.title,
			cssStyles: { 'float': 'left' }
		});
		this._text.element(container);
		
		var toolbar = new Element('div', {
			'class': 'CITitleContent',
			styles : { 'float': this.alignment }
		});
		container.adopt(toolbar);
		if ($type(this.content) == 'array') {
			this.content.each(function(item) {
				var div = new Element('div', {
					'class': 'CITitleContentItemContainer',
					styles: { 'margin-left': this.gap, 'float': 'left' }
				});
				toolbar.adopt(div);
				item.element(div);
			}.bind(this));
		} else if (this.content && this.content.isCIObject){
			this.content.element(toolbar);
		}
		
		this.applyStyle();
		return container;
	},
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style || CITitle.Style;
		var container = this.element();
		if (style.get('hidden')) container.setStyle('display', 'none');
		container.setStyles({
			'min-height': 20,
			padding: style.get('padding'),
			'background-color': style.get('backgroundColor')
		});

		this.textElement().setStyle('font-size', style.get('textSize'));

		style.applyBordersOntoElement('solid', container);
		style.interpolateBorderStyleMaskOntoElement('dotted', container);
		style.interpolateRoundedCornerMaskOntoElement(container);
	}
});

CITitle.Style = new CIStyle({
	backgroundColor: CIStyle.BackgroundColor,
	roundedCornerRadius: 3,
	roundedCorners: CIStyle.TopLeft | CIStyle.TopRight,
	borderSize: 1,
	borderColor: CIStyle.BorderColor,
	solidBorders: CIStyle.Top | CIStyle.Left | CIStyle.Right,
	dottedBorders: CIStyle.Bottom,
	textSize: '1.2em',
	padding: 5
});
CITitle.OnlyBottomBorderStyle = CITitle.Style.override({
	backgroundColor: 'none',
	roundedCorners: CIStyle.NoCorners,
	solidBorders: CIStyle.Bottom,
	dottedBorders: CIStyle.NoSides
});
CITitle.NakedStyle = new CIStyle({
	textSize: '1.2em',
	padding: 5
});
CITitle.UnroundedStyle = CITitle.Style.override({
	roundedCorners: CIStyle.NoCorners
});

CITitle.CIVerticalTabPanelStyle = new CIStyle({
	backgroundColor: CIStyle.SourceBackgroundColor,
	borderColor: CIStyle.BorderColor,
	solidBorders: CIStyle.Bottom,
	borderSize: 1,
	padding: 5
});var CIVerticalTabPanel = new Class({
	Extends: CIView,
	
	initialize: function(configuration) {
		this.parent(configuration);
		this.isA('CIVerticalTabPanel');
		this.synthesize({
			style: CIVerticalTabPanel.Style,
			tabs: [],
			content: [],
			selectedIndex: null,
			selectedContentElement: null
		}, configuration);
		this.tabs = $splat(this.tabs);
		this.content = $splat(this.content);
		if (configuration.selectTab != undefined) {
			this.addEvent(CIEvent.AddedToDom, function() {
				this.selectTab(configuration.selectTab);
			}.bind(this));
		}
	},
	
	_makeElement: function(parent) {
		var tabPanel = new Element('div', {
			id: this.id,
			'class': 'CIVerticalTabPanel'
		});
		parent.adopt(tabPanel);
		var table = new Element('table', {
			id: this.id + '_TableElement',
			cellpadding: 0,
			cellspacing: 0,
			border: 0
		});
		tabPanel.adopt(table);
		var tr = new Element('tr');
		table.adopt(tr);
		
		var tabColumn = new Element('td', {
			id: this.id + '_TabColumn',
			'class': 'CIVerticalTabPanelTabColumn',
			valign: 'top',
			styles: {'vertical-align': 'top'}
		});
		tr.adopt(tabColumn);
		var contentColumn = new Element('td', {
			id: this.id + '_ContentColumn',
			'class': 'CIVerticalTabPanelContentColumn',
			valign: 'top',
			styles: {'vertical-align': 'top'}
		});
		tr.adopt(contentColumn);
		
		this.render();
		this.applyStyle();
		return tabPanel
	},
	
	tabColumnElement: function() {
		return $(this.id + '_TabColumn');
	},
	
	contentColumnElement: function() {
		return $(this.id + '_ContentColumn');
	},
	
	applyStyle: function(newStyle) {
		var style = newStyle || this.style || CIVerticalTabPanel.Style;
		var panel = this.element();
		this.tabColumnElement().setStyles({
			'background-color': style.get('tabColumnBackgroundColor')
		});
		this.tabColumnElement().getChildren().each(function(e) {
			e.setStyle('cursor', 'pointer');
		});
		this.contentColumnElement().setStyles({
			'background-color': style.get('contentColumnBackgroundColor'),
			'border-left-style': 'solid',
			'border-left-width': style.get('dividerWidth'),
			'border-left-color': style.get('dividerColor')
		});
	},
	
	unrender: function() {
		this.tabColumnElement().empty();
		this.contentColumnElement().empty();
		this.fireEvent(CIEvent.Unrendered);
	},
	
	render: function() {
		this.unrender();
		var i = 0;
		for (; i < this.tabs.length; i++) {
			var container = new Element('div', {
				'class':'CIVerticalTabPanelTabContainer'
			});
			this.tabColumnElement().adopt(container);
			var e = this.tabs[i].element(container);
			container.store('CIVerticalTabPanelIndex', i);
			container.addEvent('click', this._tabClicked.bind(this));
		}
		for (i = 0; i < this.content.length; i++) {
			var e = this.content[i].element(this.contentColumnElement());
			e.store('CIVerticalTabPanelIndex', i);
			e.hide();
		}
		this.fireEvent(CIEvent.Rendered);
	},
	
	_tabClicked: function(event) {
		this.fireEvent(CIEvent.Clicked, [event]);
		var tab = event.target.getParent('.CIVerticalTabPanelTabContainer');
		var index = tab.retrieve('CIVerticalTabPanelIndex');
		if (this.selectedContentElement) {
			CISelectionStyle.unselect(this.tabs[this.selectedIndex].element());
			this.selectedContentElement.hide();
		}
		this.setSelectedIndex(index);
		CISelectionStyle.select(this.tabs[index].element());
		this.setSelectedContentElement(this.content[index].element());
		this.selectedContentElement.show();
		this.fireEvent(CIEvent.Selected, [this.selectedIndex, this.selectedContentElement]);
	},
	
	selectTab: function(index) {
		var tab = this.tabs[index].element();
		this._tabClicked({ target: tab });
	}
});

CIVerticalTabPanel.Style = new CIStyle({
	tabColumnBackgroundColor: CIStyle.SourceBackgroundColor,
	contentColumnBackgroundColor: '#FFFFFF',
	dividerWidth: 2,
	dividerColor: CIStyle.DividerColor
});CITable.Style = new CIStyle({
	width: '100%',
	backgroundColor: '#FFFFFF',
	evenRowBackgroundColor: '#FFFFFF',
	oddRowBackgroundColor: '#F0F0F0',
	borderSize: 1,
	solidBorders: CIStyle.Left | CIStyle.Right | CIStyle.Bottom,
	borderColor: CIStyle.BorderColor
});
CITable.NakedStyle = CITable.Style.override({});

CISheet.TitleStyle = CITitle.NakedStyle.override({});

CIButton.Style = new CIStyle({
	height: 18,
	capWidth: 10,
	capsImage: '/cip/images/widgets/CIButton_caps.png',
	middleImage: '/cip/images/widgets/CIButton_mid.png',
	middleActiveImage: '/cip/images/widgets/CIButton_mid_active.png',
	textColor: CIStyle.TextColor
});
CIButton.PageStyle = new CIStyle({
	height: 18,
	textColor: '#AAA'
});

CIToolbar.Style = new CIStyle({
	backgroundColor: CIStyle.BackgroundColor,
	padding: 5,
	solidBorders: CIStyle.Left | CIStyle.Right | CIStyle.Bottom,
	borderColor: CIStyle.BorderColor,
	borderSize: 1,
	height: 18
});

CIIndicator.Style = new CIStyle({
	image: '/cip/images/widgets/CIIndicator.gif',
	width: 20, height: 16,
});window.addEvent('domready', function /*main*/ () {
	CIObject.implement(Chain);
	Element.implement(Chain);
	
	if (CIApplication.onDomReady) {
		CIApplication.onDomReady = CIApplication.onDomReady.bind(CIApplication);
		CIApplication.onDomReady();
	}
	
	$$('body')[0].addClass(Browser.Engine.name);
});
/*window.addEvent('keydown', function(event) {
	// Intercept control keys and set their state as being pressed
});
window.addEvent('keyup', function(event) {
	// Intercept control keys and set their state as not being pressed
});*/