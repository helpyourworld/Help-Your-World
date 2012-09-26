/**
 * RokTabs Module
 *
 * @package		Joomla
 * @subpackage	RokTabs Module
 * @copyright Copyright (C) 2009 RocketTheme. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see RT-LICENSE.php
 * @author RocketTheme, LLC
 *
 */

var RokTabsOptions = {
	'mouseevent': [], 'duration': [], 'transition': [], 'auto': [], 'delay': [], 
	'type': [], 'arrows': [], 'tabsScroll': [], 'linksMargins': [], 'navscroll': [],
	'marginCompensation': []
};

window.ie9 = window.ie && Object.keys;
var RokTabs = new Class({
	
	version: '1.8',
	
	options: {
		'scroll': RokTabsOptions
	},
	
	initialize: function(options) {
		this.setOptions(options);
		// bw compatibility
		if (!this.options.scroll.navscroll || !this.options.scroll.navscroll.length) {
			this.options.scroll.navscroll = [];
			(RokTabsOptions['duration'].length).times(function() {
				this.options.scroll.navscroll.push(true);
			}.bind(this));
		}
		this.containers = $$('.roktabs-container-inner');
		this.tabsWrapper = $$('.roktabs-links');
		this.tabs = $$('.roktabs-links ul');
		this.panels = $$('.roktabs-container-wrapper');
		this.outer = $$(this.tabsWrapper.getParent());
		this.wrapper = $$(this.outer.getParent());
		this.fx = []; this.current = [];
		this.timer = [];
		this.tabsSize = [];
		this.tabScroll = [];
		this.panels.each(function(panel,i) {
			this.current[i] = 0;
			if (!this.options.scroll.mouseevent[i]) this.options.scroll.mouseevent[i] = 'click';
			panel.setStyle('width', (window.opera) ? 30000 : 50000);
			
			if (window.ie){
				panel.setStyles({
					'filter': 'inherit',
					'position': 'relative'
				}).getChildren().setStyles({
					'filter': 'inherit',
					'position': 'relative'
				});
			}
			
		},this);
		this.attachEvents();
	},
	
	attachEvents: function() {
		var lisSize, self = this;
		this.tabs.each(function(tabs, i) {
			if (!this.options.scroll.navscroll[i]) this.tabsWrapper.addClass('roktabs-links-noscroll');
			this.outer[i].addEvents({
				'mouseenter': function() {
					if (self.options['scroll'].auto[i]) self.stop(i);
				},
				'mouseleave': function(){
					if (self.options['scroll'].auto[i]) self.start(i);
				}
			});
			this.fx[i] = new Fx.Scroll(this.panels[i].getParent(), {
				wait: false,
				wheelStops: false,
				duration: this.options['scroll'].duration[i],
				transition: this.options['scroll'].transition[i]
			}).set([0,false]);
			
			lisSize = 0;
			this.containers[i].setStyle('width',
				this.wrapper[i].getStyle('width').toInt() - 
				this.tabsWrapper[i].getParent().getStyle('border-left-width').toInt() -
				this.tabsWrapper[i].getParent().getStyle('border-right-width').toInt()
			);
			
			tabs.getElements('li').each(function(tab,j) {
				var panel = this.panels[i].getChildren()[j];
				panel.setStyle('width', 
					((window.ie6) ? this.wrapper[i] : this.outer[i]).getStyle('width').toInt() - panel.getStyle('padding-left').toInt() - 
					panel.getStyle('padding-left').toInt() - 
					panel.getStyle('margin-left').toInt() - 
					panel.getStyle('margin-left').toInt()
				);
				
				lisSize += tab.getSize().size.x;
				if (this.options['scroll'].marginCompensation[i]){
					lisSize += tab.getStyle('margin-left').toInt() + tab.getStyle('margin-right').toInt();
				}
				tab.setStyle('cursor','pointer').addEvents({
						'mouseenter': this.mouseenter.bind(this,[tab,panel,i,j]),
						'mouseleave': this.mouseleave.bind(this,[tab,panel,i,j]),
						'mousedown': this.mousedown.bind(this,[tab,panel,i,j]),
						'mouseup': this.mouseup.bind(this,[tab,panel,i,j])
				});
			}, this);
			
			this.tabsSize[i] = [tabs.getSize().size.x,lisSize];
			
			var arrows = this.outer[i].getElement('.roktabs-arrows');
			
			if (this.options['scroll'].arrows[i]) { 
				var previous = arrows.getElement('.previous');
				var next = arrows.getElement('.next');
			};
			
			if (this.options['scroll'].auto[i]) {
				this.start(i);
			};
			
			if (this.tabsSize[i][1] > this.tabsSize[i][0] && this.options.scroll.navscroll[i]) this.tabScroller(i);
			//else this.tabScroller(i);
			
		},this);
		
		return this;
	},
	
	mouseenter:	function(tab, panel, box_number, li_number) {
		if (tab[0]) {
			li_number = tab[3];
			box_number = tab[2];
			panel = tab[1];
			tab = tab[0];
		};
		tab.addClass('hover').addClass('over');
		this.fireEvent('mouseenter', [tab, panel, box_number, li_number]);
		if (RokTabsOptions.mouseevent[box_number] == 'mouseenter') {
			this.mousedown(tab, panel, box_number, li_number, true);
			this.mouseup(tab, panel, box_number, li_number, true);
		}
	},
	
	mouseleave: function(tab, panel, box_number, li_number) {
		if (tab[0]) {
			li_number = tab[3];
			box_number = tab[2];
			panel = tab[1];
			tab = tab[0];
		};
		tab.removeClass('hover').removeClass('over').removeClass('down').removeClass('up');
		this.fireEvent('mouseleave', [tab, panel, box_number, li_number]);
		if (RokTabsOptions.mouseevent[box_number] == 'mouseenter') this.mouseup(tab, panel, box_number, li_number, true);
	},

	mousedown: function(tab, panel, box_number, li_number, force) {
		if (tab[0]) {
			force = tab[4];
			li_number = tab[3];
			box_number = tab[2];
			panel = tab[1];
			tab = tab[0];
		};
		tab.removeClass('up').addClass('down');
		if (this.options['scroll'].type[box_number] == 'scrolling') {
			this.fx[box_number].options.duration = RokTabsOptions.duration[box_number];
			this.fx[box_number].options.wait = false;
			this.fx[box_number].toElement(panel);
		} else {
			var self = this;
			this.fx[box_number].element.effect('opacity', {duration: RokTabsOptions.duration[box_number] / 2}).start(0).chain(function() {
				self.fx[box_number].options.duration = 0;
				self.fx[box_number].options.wait = true;
				self.fx[box_number].toElement(panel);
				self.fx[box_number].element.effect('opacity').start(1);
			});
		};
		this.fireEvent('mousedown', [tab, panel, box_number, li_number]);
  	},

	mouseup: function(tab,panel,box_number,li_number,force) {
		if (tab[0]) {
			force = tab[4];
			li_number = tab[3];
			box_number = tab[2];
			panel = tab[1];
			tab = tab[0];
		};
		if (RokTabsOptions.mouseevent[box_number] != 'click' && !force) return;
		this.tabs[box_number].getElements('li').removeClass('active');
		tab.removeClass('down').addClass('up').addClass('active');
		this.current[box_number] = li_number;
		this.fireEvent('mouseup', [tab, panel, box_number, li_number]);
	},

	click: function(tab,panel, box_number, li_number, force){
		if (tab[0]) {
			force = tab[4];
			li_number = tab[3];
			box_number = tab[2];
			panel = tab[1];
			tab = tab[0];
		};
		return tab.fireEvent('mousedown', [tab, panel, box_number, li_number], force)
				.fireEvent('mouseup', [tab, panel, box_number, li_number])
				.fireEvent('mouseleave', [tab,panel, box_number, li_number]);
	},

	start: function(current) {
		$clear(this.timer[current]);
		var tmp = this.next.bind(this,current);
		this.timer[current] = tmp.periodical(this.options.scroll.delay[current]);
	},
	
	stop: function(current) { 
		$clear(this.timer[current]);
	},
	
	next: function(where) {
		var tabs = this.tabs.getElements('li');
		var current = this.current[where] + 1, next = tabs[where][current], tab;
		if (next) tab = next;
		else {
			tab = tabs[where][0];
			current = 0;
		};
		return this.click(tab, this.panels[where], where, current);
	},
	
	previous: function(where) {
		var tabs = this.tabs.getElements('li');
		var current = this.current[where] - 1, prev = tabs[where][current], tab;
		if (prev) tab = prev;
		else { 
			tab = tabs[where][tabs.length];
			current = tabs.length;
		};
		return this.click(tab, this.panels[where], where, current);
	},
	
	goTo: function(where, which) {
		var tabs = this.tabs.getElements('li');
		var go = tabs[where][which], tab;
		if (go) tab = go;
		else {
			tab = tabs[where][0];
			current = 0;
		};
		
		var panel = this.panels[where].getChildren()[which];
		if (this.options.scroll.mouseevent[where] == 'mouseenter') this.mouseenter(tab, panel, where, go, true);
		return this.click(tab, panel, where, go, true);
	},
	
	tabView: function(where, what) {
		if (what == 'hide') this.tabs[where].setStyle('display','none');
		else this.tabs[where].setStyle('display','');
	},
	
	tabPosition: function(where, position) {
		var el = this.tabsWrapper[where];
		switch(position) { 
			case 'top': el.inject(el.getParent(),'top');
						el.getFirst().removeProperty('class').addClass('roktabs-top');
						break;
			case 'bottom': default: 
						el.inject(el.getParent());
						el.getFirst().removeProperty('class').addClass('roktabs-bottom');
		};
	},
	
	tabScroller: function(tab) {
		var ul = this.tabs[tab], self = this;
		var parent = ul.getParent();

		(2).times(function() {
			self.tabsSize[tab][1] = 0;
			ul.getChildren().each(function(li) {
				if (window.ie) li.getFirst().inject(li);
				
				self.tabsSize[tab][1] += 
					li.getSize().size.x + li.getStyle('margin-left').toInt() +
					li.getStyle('margin-right').toInt() + li.getStyle('padding-left').toInt() + 										
					li.getStyle('padding-right').toInt() + li.getStyle('border-left-width').toInt() +
					li.getStyle('border-right-width').toInt();
			},this);
			
			ul.setStyle('width',self.tabsSize[tab][1] + ((window.gecko) ? 5 : (window.ie9) ? 0.5 : 0));
		}.bind(this));

		parent.setStyles({'overflow':'hidden', 'width': this.tabsSize[tab][0], 'position': 'relative'});
		
		
		if (ul.getSize().size.x > parent.getSize().size.x) {
			var ulWrapper = new Element('div', {'class': 'active-arrows'}).setStyle('position','relative').inject(parent,'before').adopt(parent);
			var ulPrev = new Element('div', {'class': 'arrow-prev png'}).setHTML('<span><</span>').inject(ulWrapper,'top');
			var ulNext = new Element('div', {'class':'arrow-next png'}).setHTML('<span>></span>').inject(ulWrapper);

			var arrowsSize = {
				'prev': ulPrev.getStyle('width').toInt() + 
						ulPrev.getStyle('margin-left').toInt() + 
						ulPrev.getStyle('margin-right').toInt() + 
						ulPrev.getStyle('border-left').toInt() + 
						ulPrev.getStyle('border-right').toInt() + 
						ulPrev.getStyle('padding-left').toInt() + 
						ulPrev.getStyle('padding-right').toInt(), 
				'next': ulNext.getStyle('width').toInt() + 
						ulNext.getStyle('margin-left').toInt() + 
						ulNext.getStyle('margin-right').toInt() + 
						ulNext.getStyle('border-left').toInt() + 
						ulNext.getStyle('border-right').toInt() + 
						ulNext.getStyle('padding-left').toInt() + 
						ulNext.getStyle('padding-right').toInt()
			};
		
			var margins = 0;
			if (this.options.scroll.linksMargins[tab]) margins = parent.getStyle('margin-right').toInt();
			
			if (margins < 0) margins = Math.abs(margins) / 2;
			parent.setStyle('width', this.tabsSize[tab][0] - margins - arrowsSize.prev - arrowsSize.next);
		
			new Element('div', {'class':'clear'}).inject(ulWrapper);
			this.tabScroll[tab] = {
				'speed': 70, 'amount': 30, 'current': 0
			};
		
			var TabTimer;
			ulNext.addEvents({
				'mouseenter': function(){ $clear(TabTimer);
					this.addClass('arrow-next-hover');
					TabTimer = self.tabScrollerAnim.periodical(self.tabScroll[tab]['speed'], self, [tab,parent,true]);
				},
				'mouseleave': function(){ this.removeClass('arrow-next-hover');
					$clear(TabTimer);
				}
			});

			ulPrev.addEvents({
				'mouseenter': function() {
					$clear(TabTimer);
					this.addClass('arrow-prev-hover');
					TabTimer = self.tabScrollerAnim.periodical(self.tabScroll[tab]['speed'], self, [tab,parent,false]);
				},
				'mouseleave': function() { this.removeClass('arrow-prev-hover');
					$clear(TabTimer);
				}
			});
		};
	},
	
	tabScrollerAnim: function(tab,ul,plus) { 
		var scrollSize = ul.getSize().scrollSize.x, scrollAmount = ul.getSize().scroll.x;
				
		var scroll;
		if (plus) scroll = scrollAmount + this.tabScroll[tab]['amount'];
		else scroll = scrollAmount - this.tabScroll[tab]['amount'];
				
		scroll = (scroll < 0) ? 0 : (scroll >= scrollSize) ? scrollSize : scroll;
		ul.scrollTo(scroll, 0);
	}
});
			
RokTabs.implement(new Options, new Events);
			
			
var roktabs;
window.addEvent('load', function() {
	roktabs = new RokTabs();
});
