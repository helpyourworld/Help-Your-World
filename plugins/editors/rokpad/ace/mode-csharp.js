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
define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(b,d,a){var f=b("../lib/oop");
var c=b("./text").Mode;var g=b("../tokenizer").Tokenizer;var e=b("./csharp_highlight_rules").CSharpHighlightRules;var i=b("./matching_brace_outdent").MatchingBraceOutdent;
var j=b("./behaviour/cstyle").CstyleBehaviour;var k=b("./folding/cstyle").FoldMode;var h=function(){this.$tokenizer=new g(new e().getRules());this.$outdent=new i();
this.$behaviour=new j();this.foldingRules=new k();};f.inherits(h,c);(function(){this.getNextLineIndent=function(q,m,o){var l=this.$getIndent(m);var p=this.$tokenizer.getLineTokens(m,q);
var r=p.tokens;if(r.length&&r[r.length-1].type=="comment"){return l;}if(q=="start"){var n=m.match(/^.*[\{\(\[]\s*$/);if(n){l+=o;}}return l;};this.checkOutdent=function(n,l,m){return this.$outdent.checkOutdent(l,m);
};this.autoOutdent=function(l,m,n){this.$outdent.autoOutdent(m,n);};this.createWorker=function(l){return null;};}).call(h.prototype);d.Mode=h;});define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");
var h=c("../lib/lang");var d=c("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=c("./text_highlight_rules").TextHighlightRules;var g=function(){var j=h.arrayToMap(("abstract|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic").split("|"));
var i=h.arrayToMap(("null|true|false").split("|"));this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},d.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",merge:true,next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(k){if(k=="this"){return"variable.language";
}else{if(j.hasOwnProperty(k)){return"keyword";}else{if(i.hasOwnProperty(k)){return"constant.language";}else{return"identifier";}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:".*?\\*\\/",next:"start"},{token:"comment",merge:true,regex:".+"}]};
this.embedRules(d,"doc-",[d.getEndRule("start")]);};f.inherits(g,a);b.CSharpHighlightRules=g;});define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,b,e){var f=c("../lib/oop");
var a=c("./text_highlight_rules").TextHighlightRules;var d=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc",merge:true,regex:"\\s+"},{token:"comment.doc",merge:true,regex:"TODO"},{token:"comment.doc",merge:true,regex:"[^@\\*]+"},{token:"comment.doc",merge:true,regex:"."}]};
};f.inherits(d,a);d.getStartRule=function(g){return{token:"comment.doc",merge:true,regex:"\\/\\*(?=\\*)",next:g};};d.getEndRule=function(g){return{token:"comment.doc",merge:true,regex:"\\*\\/",next:g};
};b.DocCommentHighlightRules=d;});define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;
var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false;}return/^\s*\}/.test(g);};this.autoOutdent=function(k,l){var g=k.getLine(l);
var h=g.match(/^(\s*\})/);if(!h){return 0;}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0;}var f=this.$getIndent(k.getLine(j.row));
k.replace(new e(l,0,l,i-1),f);};this.$getIndent=function(f){var g=f.match(/^(\s+)/);if(g){return g[1];}return"";};}).call(a.prototype);b.MatchingBraceOutdent=a;
});define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(c,a,d){var e=c("../../lib/oop");var f=c("../behaviour").Behaviour;
var b=function(){this.add("braces","insertion",function(h,j,m,p,r){if(r=="{"){var q=m.getSelectionRange();var k=p.doc.getTextRange(q);if(k!==""){return{text:"{"+k+"}",selection:false};
}else{return{text:"{}",selection:[1,1]};}}else{if(r=="}"){var s=m.getCursorPosition();var t=p.doc.getLine(s.row);var n=t.substring(s.column,s.column+1);
if(n=="}"){var g=p.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(g!==null){return{text:"",selection:[1,1]};}}}else{if(r=="\n"){var s=m.getCursorPosition();
var t=p.doc.getLine(s.row);var n=t.substring(s.column,s.column+1);if(n=="}"){var o=p.findMatchingBracket({row:s.row,column:s.column+1});if(!o){return null;
}var i=this.getNextLineIndent(h,t.substring(0,t.length-1),p.getTabString());var l=this.$getIndent(p.doc.getLine(o.row));return{text:"\n"+i+"\n"+l,selection:[1,i.length,1,i.length]};
}}}}});this.add("braces","deletion",function(l,k,j,m,h){var i=m.doc.getTextRange(h);if(!h.isMultiLine()&&i=="{"){var g=m.doc.getLine(h.start.row);var n=g.substring(h.end.column,h.end.column+1);
if(n=="}"){h.end.column++;return h;}}});this.add("parens","insertion",function(h,i,k,m,o){if(o=="("){var n=k.getSelectionRange();var j=m.doc.getTextRange(n);
if(j!==""){return{text:"("+j+")",selection:false};}else{return{text:"()",selection:[1,1]};}}else{if(o==")"){var p=k.getCursorPosition();var q=m.doc.getLine(p.row);
var l=q.substring(p.column,p.column+1);if(l==")"){var g=m.$findOpeningBracket(")",{column:p.column+1,row:p.row});if(g!==null){return{text:"",selection:[1,1]};
}}}}});this.add("parens","deletion",function(l,k,j,m,h){var i=m.doc.getTextRange(h);if(!h.isMultiLine()&&i=="("){var g=m.doc.getLine(h.start.row);var n=g.substring(h.start.column+1,h.start.column+2);
if(n==")"){h.end.column++;return h;}}});this.add("string_dquotes","insertion",function(h,k,n,q,u){if(u=='"'||u=="'"){var g=u;var s=n.getSelectionRange();
var l=q.doc.getTextRange(s);if(l!==""){return{text:g+l+g,selection:false};}else{var t=n.getCursorPosition();var w=q.doc.getLine(t.row);var v=w.substring(t.column-1,t.column);
if(v=="\\"){return null;}var p=q.getTokens(s.start.row);var i=0,j;var m=-1;for(var r=0;r<p.length;r++){j=p[r];if(j.type=="string"){m=-1;}else{if(m<0){m=j.value.indexOf(g);
}}if((j.value.length+i)>s.start.column){break;}i+=p[r].value.length;}if(!j||(m<0&&j.type!=="comment"&&(j.type!=="string"||((s.start.column!==j.value.length+i-1)&&j.value.lastIndexOf(g)===j.value.length-1)))){return{text:g+g,selection:[1,1]};
}else{if(j&&j.type==="string"){var o=w.substring(t.column,t.column+1);if(o==g){return{text:"",selection:[1,1]};}}}}}});this.add("string_dquotes","deletion",function(l,k,j,m,h){var i=m.doc.getTextRange(h);
if(!h.isMultiLine()&&(i=='"'||i=="'")){var g=m.doc.getLine(h.start.row);var n=g.substring(h.start.column+1,h.start.column+2);if(n=='"'){h.end.column++;
return h;}}});};e.inherits(b,f);a.CstyleBehaviour=b;});define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(b,a,c){var d=b("../../lib/oop");
var f=b("../../range").Range;var g=b("./fold_mode").FoldMode;var e=a.FoldMode=function(){};d.inherits(e,g);(function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;this.getFoldWidgetRange=function(o,k,p){var q=o.getLine(p);var m=q.match(this.foldingStartMarker);
if(m){var l=m.index;if(m[1]){return this.openingBracketBlock(o,m[1],p,l);}var n=o.getCommentFoldRange(p,l+m[0].length);n.end.column-=2;return n;}if(k!=="markbeginend"){return;
}var m=q.match(this.foldingStopMarker);if(m){var l=m.index+m[0].length;if(m[2]){var n=o.getCommentFoldRange(p,l);n.end.column-=2;return n;}var j={row:p,column:l};
var h=o.$findOpeningBracket(m[1],j);if(!h){return;}h.column++;j.column--;return f.fromPoints(h,j);}};}).call(e.prototype);});define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(b,a,c){var e=b("../../range").Range;
var d=a.FoldMode=function(){};(function(){this.foldingStartMarker=null;this.foldingStopMarker=null;this.getFoldWidget=function(h,g,i){var f=h.getLine(i);
if(this.foldingStartMarker.test(f)){return"start";}if(g=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(f)){return"end";}return"";
};this.getFoldWidgetRange=function(g,f,h){return null;};this.indentationBlock=function(l,p,g){var o=/^\s*/;var n=p;var j=p;var q=l.getLine(p);var h=g||q.length;
var i=q.match(o)[0].length;var m=l.getLength();while(++p<m){q=l.getLine(p);var f=q.match(o)[0].length;if(f==q.length){continue;}if(f<=i){break;}j=p;}if(j>n){var k=l.getLine(j).length;
return new e(n,h,j,k);}};this.openingBracketBlock=function(k,f,n,h,m,l){var g={row:n,column:h+1};var j=k.$findClosingBracket(f,g,m,l);if(!j){return;}var i=k.foldWidgets[j.row];
if(i==null){i=this.getFoldWidget(k,j.row);}if(i=="start"){j.row--;j.column=k.getLine(j.row).length;}return e.fromPoints(g,j);};}).call(d.prototype);});
