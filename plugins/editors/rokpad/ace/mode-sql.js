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
define("ace/mode/sql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/sql_highlight_rules","ace/range"],function(c,e,a){var f=c("../lib/oop");
var d=c("./text").Mode;var g=c("../tokenizer").Tokenizer;var h=c("./sql_highlight_rules").SqlHighlightRules;var b=c("../range").Range;var i=function(){this.$tokenizer=new g(new h().getRules());
};f.inherits(i,d);(function(){this.toggleCommentLines=function(k,r,s,n){var p=true;var q=[];var t=/^(\s*)--/;for(var o=s;o<=n;o++){if(!t.test(r.getLine(o))){p=false;
break;}}if(p){var j=new b(0,0,0,0);for(var o=s;o<=n;o++){var u=r.getLine(o);var l=u.match(t);j.start.row=o;j.end.row=o;j.end.column=l[0].length;r.replace(j,l[1]);
}}else{r.indentRows(s,n,"--");}};}).call(i.prototype);e.Mode=i;});define("ace/mode/sql_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");
var g=c("../lib/lang");var a=c("./text_highlight_rules").TextHighlightRules;var d=function(){var j=g.arrayToMap(("select|from|where|and|or|group|by|order|limit|offset|having|as|case|when|else|end|type|left|right|join|on|outer|desc|asc").split("|"));
var h=g.arrayToMap(("true|false|null").split("|"));var i=g.arrayToMap(("count|min|max|avg|sum|rank|now|coalesce").split("|"));this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*"'},{token:"string",regex:"'.*'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:function(k){k=k.toLowerCase();
if(j.hasOwnProperty(k)){return"keyword";}else{if(h.hasOwnProperty(k)){return"constant.language";}else{if(i.hasOwnProperty(k)){return"support.function";
}else{return"identifier";}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]};
};f.inherits(d,a);b.SqlHighlightRules=d;});