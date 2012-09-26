/**
 * @package		Gantry Template Framework - RocketTheme
 * @version		1.5.10 March 27, 2012
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license		http://www.rockettheme.com/legal/license.php RocketTheme Proprietary Use License
 */

(function(){
	var RokIEAnimations = {
		init: function(){
			RokIEAnimations.buttons();
			RokIEAnimations.sidemenu();
		},
		
		buttons: function(){
			var buttons = $$('.readonstyle-button .readon span, .readonstyle-button .readon .button');
			
			buttons.each(function(button){
				var initialPadding = button.getStyle('padding-right').toInt();
				
				button.set('tween', {duration: 200});
				button.addEvents({
					'mouseenter': function(){ this.tween('padding-right', 25); },
					'mouseleave': function(){ this.tween('padding-right', initialPadding); }
				});
			});
		},
		
		sidemenu: function(){
			var menus = $$('#rt-page-background .rt-menubar li span');
			
			menus.each(function(menu){
				
				menu.set('tween', {duration: 200});
				menu.addEvents({
					'mouseenter': function() { this.tween('background-position-x', 10); },
					'mouseleave': function() { this.tween('background-position-x', 4); }
				});
			});
		}
	};
	
	window.addEvent('domready', RokIEAnimations.init);
})();