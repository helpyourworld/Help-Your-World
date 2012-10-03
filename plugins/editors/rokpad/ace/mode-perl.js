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
define("ace/mode/perl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/perl_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/folding/cstyle"],function(c,e,a){var f=c("../lib/oop");
var d=c("./text").Mode;var h=c("../tokenizer").Tokenizer;var g=c("./perl_highlight_rules").PerlHighlightRules;var j=c("./matching_brace_outdent").MatchingBraceOutdent;
var b=c("../range").Range;var k=c("./folding/cstyle").FoldMode;var i=function(){this.$tokenizer=new h(new g().getRules());this.$outdent=new j();this.foldingRules=new k();
};f.inherits(i,d);(function(){this.toggleCommentLines=function(l,s,t,p){var r=true;var u=/^(\s*)#/;for(var q=t;q<=p;q++){if(!u.test(s.getLine(q))){r=false;
break;}}if(r){var n=new b(0,0,0,0);for(var q=t;q<=p;q++){var v=s.getLine(q);var o=v.match(u);n.start.row=q;n.end.row=q;n.end.column=o[0].length;s.replace(n,o[1]);
}}else{s.indentRows(t,p,"#");}};this.getNextLineIndent=function(q,m,o){var l=this.$getIndent(m);var p=this.$tokenizer.getLineTokens(m,q);var r=p.tokens;
if(r.length&&r[r.length-1].type=="comment"){return l;}if(q=="start"){var n=m.match(/^.*[\{\(\[\:]\s*$/);if(n){l+=o;}}return l;};this.checkOutdent=function(n,l,m){return this.$outdent.checkOutdent(l,m);
};this.autoOutdent=function(l,m,n){this.$outdent.autoOutdent(m,n);};}).call(i.prototype);e.Mode=i;});define("ace/mode/perl_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(d,c,e){var f=d("../lib/oop");
var g=d("../lib/lang");var b=d("./text_highlight_rules").TextHighlightRules;var a=function(){var j=g.arrayToMap(("base|constant|continue|else|elsif|for|foreach|format|goto|if|last|local|my|next|no|package|parent|redo|require|scalar|sub|unless|until|while|use|vars").split("|"));
var h=g.arrayToMap(("ARGV|ENV|INC|SIG").split("|"));var i=g.arrayToMap(("getprotobynumber|getprotobyname|getservbyname|gethostbyaddr|gethostbyname|getservbyport|getnetbyaddr|getnetbyname|getsockname|getpeername|setpriority|getprotoent|setprotoent|getpriority|endprotoent|getservent|setservent|endservent|sethostent|socketpair|getsockopt|gethostent|endhostent|setsockopt|setnetent|quotemeta|localtime|prototype|getnetent|endnetent|rewinddir|wantarray|getpwuid|closedir|getlogin|readlink|endgrent|getgrgid|getgrnam|shmwrite|shutdown|readline|endpwent|setgrent|readpipe|formline|truncate|dbmclose|syswrite|setpwent|getpwnam|getgrent|getpwent|ucfirst|sysread|setpgrp|shmread|sysseek|sysopen|telldir|defined|opendir|connect|lcfirst|getppid|binmode|syscall|sprintf|getpgrp|readdir|seekdir|waitpid|reverse|unshift|symlink|dbmopen|semget|msgrcv|rename|listen|chroot|msgsnd|shmctl|accept|unpack|exists|fileno|shmget|system|unlink|printf|gmtime|msgctl|semctl|values|rindex|substr|splice|length|msgget|select|socket|return|caller|delete|alarm|ioctl|index|undef|lstat|times|srand|chown|fcntl|close|write|umask|rmdir|study|sleep|chomp|untie|print|utime|mkdir|atan2|split|crypt|flock|chmod|BEGIN|bless|chdir|semop|shift|reset|link|stat|chop|grep|fork|dump|join|open|tell|pipe|exit|glob|warn|each|bind|sort|pack|eval|push|keys|getc|kill|seek|sqrt|send|wait|rand|tied|read|time|exec|recv|eof|chr|int|ord|exp|pos|pop|sin|log|abs|oct|hex|tie|cos|vec|END|ref|map|die|uc|lc|do").split("|"));
this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",merge:true,regex:'["].*\\\\$',next:"qqstring"},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",merge:true,regex:"['].*\\\\$",next:"qstring"},{token:"constant.numeric",regex:"0x[0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:function(k){if(j.hasOwnProperty(k)){return"keyword";
}else{if(h.hasOwnProperty(k)){return"constant.language";}else{if(i.hasOwnProperty(k)){return"support.function";}else{return"identifier";}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\.\\.\\.|\\|\\|=|>>=|<<=|<=>|&&=|=>|!~|\\^=|&=|\\|=|\\.=|x=|%=|\\/=|\\*=|\\-=|\\+=|=~|\\*\\*|\\-\\-|\\.\\.|\\|\\||&&|\\+\\+|\\->|!=|==|>=|<=|>>|<<|,|=|\\?\\:|\\^|\\||x|%|\\/|\\*|<|&|\\\\|~|!|>|\\.|\\-|\\+|\\-C|\\-b|\\-S|\\-u|\\-t|\\-p|\\-l|\\-d|\\-f|\\-g|\\-s|\\-z|\\-k|\\-e|\\-O|\\-T|\\-B|\\-M|\\-A|\\-X|\\-W|\\-c|\\-R|\\-o|\\-x|\\-w|\\-r|\\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:(?:\\\\.)|(?:[^"\\\\]))*?"',next:"start"},{token:"string",merge:true,regex:".+"}],qstring:[{token:"string",regex:"(?:(?:\\\\.)|(?:[^'\\\\]))*?'",next:"start"},{token:"string",merge:true,regex:".+"}]};
};f.inherits(a,b);c.PerlHighlightRules=a;});define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;
var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false;}return/^\s*\}/.test(g);};this.autoOutdent=function(k,l){var g=k.getLine(l);
var h=g.match(/^(\s*\})/);if(!h){return 0;}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0;}var f=this.$getIndent(k.getLine(j.row));
k.replace(new e(l,0,l,i-1),f);};this.$getIndent=function(f){var g=f.match(/^(\s+)/);if(g){return g[1];}return"";};}).call(a.prototype);b.MatchingBraceOutdent=a;
});define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(b,a,c){var d=b("../../lib/oop");
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
