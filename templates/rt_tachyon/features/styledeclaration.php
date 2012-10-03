<?php
/**
 * @package		Gantry Template Framework - RocketTheme
 * @version		1.6.8 August 14, 2012
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license		http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */
defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureStyleDeclaration extends GantryFeature {
    var $_feature_name = 'styledeclaration';

    function isEnabled() {
        global $gantry;
        $menu_enabled = $this->get('enabled');

        if (1 == (int)$menu_enabled) return true;
        return false;
    }

	function init() {
        global $gantry;

		// ColorChooser
		$css = '#rt-top a, #rt-header a, #rt-navigation a, .menutop ul li > .item:hover, .menutop ul li.active > .item, .menutop ul li.f-menuparent-itemfocus > .item {color:'.$gantry->get('headerlink').';}'."\n";
		
		$css .= 'a, .readonstyle-link .readon span, .readonstyle-link .readon .button, #more-articles, .roktabs-links ul li.active span, .roktabs-links ul li.active:hover span, .promo .rt-module-surround:hover .title, .newsfeed-content a  {color:'.$gantry->get('bodylink').';}'."\n";
		
		$css .= '.rokbox-clean #rokbox-close, .rokbox-clean #rokbox-arrows #rokbox-previous, .rokbox-clean #rokbox-arrows #rokbox-next {background-color:'.$gantry->get('bodylink').';}'."\n";

		$css .= 'body, .inputbox, body #roksearch_search_str, body #roksearch_results h3, body #roksearch_results .roksearch_header, body #roksearch_results .roksearch_row_btm, body #roksearch_results .roksearch_row_btm span {color:'.$gantry->get('bodytext').';}'."\n";
		
		$css .= '#rt-bottom a, #rt-footer a, #rt-copyright a, .box4 a {color:'.$gantry->get('footerlink').';}'."\n";

		if ($gantry->get('thirdparty')){
		$css .= 'body .qtip a, #community-wrap .submenu li a {color:'.$gantry->get('bodylink').';}'."\n";
		}
		
		if ($gantry->browser->platform == 'iphone'){
			$css .= 'body #idrops li.root-sub a, body #idrops li.root-sub span.separator, body #idrops li.root-sub.active a, body #idrops li.root-sub.active span.separator {color: '.$gantry->get('bodylink').' !important;}'."\n";
		}

		$gantry->addInlineStyle($css);
		$this->_disableRokBoxForiPhone();

		//style stuff
		$gantry->addStyle('body.css');
		$gantry->addStyle('header-'.$gantry->get('headerstyle').".css");
		$gantry->addStyle('accent-'.$gantry->get('accentstyle').".css");
		$gantry->addStyle('footer-'.$gantry->get('footerstyle').".css");
		if ($gantry->get('typography')) $gantry->addStyle('typography.css');
		if ($gantry->get('extensions')) $gantry->addStyle('extensions.css');
		if ($gantry->get('thirdparty')) $gantry->addStyle('thirdparty.css');

	}

	function _disableRokBoxForiPhone() {
		global $gantry;

		if ($gantry->browser->platform == 'iphone') {
			$gantry->addInlineScript("window.addEvent('domready', function() {\$\$('a[rel^=rokbox]').removeEvents('click');});");
		}
	}

}