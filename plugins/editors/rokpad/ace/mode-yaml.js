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
define("ace/mode/yaml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/yaml_highlight_rules","ace/mode/matching_brace_outdent"],function(b,d,a){var e=b("../lib/oop");
var c=b("./text").Mode;var g=b("../tokenizer").Tokenizer;var f=b("./yaml_highlight_rules").YamlHighlightRules;var i=b("./matching_brace_outdent").MatchingBraceOutdent;
var h=function(){this.$tokenizer=new g(new f().getRules());this.$outdent=new i();};e.inherits(h,c);(function(){this.getNextLineIndent=function(n,k,m){var j=this.$getIndent(k);
if(n=="start"){var l=k.match(/^.*[\{\(\[]\s*$/);if(l){j+=m;}}return j;};this.checkOutdent=function(l,j,k){return this.$outdent.checkOutdent(j,k);};this.autoOutdent=function(j,k,l){this.$outdent.autoOutdent(k,l);
};}).call(h.prototype);d.Mode=h;});define("ace/mode/yaml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(d,b,e){var f=d("../lib/oop");
var a=d("./text_highlight_rules").TextHighlightRules;var c=function(){this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"comment",regex:"^---"},{token:"variable",regex:"[&\\*][a-zA-Z0-9-_]+"},{token:["identifier","text"],regex:"(\\w+\\s*:)(\\w*)"},{token:"keyword.operator",regex:"<<\\w*:\\w*"},{token:"keyword.operator",regex:"-\\s*(?=[{])"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:true,regex:"[\\|>]\\w*",next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false|yes|no)\\b"},{token:"invalid.illegal",regex:"\\/\\/.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:"(?=(?:(?:\\\\.)|(?:[^:]))*?:)",next:"start"},{token:"string",merge:true,regex:".+"}]};
};f.inherits(c,a);b.YamlHighlightRules=c;});define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;
var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false;}return/^\s*\}/.test(g);};this.autoOutdent=function(k,l){var g=k.getLine(l);
var h=g.match(/^(\s*\})/);if(!h){return 0;}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0;}var f=this.$getIndent(k.getLine(j.row));
k.replace(new e(l,0,l,i-1),f);};this.$getIndent=function(f){var g=f.match(/^(\s+)/);if(g){return g[1];}return"";};}).call(a.prototype);b.MatchingBraceOutdent=a;
});