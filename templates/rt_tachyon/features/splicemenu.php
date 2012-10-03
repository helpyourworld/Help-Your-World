<?php
/**
 * @package   Paradox Template - RocketTheme
 * @version   1.6.8 August 14, 2012
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */

defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');
jimport('joomla.filesystem.folder');

/**
 * @package     gantry
 * @subpackage  features
 */
class GantryFeatureSpliceMenu extends GantryFeature {
    var $_feature_name = 'splicemenu';
    var $_feature_prefix = 'menu';
    var $_menu_picker = 'menu-type';

	function init() {
		global $gantry;
		if (!JFolder::exists(JPATH_BASE.DS.'modules'.DS.'mod_roknavmenu')) return;
		
		$gantry->addStyle('splicemenu.css');
		if ($gantry->browser->platform != 'iphone'){
			$gantry->set('fixedheader', 0);
			$gantry->addScript('gantry-splicemenu.js');
			$gantry->addInlineScript("
				var SpliceMenuSettings = {
					'arrow': {duration: ".$gantry->get('menu-splicemenu-arrowindicator-duration').", transition: Fx.Transitions.".$gantry->get('menu-splicemenu-arrowindicator-animation')."},
					'subpanel': {duration: ".$gantry->get('menu-splicemenu-subpanel-duration').", transition: Fx.Transitions.".$gantry->get('menu-splicemenu-subpanel-animation')."}
				}
			");
		}
		
		if ($this->get('topbar-pill-enabled')) $gantry->addScript('gantry-pillanim.js');
	}

    function isEnabled() {
		if (!JFolder::exists(JPATH_BASE.DS.'modules'.DS.'mod_roknavmenu')) return false;
		
        global $gantry;
        $menu_enabled = $gantry->get('menu-enabled');
        $selected_menu = $gantry->get($this->_menu_picker);
        $cookie = 0;
        if ($gantry->browser->platform == 'iphone'){
            $prefix = $gantry->get('template_prefix');
            $cookiename = $prefix.$gantry->browser->platform.'-switcher';
            $cookie = $gantry->retrieveTemp('platform', $cookiename);
        }
        if (1 == (int)$menu_enabled && $selected_menu == $this->_feature_name && $cookie==0) return true;
        return false;
    }

    function isInPosition($position){
        if ($this->get('mainmenu-position') == $position || $this->get('submenu-position') == $position || $this->get('sidemenu-position') == $position) return true;
        return false;
    }
	function isOrderable(){
		return false;
	}
	

	function render($position="") {
        global $gantry;
        $output='';
        $renderer	= $gantry->document->loadRenderer('module');
        $options	 = array( 'style' => "menu" );

        $params=array();
        $group_params = $gantry->getParams($this->_feature_prefix."-".$this->_feature_name, true);
        $group_params_reg = new JRegistry();
        foreach($group_params as $param_name => $param_value){
            $group_params_reg->set($param_name,$param_value['value']);
        }

        if($position == $this->get('mainmenu-position')) {
            $params = $gantry->getParams($this->_feature_prefix."-".$this->_feature_name."-mainmenu", true);
            $module	 = JModuleHelper::getModule('mod_roknavmenu','_z_empty');
            $reg = new JRegistry();
            foreach($params as $param_name => $param_value){
                $reg->set($param_name, $param_value['value']);
            }
            $reg->merge($group_params_reg);
            $module->params = $reg->toString();

			if (!$this->get('topbar-pill-enabled')) $output .= "<div class='nopill'>" . $renderer->render( $module, $options ) . "</div>";
			else {
            $output .= $renderer->render( $module, $options );
				$gantry->addInlineScript("window.addEvent('domready', function() {new GantryPill('ul.menutop', {duration: ".$this->get('topbar-pill-duration').", transition: Fx.Transitions.".$this->get('topbar-pill-animation').", color: false})});");
			}
			
        }

        if ($position == $this->get('submenu-position')) {
            $params = $gantry->getParams($this->_feature_prefix."-".$this->_feature_name."-submenu", true);
            $module	 = JModuleHelper::getModule('mod_roknavmenu','_z_empty');
            $reg = new JRegistry();
            foreach($params as $param_name => $param_value){
                $reg->set($param_name, $param_value['value']);
            }
            $reg->merge($group_params_reg);
            $module->params = $reg->toString();
			$output .= $renderer->render( $module, $options );
			

        }
        
        if ($position == $this->get('sidemenu-position')) {
            $params = $gantry->getParams($this->_feature_prefix."-".$this->_feature_name."-sidemenu", true);
        	$options = array( 'style' => "sidemenu");
            $module	 = JModuleHelper::getModule('mod_roknavmenu','_z_empty');
            $reg = new JRegistry();
            foreach($params as $param_name => $param_value){
                $reg->set($param_name, $param_value['value']);
            }
            $reg->merge($group_params_reg);
            $module->params = $reg->toString();
            $output .= $renderer->render( $module, $options );
        }
		return $output;
	}
}