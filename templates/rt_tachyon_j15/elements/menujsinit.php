<?php
/**
 * @package     gantry
 * @subpackage  admin.elements
 * @version        1.5.10 March 27, 2012
 * @author        RocketTheme http://www.rockettheme.com
 * @copyright     Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license        http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Gantry uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */
defined('JPATH_BASE') or die();
/**
 * @package     gantry
 * @subpackage  admin.elements
 */
class JElementMenuJSInit extends JElement {


    function fetchElement($name, $value, &$node, $control_name) {
	
		$doc =& JFactory::getDocument();
        $doc->addScript(JURI::Root(true)."/templates/rt_tachyon_j15/elements/childtype.js");
	
        return null;
    }



}

?>