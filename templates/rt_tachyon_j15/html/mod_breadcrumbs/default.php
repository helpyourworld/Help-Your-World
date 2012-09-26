<?php
/**
 * @package   Tachyon Template - RocketTheme
 * @version   1.5.10 March 27, 2012
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * Rockettheme Tachyon Template uses the Joomla Framework (http://www.joomla.org), a GNU/GPLv2 content management system
 *
 */
defined('_JEXEC') or die('Restricted access'); ?>
<?php if ($params->get('showHome', 1)) :
$homesetting = 1;
else :
$homesetting = 0;
endif; ?>
<?php if ($params->get('showHome', 1)) : ?>
<a href="<?php echo JURI::base(); ?>" id="breadcrumbs-home"></a>
<?php endif; ?>
<span class="breadcrumbs pathway">
<?php for ($i = $homesetting; $i < $count; $i ++) :
	if ($i < $count -1) {
		if(!empty($list[$i]->link)) {
			echo '<a href="'.$list[$i]->link.'" class="pathway">'.$list[$i]->name.'</a>';
		} else {
			echo '<span class="no-link">'.$list[$i]->name.'</span>';
		}
		echo ' '.$separator.' ';
	}  else if ($params->get('showLast', -1)) {
	    echo '<span class="no-link">'.$list[$i]->name.'</span>';
	}
endfor; ?>
</span>
