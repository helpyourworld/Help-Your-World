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
defined('_JEXEC') or die('Restricted access');
?>

<h2 class="error<?php $this->escape($this->params->get( 'pageclass_sfx' )) ?>">
	<?php echo JText::_('Error') ?>
</h2>
<div class="error<?php echo $this->escape($this->params->get( 'pageclass_sfx' )) ?>">
	<p><?php echo $this->escape($this->error); ?></p>
</div>
