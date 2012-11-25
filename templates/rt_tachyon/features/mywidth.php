<?php
/**
 * @package   Custom Feature (Add custum stylesheet) - RocketTheme
 * @version   August 1, 2010
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2010 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 *
 */

defined('JPATH_BASE') or die();

gantry_import('core.gantryfeature');

class GantryFeatureMyWidth extends GantryFeature {
    var $_feature_name = 'mywidth';

    function isEnabled() {
        return true;
    }

    function isInPosition($position) {
        return false;
    }

function init() {
    global $gantry;
    
    $increase = 20;
    	$dyngrid = $gantry->get('dyngrid');
    	
    	$widths = $pushpull = array();
    	
    	for ($i = 0; $i < 12; $i++) {
    		$j = $i + 1;
    		$widths[$i] = ($dyngrid * ($j)) + ($increase * $j-20);
    		$pushpull[$i] = $widths[$i] + $increase;
    		$bottomwidths[$i] = ($dyngrid * ($j)) + ($increase * $j);
    	}
    	
    	$grid = ($dyngrid * 12) + 240;
    	
    	$css = ' div.rt-container {width:'.$grid.'px;}'."\n";
    
	$body = ' html body {min-width:'.$grid.'px;}'."\n";

    	$width = $push = $pull = "";
    	
    	for ($i = 0; $i < count($widths); $i++) {
    		$width .= ' div.rt-container .rt-grid-'.($i + 1).' {width: '.$widths[$i].'px;}'."\n";
    		$push .= ' div.rt-container .rt-push-'.($i + 1).' {left:'.$pushpull[$i].'px;}'."\n";
    		$pull .= ' div.rt-container .rt-pull-'.($i + 1).' {left:-'.$pushpull[$i].'px;}'."\n";
	}
    	
	$css .= $width . $push . $pull . $body;
        $gantry->addInlineStyle($css);

	}

}