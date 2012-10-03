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
define("ace/mode/latex",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/latex_highlight_rules","ace/range"],function(d,f,b){var g=d("../lib/oop");
var e=d("./text").Mode;var h=d("../tokenizer").Tokenizer;var a=d("./latex_highlight_rules").LatexHighlightRules;var c=d("../range").Range;var i=function(){this.$tokenizer=new h(new a().getRules());
};g.inherits(i,e);(function(){this.toggleCommentLines=function(j,r,s,o){var q=true;var n=/^(\s*)\%/;for(var p=s;p<=o;p++){if(!n.test(r.getLine(p))){q=false;
break;}}if(q){var k=new c(0,0,0,0);for(var p=s;p<=o;p++){var t=r.getLine(p);var l=t.match(n);k.start.row=p;k.end.row=p;k.end.column=l[0].length;r.replace(k,l[1]);
}}else{r.indentRows(s,o,"%");}};this.getNextLineIndent=function(l,j,k){return this.$getIndent(j);};}).call(i.prototype);f.Mode=i;});define("ace/mode/latex_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(c,b,d){var e=c("../lib/oop");
var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){this.$rules={start:[{token:"keyword",regex:"\\\\(?:[^a-zA-Z]|[a-zA-Z]+)",},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"string",regex:"\\$(?:(?:\\\\.)|(?:[^\\$\\\\]))*?\\$"},{token:"comment",regex:"%.*$"}]};
};e.inherits(f,a);b.LatexHighlightRules=f;});