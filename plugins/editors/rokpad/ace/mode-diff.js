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
define("ace/mode/diff",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/diff_highlight_rules","ace/mode/folding/diff"],function(c,f,b){var g=c("../lib/oop");
var e=c("./text").Mode;var h=c("../tokenizer").Tokenizer;var d=c("./diff_highlight_rules").DiffHighlightRules;var a=c("./folding/diff").FoldMode;var i=function(){this.$tokenizer=new h(new d().getRules(),"i");
this.foldingRules=new a(["diff","index","\\+{3}","@@|\\*{5}"],"i");};g.inherits(i,e);(function(){}).call(i.prototype);f.Mode=i;});define("ace/mode/diff_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,b,d){var e=c("../lib/oop");
var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){this.$rules={start:[{regex:"^(?:\\*{15}|={67}|-{3}|\\+{3})$",token:"punctuation.definition.separator.diff",name:"keyword"},{regex:"^(@@)(\\s*.+?\\s*)(@@)(.*)$",token:["constant","constant.numeric","constant","comment.doc.tag"]},{regex:"^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",token:["constant.numeric","punctuation.definition.range.diff","constant.function","constant.numeric","punctuation.definition.range.diff","invalid"],name:"meta."},{regex:"^(?:(\\-{3}|\\+{3}|\\*{3})( .+))$",token:["constant.numeric","meta.tag"]},{regex:"^([!+>])(.*?)(\\s*)$",token:["support.constant","text","invalid"],},{regex:"^([<\\-])(.*?)(\\s*)$",token:["support.function","string","invalid"],},{regex:"^(diff)(\\s+--\\w+)?(.+?)( .+)?$",token:["variable","variable","keyword","variable"]},{regex:"^Index.+$",token:"variable"},{regex:"^(.*?)(\\s*)$",token:["invisible","invalid"]}]};
};e.inherits(f,a);b.DiffHighlightRules=f;});define("ace/mode/folding/diff",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(b,a,c){var d=b("../../lib/oop");
var g=b("./fold_mode").FoldMode;var f=b("../../range").Range;var e=a.FoldMode=function(i,h){this.regExpList=i;this.flag=h;this.foldingStartMarker=RegExp("^("+i.join("|")+")",this.flag);
};d.inherits(e,g);(function(){this.getFoldWidgetRange=function(n,k,q){var r=n.getLine(q);var h={row:q,column:r.length};var o=this.regExpList;for(var m=1;
m<=o.length;m++){var p=RegExp("^("+o.slice(0,m).join("|")+")",this.flag);if(p.test(r)){break;}}for(var j=n.getLength();++q<j;){r=n.getLine(q);if(p.test(r)){break;
}}if(q==h.row+1){return;}return f.fromPoints(h,{row:q-1,column:r.length});};}).call(e.prototype);});define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(b,a,c){var e=b("../../range").Range;
var d=a.FoldMode=function(){};(function(){this.foldingStartMarker=null;this.foldingStopMarker=null;this.getFoldWidget=function(h,g,i){var f=h.getLine(i);
if(this.foldingStartMarker.test(f)){return"start";}if(g=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(f)){return"end";}return"";
};this.getFoldWidgetRange=function(g,f,h){return null;};this.indentationBlock=function(l,p,g){var o=/^\s*/;var n=p;var j=p;var q=l.getLine(p);var h=g||q.length;
var i=q.match(o)[0].length;var m=l.getLength();while(++p<m){q=l.getLine(p);var f=q.match(o)[0].length;if(f==q.length){continue;}if(f<=i){break;}j=p;}if(j>n){var k=l.getLine(j).length;
return new e(n,h,j,k);}};this.openingBracketBlock=function(k,f,n,h,m,l){var g={row:n,column:h+1};var j=k.$findClosingBracket(f,g,m,l);if(!j){return;}var i=k.foldWidgets[j.row];
if(i==null){i=this.getFoldWidget(k,j.row);}if(i=="start"){j.row--;j.column=k.getLine(j.row).length;}return e.fromPoints(g,j);};}).call(d.prototype);});
