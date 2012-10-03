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
define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml"],function(d,g,c){var h=d("../lib/oop");
var e=d("./text").Mode;var i=d("../tokenizer").Tokenizer;var b=d("./xml_highlight_rules").XmlHighlightRules;var a=d("./behaviour/xml").XmlBehaviour;var f=d("./folding/xml").FoldMode;
var j=function(){this.$tokenizer=new i(new b().getRules());this.$behaviour=new a();this.foldingRules=new f();};h.inherits(j,e);(function(){this.getNextLineIndent=function(m,k,l){return this.$getIndent(k);
};}).call(j.prototype);g.Mode=j;});define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/xml_util","ace/mode/text_highlight_rules"],function(d,c,e){var f=d("../lib/oop");
var g=d("./xml_util");var b=d("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:"text",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:"xml_pe",regex:"<\\?.*?\\?>"},{token:"comment",merge:true,regex:"<\\!--",next:"comment"},{token:"xml_pe",regex:"<\\!.*?>"},{token:"meta.tag",regex:"<\\/?",next:"tag"},{token:"text",regex:"\\s+"},{token:"constant.character.entity",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"},{token:"text",regex:"[^<]+"}],cdata:[{token:"text",regex:"\\]\\]>",next:"start"},{token:"text",regex:"\\s+"},{token:"text",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment",regex:".*?-->",next:"start"},{token:"comment",merge:true,regex:".+"}]};
g.tag(this.$rules,"tag","start");};f.inherits(a,b);c.XmlHighlightRules=a;});define("ace/mode/xml_util",["require","exports","module","ace/lib/lang"],function(e,c,g){var h=e("../lib/lang");
var f=h.arrayToMap(("button|form|input|label|select|textarea").split("|"));var b=h.arrayToMap(("table|tbody|td|tfoot|th|tr").split("|"));function d(i){return[{token:"string",regex:'".*?"'},{token:"string",merge:true,regex:'["].*',next:i+"_qqstring"},{token:"string",regex:"'.*?'"},{token:"string",merge:true,regex:"['].*",next:i+"_qstring"}];
}function a(i,j){return[{token:"string",merge:true,regex:".*?"+i,next:j},{token:"string",merge:true,regex:".+"}];}c.tag=function(i,j,k){i[j]=[{token:"text",regex:"\\s+"},{token:function(l){if(l==="a"){return"meta.tag.anchor";
}else{if(l==="img"){return"meta.tag.image";}else{if(l==="script"){return"meta.tag.script";}else{if(l==="style"){return"meta.tag.style";}else{if(f.hasOwnProperty(l.toLowerCase())){return"meta.tag.form";
}else{if(b.hasOwnProperty(l.toLowerCase())){return"meta.tag.table";}else{return"meta.tag";}}}}}}},merge:true,regex:"[-_a-zA-Z0-9:]+",next:j+"_embed_attribute_list"},{token:"empty",regex:"",next:j+"_embed_attribute_list"}];
i[j+"_qstring"]=a("'",j+"_embed_attribute_list");i[j+"_qqstring"]=a('"',j+"_embed_attribute_list");i[j+"_embed_attribute_list"]=[{token:"meta.tag",merge:true,regex:"/?>",next:k},{token:"keyword.operator",regex:"="},{token:"entity.other.attribute-name",regex:"[-_a-zA-Z0-9:]+"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"text",regex:"\\s+"}].concat(d(j));
};});define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(c,a,d){var f=c("../../lib/oop");
var g=c("../behaviour").Behaviour;var b=c("./cstyle").CstyleBehaviour;var e=function(){this.inherit(b,["string_dquotes"]);this.add("brackets","insertion",function(h,k,n,p,r){if(r=="<"){var q=n.getSelectionRange();
var l=p.doc.getTextRange(q);if(l!==""){return false;}else{return{text:"<>",selection:[1,1]};}}else{if(r==">"){var s=n.getCursorPosition();var t=p.doc.getLine(s.row);
var o=t.substring(s.column,s.column+1);if(o==">"){return{text:"",selection:[1,1]};}}else{if(r=="\n"){var s=n.getCursorPosition();var t=p.doc.getLine(s.row);
var j=t.substring(s.column,s.column+2);if(j=="</"){var i=this.$getIndent(p.doc.getLine(s.row))+p.getTabString();var m=this.$getIndent(p.doc.getLine(s.row));
return{text:"\n"+i+"\n"+m,selection:[1,i.length,1,i.length]};}}}}});};f.inherits(e,g);a.XmlBehaviour=e;});define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour"],function(c,a,d){var e=c("../../lib/oop");
var f=c("../behaviour").Behaviour;var b=function(){this.add("braces","insertion",function(h,j,m,p,r){if(r=="{"){var q=m.getSelectionRange();var k=p.doc.getTextRange(q);
if(k!==""){return{text:"{"+k+"}",selection:false};}else{return{text:"{}",selection:[1,1]};}}else{if(r=="}"){var s=m.getCursorPosition();var t=p.doc.getLine(s.row);
var n=t.substring(s.column,s.column+1);if(n=="}"){var g=p.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(g!==null){return{text:"",selection:[1,1]};
}}}else{if(r=="\n"){var s=m.getCursorPosition();var t=p.doc.getLine(s.row);var n=t.substring(s.column,s.column+1);if(n=="}"){var o=p.findMatchingBracket({row:s.row,column:s.column+1});
if(!o){return null;}var i=this.getNextLineIndent(h,t.substring(0,t.length-1),p.getTabString());var l=this.$getIndent(p.doc.getLine(o.row));return{text:"\n"+i+"\n"+l,selection:[1,i.length,1,i.length]};
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
return h;}}});};e.inherits(b,f);a.CstyleBehaviour=b;});define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/range","ace/mode/folding/fold_mode","ace/token_iterator"],function(e,f,c){var g=e("../../lib/oop");
var b=e("../../lib/lang");var d=e("../../range").Range;var i=e("./fold_mode").FoldMode;var h=e("../../token_iterator").TokenIterator;var a=f.FoldMode=function(j){i.call(this);
this.voidElements=j||{};};g.inherits(a,i);(function(){this.getFoldWidget=function(l,k,m){var j=this._getFirstTagInLine(l,m);if(j.closing){return k=="markbeginend"?"end":"";
}if(!j.tagName||this.voidElements[j.tagName.toLowerCase()]){return"";}if(j.selfClosing){return"";}if(j.value.indexOf("/"+j.tagName)!==-1){return"";}return"start";
};this._getFirstTagInLine=function(n,o){var m=n.getTokens(o);var l="";for(var k=0;k<m.length;k++){var j=m[k];if(j.type.indexOf("meta.tag")===0){l+=j.value;
}else{l+=b.stringRepeat(" ",j.value.length);}}return this._parseTag(l);};this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/;this._parseTag=function(j){var k=this.tagRe.exec(j);
var l=this.tagRe.lastIndex||0;this.tagRe.lastIndex=0;return{value:j,match:k?k[2]:"",closing:k?!!k[3]:false,selfClosing:k?!!k[5]||k[2]=="/>":false,tagName:k?k[4]:"",column:k[1]?l+k[1].length:l};
};this._readTagForward=function(l){var k=l.getCurrentToken();if(!k){return null;}var m="";var n;do{if(k.type.indexOf("meta.tag")===0){if(!n){var n={row:l.getCurrentTokenRow(),column:l.getCurrentTokenColumn()};
}m+=k.value;if(m.indexOf(">")!==-1){var j=this._parseTag(m);j.start=n;j.end={row:l.getCurrentTokenRow(),column:l.getCurrentTokenColumn()+k.value.length};
l.stepForward();return j;}}}while(k=l.stepForward());return null;};this._readTagBackward=function(m){var l=m.getCurrentToken();if(!l){return null;}var n="";
var k;do{if(l.type.indexOf("meta.tag")===0){if(!k){k={row:m.getCurrentTokenRow(),column:m.getCurrentTokenColumn()+l.value.length};}n=l.value+n;if(n.indexOf("<")!==-1){var j=this._parseTag(n);
j.end=k;j.start={row:m.getCurrentTokenRow(),column:m.getCurrentTokenColumn()};m.stepBackward();return j;}}}while(l=m.stepBackward());return null;};this._pop=function(k,j){while(k.length){var l=k[k.length-1];
if(!j||l.tagName==j.tagName){return k.pop();}else{if(this.voidElements[j.tagName]){return;}else{if(this.voidElements[l.tagName]){k.pop();continue;}else{return null;
}}}}};this.getFoldWidgetRange=function(o,m,r){var l=this._getFirstTagInLine(o,r);if(!l.match){return null;}var p=l.closing||l.selfClosing;var q=[];var s;
if(!p){var n=new h(o,r,l.column);var j={row:r,column:l.column+l.tagName.length+2};while(s=this._readTagForward(n)){if(s.selfClosing){if(!q.length){s.start.column+=s.tagName.length+2;
s.end.column-=2;return d.fromPoints(s.start,s.end);}else{continue;}}if(s.closing){this._pop(q,s);if(q.length==0){return d.fromPoints(j,s.start);}}else{q.push(s);
}}}else{var n=new h(o,r,l.column+l.match.length);var k={row:r,column:l.column};while(s=this._readTagBackward(n)){if(s.selfClosing){if(!q.length){s.start.column+=s.tagName.length+2;
s.end.column-=2;return d.fromPoints(s.start,s.end);}else{continue;}}if(!s.closing){this._pop(q,s);if(q.length==0){s.start.column+=s.tagName.length+2;return d.fromPoints(s.start,k);
}}else{q.push(s);}}}};}).call(a.prototype);});define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(b,a,c){var e=b("../../range").Range;
var d=a.FoldMode=function(){};(function(){this.foldingStartMarker=null;this.foldingStopMarker=null;this.getFoldWidget=function(h,g,i){var f=h.getLine(i);
if(this.foldingStartMarker.test(f)){return"start";}if(g=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(f)){return"end";}return"";
};this.getFoldWidgetRange=function(g,f,h){return null;};this.indentationBlock=function(l,p,g){var o=/^\s*/;var n=p;var j=p;var q=l.getLine(p);var h=g||q.length;
var i=q.match(o)[0].length;var m=l.getLength();while(++p<m){q=l.getLine(p);var f=q.match(o)[0].length;if(f==q.length){continue;}if(f<=i){break;}j=p;}if(j>n){var k=l.getLine(j).length;
return new e(n,h,j,k);}};this.openingBracketBlock=function(k,f,n,h,m,l){var g={row:n,column:h+1};var j=k.$findClosingBracket(f,g,m,l);if(!j){return;}var i=k.foldWidgets[j.row];
if(i==null){i=this.getFoldWidget(k,j.row);}if(i=="start"){j.row--;j.column=k.getLine(j.row).length;}return e.fromPoints(g,j);};}).call(d.prototype);});
