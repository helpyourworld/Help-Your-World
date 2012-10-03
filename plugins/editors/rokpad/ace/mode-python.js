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
define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"],function(c,e,a){var g=c("../lib/oop");
var d=c("./text").Mode;var h=c("../tokenizer").Tokenizer;var f=c("./python_highlight_rules").PythonHighlightRules;var j=c("./folding/pythonic").FoldMode;
var b=c("../range").Range;var i=function(){this.$tokenizer=new h(new f().getRules());this.foldingRules=new j("\\:");};g.inherits(i,d);(function(){this.toggleCommentLines=function(l,s,t,p){var r=true;
var u=/^(\s*)#/;for(var q=t;q<=p;q++){if(!u.test(s.getLine(q))){r=false;break;}}if(r){var n=new b(0,0,0,0);for(var q=t;q<=p;q++){var v=s.getLine(q);var o=v.match(u);
n.start.row=q;n.end.row=q;n.end.column=o[0].length;s.replace(n,o[1]);}}else{s.indentRows(t,p,"#");}};this.getNextLineIndent=function(q,m,o){var l=this.$getIndent(m);
var p=this.$tokenizer.getLineTokens(m,q);var r=p.tokens;if(r.length&&r[r.length-1].type=="comment"){return l;}if(q=="start"){var n=m.match(/^.*[\{\(\[\:]\s*$/);
if(n){l+=o;}}return l;};var k={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(o,l,m){if(m!=="\r\n"&&m!=="\r"&&m!=="\n"){return false;
}var p=this.$tokenizer.getLineTokens(l.trim(),o).tokens;if(!p){return false;}do{var n=p.pop();}while(n&&(n.type=="comment"||(n.type=="text"&&n.value.match(/^\s+$/))));
if(!n){return false;}return(n.type=="keyword"&&k[n.value]);};this.autoOutdent=function(n,o,p){p+=1;var l=this.$getIndent(o.getLine(p));var m=o.getTabString();
if(l.slice(-m.length)==m){o.remove(new b(p,l.length-m.length,p,l.length));}};}).call(i.prototype);e.Mode=i;});define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");
var g=c("../lib/lang");var a=c("./text_highlight_rules").TextHighlightRules;var d=function(){var m=g.arrayToMap(("and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield").split("|"));
var p=g.arrayToMap(("True|False|None|NotImplemented|Ellipsis|__debug__").split("|"));var k=g.arrayToMap(("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern").split("|"));
var w=g.arrayToMap(("").split("|"));var r="(?:r|u|ur|R|U|UR|Ur|uR)?";var o="(?:(?:[1-9]\\d*)|(?:0))";var t="(?:0[oO]?[0-7]+)";var i="(?:0[xX][\\dA-Fa-f]+)";
var j="(?:0[bB][01]+)";var l="(?:"+o+"|"+t+"|"+i+"|"+j+")";var q="(?:[eE][+-]?\\d+)";var v="(?:\\.\\d+)";var h="(?:\\d+)";var n="(?:(?:"+h+"?"+v+")|(?:"+h+"\\.))";
var u="(?:(?:"+n+"|"+h+")"+q+")";var s="(?:"+u+"|"+n+")";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:r+'"{3}(?:[^\\\\]|\\\\.)*?"{3}'},{token:"string",merge:true,regex:r+'"{3}.*$',next:"qqstring"},{token:"string",regex:r+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:r+"'{3}(?:[^\\\\]|\\\\.)*?'{3}"},{token:"string",merge:true,regex:r+"'{3}.*$",next:"qstring"},{token:"string",regex:r+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:"+s+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:s},{token:"constant.numeric",regex:l+"[lL]\\b"},{token:"constant.numeric",regex:l+"\\b"},{token:function(x){if(m.hasOwnProperty(x)){return"keyword";
}else{if(p.hasOwnProperty(x)){return"constant.language";}else{if(w.hasOwnProperty(x)){return"invalid.illegal";}else{if(k.hasOwnProperty(x)){return"support.function";
}else{if(x=="debugger"){return"invalid.deprecated";}else{return"identifier";}}}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?"{3}',next:"start"},{token:"string",merge:true,regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?'{3}",next:"start"},{token:"string",merge:true,regex:".+"}]};
};f.inherits(d,a);b.PythonHighlightRules=d;});define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(b,a,c){var d=b("../../lib/oop");
var f=b("./fold_mode").FoldMode;var e=a.FoldMode=function(g){this.foldingStartMarker=new RegExp("(?:([\\[{])|("+g+"))(?:\\s*)(?:#.*)?$");};d.inherits(e,f);
(function(){this.getFoldWidgetRange=function(j,i,k){var g=j.getLine(k);var h=g.match(this.foldingStartMarker);if(h){if(h[1]){return this.openingBracketBlock(j,h[1],k,h.index);
}if(h[2]){return this.indentationBlock(j,k,h.index+h[2].length);}return this.indentationBlock(j,k);}};}).call(e.prototype);});define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(b,a,c){var e=b("../../range").Range;
var d=a.FoldMode=function(){};(function(){this.foldingStartMarker=null;this.foldingStopMarker=null;this.getFoldWidget=function(h,g,i){var f=h.getLine(i);
if(this.foldingStartMarker.test(f)){return"start";}if(g=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(f)){return"end";}return"";
};this.getFoldWidgetRange=function(g,f,h){return null;};this.indentationBlock=function(l,p,g){var o=/^\s*/;var n=p;var j=p;var q=l.getLine(p);var h=g||q.length;
var i=q.match(o)[0].length;var m=l.getLength();while(++p<m){q=l.getLine(p);var f=q.match(o)[0].length;if(f==q.length){continue;}if(f<=i){break;}j=p;}if(j>n){var k=l.getLine(j).length;
return new e(n,h,j,k);}};this.openingBracketBlock=function(k,f,n,h,m,l){var g={row:n,column:h+1};var j=k.$findClosingBracket(f,g,m,l);if(!j){return;}var i=k.foldWidgets[j.row];
if(i==null){i=this.getFoldWidget(k,j.row);}if(i=="start"){j.row--;j.column=k.getLine(j.row).length;}return e.fromPoints(g,j);};}).call(d.prototype);});
