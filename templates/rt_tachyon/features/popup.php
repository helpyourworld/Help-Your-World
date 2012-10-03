<?php
/**
 * @package   Tachyon Template - RocketTheme
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

class GantryFeaturePopup extends GantryFeature {
    var $_feature_name = 'popup';

	function render($position="") {
	    ob_start();
	    $user =& JFactory::getUser();
	    ?>
		<div id="rt-popupmodule-button">
		<a href="#" class="buttontext" rel="rokbox[<?php echo $this->get('width'); ?> <?php echo $this->get('height'); ?>][module=rt-popup]">
			<span class="desc"><?php echo $this->get('text'); ?></span>
			<span class="icon"></span>
		</a>
		</div>
		<?php
	    return ob_get_clean();
	}
}