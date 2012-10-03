/*
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 */
define("ace/mode/lua",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/lua_highlight_rules"],function(d,b,f){var h=d("../lib/oop");
var a=d("./text").Mode;var c=d("../tokenizer").Tokenizer;var e=d("./lua_highlight_rules").LuaHighlightRules;var g=function(){this.$tokenizer=new c(new e().getRules());
};h.inherits(g,a);(function(){this.getNextLineIndent=function(j,t,k){var l=this.$getIndent(t);var r=this.$tokenizer.getLineTokens(t,j);var s=r.tokens;var q=["function","then","do","repeat"];
if(j=="start"){var p=t.match(/^.*[\{\(\[]\s*$/);if(p){l+=k;}else{for(var o in s){var m=s[o];if(m.type!="keyword"){continue;}var n=q.indexOf(m.value);if(n!=-1){l+=k;
break;}}}}return l;};}).call(g.prototype);b.Mode=g;});define("ace/mode/lua_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");
var g=c("../lib/lang");var a=c("./text_highlight_rules").TextHighlightRules;var d=function(){var n=g.arrayToMap(("break|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while|or|and|not").split("|"));
var q=g.arrayToMap(("true|false|nil|_G|_VERSION").split("|"));var l=g.arrayToMap(("string|xpcall|package|tostring|print|os|unpack|require|getfenv|setmetatable|next|assert|tonumber|io|rawequal|collectgarbage|getmetatable|module|rawset|math|debug|pcall|table|newproxy|type|coroutine|_G|select|gcinfo|pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|load|error|loadfile|sub|upper|len|gfind|rep|find|match|char|dump|gmatch|reverse|byte|format|gsub|lower|preload|loadlib|loaded|loaders|cpath|config|path|seeall|exit|setlocale|date|getenv|difftime|remove|time|clock|tmpname|rename|execute|lines|write|close|flush|open|output|type|read|stderr|stdin|input|stdout|popen|tmpfile|log|max|acos|huge|ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|gethook|setmetatable|setlocal|traceback|setfenv|getinfo|setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|foreachi|maxn|foreach|concat|sort|remove|resume|yield|status|wrap|create|running").split("|"));
var r=g.arrayToMap(("string|package|os|io|math|debug|table|coroutine").split("|"));var k=g.arrayToMap(("__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber").split("|"));
var w=g.arrayToMap(("").split("|"));var u=g.arrayToMap(("setn|foreach|foreachi|gcinfo|log10|maxn").split("|"));var s="";var p="(?:(?:[1-9]\\d*)|(?:0))";
var j="(?:0[xX][\\dA-Fa-f]+)";var m="(?:"+p+"|"+j+")";var v="(?:\\.\\d+)";var h="(?:\\d+)";var o="(?:(?:"+h+"?"+v+")|(?:"+h+"\\.))";var t="(?:"+o+")";var i=[];
this.$rules={start:[{token:"comment",regex:s+"\\-\\-\\[\\[.*\\]\\]"},{token:"comment",regex:s+"\\-\\-\\[\\=\\[.*\\]\\=\\]"},{token:"comment",regex:s+"\\-\\-\\[\\={2}\\[.*\\]\\={2}\\]"},{token:"comment",regex:s+"\\-\\-\\[\\={3}\\[.*\\]\\={3}\\]"},{token:"comment",regex:s+"\\-\\-\\[\\={4}\\[.*\\]\\={4}\\]"},{token:"comment",regex:s+"\\-\\-\\[\\={5}\\=*\\[.*\\]\\={5}\\=*\\]"},{token:"comment",regex:s+"\\-\\-\\[\\[.*$",merge:true,next:"qcomment"},{token:"comment",regex:s+"\\-\\-\\[\\=\\[.*$",merge:true,next:"qcomment1"},{token:"comment",regex:s+"\\-\\-\\[\\={2}\\[.*$",merge:true,next:"qcomment2"},{token:"comment",regex:s+"\\-\\-\\[\\={3}\\[.*$",merge:true,next:"qcomment3"},{token:"comment",regex:s+"\\-\\-\\[\\={4}\\[.*$",merge:true,next:"qcomment4"},{token:function(z){var y=/\-\-\[(\=+)\[/,x;
if((x=y.exec(z))!=null&&(x=x[1])!=undefined){i.push(x.length);}return"comment";},regex:s+"\\-\\-\\[\\={5}\\=*\\[.*$",merge:true,next:"qcomment5"},{token:"comment",regex:"\\-\\-.*$"},{token:"string",regex:s+"\\[\\[.*\\]\\]"},{token:"string",regex:s+"\\[\\=\\[.*\\]\\=\\]"},{token:"string",regex:s+"\\[\\={2}\\[.*\\]\\={2}\\]"},{token:"string",regex:s+"\\[\\={3}\\[.*\\]\\={3}\\]"},{token:"string",regex:s+"\\[\\={4}\\[.*\\]\\={4}\\]"},{token:"string",regex:s+"\\[\\={5}\\=*\\[.*\\]\\={5}\\=*\\]"},{token:"string",regex:s+"\\[\\[.*$",merge:true,next:"qstring"},{token:"string",regex:s+"\\[\\=\\[.*$",merge:true,next:"qstring1"},{token:"string",regex:s+"\\[\\={2}\\[.*$",merge:true,next:"qstring2"},{token:"string",regex:s+"\\[\\={3}\\[.*$",merge:true,next:"qstring3"},{token:"string",regex:s+"\\[\\={4}\\[.*$",merge:true,next:"qstring4"},{token:function(z){var y=/\[(\=+)\[/,x;
if((x=y.exec(z))!=null&&(x=x[1])!=undefined){i.push(x.length);}return"string";},regex:s+"\\[\\={5}\\=*\\[.*$",merge:true,next:"qstring5"},{token:"string",regex:s+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:s+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:t},{token:"constant.numeric",regex:m+"\\b"},{token:function(x){if(n.hasOwnProperty(x)){return"keyword";
}else{if(q.hasOwnProperty(x)){return"constant.language";}else{if(w.hasOwnProperty(x)){return"invalid.illegal";}else{if(r.hasOwnProperty(x)){return"constant.library";
}else{if(u.hasOwnProperty(x)){return"invalid.deprecated";}else{if(l.hasOwnProperty(x)){return"support.function";}else{if(k.hasOwnProperty(x)){return"support.function";
}else{return"identifier";}}}}}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qcomment:[{token:"comment",regex:"(?:[^\\\\]|\\\\.)*?\\]\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qcomment1:[{token:"comment",regex:"(?:[^\\\\]|\\\\.)*?\\]\\=\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qcomment2:[{token:"comment",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={2}\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qcomment3:[{token:"comment",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={3}\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qcomment4:[{token:"comment",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={4}\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qcomment5:[{token:function(B){var A=/\](\=+)\]/,C=this.rules.qcomment5[0],x;
C.next="start";if((x=A.exec(B))!=null&&(x=x[1])!=undefined){var z=x.length,y;if((y=i.pop())!=z){i.push(y);C.next="qcomment5";}}return"comment";},regex:"(?:[^\\\\]|\\\\.)*?\\]\\={5}\\=*\\]",next:"start"},{token:"comment",merge:true,regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?\\]\\]",next:"start"},{token:"string",merge:true,regex:".+"}],qstring1:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?\\]\\=\\]",next:"start"},{token:"string",merge:true,regex:".+"}],qstring2:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={2}\\]",next:"start"},{token:"string",merge:true,regex:".+"}],qstring3:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={3}\\]",next:"start"},{token:"string",merge:true,regex:".+"}],qstring4:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?\\]\\={4}\\]",next:"start"},{token:"string",merge:true,regex:".+"}],qstring5:[{token:function(B){var A=/\](\=+)\]/,C=this.rules.qstring5[0],x;
C.next="start";if((x=A.exec(B))!=null&&(x=x[1])!=undefined){var z=x.length,y;if((y=i.pop())!=z){i.push(y);C.next="qstring5";}}return"string";},regex:"(?:[^\\\\]|\\\\.)*?\\]\\={5}\\=*\\]",next:"start"},{token:"string",merge:true,regex:".+"}]};
};f.inherits(d,a);b.LuaHighlightRules=d;});