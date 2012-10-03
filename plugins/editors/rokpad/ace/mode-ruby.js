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
define("ace/mode/ruby",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/ruby_highlight_rules","ace/mode/matching_brace_outdent","ace/range"],function(c,e,a){var f=c("../lib/oop");
var d=c("./text").Mode;var g=c("../tokenizer").Tokenizer;var i=c("./ruby_highlight_rules").RubyHighlightRules;var j=c("./matching_brace_outdent").MatchingBraceOutdent;
var b=c("../range").Range;var h=function(){this.$tokenizer=new g(new i().getRules());this.$outdent=new j();};f.inherits(h,d);(function(){this.toggleCommentLines=function(k,r,s,o){var q=true;
var t=/^(\s*)#/;for(var p=s;p<=o;p++){if(!t.test(r.getLine(p))){q=false;break;}}if(q){var l=new b(0,0,0,0);for(var p=s;p<=o;p++){var u=r.getLine(p);var n=u.match(t);
l.start.row=p;l.end.row=p;l.end.column=n[0].length;r.replace(l,n[1]);}}else{r.indentRows(s,o,"#");}};this.getNextLineIndent=function(p,l,n){var k=this.$getIndent(l);
var o=this.$tokenizer.getLineTokens(l,p);var q=o.tokens;if(q.length&&q[q.length-1].type=="comment"){return k;}if(p=="start"){var m=l.match(/^.*[\{\(\[]\s*$/);
if(m){k+=n;}}return k;};this.checkOutdent=function(m,k,l){return this.$outdent.checkOutdent(k,l);};this.autoOutdent=function(k,l,m){this.$outdent.autoOutdent(l,m);
};}).call(h.prototype);e.Mode=h;});define("ace/mode/ruby_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(c,b,d){var e=c("../lib/oop");
var g=c("../lib/lang");var a=c("./text_highlight_rules").TextHighlightRules;var f=function(){var j=g.arrayToMap(("abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|gsub!|get_via_redirect|h|host!|https?|https!|include|Integer|lambda|link_to|link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|validates_inclusion_of|validates_numericality_of|validates_with|validates_each|authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|translate|localize|extract_locale_from_tld|t|l|caches_page|expire_page|caches_action|expire_action|cache|expire_fragment|expire_cache_for|observe|cache_sweeper|has_many|has_one|belongs_to|has_and_belongs_to_many").split("|"));
var i=g.arrayToMap(("alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield").split("|"));
var h=g.arrayToMap(("true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING").split("|"));
var k=g.arrayToMap(("$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|$!|root_url|flash|session|cookies|params|request|response|logger").split("|"));
this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"comment",merge:true,regex:"^=begin$",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"},{token:"text",regex:"::"},{token:"variable.instancce",regex:"@{1,2}(?:[a-zA-Z_]|\d)+"},{token:"variable.class",regex:"[A-Z](?:[a-zA-Z_]|\d)+"},{token:"string",regex:"[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"},{token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(l){if(l=="self"){return"variable.language";
}else{if(i.hasOwnProperty(l)){return"keyword";}else{if(h.hasOwnProperty(l)){return"constant.language";}else{if(k.hasOwnProperty(l)){return"variable.language";
}else{if(j.hasOwnProperty(l)){return"support.function";}else{if(l=="debugger"){return"invalid.deprecated";}else{return"identifier";}}}}}}},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"^=end$",next:"start"},{token:"comment",merge:true,regex:".+"}]};
};e.inherits(f,a);b.RubyHighlightRules=f;});define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(c,b,d){var e=c("../range").Range;
var a=function(){};(function(){this.checkOutdent=function(f,g){if(!/^\s+$/.test(f)){return false;}return/^\s*\}/.test(g);};this.autoOutdent=function(k,l){var g=k.getLine(l);
var h=g.match(/^(\s*\})/);if(!h){return 0;}var i=h[1].length;var j=k.findMatchingBracket({row:l,column:i});if(!j||j.row==l){return 0;}var f=this.$getIndent(k.getLine(j.row));
k.replace(new e(l,0,l,i-1),f);};this.$getIndent=function(f){var g=f.match(/^(\s+)/);if(g){return g[1];}return"";};}).call(a.prototype);b.MatchingBraceOutdent=a;
});