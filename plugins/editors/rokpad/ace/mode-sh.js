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
define("ace/mode/sh",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/sh_highlight_rules","ace/range"],function(c,f,a){var g=c("../lib/oop");
var e=c("./text").Mode;var h=c("../tokenizer").Tokenizer;var d=c("./sh_highlight_rules").ShHighlightRules;var b=c("../range").Range;var i=function(){this.$tokenizer=new h(new d().getRules());
};g.inherits(i,e);(function(){this.toggleCommentLines=function(k,r,s,o){var q=true;var t=/^(\s*)#/;for(var p=s;p<=o;p++){if(!t.test(r.getLine(p))){q=false;
break;}}if(q){var l=new b(0,0,0,0);for(var p=s;p<=o;p++){var u=r.getLine(p);var n=u.match(t);l.start.row=p;l.end.row=p;l.end.column=n[0].length;r.replace(l,n[1]);
}}else{r.indentRows(s,o,"#");}};this.getNextLineIndent=function(p,l,n){var k=this.$getIndent(l);var o=this.$tokenizer.getLineTokens(l,p);var q=o.tokens;
if(q.length&&q[q.length-1].type=="comment"){return k;}if(p=="start"){var m=l.match(/^.*[\{\(\[\:]\s*$/);if(m){k+=n;}}return k;};var j={pass:1,"return":1,raise:1,"break":1,"continue":1};
this.checkOutdent=function(n,k,l){if(l!=="\r\n"&&l!=="\r"&&l!=="\n"){return false;}var o=this.$tokenizer.getLineTokens(k.trim(),n).tokens;if(!o){return false;
}do{var m=o.pop();}while(m&&(m.type=="comment"||(m.type=="text"&&m.value.match(/^\s+$/))));if(!m){return false;}return(m.type=="keyword"&&j[m.value]);};
this.autoOutdent=function(m,n,o){o+=1;var k=this.$getIndent(n.getLine(o));var l=n.getTabString();if(k.slice(-l.length)==l){n.remove(new b(o,k.length-l.length,o,k.length));
}};}).call(i.prototype);f.Mode=i;});define("ace/mode/sh_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(c,b,d){var e=c("../lib/oop");
var g=c("../lib/lang");var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){var l=g.arrayToMap(("!|{|}|case|do|done|elif|else|esac|fi|for|if|in|then|until|while|&|;|export|local|read|typeset|unset|elif|select|set").split("|"));
var m=g.arrayToMap(("[|]|alias|bg|bind|break|builtin|cd|command|compgen|complete|continue|dirs|disown|echo|enable|eval|exec|exit|fc|fg|getopts|hash|help|history|jobs|kill|let|logout|popd|printf|pushd|pwd|return|set|shift|shopt|source|suspend|test|times|trap|type|ulimit|umask|unalias|wait").split("|"));
var n="(?:(?:[1-9]\\d*)|(?:0))";var t="(?:\\.\\d+)";var h="(?:\\d+)";var o="(?:(?:"+h+"?"+t+")|(?:"+h+"\\.))";var s="(?:(?:"+o+"|"+h+"))";var q="(?:"+s+"|"+o+")";
var j="(?:&"+h+")";var p="[a-zA-Z][a-zA-Z0-9_]*";var k="(?:(?:\\$"+p+")|(?:"+p+"=))";var r="(?:\\$(?:SHLVL|\\$|\\!|\\?))";var i="(?:"+p+"\\s*\\(\\))";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"variable.language",regex:r},{token:"variable",regex:k},{token:"support.function",regex:i,},{token:"support.function",regex:j},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:q},{token:"constant.numeric",regex:n+"\\b"},{token:function(u){if(l.hasOwnProperty(u)){return"keyword";
}else{if(m.hasOwnProperty(u)){return"constant.language";}else{if(u=="debugger"){return"invalid.deprecated";}else{return"identifier";}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}]};
};e.inherits(f,a);b.ShHighlightRules=f;});